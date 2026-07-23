/* ==========================================================================
   Elevora PREMIUM ELECTRONICS BRAND - GLOBAL APPLICATION JS
   Handles: Cart, Search, Theme Switching, Slider, and Dynamic Rendering
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Init Core Modules ---
  initTheme();
  initHeader();
  initMobileMenu();
  initSearch();
  initCart();
  initAdminProductManager();
  
  // --- Page-Specific Initializations (Supports HTML & WordPress Permalinks) ---
  const path = window.location.pathname.toLowerCase();

  if (path === '/' || path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('/index.php') || path === '' || path.includes('/home')) {
    initHeroSlider();
    renderFeaturedProducts();
  }
  if (path.includes('shop')) {
    initShopPage();
  }
  if (path.includes('product')) {
    initProductDetailsPage();
  }
  if (path.includes('quiz')) {
    initQuizPage();
  }
  if (path.includes('checkout')) {
    initCheckoutPage();
  }

  // --- Fallback Triggers: Automatically run if container elements exist on DOM ---
  const picksContainer = document.getElementById('picks-grid-container') || document.querySelector('.picks-row');
  if (picksContainer) {
    initHeroSlider();
    renderFeaturedProducts();
  }

  const shopGrid = document.getElementById('shop-products-grid') || document.getElementById('shop-product-grid');
  if (shopGrid && shopGrid.children.length === 0) {
    initShopPage();
  }

  const detailTitle = document.getElementById('detail-title');
  if (detailTitle && (!detailTitle.textContent || detailTitle.textContent.trim() === '' || detailTitle.textContent.includes('Loading'))) {
    initProductDetailsPage();
  }
});

// ==========================================================================
// 1. THEME SWITCHER (Light/Dark Mode)
// ==========================================================================
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Toggle Theme
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add visual splash effect or logs if needed
    showToast(`Switched to ${newTheme === 'dark' ? 'Midnight Dark' : 'Sunny Light'} mode!`);
  });
}

// ==========================================================================
// 2. HEADER HANDLERS (Sticky & Scroll Effects)
// ==========================================================================
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==========================================================================
// 3. MOBILE MENU & HAMBURGER DRAWER
// ==========================================================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('site-overlay');
  
  if (!hamburger || !drawer || !overlay) return;

  const toggleMenu = () => {
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
  };

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', () => {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Mobile submenu accordion toggling
  const submenuTriggers = document.querySelectorAll('.mobile-nav-link');
  submenuTriggers.forEach(trigger => {
    const submenu = trigger.nextElementSibling;
    if (submenu && submenu.classList.contains('mobile-submenu')) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = trigger.querySelector('i');
        const isOpen = submenu.style.display === 'block';
        
        // Close others
        document.querySelectorAll('.mobile-submenu').forEach(sub => sub.style.display = 'none');
        document.querySelectorAll('.mobile-nav-link i').forEach(i => {
          if (i) i.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          submenu.style.display = 'block';
          if (icon) icon.style.transform = 'rotate(90deg)';
        } else {
          submenu.style.display = 'none';
          if (icon) icon.style.transform = 'rotate(0deg)';
        }
      });
    }
  });
}

// ==========================================================================
// 4. SEARCH MODAL & MATCHING
// ==========================================================================
function initSearch() {
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const closeSearch = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  
  if (!searchBtn || !searchModal || !closeSearch || !searchInput || !resultsContainer) return;

  const openModal = () => {
    searchModal.classList.add('active');
    searchInput.focus();
  };

  const closeModal = () => {
    searchModal.classList.remove('active');
    searchInput.value = '';
    resultsContainer.innerHTML = '';
  };

  searchBtn.addEventListener('click', openModal);
  closeSearch.addEventListener('click', closeModal);

  // Search filter matching
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 2) {
      resultsContainer.innerHTML = '';
      return;
    }

    const allProducts = typeof getProducts === 'function' ? getProducts() : products;
    const filtered = allProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      (p.description && p.description.toLowerCase().includes(query)) ||
      (p.type && p.type.toLowerCase().includes(query)) ||
      (p.category && p.category.toLowerCase().includes(query))
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<p class="search-empty">No results found for "${query}"</p>`;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="search-results-title">Products (${filtered.length})</div>
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${filtered.map(p => `
          <a href="product.html?id=${p.id}" class="search-result-item">
            <div class="search-result-img">
              <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="search-result-info">
              <h4>${p.name}</h4>
              <p>${p.type} • Warranty: ${p.spf} Year${p.spf > 1 ? 's' : ''} • $${p.price.toFixed(2)}</p>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  });

  // ESC key to close search
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ==========================================================================
// 5. HERO SLIDER LOGIC
// ==========================================================================
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (!slider || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayTimer;

  // Create dot controls
  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  const goToSlide = (index) => {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;
    
    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * (100 / slideCount)}%)`;
    
    // Update active dot
    dots.forEach(d => d.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

  // Autoplay
  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 6000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  startAutoplay();
}

// ==========================================================================
// 6. CART MANAGEMENT (Add, Remove, Quantity adjustments)
// ==========================================================================
let cart = [];

function initCart() {
  // Load Cart from localStorage
  const savedCart = localStorage.getItem('Elevora_cart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }

  updateCartUI();

  // Cart Drawer triggers
  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const closeCart = document.getElementById('cart-close');
  const overlay = document.getElementById('site-overlay');

  if (cartBtn && cartDrawer && closeCart && overlay) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cartDrawer.classList.add('active');
      overlay.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
      cartDrawer.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // Handle Dynamic Clicks inside Cart Drawer (Adjusting qty/remove)
  const cartItemsContainer = document.getElementById('cart-items-list');
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
      const target = e.target;
      const itemId = target.getAttribute('data-id');
      if (!itemId) return;

      if (target.classList.contains('qty-minus')) {
        adjustQuantity(itemId, -1);
      } else if (target.classList.contains('qty-plus')) {
        adjustQuantity(itemId, 1);
      } else if (target.classList.contains('cart-item-remove')) {
        e.preventDefault();
        removeFromCart(itemId);
      }
    });
  }
}

function updateCartUI() {
  // Update badge count
  const cartBadges = document.querySelectorAll('.cart-count');
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadges.forEach(badge => {
    badge.textContent = totalQty;
    badge.style.display = totalQty > 0 ? 'flex' : 'none';
  });

  // Render items inside drawer
  const drawerItems = document.getElementById('cart-items-list');
  const subtotalPriceEl = document.getElementById('cart-subtotal');
  const shippingTextEl = document.getElementById('cart-shipping');
  const totalPriceEl = document.getElementById('cart-total');

  if (!drawerItems) return;

  if (cart.length === 0) {
    drawerItems.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-bag"></i>
        <p>Your bag is currently empty.</p>
        <a href="shop.html" class="btn btn-primary" id="cart-empty-shop">Shop Elevora Tech</a>
      </div>
    `;
    if (subtotalPriceEl) subtotalPriceEl.textContent = "$0.00";
    if (shippingTextEl) shippingTextEl.textContent = "Calculated at checkout";
    if (totalPriceEl) totalPriceEl.textContent = "$0.00";
    
    // Disable checkout btn in footer if empty
    const checkoutBtn = document.querySelector('.cart-footer .btn');
    if (checkoutBtn) checkoutBtn.style.pointerEvents = 'none';
    return;
  }

  // Enable checkout btn
  const checkoutBtn = document.querySelector('.cart-footer .btn');
  if (checkoutBtn) checkoutBtn.style.pointerEvents = 'auto';

  // Render list
  const allProductsList = typeof getProducts === 'function' ? getProducts() : products;
  drawerItems.innerHTML = cart.map(item => {
    const product = allProductsList.find(p => p.id === item.id);
    if (!product) return '';
    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${getProductImgSrc(product.image)}" alt="${product.name}">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name"><a href="product.html?id=${product.id}">${product.name}</a></div>
          <div class="cart-item-price">$${(product.price * item.quantity).toFixed(2)}</div>
          <div class="cart-item-controls">
            <div class="quantity-adjuster">
              <button class="qty-minus" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button class="qty-plus" data-id="${item.id}">+</button>
            </div>
            <a href="#" class="cart-item-remove" data-id="${item.id}">Remove</a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const product = allProductsList.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const shipping = subtotal >= 150 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (subtotalPriceEl) subtotalPriceEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingTextEl) {
    shippingTextEl.textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
    shippingTextEl.style.color = shipping === 0 ? "var(--color-accent)" : "inherit";
    shippingTextEl.style.fontWeight = shipping === 0 ? "800" : "inherit";
  }
  if (totalPriceEl) totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

window.addToCart = function(productId, qty = 1, showDrawer = true) {
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ id: productId, quantity: qty });
  }

  localStorage.setItem('Elevora_cart', JSON.stringify(cart));
  updateCartUI();
  
  const allProductsList = typeof getProducts === 'function' ? getProducts() : products;
  const product = allProductsList.find(p => p.id === productId);
  showToast(`Added ${product ? product.name : 'item'} to your bag!`);

  if (showDrawer) {
    const cartDrawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('site-overlay');
    if (cartDrawer && overlay) {
      cartDrawer.classList.add('active');
      overlay.classList.add('active');
    }
  }
};

function adjustQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(id);
  } else {
    localStorage.setItem('Elevora_cart', JSON.stringify(cart));
    updateCartUI();
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('Elevora_cart', JSON.stringify(cart));
  updateCartUI();
  showToast("Removed item from bag.");
}

// ==========================================================================
// 7. TOAST NOTIFICATION UTILITY
// ==========================================================================
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 100);

  // Remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Helper function for WordPress / relative image URL resolution
function getProductImgSrc(img) {
  if (!img) return '';
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  if (window.ELEVORA_THEME_URI) {
    return window.ELEVORA_THEME_URI + '/' + img.replace(/^\/+/, '');
  }
  return img;
}

// ==========================================================================
// 8. RENDER HOME PAGE FEATURED / BESTSELLERS
// ==========================================================================
function renderFeaturedProducts() {
  const bestsellersGrid = document.getElementById('picks-grid-container') || document.getElementById('bestsellers-grid') || document.querySelector('.picks-row');
  if (!bestsellersGrid) return;

  const allProducts = typeof getProducts === 'function' ? getProducts() : products;
  const bestsellers = allProducts;
  
  bestsellersGrid.innerHTML = bestsellers.map(p => `
    <div class="pick-card">
      <a href="product.html?id=${p.id}" class="pick-card-link">
        <div class="pick-card-img-wrapper">
          <span class="pick-badge badge-blue">${p.isNew ? 'New Release' : p.isBestseller ? 'Bestseller' : p.isOffer ? 'Sale' : 'Featured'}</span>
          <img src="${getProductImgSrc(p.image)}" alt="${p.name}">
        </div>
        <div class="pick-card-info">
          <div class="pick-rating">
            ${getRatingStars(p.rating || 4.8)}
          </div>
          <h4 class="pick-title">${p.name}</h4>
          <p class="pick-desc">${p.tagline || (p.type + ' • Warranty: ' + (p.spf || 1) + ' Year')}</p>
          <div class="pick-card-footer" style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
            <p class="pick-price" style="margin:0;">$${parseFloat(p.price).toFixed(2)}</p>
            <button class="btn btn-primary pick-add-btn" style="padding:6px 12px; font-size:12px;" onclick="event.preventDefault(); addToCart('${p.id}', 1, true)">Add to Bag</button>
          </div>
        </div>
      </a>
    </div>
  `).join('');
}

function getRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  
  let html = '';
  for (let i = 0; i < fullStars; i++) html += '<i class="fas fa-star"></i>';
  if (halfStar) html += '<i class="fas fa-star-half-alt"></i>';
  for (let i = 0; i < emptyStars; i++) html += '<i class="far fa-star"></i>';
  return html;
}

// ==========================================================================
// 9. SHOP PAGE FILTERING & SORTING
// ==========================================================================
function initShopPage() {
  const shopGrid = document.getElementById('shop-products-grid') || document.getElementById('shop-product-grid');
  const resultsCount = document.getElementById('results-count');
  const sortSelect = document.getElementById('sort-by');
  const filterCheckboxes = document.querySelectorAll('.filters-sidebar input[type="checkbox"]');
  const filterTrigger = document.getElementById('mobile-filter-btn');
  const filterSidebar = document.getElementById('filters-sidebar');
  const closeFilterBtn = document.getElementById('filters-close');

  if (!shopGrid) return;

  // Toggle Filters on Mobile
  if (filterTrigger && filterSidebar) {
    filterTrigger.addEventListener('click', () => {
      filterSidebar.classList.add('active');
    });
  }

  if (closeFilterBtn && filterSidebar) {
    closeFilterBtn.addEventListener('click', () => {
      filterSidebar.classList.remove('active');
    });
  }

  // Parse URL Parameters
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const typeParam = urlParams.get('type');
  const subParam = urlParams.get('sub');
  const filterParam = urlParams.get('filter');
  const minPriceParam = urlParams.get('minPrice') ? parseFloat(urlParams.get('minPrice')) : null;
  const maxPriceParam = urlParams.get('maxPrice') ? parseFloat(urlParams.get('maxPrice')) : null;

  // Pre-check sidebar checkboxes if URL matches standard filters
  if (categoryParam) {
    const cb = document.querySelector(`.filters-sidebar input[name="category"][value="${decodeURIComponent(categoryParam)}"]`);
    if (cb) cb.checked = true;
  }
  if (typeParam) {
    const cb = document.querySelector(`.filters-sidebar input[name="type"][value="${decodeURIComponent(typeParam)}"]`);
    if (cb) cb.checked = true;
  }

  // Handle filtering
  const filterAndSort = () => {
    const allProducts = typeof getProducts === 'function' ? getProducts() : products;
    let filtered = [...allProducts];

    // Gather checked options
    const activeFilters = {
      category: [],
      spf: [],
      type: []
    };

    filterCheckboxes.forEach(cb => {
      if (cb.checked) {
        activeFilters[cb.name].push(cb.value);
      }
    });

    // Apply Checkbox Category Filter logic
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(p => activeFilters.category.includes(p.category));
    } else if (categoryParam) {
      const decodedCat = decodeURIComponent(categoryParam).toLowerCase();
      filtered = filtered.filter(p => p.category && p.category.toLowerCase().includes(decodedCat));
    }

    if (activeFilters.spf.length > 0) {
      filtered = filtered.filter(p => activeFilters.spf.includes(String(p.spf)));
    }

    // Apply Type Filter
    if (activeFilters.type.length > 0) {
      filtered = filtered.filter(p => activeFilters.type.some(val => p.type.toLowerCase().includes(val.toLowerCase())));
    } else if (typeParam) {
      const decodedType = decodeURIComponent(typeParam).toLowerCase();
      filtered = filtered.filter(p => (p.type && p.type.toLowerCase().includes(decodedType)) || (p.tags && p.tags.some(t => t.toLowerCase().includes(decodedType))));
    }

    // Apply Subcategory / Tag URL filter
    if (subParam) {
      const cleanSub = decodeURIComponent(subParam).toLowerCase();
      filtered = filtered.filter(p => {
        const inSub = p.sub && p.sub.toLowerCase().includes(cleanSub);
        const inTags = p.tags && p.tags.some(t => t.toLowerCase().includes(cleanSub));
        const inName = p.name && p.name.toLowerCase().includes(cleanSub);
        const inType = p.type && p.type.toLowerCase().includes(cleanSub);
        return inSub || inTags || inName || inType;
      });
    }

    // Apply Special Presets Filter (new-arrivals, offers, combos, gifting, etc.)
    if (filterParam) {
      const cleanFilter = filterParam.toLowerCase();
      if (cleanFilter === 'new-arrivals') {
        filtered = filtered.filter(p => p.isNew);
      } else if (cleanFilter === 'offers' || cleanFilter === 'combos' || cleanFilter === 'on-sale' || cleanFilter === 'bogo' || cleanFilter === 'clearance') {
        filtered = filtered.filter(p => p.isOffer || p.isBestseller || (p.originalPrice && p.originalPrice > p.price));
      } else if (cleanFilter.includes('gifting')) {
        filtered = filtered.filter(p => p.tags && p.tags.includes('gifting'));
      }
    }

    // Apply Min & Max Price Bounds
    if (minPriceParam !== null) {
      filtered = filtered.filter(p => p.price >= minPriceParam);
    }
    if (maxPriceParam !== null) {
      filtered = filtered.filter(p => p.price <= maxPriceParam);
    }

    // Apply Sorting logic
    const sortBy = sortSelect ? sortSelect.value : 'bestsellers';
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      // Bestsellers / Default
      filtered.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    // Render results
    renderShopGrid(filtered);
  };

  const renderShopGrid = (items) => {
    if (resultsCount) resultsCount.textContent = `${items.length} Products`;

    if (items.length === 0) {
      shopGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--text-secondary);">
          <i class="fas fa-search" style="font-size: 32px; margin-bottom:12px;"></i>
          <p>No products match your filter selections. Try clearing filters or selecting another category.</p>
          <a href="shop.html" class="btn btn-secondary" style="margin-top:15px; display:inline-block;">Show All Products</a>
        </div>
      `;
      return;
    }

    shopGrid.innerHTML = items.map(p => `
      <div class="product-card animate-fade-in-up">
        ${p.isNew ? `<div class="product-card-badge new">New</div>` : p.isBestseller ? `<div class="product-card-badge">Bestseller</div>` : p.isOffer ? `<div class="product-card-badge offer">Sale</div>` : ''}
        <button class="product-card-wishlist" aria-label="Add to Wishlist"><i class="far fa-heart"></i></button>
        <div class="product-card-img">
          <a href="product.html?id=${p.id}">
            <img src="${getProductImgSrc(p.image)}" alt="${p.name}">
          </a>
          <button class="product-card-quickadd" onclick="event.preventDefault(); addToCart('${p.id}', 1, true)">Quick Add +</button>
        </div>
        <div class="product-card-info">
          <span class="product-card-type">${p.type || 'Tech'}</span>
          <h3 class="product-card-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <div class="product-card-rating">
            ${getRatingStars(p.rating || 4.8)}
            <span>(${p.reviewsCount || 100})</span>
          </div>
          <div class="product-card-footer">
            <div class="product-card-price">
              $${parseFloat(p.price).toFixed(2)}
              ${p.originalPrice ? `<span style="text-decoration: line-through; color: var(--text-secondary); font-size: 13px; margin-left: 6px; font-weight: normal;">$${parseFloat(p.originalPrice).toFixed(2)}</span>` : ''}
            </div>
            <span class="product-card-spf">Warranty: ${p.spf || 1} Year${(p.spf || 1) > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    `).join('');
  };

  // Add event listeners
  if (sortSelect) sortSelect.addEventListener('change', filterAndSort);
  filterCheckboxes.forEach(cb => cb.addEventListener('change', filterAndSort));

  // Initial load
  filterAndSort();
}

// ==========================================================================
// 10. PRODUCT DETAILS DYNAMIC RENDERING
// ==========================================================================
function initProductDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get('id');

  const allProducts = typeof getProducts === 'function' ? getProducts() : products;

  if (!productId) {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const lastPart = pathParts.pop() || '';
    const found = allProducts.find(p => p.id === lastPart || p.id.replace('_', '-') === lastPart || p.name.toLowerCase().includes(lastPart.replace(/-/g, ' ')));
    if (found) {
      productId = found.id;
    } else {
      productId = allProducts[0] ? allProducts[0].id : 'unseen';
    }
  }

  const product = allProducts.find(p => p.id === productId) || allProducts[0];

  if (!product) {
    return;
  }

  // SEO updates
  document.title = `${product.name} | Elevora Electronics`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${product.tagline || product.name} Buy now at Elevora Electronics website.`);
  }

  // Render Product Page Info
  const mainImg = document.getElementById('detail-main-img');
  const productTitle = document.getElementById('detail-title');
  const productTagline = document.getElementById('detail-tagline');
  const productPrice = document.getElementById('detail-price');
  const productRatingStars = document.getElementById('detail-stars');
  const productReviewsCount = document.getElementById('detail-reviews-count');
  
  if (mainImg) mainImg.innerHTML = `<img src="${getProductImgSrc(product.image)}" alt="${product.name}">`;
  if (productTitle) productTitle.textContent = product.name;
  if (productTagline) productTagline.textContent = product.tagline || '';
  if (productPrice) productPrice.textContent = `$${parseFloat(product.price).toFixed(2)}`;
  if (productRatingStars) productRatingStars.innerHTML = getRatingStars(product.rating || 4.8);
  if (productReviewsCount) productReviewsCount.textContent = `(${product.reviewsCount || 100} reviews)`;

  // Tabs Content
  const tabDesc = document.getElementById('tab-description');
  const tabIng = document.getElementById('tab-ingredients');
  const tabUsage = document.getElementById('tab-usage');
  const tabBenefits = document.getElementById('tab-benefits');

  if (tabDesc) tabDesc.innerHTML = `<p>${product.description || 'No description available.'}</p>`;
  if (tabIng) tabIng.innerHTML = `<p>${(product.ingredients || 'Warranty: ' + (product.spf || 1) + ' Year').replace(/\n/g, '<br>')}</p>`;
  if (tabUsage) tabUsage.innerHTML = `<p>${product.howToUse || 'Unbox, connect, and enjoy your Elevora device.'}</p>`;
  if (tabBenefits) {
    const benefitsList = Array.isArray(product.benefits) ? product.benefits : ['High-performance electronic components', 'Full Elevora warranty included'];
    tabBenefits.innerHTML = `
      <ul>
        ${benefitsList.map(b => `<li><i class="fas fa-check" style="color:var(--color-accent); margin-right:8px;"></i> ${b}</li>`).join('')}
      </ul>
    `;
  }

  // Quantity controllers on Product Details Page
  const minusBtn = document.getElementById('detail-qty-minus');
  const plusBtn = document.getElementById('detail-qty-plus');
  const qtyVal = document.getElementById('detail-qty-val');
  const addBtn = document.getElementById('detail-add-btn');

  let localQty = 1;

  if (minusBtn && plusBtn && qtyVal) {
    minusBtn.addEventListener('click', () => {
      if (localQty > 1) {
        localQty--;
        qtyVal.textContent = localQty;
      }
    });

    plusBtn.addEventListener('click', () => {
      localQty++;
      qtyVal.textContent = localQty;
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      addToCart(product.id, localQty, true);
    });
  }

  // Tab buttons triggers
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(`tab-${targetId}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // Render related products
  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid) {
    const related = allProducts.filter(p => p.id !== product.id).slice(0, 3);
    relatedGrid.innerHTML = related.map(p => `
      <div class="product-card">
        ${p.isNew ? `<div class="product-card-badge new">New</div>` : p.isBestseller ? `<div class="product-card-badge">Bestseller</div>` : ''}
        <button class="product-card-wishlist" aria-label="Add to Wishlist"><i class="far fa-heart"></i></button>
        <div class="product-card-img">
          <a href="product.html?id=${p.id}">
            <img src="${getProductImgSrc(p.image)}" alt="${p.name}">
          </a>
          <button class="product-card-quickadd" onclick="event.preventDefault(); addToCart('${p.id}', 1, true)">Quick Add +</button>
        </div>
        <div class="product-card-info">
          <span class="product-card-type">${p.type || ''}</span>
          <h3 class="product-card-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <div class="product-card-rating">
            ${getRatingStars(p.rating || 4.8)}
            <span>(${p.reviewsCount || 50})</span>
          </div>
          <div class="product-card-footer">
            <div class="product-card-price">$${parseFloat(p.price).toFixed(2)}</div>
            <span class="product-card-spf">Warranty: ${p.spf || 1} Year${(p.spf || 1) > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// ==========================================================================
// 11. QUIZ LOGIC
// ==========================================================================
function initQuizPage() {
  const steps = document.querySelectorAll('.quiz-step');
  const prevBtn = document.getElementById('quiz-prev');
  const nextBtn = document.getElementById('quiz-next');
  const progressBar = document.getElementById('quiz-progress');
  const optionCards = document.querySelectorAll('.quiz-option');

  if (steps.length === 0) return;

  let currentStepIndex = 0;
  const answers = {
    skinType: null,
    activity: null,
    finish: null,
    concern: null
  };

  const updateQuiz = () => {
    // Show current step
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === currentStepIndex);
    });

    // Update buttons
    if (prevBtn) prevBtn.style.display = currentStepIndex === 0 ? 'none' : 'block';
    
    if (nextBtn) {
      if (currentStepIndex === steps.length - 2) {
        nextBtn.textContent = 'See Recommendation';
      } else if (currentStepIndex === steps.length - 1) {
        nextBtn.style.display = 'none';
        prevBtn.style.display = 'none';
      } else {
        nextBtn.textContent = 'Next';
        nextBtn.style.display = 'block';
      }
    }

    // Progress Bar
    const progressPercent = (currentStepIndex / (steps.length - 1)) * 100;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
  };

  // Option selection
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      const question = card.getAttribute('data-question');
      const val = card.getAttribute('data-val');

      // Unselect siblings
      const siblings = card.parentElement.querySelectorAll('.quiz-option');
      siblings.forEach(s => s.classList.remove('selected'));

      // Select clicked
      card.classList.add('selected');
      answers[question] = val;

      // Enable next button or auto-advance after brief delay
      setTimeout(() => {
        if (currentStepIndex < steps.length - 2) {
          currentStepIndex++;
          updateQuiz();
        } else {
          // Reached calculation screen
          calculateQuizResult();
        }
      }, 300);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        updateQuiz();
      }
    });
  }

  const calculateQuizResult = () => {
    currentStepIndex = steps.length - 1; // move to result slide
    updateQuiz();

    // Recommendation logic based on answers
    let recommendedProduct = products[0]; // default is unseen

    if (answers.finish === 'glowy') {
      recommendedProduct = products.find(p => p.id === 'glow') || products[1];
    } else if (answers.skinType === 'oily' || answers.finish === 'matte') {
      recommendedProduct = products.find(p => p.id === 'mattescreen') || products[4];
    } else if (answers.activity === 'sports' || answers.activity === 'beach') {
      recommendedProduct = products.find(p => p.id === 'play-lotion') || products[2];
    } else if (answers.concern === 'makeup') {
      recommendedProduct = products.find(p => p.id === 'skin-tint') || products[5];
    }

    const resultBox = document.getElementById('quiz-result-box');
    if (resultBox) {
      resultBox.innerHTML = `
        <div class="quiz-result-card">
          <h2 style="font-size:32px; font-weight:800; text-transform:uppercase; margin-bottom:20px; color:var(--color-secondary);">Your Perfect Match!</h2>
          <div class="quiz-result-img">
            <img src="${recommendedProduct.image}" alt="${recommendedProduct.name}">
          </div>
          <h3 class="quiz-result-title">${recommendedProduct.name}</h3>
          <p class="quiz-result-desc">${recommendedProduct.tagline} Based on your answers, this premium device aligns best with your productivity, style, and tech requirements.</p>
          <div style="font-size:24px; font-weight:800; margin-bottom:24px;">$${recommendedProduct.price.toFixed(2)}</div>
          <div style="display:flex; gap:16px; justify-content:center;">
            <button class="btn btn-primary" onclick="addToCart('${recommendedProduct.id}', 1, true)">Add to Bag</button>
            <a href="product.html?id=${recommendedProduct.id}" class="btn btn-secondary">View Details</a>
          </div>
          <button class="btn btn-secondary" onclick="window.location.reload();" style="margin-top:30px; font-size:12px; padding:8px 16px;">Retake Quiz</button>
        </div>
      `;
    }
  };

  // Initial Draw
  updateQuiz();
}

// ==========================================================================
// 12. CHECKOUT MOCKUP LOGIC
// ==========================================================================
function initCheckoutPage() {
  const checkoutItems = document.getElementById('checkout-items-list');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const shippingEl = document.getElementById('checkout-shipping');
  const totalEl = document.getElementById('checkout-total');
  const form = document.getElementById('checkout-form');

  if (!checkoutItems) return;

  if (cart.length === 0) {
    document.querySelector('.checkout-layout').innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 100px 0;">
        <h2>Your Bag is Empty</h2>
        <p>You cannot checkout with an empty bag.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top:20px;">Return to Shop</a>
      </div>
    `;
    return;
  }

  // Render items
  const allProductsList = typeof getProducts === 'function' ? getProducts() : products;
  checkoutItems.innerHTML = cart.map(item => {
    const product = allProductsList.find(p => p.id === item.id);
    if (!product) return '';
    return `
      <div class="order-item-row">
        <div>
          <span class="order-item-name">${product.name}</span>
          <span class="order-item-qty">x${item.quantity}</span>
        </div>
        <span class="order-item-price">$${(product.price * item.quantity).toFixed(2)}</span>
      </div>
    `;
  }).join('');

  // Totals
  const subtotal = cart.reduce((sum, item) => {
    const product = allProductsList.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

  // Form submit handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear cart
      cart = [];
      localStorage.removeItem('Elevora_cart');
      updateCartUI();

      // Render Order Success Screen
      document.querySelector('.checkout-layout').innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:80px 24px; background-color:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--border-radius-lg); box-shadow:var(--shadow-lg);">
          <i class="fas fa-check-circle" style="font-size:72px; color:var(--color-accent); margin-bottom:24px;"></i>
          <h2 style="font-size:36px; font-weight:800; text-transform:uppercase; margin-bottom:16px;">Order Confirmed!</h2>
          <p style="font-size:16px; color:var(--text-secondary); max-width:600px; margin: 0 auto 30px;">
            Thank you for shopping with Elevora. Your premium electronic order is on its way to upgrade your tech experience! Your order number is #ELV-${Math.floor(100000 + Math.random() * 900000)}.
          </p>
          <a href="index.html" class="btn btn-primary">Go to Home</a>
        </div>
      `;
    });
  }
}

// ==========================================================================
// 13. ADMIN DYNAMIC PRODUCT MANAGER MODULE
// ==========================================================================
function initAdminProductManager() {
  // Floating trigger button
  if (!document.getElementById('elevora-admin-trigger')) {
    const trigger = document.createElement('button');
    trigger.id = 'elevora-admin-trigger';
    trigger.innerHTML = `<i class="fas fa-edit"></i> Dynamic Product Manager`;
    trigger.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      background: linear-gradient(135deg, #2563eb, #06b6d4);
      color: #ffffff;
      border: none;
      padding: 12px 20px;
      border-radius: 30px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    `;
    trigger.addEventListener('mouseover', () => {
      trigger.style.transform = 'translateY(-3px)';
      trigger.style.boxShadow = '0 12px 28px rgba(37, 99, 235, 0.5)';
    });
    trigger.addEventListener('mouseout', () => {
      trigger.style.transform = 'translateY(0)';
      trigger.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.4)';
    });
    trigger.addEventListener('click', () => openAdminModal());
    document.body.appendChild(trigger);
  }

  // Modal Container
  function openAdminModal() {
    let modal = document.getElementById('elevora-admin-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'elevora-admin-modal';
      modal.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(6px);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
      `;
      document.body.appendChild(modal);
    }
    renderAdminModalContent(modal);
  }

  function renderAdminModalContent(modal, editingProductId = null) {
    const currentProducts = typeof getProducts === 'function' ? getProducts() : products;
    const editingProduct = editingProductId ? currentProducts.find(p => p.id === editingProductId) : null;

    modal.innerHTML = `
      <div style="background: var(--bg-card, #ffffff); color: var(--text-primary, #000); width: 100%; max-width: 900px; max-height: 90vh; overflow-y: auto; border-radius: 16px; border: 1px solid var(--border-color, #e2e8f0); box-shadow: 0 20px 40px rgba(0,0,0,0.3); padding: 30px; position: relative; font-family: 'Poppins', sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color, #e2e8f0); padding-bottom:16px; margin-bottom:24px;">
          <div>
            <h2 style="margin:0; font-size:22px; font-weight:800; color:var(--color-primary, #2563eb); display:flex; align-items:center; gap:10px;">
              <i class="fas fa-boxes"></i> Elevora Dynamic Product Manager
            </h2>
            <p style="margin:4px 0 0; font-size:12px; color:var(--text-secondary, #64748b);">Add, update, or remove live products across your Elevora store.</p>
          </div>
          <button id="admin-close-btn" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text-secondary, #64748b);">&times;</button>
        </div>

        <div style="display:flex; gap:12px; margin-bottom:20px; flex-wrap:wrap;">
          <button id="admin-btn-show-form" class="btn btn-primary" style="font-size:13px; padding:8px 16px;">
            <i class="fas fa-plus"></i> Add New Product
          </button>
          <button id="admin-btn-reset-defaults" class="btn btn-secondary" style="font-size:13px; padding:8px 16px;">
            <i class="fas fa-undo"></i> Reset to Default Products
          </button>
        </div>

        <!-- Add/Edit Form Section -->
        <div id="admin-form-container" style="display:${editingProduct ? 'block' : 'none'}; background:var(--bg-secondary, #f8fafc); border:1px solid var(--border-color, #e2e8f0); border-radius:12px; padding:20px; margin-bottom:24px;">
          <h3 style="margin-top:0; font-size:16px; font-weight:700;">${editingProduct ? 'Edit Product: ' + editingProduct.name : 'Add New Product'}</h3>
          <form id="admin-product-form" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:15px;">
            <input type="hidden" id="p-edit-id" value="${editingProduct ? editingProduct.id : ''}">
            
            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Product ID *</label>
              <input type="text" id="p-id" required placeholder="e.g. apex-phone-5g" value="${editingProduct ? editingProduct.id : ''}" ${editingProduct ? 'readonly style="background:#e2e8f0;"' : ''} style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; font-size:13px;">
            </div>

            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Product Name *</label>
              <input type="text" id="p-name" required placeholder="e.g. Elevora Ultra Headset" value="${editingProduct ? editingProduct.name : ''}" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; font-size:13px;">
            </div>

            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Tagline</label>
              <input type="text" id="p-tagline" placeholder="e.g. Crystal clear acoustic sound" value="${editingProduct ? (editingProduct.tagline || '') : ''}" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; font-size:13px;">
            </div>

            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Price ($) *</label>
              <input type="number" step="0.01" id="p-price" required placeholder="199.99" value="${editingProduct ? editingProduct.price : ''}" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; font-size:13px;">
            </div>

            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Original Price ($)</label>
              <input type="number" step="0.01" id="p-originalPrice" placeholder="249.99" value="${editingProduct ? (editingProduct.originalPrice || '') : ''}" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; font-size:13px;">
            </div>

            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Device Type</label>
              <select id="p-type" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; font-size:13px;">
                <option value="Phones" ${editingProduct && editingProduct.type === 'Phones' ? 'selected' : ''}>Phones</option>
                <option value="Audio" ${editingProduct && editingProduct.type === 'Audio' ? 'selected' : ''}>Audio</option>
                <option value="Wearables" ${editingProduct && editingProduct.type === 'Wearables' ? 'selected' : ''}>Wearables</option>
                <option value="Accessories" ${editingProduct && editingProduct.type === 'Accessories' ? 'selected' : ''}>Accessories</option>
                <option value="Computers" ${editingProduct && editingProduct.type === 'Computers' ? 'selected' : ''}>Computers</option>
                <option value="Cameras" ${editingProduct && editingProduct.type === 'Cameras' ? 'selected' : ''}>Cameras</option>
              </select>
            </div>

            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Category</label>
              <select id="p-category" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; font-size:13px;">
                <option value="Mobiles & Audio" ${editingProduct && editingProduct.category === 'Mobiles & Audio' ? 'selected' : ''}>Mobiles & Audio</option>
                <option value="Laptops & Wearables" ${editingProduct && editingProduct.category === 'Laptops & Wearables' ? 'selected' : ''}>Laptops & Wearables</option>
              </select>
            </div>

            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Image URL / Path</label>
              <input type="text" id="p-image" placeholder="assets/images/headphones.jpg" value="${editingProduct ? editingProduct.image : 'assets/images/smartphone.jpg'}" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; font-size:13px;">
            </div>

            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Warranty (Years)</label>
              <input type="number" id="p-spf" min="1" max="5" value="${editingProduct ? (editingProduct.spf || 1) : 1}" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; font-size:13px;">
            </div>

            <div style="grid-column: 1 / -1;">
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Description</label>
              <textarea id="p-description" rows="2" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; font-size:13px;" placeholder="Full product description...">${editingProduct ? (editingProduct.description || '') : ''}</textarea>
            </div>

            <div style="grid-column: 1 / -1; display:flex; gap:16px; align-items:center;">
              <label style="font-size:12px; cursor:pointer;"><input type="checkbox" id="p-bestseller" ${editingProduct && editingProduct.isBestseller ? 'checked' : ''}> Bestseller Badge</label>
              <label style="font-size:12px; cursor:pointer;"><input type="checkbox" id="p-new" ${editingProduct && editingProduct.isNew ? 'checked' : ''}> New Release Badge</label>
              <label style="font-size:12px; cursor:pointer;"><input type="checkbox" id="p-offer" ${editingProduct && editingProduct.isOffer ? 'checked' : ''}> On Sale Badge</label>
            </div>

            <div style="grid-column: 1 / -1; display:flex; gap:12px; margin-top:10px;">
              <button type="submit" class="btn btn-primary" style="padding:8px 20px; font-size:13px;">
                <i class="fas fa-check"></i> ${editingProduct ? 'Update Product' : 'Save New Product'}
              </button>
              <button type="button" id="admin-form-cancel" class="btn btn-secondary" style="padding:8px 16px; font-size:13px;">Cancel</button>
            </div>
          </form>
        </div>

        <!-- Products Table -->
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:13px;">
            <thead>
              <tr style="border-bottom:2px solid var(--border-color, #e2e8f0); background:var(--bg-secondary, #f8fafc);">
                <th style="padding:10px;">Image</th>
                <th style="padding:10px;">Name</th>
                <th style="padding:10px;">Type</th>
                <th style="padding:10px;">Price</th>
                <th style="padding:10px;">Warranty</th>
                <th style="padding:10px; text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${currentProducts.map(p => `
                <tr style="border-bottom:1px solid var(--border-color, #e2e8f0);">
                  <td style="padding:8px;"><img src="${getProductImgSrc(p.image)}" alt="${p.name}" style="width:40px; height:40px; object-fit:cover; border-radius:6px;"></td>
                  <td style="padding:8px;"><strong>${p.name}</strong><br><span style="font-size:11px; color:#64748b;">ID: ${p.id}</span></td>
                  <td style="padding:8px;">${p.type || 'Tech'}</td>
                  <td style="padding:8px; font-weight:700; color:var(--color-primary, #2563eb);">$${parseFloat(p.price).toFixed(2)}</td>
                  <td style="padding:8px;">${p.spf || 1} Yr</td>
                  <td style="padding:8px; text-align:right;">
                    <button class="admin-edit-btn" data-id="${p.id}" style="background:#2563eb; color:#fff; border:none; padding:4px 10px; border-radius:4px; font-size:11px; cursor:pointer; margin-right:4px;">Edit</button>
                    <button class="admin-del-btn" data-id="${p.id}" style="background:#ef4444; color:#fff; border:none; padding:4px 10px; border-radius:4px; font-size:11px; cursor:pointer;">Delete</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Bind Modal Events
    document.getElementById('admin-close-btn').addEventListener('click', () => {
      modal.remove();
    });

    const formContainer = document.getElementById('admin-form-container');
    document.getElementById('admin-btn-show-form').addEventListener('click', () => {
      formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('admin-btn-reset-defaults').addEventListener('click', () => {
      if (confirm('Are you sure you want to reset products to original defaults?')) {
        if (typeof resetProducts === 'function') resetProducts();
        showToast('Products reset to defaults!');
        refreshPageProducts();
        renderAdminModalContent(modal);
      }
    });

    const cancelBtn = document.getElementById('admin-form-cancel');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        formContainer.style.display = 'none';
      });
    }

    // Edit buttons
    modal.querySelectorAll('.admin-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.getAttribute('data-id');
        renderAdminModalContent(modal, pId);
      });
    });

    // Delete buttons
    modal.querySelectorAll('.admin-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.getAttribute('data-id');
        if (confirm(`Delete product ${pId}?`)) {
          if (typeof deleteProduct === 'function') deleteProduct(pId);
          showToast(`Deleted product ${pId}`);
          refreshPageProducts();
          renderAdminModalContent(modal);
        }
      });
    });

    // Form Submit
    const productForm = document.getElementById('admin-product-form');
    if (productForm) {
      productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('p-edit-id').value;
        const pId = document.getElementById('p-id').value.trim();
        const pName = document.getElementById('p-name').value.trim();
        const pPrice = parseFloat(document.getElementById('p-price').value) || 0;
        const pOrigPrice = parseFloat(document.getElementById('p-originalPrice').value) || null;
        const pTagline = document.getElementById('p-tagline').value.trim();
        const pType = document.getElementById('p-type').value;
        const pCategory = document.getElementById('p-category').value;
        const pImage = document.getElementById('p-image').value.trim() || 'assets/images/smartphone.jpg';
        const pSpf = parseInt(document.getElementById('p-spf').value) || 1;
        const pDesc = document.getElementById('p-description').value.trim();
        const isBestseller = document.getElementById('p-bestseller').checked;
        const isNew = document.getElementById('p-new').checked;
        const isOffer = document.getElementById('p-offer').checked;

        const productData = {
          id: pId,
          name: pName,
          tagline: pTagline,
          price: pPrice,
          originalPrice: pOrigPrice,
          rating: 4.8,
          reviewsCount: 100,
          type: pType,
          category: pCategory,
          sub: pType.toLowerCase(),
          tags: [pType.toLowerCase(), pCategory.toLowerCase()],
          spf: pSpf,
          isBestseller: isBestseller,
          isNew: isNew,
          isOffer: isOffer,
          image: pImage,
          description: pDesc || pTagline || pName,
          ingredients: `Specification: ${pType} | ${pCategory} | Warranty: ${pSpf} Year`,
          benefits: ["High performance electronic engineering", `Official ${pSpf}-Year Elevora Warranty`],
          howToUse: "Unbox, setup, and enjoy."
        };

        if (editId) {
          if (typeof updateProduct === 'function') updateProduct(editId, productData);
          showToast(`Updated product "${pName}"!`);
        } else {
          if (typeof addProduct === 'function') addProduct(productData);
          showToast(`Added product "${pName}"!`);
        }

        refreshPageProducts();
        renderAdminModalContent(modal);
      });
    }
  }

  function refreshPageProducts() {
    renderFeaturedProducts();
    if (document.getElementById('shop-products-grid') || document.getElementById('shop-product-grid')) {
      initShopPage();
    }
    if (document.getElementById('detail-title')) {
      initProductDetailsPage();
    }
  }
}
