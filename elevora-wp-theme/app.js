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
  const picksContainer = document.getElementById('picks-grid-container');
  if (picksContainer && picksContainer.children.length === 0) {
    initHeroSlider();
    renderFeaturedProducts();
  }

  const shopGrid = document.getElementById('shop-product-grid');
  if (shopGrid && shopGrid.children.length === 0) {
    initShopPage();
  }

  const detailTitle = document.getElementById('detail-title');
  if (detailTitle && (!detailTitle.textContent || detailTitle.textContent.trim() === '')) {
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

    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
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
  drawerItems.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
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
    const product = products.find(p => p.id === item.id);
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
  
  const product = products.find(p => p.id === productId);
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
  const bestsellersGrid = document.getElementById('picks-grid-container') || document.getElementById('bestsellers-grid');
  if (!bestsellersGrid) return;

  const bestsellers = products;
  
  bestsellersGrid.innerHTML = bestsellers.map(p => `
    <div class="pick-card">
      <a href="product.html?id=${p.id}" class="pick-card-link">
        <div class="pick-card-img-wrapper">
          <span class="pick-badge badge-blue">${p.isNew ? 'New Release' : p.isBestseller ? 'Bestseller' : 'Featured'}</span>
          <img src="${getProductImgSrc(p.image)}" alt="${p.name}">
        </div>
        <div class="pick-card-info">
          <span class="pick-card-category">${p.category}</span>
          <h3 class="pick-card-title">${p.name}</h3>
          <div class="pick-card-rating">
            ${getRatingStars(p.rating)}
            <span>(${p.reviewsCount})</span>
          </div>
          <div class="pick-card-footer">
            <div class="pick-card-price">$${p.price.toFixed(2)}</div>
            <button class="btn btn-primary pick-add-btn" onclick="event.preventDefault(); addToCart('${p.id}', 1, true)">Add to Bag</button>
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
  const shopGrid = document.getElementById('shop-products-grid');
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

  // Handle filtering
  const filterAndSort = () => {
    let filtered = [...products];

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

    // Apply Filter logic
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(p => activeFilters.category.includes(p.category));
    }

    if (activeFilters.spf.length > 0) {
      filtered = filtered.filter(p => {
        return activeFilters.spf.includes(String(p.spf));
      });
    }

    if (activeFilters.type.length > 0) {
      filtered = filtered.filter(p => {
        return activeFilters.type.some(val => p.type.toLowerCase().includes(val.toLowerCase()));
      });
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
          <p>No products match your filter selections. Try clearing filters.</p>
        </div>
      `;
      return;
    }

    shopGrid.innerHTML = items.map(p => `
      <div class="product-card animate-fade-in-up">
        ${p.isNew ? `<div class="product-card-badge new">New</div>` : p.isBestseller ? `<div class="product-card-badge">Bestseller</div>` : ''}
        <button class="product-card-wishlist" aria-label="Add to Wishlist"><i class="far fa-heart"></i></button>
        <div class="product-card-img">
          <a href="product.html?id=${p.id}">
            <img src="${p.image}" alt="${p.name}">
          </a>
          <button class="product-card-quickadd" onclick="event.preventDefault(); addToCart('${p.id}', 1, true)">Quick Add +</button>
        </div>
        <div class="product-card-info">
          <span class="product-card-type">${p.type}</span>
          <h3 class="product-card-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <div class="product-card-rating">
            ${getRatingStars(p.rating)}
            <span>(${p.reviewsCount})</span>
          </div>
          <div class="product-card-footer">
            <div class="product-card-price">$${p.price.toFixed(2)}</div>
            <span class="product-card-spf">Warranty: ${p.spf} Year${p.spf > 1 ? 's' : ''}</span>
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

  // If redirected with filter URL params
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    const cb = document.querySelector(`.filters-sidebar input[value="${categoryParam}"]`);
    if (cb) {
      cb.checked = true;
      filterAndSort();
    }
  }
}

// ==========================================================================
// 10. PRODUCT DETAILS DYNAMIC RENDERING
// ==========================================================================
function initProductDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get('id');

  if (!productId) {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const lastPart = pathParts.pop() || '';
    const found = products.find(p => p.id === lastPart || p.id.replace('_', '-') === lastPart || p.name.toLowerCase().includes(lastPart.replace(/-/g, ' ')));
    if (found) {
      productId = found.id;
    } else {
      productId = 'unseen'; // Default fallback product
    }
  }

  const product = products.find(p => p.id === productId) || products[0];

  if (!product) {
    return;
  }

  // SEO updates
  document.title = `${product.name} | Elevora Electronics`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${product.tagline} Buy now at Elevora Electronics website.`);
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
  if (productTagline) productTagline.textContent = product.tagline;
  if (productPrice) productPrice.textContent = `$${product.price.toFixed(2)}`;
  if (productRatingStars) productRatingStars.innerHTML = getRatingStars(product.rating);
  if (productReviewsCount) productReviewsCount.textContent = `(${product.reviewsCount} reviews)`;

  // Tabs Content
  const tabDesc = document.getElementById('tab-description');
  const tabIng = document.getElementById('tab-ingredients');
  const tabUsage = document.getElementById('tab-usage');
  const tabBenefits = document.getElementById('tab-benefits');

  if (tabDesc) tabDesc.innerHTML = `<p>${product.description}</p>`;
  if (tabIng) tabIng.innerHTML = `<p>${product.ingredients.replace(/\n/g, '<br>')}</p>`;
  if (tabUsage) tabUsage.innerHTML = `<p>${product.howToUse}</p>`;
  if (tabBenefits) {
    tabBenefits.innerHTML = `
      <ul>
        ${product.benefits.map(b => `<li><i class="fas fa-check" style="color:var(--color-accent); margin-right:8px;"></i> ${b}</li>`).join('')}
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
      // Remove active classes
      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      // Add active to current
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(`tab-${targetId}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // Render related products (Simple suggestion of other products)
  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid) {
    const related = products.filter(p => p.id !== product.id).slice(0, 3);
    relatedGrid.innerHTML = related.map(p => `
      <div class="product-card">
        ${p.isNew ? `<div class="product-card-badge new">New</div>` : p.isBestseller ? `<div class="product-card-badge">Bestseller</div>` : ''}
        <button class="product-card-wishlist" aria-label="Add to Wishlist"><i class="far fa-heart"></i></button>
        <div class="product-card-img">
          <a href="product.html?id=${p.id}">
            <img src="${p.image}" alt="${p.name}">
          </a>
          <button class="product-card-quickadd" onclick="event.preventDefault(); addToCart('${p.id}', 1, true)">Quick Add +</button>
        </div>
        <div class="product-card-info">
          <span class="product-card-type">${p.type}</span>
          <h3 class="product-card-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <div class="product-card-rating">
            ${getRatingStars(p.rating)}
            <span>(${p.reviewsCount})</span>
          </div>
          <div class="product-card-footer">
            <div class="product-card-price">$${p.price.toFixed(2)}</div>
            <span class="product-card-spf">Warranty: ${p.spf} Year${p.spf > 1 ? 's' : ''}</span>
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
  checkoutItems.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
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
    const product = products.find(p => p.id === item.id);
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
