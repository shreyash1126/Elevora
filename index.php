<?php
/**
 * Main Template File for Elevora WordPress Theme
 *
 * @package Elevora
 * @version 2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

if ( file_exists( __DIR__ . '/index.html' ) ) {
    require_once __DIR__ . '/index.html';
} else {
    ?>
    <!DOCTYPE html>
    <html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
        <?php wp_body_open(); ?>
        <main id="primary" class="site-main">
            <?php
            if ( have_posts() ) :
                while ( have_posts() ) : the_post();
                    the_content();
                endwhile;
            endif;
            ?>
        </main>
        <?php wp_footer(); ?>
    </body>
    </html>
    <?php
}
