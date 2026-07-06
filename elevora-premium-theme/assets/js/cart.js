// Elevora - Cart Controller (LocalStorage sync - New Design)

const CartKey = "elevora_cart";
const CouponKey = "elevora_applied_coupon";

function getCart() {
  const data = localStorage.getItem(CartKey);
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem(CartKey, JSON.stringify(cart));
  updateCartBadges();
  renderMiniCart();
  window.dispatchEvent(new Event("cartUpdated"));
}

function addToCart(productId, quantity = 1, color = "", silent = false) {
  productId = parseInt(productId);
  quantity = parseInt(quantity);
  
  const product = ElevoraProducts.find(p => p.id === productId);
  if (!product) return;

  if (!color && product.colors && product.colors.length > 0) {
    color = product.colors[0];
  }

  let cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.productId === productId && item.color === color);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      color: color
    });
  }

  saveCart(cart);

  // Trigger fly-to-cart particle animation
  const btn = document.querySelector(`.card-add-btn[onclick*="addToCart(${productId}"]`) || 
              document.querySelector(`.btn-primary[onclick*="addToCart(${productId}"]`) ||
              document.querySelector(`.btn-primary[onclick*="addToCart"]`) ||
              document.getElementById("quickview-add-to-cart-btn");
  if (btn && product.images && product.images.length > 0 && typeof animateFlyToCart === "function") {
    animateFlyToCart(btn, product.images[0]);
  }

  if (typeof showToast === "function") {
    showToast(`Added ${product.name} (${color}) to cart`, "success");
  }

  if (!silent) {
    setTimeout(() => {
      openMiniCartDrawer();
    }, 800); // Open drawer slightly after animation completes
  }
}

function removeFromCart(productId, color) {
  productId = parseInt(productId);
  let cart = getCart();
  cart = cart.filter(item => !(item.productId === productId && item.color === color));
  saveCart(cart);
  if (typeof showToast === "function") {
    showToast("Removed item from cart", "info");
  }
}

function updateQuantity(productId, color, newQty) {
  productId = parseInt(productId);
  newQty = parseInt(newQty);
  if (newQty < 1) return;

  let cart = getCart();
  const index = cart.findIndex(item => item.productId === productId && item.color === color);

  if (index > -1) {
    cart[index].quantity = newQty;
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem(CartKey);
  localStorage.removeItem(CouponKey);
  updateCartBadges();
  renderMiniCart();
  window.dispatchEvent(new Event("cartUpdated"));
}

function getCartItemsCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartBadges() {
  const count = getCartItemsCount();
  const badges = document.querySelectorAll(".cart-count");
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

function openMiniCartDrawer() {
  const overlay = document.getElementById("cart-drawer-overlay");
  if (overlay) overlay.classList.add("open");
}

function closeMiniCartDrawer() {
  const overlay = document.getElementById("cart-drawer-overlay");
  if (overlay) overlay.classList.remove("open");
}

function renderMiniCart() {
  const drawerItems = document.getElementById("cart-drawer-items");
  const subtotalVal = document.getElementById("cart-drawer-subtotal");
  const checkoutBtn = document.getElementById("mini-cart-checkout-btn");

  if (!drawerItems) return;

  const cart = getCart();
  if (cart.length === 0) {
    drawerItems.innerHTML = `
      <div class="empty-mini-cart" style="text-align: center; padding: 40px 0; color: var(--text-muted);">
        <i class="fa-solid fa-shopping-bag" style="font-size: 2.5rem; margin-bottom: 16px; opacity: 0.4; color: var(--accent);"></i>
        <p>Your shopping cart is empty.</p>
        <a href="${getThemeUrl("shop")}" class="btn btn-secondary" style="margin-top: 20px; font-size: 0.8rem; padding: 10px 18px;" onclick="closeMiniCartDrawer()">Shop Now</a>
      </div>
    `;
    if (subtotalVal) subtotalVal.textContent = "$0.00";
    if (checkoutBtn) checkoutBtn.style.display = "none";
    return;
  }

  if (checkoutBtn) checkoutBtn.style.display = "block";

  let html = "";
  let subtotal = 0;

  cart.forEach(item => {
    const p = ElevoraProducts.find(prod => prod.id === item.productId);
    if (p) {
      const price = p.price;
      const itemSubtotal = price * item.quantity;
      subtotal += itemSubtotal;

      html += `
        <div class="cart-drawer-item">
          <div class="cart-item-img">
            <img src="${p.images[0]}" alt="${p.name}">
          </div>
          <div class="cart-item-info">
            <h5 class="cart-item-name"><a href="${getThemeUrl("product")}?id=${p.id}">${p.name}</a></h5>
            <div class="cart-item-variant">Variant: ${item.color}</div>
            <div class="cart-item-price-row">
              <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateQuantity(${p.id}, '${item.color}', ${item.quantity - 1})">-</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${p.id}, '${item.color}', ${item.quantity + 1})">+</button>
              </div>
              <span class="price">$${price.toFixed(2)}</span>
            </div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${p.id}, '${item.color}')">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;
    }
  });

  drawerItems.innerHTML = html;
  if (subtotalVal) subtotalVal.textContent = `$${subtotal.toFixed(2)}`;
}

function renderCartPage() {
  const itemsContainer = document.getElementById("cart-items-container");
  if (!itemsContainer) return;

  const cart = getCart();
  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 80px 24px; border: 1.5px dashed var(--border-color); border-radius: var(--border-radius-lg); background: var(--bg-secondary);">
        <i class="fa-solid fa-shopping-cart" style="font-size: 3.5rem; color: var(--accent); margin-bottom: 24px; opacity: 0.5;"></i>
        <h2 style="font-family: Outfit; font-size: 1.5rem; margin-bottom: 12px;">Your shopping cart is empty</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">Explore our futuristic store and add smart devices to get started.</p>
        <a href="${getThemeUrl("shop")}" class="btn btn-primary" style="display: inline-flex; width: auto;">Browse Products</a>
      </div>
    `;
    updateCartSummaryPanel(0);
    return;
  }

  let html = `
    <div class="cart-table-header" style="display: grid; grid-template-columns: 3.5fr 1fr 1fr 1fr; padding-bottom: 15px; border-bottom: 1.5px solid var(--border-color); font-weight: 700; font-family: 'Outfit'; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">
      <div>Product</div>
      <div style="text-align: center;">Price</div>
      <div style="text-align: center;">Quantity</div>
      <div style="text-align: right;">Total</div>
    </div>
  `;

  let subtotal = 0;

  cart.forEach(item => {
    const p = ElevoraProducts.find(prod => prod.id === item.productId);
    if (p) {
      const price = p.price;
      const total = price * item.quantity;
      subtotal += total;

      html += `
        <div class="cart-row" style="display: grid; grid-template-columns: 3.5fr 1fr 1fr 1fr; align-items: center; padding: 24px 0; border-bottom: 1px solid var(--border-color); transition: background-color var(--transition-fast);">
          <div class="cart-cell product-cell" style="display: flex; gap: 20px; align-items: center;">
            <div class="cart-item-img" style="width: 90px; height: 90px; background:#fff; padding:6px;">
              <img src="${p.images[0]}" alt="${p.name}" style="border-radius: var(--border-radius-sm);">
            </div>
            <div>
              <h4 style="font-family: Outfit; font-size: 1rem; font-weight: 700; margin-bottom: 4px;"><a href="${getThemeUrl("product")}?id=${p.id}">${p.name}</a></h4>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">Color: ${item.color}</div>
              <button onclick="removeFromCart(${p.id}, '${item.color}')" style="color: var(--danger); font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; cursor:pointer;">
                <i class="fa-regular fa-trash-can"></i> Remove
              </button>
            </div>
          </div>
          <div class="cart-cell" style="text-align: center; font-weight: 600; font-family: 'Outfit'; color: var(--text-secondary);">$${price.toFixed(2)}</div>
          <div class="cart-cell" style="display: flex; justify-content: center;">
            <div class="cart-item-qty" style="background-color: var(--bg-tertiary);">
              <button class="qty-btn" onclick="updateQuantity(${p.id}, '${item.color}', ${item.quantity - 1})">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="updateQuantity(${p.id}, '${item.color}', ${item.quantity + 1})">+</button>
            </div>
          </div>
          <div class="cart-cell" style="text-align: right; font-weight: 700; font-family: 'Outfit'; color: var(--text-primary);">$${total.toFixed(2)}</div>
        </div>
      `;
    }
  });

  itemsContainer.innerHTML = html;
  updateCartSummaryPanel(subtotal);
}

function updateCartSummaryPanel(subtotal) {
  const subtotalEl = document.getElementById("cart-summary-subtotal");
  const discountEl = document.getElementById("cart-summary-discount");
  const shippingEl = document.getElementById("cart-summary-shipping");
  const totalEl = document.getElementById("cart-summary-total");

  if (!subtotalEl) return;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 9.99;
  if (shippingEl) {
    shippingEl.textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
  }

  const appliedCoupon = localStorage.getItem(CouponKey);
  let discount = 0;
  if (appliedCoupon === "ELEVORA20" && subtotal > 0) {
    discount = subtotal * 0.20;
    if (discountEl) {
      discountEl.textContent = `-$${discount.toFixed(2)} (20% OFF)`;
      discountEl.parentElement.style.display = "flex";
    }
  } else {
    if (discountEl) {
      discountEl.parentElement.style.display = "none";
    }
  }

  const grandTotal = subtotal - discount + shipping;
  if (totalEl) {
    totalEl.textContent = `$${grandTotal.toFixed(2)}`;
  }
}

function applyPromoCoupon() {
  const couponInput = document.getElementById("coupon-code-input");
  if (!couponInput) return;

  const code = couponInput.value.trim().toUpperCase();
  if (code === "ELEVORA20") {
    localStorage.setItem(CouponKey, "ELEVORA20");
    if (typeof showToast === "function") {
      showToast("Coupon ELEVORA20 applied! 20% discount activated.", "success");
    }
    renderCartPage();
  } else if (code === "") {
    if (typeof showToast === "function") {
      showToast("Please enter a coupon code", "warning");
    }
  } else {
    if (typeof showToast === "function") {
      showToast("Invalid coupon code", "error");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadges();
  renderMiniCart();
  renderCartPage();

  const overlay = document.getElementById("cart-drawer-overlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeMiniCartDrawer();
      }
    });
  }

  window.addEventListener("cartUpdated", () => {
    updateCartBadges();
    renderMiniCart();
    renderCartPage();
  });
});
