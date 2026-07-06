# PowerShell script to generate a standard WordPress WXR XML import file for Elevora.

$workspaceRoot = $PSScriptRoot
$jsonPath = Join-Path $workspaceRoot "products.json"
$xmlOutputPath = Join-Path $workspaceRoot "elevora-wp-content.xml"

# Helper function to compute string byte length in UTF-8
function Get-Utf8ByteCount($str) {
    if ($null -eq $str) { return 0 }
    return [System.Text.Encoding]::UTF8.GetByteCount($str.ToString())
}

# Helper function to generate serialized PHP attributes
function Get-SerializedAttributes($attributes) {
    $count = $attributes.Count
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.Append("a:" + $count + ":{")
    foreach ($attr in $attributes) {
        $key = $attr.Name.ToLower() -replace '[^a-z0-9]', ''
        $name = $attr.Name
        $value = $attr.Value
        $pos = $attr.Position
        
        $keyLen = Get-Utf8ByteCount $key
        $nameLen = Get-Utf8ByteCount $name
        $valueLen = Get-Utf8ByteCount $value
        
        [void]$sb.Append('s:' + $keyLen + ':"' + $key + '";a:6:{')
        [void]$sb.Append('s:4:"name";s:' + $nameLen + ':"' + $name + '";')
        [void]$sb.Append('s:5:"value";s:' + $valueLen + ':"' + $value + '";')
        [void]$sb.Append('s:8:"position";i:' + $pos + ';')
        [void]$sb.Append('s:10:"is_visible";i:1;')
        [void]$sb.Append('s:12:"is_variation";i:0;')
        [void]$sb.Append('s:11:"is_taxonomy";i:0;')
        [void]$sb.Append('}')
    }
    [void]$sb.Append('}')
    return $sb.ToString()
}

Write-Host "Loading product data from $jsonPath..."
$productsJson = Get-Content -Raw -Path $jsonPath
$products = ConvertFrom-Json $productsJson

Write-Host "Loading and parsing policy files..."
$policies = @(
    @{ file = "privacy-policy.html"; title = "Privacy Policy"; slug = "privacy-policy"; id = 113 },
    @{ file = "refund-policy.html"; title = "Refund Policy"; slug = "refund-policy"; id = 114 },
    @{ file = "return-policy.html"; title = "Return Policy"; slug = "return-policy"; id = 115 },
    @{ file = "shipping-policy.html"; title = "Shipping Policy"; slug = "shipping-policy"; id = 116 },
    @{ file = "terms.html"; title = "Terms of Service"; slug = "terms"; id = 117 }
)

foreach ($p in $policies) {
    $filePath = Join-Path $workspaceRoot $p.file
    if (Test-Path $filePath) {
        $content = Get-Content -Raw -Path $filePath
        if ($content -match '(?ms)<article[^>]*class="policy-container[^>]*">(.*?)</article>') {
            $body = $Matches[1].Trim()
            $body = $body -replace '(?ms)<p style="font-size: 0\.8rem; color: var\(--text-muted\);">Last Updated:[^<]*</p>', ''
            $p["content"] = $body.Trim()
            Write-Host "  Parsed: $($p.file)"
        } else {
            $p["content"] = "<p>Please view official terms and policies at our support desk.</p>"
            Write-Host "  Warning: Failed to match article in $($p.file)"
        }
    } else {
        $p["content"] = "<p>Please view official terms and policies at our support desk.</p>"
        Write-Host "  Warning: $($p.file) not found"
    }
}

$pages = @(
    @{ id = 101; title = "Home"; slug = "home"; template = "default" },
    @{ id = 102; title = "Shop"; slug = "shop"; template = "template-shop.php" },
    @{ id = 103; title = "About Us"; slug = "about"; template = "template-about.php" },
    @{ id = 104; title = "Contact Us"; slug = "contact"; template = "template-contact.php" },
    @{ id = 105; title = "FAQ Desk"; slug = "faq"; template = "template-faq.php" },
    @{ id = 106; title = "Track Order"; slug = "track-order"; template = "template-track-order.php" },
    @{ id = 107; title = "Wishlist"; slug = "wishlist"; template = "template-wishlist.php" },
    @{ id = 108; title = "Cart"; slug = "cart"; template = "template-cart.php" },
    @{ id = 109; title = "Checkout"; slug = "checkout"; template = "template-checkout.php" },
    @{ id = 110; title = "My Account"; slug = "my-account"; template = "template-my-account.php" },
    @{ id = 111; title = "Order Success"; slug = "order-success"; template = "template-order-success.php" },
    @{ id = 112; title = "Blog"; slug = "blog"; template = "default" },
    @{ id = 117; title = "Compare"; slug = "compare"; template = "template-compare.php" },
    @{ id = 118; title = "Login"; slug = "login"; template = "template-login.php" },
    @{ id = 119; title = "Register"; slug = "register"; template = "template-register.php" }
)

$blogPosts = @(
    @{
        id = 301
        title = "The Evolution of MagSafe: Snapping Into the Wireless Future"
        slug = "magsafe-evolution"
        date = "2026-06-28 12:00:00"
        image = "https://images.unsplash.com/photo-1609592424085-f55a64388432?w=1000"
        excerpt = "Explore the physics behind N52 magnetic coils and how inductive wireless coupling delivers rapid power transfer safely."
        content = @"
<p>Inductive wireless charging has existed for years, but standard alignment issues plagued early attempts. Apple's introduction of MagSafe in the iPhone 12 solved the alignment issue by positioning N52 Neodymium magnet loops around central copper charging coils.</p>
<h2>The Physics of Induced Coils</h2>
<p>When an electromagnetic current flows through a primary transmitter coil, it creates an alternating magnetic field. Placing a receiver coil within this field induces an electrical current in the secondary coil, charging the lithium pack. However, even a minor offset of 2-3 millimeters causes high thermal dissipation and drops efficiency by up to 50%.</p>
<blockquote class="wp-block-quote">
  <p>"MagSafe's design genius lies in magnets matching the coordinates exactly, ensuring the transmitter and receiver lock at peak efficiency."</p>
</blockquote>
<h2>Snapping in the Retractable Stands</h2>
<p>For dropshipping sites and device developers, MagSafe accessories present high conversion potentials. Magnetic wallets, ring holders, and thin folding powerbanks satisfy both the utility and minimalism metrics that premium consumers actively look for online.</p>
"@
    },
    @{
        id = 302
        title = "Gallium Nitride (GaN): Why it's replacing silicon charger bricks"
        slug = "gan-chargers"
        date = "2026-06-24 12:00:00"
        image = "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1000"
        excerpt = "Why are GaN blocks smaller and cooler than old silicon adapters? We outline thermal efficiency and power allocation equations."
        content = @"
<p>For decades, silicon has been the bedrock of power transistors. However, as power requirements for laptops, tablets, and smartphones surged, silicon reached its physical thermal caps. Enter Gallium Nitride (GaN)—a crystal semiconductor capable of conducting much higher voltages with lower resistance.</p>
<h2>Understanding Bandgap Physics</h2>
<p>GaN possesses a "wide bandgap" of 3.4 eV compared to silicon's 1.1 eV. This wide bandgap allows electrical currents to pass through components faster, with less energy lost to heat. Consequently, transistors can be placed closer together, reducing charger volume by up to 40%.</p>
<blockquote class="wp-block-quote">
  <p>"By utilizing GaN, chargers can supply 100W of power from an adapter block smaller than a deck of playing cards."</p>
</blockquote>
<h2>Cooler Transistors and Multiport Chargers</h2>
<p>With less heat loss, chargers don't require heavy heatsinks. This enables developers to pack multiple USB-C Power Delivery ports into travel-friendly charger blocks, protecting gadgets from electrical spikes and heat thresholds.</p>
"@
    },
    @{
        id = 303
        title = "Hybrid Active Noise Cancellation: Sound waves in modern workspaces"
        slug = "hybrid-anc-headphones"
        date = "2026-06-18 12:00:00"
        image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000"
        excerpt = "Tuning out focus distractions. Discover the microphone structures and algorithms behind phase-reversing soundwave silence."
        content = @"
<p>Active Noise Cancellation (ANC) has evolved from simple isolation cushions to active DSP algorithms. Modern premium headphones utilize hybrid ANC networks to erase distraction noise across workspaces.</p>
<h2>Feedforward vs Feedback Microphones</h2>
<p>Hybrid ANC combines feedforward microphones (facing outwards to detect ambient noise) and feedback microphones (facing inwards near the ear canal to monitor audio leakage). The digital sound processor (DSP) analyzes these waveforms and projects an inverted soundwave (180 degrees out of phase) to cancel the noise.</p>
<blockquote class="wp-block-quote">
  <p>"Keep in mind that Hybrid ANC operates like acoustic addition, summing the ambient wave with its inverse mirror image to result in pure silence."</p>
</blockquote>
<h2>Transparency Mode Integration</h2>
<p>By reversing the microphone feeds, hybrid headsets can inject ambient sounds back into the ear cushions. This transparency mode allows consumers to conduct chats or hear announcements without needing to pull the headphones off their ears.</p>
"@
    }
)

# Start building the XML
$xml = New-Object System.Text.StringBuilder
[void]$xml.AppendLine('<?xml version="1.0" encoding="UTF-8" ?>')
[void]$xml.AppendLine('<rss version="2.0"')
[void]$xml.AppendLine('     xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"')
[void]$xml.AppendLine('     xmlns:content="http://purl.org/rss/1.0/modules/content/"')
[void]$xml.AppendLine('     xmlns:wfw="http://wellformedweb.org/commentAPI/"')
[void]$xml.AppendLine('     xmlns:dc="http://purl.org/dc/elements/1.1/"')
[void]$xml.AppendLine('     xmlns:wp="http://wordpress.org/export/1.2/"')
[void]$xml.AppendLine('>')
[void]$xml.AppendLine('<channel>')
[void]$xml.AppendLine('  <title>Elevora Store</title>')
[void]$xml.AppendLine('  <link>https://elevora.com</link>')
[void]$xml.AppendLine('  <description>Premium Electronics Dropshipping Store</description>')
[void]$xml.AppendLine('  <pubDate>Wed, 01 Jul 2026 12:00:00 +0000</pubDate>')
[void]$xml.AppendLine('  <language>en-US</language>')
[void]$xml.AppendLine('  <wp:wxr_version>1.2</wp:wxr_version>')
[void]$xml.AppendLine('  <wp:base_site_url>http://localhost/elevora</wp:base_site_url>')
[void]$xml.AppendLine('  <wp:base_blog_url>http://localhost/elevora</wp:base_blog_url>')
[void]$xml.AppendLine('  <wp:author>')
[void]$xml.AppendLine('    <wp:author_id>1</wp:author_id>')
[void]$xml.AppendLine('    <wp:author_login>admin</wp:author_login>')
[void]$xml.AppendLine('    <wp:author_email>admin@elevora.com</wp:author_email>')
[void]$xml.AppendLine('    <wp:author_display_name><![CDATA[admin]]></wp:author_display_name>')
[void]$xml.AppendLine('    <wp:author_first_name><![CDATA[Admin]]></wp:author_first_name>')
[void]$xml.AppendLine('    <wp:author_last_name><![CDATA[User]]></wp:author_last_name>')
[void]$xml.AppendLine('  </wp:author>')

# 1. Output Pages
Write-Host "Generating Pages XML..."
foreach ($p in $pages) {
    [void]$xml.AppendLine('  <item>')
    [void]$xml.AppendLine("    <title>$($p.title)</title>")
    [void]$xml.AppendLine("    <link>http://localhost/elevora/$($p.slug)/</link>")
    [void]$xml.AppendLine("    <pubDate>Wed, 01 Jul 2026 12:00:00 +0000</pubDate>")
    [void]$xml.AppendLine("    <dc:creator><![CDATA[admin]]></dc:creator>")
    [void]$xml.AppendLine('    <guid isPermaLink="false">http://localhost/elevora/?page_id=' + $p.id + '</guid>')
    [void]$xml.AppendLine("    <description></description>")
    [void]$xml.AppendLine("    <content:encoded><![CDATA[]]></content:encoded>")
    [void]$xml.AppendLine("    <excerpt:encoded><![CDATA[]]></excerpt:encoded>")
    [void]$xml.AppendLine("    <wp:post_id>$($p.id)</wp:post_id>")
    [void]$xml.AppendLine("    <wp:post_date><![CDATA[2026-07-01 12:00:00]]></wp:post_date>")
    [void]$xml.AppendLine("    <wp:post_date_gmt><![CDATA[2026-07-01 12:00:00]]></wp:post_date_gmt>")
    [void]$xml.AppendLine("    <wp:comment_status><![CDATA[closed]]></wp:comment_status>")
    [void]$xml.AppendLine("    <wp:ping_status><![CDATA[closed]]></wp:ping_status>")
    [void]$xml.AppendLine("    <wp:post_name><![CDATA[$($p.slug)]]></wp:post_name>")
    [void]$xml.AppendLine("    <wp:status><![CDATA[publish]]></wp:status>")
    [void]$xml.AppendLine("    <wp:post_parent>0</wp:post_parent>")
    [void]$xml.AppendLine("    <wp:menu_order>0</wp:menu_order>")
    [void]$xml.AppendLine("    <wp:post_type><![CDATA[page]]></wp:post_type>")
    [void]$xml.AppendLine("    <wp:post_password><![CDATA[]]></wp:post_password>")
    [void]$xml.AppendLine("    <wp:is_sticky>0</wp:is_sticky>")
    if ($p.template -ne "default") {
        [void]$xml.AppendLine("    <wp:post_meta>")
        [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_wp_page_template]]></wp:meta_key>")
        [void]$xml.AppendLine("      <wp:meta_value><![CDATA[$($p.template)]]></wp:meta_value>")
        [void]$xml.AppendLine("    </wp:post_meta>")
    }
    [void]$xml.AppendLine('  </item>')
}

# 2. Output Policy Pages
Write-Host "Generating Policy Pages XML..."
foreach ($p in $policies) {
    [void]$xml.AppendLine('  <item>')
    [void]$xml.AppendLine("    <title>$($p.title)</title>")
    [void]$xml.AppendLine("    <link>http://localhost/elevora/$($p.slug)/</link>")
    [void]$xml.AppendLine("    <pubDate>Wed, 01 Jul 2026 12:00:00 +0000</pubDate>")
    [void]$xml.AppendLine("    <dc:creator><![CDATA[admin]]></dc:creator>")
    [void]$xml.AppendLine('    <guid isPermaLink="false">http://localhost/elevora/?page_id=' + $p.id + '</guid>')
    [void]$xml.AppendLine("    <description></description>")
    [void]$xml.AppendLine("    <content:encoded><![CDATA[$($p.content)]]></content:encoded>")
    [void]$xml.AppendLine("    <excerpt:encoded><![CDATA[]]></excerpt:encoded>")
    [void]$xml.AppendLine("    <wp:post_id>$($p.id)</wp:post_id>")
    [void]$xml.AppendLine("    <wp:post_date><![CDATA[2026-07-01 12:00:00]]></wp:post_date>")
    [void]$xml.AppendLine("    <wp:post_date_gmt><![CDATA[2026-07-01 12:00:00]]></wp:post_date_gmt>")
    [void]$xml.AppendLine("    <wp:comment_status><![CDATA[closed]]></wp:comment_status>")
    [void]$xml.AppendLine("    <wp:ping_status><![CDATA[closed]]></wp:ping_status>")
    [void]$xml.AppendLine("    <wp:post_name><![CDATA[$($p.slug)]]></wp:post_name>")
    [void]$xml.AppendLine("    <wp:status><![CDATA[publish]]></wp:status>")
    [void]$xml.AppendLine("    <wp:post_parent>0</wp:post_parent>")
    [void]$xml.AppendLine("    <wp:menu_order>0</wp:menu_order>")
    [void]$xml.AppendLine("    <wp:post_type><![CDATA[page]]></wp:post_type>")
    [void]$xml.AppendLine("    <wp:post_password><![CDATA[]]></wp:post_password>")
    [void]$xml.AppendLine("    <wp:is_sticky>0</wp:is_sticky>")
    [void]$xml.AppendLine('  </item>')
}

# 3. Output Blog Posts
Write-Host "Generating Blog Posts XML..."
foreach ($p in $blogPosts) {
    $attachId = $p.id + 1000
    
    [void]$xml.AppendLine('  <item>')
    [void]$xml.AppendLine("    <title>$($p.title)</title>")
    [void]$xml.AppendLine("    <link>http://localhost/elevora/blog/$($p.slug)/</link>")
    [void]$xml.AppendLine("    <pubDate>Wed, 01 Jul 2026 12:00:00 +0000</pubDate>")
    [void]$xml.AppendLine("    <dc:creator><![CDATA[admin]]></dc:creator>")
    [void]$xml.AppendLine('    <guid isPermaLink="false">http://localhost/elevora/?p=' + $p.id + '</guid>')
    [void]$xml.AppendLine("    <description></description>")
    [void]$xml.AppendLine("    <content:encoded><![CDATA[$($p.content)]]></content:encoded>")
    [void]$xml.AppendLine("    <excerpt:encoded><![CDATA[$($p.excerpt)]]></excerpt:encoded>")
    [void]$xml.AppendLine("    <wp:post_id>$($p.id)</wp:post_id>")
    [void]$xml.AppendLine("    <wp:post_date><![CDATA[$($p.date)]]></wp:post_date>")
    [void]$xml.AppendLine("    <wp:post_date_gmt><![CDATA[$($p.date)]]></wp:post_date_gmt>")
    [void]$xml.AppendLine("    <wp:comment_status><![CDATA[open]]></wp:comment_status>")
    [void]$xml.AppendLine("    <wp:ping_status><![CDATA[open]]></wp:ping_status>")
    [void]$xml.AppendLine("    <wp:post_name><![CDATA[$($p.slug)]]></wp:post_name>")
    [void]$xml.AppendLine("    <wp:status><![CDATA[publish]]></wp:status>")
    [void]$xml.AppendLine("    <wp:post_parent>0</wp:post_parent>")
    [void]$xml.AppendLine("    <wp:menu_order>0</wp:menu_order>")
    [void]$xml.AppendLine("    <wp:post_type><![CDATA[post]]></wp:post_type>")
    [void]$xml.AppendLine("    <wp:post_password><![CDATA[]]></wp:post_password>")
    [void]$xml.AppendLine("    <wp:is_sticky>0</wp:is_sticky>")
    [void]$xml.AppendLine('    <category domain="category" nicename="tech"><![CDATA[Tech]]></category>')
    [void]$xml.AppendLine('    <category domain="category" nicename="editorial"><![CDATA[Editorial]]></category>')
    [void]$xml.AppendLine("    <wp:post_meta>")
    [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_thumbnail_id]]></wp:meta_key>")
    [void]$xml.AppendLine("      <wp:meta_value><![CDATA[$attachId]]></wp:meta_value>")
    [void]$xml.AppendLine("    </wp:post_meta>")
    [void]$xml.AppendLine('  </item>')

    # Output post image attachment
    [void]$xml.AppendLine('  <item>')
    [void]$xml.AppendLine("    <title><![CDATA[$($p.title) Cover Image]]></title>")
    [void]$xml.AppendLine('    <link>http://localhost/elevora/?attachment_id=' + $attachId + '</link>')
    [void]$xml.AppendLine("    <pubDate>Wed, 01 Jul 2026 12:00:00 +0000</pubDate>")
    [void]$xml.AppendLine("    <dc:creator><![CDATA[admin]]></dc:creator>")
    [void]$xml.AppendLine('    <guid isPermaLink="false">http://localhost/elevora/?attachment_id=' + $attachId + '</guid>')
    [void]$xml.AppendLine("    <wp:post_id>$attachId</wp:post_id>")
    [void]$xml.AppendLine("    <wp:post_date><![CDATA[$($p.date)]]></wp:post_date>")
    [void]$xml.AppendLine("    <wp:post_date_gmt><![CDATA[$($p.date)]]></wp:post_date_gmt>")
    [void]$xml.AppendLine("    <wp:comment_status><![CDATA[open]]></wp:comment_status>")
    [void]$xml.AppendLine("    <wp:ping_status><![CDATA[closed]]></wp:ping_status>")
    [void]$xml.AppendLine("    <wp:post_name><![CDATA[$($p.slug)-cover]]></wp:post_name>")
    [void]$xml.AppendLine("    <wp:status><![CDATA[inherit]]></wp:status>")
    [void]$xml.AppendLine("    <wp:post_parent>$($p.id)</wp:post_parent>")
    [void]$xml.AppendLine("    <wp:menu_order>0</wp:menu_order>")
    [void]$xml.AppendLine("    <wp:post_type><![CDATA[attachment]]></wp:post_type>")
    [void]$xml.AppendLine("    <wp:attachment_url><![CDATA[$($p.image)]]></wp:attachment_url>")
    [void]$xml.AppendLine("    <wp:post_meta>")
    [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_wp_attached_file]]></wp:meta_key>")
    [void]$xml.AppendLine("      <wp:meta_value><![CDATA[$($p.image)]]></wp:meta_value>")
    [void]$xml.AppendLine("    </wp:post_meta>")
    [void]$xml.AppendLine('  </item>')
}

# 4. Output WooCommerce Products
Write-Host "Generating WooCommerce Products XML..."
$prodIndex = 1
foreach ($prod in $products) {
    $prodId = 200 + $prodIndex
    $handle = $prod.name.ToLower() -replace '[^a-z0-9\s-]', '' -replace '\s+', '-' -replace '-+', '-'
    $handle = $handle.Trim('-')
    
    # 4.1 Construct HTML Description Content (with Features and Specs)
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
    
    # 4.2 Stock quantity
    $totalStock = 0
    if ($prod.variants) {
        foreach ($variant in $prod.variants) {
            if ($variant.stock) {
                $totalStock += [int]$variant.stock
            }
        }
    }
    if ($totalStock -eq 0) { $totalStock = 50 }
    
    # 4.3 Prepare Custom WooCommerce Attributes
    $attrs = [System.Collections.Generic.List[PSCustomObject]]::new()
    [void]$attrs.Add([PSCustomObject]@{ Name = "Brand"; Value = $prod.brand; Position = 0 })
    if ($prod.colors) {
        $colorsStr = ($prod.colors) -join " | "
        [void]$attrs.Add([PSCustomObject]@{ Name = "Colors"; Value = $colorsStr; Position = 1 })
    }
    $serializedAttrs = Get-SerializedAttributes $attrs
    
    # 4.4 Set Prices
    $regularPrice = $prod.price
    $salePrice = ""
    $price = $prod.price
    if ($prod.oldPrice) {
        $regularPrice = $prod.oldPrice
        $salePrice = $prod.price
    }
    $sku = "EV-" + $prod.brand.Substring(0, [Math]::Min(3, $prod.brand.Length)).ToUpper() + "-" + $prodId
    
    # Generate Attachment IDs
    $featuredAttachId = 1000 + ($prodIndex * 10)
    $galleryIds = @()
    for ($k = 1; $k -lt $prod.images.Count; $k++) {
        $galleryIds += (1000 + ($prodIndex * 10) + $k)
    }
    $galleryIdsStr = $galleryIds -join ","
    
    # 4.5 Output Product XML Item
    [void]$xml.AppendLine('  <item>')
    [void]$xml.AppendLine("    <title><![CDATA[$($prod.name)]]></title>")
    [void]$xml.AppendLine("    <link>http://localhost/elevora/product/$handle/</link>")
    [void]$xml.AppendLine("    <pubDate>Wed, 01 Jul 2026 12:00:00 +0000</pubDate>")
    [void]$xml.AppendLine("    <dc:creator><![CDATA[admin]]></dc:creator>")
    [void]$xml.AppendLine('    <guid isPermaLink="false">http://localhost/elevora/?post_type=product&amp;p=' + $prodId + '</guid>')
    [void]$xml.AppendLine("    <description></description>")
    [void]$xml.AppendLine("    <content:encoded><![CDATA[$descHtml]]></content:encoded>")
    [void]$xml.AppendLine("    <excerpt:encoded><![CDATA[$($prod.description)]]></excerpt:encoded>")
    [void]$xml.AppendLine("    <wp:post_id>$prodId</wp:post_id>")
    [void]$xml.AppendLine("    <wp:post_date><![CDATA[2026-07-01 12:00:00]]></wp:post_date>")
    [void]$xml.AppendLine("    <wp:post_date_gmt><![CDATA[2026-07-01 12:00:00]]></wp:post_date_gmt>")
    [void]$xml.AppendLine("    <wp:comment_status><![CDATA[open]]></wp:comment_status>")
    [void]$xml.AppendLine("    <wp:ping_status><![CDATA[closed]]></wp:ping_status>")
    [void]$xml.AppendLine("    <wp:post_name><![CDATA[$handle]]></wp:post_name>")
    [void]$xml.AppendLine("    <wp:status><![CDATA[publish]]></wp:status>")
    [void]$xml.AppendLine("    <wp:post_parent>0</wp:post_parent>")
    [void]$xml.AppendLine("    <wp:menu_order>0</wp:menu_order>")
    [void]$xml.AppendLine("    <wp:post_type><![CDATA[product]]></wp:post_type>")
    [void]$xml.AppendLine("    <wp:post_password><![CDATA[]]></wp:post_password>")
    [void]$xml.AppendLine("    <wp:is_sticky>0</wp:is_sticky>")
    
    # Categories & Tags
    $catSlug = $prod.category.ToLower() -replace '[^a-z0-9]', '-'
    [void]$xml.AppendLine('    <category domain="product_cat" nicename="' + $catSlug + '"><![CDATA[' + $prod.category + ']]></category>')
    if ($prod.badge) {
        $badgeSlug = $prod.badge.ToLower() -replace '[^a-z0-9]', '-'
        [void]$xml.AppendLine('    <category domain="product_tag" nicename="' + $badgeSlug + '"><![CDATA[' + $prod.badge + ']]></category>')
    }
    
    # Meta keys
    [void]$xml.AppendLine("    <wp:post_meta>")
    [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_visibility]]></wp:meta_key>")
    [void]$xml.AppendLine("      <wp:meta_value><![CDATA[visible]]></wp:meta_value>")
    [void]$xml.AppendLine("    </wp:post_meta>")
    [void]$xml.AppendLine("    <wp:post_meta>")
    [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_stock_status]]></wp:meta_key>")
    [void]$xml.AppendLine("      <wp:meta_value><![CDATA[instock]]></wp:meta_value>")
    [void]$xml.AppendLine("    </wp:post_meta>")
    [void]$xml.AppendLine("    <wp:post_meta>")
    [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_sku]]></wp:meta_key>")
    [void]$xml.AppendLine("      <wp:meta_value><![CDATA[$sku]]></wp:meta_value>")
    [void]$xml.AppendLine("    </wp:post_meta>")
    [void]$xml.AppendLine("    <wp:post_meta>")
    [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_price]]></wp:meta_key>")
    [void]$xml.AppendLine("      <wp:meta_value><![CDATA[$price]]></wp:meta_value>")
    [void]$xml.AppendLine("    </wp:post_meta>")
    [void]$xml.AppendLine("    <wp:post_meta>")
    [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_regular_price]]></wp:meta_key>")
    [void]$xml.AppendLine("      <wp:meta_value><![CDATA[$regularPrice]]></wp:meta_value>")
    [void]$xml.AppendLine("    </wp:post_meta>")
    [void]$xml.AppendLine("    <wp:post_meta>")
    [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_sale_price]]></wp:meta_key>")
    [void]$xml.AppendLine("      <wp:meta_value><![CDATA[$salePrice]]></wp:meta_value>")
    [void]$xml.AppendLine("    </wp:post_meta>")
    [void]$xml.AppendLine("    <wp:post_meta>")
    [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_manage_stock]]></wp:meta_key>")
    [void]$xml.AppendLine("      <wp:meta_value><![CDATA[yes]]></wp:meta_value>")
    [void]$xml.AppendLine("    </wp:post_meta>")
    [void]$xml.AppendLine("    <wp:post_meta>")
    [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_stock]]></wp:meta_key>")
    [void]$xml.AppendLine("      <wp:meta_value><![CDATA[$totalStock]]></wp:meta_value>")
    [void]$xml.AppendLine("    </wp:post_meta>")
    [void]$xml.AppendLine("    <wp:post_meta>")
    [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_product_attributes]]></wp:meta_key>")
    [void]$xml.AppendLine("      <wp:meta_value><![CDATA[$serializedAttrs]]></wp:meta_value>")
    [void]$xml.AppendLine("    </wp:post_meta>")
    [void]$xml.AppendLine("    <wp:post_meta>")
    [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_thumbnail_id]]></wp:meta_key>")
    [void]$xml.AppendLine("      <wp:meta_value><![CDATA[$featuredAttachId]]></wp:meta_value>")
    [void]$xml.AppendLine("    </wp:post_meta>")
    if ($galleryIdsStr) {
        [void]$xml.AppendLine("    <wp:post_meta>")
        [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_product_image_gallery]]></wp:meta_key>")
        [void]$xml.AppendLine("      <wp:meta_value><![CDATA[$galleryIdsStr]]></wp:meta_value>")
        [void]$xml.AppendLine("    </wp:post_meta>")
    }
    
    [void]$xml.AppendLine('  </item>')
    
    # 4.6 Output Image Attachments
    $imgIndex = 0
    foreach ($imgUrl in $prod.images) {
        $attachId = 1000 + ($prodIndex * 10) + $imgIndex
        $imgName = $handle + "-" + ($imgIndex + 1)
        
        [void]$xml.AppendLine('  <item>')
        [void]$xml.AppendLine("    <title><![CDATA[$($prod.name) Image $($imgIndex + 1)]]></title>")
        [void]$xml.AppendLine('    <link>http://localhost/elevora/?attachment_id=' + $attachId + '</link>')
        [void]$xml.AppendLine("    <pubDate>Wed, 01 Jul 2026 12:00:00 +0000</pubDate>")
        [void]$xml.AppendLine("    <dc:creator><![CDATA[admin]]></dc:creator>")
        [void]$xml.AppendLine('    <guid isPermaLink="false">http://localhost/elevora/?attachment_id=' + $attachId + '</guid>')
        [void]$xml.AppendLine("    <wp:post_id>$attachId</wp:post_id>")
        [void]$xml.AppendLine("    <wp:post_date><![CDATA[2026-07-01 12:00:00]]></wp:post_date>")
        [void]$xml.AppendLine("    <wp:post_date_gmt><![CDATA[2026-07-01 12:00:00]]></wp:post_date_gmt>")
        [void]$xml.AppendLine("    <wp:comment_status><![CDATA[open]]></wp:comment_status>")
        [void]$xml.AppendLine("    <wp:ping_status><![CDATA[closed]]></wp:ping_status>")
        [void]$xml.AppendLine("    <wp:post_name><![CDATA[$imgName]]></wp:post_name>")
        [void]$xml.AppendLine("    <wp:status><![CDATA[inherit]]></wp:status>")
        [void]$xml.AppendLine("    <wp:post_parent>$prodId</wp:post_parent>")
        [void]$xml.AppendLine("    <wp:menu_order>$imgIndex</wp:menu_order>")
        [void]$xml.AppendLine("    <wp:post_type><![CDATA[attachment]]></wp:post_type>")
        [void]$xml.AppendLine("    <wp:attachment_url><![CDATA[$imgUrl]]></wp:attachment_url>")
        [void]$xml.AppendLine("    <wp:post_meta>")
        [void]$xml.AppendLine("      <wp:meta_key><![CDATA[_wp_attached_file]]></wp:meta_key>")
        [void]$xml.AppendLine("      <wp:meta_value><![CDATA[$imgUrl]]></wp:meta_value>")
        [void]$xml.AppendLine("    </wp:post_meta>")
        [void]$xml.AppendLine('  </item>')
        
        $imgIndex++
    }
    
    $prodIndex++
}

# Close the WXR RSS channel
[void]$xml.AppendLine('</channel>')
[void]$xml.AppendLine('</rss>')

Write-Host "Saving WXR XML file to: $xmlOutputPath"
[System.IO.File]::WriteAllText($xmlOutputPath, $xml.ToString(), [System.Text.Encoding]::UTF8)

Write-Host "Generation complete!"
