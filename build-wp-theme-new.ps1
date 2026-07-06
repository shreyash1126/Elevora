# PowerShell script to compile Elevora brand-new premium electronics theme.
# This script creates a standalone theme folder 'elevora-premium-theme' and zips it up.

$workspaceRoot = $PSScriptRoot
$themeDir = Join-Path $workspaceRoot "elevora-premium-theme"
$zipPath = Join-Path $workspaceRoot "elevora-premium-theme.zip"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

Write-Host "Creating Brand-New WordPress theme in: $themeDir"

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
    "assets/images",
    "woocommerce"
)
foreach ($f in $folders) {
    $path = Join-Path $themeDir $f
    New-Item -ItemType Directory -Force -Path $path | Out-Null
}

# Copy Assets (mapping new files to standard filenames)
Write-Host "Copying theme assets (CSS, JS, Images)..."
Copy-Item (Join-Path $workspaceRoot "css/style-new.css") (Join-Path $themeDir "assets/css/style.css") -Force
Copy-Item (Join-Path $workspaceRoot "css/animations-new.css") (Join-Path $themeDir "assets/css/animations.css") -Force
Copy-Item (Join-Path $workspaceRoot "css/responsive.css") (Join-Path $themeDir "assets/css/responsive.css") -Force

Copy-Item (Join-Path $workspaceRoot "js/compare-new.js") (Join-Path $themeDir "assets/js/compare.js") -Force
Copy-Item (Join-Path $workspaceRoot "js/script-new.js") (Join-Path $themeDir "assets/js/script.js") -Force
Copy-Item (Join-Path $workspaceRoot "js/cart-new.js") (Join-Path $themeDir "assets/js/cart.js") -Force
Copy-Item (Join-Path $workspaceRoot "js/wishlist-new.js") (Join-Path $themeDir "assets/js/wishlist.js") -Force
Copy-Item (Join-Path $workspaceRoot "js/filters-new.js") (Join-Path $themeDir "assets/js/filters.js") -Force
Copy-Item (Join-Path $workspaceRoot "js/search-new.js") (Join-Path $themeDir "assets/js/search.js") -Force
Copy-Item (Join-Path $workspaceRoot "js/products-data.js") (Join-Path $themeDir "assets/js/products-data.js") -Force
Copy-Item (Join-Path $workspaceRoot "js/darkmode.js") (Join-Path $themeDir "assets/js/darkmode.js") -Force
Copy-Item (Join-Path $workspaceRoot "js/slider.js") (Join-Path $themeDir "assets/js/slider.js") -Force

Copy-Item (Join-Path $workspaceRoot "images/*") (Join-Path $themeDir "assets/images/") -Force -ErrorAction SilentlyContinue

# Patch the copied JS files to convert relative HTML extensions to dynamic WordPress URLs
Write-Host "Patching javascript files for WordPress compatibility..."
$jsFiles = Get-ChildItem -Path (Join-Path $themeDir "assets/js/") -Filter *.js
foreach ($file in $jsFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
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

    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
}

# Helper to write standard theme files
function Write-ThemeFile($fileName, $fileContent) {
    $path = Join-Path $themeDir $fileName
    [System.IO.File]::WriteAllText($path, $fileContent, $utf8NoBom)
    Write-Host "  Written: $fileName"
}

# ==============================================================================
# Theme templates compilation
# ==============================================================================

# Write 1. style.css (Theme metadata sheet)
$styleCss = @'
/*
Theme Name: Elevora Premium
Theme URI: https://ilvora.link
Author: Elevora Team
Author URI: https://ilvora.link
Description: Next-Gen Premium WooCommerce Theme with Electric Obsidian design tokens, spotlight animations, specification matrices, and full client-side mock system.
Version: 2.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: elevora
*/
'@
Write-ThemeFile "style.css" $styleCss

# Write 2. functions.php
$functionsPhp = @'
<?php
/**
 * Elevora Premium Theme Functions and Definitions
 */

if ( ! function_exists( 'elevora_setup' ) ) {
    function elevora_setup() {
        add_theme_support( 'automatic-feed-links' );
        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'woocommerce' );
        add_theme_support( 'wc-product-gallery-zoom' );
        add_theme_support( 'wc-product-gallery-lightbox' );
        add_theme_support( 'wc-product-gallery-slider' );

        register_nav_menus( array(
            'menu-1' => esc_html__( 'Primary Category Menu', 'elevora' ),
        ) );
    }
}
add_action( 'after_setup_theme', 'elevora_setup' );

/**
 * Enqueue scripts and styles.
 */
function elevora_scripts() {
    // Fonts & FontAwesome CDN
    wp_enqueue_style( 'elevora-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap', array(), null );
    wp_enqueue_style( 'font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0' );

    // Core Theme Stylesheets (Electric Obsidian styling)
    wp_enqueue_style( 'elevora-style-meta', get_stylesheet_uri() );
    wp_enqueue_style( 'elevora-core-style', get_template_directory_uri() . '/assets/css/style.css', array(), '2.0.0' );
    wp_enqueue_style( 'elevora-animations', get_template_directory_uri() . '/assets/css/animations.css', array(), '2.0.0' );
    wp_enqueue_style( 'elevora-responsive', get_template_directory_uri() . '/assets/css/responsive.css', array(), '2.0.0' );

    // Theme JS Dependencies
    wp_enqueue_script( 'elevora-products-data', get_template_directory_uri() . '/assets/js/products-data.js', array(), '2.0.0', true );
    wp_enqueue_script( 'elevora-darkmode', get_template_directory_uri() . '/assets/js/darkmode.js', array(), '2.0.0', true );
    wp_enqueue_script( 'elevora-slider', get_template_directory_uri() . '/assets/js/slider.js', array(), '2.0.0', true );
    wp_enqueue_script( 'elevora-script', get_template_directory_uri() . '/assets/js/script.js', array('elevora-products-data'), '2.0.0', true );
    wp_enqueue_script( 'elevora-cart', get_template_directory_uri() . '/assets/js/cart.js', array('elevora-products-data'), '2.0.0', true );
    wp_enqueue_script( 'elevora-wishlist', get_template_directory_uri() . '/assets/js/wishlist.js', array('elevora-products-data'), '2.0.0', true );
    wp_enqueue_script( 'elevora-search', get_template_directory_uri() . '/assets/js/search.js', array('elevora-products-data'), '2.0.0', true );
    wp_enqueue_script( 'elevora-filters', get_template_directory_uri() . '/assets/js/filters.js', array('elevora-products-data'), '2.0.0', true );
    wp_enqueue_script( 'elevora-compare', get_template_directory_uri() . '/assets/js/compare.js', array('elevora-products-data'), '2.0.0', true );

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
    <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="category-nav-item nav-link">New Arrivals</a>
    <div class="category-nav-item">
      Mobile Accessories <i class="fa-solid fa-chevron-down"></i>
      <div class="category-dropdown">
        <a href="<?php echo esc_url( home_url( '/shop/?category=charger' ) ); ?>" class="dropdown-link">Chargers & Adapters</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=cables' ) ); ?>" class="dropdown-link">Premium Cables</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=cases' ) ); ?>" class="dropdown-link">Protective Cases</a>
      </div>
    </div>
    <div class="category-nav-item">
      Smart Gadgets <i class="fa-solid fa-chevron-down"></i>
      <div class="category-dropdown">
        <a href="<?php echo esc_url( home_url( '/shop/?category=audio' ) ); ?>" class="dropdown-link">Audio Devices</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=wearables' ) ); ?>" class="dropdown-link">Smart Wearables</a>
        <a href="<?php echo esc_url( home_url( '/shop/?category=charging-station' ) ); ?>" class="dropdown-link">Charging Stations</a>
      </div>
    </div>
    <a href="<?php echo esc_url( home_url( '/shop/?category=lifestyle' ) ); ?>" class="category-nav-item nav-link">Tech Lifestyle</a>
    <a href="<?php echo esc_url( home_url( '/compare/' ) ); ?>" class="category-nav-item nav-link">Compare Gadgets</a>
    <a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>" class="category-nav-item nav-link">Track Shipping</a>
    <?php
}

/**
 * Custom Javascript page helper URL map
 */
function getThemeUrl($pageSlug) {
    switch ($pageSlug) {
        case 'home': return home_url('/');
        case 'shop': return home_url('/shop/');
        case 'product': return home_url('/product/');
        case 'cart': return home_url('/cart/');
        case 'checkout': return home_url('/checkout/');
        case 'wishlist': return home_url('/wishlist/');
        case 'my-account': return home_url('/my-account/');
        case 'about': return home_url('/about-us/');
        case 'contact': return home_url('/contact-us/');
        case 'faq': return home_url('/faq/');
        case 'blog': return home_url('/blog/');
        case 'track-order': return home_url('/track-order/');
        case 'compare': return home_url('/compare/');
        case 'login': return home_url('/login/');
        case 'register': return home_url('/register/');
        default: return home_url('/' . $pageSlug . '/');
    }
}

/**
 * Filter product helper inside templates
 */
function renderProductCard($p) {
    ?>
    <div class="product-card reveal-element" data-id="<?php echo $p['id']; ?>">
      <div class="card-media">
        <?php if (!empty($p['badge'])): ?>
          <div class="card-badges">
            <span class="badge badge-<?php echo esc_attr($p['badgeType']); ?>"><?php echo esc_html($p['badge']); ?></span>
          </div>
        <?php endif; ?>
        <a href="<?php echo esc_url( getThemeUrl('product') . '?id=' . $p['id'] ); ?>">
          <img src="<?php echo esc_url($p['images'][0]); ?>" alt="<?php echo esc_attr($p['name']); ?>">
          <?php if (isset($p['images'][1])): ?>
            <img src="<?php echo esc_url($p['images'][1]); ?>" class="card-img-hover" alt="<?php echo esc_attr($p['name']); ?>">
          <?php endif; ?>
        </a>
        <div class="card-actions">
          <button class="card-action-btn wishlist-toggle-btn" data-id="<?php echo $p['id']; ?>" onclick="toggleWishlist(<?php echo $p['id']; ?>)">
            <i class="fa-regular fa-heart"></i>
          </button>
          <button class="card-action-btn compare-toggle-btn" data-id="<?php echo $p['id']; ?>" onclick="toggleCompare(<?php echo $p['id']; ?>)">
            <i class="fa-solid fa-code-compare"></i>
          </button>
        </div>
      </div>
      <div class="card-info">
        <span class="card-category"><?php echo esc_html($p['category']); ?></span>
        <a href="<?php echo esc_url( getThemeUrl('product') . '?id=' . $p['id'] ); ?>" class="card-title"><?php echo esc_html($p['name']); ?></a>
        <div class="card-rating">
          <div class="stars">
            <?php
            $full = floor($p['rating']);
            $half = ($p['rating'] - $full >= 0.5) ? 1 : 0;
            for ($i = 0; $i < $full; $i++) echo '<i class="fa-solid fa-star"></i>';
            if ($half) echo '<i class="fa-solid fa-star-half-stroke"></i>';
            for ($i = 0; $i < (5 - $full - $half); $i++) echo '<i class="fa-regular fa-star"></i>';
            ?>
          </div>
          <span class="rating-value"><?php echo number_format($p['rating'], 1); ?></span>
          <span class="reviews-count">(<?php echo esc_html($p['reviewsCount']); ?>)</span>
        </div>
        <div class="card-price-row">
          <div class="price-wrap">
            <span class="price">$<?php echo number_format($p['price'], 2); ?></span>
            <?php if (isset($p['oldPrice'])): ?>
              <span class="old-price">$<?php echo number_format($p['oldPrice'], 2); ?></span>
              <span class="discount"><?php echo round((($p['oldPrice'] - $p['price']) / $p['oldPrice']) * 100); ?>% OFF</span>
            <?php endif; ?>
          </div>
          <button class="btn btn-primary card-add-btn" onclick="addToCart(<?php echo $p['id']; ?>, 1, '<?php echo esc_attr($p['colors'][0]); ?>')">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <?php
}
'@
Write-ThemeFile "functions.php" $functionsPhp

# Write 3. header.php
$headerPhp = @'
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="profile" href="https://gmpg.org/xfn/11">
  <?php wp_head(); ?>
  <script>
    // Helper to generate dynamic WordPress URLs inside local JS files
    function getThemeUrl(pageSlug) {
      const urls = {
        home: "<?php echo esc_url(home_url('/')); ?>",
        shop: "<?php echo esc_url(home_url('/shop/')); ?>",
        product: "<?php echo esc_url(home_url('/product/')); ?>",
        cart: "<?php echo esc_url(home_url('/cart/')); ?>",
        checkout: "<?php echo esc_url(home_url('/checkout/')); ?>",
        wishlist: "<?php echo esc_url(home_url('/wishlist/')); ?>",
        "my-account": "<?php echo esc_url(home_url('/my-account/')); ?>",
        about: "<?php echo esc_url(home_url('/about-us/')); ?>",
        contact: "<?php echo esc_url(home_url('/contact-us/')); ?>",
        faq: "<?php echo esc_url(home_url('/faq/')); ?>",
        blog: "<?php echo esc_url(home_url('/blog/')); ?>",
        "track-order": "<?php echo esc_url(home_url('/track-order/')); ?>",
        compare: "<?php echo esc_url(home_url('/compare/')); ?>",
        login: "<?php echo esc_url(home_url('/login/')); ?>",
        register: "<?php echo esc_url(home_url('/register/')); ?>"
      };
      return urls[pageSlug] || "<?php echo esc_url(home_url('/')); ?>" + pageSlug + "/";
    }
  </script>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

  <!-- Rotating announcement bar -->
  <section class="announcement-bar">
    <div class="container announcement-slider">
      <div class="announcement-item" style="display: flex;">
        <span>🔥 FLASH SALE:</span> USE CODE ELEVORA20 FOR 20% OFF ALL PRODUCTS SITEWIDE!
      </div>
      <div class="announcement-item" style="display: none;">
        <span>🚚 FREE SHIPPING:</span> ON ALL ORDERS OVER $100 & EASY 30-DAY RETURNS
      </div>
    </div>
  </section>

  <!-- Premium header -->
  <header>
    <div class="container header-container">
      <div class="header-top-row">
        <!-- Mobile hamburger menu -->
        <button id="mobile-menu-toggle" class="action-btn" style="display: none;" aria-label="Toggle Menu">
          <i class="fa-solid fa-bars"></i>
        </button>
        
        <!-- Logo -->
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">ELEVORA<span class="logo-dot"></span></a>
        
        <!-- Search bar input -->
        <div style="flex-grow: 1; max-width: 500px; margin: 0 40px; position: relative;" class="desktop-search-wrap">
          <form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" style="display: flex; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background-color: var(--bg-secondary);">
            <input type="search" placeholder="Search premium electronics..." value="<?php echo get_search_query(); ?>" name="s" style="flex-grow: 1; padding: 10px 16px; font-size: 0.9rem; color: var(--text-primary);" autocomplete="off">
            <button type="submit" style="padding: 0 16px; color: var(--text-secondary); cursor: pointer;" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>

        <!-- Right Side icons -->
        <div class="header-actions">
          <button class="action-btn theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle Theme">
            <i class="fa-regular fa-moon"></i>
          </button>
          <button class="action-btn" onclick="toggleSearchOverlay()" aria-label="Search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <a href="<?php echo esc_url( home_url( '/wishlist/' ) ); ?>" class="action-btn wishlist-toggle-btn" aria-label="Wishlist">
            <i class="fa-regular fa-heart"></i>
            <span class="badge-count wishlist-count" style="display: none;">0</span>
          </a>
          <button class="action-btn" id="cart-btn" onclick="openMiniCartDrawer()" aria-label="Cart">
            <i class="fa-solid fa-shopping-bag"></i>
            <span class="badge-count cart-count" id="cart-badge" style="display: none;">0</span>
          </button>
        </div>
      </div>

      <!-- Categories Nav bar -->
      <nav class="category-nav-list" id="nav-menu">
        <?php
        if ( has_nav_menu( 'menu-1' ) ) {
            wp_nav_menu( array(
                'theme_location' => 'menu-1',
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

  <!-- Fullscreen Autocomplete Search Overlay -->
  <div class="search-overlay" id="search-overlay">
    <button class="search-overlay-close" onclick="closeSearchOverlay()" aria-label="Close search">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="search-overlay-container">
      <input type="text" placeholder="Type key electronics terms (e.g. MagSafe, ANC Wireless)..." class="search-overlay-input" id="search-overlay-input" autocomplete="off">
      <div class="search-suggestions" id="search-suggestions">
        <!-- Matches rendered dynamically via search.js -->
      </div>
    </div>
  </div>
'@
Write-ThemeFile "header.php" $headerPhp

# Write 4. footer.php
$footerPhp = @'
  <!-- Premium Footer -->
  <footer style="background-color: var(--bg-secondary); border-top: 1.5px solid var(--border-color); padding: 80px 0 40px; margin-top: 60px;">
    <div class="container" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 40px; margin-bottom: 60px;">
      <div>
        <h4 style="font-family: Outfit; font-size: 1.5rem; font-weight: 800; margin-bottom: 20px;">ELEVORA<span class="logo-dot"></span></h4>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 24px; max-width: 280px;">Elevating your tech lifestyle with premium, next-generation smart accessories and gadget systems.</p>
        <div style="display: flex; gap: 12px;">
          <a href="#" class="action-btn" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="https://instagram.com" target="_blank" class="action-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" class="action-btn" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
        </div>
      </div>
      <div>
        <h5 style="font-family: Outfit; font-weight: 700; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-primary); margin-bottom: 20px;">Quick Navigation</h5>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem;">
          <li><a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" style="color: var(--text-secondary); hover:color:var(--accent);">Browse Shop</a></li>
          <li><a href="<?php echo esc_url( home_url( '/compare/' ) ); ?>" style="color: var(--text-secondary);">Compare System</a></li>
          <li><a href="<?php echo esc_url( home_url( '/wishlist/' ) ); ?>" style="color: var(--text-secondary);">Your Wishlist</a></li>
          <li><a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>" style="color: var(--text-secondary);">Shipment Tracker</a></li>
        </ul>
      </div>
      <div>
        <h5 style="font-family: Outfit; font-weight: 700; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-primary); margin-bottom: 20px;">Legal & Info</h5>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem;">
          <li><a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>" style="color: var(--text-secondary);">Privacy Guidelines</a></li>
          <li><a href="<?php echo esc_url( home_url( '/terms-conditions/' ) ); ?>" style="color: var(--text-secondary);">Terms of Service</a></li>
          <li><a href="<?php echo esc_url( home_url( '/shipping-policy/' ) ); ?>" style="color: var(--text-secondary);">Shipping Policy</a></li>
          <li><a href="<?php echo esc_url( home_url( '/refund-policy/' ) ); ?>" style="color: var(--text-secondary);">Refund Policy</a></li>
        </ul>
      </div>
      <div>
        <h5 style="font-family: Outfit; font-weight: 700; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-primary); margin-bottom: 20px;">Newsletter</h5>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 16px;">Subscribe to receive launch announcements and exclusive discount coupons.</p>
        <form style="display: flex; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden;" onsubmit="event.preventDefault(); showToast('Subscribed to Newsletter!', 'success');">
          <input type="email" placeholder="Enter email..." required style="flex-grow: 1; padding: 10px 14px; font-size: 0.85rem; color: var(--text-primary); background: var(--bg-primary);">
          <button type="submit" class="btn btn-primary" style="border-radius: 0; padding: 0 16px;"><i class="fa-solid fa-chevron-right"></i></button>
        </form>
      </div>
    </div>
    <div class="container" style="border-top: 1px solid var(--border-color); padding-top: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
      <span style="font-size: 0.85rem; color: var(--text-muted);">&copy; <?php echo date('Y'); ?> Elevora (https://ilvora.link). Elevate Your Tech Lifestyle.</span>
      <div style="display: flex; gap: 12px; font-size: 1.5rem; color: var(--text-muted);">
        <i class="fa-brands fa-cc-visa"></i>
        <i class="fa-brands fa-cc-mastercard"></i>
        <i class="fa-brands fa-cc-paypal"></i>
        <i class="fa-brands fa-cc-apple-pay"></i>
      </div>
    </div>
  </footer>

  <!-- Floating Compare notification drawer -->
  <div class="compare-drawer-wrap" id="compare-drawer-wrap">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <span style="font-family: Outfit; font-weight: 700; font-size: 0.85rem; color: var(--text-primary);">Compare Selected Items</span>
      <div style="display: flex; gap: 6px;" id="compare-drawer-thumbs"></div>
    </div>
    <div style="display: flex; gap: 10px; align-items: center;">
      <a href="<?php echo esc_url( home_url( '/compare/' ) ); ?>" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.8rem; font-family: Outfit;">Compare Now</a>
      <button onclick="clearCompareList()" style="font-size: 0.8rem; color: var(--text-muted); text-decoration: underline; cursor: pointer; border: none; background: none;">Clear</button>
    </div>
  </div>

  <!-- Mini Cart Drawer panel overlay -->
  <div class="cart-drawer-overlay" id="cart-drawer-overlay">
    <div class="cart-drawer">
      <div class="cart-drawer-header">
        <h4 class="cart-drawer-title"><i class="fa-solid fa-shopping-bag" style="color: var(--accent);"></i> Shopping Cart</h4>
        <button class="close-drawer-btn" onclick="closeMiniCartDrawer()" aria-label="Close cart">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="cart-drawer-items" id="cart-drawer-items">
        <!-- Rendered dynamically via cart-new.js -->
      </div>
      <div class="cart-drawer-footer">
        <div class="cart-totals-row">
          <span>Subtotal:</span>
          <span id="cart-drawer-subtotal">$0.00</span>
        </div>
        <div class="cart-drawer-actions">
          <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>" class="btn btn-secondary" style="width: 100%; text-align: center; justify-content: center;">View Cart</a>
          <a href="<?php echo esc_url( home_url( '/checkout/' ) ); ?>" class="btn btn-primary" id="mini-cart-checkout-btn" style="width: 100%; text-align: center; justify-content: center;">Proceed to Checkout</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Micro notifications Toast container -->
  <div id="toast-wrapper" style="position: fixed; bottom: 30px; right: 30px; z-index: 100000; display: flex; flex-direction: column; gap: 10px;"></div>

  <script>
    // Universal notifications toaster helper
    function showToast(message, type = "success") {
      const toast = document.createElement("div");
      toast.style.cssText = "padding: 14px 20px; border-radius: var(--border-radius-md); background-color: var(--bg-secondary); border: 1.5px solid var(--border-color); color: var(--text-primary); font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 10px; box-shadow: var(--shadow-md); transform: translateX(120%); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); opacity: 0;";
      
      let icon = '<i class="fa-solid fa-circle-check" style="color: var(--success);"></i>';
      if (type === "error") {
        icon = '<i class="fa-solid fa-circle-exclamation" style="color: var(--danger);"></i>';
        toast.style.borderColor = "var(--danger)";
      } else if (type === "warning") {
        icon = '<i class="fa-solid fa-triangle-exclamation" style="color: #fbbf24;"></i>';
      } else if (type === "info") {
        icon = '<i class="fa-solid fa-circle-info" style="color: var(--accent);"></i>';
      }

      toast.innerHTML = `${icon} <span>${message}</span>`;
      document.getElementById("toast-wrapper").appendChild(toast);

      requestAnimationFrame(() => {
        toast.style.transform = "translateX(0)";
        toast.style.opacity = "1";
      });

      setTimeout(() => {
        toast.style.transform = "translateX(120%)";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 400);
      }, 3500);
    }

    function clearCompareList() {
      if (typeof saveCompareList === "function") {
        saveCompareList([]);
        showToast("Comparison list cleared", "info");
      }
    }
  </script>

<?php wp_footer(); ?>
</body>
</html>
'@
Write-ThemeFile "footer.php" $footerPhp

# Write 5. front-page.php
$frontPagePhp = @'
<?php
/**
 * The front page (Homepage) template file
 */
get_header(); ?>

  <!-- Editorial cinematic slider hero -->
  <section class="hero-slider-container">
    <div class="hero-slider">
      <!-- Slide 1 -->
      <div class="hero-slide active" style="background-image: url('https://images.unsplash.com/photo-1608248597481-496100c80836?w=1600');">
        <div class="container" style="height: 100%; display: flex; align-items: center;">
          <div class="hero-content reveal-element revealed">
            <span class="hero-tag">Acoustic Audio Pro</span>
            <h1>Sound Beyond Boundaries</h1>
            <p>Experience studio-grade active noise cancellation with premium leather acoustics and 48-hour continuous battery playback loops.</p>
            <div style="display: flex; gap: 16px;">
              <a href="<?php echo esc_url( getThemeUrl('product') . '?id=1' ); ?>" class="btn btn-primary">Discover Pro</a>
              <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="btn btn-secondary">Explore Catalog</a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Slide 2 -->
      <div class="hero-slide" style="background-image: url('https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1600');">
        <div class="container" style="height: 100%; display: flex; align-items: center;">
          <div class="hero-content">
            <span class="hero-tag">MagSafe Hub Series</span>
            <h1>Power Restructured</h1>
            <p>Elevate your workspace charging alignment with aircraft-grade aluminum alloy surfaces and triple charging capabilities.</p>
            <div style="display: flex; gap: 16px;">
              <a href="<?php echo esc_url( getThemeUrl('product') . '?id=2' ); ?>" class="btn btn-primary">Shop MagSafe</a>
              <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="btn btn-secondary">Browse Store</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls indicators -->
    <div class="slider-dots">
      <span class="slider-dot active" data-index="0"></span>
      <span class="slider-dot" data-index="1"></span>
    </div>
    <div class="slider-arrows">
      <button class="slider-arrow" id="slider-prev" aria-label="Previous slide"><i class="fa-solid fa-chevron-left"></i></button>
      <button class="slider-arrow" id="slider-next" aria-label="Next slide"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
  </section>

  <!-- Categories showcase grid -->
  <section class="section-spacing container">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px;" class="reveal-element">
      <div>
        <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Curated Selections</span>
        <h2 style="font-size: 2.25rem; font-weight: 800; margin-top: 8px;">Explore Categories</h2>
      </div>
      <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" style="font-weight: 700; color: var(--accent); border-bottom: 2px solid var(--accent); padding-bottom: 4px;">View Catalog</a>
    </div>

    <div class="category-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
      <a href="<?php echo esc_url( home_url( '/shop/?category=audio' ) ); ?>" class="category-card reveal-element">
        <div class="category-card-icon"><i class="fa-solid fa-headphones"></i></div>
        <h3 class="category-card-title">Premium Audio</h3>
      </a>
      <a href="<?php echo esc_url( home_url( '/shop/?category=charging-station' ) ); ?>" class="category-card reveal-element">
        <div class="category-card-icon"><i class="fa-solid fa-plug"></i></div>
        <h3 class="category-card-title">MagSafe Hubs</h3>
      </a>
      <a href="<?php echo esc_url( home_url( '/shop/?category=charger' ) ); ?>" class="category-card reveal-element">
        <div class="category-card-icon"><i class="fa-solid fa-bolt"></i></div>
        <h3 class="category-card-title">Adapters & Power</h3>
      </a>
      <a href="<?php echo esc_url( home_url( '/shop/?category=wearables' ) ); ?>" class="category-card reveal-element">
        <div class="category-card-icon"><i class="fa-solid fa-clock"></i></div>
        <h3 class="category-card-title">Wearables</h3>
      </a>
    </div>
  </section>

  <!-- Bento design details showcase -->
  <section style="background-color: var(--bg-secondary); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 80px 0;">
    <div class="container">
      <div style="text-align: center; margin-bottom: 60px;" class="reveal-element">
        <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Designed for Precision</span>
        <h2 style="font-size: 2.25rem; font-weight: 800; margin-top: 8px;">The Elevora Standard</h2>
      </div>

      <div class="bento-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; grid-template-rows: auto auto;">
        <div class="reveal-element" style="grid-column: span 2; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); background-color: var(--bg-primary); padding: 40px; display: flex; flex-direction: column; justify-content: space-between; min-height: 280px;">
          <div>
            <h4 style="font-family: Outfit; font-size: 1.5rem; margin-bottom: 12px;">Premium Aerospace Metallurgy</h4>
            <p style="color: var(--text-secondary); max-width: 460px;">We use only milled aircraft-grade alloy frames, shielding critical copper cores from interference loops and heat buildup.</p>
          </div>
          <span style="font-family: Outfit; font-weight: 800; color: var(--accent); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;">01 / SHELL CONSTRUCTION</span>
        </div>
        
        <div class="reveal-element" style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); background-color: var(--bg-primary); padding: 40px; display: flex; flex-direction: column; justify-content: space-between;">
          <div class="category-card-icon" style="font-size: 3rem; margin-bottom: 20px;"><i class="fa-solid fa-microchip"></i></div>
          <div>
            <h4 style="font-family: Outfit; font-size: 1.25rem; margin-bottom: 10px;">Smart IC Chips</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Auto-regulates ampere frequencies to protect gadget health cycles.</p>
          </div>
        </div>

        <div class="reveal-element" style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); background-color: var(--bg-primary); padding: 40px; display: flex; flex-direction: column; justify-content: space-between;">
          <div class="category-card-icon" style="font-size: 3rem; margin-bottom: 20px; color:#a855f7;"><i class="fa-solid fa-shield-halved"></i></div>
          <div>
            <h4 style="font-family: Outfit; font-size: 1.25rem; margin-bottom: 10px;">Double Shielding</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Protects components from electrical surges and drops.</p>
          </div>
        </div>

        <div class="reveal-element" style="grid-column: span 2; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); background-color: var(--bg-primary); padding: 40px; display: flex; flex-direction: column; justify-content: space-between; min-height: 280px;">
          <div>
            <h4 style="font-family: Outfit; font-size: 1.5rem; margin-bottom: 12px;">Unified MagSafe Magnetic Lock</h4>
            <p style="color: var(--text-secondary); max-width: 480px;">Constructed with custom Neodymium alignments that support rapid 15W wireless power deliveries with zero alignment errors.</p>
          </div>
          <span style="font-family: Outfit; font-weight: 800; color: var(--accent); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;">02 / MAGNETIC INTERACTION</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Deal countdown container -->
  <section class="section-spacing container reveal-element">
    <div style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); background: linear-gradient(135deg, var(--bg-secondary) 0%, rgba(var(--accent-rgb), 0.05) 100%); padding: 60px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 40px;">
      <div style="max-width: 500px;">
        <span style="color: var(--danger); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-circle" style="font-size: 6px; animation: pulse-light 1s infinite;"></i> LIMITED FLASH SALE
        </span>
        <h2 style="font-size: 2.5rem; font-weight: 800; margin-top: 12px; margin-bottom: 16px;">Elevora Acoustic Pro Pro Edition</h2>
        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px;">Unlock premium ANC capabilities and leather ear cups for 20% off. Order within the timer and secure free international express shipping.</p>
        <div style="display: flex; gap: 16px;" id="deal-timer-clocks">
          <div style="text-align: center; background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; min-width: 70px;">
            <span style="font-family: Outfit; font-size: 1.8rem; font-weight: 800; color: var(--accent);" id="deal-hr">02</span>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Hours</div>
          </div>
          <div style="text-align: center; background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; min-width: 70px;">
            <span style="font-family: Outfit; font-size: 1.8rem; font-weight: 800; color: var(--accent);" id="deal-min">42</span>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Mins</div>
          </div>
          <div style="text-align: center; background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; min-width: 70px;">
            <span style="font-family: Outfit; font-size: 1.8rem; font-weight: 800; color: var(--danger);" id="deal-sec">59</span>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Secs</div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; border-left: 2px solid var(--border-color); padding-left: 60px;" class="deal-side-pricing">
        <span style="font-size: 0.9rem; color: var(--text-muted); text-decoration: line-through;">Original Price: $299.99</span>
        <span style="font-family: Outfit; font-size: 3rem; font-weight: 800; color: var(--text-primary); margin: 8px 0;">$239.99</span>
        <button class="btn btn-primary" onclick="addToCart(1, 1, 'Obsidian Black')">Order Deal Now</button>
      </div>
    </div>
  </section>

  <!-- Featured Grid Listing -->
  <section class="section-spacing container">
    <div style="text-align: center; margin-bottom: 50px;" class="reveal-element">
      <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Premium Catalog Highlights</span>
      <h2 style="font-size: 2.25rem; font-weight: 800; margin-top: 8px;">Featured Gadgets</h2>
    </div>

    <div class="product-grid" id="homepage-products-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
      <!-- Dynamic Products populated on load -->
    </div>
  </section>

  <script>
    // Deal timer logic
    document.addEventListener("DOMContentLoaded", () => {
      let hr = 2, min = 42, sec = 59;
      const hEl = document.getElementById("deal-hr");
      const mEl = document.getElementById("deal-min");
      const sEl = document.getElementById("deal-sec");

      setInterval(() => {
        sec--;
        if (sec < 0) {
          sec = 59;
          min--;
          if (min < 0) {
            min = 59;
            hr--;
            if (hr < 0) {
              hr = 2; // Reset loop
            }
          }
        }
        if (hEl) hEl.textContent = hr.toString().padStart(2, '0');
        if (mEl) mEl.textContent = min.toString().padStart(2, '0');
        if (sEl) sEl.textContent = sec.toString().padStart(2, '0');
      }, 1000);
      
      // Load products from data array
      const homeProductsGrid = document.getElementById("homepage-products-grid");
      if (homeProductsGrid && typeof ElevoraProducts !== "undefined") {
        const featured = ElevoraProducts.slice(0, 3); // Load first 3
        let html = "";
        featured.forEach(p => {
          const discountPercentage = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
          html += `
            <div class="product-card reveal-element revealed" data-id="${p.id}">
              <div class="card-media">
                ${p.badge ? `<span class="badge badge-${p.badgeType}">${p.badge}</span>` : ""}
                <a href="${getThemeUrl("product")}?id=${p.id}">
                  <img src="${p.images[0]}" alt="${p.name}">
                  ${p.images[1] ? `<img src="${p.images[1]}" class="card-img-hover" alt="${p.name}">` : ""}
                </a>
                <div class="card-actions">
                  <button class="card-action-btn wishlist-toggle-btn" data-id="${p.id}" onclick="toggleWishlist(${p.id})">
                    <i class="fa-regular fa-heart"></i>
                  </button>
                  <button class="card-action-btn compare-toggle-btn" data-id="${p.id}" onclick="toggleCompare(${p.id})">
                    <i class="fa-solid fa-code-compare"></i>
                  </button>
                </div>
              </div>
              <div class="card-info">
                <span class="card-category">${p.category}</span>
                <a href="${getThemeUrl("product")}?id=${p.id}" class="card-title">${p.name}</a>
                <div class="card-rating">
                  <div class="stars">
                    ${generateStars(p.rating)}
                  </div>
                  <span class="rating-value">${p.rating}</span>
                  <span class="reviews-count">(${p.reviewsCount})</span>
                </div>
                <div class="card-price-row">
                  <div class="price-wrap">
                    <span class="price">$${p.price.toFixed(2)}</span>
                    ${p.oldPrice ? `<span class="old-price">$${p.oldPrice.toFixed(2)}</span>` : ""}
                    ${p.oldPrice ? `<span class="discount">${discountPercentage}% OFF</span>` : ""}
                  </div>
                  <button class="btn btn-primary card-add-btn" onclick="addToCart(${p.id}, 1, '${p.colors[0]}')">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          `;
        });
        homeProductsGrid.innerHTML = html;
        if (typeof syncCompareStates === "function") syncCompareStates();
        if (typeof syncWishlistStates === "function") syncWishlistStates();
      }
    });

    function generateStars(rating) {
      let starsHtml = "";
      const full = Math.floor(rating);
      const half = rating % 1 >= 0.5 ? 1 : 0;
      const empty = 5 - full - half;

      for (let i = 0; i < full; i++) starsHtml += '<i class="fa-solid fa-star"></i>';
      if (half) starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
      for (let i = 0; i < empty; i++) starsHtml += '<i class="fa-regular fa-star"></i>';
      return starsHtml;
    }
  </script>

<?php get_footer(); ?>
'@
Write-ThemeFile "front-page.php" $frontPagePhp

# Write 6. index.php
$indexPhp = @'
<?php
/**
 * Main fallback index file
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Elevora Blog Articles</h1>
    </div>
  </section>

  <main class="container">
    <div class="blog-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 80px;">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <article class="blog-card reveal-element" id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); overflow: hidden; background-color: var(--bg-primary); display: flex; flex-direction: column;">
          <div class="blog-media" style="height: 220px; overflow: hidden; background-color: var(--bg-secondary);">
            <?php if ( has_post_thumbnail() ) : ?>
              <?php the_post_thumbnail('medium_large', array('style' => 'width: 100%; height: 100%; object-fit: cover;')); ?>
            <?php else : ?>
              <img src="https://images.unsplash.com/photo-1609592424085-f55a64388432?w=600" alt="Placeholder" style="width: 100%; height: 100%; object-fit: cover;">
            <?php endif; ?>
          </div>
          <div class="blog-info" style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
            <div class="blog-meta-row" style="display: flex; gap: 16px; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
              <span><i class="fa-regular fa-calendar"></i> <?php echo get_the_date(); ?></span>
            </div>
            <h3 class="blog-card-title" style="font-family: 'Outfit'; font-size: 1.25rem; font-weight: 700; line-height: 1.3; margin-bottom: 12px;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
            <p class="blog-card-summary" style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; flex-grow: 1;"><?php echo wp_trim_words( get_the_excerpt(), 15, '...' ); ?></p>
            <a href="<?php the_permalink(); ?>" class="blog-read-btn" style="font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px; color: var(--text-primary); border-bottom: 2px solid var(--accent); width: fit-content; padding-bottom: 2px;">Read Article <i class="fa-solid fa-chevron-right"></i></a>
          </div>
        </article>
      <?php endwhile; endif; ?>
    </div>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "index.php" $indexPhp

# Write 7. single.php
$singlePhp = @'
<?php
/**
 * Single blog post layout
 */
get_header(); ?>

  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <section style="padding: 60px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
      <div class="container" style="max-width: 800px;">
        <div style="font-size: 0.8rem; color: var(--accent-dark); text-transform: uppercase; font-weight: 700; margin-bottom: 16px; letter-spacing: 0.05em; display: flex; gap: 8px;">
          <span>Category</span>
          <span>&bull;</span>
          <span><?php echo get_the_date(); ?></span>
        </div>
        <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1.2; color: var(--text-primary);"><?php the_title(); ?></h1>
      </div>
    </section>

    <main class="container" style="max-width: 800px; margin-bottom: 80px;">
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
        <?php the_content(); ?>
      </article>

      <!-- Comments section -->
      <?php
      if ( comments_open() || get_comments_number() ) {
          comments_template();
      }
      ?>
    </main>
  <?php endwhile; endif; ?>

<?php get_footer(); ?>
'@
Write-ThemeFile "single.php" $singlePhp

# Write 8. page.php
$pagePhp = @'
<?php
/**
 * Default page layout
 */
get_header(); ?>

  <main class="container" style="padding: 60px 0 80px;">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 30px; letter-spacing: -0.02em;"><?php the_title(); ?></h1>
        <div class="entry-content" style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.8;">
          <?php the_content(); ?>
        </div>
      </article>
    <?php endwhile; endif; ?>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "page.php" $pagePhp

# Write 9. woocommerce.php
$woocommercePhp = @'
<?php
/**
 * Core WooCommerce fallback bridge file
 */
get_header(); ?>

  <main class="container" style="padding: 60px 0 80px;">
    <?php woocommerce_content(); ?>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "woocommerce.php" $woocommercePhp

# Write 10. 404.php
$404Php = @'
<?php
/**
 * 404 Error page template
 */
get_header(); ?>

  <main class="container" style="padding: 100px 0; text-align: center;">
    <i class="fa-solid fa-triangle-exclamation" style="font-size: 5rem; color: var(--accent); margin-bottom: 24px; opacity: 0.5;"></i>
    <h1 style="font-size: 4rem; font-weight: 800; letter-spacing: -0.05em; margin-bottom: 12px; color: var(--text-primary);">404 Error</h1>
    <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 24px; color: var(--text-secondary);">Holographic Signal Interrupted</h2>
    <p style="color: var(--text-muted); margin-bottom: 40px; max-width: 480px; margin-left: auto; margin-right: auto;">The page you are looking for has been relocated or is offline. Use the links below to return to the active network hub.</p>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary">Return to Homepage</a>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "404.php" $404Php

# Write 11. template-about.php
$templateAboutPhp = @'
<?php
/**
 * Template Name: Elevora About Us
 */
get_header(); ?>

  <section style="padding: 60px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Our Brand Journey</span>
      <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">About Elevora</h1>
    </div>
  </section>

  <main class="container" style="max-width: 800px; margin-bottom: 80px; font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
    <h3 style="font-family: Outfit; font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px;">Elevating Your Tech Lifestyle</h3>
    <p style="margin-bottom: 24px;">At Elevora, we believe tech accessories are more than just functional components; they are vital extensions of your daily workspace, productivity, and lifestyle expression.</p>
    
    <div style="border-left: 3px solid var(--accent); padding-left: 20px; font-style: italic; color: var(--text-primary); margin: 30px 0;">
      "Our mission is to engineer high-fidelity smart gadget accessories that balance minimalist aesthetic structures with aerospace-grade durability levels."
    </div>

    <p>Established in 2026, Elevora serves a global audience of developers, designers, creatives, and hardware engineers. Every component in our catalog goes through surge protection testing and magnetic alignment checks before deployment.</p>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-about.php" $templateAboutPhp

# Write 12. template-contact.php
$templateContactPhp = @'
<?php
/**
 * Template Name: Elevora Contact Us
 */
get_header(); ?>

  <section style="padding: 60px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Get in Touch</span>
      <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Contact Support</h1>
    </div>
  </section>

  <main class="container" style="display: grid; grid-template-columns: 1.5fr 2fr; gap: 60px; margin-bottom: 80px;">
    <div>
      <h3 style="font-family: Outfit; font-size: 1.5rem; font-weight: 700; margin-bottom: 20px;">Active Signals</h3>
      <p style="color: var(--text-secondary); margin-bottom: 30px;">Reach out directly for order assistance, bulk corporate sales queries, or warranty submissions.</p>
      
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; gap: 16px; align-items: center;">
          <div class="action-btn" style="color: var(--accent);"><i class="fa-solid fa-envelope"></i></div>
          <div>
            <h5 style="font-weight: 700; font-size: 0.95rem;">Email Address</h5>
            <span style="color: var(--text-secondary); font-size: 0.9rem;">support@elevora.com</span>
          </div>
        </div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <div class="action-btn" style="color: var(--accent);"><i class="fa-solid fa-location-dot"></i></div>
          <div>
            <h5 style="font-weight: 700; font-size: 0.95rem;">Tech Hub Headquarters</h5>
            <span style="color: var(--text-secondary); font-size: 0.9rem;">Silicon Avenue, Tech City, IN</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Form -->
    <div class="auth-card" style="max-width: 100%;">
      <form class="auth-form" onsubmit="event.preventDefault(); showToast('Message dispatched to support team!', 'success');">
        <div class="auth-input-group">
          <label>Your Full Name</label>
          <input type="text" class="auth-input" required placeholder="Jane Doe">
        </div>
        <div class="auth-input-group">
          <label>Email Address</label>
          <input type="email" class="auth-input" required placeholder="jane@example.com">
        </div>
        <div class="auth-input-group">
          <label>Support Query / Message</label>
          <textarea class="auth-input" required placeholder="Write message..." style="resize: vertical; height: 120px;"></textarea>
        </div>
        <button type="submit" class="auth-btn">Dispatch Signal</button>
      </form>
    </div>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-contact.php" $templateContactPhp

# Write 13. template-faq.php
$templateFaqPhp = @'
<?php
/**
 * Template Name: Elevora FAQ Layout
 */
get_header(); ?>

  <section style="padding: 60px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Common Inquiries</span>
      <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Frequently Asked Questions</h1>
    </div>
  </section>

  <main class="container" style="max-width: 800px; margin-bottom: 80px;">
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <!-- FAQ Item 1 -->
      <div class="accordion-item" style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); background-color: var(--bg-secondary); padding: 24px; cursor: pointer;">
        <div class="accordion-title-row" style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-family: Outfit; font-size: 1.1rem;">
          <span>Do Elevora charging hubs support Apple MagSafe?</span>
          <i class="fa-solid fa-plus" style="transition: transform 0.3s ease;"></i>
        </div>
        <div class="accordion-content-anim">
          <p style="color: var(--text-secondary); margin-top: 14px; font-size: 0.95rem; line-height: 1.6;">Yes, all our Charging Station products are engineered with high-induction neodymium magnetic arrays that perfectly align with and support standard Apple MagSafe charging profiles up to 15W.</p>
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div class="accordion-item" style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); background-color: var(--bg-secondary); padding: 24px; cursor: pointer;">
        <div class="accordion-title-row" style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-family: Outfit; font-size: 1.1rem;">
          <span>What is the average shipping duration?</span>
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="accordion-content-anim">
          <p style="color: var(--text-secondary); margin-top: 14px; font-size: 0.95rem; line-height: 1.6;">Orders are processed inside 48 hours. Shipping standard delivery timelines span 5-10 business days. Express shipments reach in 3-5 business days.</p>
        </div>
      </div>

      <!-- FAQ Item 3 -->
      <div class="accordion-item" style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); background-color: var(--bg-secondary); padding: 24px; cursor: pointer;">
        <div class="accordion-title-row" style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-family: Outfit; font-size: 1.1rem;">
          <span>Do you offer international product warranties?</span>
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="accordion-content-anim">
          <p style="color: var(--text-secondary); margin-top: 14px; font-size: 0.95rem; line-height: 1.6;">Absolutely. All Elevora hardware systems carry an automatically activated 1-Year limited warranty policy that guards against internal chipset failure or hardware assembly decay.</p>
        </div>
      </div>
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll(".accordion-item").forEach(item => {
        item.addEventListener("click", () => {
          const isActive = item.classList.contains("active");
          
          // Collapse others
          document.querySelectorAll(".accordion-item").forEach(el => {
            el.classList.remove("active");
            const icon = el.querySelector(".accordion-title-row i");
            if (icon) icon.className = "fa-solid fa-plus";
          });

          if (!isActive) {
            item.classList.add("active");
            const icon = item.querySelector(".accordion-title-row i");
            if (icon) icon.className = "fa-solid fa-minus";
          }
        });
      });
    });
  </script>
'@
Write-ThemeFile "template-faq.php" $templateFaqPhp

# Write 14. template-track-order.php
$templateTrackOrderPhp = @'
<?php
/**
 * Template Name: Elevora Shipment Tracker
 */
get_header(); ?>

  <section style="padding: 60px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Shipment Status</span>
      <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Track Package</h1>
    </div>
  </section>

  <main class="container" style="max-width: 600px; margin-bottom: 80px;">
    <div class="auth-card" style="max-width: 100%;" id="tracker-card-wrap">
      <form class="auth-form" onsubmit="event.preventDefault(); triggerTrackingSearch();">
        <div class="auth-input-group">
          <label>Order Reference Number</label>
          <input type="text" class="auth-input" id="tracking-id-input" required placeholder="ELV-94285-TY">
        </div>
        <button type="submit" class="auth-btn">Fetch Shipment Info</button>
      </form>
    </div>

    <!-- Output grid -->
    <div id="tracking-results-area" style="display: none; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); background-color: var(--bg-secondary); padding: 40px; margin-top: 40px;">
      <!-- Populated via script below -->
    </div>
  </main>

  <script>
    function triggerTrackingSearch() {
      const code = document.getElementById("tracking-id-input").value.trim().toUpperCase();
      const area = document.getElementById("tracking-results-area");

      if (!code) return;

      area.style.display = "block";
      area.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1.5px solid var(--border-color); padding-bottom: 20px; margin-bottom: 30px;">
          <div>
            <h4 style="font-family: Outfit; font-size:1.1rem; font-weight:700;">Order: ${code}</h4>
            <span style="font-size:0.8rem; color:var(--text-muted);">Shipped via DHL Premium Route</span>
          </div>
          <span class="badge" style="background-color: var(--success); color:#fff; font-size:0.75rem; padding: 6px 12px; border-radius: var(--border-radius-full);">IN TRANSIT</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:30px; position:relative; padding-left: 30px;">
          <div style="position:absolute; left: 6px; top: 10px; bottom: 10px; width: 2px; background-color: var(--border-color);"></div>
          
          <!-- Node 1 -->
          <div style="position:relative;">
            <div style="position:absolute; left: -29px; top: 4px; width: 12px; height:12px; border-radius:50%; background-color: var(--accent); box-shadow: 0 0 10px var(--accent);"></div>
            <h5 style="font-family:Outfit; font-weight:700; font-size:0.95rem; color:var(--text-primary);">Departed Sorting Hub</h5>
            <span style="font-size:0.8rem; color:var(--text-muted);">Tech Hub facility - Jul 05, 2026</span>
          </div>

          <!-- Node 2 -->
          <div style="position:relative;">
            <div style="position:absolute; left: -29px; top: 4px; width: 12px; height:12px; border-radius:50%; background-color: var(--success);"></div>
            <h5 style="font-family:Outfit; font-weight:700; font-size:0.95rem; color:var(--text-secondary);">Surge Safety Test Passed</h5>
            <span style="font-size:0.8rem; color:var(--text-muted);">Quality Audit Chamber - Jul 04, 2026</span>
          </div>

          <!-- Node 3 -->
          <div style="position:relative;">
            <div style="position:absolute; left: -29px; top: 4px; width: 12px; height:12px; border-radius:50%; background-color: var(--success);"></div>
            <h5 style="font-family:Outfit; font-weight:700; font-size:0.95rem; color:var(--text-secondary);">Surface Magnet Alignment Checked</h5>
            <span style="font-size:0.8rem; color:var(--text-muted);">Assembly Line A - Jul 04, 2026</span>
          </div>
        </div>
      `;
      if (typeof showToast === "function") {
        showToast("Signal matched. Loading tracker loop", "info");
      }
    }
  </script>
'@
Write-ThemeFile "template-track-order.php" $templateTrackOrderPhp

# Write 15. template-wishlist.php
$templateWishlistPhp = @'
<?php
/**
 * Template Name: Elevora Wishlist Page
 */
get_header(); ?>

  <section style="padding: 60px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Saved Items</span>
      </div>
      <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">My Wishlist</h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <div class="product-grid" id="wishlist-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
      <!-- Populated via wishlist-new.js -->
    </div>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-wishlist.php" $templateWishlistPhp

# Write 16. template-shop.php
$templateShopPhp = @'
<?php
/**
 * Template Name: Elevora Shop Page
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Shop Catalog</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Device Hub Catalog</h1>
    </div>
  </section>

  <main class="container" style="display: grid; grid-template-columns: 280px 1fr; gap: 40px; margin-bottom: 80px;">
    
    <!-- Sidebar Filters -->
    <aside style="display: flex; flex-direction: column; gap: 36px;">
      
      <!-- Search inside shop -->
      <div style="position: relative;">
        <h4 style="font-family: Outfit; font-weight:700; font-size: 1rem; margin-bottom: 16px;">Search Shop</h4>
        <input type="text" id="shop-search-input" placeholder="Type name, category..." style="width: 100%; padding: 12px; border-radius: var(--border-radius-md); border: 1.5px solid var(--border-color); background: var(--bg-secondary); font-size: 0.9rem; color: var(--text-primary);">
      </div>

      <!-- Categories -->
      <div>
        <h4 style="font-family: Outfit; font-weight: 700; font-size: 1rem; margin-bottom: 16px;">Categories</h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <a href="#" class="sidebar-filter-link active" data-category="all" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; justify-content: space-between;"><span>All Categories</span></a>
          <a href="#" class="sidebar-filter-link" data-category="audio" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; justify-content: space-between;"><span>Audio Devices</span></a>
          <a href="#" class="sidebar-filter-link" data-category="charging-station" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; justify-content: space-between;"><span>Charging Hubs</span></a>
          <a href="#" class="sidebar-filter-link" data-category="charger" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; justify-content: space-between;"><span>Wall Chargers</span></a>
          <a href="#" class="sidebar-filter-link" data-category="wearables" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; justify-content: space-between;"><span>Wearables</span></a>
        </div>
      </div>

      <!-- Brands -->
      <div>
        <h4 style="font-family: Outfit; font-weight: 700; font-size: 1rem; margin-bottom: 16px;">Brands</h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <a href="#" class="sidebar-filter-link active" data-brand="all" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary);">All Brands</a>
          <a href="#" class="sidebar-filter-link" data-brand="elevora" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary);">Elevora Core</a>
          <a href="#" class="sidebar-filter-link" data-brand="soundwave" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary);">Soundwave</a>
          <a href="#" class="sidebar-filter-link" data-brand="voltcore" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary);">VoltCore</a>
        </div>
      </div>

      <!-- Price limits -->
      <div class="price-range-slider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h4 style="font-family: Outfit; font-weight: 700; font-size: 1rem;">Max Price Limit</h4>
          <span style="font-family: Outfit; font-weight: 800; font-size: 1rem; color: var(--accent);" id="price-limit-display">$3,000</span>
        </div>
        <input type="range" class="price-slider-input" id="price-limit-slider" min="10" max="3000" step="10" value="3000">
      </div>
    </aside>

    <!-- Catalog view -->
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; border-bottom: 1.5px solid var(--border-color); margin-bottom: 30px;">
        <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 600;" id="shop-results-count">Loading products...</span>
        <div style="display: flex; gap: 12px; align-items: center;">
          <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Sort By:</label>
          <select id="shop-sort-select" style="background-color: var(--bg-secondary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-sm); padding: 8px 12px; font-size: 0.85rem; color: var(--text-primary); cursor: pointer;">
            <option value="default">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Customer Rated</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      <!-- Grid container -->
      <div class="product-grid" id="shop-products-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
        <!-- Loaded dynamically via filters-new.js -->
      </div>
    </div>
  </main>

  <style>
    .sidebar-filter-link {
      transition: all var(--transition-fast);
    }
    .sidebar-filter-link.active, .sidebar-filter-link:hover {
      color: var(--accent) !important;
      padding-left: 8px;
    }
  </style>
<?php get_footer(); ?>
'@
Write-ThemeFile "template-shop.php" $templateShopPhp

# Write 17. template-product.php
$templateProductPhp = @'
<?php
/**
 * Template Name: Elevora Product Details Page
 */
get_header(); ?>

  <main class="container" style="padding-top: 40px; margin-bottom: 80px;">
    <div id="product-details-root">
      <!-- Loaded dynamically via script below -->
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const params = new URLSearchParams(window.location.search);
      const prodId = parseInt(params.get("id")) || 1;
      
      const p = ElevoraProducts.find(item => item.id === prodId);
      const root = document.getElementById("product-details-root");

      if (!p) {
        root.innerHTML = `<div class="empty-state-wrap"><h3>Product id matches no active listing</h3></div>`;
        return;
      }

      const discountPercentage = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
      
      let thumbsHtml = p.images.map((img, idx) => `
        <button class="thumbnail-btn ${idx === 0 ? "active" : ""}" onclick="switchDetailPhoto('${img}', this)">
          <img src="${img}" alt="thumbnail">
        </button>
      `).join("");

      let colorsHtml = p.colors.map((c, idx) => `
        <span class="color-pill ${idx === 0 ? "active" : ""}" onclick="selectVariationColor('${c}', this)">${c}</span>
      `).join("");

      let specsHtml = Object.entries(p.specs).map(([key, val]) => `
        <div style="display: grid; grid-template-columns: 200px 1fr; padding: 14px 20px; border-bottom: 1px solid var(--border-color);">
          <span style="font-weight: 700; color: var(--text-primary);">${key}</span>
          <span style="color: var(--text-secondary);">${val}</span>
        </div>
      `).join("");

      root.innerHTML = `
        <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 30px;">
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
          <span>/</span>
          <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>">Shop</a>
          <span>/</span>
          <span style="color: var(--text-primary);">${p.name}</span>
        </div>

        <div class="product-details-wrap">
          <!-- Gallery Col -->
          <div>
            <div class="main-image-viewport">
              <img src="${p.images[0]}" alt="${p.name}" id="main-product-viewport-img">
            </div>
            <div class="gallery-thumbnails">
              ${thumbsHtml}
            </div>
          </div>

          <!-- Info Col -->
          <div class="product-info-col">
            <span class="product-tag">${p.category}</span>
            <h1 class="product-title">${p.name}</h1>
            
            <div class="product-rating-row">
              <div class="stars" style="color: #fbbf24;">${generateStarsHTML(p.rating)}</div>
              <span class="rating-value" style="font-weight:700;">${p.rating} / 5.0</span>
              <span style="color: var(--text-muted);">(${p.reviewsCount} reviews)</span>
            </div>

            <div class="pricing-row">
              <span class="price-large">$${p.price.toFixed(2)}</span>
              ${p.oldPrice ? `<span class="old-price-large">$${p.oldPrice.toFixed(2)}</span>` : ""}
              ${p.oldPrice ? `<span class="discount-badge-large">${discountPercentage}% OFF</span>` : ""}
            </div>

            <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 30px; font-size: 1rem;">${p.description}</p>

            <!-- Color Options -->
            <div>
              <h4 class="option-title">Select Edition Color</h4>
              <div class="color-pills-row" id="product-details-variation-picker">
                ${colorsHtml}
              </div>
            </div>

            <!-- Qty & Cart buttons -->
            <div style="display: flex; gap: 20px; align-items: center; margin-top: 10px; margin-bottom: 40px;">
              <div style="display: flex; align-items: center; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); background: var(--bg-secondary); overflow: hidden;">
                <button class="qty-btn" onclick="adjustDetailsQty(-1)" style="width:44px; height:48px;">-</button>
                <input type="text" id="details-qty-val" value="1" readonly style="width: 44px; text-align: center; font-weight: 700; font-family: Outfit;">
                <button class="qty-btn" onclick="adjustDetailsQty(1)" style="width:44px; height:48px;">+</button>
              </div>
              <button class="btn btn-primary" style="flex-grow: 1; height: 50px; font-size: 1.05rem;" id="details-buy-btn" onclick="triggerDetailsCartAdd(${p.id})">Add to Shopping Cart</button>
              <button class="action-btn wishlist-toggle-btn" style="width: 50px; height: 50px;" data-id="${p.id}" onclick="toggleWishlist(${p.id})"><i class="fa-regular fa-heart"></i></button>
            </div>

            <!-- Free shipping check -->
            <div style="display: flex; gap: 12px; align-items: center; padding: 20px; border-radius: var(--border-radius-md); border: 1.5px solid var(--border-color); background: var(--bg-secondary);">
              <i class="fa-solid fa-truck" style="color: var(--accent); font-size: 1.2rem;"></i>
              <span style="font-size: 0.9rem; color: var(--text-secondary); font-weight: 600;">Eligible for FREE international route delivery.</span>
            </div>
          </div>
        </div>

        <!-- Specifications Section -->
        <section style="margin-top: 80px;">
          <h3 style="font-family: Outfit; font-size: 1.5rem; font-weight: 800; border-bottom: 2px solid var(--border-color); padding-bottom: 12px; margin-bottom: 24px;">Specifications Matrix</h3>
          <div style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); overflow: hidden; background-color: var(--bg-secondary);">
            ${specsHtml}
          </div>
        </section>
      `;
      
      if (typeof syncWishlistStates === "function") syncWishlistStates();
    });

    let selectedVariation = "";
    function selectVariationColor(colorName, btn) {
      selectedVariation = colorName;
      document.querySelectorAll("#product-details-variation-picker .color-pill").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
    }

    function switchDetailPhoto(imgUrl, btn) {
      document.getElementById("main-product-viewport-img").src = imgUrl;
      document.querySelectorAll(".gallery-thumbnails .thumbnail-btn").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
    }

    function adjustDetailsQty(amount) {
      const input = document.getElementById("details-qty-val");
      let val = parseInt(input.value) + amount;
      if (val < 1) val = 1;
      input.value = val;
    }

    function triggerDetailsCartAdd(id) {
      const qty = parseInt(document.getElementById("details-qty-val").value);
      if (!selectedVariation) {
        const activePill = document.querySelector("#product-details-variation-picker .color-pill.active");
        selectedVariation = activePill ? activePill.textContent : "";
      }
      addToCart(id, qty, selectedVariation);
    }

    function generateStarsHTML(rating) {
      let starsHtml = "";
      const full = Math.floor(rating);
      const half = rating % 1 >= 0.5 ? 1 : 0;
      const empty = 5 - full - half;

      for (let i = 0; i < full; i++) starsHtml += '<i class="fa-solid fa-star"></i>';
      if (half) starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
      for (let i = 0; i < empty; i++) starsHtml += '<i class="fa-regular fa-star"></i>';
      return starsHtml;
    }
  </script>
'@
Write-ThemeFile "template-product.php" $templateProductPhp

# Write 18. template-cart.php
$templateCartPhp = @'
<?php
/**
 * Template Name: Elevora Shopping Cart
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Cart Summary</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Shopping Cart</h1>
    </div>
  </section>

  <!-- Cart layouts -->
  <main class="container" style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 40px; margin-bottom: 80px;" id="cart-page-split-layout">
    
    <!-- Left: Cart Items -->
    <div id="cart-items-container">
      <!-- Rendered dynamically via cart-new.js -->
    </div>

    <!-- Right: Summary Card -->
    <div>
      <div class="auth-card" style="max-width: 100%; position: sticky; top: 100px;">
        <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.25rem; margin-bottom: 24px; border-bottom: 1.5px solid var(--border-color); padding-bottom: 15px;">Summary Panel</h3>
        
        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; font-size: 0.95rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Subtotal</span>
            <span style="font-weight: 700; color: var(--text-primary);" id="cart-summary-subtotal">$0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; display: none;">
            <span style="color: var(--text-secondary);">Coupon Discount</span>
            <span style="font-weight: 700; color: var(--danger);" id="cart-summary-discount">-$0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Shipping Cost</span>
            <span style="font-weight: 700; color: var(--success);" id="cart-summary-shipping">FREE</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1.5px solid var(--border-color); padding-top: 16px; font-size: 1.15rem; font-family: Outfit; font-weight: 800;">
            <span>Grand Total</span>
            <span style="color: var(--accent);" id="cart-summary-total">$0.00</span>
          </div>
        </div>

        <!-- Coupon code wrapper -->
        <div style="display: flex; gap: 8px; margin-bottom: 24px;">
          <input type="text" id="coupon-code-input" placeholder="Coupon (ELEVORA20)" style="flex-grow: 1; padding: 12px; border-radius: var(--border-radius-md); border: 1.5px solid var(--border-color); background: var(--bg-primary); font-size: 0.85rem; color: var(--text-primary); text-transform: uppercase;">
          <button class="btn btn-secondary" onclick="applyPromoCoupon()" style="padding: 0 16px; font-size: 0.85rem;">Apply</button>
        </div>

        <a href="<?php echo esc_url( home_url( '/checkout/' ) ); ?>" class="btn btn-primary" style="width: 100%; height: 50px; text-align: center; justify-content: center; font-size: 1.05rem;">Proceed to Checkout</a>
      </div>
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof renderCartPage === "function") {
        renderCartPage();
      }
    });
  </script>
'@
Write-ThemeFile "template-cart.php" $templateCartPhp

# Write 19. template-checkout.php
$templateCheckoutPhp = @'
<?php
/**
 * Template Name: Elevora Checkout Portal
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>">Cart</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Secure Portal</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Secure Checkout</h1>
    </div>
  </section>

  <!-- Checkout split -->
  <main class="container" style="display: grid; grid-template-columns: 1.8fr 1fr; gap: 40px; margin-bottom: 80px;">
    
    <!-- Billing Details form -->
    <div class="auth-card" style="max-width: 100%;">
      <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.25rem; margin-bottom: 24px; border-bottom: 1.5px solid var(--border-color); padding-bottom: 12px;">Billing & Address</h3>
      <form class="auth-form" onsubmit="event.preventDefault(); triggerOrderSuccessRedirect();">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="auth-input-group">
            <label>First Name</label>
            <input type="text" class="auth-input" required placeholder="Jane">
          </div>
          <div class="auth-input-group">
            <label>Last Name</label>
            <input type="text" class="auth-input" required placeholder="Doe">
          </div>
        </div>
        
        <div class="auth-input-group">
          <label>Delivery Address</label>
          <input type="text" class="auth-input" required placeholder="123 Silicon Valley Road">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="auth-input-group">
            <label>City</label>
            <input type="text" class="auth-input" required placeholder="Tech City">
          </div>
          <div class="auth-input-group">
            <label>Postal Code</label>
            <input type="text" class="auth-input" required placeholder="94025">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="auth-input-group">
            <label>Email Address</label>
            <input type="email" class="auth-input" required placeholder="jane@example.com">
          </div>
          <div class="auth-input-group">
            <label>Contact Phone</label>
            <input type="tel" class="auth-input" required placeholder="+1 (555) 019-2834">
          </div>
        </div>

        <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.25rem; margin-top: 20px; margin-bottom: 16px; border-bottom: 1.5px solid var(--border-color); padding-bottom: 12px;">Secure Payment Channels</h3>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 10px;">
          <label style="display: flex; align-items: center; gap: 12px; padding: 14px 20px; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); background: var(--bg-primary); cursor: pointer;">
            <input type="radio" name="payment_method" value="stripe" checked>
            <span style="font-weight: 700;">Debit / Credit Card (Stripe Gateway)</span>
          </label>
          <label style="display: flex; align-items: center; gap: 12px; padding: 14px 20px; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); background: var(--bg-primary); cursor: pointer;">
            <input type="radio" name="payment_method" value="paypal">
            <span style="font-weight: 700;">PayPal Express Node</span>
          </label>
        </div>

        <button type="submit" class="auth-btn" style="height: 50px;">Submit Order Protocol</button>
      </form>
    </div>

    <!-- Cart items preview list -->
    <div>
      <div class="auth-card" style="max-width: 100%;">
        <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.25rem; margin-bottom: 24px; border-bottom: 1.5px solid var(--border-color); padding-bottom: 12px;">Summary Preview</h3>
        <div id="checkout-summary-items-list" style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
          <!-- Loaded dynamically -->
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem; border-top: 1.5px solid var(--border-color); padding-top: 20px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Subtotal</span>
            <span style="font-weight: 700;" id="chk-subtotal">$0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; display: none;" id="chk-discount-row">
            <span style="color: var(--text-secondary);">Coupon Discount</span>
            <span style="font-weight: 700; color: var(--danger);" id="chk-discount">-$0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Delivery Shipping</span>
            <span style="font-weight: 700; color: var(--success);" id="chk-shipping">FREE</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1.5px solid var(--border-color); padding-top: 12px; font-family: Outfit; font-size: 1.15rem; font-weight: 800; color: var(--accent);">
            <span>Order Total</span>
            <span id="chk-total">$0.00</span>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const cart = getCart();
      const list = document.getElementById("checkout-summary-items-list");
      
      if (!list) return;

      if (cart.length === 0) {
        list.innerHTML = `<span style="color:var(--text-muted);">No items in cart</span>`;
        return;
      }

      let subtotal = 0;
      let html = "";

      cart.forEach(item => {
        const p = ElevoraProducts.find(prod => prod.id === item.productId);
        if (p) {
          const total = p.price * item.quantity;
          subtotal += total;
          html += `
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;">
              <span style="max-width: 180px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-primary);">${p.name} <span style="color: var(--accent);">x${item.quantity}</span></span>
              <span style="font-weight: 700; color: var(--text-secondary);">$${total.toFixed(2)}</span>
            </div>
          `;
        }
      });

      list.innerHTML = html;

      document.getElementById("chk-subtotal").textContent = `$${subtotal.toFixed(2)}`;

      const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 9.99;
      document.getElementById("chk-shipping").textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;

      const appliedCoupon = localStorage.getItem("elevora_applied_coupon");
      let discount = 0;
      if (appliedCoupon === "ELEVORA20" && subtotal > 0) {
        discount = subtotal * 0.20;
        document.getElementById("chk-discount").textContent = `-$${discount.toFixed(2)}`;
        document.getElementById("chk-discount-row").style.display = "flex";
      }

      const total = subtotal - discount + shipping;
      document.getElementById("chk-total").textContent = `$${total.toFixed(2)}`;
    });

    function triggerOrderSuccessRedirect() {
      // Clear cart
      clearCart();
      if (typeof showToast === "function") {
        showToast("Authorization processed. Aligning payment...", "success");
      }
      setTimeout(() => {
        window.location.href = getThemeUrl("order-success");
      }, 900);
    }
  </script>
'@
Write-ThemeFile "template-checkout.php" $templateCheckoutPhp

# Write 20. template-my-account.php
$templateMyAccountPhp = @'
<?php
/**
 * Template Name: Elevora Customer Center
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
      <div>
        <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Security Control</span>
        <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">My Account</h1>
      </div>
      <a href="<?php echo esc_url( wp_logout_url( home_url( '/' ) ) ); ?>" class="btn btn-secondary" style="font-size: 0.85rem; padding: 10px 18px;">Disconnect Session</a>
    </div>
  </section>

  <!-- Split account dashboard -->
  <main class="container" style="display: grid; grid-template-columns: 240px 1fr; gap: 40px; margin-bottom: 80px;">
    
    <!-- Left Navigation links -->
    <aside style="display: flex; flex-direction: column; gap: 12px;">
      <a href="#" class="sidebar-filter-link active" style="font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-gauge"></i> Dashboard</a>
      <a href="<?php echo esc_url( home_url( '/wishlist/' ) ); ?>" class="sidebar-filter-link" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;"><i class="fa-regular fa-heart"></i> Saved Devices</a>
      <a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>" class="sidebar-filter-link" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-truck"></i> Shipments</a>
    </aside>

    <!-- Content -->
    <div class="auth-card" style="max-width: 100%;">
      <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.25rem; margin-bottom: 16px;">Core Hub Overview</h3>
      <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 30px;">Welcome back, <strong>Customer</strong>. Access order references, trace delivery loops, and edit your profile password metrics from here.</p>

      <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.2rem; margin-bottom: 16px; border-top: 1.5px solid var(--border-color); padding-top: 30px;">Recent Shipping Referencing</h3>
      <div style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); padding: 20px; display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-primary);">
        <div>
          <h5 style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">Order #ELV-94285-TY</h5>
          <span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-top: 4px;">Dispatched Jul 05, 2026 &bull; Express Courier</span>
        </div>
        <a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>" class="btn btn-secondary" style="font-size: 0.8rem; padding: 8px 16px;">Trace Route</a>
      </div>
    </div>
  </main>

  <style>
    .sidebar-filter-link { transition: all var(--transition-fast); }
    .sidebar-filter-link.active, .sidebar-filter-link:hover { color: var(--accent) !important; padding-left: 8px; }
  </style>
<?php get_footer(); ?>
'@
Write-ThemeFile "template-my-account.php" $templateMyAccountPhp

# Write 21. template-order-success.php
$templateOrderSuccessPhp = @'
<?php
/**
 * Template Name: Elevora Order Processed Successfully
 */
get_header(); ?>

  <main class="container" style="padding: 100px 0; text-align: center;">
    <div style="width: 80px; height: 80px; border-radius: 50%; background-color: rgba(16, 185, 129, 0.1); border: 2px solid var(--success); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);">
      <i class="fa-solid fa-check" style="font-size: 2rem; color: var(--success);"></i>
    </div>
    <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 12px; color: var(--text-primary);">Order Transmitted</h1>
    <h2 style="font-size: 1.4rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 24px;">Shipment Protocol Activated</h2>
    <p style="color: var(--text-muted); margin-bottom: 40px; max-width: 480px; margin-left: auto; margin-right: auto;">We have successfully queued your transaction. The warehouse queue has scheduled physical packaging and surge protection checks. Reference number: <strong>ELV-94285-TY</strong>.</p>
    <div style="display: flex; gap: 16px; justify-content: center;">
      <a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>" class="btn btn-primary">Track Route</a>
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-secondary">Return Hub</a>
    </div>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-order-success.php" $templateOrderSuccessPhp

# Write 22. template-compare.php
$templateComparePhp = @'
<?php
/**
 * Template Name: Elevora Product Compare (Static Fallback)
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Compare Gadgets</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Compare Smart Gadgets</h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <div id="compare-page-container">
      <!-- Loaded dynamically via compare.js -->
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof renderComparePage === "function") {
        renderComparePage();
      }
    });
  </script>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-compare.php" $templateComparePhp

# Write 23. template-login.php
$templateLoginPhp = @'
<?php
/**
 * Template Name: Elevora Login Page
 */
get_header(); ?>

  <main class="container auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Welcome Back</h2>
      <p class="auth-subtitle">Log in to Elevora to manage orders and track shipments.</p>
      
      <form class="auth-form" method="post" action="<?php echo esc_url( wp_login_url() ); ?>">
        <div class="auth-input-group">
          <label for="user_login">Username or Email</label>
          <input type="text" name="log" id="user_login" class="auth-input" required autocomplete="username">
        </div>
        
        <div class="auth-input-group">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label for="user_pass">Password</label>
            <a href="<?php echo esc_url( wp_lostpassword_url() ); ?>" style="font-size: 0.8rem; color: var(--text-muted);">Forgot?</a>
          </div>
          <input type="password" name="pwd" id="user_pass" class="auth-input" required autocomplete="current-password">
        </div>

        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-secondary);">
          <input type="checkbox" name="rememberme" id="rememberme" value="forever">
          <label for="rememberme">Keep me logged in</label>
        </div>

        <button type="submit" class="auth-btn">Log In</button>
        <input type="hidden" name="redirect_to" value="<?php echo esc_url( home_url( '/my-account/' ) ); ?>">
      </form>

      <div class="auth-footer">
        Don't have an account? <a href="<?php echo esc_url( home_url( '/register/' ) ); ?>">Sign Up Now</a>
      </div>
    </div>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-login.php" $templateLoginPhp

# Write 24. template-register.php
$templateRegisterPhp = @'
<?php
/**
 * Template Name: Elevora Registration Page
 */
get_header(); ?>

  <main class="container auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Create Account</h2>
      <p class="auth-subtitle">Join Elevora today and elevate your tech lifestyle.</p>
      
      <form class="auth-form" method="post" action="<?php echo esc_url( wp_registration_url() ); ?>">
        <div class="auth-input-group">
          <label for="reg_username">Username</label>
          <input type="text" name="user_login" id="reg_username" class="auth-input" required autocomplete="username">
        </div>

        <div class="auth-input-group">
          <label for="reg_email">Email Address</label>
          <input type="email" name="user_email" id="reg_email" class="auth-input" required autocomplete="email">
        </div>
        
        <div class="auth-input-group">
          <label for="reg_pass">Password</label>
          <input type="password" name="user_password" id="reg_pass" class="auth-input" required autocomplete="new-password">
        </div>

        <div style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
          <input type="checkbox" id="terms_agree" required style="margin-top: 3px;">
          <label for="terms_agree">I agree to Elevora's <a href="<?php echo esc_url( home_url( '/terms-conditions/' ) ); ?>" target="_blank">Terms of Service</a> and <a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>" target="_blank">Privacy Guidelines</a>.</label>
        </div>

        <button type="submit" class="auth-btn">Register</button>
        <input type="hidden" name="redirect_to" value="<?php echo esc_url( home_url( '/my-account/' ) ); ?>">
      </form>

      <div class="auth-footer">
        Already have an account? <a href="<?php echo esc_url( home_url( '/login/' ) ); ?>">Log In</a>
      </div>
    </div>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-register.php" $templateRegisterPhp

# Write Policy fallback pages
$templatePrivacyPolicyPhp = @'
<?php
/**
 * Template Name: Elevora Privacy Policy
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Privacy Guidelines</h1>
    </div>
  </section>

  <main class="container" style="max-width: 800px; margin-bottom: 80px;">
    <article class="entry-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <?php the_content(); ?>
      <?php endwhile; else : ?>
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact support.</p>
        <h2>2. Data Protection</h2>
        <p>We implement strict security measures to protect your personal details. Payments are processed securely via SSL-encrypted gateways.</p>
      <?php endif; ?>
    </article>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-privacy-policy.php" $templatePrivacyPolicyPhp

$templateTermsPhp = @'
<?php
/**
 * Template Name: Elevora Terms of Service
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Terms of Service</h1>
    </div>
  </section>

  <main class="container" style="max-width: 800px; margin-bottom: 80px;">
    <article class="entry-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <?php the_content(); ?>
      <?php endwhile; else : ?>
        <h2>1. User Agreement</h2>
        <p>By using the Elevora website, you agree to comply with all guidelines, privacy rules, and shipping guidelines outlined on this portal.</p>
      <?php endif; ?>
    </article>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-terms.php" $templateTermsPhp

$templateShippingPolicyPhp = @'
<?php
/**
 * Template Name: Elevora Shipping Policy
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Shipping Policy</h1>
    </div>
  </section>

  <main class="container" style="max-width: 800px; margin-bottom: 80px;">
    <article class="entry-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
      <h2>1. Delivery Timeframes</h2>
      <p>Orders are processed in 1-2 business days. Shipping usually takes 5-10 business days for standard international courier routes.</p>
      <h2>2. Trackable Courier Routes</h2>
      <p>We provide trackable shipment numbers for every order. You can monitor courier delivery loops directly inside our tracking portal.</p>
    </article>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-shipping-policy.php" $templateShippingPolicyPhp

$templateRefundPolicyPhp = @'
<?php
/**
 * Template Name: Elevora Refund Policy
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Refund Policy</h1>
    </div>
  </section>

  <main class="container" style="max-width: 800px; margin-bottom: 80px;">
    <article class="entry-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
      <h2>1. Return & Refund Conditions</h2>
      <p>If you're not satisfied, we offer refunds on products returned in original packaging within 30 days of shipment receipt.</p>
    </article>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "template-refund-policy.php" $templateRefundPolicyPhp

# Write archive.php
$archivePhp = @'
<?php
/**
 * Display archives
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">
        <?php single_cat_title(); ?>
      </h1>
    </div>
  </section>

  <main class="container">
    <div class="blog-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 80px;">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <article class="blog-card reveal-element" id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); overflow: hidden; background-color: var(--bg-primary); display: flex; flex-direction: column;">
          <div class="blog-media" style="height: 220px; overflow: hidden; background-color: var(--bg-secondary);">
            <?php if ( has_post_thumbnail() ) : ?>
              <?php the_post_thumbnail('medium_large', array('style' => 'width: 100%; height: 100%; object-fit: cover;')); ?>
            <?php else : ?>
              <img src="https://images.unsplash.com/photo-1609592424085-f55a64388432?w=600" alt="Placeholder" style="width: 100%; height: 100%; object-fit: cover;">
            <?php endif; ?>
          </div>
          <div class="blog-info" style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
            <div class="blog-meta-row" style="display: flex; gap: 16px; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
              <span><i class="fa-regular fa-calendar"></i> <?php echo get_the_date(); ?></span>
            </div>
            <h3 class="blog-card-title" style="font-family: 'Outfit'; font-size: 1.25rem; font-weight: 700; line-height: 1.3; margin-bottom: 12px;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
            <p class="blog-card-summary" style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; flex-grow: 1;"><?php echo wp_trim_words( get_the_excerpt(), 15, '...' ); ?></p>
            <a href="<?php the_permalink(); ?>" class="blog-read-btn" style="font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px; color: var(--text-primary); border-bottom: 2px solid var(--accent); width: fit-content; padding-bottom: 2px;">Read Article <i class="fa-solid fa-chevron-right"></i></a>
          </div>
        </article>
      <?php endwhile; endif; ?>
    </div>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "archive.php" $archivePhp

# Write search.php
$searchPhp = @'
<?php
/**
 * Search results layout
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">
        Search Results for: <span style="color:var(--accent);"><?php echo get_search_query(); ?></span>
      </h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <?php if ( have_posts() ) : ?>
      <div class="blog-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 80px;">
        <?php while ( have_posts() ) : the_post(); ?>
          <article class="blog-card reveal-element" id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); overflow: hidden; background-color: var(--bg-primary); display: flex; flex-direction: column;">
            <div class="blog-info" style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
              <span class="card-category" style="font-size: 0.75rem; text-transform: uppercase; color: var(--accent-dark); font-weight: 700; margin-bottom: 6px; display: block;"><?php echo get_post_type(); ?></span>
              <h3 class="blog-card-title" style="font-family: 'Outfit'; font-size: 1.25rem; font-weight: 700; line-height: 1.3; margin-bottom: 12px;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
              <p class="blog-card-summary" style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; flex-grow: 1;"><?php echo wp_trim_words( get_the_excerpt(), 20, '...' ); ?></p>
              <a href="<?php the_permalink(); ?>" style="font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px; color: var(--text-primary); border-bottom: 2px solid var(--accent); width: fit-content; padding-bottom: 2px;">View Page <i class="fa-solid fa-chevron-right"></i></a>
            </div>
          </article>
        <?php endwhile; ?>
      </div>
    <?php else : ?>
      <div class="empty-state-wrap" style="text-align: center; padding: 60px 0;">
        <i class="fa-solid fa-magnifying-glass-minus" style="font-size: 3.5rem; color: var(--text-muted); margin-bottom: 20px; opacity: 0.4;"></i>
        <h3 style="font-family: Outfit; font-size: 1.5rem; font-weight: 700; margin-bottom: 12px;">No matching results</h3>
        <p style="color: var(--text-muted); margin-bottom: 24px;">Please try alternative keywords or check spelling parameters.</p>
      </div>
    <?php endif; ?>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "search.php" $searchPhp

# Write searchform.php
$searchformPhp = @'
<?php
/**
 * Searchform fallback
 */
?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>" style="display: flex; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background-color: var(--bg-primary);">
  <input type="search" class="search-field" placeholder="Search gadgets..." value="<?php echo get_search_query(); ?>" name="s" style="flex-grow: 1; padding: 12px; border: none; outline: none; background: none; color: var(--text-primary);">
  <button type="submit" class="btn btn-secondary" style="border-radius: 0; padding: 0 20px;" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
</form>
'@
Write-ThemeFile "searchform.php" $searchformPhp

# Write comments.php
$commentsPhp = @'
<?php
/**
 * Comments loop fallback
 */
if ( post_password_required() ) {
    return;
}
?>

<div id="comments" class="comments-area" style="margin-top: 60px; border-top: 1px solid var(--border-color); padding-top: 40px;">
  <?php if ( have_comments() ) : ?>
    <h3 class="comments-title" style="font-family: Outfit; font-weight: 700; font-size: 1.5rem; margin-bottom: 30px;">
      Discussion Reviews (<?php echo get_comments_number(); ?>)
    </h3>

    <ul class="comment-list" style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 24px; margin-bottom: 40px;">
      <?php
      wp_list_comments( array(
          'style'       => 'ul',
          'short_ping'  => true,
          'avatar_size' => 50,
      ) );
      ?>
    </ul>
  <?php endif; ?>

  <?php
  comment_form( array(
      'class_form'         => 'comment-form auth-form',
      'title_reply'        => 'Add a review reply',
      'class_submit'       => 'auth-btn btn btn-primary',
      'submit_button'      => '<button name="%1$s" type="submit" id="%2$s" class="%3$s">%4$s</button>',
      'comment_field'      => '<div class="auth-input-group"><label>Your Message</label><textarea id="comment" name="comment" cols="45" rows="8" class="auth-input" required></textarea></div>',
      'fields'             => array(
          'author' => '<div class="auth-input-group"><label>Your Name</label><input id="author" name="author" type="text" class="auth-input" required></div>',
          'email'  => '<div class="auth-input-group"><label>Email Address</label><input id="email" name="email" type="email" class="auth-input" required></div>',
      ),
  ) );
  ?>
</div>
'@
Write-ThemeFile "comments.php" $commentsPhp

# Write sidebar.php
$sidebarPhp = @'
<?php
/**
 * Sidebar widget area
 */
if ( ! is_active_sidebar( 'sidebar-1' ) ) {
    return;
}
?>
<aside id="secondary" class="widget-area" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 24px;">
  <?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside>
'@
Write-ThemeFile "sidebar.php" $sidebarPhp

# Write home.php
$homePhp = @'
<?php
/**
 * Blog index connector
 */
include get_template_directory() . '/index.php';
'@
Write-ThemeFile "home.php" $homePhp

# Write woocommerce/archive-product.php
$archiveProductPhp = @'
<?php
/**
 * Catalog layout overrides
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;"><?php woocommerce_page_title(); ?></h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <?php if ( woocommerce_product_loop() ) : ?>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
        <?php do_action( 'woocommerce_before_shop_loop' ); ?>
      </div>
      
      <?php woocommerce_product_loop_start(); ?>
      <?php while ( have_posts() ) : the_post(); ?>
        <?php wc_get_template_part( 'content', 'product' ); ?>
      <?php endwhile; ?>
      <?php woocommerce_product_loop_end(); ?>

      <div style="margin-top: 40px; display: flex; justify-content: center;">
        <?php do_action( 'woocommerce_after_shop_loop' ); ?>
      </div>
    <?php else : ?>
      <?php do_action( 'woocommerce_no_products_found' ); ?>
    <?php endif; ?>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "woocommerce/archive-product.php" $archiveProductPhp

# Write woocommerce/single-product.php
$singleProductPhp = @'
<?php
/**
 * Single product layout overrides
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;"><?php the_title(); ?></h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <?php while ( have_posts() ) : the_post(); ?>
      <?php wc_get_template_part( 'content', 'single-product' ); ?>
    <?php endwhile; ?>
  </main>

<?php get_footer(); ?>
'@
Write-ThemeFile "woocommerce/single-product.php" $singleProductPhp


# ==============================================================================
# Compress compiled files using .NET ZipArchive
# ==============================================================================
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
    
    # Prefix the folder name 'elevora-premium-theme' so it extracts into its own folder
    $entryPath = "elevora-premium-theme/" + $relativeForwardSlash
    
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
