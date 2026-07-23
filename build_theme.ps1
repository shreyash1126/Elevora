$themeDir = 'c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\elevora-wp-theme'

# Ensure directory exists
if (-not (Test-Path "$themeDir\assets\images")) {
    New-Item -ItemType Directory -Path "$themeDir\assets\images" -Force | Out-Null
}

# 1. Generate complete self-contained style.css for WordPress
$wpHeader = @"
/*
Theme Name: Elevora Electronics
Theme URI: https://elevoratech.com/
Author: Elevora Engineering Team
Author URI: https://elevoratech.com/
Description: Premium, high-performance Electronics & Smart Devices E-commerce WordPress Theme featuring Electric Tech Blue, Matte Obsidian Black, and Vibrant Cyan styling.
Version: 2.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: elevora
Tags: e-commerce, custom-menu, dark-mode, responsive-layout, grid-layout, featured-images, theme-options

Elevora Premium Electronics WordPress Theme Stylesheet
*/

"@

$mainCss = Get-Content 'styles.css' -Raw
$themeCss = Get-Content 'theme.css' -Raw

$fullStyleContent = $wpHeader + "`n" + $mainCss + "`n" + $themeCss
Set-Content -Path "$themeDir\style.css" -Value $fullStyleContent -Encoding UTF8

# 2. Copy remaining files
$filesToCopy = @('index.php', 'functions.php', 'styles.css', 'theme.css', 'app.js', 'products.js', 'index.html', 'shop.html', 'product.html', 'quiz.html', 'checkout.html', 'about.html')
foreach ($f in $filesToCopy) {
    if (Test-Path $f) {
        Copy-Item $f -Destination "$themeDir\$f" -Force
    }
}

if (Test-Path 'assets\images') {
    Get-ChildItem 'assets\images' -Recurse | ForEach-Object {
        $dest = $_.FullName.Replace((Get-Item 'assets\images').FullName, "$themeDir\assets\images")
        if ($_.PSIsContainer) {
            if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }
        } else {
            Copy-Item $_.FullName -Destination $dest -Force
        }
    }
}

if (Test-Path 'assets\images\hero_bg.jpg') {
    Copy-Item 'assets\images\hero_bg.jpg' -Destination "$themeDir\screenshot.png" -Force
}

# 3. Create zip archive
$desktopZip = 'c:\Users\shreyash pandey\OneDrive\Desktop\elevora-wp-theme.zip'
$projectZip = 'c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\elevora-wp-theme.zip'

if (Test-Path $desktopZip) {
    Set-ItemProperty $desktopZip -Name IsReadOnly -Value $false -ErrorAction SilentlyContinue
    Remove-Item $desktopZip -Force -ErrorAction SilentlyContinue
}
if (Test-Path $projectZip) {
    Set-ItemProperty $projectZip -Name IsReadOnly -Value $false -ErrorAction SilentlyContinue
    Remove-Item $projectZip -Force -ErrorAction SilentlyContinue
}

# Use .NET ZipFile to create clean zip archive with root folder elevora-wp-theme
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($themeDir, $desktopZip)
Copy-Item $desktopZip -Destination $projectZip -Force

Write-Output "SUCCESS: Self-contained WordPress Theme elevora-wp-theme.zip created!"
