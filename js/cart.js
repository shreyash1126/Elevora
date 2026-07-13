// js/cart.js
// Cart controller: LocalStorage state sync, item addition, count adjustment,
// coupon application, subtotal/shipping/tax calculation, and save-for-later actions.

// Get current cart array
function getCart() {
  return JSON.parse(localStorage.getItem('elevora_cart') || '[]');
}

// Save cart to local storage and update header numbers
function saveCart(cart) {
  localStorage.setItem('elevora_cart', JSON.stringify(cart));
  if (typeof updateHeaderCounters === 'function') {
    updateHeaderCounters();
  }
}

// Add product to cart with custom variant color
async function addToCart(productId, color, quantity = 1) {
  const product = await getProductById(productId);
  if (!product) {
    showNotification('Product not found in catalogue', 'error');
    return;
  }

  let cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id && item.color === color);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: color || product.colors[0],
      quantity: quantity
    });
  }

  saveCart(cart);
  showNotification(`${product.name} (${color || product.colors[0]}) added to cart.`, 'success');
  
  // Custom event trigger to refresh cart table page if it is active
  window.dispatchEvent(new Event('cartUpdated'));
}

// Remove item from cart array
function removeFromCart(productId, color) {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === parseInt(productId) && item.color === color));
  saveCart(cart);
  showNotification('Item removed from cart', 'info');
  window.dispatchEvent(new Event('cartUpdated'));
}

// Adjust quantity by +/- delta value
function updateQuantity(productId, color, delta) {
  let cart = getCart();
  const idx = cart.findIndex(item => item.id === parseInt(productId) && item.color === color);
  if (idx > -1) {
    cart[idx].quantity += delta;
    if (cart[idx].quantity <= 0) {
      cart = cart.filter((_, i) => i !== idx);
      showNotification('Item removed from cart', 'info');
    }
    saveCart(cart);
    window.dispatchEvent(new Event('cartUpdated'));
  }
}

// Coupon validation
const AVAILABLE_COUPONS = {
  'ELEVORA20': { type: 'percent', value: 20 },
  'WELCOME10': { type: 'percent', value: 10 },
  'SUPERSAVE': { type: 'fixed', value: 15 }
};

function checkCoupon(code) {
  const parsed = code.trim().toUpperCase();
  if (AVAILABLE_COUPONS[parsed]) {
    localStorage.setItem('elevora_active_coupon', parsed);
    return { valid: true, details: AVAILABLE_COUPONS[parsed] };
  }
  return { valid: false };
}

// Calculate pricing totals
function calculateCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Tax: 8%
  const tax = subtotal * 0.08;
  
  // Discount
  let discount = 0;
  const activeCoupon = localStorage.getItem('elevora_active_coupon');
  if (activeCoupon && AVAILABLE_COUPONS[activeCoupon]) {
    const cp = AVAILABLE_COUPONS[activeCoupon];
    if (cp.type === 'percent') {
      discount = subtotal * (cp.value / 100);
    } else if (cp.type === 'fixed') {
      discount = cp.value;
    }
  }

  // Gift wrap option ($3.99 flat)
  const isGiftWrap = localStorage.getItem('elevora_gift_wrap') === 'true';
  const giftWrapCharge = isGiftWrap ? 3.99 : 0.0;

  // Shipping charge: $10 base, free above $150 or if subtotal is 0
  let shipping = 0;
  if (subtotal > 0 && subtotal < 150) {
    shipping = 10.00;
  }

  const total = Math.max(0, subtotal + tax + giftWrapCharge + shipping - discount);

  return {
    subtotal,
    tax,
    discount,
    shipping,
    giftWrapCharge,
    total
  };
}
