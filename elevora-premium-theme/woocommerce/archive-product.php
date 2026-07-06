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