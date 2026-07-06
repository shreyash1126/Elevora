<?php
/**
 * Template Name: Elevora Privacy Policy
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Privacy Guidelines</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Privacy Guidelines</h1>
    </div>
  </section>

  <main class="container" style="max-width: 800px; margin-bottom: 80px;">
    <article class="entry-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <?php if ( get_the_content() ) : ?>
          <?php the_content(); ?>
        <?php else : ?>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact support.</p>
          <h2>2. How We Use Information</h2>
          <p>We use the information we collect to fulfill your orders, communicate with you, and improve our smart gadget offerings.</p>
          <h2>3. Data Protection</h2>
          <p>We implement strict security measures to protect your personal details. Payments are processed securely via SSL-encrypted gateways.</p>
        <?php endif; ?>
      <?php endwhile; endif; ?>
    </article>
  </main>

<?php get_footer(); ?>