<?php
/**
 * Template Name: Elevora Shopping Cart
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Cart Summary</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Shopping Cart</h1>
    </div>
  </section>

  <!-- Cart layouts -->
  <main class="container" style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 40px; margin-bottom: 80px;" id="cart-page-split-layout">
    
    <!-- Left: Cart Items -->
    <div id="cart-items-container">
      <!-- Rendered dynamically via cart-new.js -->
    </div>

    <!-- Right: Summary Card -->
    <div>
      <div class="auth-card" style="max-width: 100%; position: sticky; top: 100px;">
        <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.25rem; margin-bottom: 24px; border-bottom: 1.5px solid var(--border-color); padding-bottom: 15px;">Summary Panel</h3>
        
        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; font-size: 0.95rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Subtotal</span>
            <span style="font-weight: 700; color: var(--text-primary);" id="cart-summary-subtotal">$0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; display: none;">
            <span style="color: var(--text-secondary);">Coupon Discount</span>
            <span style="font-weight: 700; color: var(--danger);" id="cart-summary-discount">-$0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Shipping Cost</span>
            <span style="font-weight: 700; color: var(--success);" id="cart-summary-shipping">FREE</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1.5px solid var(--border-color); padding-top: 16px; font-size: 1.15rem; font-family: Outfit; font-weight: 800;">
            <span>Grand Total</span>
            <span style="color: var(--accent);" id="cart-summary-total">$0.00</span>
          </div>
        </div>

        <!-- Coupon code wrapper -->
        <div style="display: flex; gap: 8px; margin-bottom: 24px;">
          <input type="text" id="coupon-code-input" placeholder="Coupon (ELEVORA20)" style="flex-grow: 1; padding: 12px; border-radius: var(--border-radius-md); border: 1.5px solid var(--border-color); background: var(--bg-primary); font-size: 0.85rem; color: var(--text-primary); text-transform: uppercase;">
          <button class="btn btn-secondary" onclick="applyPromoCoupon()" style="padding: 0 16px; font-size: 0.85rem;">Apply</button>
        </div>

        <a href="<?php echo esc_url( home_url( '/checkout/' ) ); ?>" class="btn btn-primary" style="width: 100%; height: 50px; text-align: center; justify-content: center; font-size: 1.05rem;">Proceed to Checkout</a>
      </div>
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof renderCartPage === "function") {
        renderCartPage();
      }
    });
  </script>