// Elevora - Shop Catalog Filters & Sorting Engine (New Design)

let activeCategory = "all";
let activeBrand = "all";
let maxPriceLimit = 3000;
let activeSortOrder = "default";
let searchFilterQuery = "";

function applyCatalogFilters() {
  const productsGrid = document.getElementById("shop-products-grid");
  if (!productsGrid) return;

  // Filter products data array
  const filteredProducts = ElevoraProducts.filter(p => {
    // Category filter
    const matchesCategory = activeCategory === "all" || p.category.toLowerCase() === activeCategory.toLowerCase();
    
    // Brand filter
    const matchesBrand = activeBrand === "all" || p.brand.toLowerCase() === activeBrand.toLowerCase();
    
    // Price filter
    const matchesPrice = p.price <= maxPriceLimit;
    
    // Search query filter
    const matchesSearch = p.name.toLowerCase().includes(searchFilterQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchFilterQuery.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchFilterQuery.toLowerCase());

    return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
  });

  // Sort products
  if (activeSortOrder === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (activeSortOrder === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (activeSortOrder === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (activeSortOrder === "newest") {
    filteredProducts.sort((a, b) => (b.badge === "new" ? 1 : 0) - (a.badge === "new" ? 1 : 0));
  }

  // Render products
  renderShopProducts(filteredProducts);
}

function renderShopProducts(products) {
  const productsGrid = document.getElementById("shop-products-grid");
  if (!productsGrid) return;

  const countDisplay = document.getElementById("shop-results-count");
  if (countDisplay) {
    countDisplay.textContent = `Showing ${products.length} product${products.length !== 1 ? "s" : ""}`;
  }

  if (products.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-state-wrap" style="grid-column: 1/-1; text-align: center; padding: 80px 0; background: var(--bg-secondary); border-radius: var(--border-radius-lg); border: 1.5px dashed var(--border-color);">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: var(--accent); margin-bottom: 24px; opacity: 0.5;"></i>
        <h3 style="font-family: Outfit; font-size: 1.5rem; margin-bottom: 12px;">No products match your filters</h3>
        <p style="color: var(--text-muted); margin-bottom: 24px; max-width: 400px; margin-left: auto; margin-right: auto;">Try clearing categories or adjusting your price slider limit.</p>
        <button class="btn btn-primary" onclick="resetAllCatalogFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  let html = "";
  products.forEach(p => {
    const discountPercentage = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
    html += `
      <div class="product-card reveal-element revealed" data-id="${p.id}">
        <div class="card-media">
          <div class="card-badges">
            ${p.badge ? `<span class="badge badge-${p.badgeType}">${p.badge}</span>` : ""}
          </div>
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
              ${generateStarsHTML(p.rating)}
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

  productsGrid.innerHTML = html;

  if (typeof syncCompareStates === "function") syncCompareStates();
  if (typeof syncWishlistStates === "function") syncWishlistStates();
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

function resetAllCatalogFilters() {
  activeCategory = "all";
  activeBrand = "all";
  maxPriceLimit = 3000;
  activeSortOrder = "default";
  searchFilterQuery = "";

  // Reset inputs UI
  const rangeInput = document.getElementById("price-limit-slider");
  if (rangeInput) {
    rangeInput.value = 3000;
    const valueDisp = document.getElementById("price-limit-display");
    if (valueDisp) valueDisp.textContent = "$3,000";
  }

  const searchInput = document.getElementById("shop-search-input");
  if (searchInput) searchInput.value = "";

  const sortSelect = document.getElementById("shop-sort-select");
  if (sortSelect) sortSelect.value = "default";

  // Re-style category sidebar links
  document.querySelectorAll(".sidebar-filter-link[data-category]").forEach(link => {
    if (link.getAttribute("data-category") === "all") {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Re-style brand sidebar links
  document.querySelectorAll(".sidebar-filter-link[data-brand]").forEach(link => {
    if (link.getAttribute("data-brand") === "all") {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  applyCatalogFilters();
}

document.addEventListener("DOMContentLoaded", () => {
  // Category Link Clicks
  document.querySelectorAll(".sidebar-filter-link[data-category]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".sidebar-filter-link[data-category]").forEach(el => el.classList.remove("active"));
      link.classList.add("active");
      activeCategory = link.getAttribute("data-category");
      applyCatalogFilters();
    });
  });

  // Brand Link Clicks
  document.querySelectorAll(".sidebar-filter-link[data-brand]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".sidebar-filter-link[data-brand]").forEach(el => el.classList.remove("active"));
      link.classList.add("active");
      activeBrand = link.getAttribute("data-brand");
      applyCatalogFilters();
    });
  });

  // Price Slider Clicks/Moves
  const priceSlider = document.getElementById("price-limit-slider");
  const priceDisplay = document.getElementById("price-limit-display");
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      maxPriceLimit = val;
      priceDisplay.textContent = `$${val.toLocaleString()}`;
      applyCatalogFilters();
    });
  }

  // Sort Dropdown Change
  const sortSelect = document.getElementById("shop-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeSortOrder = e.target.value;
      applyCatalogFilters();
    });
  }

  // Shop Search Input Keyup
  const shopSearchInput = document.getElementById("shop-search-input");
  if (shopSearchInput) {
    shopSearchInput.addEventListener("keyup", (e) => {
      searchFilterQuery = e.target.value.trim();
      applyCatalogFilters();
    });
  }

  // Initial shop page load logic check
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get("category");
  if (catParam) {
    activeCategory = catParam;
    document.querySelectorAll(".sidebar-filter-link[data-category]").forEach(link => {
      if (link.getAttribute("data-category").toLowerCase() === catParam.toLowerCase()) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  applyCatalogFilters();
});
