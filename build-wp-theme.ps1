# PowerShell script to compile Elevora static HTML files into a dynamic WordPress Theme.
# This script creates a standalone theme folder 'elevora-wp-theme' and zips it up for easy installation.

$workspaceRoot = $PSScriptRoot
$themeDir = Join-Path $workspaceRoot "elevora-wp-theme"
$zipPath = Join-Path $workspaceRoot "elevora-wp-theme.zip"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

Write-Host "Creating WordPress theme in: $themeDir"

# Cleanup old theme build if exists
if (Test-Path $themeDir) {
    Remove-Item $themeDir -Recurse -Force
}
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

# Create theme folders
$folders = @(
    "assets",
    "assets/css",
    "assets/js",
    "assets/images"
)
foreach ($f in $folders) {
    $path = Join-Path $themeDir $f
    New-Item -ItemType Directory -Force -Path $path | Out-Null
}

# Copy Assets
Write-Host "Copying theme assets (CSS, JS, Images)..."
Copy-Item (Join-Path $workspaceRoot "css/*") (Join-Path $themeDir "assets/css/") -Force
Copy-Item (Join-Path $workspaceRoot "js/*") (Join-Path $themeDir "assets/js/") -Force
Copy-Item (Join-Path $workspaceRoot "images/*") (Join-Path $themeDir "assets/images/") -Force

# Patch the copied JS files to convert relative HTML extensions to dynamic WordPress URLs
Write-Host "Patching javascript files for WordPress compatibility..."
$jsFiles = Get-ChildItem -Path (Join-Path $themeDir "assets/js/") -Filter *.js
foreach ($file in $jsFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace static HTML page references with template getThemeUrl calls inside template strings
    $content = $content -replace 'shop\.html', '${getThemeUrl("shop")}'
    $content = $content -replace 'product\.html', '${getThemeUrl("product")}'
    $content = $content -replace 'cart\.html', '${getThemeUrl("cart")}'
    $content = $content -replace 'checkout\.html', '${getThemeUrl("checkout")}'
    $content = $content -replace 'wishlist\.html', '${getThemeUrl("wishlist")}'
    $content = $content -replace 'my-account\.html', '${getThemeUrl("my-account")}'
    $content = $content -replace 'about\.html', '${getThemeUrl("about")}'
    $content = $content -replace 'contact\.html', '${getThemeUrl("contact")}'
    $content = $content -replace 'faq\.html', '${getThemeUrl("faq")}'
    $content = $content -replace 'blog\.html', '${getThemeUrl("blog")}'
    $content = $content -replace 'track-order\.html', '${getThemeUrl("track-order")}'
    $content = $content -replace 'index\.html', '${getThemeUrl("index")}'

    # Output back to file
    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
}

# ==============================================================================
# Helper to write standard theme files
# ==============================================================================
function Write-ThemeFile($fileName, $fileContent) {
    $path = Join-Path $themeDir $fileName
    [System.IO.File]::WriteAllText($path, $fileContent, $utf8NoBom)
    Write-Host "  Written: $fileName"
}

# Write 1. style.css (Theme metadata sheet)
$styleCss = @'
/*
Theme Name: Elevora
Theme URI: https://elevora.com
Author: Elevora Team
Author URI: https://elevora.com
Description: Premium, fast, and responsive ecommerce theme for tech accessories, smart gadgets, and headphones. Includes dark mode support and custom templates.
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: elevora
*/
'@
Write-ThemeFile "style.css" $styleCss

# Write 2. functions.php (Core Theme Functionality)
$functionsPhp = @'
<?php
/**
 * Elevora Theme Functions and Definitions
 */

if ( ! function_exists( 'elevora_setup' ) ) {
    function elevora_setup() {
        // Automatic Feed links
        add_theme_support( 'automatic-feed-links' );

        // Document Title
        add_theme_support( 'title-tag' );

        // Post Thumbnails
        add_theme_support( 'post-thumbnails' );

        // Register Menus
        register_nav_menus( array(
            'primary' => esc_html__( 'Primary Menu', 'elevora' ),
        ) );

        // HTML5 Support
        add_theme_support( 'html5', array(
            'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script',
        ) );

        // Declare WooCommerce Support
        add_theme_support( 'woocommerce' );
        add_theme_support( 'wc-product-gallery-zoom' );
        add_theme_support( 'wc-product-gallery-lightbox' );
        add_theme_support( 'wc-product-gallery-slider' );
    }
}
add_action( 'after_setup_theme', 'elevora_setup' );

/**
 * Enqueue styles and scripts.
 */
function elevora_scripts() {
    // Fonts & FontAwesome
    wp_enqueue_style( 'font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0' );

    // Core Theme Stylesheets
    wp_enqueue_style( 'elevora-style-meta', get_stylesheet_uri() );
    wp_enqueue_style( 'elevora-core-style', get_template_directory_uri() . '/assets/css/style.css', array(), '1.0.0' );
    wp_enqueue_style( 'elevora-animations', get_template_directory_uri() . '/assets/css/animations.css', array(), '1.0.0' );
    wp_enqueue_style( 'elevora-responsive', get_template_directory_uri() . '/assets/css/responsive.css', array(), '1.0.0' );

    // Theme JS Dependencies
    wp_enqueue_script( 'elevora-products-data', get_template_directory_uri() . '/assets/js/products-data.js', array(), '1.0.0', true );
    wp_enqueue_script( 'elevora-darkmode', get_template_directory_uri() . '/assets/js/darkmode.js', array(), '1.0.0', true );
    wp_enqueue_script( 'elevora-slider', get_template_directory_uri() . '/assets/js/slider.js', array(), '1.0.0', true );
    wp_enqueue_script( 'elevora-script', get_template_directory_uri() . '/assets/js/script.js', array('elevora-products-data'), '1.0.0', true );
    wp_enqueue_script( 'elevora-cart', get_template_directory_uri() . '/assets/js/cart.js', array('elevora-products-data'), '1.0.0', true );
    wp_enqueue_script( 'elevora-wishlist', get_template_directory_uri() . '/assets/js/wishlist.js', array('elevora-products-data'), '1.0.0', true );
    wp_enqueue_script( 'elevora-search', get_template_directory_uri() . '/assets/js/search.js', array('elevora-products-data'), '1.0.0', true );
    wp_enqueue_script( 'elevora-filters', get_template_directory_uri() . '/assets/js/filters.js', array('elevora-products-data'), '1.0.0', true );

    // Pass configuration variables to javascript files
    wp_localize_script( 'elevora-script', 'ElevoraThemeSettings', array(
        'template_url' => get_template_directory_uri(),
        'home_url'     => home_url( '/' )
    ) );
}
add_action( 'wp_enqueue_scripts', 'elevora_scripts' );

/**
 * Fallback menu rendering when no WP menu is configured
 */
function elevora_fallback_menu() {
    ?>
    <!-- New Arrivals -->
    <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="category-nav-item nav-link">New Arrivals</a>

    <!-- Mobile Accessories -->
    <div class="category-nav-item">
      Mobile Accessories <i class="fa-solid fa-chevron-down"></i>
      <div class="category-dropdown">
        <a href="<?php echo esc_url( home_url( '/shop/?category=Mobile%20Accessories' ) ); ?>" class="dropdown-link">Mobile Accessories</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Power%20Banks' ) ); ?>" class="dropdown-link">Power Banks</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Charging%20Cables' ) ); ?>" class="dropdown-link">Charging Cables</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Wireless%20Chargers' ) ); ?>" class="dropdown-link">Wireless Chargers</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Phone%20Holders' ) ); ?>" class="dropdown-link">Phone Holders</a>
      </div>
    </div>

    <!-- Tech Gadgets -->
    <div class="category-nav-item">
      Tech Gadgets <i class="fa-solid fa-chevron-down"></i>
      <div class="category-dropdown">
        <a href="<?php echo esc_url( home_url( '/shop/?category=Bluetooth%20Speakers' ) ); ?>" class="dropdown-link">Bluetooth Speakers</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Floating%20Lamps' ) ); ?>" class="dropdown-link">Floating Lamps</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Clocks%20%26%20Timers' ) ); ?>" class="dropdown-link">Clocks & Timers</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=RGB%20%26%20Mood%20Lighting' ) ); ?>" class="dropdown-link">RGB & Mood Lighting</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Tech%20Gadgets' ) ); ?>" class="dropdown-link">Tech Accessories</a>
      </div>
    </div>

    <!-- Tools & Utility -->
    <div class="category-nav-item">
      Tools & Utility <i class="fa-solid fa-chevron-down"></i>
      <div class="category-dropdown">
        <a href="<?php echo esc_url( home_url( '/shop/?category=DIY%20Tools' ) ); ?>" class="dropdown-link">DIY Tools</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Multi%20Tools' ) ); ?>" class="dropdown-link">Multi Tools</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Humidifiers' ) ); ?>" class="dropdown-link">Humidifiers</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Home%20Utility' ) ); ?>" class="dropdown-link">Home Utility</a>
      </div>
    </div>

    <!-- Car & Travel -->
    <div class="category-nav-item">
      Car & Travel <i class="fa-solid fa-chevron-down"></i>
      <div class="category-dropdown">
        <a href="<?php echo esc_url( home_url( '/shop/?category=Dashboard%20Accessories' ) ); ?>" class="dropdown-link">Dashboard Accessories</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Mobile%20Chargers' ) ); ?>" class="dropdown-link">Mobile Chargers</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Tyre%20Inflators' ) ); ?>" class="dropdown-link">Tyre Inflators</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Vacuum%20Cleaners' ) ); ?>" class="dropdown-link">Vacuum Cleaners</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Car%20Utility' ) ); ?>" class="dropdown-link">Car Utility</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=Travel%20Accessories' ) ); ?>" class="dropdown-link">Travel Accessories</a>
      </div>
    </div>

    <!-- Offers & Combos -->
    <div class="category-nav-item">
      Offers & Combos <i class="fa-solid fa-chevron-down"></i>
      <div class="category-dropdown">
        <a href="<?php echo esc_url( home_url( '/shop/?badge=sale' ) ); ?>" class="dropdown-link">Special Offers</a>
        <a href="<?php echo esc_url( home_url( '/shop/?tag=combo' ) ); ?>" class="dropdown-link">Combo Deals</a>
        <a href="<?php echo esc_url( home_url( '/shop/?tag=clearance' ) ); ?>" class="dropdown-link">Clearance Sale</a>
      </div>
    </div>

    <!-- Shop By Price -->
    <div class="category-nav-item">
      Shop By Price <i class="fa-solid fa-chevron-down"></i>
      <div class="category-dropdown">
        <a href="<?php echo esc_url( home_url( '/shop/?maxPrice=10' ) ); ?>" class="dropdown-link">Under $10</a>
        <a href="<?php echo esc_url( home_url( '/shop/?maxPrice=20' ) ); ?>" class="dropdown-link">Under $20</a>
        <a href="<?php echo esc_url( home_url( '/shop/?maxPrice=30' ) ); ?>" class="dropdown-link">Under $30</a>
        <a href="<?php echo esc_url( home_url( '/shop/?maxPrice=50' ) ); ?>" class="dropdown-link">Under $50</a>
      </div>
    </div>

    <!-- Gifting -->
    <div class="category-nav-item">
      Gifting <i class="fa-solid fa-chevron-down"></i>
      <div class="category-dropdown">
        <a href="<?php echo esc_url( home_url( '/shop/?tag=birthday' ) ); ?>" class="dropdown-link">Birthday Gifts</a>
        <a href="<?php echo esc_url( home_url( '/shop/?tag=tech-gifts' ) ); ?>" class="dropdown-link">Tech Gifts</a>
        <a href="<?php echo esc_url( home_url( '/shop/?tag=quirky' ) ); ?>" class="dropdown-link">Quirky Gifts</a>
      </div>
    </div>

    <!-- Support -->
    <div class="category-nav-item">
      Support <i class="fa-solid fa-chevron-down"></i>
      <div class="category-dropdown">
        <a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>" class="dropdown-link">Track Order</a>
        <a href="<?php echo esc_url( home_url( '/shipping-policy/' ) ); ?>" class="dropdown-link">Shipping Policy</a>
        <a href="<?php echo esc_url( home_url( '/refund-policy/' ) ); ?>" class="dropdown-link">Return Policy</a>
        <a href="<?php echo esc_url( home_url( '/faq/' ) ); ?>" class="dropdown-link">FAQ</a>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="dropdown-link">Contact Us</a>
      </div>
    </div>
    <?php
}

/**
 * Add filter to style default active page classes in fallbacks
 */
function elevora_nav_menu_link_attributes( $atts, $item, $args ) {
    $atts['class'] = 'nav-link';
    if ( in_array( 'current-menu-item', $item->classes ) ) {
        $atts['class'] .= ' active';
    }
    return $atts;
}
add_filter( 'nav_menu_link_attributes', 'elevora_nav_menu_link_attributes', 10, 3 );
'@
Write-ThemeFile "functions.php" $functionsPhp

# Write 3. header.php (Site header layout)
$headerPhp = @'
<!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme="light">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
  
  <script>
    // Set theme and create global utility paths before loading assets
    window.ElevoraThemeSettings = {
      template_url: '<?php echo esc_js( get_template_directory_uri() ); ?>',
      home_url: '<?php echo esc_js( home_url( '/' ) ); ?>'
    };
    function getThemeUrl(page) {
      if (page === 'index' || page === '') {
        return window.ElevoraThemeSettings.home_url;
      }
      return window.ElevoraThemeSettings.home_url + page + '/';
    }
  </script>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

  <!-- Announcement Bar -->
  <div class="announcement-bar">
    <div class="announcement-slider">
      <div class="announcement-item"><i class="fa-solid fa-truck-fast"></i> Free International Shipping on orders over <span>$75</span></div>
      <div class="announcement-item"><i class="fa-solid fa-bolt"></i> Deal of the day: <span>20% OFF</span> using code <strong>ELEVORA20</strong></div>
      <div class="announcement-item"><i class="fa-solid fa-rotate-left"></i> Hassle-Free 30 Days Return Policy</div>
    </div>
  </div>

  <!-- Header -->
  <header>
    <div class="container header-container">
      <!-- Top Row -->
      <div class="header-top-row">
        <!-- Search icon/button -->
        <div class="header-search-wrap-toggle">
          <button class="search-trigger-btn" onclick="toggleSearchOverlay()" aria-label="Search gadgets">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <!-- Centered Logo -->
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
          <span>ELEVORA</span><span class="logo-dot"></span>
        </a>

        <!-- Actions -->
        <div class="header-actions">
          <button class="action-btn theme-toggle-btn" id="theme-toggle-btn" title="Toggle Dark/Light Mode">
            <i class="fa-regular fa-moon"></i>
          </button>

          <a href="<?php echo esc_url( get_permalink( get_page_by_path( 'wishlist' ) ) ? get_permalink( get_page_by_path( 'wishlist' ) ) : home_url( '/wishlist/' ) ); ?>" class="action-btn" id="wishlist-btn" title="Wishlist">
            <i class="fa-regular fa-heart"></i>
            <span class="badge-count wishlist-count" id="wishlist-badge">0</span>
          </a>

          <button class="action-btn" id="cart-btn" onclick="openMiniCartDrawer()" title="Shopping Cart">
            <i class="fa-solid fa-shopping-bag"></i>
            <span class="badge-count cart-count" id="cart-badge">0</span>
          </button>

          <a href="<?php echo esc_url( home_url( '/my-account/' ) ); ?>" class="action-btn" title="Account Portal">
            <i class="fa-regular fa-user"></i>
          </a>

          <button class="action-btn mobile-nav-toggle" id="mobile-menu-toggle" title="Toggle Mobile Navigation">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      <!-- Bottom Row (Navigation Items) -->
      <nav class="header-bottom-row category-nav-list nav-menu" id="nav-menu">
        <?php
        if ( has_nav_menu( 'primary' ) ) {
            wp_nav_menu( array(
                'theme_location' => 'primary',
                'container'      => false,
                'items_wrap'     => '%3$s',
                'fallback_cb'    => 'elevora_fallback_menu',
            ) );
        } else {
            elevora_fallback_menu();
        }
        ?>
      </nav>
    </div>
  </header>

  <!-- Search Overlay -->
  <div class="search-overlay" id="search-overlay">
    <div class="search-overlay-container">
      <input type="text" class="header-search-input search-overlay-input" placeholder="Type to search premium gadgets...">
      <button class="search-overlay-close" onclick="closeSearchOverlay()"><i class="fa-solid fa-xmark"></i></button>
    </div>
  </div>
'@
Write-ThemeFile "header.php" $headerPhp

# Write 4. footer.php (Site footer layout)
$footerPhp = @'
  <!-- Footer -->
  <footer>
    <div class="container footer-top">
      <div class="footer-column footer-about">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
          <span>ELEVORA</span><span class="logo-dot"></span>
        </a>
        <p>Curating premium smart gadgets and mobile power essentials that match modern digital lifestyles. Buy electronics in sleek minimalist designs.</p>
        <div class="footer-socials">
          <a href="#" class="social-link" aria-label="Elevora Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" class="social-link" aria-label="Elevora Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" class="social-link" aria-label="Elevora Twitter"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" class="social-link" aria-label="Elevora LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
        </div>
      </div>
      <div class="footer-column">
        <h4>Shop</h4>
        <ul>
          <li><a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop/')); ?>">All Products</a></li>
          <li><a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop')) . '?category=headphones') : esc_url(home_url('/shop/?category=Headphones')); ?>">Headphones</a></li>
          <li><a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop')) . '?category=smart-watches') : esc_url(home_url('/shop/?category=Smart%20Watches')); ?>">Smart Watches</a></li>
          <li><a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop')) . '?category=earbuds') : esc_url(home_url('/shop/?category=Earbuds')); ?>">Earbuds</a></li>
          <li><a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop')) . '?category=power-banks') : esc_url(home_url('/shop/?category=Power%20Banks')); ?>">Power Banks</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Support</h4>
        <ul>
          <li><a href="<?php echo esc_url( home_url( '/faq/' ) ); ?>">FAQ Desk</a></li>
          <li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact Us</a></li>
          <li><a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>">Track Order</a></li>
          <li><a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('myaccount'))) : esc_url(home_url('/my-account/')); ?>">My Account</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Company</h4>
        <ul>
          <li><a href="<?php echo esc_url( home_url( '/about/' ) ); ?>">About Brand</a></li>
          <li><a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>">Tech Blog</a></li>
          <li><a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>">Privacy Guidelines</a></li>
          <li><a href="<?php echo esc_url( home_url( '/terms-conditions/' ) ); ?>">Terms & Conditions</a></li>
        </ul>
      </div>
      <div class="footer-column footer-newsletter">
        <h4>Subscribe</h4>
        <p>Get early product launches and exclusive VIP coupon discount offers directly in your inbox.</p>
        <form class="newsletter-section-form" style="display: flex; border: 1.5px solid #2d2d35; border-radius: var(--border-radius-md); overflow: hidden; background-color: #141417;">
          <input type="email" placeholder="Email address" class="newsletter-input" style="flex-grow: 1; padding: 12px; color: #ffffff;" required>
          <button type="submit" class="newsletter-btn">Join</button>
        </form>
      </div>
    </div>
    
    <div class="container footer-bottom">
      <p>&copy; <?php echo date('Y'); ?> Elevora. All rights reserved. Premium Electronics Dropshipping.</p>
      <div class="payment-methods">
        <i class="fa-brands fa-cc-visa" title="Visa"></i>
        <i class="fa-brands fa-cc-mastercard" title="Mastercard"></i>
        <i class="fa-brands fa-cc-stripe" title="Stripe"></i>
        <i class="fa-brands fa-cc-apple-pay" title="Apple Pay"></i>
      </div>
    </div>
  </footer>

  <!-- Mini Cart Drawer Modal Overlay -->
  <div class="cart-drawer-overlay" id="cart-drawer-overlay">
    <div class="cart-drawer">
      <div class="cart-drawer-header">
        <h4 class="cart-drawer-title"><i class="fa-solid fa-shopping-bag" style="color: var(--accent-dark);"></i> Your Cart</h4>
        <button class="close-drawer-btn" onclick="closeMiniCartDrawer()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="cart-drawer-items" id="cart-drawer-items">
        <!-- Loaded Dynamically via cart.js / WooCommerce AJAX -->
      </div>
      <div class="cart-drawer-footer">
        <div class="cart-totals-row">
          <span>Subtotal</span>
          <span style="font-weight: 600;" id="cart-drawer-subtotal">$0.00</span>
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 16px;">Shipping & promo coupons calculated at checkout page.</div>
        <div class="cart-drawer-actions">
          <a href="<?php echo esc_url( home_url('/cart/') ); ?>" class="btn btn-secondary" style="width: 100%;" onclick="closeMiniCartDrawer()">View Full Cart</a>
          <a href="<?php echo esc_url( home_url('/checkout/') ); ?>" class="btn btn-primary" style="width: 100%;" id="mini-cart-checkout-btn">Checkout Now</a>
        </div>
      </div>
    </div>
  </div>

  <?php wp_footer(); ?>
</body>
</html>
'@
Write-ThemeFile "footer.php" $footerPhp

# Write 5. front-page.php (Home page dynamic structures)
$frontPagePhp = @'
<?php
/**
 * Template Name: Elevora Homepage
 */
get_header(); ?>

  <!-- Hero Banner Slider -->
  <section class="hero-slider-container">
    <div class="hero-slider" id="homepage-hero-slider">
      <!-- Slide 1 -->
      <div class="hero-slide active" style="background-image: url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600');">
        <div class="container">
          <div class="hero-content">
            <span class="hero-tag">Acoustic Clarity</span>
            <h1>AeroPulse ANC Wireless</h1>
            <p>Experience silence perfected. Hybrid Active Noise Cancellation engineered to quiet busy creative environments.</p>
            <a href="<?php echo esc_url( home_url('/product/?id=1') ); ?>" class="btn btn-primary">Discover Sound</a>
          </div>
        </div>
      </div>
      <!-- Slide 2 -->
      <div class="hero-slide" style="background-image: url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600');">
        <div class="container">
          <div class="hero-content">
            <span class="hero-tag">Active Health</span>
            <h1>Apex Chrono OLED Watch</h1>
            <p>Aerospace titanium shell with always-on AMOLED panels. Trace routes, sleep depth, and heart grids.</p>
            <a href="<?php echo esc_url( home_url('/product/?id=2') ); ?>" class="btn btn-primary">Explore Health</a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Slider Indicators -->
    <div class="slider-dots" id="homepage-slider-dots">
      <span class="slider-dot active" data-index="0"></span>
      <span class="slider-dot" data-index="1"></span>
    </div>
    
    <!-- Slider Nav -->
    <div class="slider-arrows">
      <button class="slider-arrow" id="homepage-prev-btn" aria-label="Previous slide"><i class="fa-solid fa-chevron-left"></i></button>
      <button class="slider-arrow" id="homepage-next-btn" aria-label="Next slide"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
  </section>

  <!-- Category Carousel Section -->
  <section class="section-spacing container reveal-element">
    <div class="section-title-wrap">
      <div>
        <h2 class="section-title">Shop by Category</h2>
        <p class="section-subtitle">Premium curations sorted by usage profiles.</p>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="slider-arrow" id="category-carousel-prev" style="width: 40px; height: 40px; font-size: 0.8rem;"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="slider-arrow" id="category-carousel-next" style="width: 40px; height: 40px; font-size: 0.8rem;"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>

    <!-- Scrollable quick list -->
    <div style="width: 100%; overflow: hidden; position: relative;">
      <div class="category-grid" id="category-carousel-inner" style="display: flex; gap: 20px; overflow-x: auto; scrollbar-width: none; padding-bottom: 10px;">
        <!-- Card 1 -->
        <a href="<?php echo esc_url( home_url('/shop/?category=Headphones') ); ?>" class="category-card" style="flex: 0 0 250px;">
          <i class="fa-solid fa-headphones category-card-icon"></i>
          <span class="category-card-title">Headphones</span>
        </a>
        <!-- Card 2 -->
        <a href="<?php echo esc_url( home_url('/shop/?category=Smart%20Watches') ); ?>" class="category-card" style="flex: 0 0 250px;">
          <i class="fa-solid fa-clock category-card-icon"></i>
          <span class="category-card-title">Smart Watches</span>
        </a>
        <!-- Card 3 -->
        <a href="<?php echo esc_url( home_url('/shop/?category=Earbuds') ); ?>" class="category-card" style="flex: 0 0 250px;">
          <i class="fa-solid fa-ear-listen category-card-icon"></i>
          <span class="category-card-title">Wireless Earbuds</span>
        </a>
        <!-- Card 4 -->
        <a href="<?php echo esc_url( home_url('/shop/?category=Power%20Banks') ); ?>" class="category-card" style="flex: 0 0 250px;">
          <i class="fa-solid fa-battery-three-quarters category-card-icon"></i>
          <span class="category-card-title">Power Banks</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Curated Product Tabs Grid -->
  <section class="section-spacing container reveal-element">
    <div style="text-align: center; margin-bottom: 40px;">
      <h2 style="font-size: 2.25rem; font-weight: 800; font-family: Outfit;">Trending Curations</h2>
      <p style="color: var(--text-muted); margin-top: 8px;">Explore high-fidelity engineering matched with sleek modular geometries.</p>
    </div>

    <!-- Filter Buttons -->
    <div class="tabs-nav">
      <button class="tab-btn active" onclick="loadTabProducts('all')">Trending</button>
      <button class="tab-btn" onclick="loadTabProducts('new')">New Drops</button>
      <button class="tab-btn" onclick="loadTabProducts('sale')">Top Deals</button>
    </div>

    <!-- Products target loading -->
    <div class="products-grid" id="homepage-products-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">
      <!-- Populated Dynamically via Javascript Fallback / WooCommerce PHP loop -->
    </div>
  </section>

  <!-- Deal of the day section -->
  <section class="promo-deal-section reveal-element">
    <div class="container promo-deal-wrap">
      <div>
        <span style="color: var(--accent); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; display: inline-block; margin-bottom: 15px;">Limited Time Coupon Promotion</span>
        <h2 style="font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 20px; font-family: Outfit;">AeroPulse Headphone Special Deal</h2>
        <p style="color: #a0a0a5; font-size: 1rem; line-height: 1.6; margin-bottom: 30px;">Unlock an additional 20% discount on checkout loops using the verified promo code. Free shipping applies.</p>
        
        <!-- Timer boxes -->
        <div class="deal-timer-wrap">
          <div class="timer-box"><div class="timer-num" id="deal-days">02</div><div class="timer-label">Days</div></div>
          <div class="timer-box"><div class="timer-num" id="deal-hours">14</div><div class="timer-label">Hrs</div></div>
          <div class="timer-box"><div class="timer-num" id="deal-minutes">28</div><div class="timer-label">Mins</div></div>
          <div class="timer-box"><div class="timer-num" id="deal-seconds">45</div><div class="timer-label">Secs</div></div>
        </div>
        
        <div style="font-family: Outfit; font-weight: 700; font-size: 1.1rem; color: #ffffff;">Promo Code: <span style="color: var(--accent); background-color: #222; padding: 4px 8px; border-radius: var(--border-radius-sm);">ELEVORA20</span></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" alt="Special Promo Headphone" style="border-radius: var(--border-radius-lg); box-shadow: var(--shadow-lg);">
      </div>
    </div>
  </section>

  <!-- Scooter Delivery Road Divider -->
  <div class="road-divider-container" style="position: relative; height: 150px; background-color: var(--bg-secondary); overflow: hidden; margin: 40px 0;">
    <!-- Road Surface -->
    <div class="road-divider" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 35px; background-color: #222;">
      <!-- Lane Line -->
      <div class="road-lane-line" style="position: absolute; top: 50%; left: 0; width: 100%; height: 2px; border-top: 2px dashed rgba(255, 255, 255, 0.6); transform: translateY(-50%);"></div>
    </div>
    
    <!-- Speed Breakers -->
    <div class="speed-breaker" style="position: absolute; left: 30%; bottom: 25px; width: 36px; height: 18px; background: repeating-linear-gradient(-45deg, #ffd60a, #ffd60a 6px, #000 6px, #000 12px); border-radius: 18px 18px 0 0; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>
    <div class="speed-breaker" style="position: absolute; left: 70%; bottom: 25px; width: 36px; height: 18px; background: repeating-linear-gradient(-45deg, #ffd60a, #ffd60a 6px, #000 6px, #000 12px); border-radius: 18px 18px 0 0; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>

    <!-- Delivery Boy Scooter image -->
    <div class="delivery-scooter-wrap" id="delivery-scooter-wrap" style="position: absolute; bottom: 32px; left: -130px; width: 125px; height: 100px; background-image: url('<?php echo get_template_directory_uri(); ?>/assets/images/road-delivery.png'); background-size: contain; background-repeat: no-repeat; z-index: 3; transition: none;"></div>
  </div>

  <!-- Why Choose Us Cards -->
  <section class="section-spacing container reveal-element">
    <div style="text-align: center; margin-bottom: 40px;">
      <h2 class="section-title">Why Elevora?</h2>
      <p class="section-subtitle" style="margin: 8px auto 0;">We build premium tech essentials with bulletproof warranties and secure delivery pipelines.</p>
    </div>

    <div class="usps-grid">
      <div class="usp-card">
        <i class="fa-solid fa-truck-fast usp-icon"></i>
        <h4 class="usp-title">Fast Shipping</h4>
        <p class="usp-text">Express worldwide logistics direct to your doorstep with real-time route tracing codes.</p>
      </div>
      <div class="usp-card">
        <i class="fa-solid fa-shield-halved usp-icon"></i>
        <h4 class="usp-title">Secure Checkout</h4>
        <p class="usp-text">Encrypted token gateways protecting your payments via major international card processors.</p>
      </div>
      <div class="usp-card">
        <i class="fa-solid fa-rotate-left usp-icon"></i>
        <h4 class="usp-title">30-Day Returns</h4>
        <p class="usp-text">Not fully satisfied? Return your unused gadget within 30 days for a swift full refund.</p>
      </div>
      <div class="usp-card">
        <i class="fa-solid fa-circle-question usp-icon"></i>
        <h4 class="usp-title">24/7 Desk Help</h4>
        <p class="usp-text">Professional service engineers answering technical questions and order inquiries day or night.</p>
      </div>
    </div>
  </section>

  <!-- Interactive Accordion FAQs -->
  <section class="section-spacing container reveal-element">
    <div style="text-align: center; margin-bottom: 50px;">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p class="section-subtitle" style="margin: 8px auto 0;">Find swift solutions to common inquiries about shipping, warranty, and returns.</p>
    </div>

    <div class="faq-accordion">
      <div class="faq-item">
        <button class="faq-question">
          How long does delivery take?
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Standard delivery takes 5-10 business days depending on location. Express courier delivery options are available at checkout, delivering within 2-4 business days.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          Do Elevora gadgets come with a warranty?
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes, every single product sold on Elevora comes with a standard 12-month manufacturer warranty. The warranty covers hardware malfunctions and battery degradation defects.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          How can I track my package?
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Once your order is processed, you will receive an email containing a route tracking code. Simply enter this tracking number on our "Track Order" portal to view live courier status updates.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Customer Newsletter Section -->
  <section style="background-color: var(--bg-secondary); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 80px 0;" class="reveal-element">
    <div class="container" style="max-width: 600px; text-align: center;">
      <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 12px; font-family: Outfit;">Stay in the Tech Loop</h2>
      <p style="color: var(--text-muted); margin-bottom: 24px; font-size: 0.95rem;">Join Elevora's circular letters for early drops, exclusive coupon codes, and guides.</p>
      <form class="newsletter-form" style="max-width: 500px; margin: 0 auto;">
        <input type="email" placeholder="Your premium email address" class="newsletter-input" required style="background-color: var(--bg-primary); color: var(--text-primary); border: 1.5px solid var(--border-color);">
        <button type="submit" class="newsletter-btn">Subscribe</button>
      </form>
    </div>
  </section>

  <!-- Brand Story Section -->
  <section class="brand-story-section">
    <div class="container brand-story-wrap">
      <!-- Left Stack Boxes Column -->
      <div class="brand-story-img-frame">
        <img src="https://images.unsplash.com/photo-1566241477600-ac026ad43874?w=600" alt="Elevora packages" class="brand-story-img">
      </div>
      <!-- Right Details Column -->
      <div class="brand-story-content">
        <h2 class="brand-story-title">All Things Tech & Trusted</h2>
        <p class="brand-story-text">
          At Elevora, we offer more than gadgets—we deliver experiences. With handpicked, authentic products for every occasion, we set trends, not follow them!
        </p>
        <a href="<?php echo esc_url( home_url('/about/') ); ?>" class="brand-story-btn" style="display: inline-block; padding: 12px 24px; text-align: center;">
          Get to Know Us
        </a>
      </div>
    </div>
  </section>

  <!-- Dynamic Scooter animation listener -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      // Scooter Scroll Trigger Animation with Lerp and Bounce
      const scooter = document.getElementById("delivery-scooter-wrap");
      if (scooter) {
        let targetMovePct = -15;
        let currentMovePct = -15;

        // Initialize targetMovePct based on current scroll position
        const initScroll = () => {
          const rect = scooter.parentElement.getBoundingClientRect();
          const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
          if (rect.top <= viewHeight && rect.bottom >= 0) {
            const visiblePct = (viewHeight - rect.top) / (viewHeight + rect.height);
            targetMovePct = Math.min(Math.max(visiblePct * 125, -15), 115);
          }
        };
        initScroll();

        window.addEventListener("scroll", () => {
          const rect = scooter.parentElement.getBoundingClientRect();
          const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
          if (rect.top <= viewHeight && rect.bottom >= 0) {
            const visiblePct = (viewHeight - rect.top) / (viewHeight + rect.height);
            targetMovePct = Math.min(Math.max(visiblePct * 125, -15), 115);
          }
        }, { passive: true });

        function animate() {
          // Lerp for smooth horizontal movement
          currentMovePct += (targetMovePct - currentMovePct) * 0.08;
          
          // Update horizontal position
          scooter.style.left = `calc(${currentMovePct}% - 125px)`;

          // Speed breakers at 30% and 70%
          const b1 = 30;
          const b2 = 70;
          const halfWidth = 6; // Width of collision zone

          let bump = 0;
          let tilt = 0;

          if (Math.abs(currentMovePct - b1) < halfWidth) {
            const diff = (currentMovePct - b1) / halfWidth;
            bump = 16 * Math.cos(diff * Math.PI / 2);
            tilt = -12 * diff * (bump / 16);
          } else if (Math.abs(currentMovePct - b2) < halfWidth) {
            const diff = (currentMovePct - b2) / halfWidth;
            bump = 16 * Math.cos(diff * Math.PI / 2);
            tilt = -12 * diff * (bump / 16);
          }

          scooter.style.transform = `translateY(-${bump}px) rotate(${tilt}deg)`;

          requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
      }

      // Simple Deal Countdown Clock
      const daysBox = document.getElementById("deal-days");
      const hrsBox = document.getElementById("deal-hours");
      const minsBox = document.getElementById("deal-minutes");
      const secsBox = document.getElementById("deal-seconds");

      if (daysBox) {
        let totalSecs = (2 * 24 * 3600) + (14 * 3600) + (28 * 60) + 45;
        setInterval(() => {
          if (totalSecs > 0) {
            totalSecs--;
            const d = Math.floor(totalSecs / (3600 * 24));
            const h = Math.floor((totalSecs % (3600 * 24)) / 3600);
            const m = Math.floor((totalSecs % 3600) / 60);
            const s = totalSecs % 60;

            daysBox.textContent = d.toString().padStart(2, '0');
            hrsBox.textContent = h.toString().padStart(2, '0');
            minsBox.textContent = m.toString().padStart(2, '0');
            secsBox.textContent = s.toString().padStart(2, '0');
          }
        }, 1000);
      }
    });
  </script>

<?php get_footer(); ?>
'@
Write-ThemeFile "front-page.php" $frontPagePhp

# Write 6. index.php (Standard blog listing)
$indexPhp = @'
<?php
/**
 * The main template file
 */
get_header(); ?>

  <!-- Hero block title -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);"><?php single_post_title(); ?></span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;"><?php single_post_title(); ?></h1>
    </div>
  </section>

  <!-- Main Articles Grid -->
  <main class="container">
    <div class="blog-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 80px;">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <article class="blog-card reveal-element revealed" id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); overflow: hidden; background-color: var(--bg-primary); display: flex; flex-direction: column;">
          <div class="blog-media" style="height: 220px; overflow: hidden; background-color: var(--bg-secondary);">
            <?php if ( has_post_thumbnail() ) : ?>
              <?php the_post_thumbnail('medium_large', array('style' => 'width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow);')); ?>
            <?php else : ?>
              <img src="https://images.unsplash.com/photo-1609592424085-f55a64388432?w=600" alt="Placeholder" style="width: 100%; height: 100%; object-fit: cover;">
            <?php endif; ?>
          </div>
          <div class="blog-info" style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
            <div class="blog-meta-row" style="display: flex; gap: 16px; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
              <span><i class="fa-regular fa-calendar"></i> <?php echo get_the_date(); ?></span>
              <span>&bull;</span>
              <span><i class="fa-regular fa-user"></i> <?php the_author(); ?></span>
            </div>
            <h3 class="blog-card-title" style="font-family: 'Outfit'; font-size: 1.25rem; font-weight: 700; line-height: 1.3; margin-bottom: 12px;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
            <p class="blog-card-summary" style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; flex-grow: 1;"><?php echo wp_trim_words( get_the_excerpt(), 15, '...' ); ?></p>
            <a href="<?php the_permalink(); ?>" class="blog-read-btn" style="font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px; color: var(--text-primary); border-bottom: 2px solid var(--accent); width: fit-content; padding-bottom: 2px;">Read Article <i class="fa-solid fa-chevron-right"></i></a>
          </div>
        </article>
      <?php endwhile; else : ?>
        <p><?php esc_html_e( 'No posts found.', 'elevora' ); ?></p>
      <?php endif; ?>
    </div>

    <!-- Pagination -->
    <div class="pagination" style="display: flex; justify-content: center; gap: 8px; margin-bottom: 80px;">
      <?php
      echo paginate_links( array(
          'prev_text' => '<i class="fa-solid fa-chevron-left"></i>',
          'next_text' => '<i class="fa-solid fa-chevron-right"></i>',
          'type'      => 'plain',
      ) );
      ?>
    </div>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "index.php" $indexPhp

# Write 7. single.php (Single blog post detailed layout)
$singlePhp = @'
<?php
/**
 * The template for displaying all single posts
 */
get_header(); ?>

  <!-- Article View container -->
  <main class="container">
    <?php while ( have_posts() ) : the_post(); ?>
      <article class="article-wrap" id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="max-width: 800px; margin: 40px auto 80px;">
        <div class="article-meta" style="display: flex; gap: 16px; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px;">
          <span><i class="fa-regular fa-calendar"></i> <?php echo get_the_date(); ?></span>
          <span>&bull;</span>
          <span><i class="fa-regular fa-user"></i> <?php the_author(); ?></span>
        </div>
        <h1 class="article-title" style="font-family: 'Outfit'; font-size: 2.75rem; font-weight: 800; line-height: 1.2; margin-bottom: 24px; letter-spacing: -0.02em;"><?php the_title(); ?></h1>
        
        <?php if ( has_post_thumbnail() ) : ?>
          <div class="article-hero-image" style="border-radius: var(--border-radius-lg); overflow: hidden; margin-bottom: 40px; height: 450px; background-color: var(--bg-secondary);">
            <?php the_post_thumbnail('large', array('style' => 'width: 100%; height: 100%; object-fit: cover;')); ?>
          </div>
        <?php endif; ?>

        <div class="article-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
          <?php the_content(); ?>
        </div>
        
        <!-- Comments Section Wrapper -->
        <?php
        if ( comments_open() || get_comments_number() ) :
            comments_template();
        endif;
        ?>
      </article>
    <?php endwhile; ?>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "single.php" $singlePhp

# Write 8. page.php (Default static page view wrapper)
$pagePhp = @'
<?php
/**
 * The template for displaying all pages
 */
get_header(); ?>

  <!-- Breadcrumb and page title -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);"><?php the_title(); ?></span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;"><?php the_title(); ?></h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <?php while ( have_posts() ) : the_post(); ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <div class="entry-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
          <?php the_content(); ?>
        </div>
      </article>
    <?php endwhile; ?>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "page.php" $pagePhp

# Write 9. woocommerce.php (WooCommerce main view wrapper)
$woocommercePhp = @'
<?php
/**
 * The template for displaying WooCommerce content
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Shop Catalog</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Elevora Shop</h1>
    </div>
  </section>

  <!-- WooCommerce dynamic page elements -->
  <main class="container" style="margin-bottom: 80px;">
    <?php woocommerce_content(); ?>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "woocommerce.php" $woocommercePhp

# Write 10. 404.php (Custom error page)
$error404Php = @'
<?php
/**
 * The template for displaying 404 pages (Not Found)
 */
get_header(); ?>

  <main class="container" style="text-align: center; padding: 120px 24px; max-width: 600px; margin: 0 auto;">
    <div class="error-code" style="font-family: 'Outfit'; font-size: 6rem; font-weight: 800; color: var(--accent-dark); line-height: 1; margin-bottom: 20px;">404</div>
    <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 16px; font-family: Outfit; letter-spacing: -0.02em;">Oops! Page Not Found</h1>
    <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 32px;">The gadget link or document location you are looking for has been moved, renamed, or is temporarily offline.</p>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary" style="display: inline-flex; width: auto;">Return To Home</a>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "404.php" $error404Php

# Write 11. Custom Page Templates (Offline Static Fallback Compatibility)
# About page template
$templateAboutPhp = @'
<?php
/**
 * Template Name: Elevora About Brand
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">About Us</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">About Elevora</h1>
    </div>
  </section>

  <main class="container">
    <div class="about-story-grid reveal-element revealed" style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: center; margin-bottom: 80px;">
      <div class="about-story-img" style="border-radius: var(--border-radius-lg); overflow: hidden; box-shadow: var(--shadow-lg); background-color: var(--bg-secondary);">
        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" alt="Elevora creation story" style="width: 100%; display: block;">
      </div>
      <div>
        <span style="color: var(--accent-dark); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; display: inline-block; margin-bottom: 12px;">Our Brand Story</span>
        <h2 style="font-family: Outfit; font-size: 2rem; font-weight: 800; margin-bottom: 18px; line-height: 1.3;">Elevate Your Tech Lifestyle</h2>
        <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.95rem; line-height: 1.7;">Elevora was founded in 2026 with a singular, clear vision: to design and curate highly aesthetic, luxury mobile accessories that fit seamlessly into modern daily routines.</p>
        <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 0.95rem; line-height: 1.7;">We bridge the gap between utility and design elegance. By prioritizing high-grade raw components, advanced power safety certifications, and clean geometric designs, our gadgets act as statements of fashion as much as blocks of high performance.</p>
        <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="btn btn-primary" style="width: auto;">Shop The Catalog</a>
      </div>
    </div>

    <!-- Core Values -->
    <section class="reveal-element revealed" style="margin-bottom: 80px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h2 style="font-family: Outfit; font-size: 2rem; font-weight: 800;">Our Core Values</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 8px;">The principles guiding our designs and customer support pipelines.</p>
      </div>

      <div class="about-values-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
        <div class="value-card" style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 32px; text-align: center; background-color: var(--bg-secondary);">
          <i class="fa-solid fa-cube" style="font-size: 2.5rem; color: var(--accent-dark); margin-bottom: 20px; display: inline-block;"></i>
          <h3 style="font-family: Outfit; font-size: 1.15rem; margin-bottom: 12px;">Luxury Minimalism</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">No unnecessary layers. Sleek matte blocks, clean lines, and soft palettes matching the modern professional.</p>
        </div>
        <div class="value-card" style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 32px; text-align: center; background-color: var(--bg-secondary);">
          <i class="fa-solid fa-shield-halved" style="font-size: 2.5rem; color: var(--accent-dark); margin-bottom: 20px; display: inline-block;"></i>
          <h3 style="font-family: Outfit; font-size: 1.15rem; margin-bottom: 12px;">Premium Quality</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">Aerospace-grade titanium, dual-layer dacron shielding, and smart lithium protection safety grids.</p>
        </div>
        <div class="value-card" style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 32px; text-align: center; background-color: var(--bg-secondary);">
          <i class="fa-solid fa-globe" style="font-size: 2.5rem; color: var(--accent-dark); margin-bottom: 20px; display: inline-block;"></i>
          <h3 style="font-family: Outfit; font-size: 1.15rem; margin-bottom: 12px;">Global Accessibility</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">Fast logistics hubs supporting reliable shipping to over 150 countries with active routing codes.</p>
        </div>
      </div>
    </section>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-about.php" $templateAboutPhp

# Contact page template
$templateContactPhp = @'
<?php
/**
 * Template Name: Elevora Contact
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Contact Support</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Contact Us</h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px;">
      <!-- Contact Info -->
      <div>
        <h2 style="font-family: Outfit; font-size: 1.75rem; font-weight: 800; margin-bottom: 24px;">Get in Touch</h2>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 30px;">Have questions about gadget specifications, custom corporate orders, or active delivery tracking? Contact our helpdesk anytime.</p>
        
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="display: flex; gap: 16px; align-items: start;">
            <i class="fa-solid fa-location-dot" style="font-size: 1.25rem; color: var(--accent-dark); margin-top: 4px;"></i>
            <div>
              <h4 style="font-weight: 700; font-size: 0.95rem;">Warehouse HQ</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">2026 Tech Boulevard, Silicon Valley, CA 94025, USA</p>
            </div>
          </div>
          <div style="display: flex; gap: 16px; align-items: start;">
            <i class="fa-solid fa-envelope" style="font-size: 1.25rem; color: var(--accent-dark); margin-top: 4px;"></i>
            <div>
              <h4 style="font-weight: 700; font-size: 0.95rem;">Email Address</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">support@elevora.com</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mail Form -->
      <div style="background-color: var(--bg-secondary); padding: 40px; border-radius: var(--border-radius-lg); border: 1px solid var(--border-color);">
        <h3 style="font-family: Outfit; font-size: 1.25rem; font-weight: 700; margin-bottom: 20px;">Send a Direct Message</h3>
        <form class="contact-form" onsubmit="event.preventDefault(); showToast('Message successfully dispatched to our helpdesk!', 'success');">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Your Name</label>
              <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="Full name">
            </div>
            <div>
              <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Email Address</label>
              <input type="email" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="Email address">
            </div>
          </div>
          <div style="margin-bottom: 24px;">
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Message Content</label>
            <textarea required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); height: 120px; resize: none;" placeholder="Details of your query..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: auto;">Submit Message</button>
        </form>
      </div>
    </div>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-contact.php" $templateContactPhp

# FAQ page template
$templateFaqPhp = @'
<?php
/**
 * Template Name: Elevora FAQ
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">FAQ Desk</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Frequently Asked Questions</h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <div class="faq-accordion" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
      <!-- FAQ 1 -->
      <div class="faq-item" style="border: 1px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background-color: var(--bg-primary); transition: border-color var(--transition-fast);">
        <button class="faq-question" style="width: 100%; padding: 20px 24px; text-align: left; font-weight: 700; font-size: 1.05rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
          How long does delivery take?
          <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; transition: transform var(--transition-fast);"></i>
        </button>
        <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height var(--transition-normal);">
          <div class="faq-answer-inner" style="padding: 0 24px 20px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Standard delivery takes 5-10 business days depending on location. Express courier delivery options are available at checkout, delivering within 2-4 business days.
          </div>
        </div>
      </div>
      <!-- FAQ 2 -->
      <div class="faq-item" style="border: 1px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background-color: var(--bg-primary); transition: border-color var(--transition-fast);">
        <button class="faq-question" style="width: 100%; padding: 20px 24px; text-align: left; font-weight: 700; font-size: 1.05rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
          Do Elevora gadgets come with a warranty?
          <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; transition: transform var(--transition-fast);"></i>
        </button>
        <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height var(--transition-normal);">
          <div class="faq-answer-inner" style="padding: 0 24px 20px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Yes, every single product sold on Elevora comes with a standard 12-month manufacturer warranty. The warranty covers hardware malfunctions and battery degradation defects.
          </div>
        </div>
      </div>
      <!-- FAQ 3 -->
      <div class="faq-item" style="border: 1px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background-color: var(--bg-primary); transition: border-color var(--transition-fast);">
        <button class="faq-question" style="width: 100%; padding: 20px 24px; text-align: left; font-weight: 700; font-size: 1.05rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
          How can I track my package?
          <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; transition: transform var(--transition-fast);"></i>
        </button>
        <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height var(--transition-normal);">
          <div class="faq-answer-inner" style="padding: 0 24px 20px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Once your order is processed, you will receive an email containing a route tracking code. Simply enter this tracking number on our "Track Order" portal to view live courier status updates.
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll(".faq-question").forEach(q => {
        q.addEventListener("click", () => {
          const item = q.parentElement;
          const answer = q.nextElementSibling;
          const activeItem = document.querySelector(".faq-item.active");
          if (activeItem && activeItem !== item) {
            activeItem.classList.remove("active");
            activeItem.querySelector(".faq-answer").style.maxHeight = null;
          }
          item.classList.toggle("active");
          if (item.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
          } else {
            answer.style.maxHeight = null;
          }
        });
      });
    });
  </script>
<?php get_footer(); ?>
'@
Write-ThemeFile "template-faq.php" $templateFaqPhp

# Track order page template
$templateTrackOrderPhp = @'
<?php
/**
 * Template Name: Elevora Track Order
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Tracking Portal</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Track Your Order</h1>
    </div>
  </section>

  <main class="container" style="max-width: 600px; margin: 0 auto 80px; text-align: center;">
    <div style="background-color: var(--bg-secondary); padding: 40px; border-radius: var(--border-radius-lg); border: 1px solid var(--border-color);">
      <i class="fa-solid fa-truck-ramp-box" style="font-size: 3rem; color: var(--accent-dark); margin-bottom: 20px;"></i>
      <h3 style="font-family: Outfit; font-size: 1.25rem; font-weight: 700; margin-bottom: 12px;">Live Route Logistics</h3>
      <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-bottom: 30px;">Input the route tracking code sent in your order dispatch email notification (e.g., EV-123456) below.</p>
      
      <form onsubmit="event.preventDefault(); showToast('Tracking credentials resolved. Loading transit routing details...', 'info');">
        <input type="text" required placeholder="Logistics ID: e.g. EV-123456" style="width: 100%; padding: 14px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); text-align: center; font-family: Outfit; font-weight: 600; margin-bottom: 20px;">
        <button type="submit" class="btn btn-primary" style="width: 100%;">Fetch Route Status</button>
      </form>
    </div>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-track-order.php" $templateTrackOrderPhp

# Wishlist page template
$templateWishlistPhp = @'
<?php
/**
 * Template Name: Elevora Wishlist
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Wishlist</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Saved Wishlist</h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <div class="products-grid" id="wishlist-items-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">
      <!-- Populated Dynamically via wishlist.js -->
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof renderWishlistPage === "function") {
        renderWishlistPage();
      }
    });
  </script>
<?php get_footer(); ?>
'@
Write-ThemeFile "template-wishlist.php" $templateWishlistPhp

# Shop page template
$templateShopPhp = @'
<?php
/**
 * Template Name: Elevora Shop (Static Fallback)
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Shop Catalog</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Elevora Shop</h1>
    </div>
  </section>

  <!-- Layout grid: Sidebar vs Products list -->
  <div class="container shop-layout" style="display: grid; grid-template-columns: 280px 1fr; gap: 40px; margin-bottom: 80px; align-items: start;">
    <!-- Sidebar Filters -->
    <aside class="shop-sidebar">
      <div class="filter-section">
        <h4 class="filter-section-title">Categories</h4>
        <div class="filter-category-list" id="category-filter-list">
          <button class="filter-category-btn active" data-category="all">All Categories <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Mobile Accessories">Mobile Accessories <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Power Banks">Power Banks <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Wireless Chargers">Wireless Chargers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Adapters">Adapters <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Charging Cables">Charging Cables <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Fast Charging Cables">Fast Charging Cables <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Computer Accessories">Computer Accessories <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Bluetooth Speakers">Bluetooth Speakers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Extension Boards & Multi-Plugs">Extension Boards & Multi-Plugs <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Projector">Projectors <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Spy WiFi Cameras">Spy WiFi Cameras <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Cute Quirky Lamps">Cute Quirky Lamps <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Floating Lamps">Floating Lamps <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="RGB Mood Lighting">RGB Mood Lighting <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Alarm Clocks & Timers">Alarm Clocks & Timers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Kitchen Tools and Gadgets">Kitchen Tools & Gadgets <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Home Utility Products">Home Utility Products <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Humidifiers">Humidifiers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="DIY Store">DIY Store <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Pet Gadgets">Pet Gadgets <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Self Care & Wellness Gadgets">Wellness Gadgets <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Car Dashboard Accessories">Dashboard Accessories <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Car Mobile Holders">Car Mobile Holders <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Car Mobile Charger">Car Mobile Chargers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Car Air Fresheners">Car Air Fresheners <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Car Utility and Tools">Car Utility & Tools <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Tyre Inflators">Tyre Inflators <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Vacuum Cleaner for Car">Vacuum Cleaners <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Bike Accessories">Bike Accessories <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Travel Gadgets and Accessories">Travel Gadgets <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Him">Gifts for Him <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Her">Gifts for Her <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Dad">Gifts for Dad <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Mom">Gifts for Mom <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Brother">Gifts for Brother <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Sister">Gifts for Sister <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Kids">Gifts for Kids <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Friends">Gifts for Friends <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Colleagues">Gifts for Colleagues <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Gamers & Streamers">For Gamers & Streamers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for the Adventurer">For the Adventurer <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Content Creators">For Content Creators <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Fitness Buffs">For Fitness Buffs <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Minimalists">For Minimalists <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Music Lovers">For Music Lovers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Students">For Students <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Car Enthusiasts">For Car Enthusiasts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Birthday Gifts">Birthday Gifts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Anniversary Gifts">Anniversary Gifts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Wedding Gifts">Wedding Gifts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Housewarming Gifts">Housewarming Gifts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Farewell Gifts">Farewell Gifts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Promotion Gifts">Promotion Gifts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Creative Stationery">Creative Stationery <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Cute Keychains">Cute Keychains <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Flash Sale">Flash Sale <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Clearance Sale">Clearance Sale <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Best Sellers">Best Sellers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="New Additions">New Additions <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
        </div>
      </div>

      <div class="filter-section">
        <h4 class="filter-section-title">Brands</h4>
        <div class="checkbox-list" id="brand-filter-list">
          <!-- Populated dynamically via filters.js -->
        </div>
      </div>

      <div class="filter-section">
        <h4 class="filter-section-title">Price Limit</h4>
        <div class="price-range-slider">
          <input type="range" class="price-slider-input" id="price-limit-slider" min="0" max="300" step="10" value="300">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; font-family: Outfit;">
            <span>$0</span>
            <span id="price-slider-label">$300</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Product Catalog List -->
    <main class="shop-content-panel">
      <!-- Shop Control Bar -->
      <div class="shop-control-bar">
        <div style="font-size: 0.9rem; color: var(--text-muted);" id="catalog-count-label">Showing all products</div>
        <div class="sort-wrap">
          <span>Sort By:</span>
          <select class="sort-select" id="catalog-sort-select">
            <option value="featured">Featured Curations</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Average Rating</option>
          </select>
        </div>
      </div>

      <div class="products-grid" id="shop-products-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
        <!-- Populated Dynamically via filters.js -->
      </div>
    </main>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof initShopFilters === "function") {
        initShopFilters();
      }
    });
  </script>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-shop.php" $templateShopPhp

# Product details page template
$templateProductPhp = @'
<?php
/**
 * Template Name: Elevora Product Details (Static Fallback)
 */
get_header(); ?>

  <!-- Breadcrumb banner -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>">Shop</a>
        <span>/</span>
        <span style="color: var(--text-primary);" id="breadcrumb-product-name">Gadget Details</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;" id="header-product-name">Product Details</h1>
    </div>
  </section>

  <!-- Product Details Wrap -->
  <main class="container">
    <div class="product-details-wrap" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 80px; align-items: start;">
      <!-- Gallery Column -->
      <div class="gallery-container">
        <div class="main-image-viewport" id="product-main-image-wrap">
          <!-- Main Product image loaded via JS -->
        </div>
        <div class="gallery-thumbnails" id="product-gallery-thumbnails">
          <!-- Thumbnails loaded via JS -->
        </div>
      </div>
      
      <!-- Info Column -->
      <div class="product-info-col" id="product-details-info-col">
        <!-- Loaded dynamically via js -->
      </div>
    </div>
  </main>

  <!-- Loader Script -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      // Find Product based on query parameter
      const params = new URLSearchParams(window.location.search);
      const id = parseInt(params.get("id")) || 1;
      const p = ElevoraProducts.find(item => item.id === id);
      if (!p) return;

      document.title = `${p.name} | Elevora Premium Shop`;
      document.getElementById("breadcrumb-product-name").textContent = p.name;
      document.getElementById("header-product-name").textContent = p.name;

      // Render main image
      const imageWrap = document.getElementById("product-main-image-wrap");
      imageWrap.innerHTML = `<img src="${p.images[0]}" alt="${p.name}" id="main-product-image">`;

      // Render thumbnails
      const thumbsWrap = document.getElementById("product-gallery-thumbnails");
      thumbsWrap.innerHTML = p.images.map((img, idx) => `
        <button class="thumbnail-btn ${idx === 0 ? "active" : ""}" onclick="document.getElementById('main-product-image').src='${img}'; document.querySelectorAll('.thumbnail-btn').forEach(btn => btn.classList.remove('active')); this.classList.add('active');">
          <img src="${img}" alt="thumbnail">
        </button>
      `).join("");

      // Render details column
      const discountPercentage = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
      const detailsCol = document.getElementById("product-details-info-col");
      detailsCol.innerHTML = `
        <span class="product-tag">${p.category}</span>
        <h2 class="product-title">${p.name}</h2>
        <div class="product-rating-row">
          <div class="stars" style="color: var(--accent-dark);">${generateStars(p.rating)}</div>
          <span style="font-weight: 700;">${p.rating}</span>
          <span style="color: var(--text-muted);">(${p.reviewsCount} Customer Reviews)</span>
        </div>
        <div class="pricing-row">
          <span class="price-large">$${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span class="old-price-large">$${p.oldPrice.toFixed(2)}</span>` : ""}
          ${p.oldPrice ? `<span class="discount-badge-large">${discountPercentage}% OFF</span>` : ""}
        </div>
        <div style="font-size: 0.95rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 30px;">
          ${p.description}
        </div>
        <div class="option-title">Select Color</div>
        <div class="color-pills-row">
          ${p.colors.map((c, idx) => `
            <button class="color-pill ${idx === 0 ? "active" : ""}" onclick="document.querySelectorAll('.color-pill').forEach(btn => btn.classList.remove('active')); this.classList.add('active');" data-color="${c}">
              ${c}
            </button>
          `).join("")}
        </div>
        <div style="display: flex; gap: 16px; margin-bottom: 30px;">
          <div style="display: flex; align-items: center; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; height: 50px;">
            <button class="qty-btn" onclick="let input = document.getElementById('product-qty'); if(parseInt(input.value) > 1) input.value = parseInt(input.value)-1;">-</button>
            <input type="number" id="product-qty" value="1" min="1" style="width: 50px; text-align: center; font-weight: 700; border: none; outline: none; background: none;">
            <button class="qty-btn" onclick="let input = document.getElementById('product-qty'); input.value = parseInt(input.value)+1;">+</button>
          </div>
          <button class="btn btn-primary" style="flex: 1;" onclick="const selectedColor = document.querySelector('.color-pill.active').getAttribute('data-color'); addToCart(${p.id}, parseInt(document.getElementById('product-qty').value), selectedColor);">
            Add To Cart
          </button>
        </div>
        <button class="btn btn-secondary" onclick="toggleWishlist(${p.id})">
          <i class="fa-regular fa-heart"></i> Add To Wishlist
        </button>
      `;
    });
  </script>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-product.php" $templateProductPhp

# Cart page template
$templateCartPhp = @'
<?php
/**
 * Template Name: Elevora Cart (Static Fallback)
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Your Cart</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Shopping Cart</h1>
    </div>
  </section>

  <!-- Cart Grid Layout -->
  <div class="container" style="display: grid; grid-template-columns: 2fr 1fr; gap: 40px; margin-bottom: 80px; align-items: start;">
    <!-- Items panel -->
    <div id="cart-items-container">
      <!-- Loaded dynamically via cart.js -->
    </div>

    <!-- Summary Panel -->
    <aside style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 32px;">
      <h3 style="font-family: Outfit; font-size: 1.25rem; font-weight: 700; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1.5px solid var(--border-color);">Order Summary</h3>
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; font-size: 0.95rem;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">Subtotal</span>
          <span id="cart-summary-subtotal">$0.00</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">Promo Discount</span>
          <span id="cart-summary-discount" style="color: var(--danger); font-weight: 700;">$0.00</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">Estimated Shipping</span>
          <span id="cart-summary-shipping">FREE</span>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; font-family: Outfit; font-weight: 800; font-size: 1.25rem; margin-bottom: 24px; padding-top: 16px; border-top: 1.5px solid var(--border-color);">
        <span>Total</span>
        <span id="cart-summary-total">$0.00</span>
      </div>

      <div style="margin-bottom: 24px;">
        <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Promo Code</label>
        <div style="display: flex; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background-color: var(--bg-primary);">
          <input type="text" id="coupon-code-input" placeholder="E.g. ELEVORA20" style="flex-grow: 1; padding: 12px; font-weight: 600;">
          <button onclick="applyPromoCoupon()" class="btn btn-secondary" style="border-radius: 0; padding: 0 16px;">Apply</button>
        </div>
      </div>

      <a href="<?php echo esc_url( home_url('/checkout/') ); ?>" class="btn btn-primary" style="width: 100%; text-align: center; display: inline-block;">Proceed To Checkout</a>
    </aside>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof renderCartPage === "function") {
        renderCartPage();
      }
    });
  </script>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-cart.php" $templateCartPhp

# Checkout page template
$templateCheckoutPhp = @'
<?php
/**
 * Template Name: Elevora Checkout (Static Fallback)
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>">Cart</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Secure Checkout</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Secure Checkout</h1>
    </div>
  </section>

  <!-- Checkout Grid Layout -->
  <div class="container" style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; margin-bottom: 80px; align-items: start;">
    <!-- Form Panel -->
    <div style="background-color: var(--bg-secondary); padding: 40px; border-radius: var(--border-radius-lg); border: 1px solid var(--border-color);">
      <h3 style="font-family: Outfit; font-size: 1.25rem; font-weight: 700; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1.5px solid var(--border-color);">Billing & Shipping Details</h3>
      <form onsubmit="event.preventDefault(); clearCart(); window.location.href='<?php echo esc_url(home_url('/order-success/')); ?>';">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">First Name</label>
            <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="John">
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Last Name</label>
            <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="Doe">
          </div>
        </div>
        <div style="margin-bottom: 20px;">
          <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Street Address</label>
          <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="House number and street name">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">City</label>
            <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="City">
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">State</label>
            <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="State">
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Postal Code</label>
            <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="Postal code">
          </div>
        </div>
        
        <h3 style="font-family: Outfit; font-size: 1.25rem; font-weight: 700; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1.5px solid var(--border-color);">Payment Option</h3>
        <div style="background-color: var(--bg-primary); padding: 20px; border-radius: var(--border-radius-md); border: 1.5px solid var(--border-color); margin-bottom: 30px;">
          <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; font-weight: 700;">
            <input type="radio" checked style="accent-color: var(--accent-dark); width: 18px; height: 18px;">
            Credit Card (Secure Stripe gateway simulation)
          </label>
          <div style="display: flex; gap: 16px; margin-top: 16px; font-size: 1.5rem; color: var(--text-muted);">
            <i class="fa-brands fa-cc-visa"></i>
            <i class="fa-brands fa-cc-mastercard"></i>
            <i class="fa-brands fa-cc-stripe"></i>
            <i class="fa-brands fa-cc-apple-pay"></i>
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary" style="width: 100%; height: 50px;">Place Secure Order</button>
      </form>
    </div>

    <!-- Review items panel -->
    <aside style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 32px;" id="checkout-summary-col">
      <!-- Populated dynamically via JS checkout sync -->
    </aside>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      // Sync checkout items review
      const summaryCol = document.getElementById("checkout-summary-col");
      if(!summaryCol) return;

      const cart = JSON.parse(localStorage.getItem("elevora_cart")) || [];
      if(cart.length === 0) {
        summaryCol.innerHTML = "<p>No items in cart</p>";
        return;
      }

      let html = `<h3 style="font-family: Outfit; font-size: 1.25rem; font-weight: 700; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1.5px solid var(--border-color);">Review Items</h3>`;
      let subtotal = 0;

      cart.forEach(item => {
        const p = ElevoraProducts.find(prod => prod.id === item.productId);
        if(p) {
          const itemTotal = p.price * item.quantity;
          subtotal += itemTotal;
          html += `
            <div style="display: flex; gap: 12px; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
              <img src="${p.images[0]}" alt="${p.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--border-radius-md);">
              <div style="flex: 1;">
                <h5 style="font-size: 0.9rem; font-weight: 700; margin: 0 0 4px 0;">${p.name}</h5>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Variant: ${item.color} | Qty: ${item.quantity}</p>
              </div>
              <span style="font-weight: 700; font-size: 0.9rem;">$${itemTotal.toFixed(2)}</span>
            </div>
          `;
        }
      });

      // Calculate totals
      const coupon = localStorage.getItem("elevora_applied_coupon");
      let discount = 0;
      if (coupon === "ELEVORA20") {
        discount = subtotal * 0.20;
      }
      const shipping = subtotal >= 100 ? 0 : 9.99;
      const total = subtotal - discount + shipping;

      html += `
        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px; font-size: 0.9rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          ${discount > 0 ? `
          <div style="display: flex; justify-content: space-between; color: var(--danger); font-weight: 700;">
            <span>Coupon Discount</span>
            <span>-$${discount.toFixed(2)}</span>
          </div>` : ''}
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Shipping</span>
            <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; margin-top: 12px; padding-top: 12px; border-top: 1.5px solid var(--border-color);">
            <span>Order Total</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>
      `;

      summaryCol.innerHTML = html;
    });
  </script>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-checkout.php" $templateCheckoutPhp

# My Account page template
$templateMyAccountPhp = @'
<?php
/**
 * Template Name: Elevora My Account (Static Fallback)
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Dashboard</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">My Account</h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <div style="display: grid; grid-template-columns: 1fr 2.5fr; gap: 40px;">
      <!-- Menu sidebar -->
      <aside style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 24px;">
        <div style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid var(--border-color); margin-bottom: 20px;">
          <div style="width: 80px; height: 80px; background-color: var(--accent); color: var(--accent-contrast); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; margin: 0 auto 12px;">U</div>
          <h4 style="font-family: Outfit; font-weight: 700; font-size: 1rem; margin: 0;">Elevora User</h4>
          <span style="font-size: 0.8rem; color: var(--text-muted);">user@elevora.com</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button class="filter-category-btn active" style="font-weight: 600;">Dashboard</button>
          <button class="filter-category-btn" onclick="showToast('Loading secure billing pipelines...', 'info')">Orders History</button>
          <button class="filter-category-btn" onclick="showToast('Loading encrypted key rings...', 'info')">Saved Addresses</button>
          <button class="filter-category-btn" onclick="showToast('Clearing authentication sessions...', 'info'); clearCart();">Logout Session</button>
        </div>
      </aside>

      <!-- Account Dashboard details -->
      <div style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 40px;">
        <h3 style="font-family: Outfit; font-size: 1.5rem; font-weight: 800; margin-bottom: 16px;">Welcome Back!</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 30px;">From your personal dashboard account portal, you can easily view your recent tech accessory purchases, manage secure shipping addresses, and trace courier status numbers.</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="border: 1.5px dashed var(--border-color); border-radius: var(--border-radius-md); padding: 24px; text-align: center;">
            <i class="fa-solid fa-cart-shopping" style="font-size: 2rem; color: var(--accent-dark); margin-bottom: 12px;"></i>
            <h4 style="font-family: Outfit; font-weight: 700; margin-bottom: 6px;">Total Orders</h4>
            <p style="font-size: 1.25rem; font-weight: 800; margin: 0;">0 Orders Placed</p>
          </div>
          <div style="border: 1.5px dashed var(--border-color); border-radius: var(--border-radius-md); padding: 24px; text-align: center;">
            <i class="fa-solid fa-heart" style="font-size: 2rem; color: var(--accent-dark); margin-bottom: 12px;"></i>
            <h4 style="font-family: Outfit; font-weight: 700; margin-bottom: 6px;">Saved Wishlist</h4>
            <p style="font-size: 1.25rem; font-weight: 800; margin: 0;" id="my-account-wishlist-count">0 Items Saved</p>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const wishlist = JSON.parse(localStorage.getItem("elevora_wishlist")) || [];
      const countEl = document.getElementById("my-account-wishlist-count");
      if(countEl) {
        countEl.textContent = `${wishlist.length} Items Saved`;
      }
    });
  </script>
<?php get_footer(); ?>
'@
Write-ThemeFile "template-my-account.php" $templateMyAccountPhp

# Order success page template
$templateOrderSuccessPhp = @'
<?php
/**
 * Template Name: Elevora Order Success (Static Fallback)
 */
get_header(); ?>

  <main class="container" style="text-align: center; padding: 120px 24px; max-width: 600px; margin: 0 auto;">
    <div style="width: 80px; height: 80px; background-color: var(--success); color: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin: 0 auto 30px;">
      <i class="fa-solid fa-check"></i>
    </div>
    <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 16px; font-family: Outfit; letter-spacing: -0.02em;">Payment Successful!</h1>
    <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">Thank you for shopping on Elevora. Your secure transaction completed successfully.</p>
    <p style="color: var(--text-secondary); font-weight: 700; font-family: Outfit; margin-bottom: 40px;">Order ID Ref: <span style="color: var(--accent-dark);">EV-ORD-<?php echo rand(100000, 999999); ?></span></p>
    <div style="display: flex; gap: 16px; justify-content: center;">
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-secondary" style="width: auto;">Back to Home</a>
      <a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>" class="btn btn-primary" style="width: auto;">Trace Order Delivery</a>
    </div>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-order-success.php" $templateOrderSuccessPhp

# Zip the compiled theme directory using .NET ZipArchive to guarantee forward slashes
Write-Host "Compressing theme to ZIP archive with Linux-compatible forward slashes..."
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Add-Type -AssemblyName System.IO.Compression

$zipStream = New-Object System.IO.FileStream($zipPath, [System.IO.FileMode]::Create)
$zipArchive = New-Object System.IO.Compression.ZipArchive($zipStream, [System.IO.Compression.ZipArchiveMode]::Create)

$files = Get-ChildItem -Path $themeDir -Recurse -File
foreach ($file in $files) {
    # Get path relative to the theme root directory
    $relative = $file.FullName.Substring($themeDir.Length + 1)
    # Convert slashes for compatibility
    $relativeForwardSlash = $relative.Replace("\", "/")
    
    # Prefix the folder name 'elevora-wp-theme' so it extracts into its own folder
    $entryPath = "elevora-wp-theme/" + $relativeForwardSlash
    
    # Create the zip entry
    $entry = $zipArchive.CreateEntry($entryPath)
    
    # Copy file contents to entry stream
    $entryStream = $entry.Open()
    $fileStream = [System.IO.File]::OpenRead($file.FullName)
    $fileStream.CopyTo($entryStream)
    
    # Close streams
    $fileStream.Close()
    $entryStream.Close()
}

# Dispose Archive and Stream to write changes to disk
$zipArchive.Dispose()
$zipStream.Dispose()

Write-Host "WordPress Theme successfully zipped to: $zipPath"

Write-Host "WordPress theme conversion compilation complete!"
