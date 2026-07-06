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
          <button class="filter-category-btn active" data-category="all">All Categories <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Mobile Accessories">Mobile Accessories <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Power Banks">Power Banks <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Wireless Chargers">Wireless Chargers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Adapters">Adapters <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Charging Cables">Charging Cables <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Fast Charging Cables">Fast Charging Cables <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Computer Accessories">Computer Accessories <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Bluetooth Speakers">Bluetooth Speakers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Extension Boards & Multi-Plugs">Extension Boards & Multi-Plugs <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Projector">Projectors <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Spy WiFi Cameras">Spy WiFi Cameras <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Cute Quirky Lamps">Cute Quirky Lamps <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Floating Lamps">Floating Lamps <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="RGB Mood Lighting">RGB Mood Lighting <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Alarm Clocks & Timers">Alarm Clocks & Timers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Kitchen Tools and Gadgets">Kitchen Tools & Gadgets <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Home Utility Products">Home Utility Products <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Humidifiers">Humidifiers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="DIY Store">DIY Store <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Pet Gadgets">Pet Gadgets <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Self Care & Wellness Gadgets">Wellness Gadgets <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Car Dashboard Accessories">Dashboard Accessories <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Car Mobile Holders">Car Mobile Holders <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Car Mobile Charger">Car Mobile Chargers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Car Air Fresheners">Car Air Fresheners <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Car Utility and Tools">Car Utility & Tools <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Tyre Inflators">Tyre Inflators <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Vacuum Cleaner for Car">Vacuum Cleaners <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Bike Accessories">Bike Accessories <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Travel Gadgets and Accessories">Travel Gadgets <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Him">Gifts for Him <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Her">Gifts for Her <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Dad">Gifts for Dad <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Mom">Gifts for Mom <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Brother">Gifts for Brother <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Sister">Gifts for Sister <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Kids">Gifts for Kids <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Friends">Gifts for Friends <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Colleagues">Gifts for Colleagues <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Gamers & Streamers">For Gamers & Streamers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for the Adventurer">For the Adventurer <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Content Creators">For Content Creators <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Fitness Buffs">For Fitness Buffs <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Minimalists">For Minimalists <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Music Lovers">For Music Lovers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Students">For Students <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Gifts for Car Enthusiasts">For Car Enthusiasts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Birthday Gifts">Birthday Gifts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Anniversary Gifts">Anniversary Gifts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Wedding Gifts">Wedding Gifts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Housewarming Gifts">Housewarming Gifts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Farewell Gifts">Farewell Gifts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Promotion Gifts">Promotion Gifts <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Creative Stationery">Creative Stationery <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Cute Keychains">Cute Keychains <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Flash Sale">Flash Sale <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Clearance Sale">Clearance Sale <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="Best Sellers">Best Sellers <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
          <button class="filter-category-btn" data-category="New Additions">New Additions <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i></button>
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