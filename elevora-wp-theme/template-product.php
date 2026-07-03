<?php
/**
 * Template Name: Elevora Product Details (Static Fallback)
 */
get_header(); ?>

  <!-- Breadcrumb banner -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>">Shop</a>
        <span>/</span>
        <span style="color: var(--text-primary);" id="breadcrumb-product-name">Gadget Details</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;" id="header-product-name">Product Details</h1>
    </div>
  </section>

  <!-- Product Details Wrap -->
  <main class="container">
    <div class="product-details-wrap" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 80px; align-items: start;">
      <!-- Gallery Column -->
      <div class="gallery-container">
        <div class="main-image-viewport" id="product-main-image-wrap">
          <!-- Main Product image loaded via JS -->
        </div>
        <div class="gallery-thumbnails" id="product-gallery-thumbnails">
          <!-- Thumbnails loaded via JS -->
        </div>
      </div>
      
      <!-- Info Column -->
      <div class="product-info-col" id="product-details-info-col">
        <!-- Loaded dynamically via js -->
      </div>
    </div>
  </main>

  <!-- Loader Script -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      // Find Product based on query parameter
      const params = new URLSearchParams(window.location.search);
      const id = parseInt(params.get("id")) || 1;
      const p = ElevoraProducts.find(item => item.id === id);
      if (!p) return;

      document.title = `${p.name} | Elevora Premium Shop`;
      document.getElementById("breadcrumb-product-name").textContent = p.name;
      document.getElementById("header-product-name").textContent = p.name;

      // Render main image
      const imageWrap = document.getElementById("product-main-image-wrap");
      imageWrap.innerHTML = `<img src="${p.images[0]}" alt="${p.name}" id="main-product-image">`;

      // Render thumbnails
      const thumbsWrap = document.getElementById("product-gallery-thumbnails");
      thumbsWrap.innerHTML = p.images.map((img, idx) => `
        <button class="thumbnail-btn ${idx === 0 ? "active" : ""}" onclick="document.getElementById('main-product-image').src='${img}'; document.querySelectorAll('.thumbnail-btn').forEach(btn => btn.classList.remove('active')); this.classList.add('active');">
          <img src="${img}" alt="thumbnail">
        </button>
      `).join("");

      // Render details column
      const discountPercentage = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
      const detailsCol = document.getElementById("product-details-info-col");
      detailsCol.innerHTML = `
        <span class="product-tag">${p.category}</span>
        <h2 class="product-title">${p.name}</h2>
        <div class="product-rating-row">
          <div class="stars" style="color: var(--accent-dark);">${generateStars(p.rating)}</div>
          <span style="font-weight: 700;">${p.rating}</span>
          <span style="color: var(--text-muted);">(${p.reviewsCount} Customer Reviews)</span>
        </div>
        <div class="pricing-row">
          <span class="price-large">$${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span class="old-price-large">$${p.oldPrice.toFixed(2)}</span>` : ""}
          ${p.oldPrice ? `<span class="discount-badge-large">${discountPercentage}% OFF</span>` : ""}
        </div>
        <div style="font-size: 0.95rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 30px;">
          ${p.description}
        </div>
        <div class="option-title">Select Color</div>
        <div class="color-pills-row">
          ${p.colors.map((c, idx) => `
            <button class="color-pill ${idx === 0 ? "active" : ""}" onclick="document.querySelectorAll('.color-pill').forEach(btn => btn.classList.remove('active')); this.classList.add('active');" data-color="${c}">
              ${c}
            </button>
          `).join("")}
        </div>
        <div style="display: flex; gap: 16px; margin-bottom: 30px;">
          <div style="display: flex; align-items: center; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; height: 50px;">
            <button class="qty-btn" onclick="let input = document.getElementById('product-qty'); if(parseInt(input.value) > 1) input.value = parseInt(input.value)-1;">-</button>
            <input type="number" id="product-qty" value="1" min="1" style="width: 50px; text-align: center; font-weight: 700; border: none; outline: none; background: none;">
            <button class="qty-btn" onclick="let input = document.getElementById('product-qty'); input.value = parseInt(input.value)+1;">+</button>
          </div>
          <button class="btn btn-primary" style="flex: 1;" onclick="const selectedColor = document.querySelector('.color-pill.active').getAttribute('data-color'); addToCart(${p.id}, parseInt(document.getElementById('product-qty').value), selectedColor);">
            Add To Cart
          </button>
        </div>
        <button class="btn btn-secondary" onclick="toggleWishlist(${p.id})">
          <i class="fa-regular fa-heart"></i> Add To Wishlist
        </button>
      `;
    });
  </script>

<?php get_footer(); ?>