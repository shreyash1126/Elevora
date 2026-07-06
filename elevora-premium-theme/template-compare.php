<?php
/**
 * Template Name: Elevora Product Compare (Static Fallback)
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Compare Gadgets</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Compare Smart Gadgets</h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <div id="compare-page-container">
      <!-- Loaded dynamically via compare.js -->
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof renderComparePage === "function") {
        renderComparePage();
      }
    });
  </script>

<?php get_footer(); ?>