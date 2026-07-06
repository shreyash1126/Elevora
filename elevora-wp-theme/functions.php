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
    wp_enqueue_script( 'elevora-compare', get_template_directory_uri() . '/assets/js/compare.js', array('elevora-products-data'), '1.0.0', true );

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