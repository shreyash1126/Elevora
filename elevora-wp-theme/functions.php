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
    $menu_items = array(
        'Home'    => home_url( '/' ),
        'Shop'    => class_exists('WooCommerce') ? get_permalink(wc_get_page_id('shop')) : home_url( '/shop/' ),
        'About'   => home_url( '/about/' ),
        'Blog'    => home_url( '/blog/' ),
        'Contact' => home_url( '/contact/' ),
        'FAQ'     => home_url( '/faq/' ),
    );
    foreach ( $menu_items as $name => $url ) {
        $active_class = ( $_SERVER['REQUEST_URI'] == parse_url($url, PHP_URL_PATH) || (is_front_page() && $name == 'Home') ) ? 'active' : '';
        echo '<a href="' . esc_url( $url ) . '" class="nav-link ' . $active_class . '">' . esc_html( $name ) . '</a>';
    }
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