// js/wishlist.js
// Wishlist controller: LocalStorage state sync, wishlist toggling, and move-to-cart helpers.

function getWishlist() {
  return JSON.parse(localStorage.getItem('elevora_wishlist') || '[]');
}

function saveWishlist(wishlist) {
  localStorage.setItem('elevora_wishlist', JSON.stringify(wishlist));
  if (typeof updateHeaderCounters === 'function') {
    updateHeaderCounters();
  }
}

// Toggle product in wishlist (adds if missing, removes if present)
async function toggleWishlist(productId) {
  const product = await getProductById(productId);
  if (!product) return;

  let wishlist = getWishlist();
  const index = wishlist.findIndex(item => item.id === product.id);

  if (index > -1) {
    wishlist = wishlist.filter(item => item.id !== product.id);
    saveWishlist(wishlist);
    showNotification(`${product.name} removed from wishlist.`, 'info');
  } else {
    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      badge: product.badge,
      badgeType: product.badgeType
    });
    saveWishlist(wishlist);
    showNotification(`${product.name} added to wishlist.`, 'success');
  }

  // Dispatch global event to update list in wishlist.html if active
  window.dispatchEvent(new Event('wishlistUpdated'));
}

// Check if item is in wishlist
function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === parseInt(productId));
}

// Move wishlist item directly to shopping cart
async function moveWishlistToCart(productId) {
  let wishlist = getWishlist();
  const item = wishlist.find(w => w.id === parseInt(productId));
  if (item) {
    // Add to cart with default color
    await addToCart(item.id, null, 1);
    // Remove from wishlist
    wishlist = wishlist.filter(w => w.id !== item.id);
    saveWishlist(wishlist);
    window.dispatchEvent(new Event('wishlistUpdated'));
  }
}
