// js/filters.js
// Shop filters manager: handles grid/list layouts, sidebar filters (category, brand, price),
// sorting orders, comparison checklist (up to 5 items), and quick-view modal injectors.

let activeProducts = [];
let layoutMode = 'grid'; // 'grid' or 'list'
let compareList = [];

// Initialize Shop Catalog
async function initShop() {
  activeProducts = await getProducts();
  
  // URL Queries checks
  const params = new URLSearchParams(window.location.search);
  const searchParam = params.get('search');
  const catParam = params.get('category');
  
  if (searchParam) {
    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) searchInput.value = searchParam;
  }
  
  if (catParam) {
    // Check corresponding category checkbox
    const chk = document.querySelector(`.category-filter[value="${catParam}"]`);
    if (chk) chk.checked = true;
  }

  // Setup event triggers
  setupFilterEvents();
  renderCatalog();
}

function setupFilterEvents() {
  // Grid / List Toggles
  const gridBtn = document.getElementById('layout-grid-btn');
  const listBtn = document.getElementById('layout-list-btn');

  if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => {
      layoutMode = 'grid';
      gridBtn.classList.add('text-blue-600', 'dark:text-cyan-400');
      listBtn.classList.remove('text-blue-600', 'dark:text-cyan-400');
      renderCatalog();
    });

    listBtn.addEventListener('click', () => {
      layoutMode = 'list';
      listBtn.classList.add('text-blue-600', 'dark:text-cyan-400');
      gridBtn.classList.remove('text-blue-600', 'dark:text-cyan-400');
      renderCatalog();
    });
  }

  // Bind Sidebar Inputs
  const filterInputs = document.querySelectorAll('.category-filter, .brand-filter, .rating-filter, #price-min, #price-max, #price-slider, #sort-select, #shop-search-input');
  filterInputs.forEach(input => {
    input.addEventListener('change', () => renderCatalog());
    if (input.tagName === 'INPUT' && input.type === 'text') {
      input.addEventListener('input', () => renderCatalog());
    }
  });

  // Price slider synchronization
  const slider = document.getElementById('price-slider');
  const priceMax = document.getElementById('price-max');
  if (slider && priceMax) {
    slider.addEventListener('input', (e) => {
      priceMax.value = e.target.value;
      renderCatalog();
    });
  }
}

// Main Filtering and Sorting
function renderCatalog() {
  const container = document.getElementById('catalog-grid-container');
  if (!container) return;

  // 1. Gather active inputs
  const searchVal = (document.getElementById('shop-search-input')?.value || '').toLowerCase();
  
  const checkedCats = Array.from(document.querySelectorAll('.category-filter:checked')).map(el => el.value);
  const checkedBrands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(el => el.value);
  const minPrice = parseFloat(document.getElementById('price-min')?.value || '0');
  const maxPrice = parseFloat(document.getElementById('price-max')?.value || '1000');
  
  const selectedRating = parseFloat(Array.from(document.querySelectorAll('.rating-filter:checked')).map(el => el.value)[0] || '0');
  const sortVal = document.getElementById('sort-select')?.value || 'featured';

  // 2. Filter products list
  let list = [...activeProducts];
  
  // Custom Seller products additions (if exist in localStorage)
  const customSellerProds = JSON.parse(localStorage.getItem('elevora_seller_products') || '[]');
  list = [...list, ...customSellerProds];

  if (searchVal) {
    list = list.filter(p => p.name.toLowerCase().includes(searchVal) || p.description.toLowerCase().includes(searchVal));
  }

  if (checkedCats.length > 0) {
    list = list.filter(p => checkedCats.includes(p.category));
  }

  if (checkedBrands.length > 0) {
    list = list.filter(p => checkedBrands.includes(p.brand));
  }

  list = list.filter(p => p.price >= minPrice && p.price <= maxPrice);

  if (selectedRating > 0) {
    list = list.filter(p => p.rating >= selectedRating);
  }

  // 3. Sort products list
  if (sortVal === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortVal === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortVal === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  // 4. Render Layout
  container.innerHTML = '';
  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-20">
        <i class="fas fa-search text-5xl text-gray-300 dark:text-slate-700 mb-4 block"></i>
        <h3 class="text-lg font-bold font-accent mb-2">No Match Found</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400">Try adjusting your filters or search keywords</p>
      </div>
    `;
    return;
  }

  list.forEach(prod => {
    const card = document.createElement('div');
    
    let badgeHtml = '';
    if (prod.badge) {
      let colorClass = 'bg-blue-600';
      if (prod.badgeType === 'new') colorClass = 'bg-cyan-500';
      if (prod.badgeType === 'hot') colorClass = 'bg-purple-600';
      badgeHtml = `<span class="absolute top-4 left-4 text-[9px] font-bold text-white px-3 py-1 rounded-full uppercase tracking-wider ${colorClass} z-10">${prod.badge}</span>`;
    }

    const isInWish = typeof isInWishlist === 'function' && isInWishlist(prod.id);
    const wishIcon = isInWish ? 'fas fa-heart text-red-500' : 'far fa-heart';

    if (layoutMode === 'grid') {
      card.className = 'glass rounded-3xl overflow-hidden flex flex-col justify-between product-card relative animate-fade-in-up';
      card.innerHTML = `
        <div class="relative">
          ${badgeHtml}
          <!-- Wishlist toggle -->
          <button onclick="toggleWishlist(${prod.id}); this.querySelector('i').className = isInWishlist(${prod.id}) ? 'fas fa-heart text-red-500' : 'far fa-heart'" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-white/80 dark:bg-slate-900/80 w-8 h-8 rounded-full flex items-center justify-center shadow transition z-10"><i class="${wishIcon} text-sm"></i></button>
          
          <a href="/product?id=${prod.id}">
            <img src="${prod.images[0]}" alt="${prod.name}" class="w-full h-48 object-cover">
          </a>
          
          <div class="p-6 space-y-2">
            <div class="flex items-center justify-between text-[10px] text-gray-400">
              <span>${prod.brand}</span>
              <span class="flex items-center"><i class="fas fa-star text-yellow-400 mr-1"></i> ${prod.rating}</span>
            </div>
            <h3 class="font-bold text-sm font-accent tracking-tight leading-snug"><a href="/product?id=${prod.id}" class="hover:text-blue-500 transition">${prod.name}</a></h3>
            <p class="text-slate-800 dark:text-white font-extrabold text-sm" data-price="${prod.price}">${formatPrice(prod.price)}</p>
          </div>
        </div>

        <div class="px-6 pb-6 pt-2 flex space-x-2">
          <button onclick="openQuickView(${prod.id})" class="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-[10px] font-bold py-2.5 rounded-xl transition">Quick View</button>
          <button onclick="addToCart(${prod.id}, null, 1)" class="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-2.5 rounded-xl transition"><i class="fas fa-shopping-bag"></i></button>
          <button onclick="toggleCompare(${prod.id})" class="border border-gray-200 dark:border-slate-800 text-gray-400 hover:text-cyan-500 text-[10px] font-bold px-3 py-2.5 rounded-xl transition"><i class="fas fa-columns"></i></button>
        </div>
      `;
    } else {
      // List Layout
      card.className = 'glass rounded-3xl overflow-hidden flex flex-col md:flex-row items-center product-card relative animate-fade-in-up p-4 gap-6';
      card.innerHTML = `
        ${badgeHtml}
        <a href="/product?id=${prod.id}" class="w-full md:w-48 h-36 flex-shrink-0 rounded-2xl overflow-hidden">
          <img src="${prod.images[0]}" alt="${prod.name}" class="w-full h-full object-cover">
        </a>
        
        <div class="flex-1 space-y-2">
          <div class="flex items-center justify-between text-[10px] text-gray-400">
            <span>${prod.brand} &bull; ${prod.category}</span>
            <span class="flex items-center"><i class="fas fa-star text-yellow-400 mr-1"></i> ${prod.rating} (${prod.reviewsCount} reviews)</span>
          </div>
          <h3 class="font-bold text-base font-accent tracking-tight leading-snug"><a href="/product?id=${prod.id}" class="hover:text-blue-500 transition">${prod.name}</a></h3>
          <p class="text-gray-500 dark:text-gray-400 text-xs line-clamp-2">${prod.description}</p>
          <p class="text-slate-800 dark:text-white font-extrabold text-base" data-price="${prod.price}">${formatPrice(prod.price)}</p>
        </div>

        <div class="flex flex-row md:flex-col gap-2 w-full md:w-auto">
          <button onclick="addToCart(${prod.id}, null, 1)" class="flex-1 md:w-36 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center"><i class="fas fa-shopping-bag mr-2"></i> Buy</button>
          <button onclick="openQuickView(${prod.id})" class="flex-1 md:w-36 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold py-3 rounded-xl transition">Quick View</button>
          <button onclick="toggleCompare(${prod.id})" class="border border-gray-200 dark:border-slate-800 text-gray-400 hover:text-cyan-500 text-xs font-bold py-3 px-4 rounded-xl transition"><i class="fas fa-columns"></i> Compare</button>
        </div>
      `;
    }
    container.appendChild(card);
  });

  // Apply converted pricing texts
  if (typeof applyCurrencies === 'function') {
    applyCurrencies();
  }
}

// Quick View Modal System
async function openQuickView(id) {
  const prod = await getProductById(id);
  if (!prod) return;

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center modal-overlay';
  modal.innerHTML = `
    <div class="glass-heavy max-w-2xl w-full rounded-3xl p-8 relative border border-white/20 shadow-2xl flex flex-col md:flex-row gap-6 animate-fade-in-up mx-4">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white z-10" onclick="this.closest('.fixed').remove()">
        <i class="fas fa-times text-lg"></i>
      </button>

      <!-- Images Slider Mock -->
      <div class="w-full md:w-1/2 space-y-4">
        <img src="${prod.images[0]}" alt="${prod.name}" class="w-full h-56 object-cover rounded-2xl border border-gray-100 dark:border-slate-800">
        <div class="flex space-x-2 overflow-x-auto">
          ${prod.images.map(img => `<img src="${img}" class="w-12 h-12 rounded-lg object-cover cursor-pointer border border-gray-200">`).join('')}
        </div>
      </div>

      <!-- Content -->
      <div class="w-full md:w-1/2 flex flex-col justify-between space-y-4">
        <div class="space-y-2">
          <span class="text-blue-500 text-[10px] uppercase font-bold tracking-widest">${prod.brand}</span>
          <h3 class="text-lg font-bold font-accent leading-snug">${prod.name}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-3">${prod.description}</p>
          <p class="text-blue-600 dark:text-cyan-400 font-extrabold text-lg" data-price="${prod.price}">${formatPrice(prod.price)}</p>
        </div>

        <!-- Add to cart -->
        <button onclick="addToCart(${prod.id}, null, 1); this.closest('.fixed').remove()" class="w-full bg-gradient-premium bg-gradient-premium-hover text-white text-xs font-bold py-3.5 rounded-xl btn-premium">
          Add To Cart
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  if (typeof applyCurrencies === 'function') {
    applyCurrencies();
  }
}

// Compare System (Up to 5 items)
async function toggleCompare(id) {
  const prod = await getProductById(id);
  if (!prod) return;

  const idx = compareList.findIndex(p => p.id === prod.id);
  if (idx > -1) {
    compareList = compareList.filter(p => p.id !== prod.id);
    showNotification(`${prod.name} removed from comparison list`, 'info');
  } else {
    if (compareList.length >= 5) {
      showNotification('You can compare a maximum of 5 products side-by-side.', 'error');
      return;
    }
    compareList.push(prod);
    showNotification(`${prod.name} added to comparison list`, 'success');
  }

  renderCompareWidget();
}

function renderCompareWidget() {
  const existing = document.getElementById('compare-floating-widget');
  if (existing) existing.remove();

  if (compareList.length === 0) return;

  const widget = document.createElement('div');
  widget.id = 'compare-floating-widget';
  widget.className = 'fixed bottom-24 left-6 z-40 glass p-4 rounded-3xl border border-white/20 shadow-2xl flex items-center space-x-4 max-w-sm w-full animate-fade-in-up';
  widget.innerHTML = `
    <div class="flex-1 space-y-1">
      <h4 class="font-bold text-xs font-accent text-slate-800 dark:text-white">Compare Items (${compareList.length})</h4>
      <div class="flex -space-x-2">
        ${compareList.map(p => `<img src="${p.images[0]}" class="w-8 h-8 rounded-full object-cover border-2 border-[#FCFCFD] dark:border-darkBg" title="${p.name}">`).join('')}
      </div>
    </div>
    <button onclick="openCompareModal()" class="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-4 py-2.5 rounded-xl transition">Compare Now</button>
  `;
  document.body.appendChild(widget);
}

function openCompareModal() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center modal-overlay';
  
  // Headers row
  let headerCells = compareList.map(p => `
    <th class="px-4 py-4 text-center border-r border-gray-100 dark:border-slate-800">
      <img src="${p.images[0]}" class="w-16 h-16 rounded-xl object-cover mx-auto mb-2">
      <h4 class="font-bold text-xs font-accent leading-snug line-clamp-2">${p.name}</h4>
      <button onclick="toggleCompare(${p.id}); this.closest('.fixed').remove(); openCompareModal()" class="text-red-500 hover:text-red-600 text-[10px] font-bold mt-2"><i class="fas fa-trash-alt mr-1"></i> Remove</button>
    </th>
  `).join('');

  let priceCells = compareList.map(p => `<td class="px-4 py-3 border-r border-gray-100 dark:border-slate-800 text-center font-bold" data-price="${p.price}">${formatPrice(p.price)}</td>`).join('');
  let brandCells = compareList.map(p => `<td class="px-4 py-3 border-r border-gray-100 dark:border-slate-800 text-center text-gray-500">${p.brand}</td>`).join('');
  let ratingCells = compareList.map(p => `<td class="px-4 py-3 border-r border-gray-100 dark:border-slate-800 text-center font-semibold"><i class="fas fa-star text-yellow-400 mr-1"></i> ${p.rating}</td>`).join('');
  
  // Gathering all distinct specs keys from compared products
  let allSpecsKeys = [];
  compareList.forEach(p => {
    Object.keys(p.specs || {}).forEach(k => {
      if (!allSpecsKeys.includes(k)) allSpecsKeys.push(k);
    });
  });

  let specsRows = allSpecsKeys.map(k => {
    let cells = compareList.map(p => {
      const val = p.specs[k] || '-';
      return `<td class="px-4 py-3 border-r border-gray-100 dark:border-slate-800 text-center text-gray-500">${val}</td>`;
    }).join('');
    
    return `
      <tr class="border-b border-gray-100 dark:border-slate-800">
        <td class="px-4 py-3 font-semibold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-800/40">${k}</td>
        ${cells}
      </tr>
    `;
  }).join('');

  modal.innerHTML = `
    <div class="glass-heavy max-w-4xl w-full rounded-3xl p-8 relative border border-white/20 shadow-2xl overflow-hidden animate-fade-in-up mx-4">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white z-10" onclick="this.closest('.fixed').remove()">
        <i class="fas fa-times text-lg"></i>
      </button>
      <h3 class="text-xl font-bold font-accent mb-6 text-center">Product Comparison Matrix</h3>
      
      <div class="overflow-x-auto w-full">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-slate-800 text-xs border border-gray-100 dark:border-slate-800">
          <thead class="bg-gray-50 dark:bg-slate-800/40">
            <tr>
              <th class="px-4 py-4 text-left border-r border-gray-100 dark:border-slate-800 font-bold bg-slate-100 dark:bg-slate-800">Spec / Feature</th>
              ${headerCells}
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-slate-800">
            <tr class="border-b border-gray-100 dark:border-slate-800">
              <td class="px-4 py-3 font-semibold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-800/40">Price</td>
              ${priceCells}
            </tr>
            <tr class="border-b border-gray-100 dark:border-slate-800">
              <td class="px-4 py-3 font-semibold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-800/40">Brand</td>
              ${brandCells}
            </tr>
            <tr class="border-b border-gray-100 dark:border-slate-800">
              <td class="px-4 py-3 font-semibold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-800/40">Rating</td>
              ${ratingCells}
            </tr>
            ${specsRows}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  if (typeof applyCurrencies === 'function') {
    applyCurrencies();
  }
}
