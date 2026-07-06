<?php
/**
 * The front page (Homepage) template file
 */
get_header(); ?>

  <!-- Editorial cinematic slider hero -->
  <section class="hero-slider-container">
    <div class="hero-slider">
      <!-- Slide 1 -->
      <div class="hero-slide active" style="background-image: url('https://images.unsplash.com/photo-1608248597481-496100c80836?w=1600');">
        <div class="container" style="height: 100%; display: flex; align-items: center;">
          <div class="hero-content reveal-element revealed">
            <span class="hero-tag">Acoustic Audio Pro</span>
            <h1>Sound Beyond Boundaries</h1>
            <p>Experience studio-grade active noise cancellation with premium leather acoustics and 48-hour continuous battery playback loops.</p>
            <div style="display: flex; gap: 16px;">
              <a href="<?php echo esc_url( getThemeUrl('product') . '?id=1' ); ?>" class="btn btn-primary">Discover Pro</a>
              <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="btn btn-secondary">Explore Catalog</a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Slide 2 -->
      <div class="hero-slide" style="background-image: url('https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1600');">
        <div class="container" style="height: 100%; display: flex; align-items: center;">
          <div class="hero-content">
            <span class="hero-tag">MagSafe Hub Series</span>
            <h1>Power Restructured</h1>
            <p>Elevate your workspace charging alignment with aircraft-grade aluminum alloy surfaces and triple charging capabilities.</p>
            <div style="display: flex; gap: 16px;">
              <a href="<?php echo esc_url( getThemeUrl('product') . '?id=2' ); ?>" class="btn btn-primary">Shop MagSafe</a>
              <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="btn btn-secondary">Browse Store</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls indicators -->
    <div class="slider-dots">
      <span class="slider-dot active" data-index="0"></span>
      <span class="slider-dot" data-index="1"></span>
    </div>
    <div class="slider-arrows">
      <button class="slider-arrow" id="slider-prev" aria-label="Previous slide"><i class="fa-solid fa-chevron-left"></i></button>
      <button class="slider-arrow" id="slider-next" aria-label="Next slide"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
  </section>

  <!-- Categories showcase grid -->
  <section class="section-spacing container">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px;" class="reveal-element">
      <div>
        <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Curated Selections</span>
        <h2 style="font-size: 2.25rem; font-weight: 800; margin-top: 8px;">Explore Categories</h2>
      </div>
      <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" style="font-weight: 700; color: var(--accent); border-bottom: 2px solid var(--accent); padding-bottom: 4px;">View Catalog</a>
    </div>

    <div class="category-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
      <a href="<?php echo esc_url( home_url( '/shop/?category=audio' ) ); ?>" class="category-card reveal-element">
        <div class="category-card-icon"><i class="fa-solid fa-headphones"></i></div>
        <h3 class="category-card-title">Premium Audio</h3>
      </a>
      <a href="<?php echo esc_url( home_url( '/shop/?category=charging-station' ) ); ?>" class="category-card reveal-element">
        <div class="category-card-icon"><i class="fa-solid fa-plug"></i></div>
        <h3 class="category-card-title">MagSafe Hubs</h3>
      </a>
      <a href="<?php echo esc_url( home_url( '/shop/?category=charger' ) ); ?>" class="category-card reveal-element">
        <div class="category-card-icon"><i class="fa-solid fa-bolt"></i></div>
        <h3 class="category-card-title">Adapters & Power</h3>
      </a>
      <a href="<?php echo esc_url( home_url( '/shop/?category=wearables' ) ); ?>" class="category-card reveal-element">
        <div class="category-card-icon"><i class="fa-solid fa-clock"></i></div>
        <h3 class="category-card-title">Wearables</h3>
      </a>
    </div>
  </section>

  <!-- Bento design details showcase -->
  <section style="background-color: var(--bg-secondary); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 80px 0;">
    <div class="container">
      <div style="text-align: center; margin-bottom: 60px;" class="reveal-element">
        <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Designed for Precision</span>
        <h2 style="font-size: 2.25rem; font-weight: 800; margin-top: 8px;">The Elevora Standard</h2>
      </div>

      <div class="bento-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; grid-template-rows: auto auto;">
        <div class="reveal-element" style="grid-column: span 2; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); background-color: var(--bg-primary); padding: 40px; display: flex; flex-direction: column; justify-content: space-between; min-height: 280px;">
          <div>
            <h4 style="font-family: Outfit; font-size: 1.5rem; margin-bottom: 12px;">Premium Aerospace Metallurgy</h4>
            <p style="color: var(--text-secondary); max-width: 460px;">We use only milled aircraft-grade alloy frames, shielding critical copper cores from interference loops and heat buildup.</p>
          </div>
          <span style="font-family: Outfit; font-weight: 800; color: var(--accent); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;">01 / SHELL CONSTRUCTION</span>
        </div>
        
        <div class="reveal-element" style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); background-color: var(--bg-primary); padding: 40px; display: flex; flex-direction: column; justify-content: space-between;">
          <div class="category-card-icon" style="font-size: 3rem; margin-bottom: 20px;"><i class="fa-solid fa-microchip"></i></div>
          <div>
            <h4 style="font-family: Outfit; font-size: 1.25rem; margin-bottom: 10px;">Smart IC Chips</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Auto-regulates ampere frequencies to protect gadget health cycles.</p>
          </div>
        </div>

        <div class="reveal-element" style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); background-color: var(--bg-primary); padding: 40px; display: flex; flex-direction: column; justify-content: space-between;">
          <div class="category-card-icon" style="font-size: 3rem; margin-bottom: 20px; color:#a855f7;"><i class="fa-solid fa-shield-halved"></i></div>
          <div>
            <h4 style="font-family: Outfit; font-size: 1.25rem; margin-bottom: 10px;">Double Shielding</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Protects components from electrical surges and drops.</p>
          </div>
        </div>

        <div class="reveal-element" style="grid-column: span 2; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); background-color: var(--bg-primary); padding: 40px; display: flex; flex-direction: column; justify-content: space-between; min-height: 280px;">
          <div>
            <h4 style="font-family: Outfit; font-size: 1.5rem; margin-bottom: 12px;">Unified MagSafe Magnetic Lock</h4>
            <p style="color: var(--text-secondary); max-width: 480px;">Constructed with custom Neodymium alignments that support rapid 15W wireless power deliveries with zero alignment errors.</p>
          </div>
          <span style="font-family: Outfit; font-weight: 800; color: var(--accent); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;">02 / MAGNETIC INTERACTION</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Deal countdown container -->
  <section class="section-spacing container reveal-element">
    <div style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); background: linear-gradient(135deg, var(--bg-secondary) 0%, rgba(var(--accent-rgb), 0.05) 100%); padding: 60px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 40px;">
      <div style="max-width: 500px;">
        <span style="color: var(--danger); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-circle" style="font-size: 6px; animation: pulse-light 1s infinite;"></i> LIMITED FLASH SALE
        </span>
        <h2 style="font-size: 2.5rem; font-weight: 800; margin-top: 12px; margin-bottom: 16px;">Elevora Acoustic Pro Pro Edition</h2>
        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px;">Unlock premium ANC capabilities and leather ear cups for 20% off. Order within the timer and secure free international express shipping.</p>
        <div style="display: flex; gap: 16px;" id="deal-timer-clocks">
          <div style="text-align: center; background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; min-width: 70px;">
            <span style="font-family: Outfit; font-size: 1.8rem; font-weight: 800; color: var(--accent);" id="deal-hr">02</span>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Hours</div>
          </div>
          <div style="text-align: center; background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; min-width: 70px;">
            <span style="font-family: Outfit; font-size: 1.8rem; font-weight: 800; color: var(--accent);" id="deal-min">42</span>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Mins</div>
          </div>
          <div style="text-align: center; background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; min-width: 70px;">
            <span style="font-family: Outfit; font-size: 1.8rem; font-weight: 800; color: var(--danger);" id="deal-sec">59</span>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Secs</div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; border-left: 2px solid var(--border-color); padding-left: 60px;" class="deal-side-pricing">
        <span style="font-size: 0.9rem; color: var(--text-muted); text-decoration: line-through;">Original Price: $299.99</span>
        <span style="font-family: Outfit; font-size: 3rem; font-weight: 800; color: var(--text-primary); margin: 8px 0;">$239.99</span>
        <button class="btn btn-primary" onclick="addToCart(1, 1, 'Obsidian Black')">Order Deal Now</button>
      </div>
    </div>
  </section>

  <!-- Featured Grid Listing -->
  <section class="section-spacing container">
    <div style="text-align: center; margin-bottom: 50px;" class="reveal-element">
      <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Premium Catalog Highlights</span>
      <h2 style="font-size: 2.25rem; font-weight: 800; margin-top: 8px;">Featured Gadgets</h2>
    </div>

    <div class="product-grid" id="homepage-products-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
      <!-- Dynamic Products populated on load -->
    </div>
  </section>

  <script>
    // Deal timer logic
    document.addEventListener("DOMContentLoaded", () => {
      let hr = 2, min = 42, sec = 59;
      const hEl = document.getElementById("deal-hr");
      const mEl = document.getElementById("deal-min");
      const sEl = document.getElementById("deal-sec");

      setInterval(() => {
        sec--;
        if (sec < 0) {
          sec = 59;
          min--;
          if (min < 0) {
            min = 59;
            hr--;
            if (hr < 0) {
              hr = 2; // Reset loop
            }
          }
        }
        if (hEl) hEl.textContent = hr.toString().padStart(2, '0');
        if (mEl) mEl.textContent = min.toString().padStart(2, '0');
        if (sEl) sEl.textContent = sec.toString().padStart(2, '0');
      }, 1000);
      
      // Load products from data array
      const homeProductsGrid = document.getElementById("homepage-products-grid");
      if (homeProductsGrid && typeof ElevoraProducts !== "undefined") {
        const featured = ElevoraProducts.slice(0, 3); // Load first 3
        let html = "";
        featured.forEach(p => {
          const discountPercentage = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
          html += `
            <div class="product-card reveal-element revealed" data-id="${p.id}">
              <div class="card-media">
                ${p.badge ? `<span class="badge badge-${p.badgeType}">${p.badge}</span>` : ""}
                <a href="${getThemeUrl("product")}?id=${p.id}">
                  <img src="${p.images[0]}" alt="${p.name}">
                  ${p.images[1] ? `<img src="${p.images[1]}" class="card-img-hover" alt="${p.name}">` : ""}
                </a>
                <div class="card-actions">
                  <button class="card-action-btn wishlist-toggle-btn" data-id="${p.id}" onclick="toggleWishlist(${p.id})">
                    <i class="fa-regular fa-heart"></i>
                  </button>
                  <button class="card-action-btn compare-toggle-btn" data-id="${p.id}" onclick="toggleCompare(${p.id})">
                    <i class="fa-solid fa-code-compare"></i>
                  </button>
                </div>
              </div>
              <div class="card-info">
                <span class="card-category">${p.category}</span>
                <a href="${getThemeUrl("product")}?id=${p.id}" class="card-title">${p.name}</a>
                <div class="card-rating">
                  <div class="stars">
                    ${generateStars(p.rating)}
                  </div>
                  <span class="rating-value">${p.rating}</span>
                  <span class="reviews-count">(${p.reviewsCount})</span>
                </div>
                <div class="card-price-row">
                  <div class="price-wrap">
                    <span class="price">$${p.price.toFixed(2)}</span>
                    ${p.oldPrice ? `<span class="old-price">$${p.oldPrice.toFixed(2)}</span>` : ""}
                    ${p.oldPrice ? `<span class="discount">${discountPercentage}% OFF</span>` : ""}
                  </div>
                  <button class="btn btn-primary card-add-btn" onclick="addToCart(${p.id}, 1, '${p.colors[0]}')">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          `;
        });
        homeProductsGrid.innerHTML = html;
        if (typeof syncCompareStates === "function") syncCompareStates();
        if (typeof syncWishlistStates === "function") syncWishlistStates();
      }
    });

    function generateStars(rating) {
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

<?php get_footer(); ?>