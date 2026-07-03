// Elevora - Wishlist Controller (LocalStorage sync)

const WishlistKey = "elevora_wishlist";

// Retrieve wishlist product IDs
function getWishlist() {
  const data = localStorage.getItem(WishlistKey);
  return data ? JSON.parse(data) : [];
}

// Save wishlist product IDs
function saveWishlist(wishlist) {
  localStorage.setItem(WishlistKey, JSON.stringify(wishlist));
  updateWishlistBadges();
  // Dispatch event for other pages to react
  window.dispatchEvent(new Event("wishlistUpdated"));
}

// Add or remove product from wishlist
function toggleWishlist(productId) {
  productId = parseInt(productId);
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  let isAdded = false;

  if (index === -1) {
    wishlist.push(productId);
    isAdded = true;
    if (typeof showToast === "function") {
      showToast("Added to wishlist", "success");
    }
  } else {
    wishlist.splice(index, 1);
    isAdded = false;
    if (typeof showToast === "function") {
      showToast("Removed from wishlist", "info");
    }
  }

  saveWishlist(wishlist);
  updateWishlistUI(productId, isAdded);
  return isAdded;
}

// Sync active visual state on heart icons (e.g. after paginating or page load)
function updateWishlistUI(productId, isWishlisted) {
  const buttons = document.querySelectorAll(`.wishlist-toggle-btn[data-id="${productId}"]`);
  buttons.forEach(btn => {
    if (isWishlisted) {
      btn.classList.add("active");
      const icon = btn.querySelector("i");
      if (icon) icon.className = "fa-solid fa-heart";
    } else {
      btn.classList.remove("active");
      const icon = btn.querySelector("i");
      if (icon) icon.className = "fa-regular fa-heart";
    }
  });
}

// Update count badges on headers
function updateWishlistBadges() {
  const wishlist = getWishlist();
  const badges = document.querySelectorAll(".wishlist-count");
  badges.forEach(badge => {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? "flex" : "none";
  });
}

// Initialize active styles for all product cards currently on view
function syncWishlistStates() {
  const wishlist = getWishlist();
  // Reset all buttons first
  document.querySelectorAll(".wishlist-toggle-btn").forEach(btn => {
    btn.classList.remove("active");
    const icon = btn.querySelector("i");
    if (icon) icon.className = "fa-regular fa-heart";
  });

  // Highlight saved items
  wishlist.forEach(id => {
    updateWishlistUI(id, true);
  });
}

// Render dynamic items on ${getThemeUrl("wishlist")}
function renderWishlistPage() {
  const grid = document.getElementById("wishlist-grid");
  if (!grid) return;

  const wishlist = getWishlist();
  if (wishlist.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-wrap" style="grid-column: 1/-1; text-align: center; padding: 60px 0;">
        <i class="fa-regular fa-heart-broken" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 20px;"></i>
        <h3 style="font-size: 1.5rem; margin-bottom: 12px;">Your wishlist is empty</h3>
        <p style="color: var(--text-muted); margin-bottom: 24px;">Explore our catalog and save your favorite electronics here.</p>
        <a href="${getThemeUrl("shop")}" class="btn btn-primary" style="display: inline-flex; width: auto;">Start Shopping</a>
      </div>
    `;
    return;
  }

  // Load and render cards matching IDs
  let html = "";
  wishlist.forEach(id => {
    const p = ElevoraProducts.find(item => item.id === id);
    if (p) {
      const discountPercentage = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
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
              <button class="card-action-btn wishlist-toggle-btn active" data-id="${p.id}" onclick="toggleWishlist(${p.id})">
                <i class="fa-solid fa-heart"></i>
              </button>
              <button class="card-action-btn" onclick="openQuickView(${p.id})">
                <i class="fa-regular fa-eye"></i>
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
    }
  });

  grid.innerHTML = html;
}

// Helper: rating stars
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

// Run updates on load
document.addEventListener("DOMContentLoaded", () => {
  updateWishlistBadges();
  syncWishlistStates();
  renderWishlistPage();

  // Listen to wishlist updates to sync page if open elsewhere
  window.addEventListener("wishlistUpdated", () => {
    updateWishlistBadges();
    syncWishlistStates();
    renderWishlistPage();
  });
});
