import os
import zipfile

theme_dir = r"c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\elevora-wp-theme"
desktop_zip = r"c:\Users\shreyash pandey\OneDrive\Desktop\elevora-wp-theme.zip"
project_zip = r"c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\elevora-wp-theme.zip"

# Read CSS files
with open(r"c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\styles.css", "r", encoding="utf-8") as f:
    styles_css = f.read()

with open(r"c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\theme.css", "r", encoding="utf-8") as f:
    theme_css = f.read()

wp_header = """/*
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

"""

# Write self-contained style.css
full_style = wp_header + "\n" + styles_css + "\n" + theme_css
style_css_path = os.path.join(theme_dir, "style.css")
with open(style_css_path, "w", encoding="utf-8") as f:
    f.write(full_style)

# Make sure screenshot.png exists
hero_bg = r"c:\Users\shreyash pandey\OneDrive\Desktop\Elevora\assets\images\hero_bg.jpg"
screenshot_path = os.path.join(theme_dir, "screenshot.png")
if os.path.exists(hero_bg):
    with open(hero_bg, "rb") as rf:
        with open(screenshot_path, "wb") as wf:
            wf.write(rf.read())

# Create ZIP archives containing style.css directly at the root of the zip!
for zip_path in [desktop_zip, project_zip]:
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(theme_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, theme_dir)
                zipf.write(file_path, arcname)

print("SUCCESS: elevora-wp-theme.zip created with style.css directly at root!")
