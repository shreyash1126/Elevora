<?php
/**
 * Elevora Theme Functions & Enqueues
 *
 * @package Elevora
 * @version 2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

function elevora_theme_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
    add_theme_support( 'woocommerce' );
}
add_action( 'after_setup_theme', 'elevora_theme_setup' );

function elevora_enqueue_scripts() {
    wp_enqueue_style( 'elevora-style', get_stylesheet_uri(), array(), '2.0.0' );
    if ( file_exists( get_template_directory() . '/styles.css' ) ) {
        wp_enqueue_style( 'elevora-styles-custom', get_template_directory_uri() . '/styles.css', array(), '2.0.0' );
    }
    if ( file_exists( get_template_directory() . '/theme.css' ) ) {
        wp_enqueue_style( 'elevora-theme-custom', get_template_directory_uri() . '/theme.css', array(), '2.0.0' );
    }
    if ( file_exists( get_template_directory() . '/products.js' ) ) {
        wp_enqueue_script( 'elevora-products', get_template_directory_uri() . '/products.js', array(), '2.0.0', true );
    }
    if ( file_exists( get_template_directory() . '/app.js' ) ) {
        wp_enqueue_script( 'elevora-app', get_template_directory_uri() . '/app.js', array( 'elevora-products' ), '2.0.0', true );
    }
}
add_action( 'wp_enqueue_scripts', 'elevora_enqueue_scripts' );
