<?php
/**
 * Template Name: Elevora Shop (Static Fallback)
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Shop Catalog</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Elevora Shop</h1>
    </div>
  </section>

  <!-- Layout grid: Sidebar vs Products list -->
  <div class="container shop-layout" style="display: grid; grid-template-columns: 280px 1fr; gap: 40px; margin-bottom: 80px; align-items: start;">
    <!-- Sidebar Filters -->
    <aside class="shop-sidebar">
      <div class="filter-section">
        <h4 class="filter-section-title">Categories</h4>
        <div class="filter-category-list" id="category-filter-list">
          <button class="filter-category-btn active" data-category="all">All Products <span class="count">4</span></button>
          <button class="filter-category-btn" data-category="Headphones">Headphones <span class="count">1</span></button>
          <button class="filter-category-btn" data-category="Smart Watches">Smart Watches <span class="count">1</span></button>
          <button class="filter-category-btn" data-category="Power Banks">Power Banks <span class="count">2</span></button>
        </div>
      </div>

      <div class="filter-section">
        <h4 class="filter-section-title">Brands</h4>
        <div class="checkbox-list" id="brand-filter-list">
          <!-- Populated dynamically via filters.js -->
        </div>
      </div>

      <div class="filter-section">
        <h4 class="filter-section-title">Price Limit</h4>
        <div class="price-range-slider">
          <input type="range" class="price-slider-input" id="price-limit-slider" min="0" max="300" step="10" value="300">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; font-family: Outfit;">
            <span>$0</span>
            <span id="price-slider-label">$300</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Product Catalog List -->
    <main class="shop-content-panel">
      <!-- Shop Control Bar -->
      <div class="shop-control-bar">
        <div style="font-size: 0.9rem; color: var(--text-muted);" id="catalog-count-label">Showing all products</div>
        <div class="sort-wrap">
          <span>Sort By:</span>
          <select class="sort-select" id="catalog-sort-select">
            <option value="featured">Featured Curations</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Average Rating</option>
          </select>
        </div>
      </div>

      <div class="products-grid" id="shop-products-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
        <!-- Populated Dynamically via filters.js -->
      </div>
    </main>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof initShopFilters === "function") {
        initShopFilters();
      }
    });
  </script>

<?php get_footer(); ?>