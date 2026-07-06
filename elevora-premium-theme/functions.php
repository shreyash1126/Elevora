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