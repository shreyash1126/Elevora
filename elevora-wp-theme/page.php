<?php
/**
 * Generic Page Template (Elevora Electronics Theme)
 *
 * @package Elevora
 * @version 2.0.0
 */

get_header(); ?>

  <main class="container section-padding">
    <?php
    if ( have_posts() ) :
      while ( have_posts() ) : the_post();
        the_content();
      endwhile;
    else :
      include( get_template_directory() . '/index.php' );
    endif;
    ?>
  </main>

<?php get_footer(); ?>
