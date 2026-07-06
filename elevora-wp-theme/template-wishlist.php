<?php
/**
 * Template Name: Elevora Wishlist
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Wishlist</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Saved Wishlist</h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <div class="products-grid" id="wishlist-items-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">
      <!-- Populated Dynamically via wishlist.js -->
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof renderWishlistPage === "function") {
        renderWishlistPage();
      }
    });
  </script>
<?php get_footer(); ?>