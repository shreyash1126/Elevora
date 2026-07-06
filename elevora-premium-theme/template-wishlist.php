<?php
/**
 * Template Name: Elevora Wishlist Page
 */
get_header(); ?>

  <section style="padding: 60px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Saved Items</span>
      </div>
      <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">My Wishlist</h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <div class="product-grid" id="wishlist-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
      <!-- Populated via wishlist-new.js -->
    </div>
  </main>

<?php get_footer(); ?>