Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$themeDir = 'c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\elevora-wp-theme'
$desktopZip = 'c:\Users\shreyash pandey\OneDrive\Desktop\elevora-wp-theme.zip'
$projectZip = 'c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\elevora-wp-theme.zip'

# 1. Update style.css
$wpHeader = @"
/*
Theme Name: Elevora Electronics
Theme URI: https://elevoratech.com/
Author: Elevora Engineering Team
Author URI: https://elevoratech.com/
Description: Premium, high-performance Electronics & Smart Devices E-commerce WordPress Theme.
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
Set-Content -Path "$themeDir\style.css" -Value ($wpHeader + "`n" + $mainCss + "`n" + $themeCss) -Encoding UTF8

# Remove old zip files if exist
if (Test-Path $desktopZip) { Remove-Item $desktopZip -Force -ErrorAction SilentlyContinue }
if (Test-Path $projectZip) { Remove-Item $projectZip -Force -ErrorAction SilentlyContinue }

# 2. Build ZIP using ZipArchive with POSIX forward slashes
$zipStream = [System.IO.File]::Open($desktopZip, [System.IO.FileMode]::Create)
$archive = New-Object System.IO.Compression.ZipArchive($zipStream, [System.IO.Compression.ZipArchiveMode]::Create)

$files = Get-ChildItem -Path $themeDir -Recurse
foreach ($file in $files) {
    if (-not $file.PSIsContainer) {
        $relPath = $file.FullName.Substring($themeDir.Length + 1).Replace('\', '/')
        $entryName = "elevora-wp-theme/" + $relPath
        
        $entry = $archive.CreateEntry($entryName, [System.IO.Compression.CompressionLevel]::Optimal)
        $entryStream = $entry.Open()
        $fileStream = [System.IO.File]::OpenRead($file.FullName)
        $fileStream.CopyTo($entryStream)
        $fileStream.Close()
        $entryStream.Close()
    }
}

$archive.Dispose()
$zipStream.Close()

# Copy desktop zip to project zip
Copy-Item $desktopZip -Destination $projectZip -Force

Write-Output "POSIX_ZIP_SUCCESSFUL"
