<?php
/**
 * Single Product & Post Template (Elevora Electronics WordPress Theme)
 *
 * @package Elevora
 * @version 2.0.0
 */

get_header(); ?>

  <main class="container section-padding">
    <div class="product-details-layout" style="display:grid; grid-template-columns: 1fr 1fr; gap:40px; margin-bottom:60px;">
      <!-- Product Gallery -->
      <div class="product-gallery">
        <div class="product-main-img" id="detail-main-img" style="border-radius:var(--border-radius-lg); overflow:hidden; border:1px solid var(--border-color); background:var(--bg-card); padding:20px; text-align:center;">
          <img src="<?php echo get_template_directory_uri(); ?>/assets/images/smartphone.jpg" alt="Elevora Apex Smartphone 5G" style="max-width:100%; height:auto;">
        </div>
      </div>

      <!-- Product Details Info -->
      <div class="product-info-col">
        <span class="product-detail-badge theme-badge theme-badge-blue" style="margin-bottom:12px;">5G Flagship</span>
        <h1 class="product-detail-title" id="detail-title" style="font-size:32px; font-weight:800; margin-bottom:8px;">Elevora Apex Smartphone 5G</h1>
        <p class="product-detail-tagline" id="detail-tagline" style="font-size:16px; color:var(--text-secondary); margin-bottom:16px;">Ultimate power, boundary-pushing display.</p>

        <div class="product-detail-rating-row" style="display:flex; align-items:center; gap:8px; margin-bottom:20px;">
          <div class="rating-stars" id="detail-stars" style="color:var(--color-accent);">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
          </div>
          <span class="rating-count" id="detail-reviews-count" style="color:var(--text-secondary); font-size:14px;">(1240 reviews)</span>
        </div>

        <div class="product-detail-price" id="detail-price" style="font-size:28px; font-weight:800; color:var(--color-secondary); margin-bottom:24px;">$899.00</div>

        <!-- Add to Bag Row -->
        <div class="product-actions-row" style="display:flex; gap:16px; align-items:center; margin-bottom:30px;">
          <div class="quantity-adjuster" style="display:flex; align-items:center; border:1px solid var(--border-color); border-radius:var(--border-radius-full); padding:6px 16px; gap:16px;">
            <button id="detail-qty-minus" style="background:none; border:none; font-size:18px; cursor:pointer;">-</button>
            <span id="detail-qty-val" style="font-weight:700;">1</span>
            <button id="detail-qty-plus" style="background:none; border:none; font-size:18px; cursor:pointer;">+</button>
          </div>
          <button class="btn btn-primary product-add-btn" id="detail-add-btn" onclick="addToCart('unseen', 1, true)" style="flex:1;">Add to Bag</button>
        </div>

        <!-- Specifications Tab -->
        <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--border-radius); padding:20px;">
          <h4 style="font-size:16px; font-weight:800; margin-bottom:10px;">Product Specifications</h4>
          <div id="tab-description"><p>Elevora Apex Smartphone 5G features a gorgeous 120Hz LTPO display, professional-grade triple camera system, and the lightning-fast Apex Core Gen 2 processor.</p></div>
        </div>
      </div>
    </div>
  </main>

<?php get_footer(); ?>
