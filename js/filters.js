// Elevora - Advanced Catalog Filtering & Sorting engine

document.addEventListener("DOMContentLoaded", () => {
  const shopGrid = document.getElementById("shop-products-grid");
  if (!shopGrid) return; // Exit if not shop page

  // Filter input elements
  const categoryFilters = document.querySelectorAll(".filter-category-btn");
  const brandCheckboxes = document.querySelectorAll(".brand-filter-checkbox");
  const priceRangeInput = document.getElementById("price-range-input");
  const priceDisplay = document.getElementById("price-range-value");
  const ratingCheckboxes = document.querySelectorAll(".rating-filter-checkbox");
  const sortSelect = document.getElementById("shop-sort-select");
  const searchInput = document.getElementById("shop-catalog-search");
  const itemsCountText = document.getElementById("shop-results-count");
  const clearAllFiltersBtn = document.getElementById("clear-all-filters-btn");
  
  // State object
  let activeFilters = {
    category: "all",
    brands: [],
    maxPrice: 300,
    ratings: [],
    searchQuery: "",
    sortBy: "featured"
  };

  // 1. Initial State parsing from URL search params (e.g. ?filter_cat=Headphones or ?search=volt)
  function parseURLParameters() {
    const params = new URLSearchParams(window.location.search);
    
    let catParam = "";
    if (params.has("filter_cat")) {
      catParam = params.get("filter_cat");
    } else if (params.has("category")) {
      catParam = params.get("category");
    }
    
    if (catParam) {
      activeFilters.category = catParam;
      // Highlight category button
      categoryFilters.forEach(btn => {
        if (btn.getAttribute("data-category") === activeFilters.category) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }

    if (params.has("search")) {
      activeFilters.searchQuery = params.get("search");
      if (searchInput) {
        searchInput.value = activeFilters.searchQuery;
      }
    }
  }

  // 2. Main filter and sort function
  function applyFiltersAndSort() {
    let filtered = [...ElevoraProducts];

    // Filter by Category
    if (activeFilters.category !== "all") {
      filtered = filtered.filter(p => p.category.toLowerCase() === activeFilters.category.toLowerCase());
    }

    // Filter by Brand checkboxes
    if (activeFilters.brands.length > 0) {
      filtered = filtered.filter(p => activeFilters.brands.includes(p.brand.toLowerCase()));
    }

    // Filter by Price range
    filtered = filtered.filter(p => p.price <= activeFilters.maxPrice);

    // Filter by Rating checkboxes (e.g. at least 4.5 stars etc)
    if (activeFilters.ratings.length > 0) {
      filtered = filtered.filter(p => {
        const floorRating = Math.floor(p.rating);
        return activeFilters.ratings.includes(floorRating);
      });
    }

    // Filter by Search Query
    if (activeFilters.searchQuery.trim() !== "") {
      const q = activeFilters.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }

    // Sort Products
    if (activeFilters.sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeFilters.sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (activeFilters.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (activeFilters.sortBy === "reviews") {
      filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else {
      // Default / Featured: sorted by ID or default sequence
      filtered.sort((a, b) => a.id - b.id);
    }

    // Update results count label
    if (itemsCountText) {
      itemsCountText.textContent = `${filtered.length} gadget${filtered.length === 1 ? "" : "s"} found`;
    }

    // Render grid
    renderGrid(filtered);
  }

  // 3. Grid Renderer
  function renderGrid(productsList) {
    if (productsList.length === 0) {
      shopGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 0;">
          <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 20px;"></i>
          <h3>No smart gadgets match your filters</h3>
          <p style="color: var(--text-muted); margin-top: 10px; margin-bottom: 20px;">Try expanding your price range or adjusting selection check-boxes.</p>
          <button id="reset-filters-btn" class="btn btn-primary" style="display: inline-flex; width: auto;">Reset All Filters</button>
        </div>
      `;
      // Attach listener to temporary button
      const resetBtn = document.getElementById("reset-filters-btn");
      if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);
      return;
    }

    let html = "";
    productsList.forEach(p => {
      const discountPercentage = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
      html += `
        <div class="product-card reveal-element revealed" data-id="${p.id}">
          <div class="card-media">
            <div class="card-badges">
              ${p.badge ? `<span class="badge badge-${p.badgeType}">${p.badge}</span>` : ""}
            </div>
            <a href="product.html?id=${p.id}">
              <img src="${p.images[0]}" alt="${p.name}">
              ${p.images[1] ? `<img src="${p.images[1]}" class="card-img-hover" alt="${p.name}">` : ""}
            </a>
            <div class="card-actions">
              <button class="card-action-btn wishlist-toggle-btn" data-id="${p.id}" onclick="toggleWishlist(${p.id})">
                <i class="fa-regular fa-heart"></i>
              </button>
              <button class="card-action-btn" onclick="openQuickView(${p.id})">
                <i class="fa-regular fa-eye"></i>
              </button>
            </div>
          </div>
          <div class="card-info">
            <span class="card-category">${p.category}</span>
            <a href="product.html?id=${p.id}" class="card-title">${p.name}</a>
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

    shopGrid.innerHTML = html;
    
    // Sync heart shapes with user wishlist preference
    if (typeof syncWishlistStates === "function") {
      syncWishlistStates();
    }
  }

  // 4. Rating Stars Generator
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

  // 5. Input change triggers
  
  // Category tabs clicks
  categoryFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryFilters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilters.category = btn.getAttribute("data-category");
      applyFiltersAndSort();
    });
  });

  // Brand check changes
  brandCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      const val = cb.value.toLowerCase();
      if (cb.checked) {
        activeFilters.brands.push(val);
      } else {
        activeFilters.brands = activeFilters.brands.filter(b => b !== val);
      }
      applyFiltersAndSort();
    });
  });

  // Price range slider changes
  if (priceRangeInput) {
    priceRangeInput.addEventListener("input", (e) => {
      const maxVal = parseInt(e.target.value);
      activeFilters.maxPrice = maxVal;
      if (priceDisplay) priceDisplay.textContent = `$${maxVal}`;
      applyFiltersAndSort();
    });
  }

  // Rating check changes
  ratingCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      const val = parseInt(cb.value);
      if (cb.checked) {
        activeFilters.ratings.push(val);
      } else {
        activeFilters.ratings = activeFilters.ratings.filter(r => r !== val);
      }
      applyFiltersAndSort();
    });
  });

  // Sort selectors changes
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeFilters.sortBy = e.target.value;
      applyFiltersAndSort();
    });
  }

  // Search input typing filter
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeFilters.searchQuery = e.target.value;
      applyFiltersAndSort();
    });
  }

  // Reset Filters logic
  function resetAllFilters() {
    activeFilters = {
      category: "all",
      brands: [],
      maxPrice: 300,
      ratings: [],
      searchQuery: "",
      sortBy: "featured"
    };

    // Reset inputs visually
    categoryFilters.forEach(btn => {
      if (btn.getAttribute("data-category") === "all") btn.classList.add("active");
      else btn.classList.remove("active");
    });

    brandCheckboxes.forEach(cb => cb.checked = false);
    ratingCheckboxes.forEach(cb => cb.checked = false);

    if (priceRangeInput) {
      priceRangeInput.value = 300;
      if (priceDisplay) priceDisplay.textContent = `$300`;
    }

    if (sortSelect) sortSelect.value = "featured";
    if (searchInput) searchInput.value = "";

    applyFiltersAndSort();
  }

  if (clearAllFiltersBtn) {
    clearAllFiltersBtn.addEventListener("click", resetAllFilters);
  }

  // 6. Running initialization
  parseURLParameters();
  applyFiltersAndSort();
});
