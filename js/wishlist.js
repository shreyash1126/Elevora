// Wishlist Controller - Purged of Elevora animations and styles

const WishlistKey = "elevora_wishlist";

function getWishlist() {
  const data = localStorage.getItem(WishlistKey);
  return data ? JSON.parse(data) : [];
}

function saveWishlist(wishlist) {
  localStorage.setItem(WishlistKey, JSON.stringify(wishlist));
  updateWishlistBadges();
  window.dispatchEvent(new Event("wishlistUpdated"));
}

function toggleWishlist(productId) {
  productId = parseInt(productId);
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  let isAdded = false;

  const product = ElevoraProducts.find(p => p.id === productId);
  if (!product) return false;

  if (index === -1) {
    wishlist.push(productId);
    isAdded = true;
    if (typeof showToast === "function") {
      showToast("Saved to wishlist", "success");
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

function updateWishlistBadges() {
  const wishlist = getWishlist();
  const badges = document.querySelectorAll(".wishlist-count");
  badges.forEach(badge => {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? "inline-block" : "none";
  });
}

function syncWishlistStates() {
  const wishlist = getWishlist();
  document.querySelectorAll(".wishlist-toggle-btn").forEach(btn => {
    btn.classList.remove("active");
    const icon = btn.querySelector("i");
    if (icon) icon.className = "fa-regular fa-heart";
  });

  wishlist.forEach(id => {
    updateWishlistUI(id, true);
  });
}

function renderWishlistPage() {
  const grid = document.getElementById("wishlist-grid");
  if (!grid) return;

  const wishlist = getWishlist();
  if (wishlist.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; border: 1px dashed var(--border-color); border-radius: var(--border-radius-md);">
        <p>Your wishlist is empty.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top: 16px;">Browse Shop</a>
      </div>
    `;
    return;
  }

  let html = "";
  wishlist.forEach(id => {
    const p = ElevoraProducts.find(item => item.id === id);
    if (p) {
      html += `
        <div class="product-card" data-id="${p.id}">
          <div class="card-media">
            <a href="product.html?id=${p.id}">
              <img src="${p.images[0]}" alt="${p.name}">
            </a>
            <div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 8px;">
              <button class="wishlist-toggle-btn active" data-id="${p.id}" onclick="toggleWishlist(${p.id})" style="border:none; background:none; cursor:pointer; font-size:1.2rem;"><i class="fa-solid fa-heart"></i></button>
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
    }
  });

  grid.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  updateWishlistBadges();
  syncWishlistStates();
  renderWishlistPage();

  window.addEventListener("wishlistUpdated", () => {
    updateWishlistBadges();
    syncWishlistStates();
    renderWishlistPage();
  });
});
