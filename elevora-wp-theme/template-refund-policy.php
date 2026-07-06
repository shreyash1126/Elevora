<?php
/**
 * Template Name: Elevora Refund Policy
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Refund Policy</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Refund Policy</h1>
    </div>
  </section>

  <main class="container" style="max-width: 800px; margin-bottom: 80px;">
    <article class="entry-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <?php if ( get_the_content() ) : ?>
          <?php the_content(); ?>
        <?php else : ?>
          <h2>1. Return & Refund Conditions</h2>
          <p>If you're not satisfied, we offer refunds on products returned in original packaging within 30 days of shipment receipt.</p>
          <h2>2. Processing Audits</h2>
          <p>Once we receive your returned item, we process audits within 3-5 business days and credit back your original payment processor.</p>
        <?php endif; ?>
      <?php endwhile; endif; ?>
    </article>
  </main>

<?php get_footer(); ?>