<?php
/**
 * Template Name: Elevora Product Details Page
 */
get_header(); ?>

  <main class="container" style="padding-top: 40px; margin-bottom: 80px;">
    <div id="product-details-root">
      <!-- Loaded dynamically via script below -->
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const params = new URLSearchParams(window.location.search);
      const prodId = parseInt(params.get("id")) || 1;
      
      const p = ElevoraProducts.find(item => item.id === prodId);
      const root = document.getElementById("product-details-root");

      if (!p) {
        root.innerHTML = `<div class="empty-state-wrap"><h3>Product id matches no active listing</h3></div>`;
        return;
      }

      const discountPercentage = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
      
      let thumbsHtml = p.images.map((img, idx) => `
        <button class="thumbnail-btn ${idx === 0 ? "active" : ""}" onclick="switchDetailPhoto('${img}', this)">
          <img src="${img}" alt="thumbnail">
        </button>
      `).join("");

      let colorsHtml = p.colors.map((c, idx) => `
        <span class="color-pill ${idx === 0 ? "active" : ""}" onclick="selectVariationColor('${c}', this)">${c}</span>
      `).join("");

      let specsHtml = Object.entries(p.specs).map(([key, val]) => `
        <div style="display: grid; grid-template-columns: 200px 1fr; padding: 14px 20px; border-bottom: 1px solid var(--border-color);">
          <span style="font-weight: 700; color: var(--text-primary);">${key}</span>
          <span style="color: var(--text-secondary);">${val}</span>
        </div>
      `).join("");

      root.innerHTML = `
        <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 30px;">
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
          <span>/</span>
          <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>">Shop</a>
          <span>/</span>
          <span style="color: var(--text-primary);">${p.name}</span>
        </div>

        <div class="product-details-wrap">
          <!-- Gallery Col -->
          <div>
            <div class="main-image-viewport">
              <img src="${p.images[0]}" alt="${p.name}" id="main-product-viewport-img">
            </div>
            <div class="gallery-thumbnails">
              ${thumbsHtml}
            </div>
          </div>

          <!-- Info Col -->
          <div class="product-info-col">
            <span class="product-tag">${p.category}</span>
            <h1 class="product-title">${p.name}</h1>
            
            <div class="product-rating-row">
              <div class="stars" style="color: #fbbf24;">${generateStarsHTML(p.rating)}</div>
              <span class="rating-value" style="font-weight:700;">${p.rating} / 5.0</span>
              <span style="color: var(--text-muted);">(${p.reviewsCount} reviews)</span>
            </div>

            <div class="pricing-row">
              <span class="price-large">$${p.price.toFixed(2)}</span>
              ${p.oldPrice ? `<span class="old-price-large">$${p.oldPrice.toFixed(2)}</span>` : ""}
              ${p.oldPrice ? `<span class="discount-badge-large">${discountPercentage}% OFF</span>` : ""}
            </div>

            <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 30px; font-size: 1rem;">${p.description}</p>

            <!-- Color Options -->
            <div>
              <h4 class="option-title">Select Edition Color</h4>
              <div class="color-pills-row" id="product-details-variation-picker">
                ${colorsHtml}
              </div>
            </div>

            <!-- Qty & Cart buttons -->
            <div style="display: flex; gap: 20px; align-items: center; margin-top: 10px; margin-bottom: 40px;">
              <div style="display: flex; align-items: center; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); background: var(--bg-secondary); overflow: hidden;">
                <button class="qty-btn" onclick="adjustDetailsQty(-1)" style="width:44px; height:48px;">-</button>
                <input type="text" id="details-qty-val" value="1" readonly style="width: 44px; text-align: center; font-weight: 700; font-family: Outfit;">
                <button class="qty-btn" onclick="adjustDetailsQty(1)" style="width:44px; height:48px;">+</button>
              </div>
              <button class="btn btn-primary" style="flex-grow: 1; height: 50px; font-size: 1.05rem;" id="details-buy-btn" onclick="triggerDetailsCartAdd(${p.id})">Add to Shopping Cart</button>
              <button class="action-btn wishlist-toggle-btn" style="width: 50px; height: 50px;" data-id="${p.id}" onclick="toggleWishlist(${p.id})"><i class="fa-regular fa-heart"></i></button>
            </div>

            <!-- Free shipping check -->
            <div style="display: flex; gap: 12px; align-items: center; padding: 20px; border-radius: var(--border-radius-md); border: 1.5px solid var(--border-color); background: var(--bg-secondary);">
              <i class="fa-solid fa-truck" style="color: var(--accent); font-size: 1.2rem;"></i>
              <span style="font-size: 0.9rem; color: var(--text-secondary); font-weight: 600;">Eligible for FREE international route delivery.</span>
            </div>
          </div>
        </div>

        <!-- Specifications Section -->
        <section style="margin-top: 80px;">
          <h3 style="font-family: Outfit; font-size: 1.5rem; font-weight: 800; border-bottom: 2px solid var(--border-color); padding-bottom: 12px; margin-bottom: 24px;">Specifications Matrix</h3>
          <div style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); overflow: hidden; background-color: var(--bg-secondary);">
            ${specsHtml}
          </div>
        </section>
      `;
      
      if (typeof syncWishlistStates === "function") syncWishlistStates();
    });

    let selectedVariation = "";
    function selectVariationColor(colorName, btn) {
      selectedVariation = colorName;
      document.querySelectorAll("#product-details-variation-picker .color-pill").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
    }

    function switchDetailPhoto(imgUrl, btn) {
      document.getElementById("main-product-viewport-img").src = imgUrl;
      document.querySelectorAll(".gallery-thumbnails .thumbnail-btn").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
    }

    function adjustDetailsQty(amount) {
      const input = document.getElementById("details-qty-val");
      let val = parseInt(input.value) + amount;
      if (val < 1) val = 1;
      input.value = val;
    }

    function triggerDetailsCartAdd(id) {
      const qty = parseInt(document.getElementById("details-qty-val").value);
      if (!selectedVariation) {
        const activePill = document.querySelector("#product-details-variation-picker .color-pill.active");
        selectedVariation = activePill ? activePill.textContent : "";
      }
      addToCart(id, qty, selectedVariation);
    }

    function generateStarsHTML(rating) {
      let starsHtml = "";
      const full = Math.floor(rating);
      const half = rating % 1 >= 0.5 ? 1 : 0;
      const empty = 5 - full - half;

      for (let i = 0; i < full; i++) starsHtml += '<i class="fa-solid fa-star"></i>';
      if (half) starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
      for (let i = 0; i < empty; i++) starsHtml += '<i class="fa-regular fa-star"></i>';
      return starsHtml;
    }
  </script>