<?php
/**
 * Template Name: Elevora Shipping Policy
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Shipping Policy</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Shipping Policy</h1>
    </div>
  </section>

  <main class="container" style="max-width: 800px; margin-bottom: 80px;">
    <article class="entry-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <?php if ( get_the_content() ) : ?>
          <?php the_content(); ?>
        <?php else : ?>
          <h2>1. Delivery Timeframes</h2>
          <p>Orders are processed in 1-2 business days. Shipping usually takes 5-10 business days for standard international courier routes.</p>
          <h2>2. Trackable Courier Routes</h2>
          <p>We provide trackable shipment numbers for every order. You can monitor courier delivery loops directly inside our tracking portal.</p>
        <?php endif; ?>
      <?php endwhile; endif; ?>
    </article>
  </main>

<?php get_footer(); ?>