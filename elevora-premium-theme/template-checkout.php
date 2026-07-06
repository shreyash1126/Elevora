<?php
/**
 * Template Name: Elevora Checkout Portal
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>">Cart</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Secure Portal</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Secure Checkout</h1>
    </div>
  </section>

  <!-- Checkout split -->
  <main class="container" style="display: grid; grid-template-columns: 1.8fr 1fr; gap: 40px; margin-bottom: 80px;">
    
    <!-- Billing Details form -->
    <div class="auth-card" style="max-width: 100%;">
      <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.25rem; margin-bottom: 24px; border-bottom: 1.5px solid var(--border-color); padding-bottom: 12px;">Billing & Address</h3>
      <form class="auth-form" onsubmit="event.preventDefault(); triggerOrderSuccessRedirect();">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="auth-input-group">
            <label>First Name</label>
            <input type="text" class="auth-input" required placeholder="Jane">
          </div>
          <div class="auth-input-group">
            <label>Last Name</label>
            <input type="text" class="auth-input" required placeholder="Doe">
          </div>
        </div>
        
        <div class="auth-input-group">
          <label>Delivery Address</label>
          <input type="text" class="auth-input" required placeholder="123 Silicon Valley Road">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="auth-input-group">
            <label>City</label>
            <input type="text" class="auth-input" required placeholder="Tech City">
          </div>
          <div class="auth-input-group">
            <label>Postal Code</label>
            <input type="text" class="auth-input" required placeholder="94025">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="auth-input-group">
            <label>Email Address</label>
            <input type="email" class="auth-input" required placeholder="jane@example.com">
          </div>
          <div class="auth-input-group">
            <label>Contact Phone</label>
            <input type="tel" class="auth-input" required placeholder="+1 (555) 019-2834">
          </div>
        </div>

        <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.25rem; margin-top: 20px; margin-bottom: 16px; border-bottom: 1.5px solid var(--border-color); padding-bottom: 12px;">Secure Payment Channels</h3>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 10px;">
          <label style="display: flex; align-items: center; gap: 12px; padding: 14px 20px; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); background: var(--bg-primary); cursor: pointer;">
            <input type="radio" name="payment_method" value="stripe" checked>
            <span style="font-weight: 700;">Debit / Credit Card (Stripe Gateway)</span>
          </label>
          <label style="display: flex; align-items: center; gap: 12px; padding: 14px 20px; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); background: var(--bg-primary); cursor: pointer;">
            <input type="radio" name="payment_method" value="paypal">
            <span style="font-weight: 700;">PayPal Express Node</span>
          </label>
        </div>

        <button type="submit" class="auth-btn" style="height: 50px;">Submit Order Protocol</button>
      </form>
    </div>

    <!-- Cart items preview list -->
    <div>
      <div class="auth-card" style="max-width: 100%;">
        <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.25rem; margin-bottom: 24px; border-bottom: 1.5px solid var(--border-color); padding-bottom: 12px;">Summary Preview</h3>
        <div id="checkout-summary-items-list" style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
          <!-- Loaded dynamically -->
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem; border-top: 1.5px solid var(--border-color); padding-top: 20px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Subtotal</span>
            <span style="font-weight: 700;" id="chk-subtotal">$0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; display: none;" id="chk-discount-row">
            <span style="color: var(--text-secondary);">Coupon Discount</span>
            <span style="font-weight: 700; color: var(--danger);" id="chk-discount">-$0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Delivery Shipping</span>
            <span style="font-weight: 700; color: var(--success);" id="chk-shipping">FREE</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1.5px solid var(--border-color); padding-top: 12px; font-family: Outfit; font-size: 1.15rem; font-weight: 800; color: var(--accent);">
            <span>Order Total</span>
            <span id="chk-total">$0.00</span>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const cart = getCart();
      const list = document.getElementById("checkout-summary-items-list");
      
      if (!list) return;

      if (cart.length === 0) {
        list.innerHTML = `<span style="color:var(--text-muted);">No items in cart</span>`;
        return;
      }

      let subtotal = 0;
      let html = "";

      cart.forEach(item => {
        const p = ElevoraProducts.find(prod => prod.id === item.productId);
        if (p) {
          const total = p.price * item.quantity;
          subtotal += total;
          html += `
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;">
              <span style="max-width: 180px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-primary);">${p.name} <span style="color: var(--accent);">x${item.quantity}</span></span>
              <span style="font-weight: 700; color: var(--text-secondary);">$${total.toFixed(2)}</span>
            </div>
          `;
        }
      });

      list.innerHTML = html;

      document.getElementById("chk-subtotal").textContent = `$${subtotal.toFixed(2)}`;

      const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 9.99;
      document.getElementById("chk-shipping").textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;

      const appliedCoupon = localStorage.getItem("elevora_applied_coupon");
      let discount = 0;
      if (appliedCoupon === "ELEVORA20" && subtotal > 0) {
        discount = subtotal * 0.20;
        document.getElementById("chk-discount").textContent = `-$${discount.toFixed(2)}`;
        document.getElementById("chk-discount-row").style.display = "flex";
      }

      const total = subtotal - discount + shipping;
      document.getElementById("chk-total").textContent = `$${total.toFixed(2)}`;
    });

    function triggerOrderSuccessRedirect() {
      // Clear cart
      clearCart();
      if (typeof showToast === "function") {
        showToast("Authorization processed. Aligning payment...", "success");
      }
      setTimeout(() => {
        window.location.href = getThemeUrl("order-success");
      }, 900);
    }
  </script>