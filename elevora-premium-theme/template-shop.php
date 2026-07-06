<?php
/**
 * Template Name: Elevora Shop Page
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Shop Catalog</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Device Hub Catalog</h1>
    </div>
  </section>

  <main class="container" style="display: grid; grid-template-columns: 280px 1fr; gap: 40px; margin-bottom: 80px;">
    
    <!-- Sidebar Filters -->
    <aside style="display: flex; flex-direction: column; gap: 36px;">
      
      <!-- Search inside shop -->
      <div style="position: relative;">
        <h4 style="font-family: Outfit; font-weight:700; font-size: 1rem; margin-bottom: 16px;">Search Shop</h4>
        <input type="text" id="shop-search-input" placeholder="Type name, category..." style="width: 100%; padding: 12px; border-radius: var(--border-radius-md); border: 1.5px solid var(--border-color); background: var(--bg-secondary); font-size: 0.9rem; color: var(--text-primary);">
      </div>

      <!-- Categories -->
      <div>
        <h4 style="font-family: Outfit; font-weight: 700; font-size: 1rem; margin-bottom: 16px;">Categories</h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <a href="#" class="sidebar-filter-link active" data-category="all" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; justify-content: space-between;"><span>All Categories</span></a>
          <a href="#" class="sidebar-filter-link" data-category="audio" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; justify-content: space-between;"><span>Audio Devices</span></a>
          <a href="#" class="sidebar-filter-link" data-category="charging-station" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; justify-content: space-between;"><span>Charging Hubs</span></a>
          <a href="#" class="sidebar-filter-link" data-category="charger" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; justify-content: space-between;"><span>Wall Chargers</span></a>
          <a href="#" class="sidebar-filter-link" data-category="wearables" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; justify-content: space-between;"><span>Wearables</span></a>
        </div>
      </div>

      <!-- Brands -->
      <div>
        <h4 style="font-family: Outfit; font-weight: 700; font-size: 1rem; margin-bottom: 16px;">Brands</h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <a href="#" class="sidebar-filter-link active" data-brand="all" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary);">All Brands</a>
          <a href="#" class="sidebar-filter-link" data-brand="elevora" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary);">Elevora Core</a>
          <a href="#" class="sidebar-filter-link" data-brand="soundwave" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary);">Soundwave</a>
          <a href="#" class="sidebar-filter-link" data-brand="voltcore" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary);">VoltCore</a>
        </div>
      </div>

      <!-- Price limits -->
      <div class="price-range-slider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h4 style="font-family: Outfit; font-weight: 700; font-size: 1rem;">Max Price Limit</h4>
          <span style="font-family: Outfit; font-weight: 800; font-size: 1rem; color: var(--accent);" id="price-limit-display">$3,000</span>
        </div>
        <input type="range" class="price-slider-input" id="price-limit-slider" min="10" max="3000" step="10" value="3000">
      </div>
    </aside>

    <!-- Catalog view -->
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; border-bottom: 1.5px solid var(--border-color); margin-bottom: 30px;">
        <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 600;" id="shop-results-count">Loading products...</span>
        <div style="display: flex; gap: 12px; align-items: center;">
          <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Sort By:</label>
          <select id="shop-sort-select" style="background-color: var(--bg-secondary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-sm); padding: 8px 12px; font-size: 0.85rem; color: var(--text-primary); cursor: pointer;">
            <option value="default">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Customer Rated</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      <!-- Grid container -->
      <div class="product-grid" id="shop-products-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
        <!-- Loaded dynamically via filters-new.js -->
      </div>
    </div>
  </main>

  <style>
    .sidebar-filter-link {
      transition: all var(--transition-fast);
    }
    .sidebar-filter-link.active, .sidebar-filter-link:hover {
      color: var(--accent) !important;
      padding-left: 8px;
    }
  </style>
<?php get_footer(); ?>