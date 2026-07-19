$source = "c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\elevora-wp-theme"
$desktopZip = "c:\Users\shreyash pandey\OneDrive\Desktop\elevora-wp-theme.zip"
$projectZip = "c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\elevora-wp-theme.zip"

if (Test-Path $desktopZip) { Remove-Item $desktopZip -Force -ErrorAction SilentlyContinue }
if (Test-Path $projectZip) { Remove-Item $projectZip -Force -ErrorAction SilentlyContinue }

Compress-Archive -Path $source -DestinationPath $desktopZip -Force
Copy-Item $desktopZip -Destination $projectZip -Force

Write-Output "PACKAGE_COMPLETE"
