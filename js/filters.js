// Shop filters engine - Purged of Elevora animations and styles

let activeCategory = "all";
let activeBrand = "all";
let maxPriceLimit = 3000;
let activeSortOrder = "default";
let searchFilterQuery = "";

function applyCatalogFilters() {
  const productsGrid = document.getElementById("shop-products-grid");
  if (!productsGrid) return;

  const filteredProducts = ElevoraProducts.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesBrand = activeBrand === "all" || p.brand.toLowerCase() === activeBrand.toLowerCase();
    const matchesPrice = p.price <= maxPriceLimit;
    const matchesSearch = p.name.toLowerCase().includes(searchFilterQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchFilterQuery.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchFilterQuery.toLowerCase());

    return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
  });

  if (activeSortOrder === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (activeSortOrder === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (activeSortOrder === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  renderShopProducts(filteredProducts);
}

function renderShopProducts(products) {
  const productsGrid = document.getElementById("shop-products-grid");
  if (!productsGrid) return;

  const countDisplay = document.getElementById("shop-results-count");
  if (countDisplay) {
    countDisplay.textContent = `Showing ${products.length} products`;
  }

  if (products.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; border: 1px dashed var(--border-color); border-radius: var(--border-radius-md);">
        <p>No products found matching filters.</p>
        <button class="btn btn-secondary" onclick="resetAllCatalogFilters()" style="margin-top: 16px;">Reset Filters</button>
      </div>
    `;
    return;
  }

  let html = "";
  products.forEach(p => {
    html += `
      <div class="product-card" data-id="${p.id}">
        <div class="card-media">
          <a href="product.html?id=${p.id}">
            <img src="${p.images[0]}" alt="${p.name}">
          </a>
          <div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 8px;">
            <button class="wishlist-toggle-btn" data-id="${p.id}" onclick="toggleWishlist(${p.id})" style="border:none; background:none; cursor:pointer;"><i class="fa-regular fa-heart"></i></button>
          </div>
        </div>
        <div class="card-info">
          <span class="card-category">${p.category}</span>
          <a href="product.html?id=${p.id}" class="card-title">${p.name}</a>
          <div class="card-rating">${p.rating} / 5.0 (${p.reviewsCount} reviews)</div>
          <div class="card-price-row">
            <span class="price">$${p.price.toFixed(2)}</span>
            <button class="btn btn-primary" onclick="addToCart(${p.id}, 1, '${p.colors[0]}')">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });

  productsGrid.innerHTML = html;

  if (typeof syncWishlistStates === "function") syncWishlistStates();
}

function resetAllCatalogFilters() {
  activeCategory = "all";
  activeBrand = "all";
  maxPriceLimit = 3000;
  activeSortOrder = "default";
  searchFilterQuery = "";

  const priceSlider = document.getElementById("price-limit-slider");
  if (priceSlider) {
    priceSlider.value = 3000;
    const priceDisplay = document.getElementById("price-limit-display");
    if (priceDisplay) priceDisplay.textContent = "$3,000";
  }

  const searchInput = document.getElementById("shop-search-input");
  if (searchInput) searchInput.value = "";

  const sortSelect = document.getElementById("shop-sort-select");
  if (sortSelect) sortSelect.value = "default";

  document.querySelectorAll(".sidebar-filter-link").forEach(el => el.classList.remove("active"));
  const allCat = document.querySelector(".sidebar-filter-link[data-category='all']");
  if (allCat) allCat.classList.add("active");
  const allBrand = document.querySelector(".sidebar-filter-link[data-brand='all']");
  if (allBrand) allBrand.classList.add("active");

  applyCatalogFilters();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sidebar-filter-link[data-category]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".sidebar-filter-link[data-category]").forEach(el => el.classList.remove("active"));
      link.classList.add("active");
      activeCategory = link.getAttribute("data-category");
      applyCatalogFilters();
    });
  });

  document.querySelectorAll(".sidebar-filter-link[data-brand]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".sidebar-filter-link[data-brand]").forEach(el => el.classList.remove("active"));
      link.classList.add("active");
      activeBrand = link.getAttribute("data-brand");
      applyCatalogFilters();
    });
  });

  const priceSlider = document.getElementById("price-limit-slider");
  const priceDisplay = document.getElementById("price-limit-display");
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener("input", (e) => {
      maxPriceLimit = parseInt(e.target.value);
      priceDisplay.textContent = `$${maxPriceLimit.toLocaleString()}`;
      applyCatalogFilters();
    });
  }

  const sortSelect = document.getElementById("shop-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeSortOrder = e.target.value;
      applyCatalogFilters();
    });
  }

  const searchInput = document.getElementById("shop-search-input");
  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      searchFilterQuery = e.target.value.trim();
      applyCatalogFilters();
    });
  }

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
