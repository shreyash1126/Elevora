<?php
/**
 * Template Name: Elevora Cart (Static Fallback)
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Your Cart</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Shopping Cart</h1>
    </div>
  </section>

  <!-- Cart Grid Layout -->
  <div class="container" style="display: grid; grid-template-columns: 2fr 1fr; gap: 40px; margin-bottom: 80px; align-items: start;">
    <!-- Items panel -->
    <div id="cart-items-container">
      <!-- Loaded dynamically via cart.js -->
    </div>

    <!-- Summary Panel -->
    <aside style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 32px;">
      <h3 style="font-family: Outfit; font-size: 1.25rem; font-weight: 700; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1.5px solid var(--border-color);">Order Summary</h3>
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; font-size: 0.95rem;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">Subtotal</span>
          <span id="cart-summary-subtotal">$0.00</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">Promo Discount</span>
          <span id="cart-summary-discount" style="color: var(--danger); font-weight: 700;">$0.00</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">Estimated Shipping</span>
          <span id="cart-summary-shipping">FREE</span>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; font-family: Outfit; font-weight: 800; font-size: 1.25rem; margin-bottom: 24px; padding-top: 16px; border-top: 1.5px solid var(--border-color);">
        <span>Total</span>
        <span id="cart-summary-total">$0.00</span>
      </div>

      <div style="margin-bottom: 24px;">
        <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Promo Code</label>
        <div style="display: flex; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background-color: var(--bg-primary);">
          <input type="text" id="coupon-code-input" placeholder="E.g. ELEVORA20" style="flex-grow: 1; padding: 12px; font-weight: 600;">
          <button onclick="applyPromoCoupon()" class="btn btn-secondary" style="border-radius: 0; padding: 0 16px;">Apply</button>
        </div>
      </div>

      <a href="<?php echo esc_url( home_url('/checkout/') ); ?>" class="btn btn-primary" style="width: 100%; text-align: center; display: inline-block;">Proceed To Checkout</a>
    </aside>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof renderCartPage === "function") {
        renderCartPage();
      }
    });
  </script>

<?php get_footer(); ?>