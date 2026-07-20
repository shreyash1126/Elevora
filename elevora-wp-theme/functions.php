<?php
/**
 * Elevora Electronics WordPress Theme Functions
 *
 * @package Elevora
 * @version 2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

function elevora_theme_setup() {
	// Add theme support features
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );

	add_theme_support( 'woocommerce' );
add_theme_support( 'wc-product-gallery-zoom' );
add_theme_support( 'wc-product-gallery-lightbox' );
add_theme_support( 'wc-product-gallery-slider' );

	// Register Navigation Menus
	register_nav_menus( array(
		'primary' => __( 'Primary Header Menu', 'elevora' ),
		'footer'  => __( 'Footer Navigation Menu', 'elevora' ),
	) );
}
add_action( 'after_setup_theme', 'elevora_theme_setup' );

function elevora_enqueue_scripts() {
	// FontAwesome
	wp_enqueue_style( 'fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0' );

	// Google Fonts (Outfit & Playfair Display)
	wp_enqueue_style( 'elevora-fonts', 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap', array(), null );

	// Main Stylesheet
	wp_enqueue_style( 'elevora-main-style', get_template_directory_uri() . '/styles.css', array(), '2.0.0' );
	wp_enqueue_style( 'elevora-theme-style', get_stylesheet_uri(), array( 'elevora-main-style' ), '2.0.0' );

	// Theme Scripts
	wp_enqueue_script( 'elevora-products', get_template_directory_uri() . '/products.js', array(), '2.0.0', true );
	wp_enqueue_script( 'elevora-app', get_template_directory_uri() . '/app.js', array( 'elevora-products' ), '2.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'elevora_enqueue_scripts' );

function elevora_woocommerce_setup() {

    remove_action(
        'woocommerce_before_main_content',
        'woocommerce_output_content_wrapper',
        10
    );

    remove_action(
        'woocommerce_after_main_content',
        'woocommerce_output_content_wrapper_end',
        10
    );

    add_action(
        'woocommerce_before_main_content',
        function () {
            echo '<main class="container">';
        },
        10
    );

    add_action(
        'woocommerce_after_main_content',
        function () {
            echo '</main>';
        },
        10
    );

}
add_action('after_setup_theme','elevora_woocommerce_setup');


