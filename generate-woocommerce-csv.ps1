# PowerShell script to generate a WooCommerce-compatible CSV file from products.json

$workspaceRoot = $PSScriptRoot
$jsonPath = Join-Path $workspaceRoot "products.json"
$csvOutputPath = Join-Path $workspaceRoot "woocommerce_products.csv"

# Helper function to escape CSV values
function Escape-CsvField($str) {
    if ($null -eq $str) { return '""' }
    $strVal = $str.ToString()
    $escaped = $strVal.Replace('"', '""')
    return """$escaped"""
}

Write-Host "Loading products from $jsonPath..."
$productsJson = Get-Content -Raw -Path $jsonPath
$products = ConvertFrom-Json $productsJson

$headers = @(
    "SKU", "Type", "Name", "Published", "Is featured?", "Visibility in catalog",
    "Short description", "Description", "In stock?", "Stock", "Regular price", "Sale price",
    "Categories", "Tags", "Images",
    "Attribute 1 name", "Attribute 1 value(s)", "Attribute 1 visible", "Attribute 1 global",
    "Attribute 2 name", "Attribute 2 value(s)", "Attribute 2 visible", "Attribute 2 global"
)

$csvLines = New-Object System.Collections.Generic.List[string]
# Add Header row
$csvLines.Add(($headers | ForEach-Object { Escape-CsvField $_ }) -join ",")

$prodIndex = 1
foreach ($prod in $products) {
    $prodId = 200 + $prodIndex
    
    # Prices
    $regularPrice = $prod.price
    $salePrice = ""
    if ($prod.oldPrice) {
        $regularPrice = $prod.oldPrice
        $salePrice = $prod.price
    }
    
    # SKU
    $sku = "EV-" + $prod.brand.Substring(0, [Math]::Min(3, $prod.brand.Length)).ToUpper() + "-" + $prodId
    
    # Description HTML
    $descHtml = "<p>$($prod.description)</p>"
    if ($prod.features -and $prod.features.Count -gt 0) {
        $descHtml += "`n<h3>Key Features</h3>`n<ul>"
        foreach ($feature in $prod.features) {
            $descHtml += "`n  <li>$feature</li>"
        }
        $descHtml += "`n</ul>"
    }
    if ($prod.specs) {
        $descHtml += "`n<h3>Technical Specifications</h3>`n<table border='1' style='width: 100%; border-collapse: collapse; margin-top: 10px;'>"
        $descHtml += "`n  <tbody>"
        foreach ($prop in $prod.specs.PSObject.Properties) {
            $descHtml += "`n    <tr>`n      <td style='padding: 8px; font-weight: bold; background-color: #f9f9f9; width: 35%;'>$($prop.Name)</td>`n      <td style='padding: 8px;'>$($prop.Value)</td>`n    </tr>"
        }
        $descHtml += "`n  </tbody>`n</table>"
    }
    
    # Stock
    $totalStock = 0
    if ($prod.variants) {
        foreach ($variant in $prod.variants) {
            if ($variant.stock) {
                $totalStock += [int]$variant.stock
            }
        }
    }
    if ($totalStock -eq 0) { $totalStock = 50 }
    
    # Images (comma separated)
    $imagesStr = ($prod.images) -join ", "
    
    # Colors
    $colorsStr = ""
    if ($prod.colors) {
        $colorsStr = ($prod.colors) -join ", "
    }
    
    # Build columns mapping
    $row = @(
        $sku,
        "simple",
        $prod.name,
        "1",
        "0",
        "visible",
        $prod.description,
        $descHtml,
        "1",
        $totalStock.ToString(),
        $regularPrice.ToString(),
        $salePrice.ToString(),
        $prod.category,
        ($prod.badge -join ", "),
        $imagesStr,
        "Brand",
        $prod.brand,
        "1",
        "0",
        "Colors",
        $colorsStr,
        "1",
        "0"
    )
    
    $csvLines.Add(($row | ForEach-Object { Escape-CsvField $_ }) -join ",")
    $prodIndex++
}

Write-Host "Saving WooCommerce products CSV to: $csvOutputPath"
[System.IO.File]::WriteAllLines($csvOutputPath, $csvLines, [System.Text.Encoding]::UTF8)
Write-Host "CSV generation complete!"
