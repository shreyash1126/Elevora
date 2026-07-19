Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$themeDir = 'c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\elevora-wp-theme'
$desktopZip = 'c:\Users\shreyash pandey\OneDrive\Desktop\elevora-wp-theme.zip'
$projectZip = 'c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\elevora-wp-theme.zip'

# 1. Ensure self-contained style.css with full CSS content
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

# 2. Build ZIP putting style.css directly at the root of the zip archive!
function Create-WpThemeZip($zipPath) {
    if (Test-Path $zipPath) {
        Remove-Item $zipPath -Force
    }
    
    $zipStream = [System.IO.File]::Open($zipPath, [System.IO.FileMode]::Create)
    $archive = New-Object System.IO.Compression.ZipArchive($zipStream, [System.IO.Compression.ZipArchiveMode]::Create)

    $files = Get-ChildItem -Path $themeDir -Recurse
    foreach ($file in $files) {
        if (-not $file.PSIsContainer) {
            $relativePath = $file.FullName.Substring($themeDir.Length + 1).Replace('\', '/')
            $entry = $archive.CreateEntry($relativePath, [System.IO.Compression.CompressionLevel]::Optimal)
            $entryStream = $entry.Open()
            $fileStream = [System.IO.File]::OpenRead($file.FullName)
            $fileStream.CopyTo($entryStream)
            $fileStream.Close()
            $entryStream.Close()
        }
    }

    $archive.Dispose()
    $zipStream.Close()
}

Create-WpThemeZip $desktopZip
Copy-Item $desktopZip -Destination $projectZip -Force

Write-Output "ZIP_CREATED_SUCCESSFULLY"
