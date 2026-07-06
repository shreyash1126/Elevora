  <!-- Premium Footer -->
  <footer style="background-color: var(--bg-secondary); border-top: 1.5px solid var(--border-color); padding: 80px 0 40px; margin-top: 60px;">
    <div class="container" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 40px; margin-bottom: 60px;">
      <div>
        <h4 style="font-family: Outfit; font-size: 1.5rem; font-weight: 800; margin-bottom: 20px;">ELEVORA<span class="logo-dot"></span></h4>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 24px; max-width: 280px;">Elevating your tech lifestyle with premium, next-generation smart accessories and gadget systems.</p>
        <div style="display: flex; gap: 12px;">
          <a href="#" class="action-btn" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="https://instagram.com" target="_blank" class="action-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" class="action-btn" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
        </div>
      </div>
      <div>
        <h5 style="font-family: Outfit; font-weight: 700; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-primary); margin-bottom: 20px;">Quick Navigation</h5>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem;">
          <li><a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" style="color: var(--text-secondary); hover:color:var(--accent);">Browse Shop</a></li>
          <li><a href="<?php echo esc_url( home_url( '/compare/' ) ); ?>" style="color: var(--text-secondary);">Compare System</a></li>
          <li><a href="<?php echo esc_url( home_url( '/wishlist/' ) ); ?>" style="color: var(--text-secondary);">Your Wishlist</a></li>
          <li><a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>" style="color: var(--text-secondary);">Shipment Tracker</a></li>
        </ul>
      </div>
      <div>
        <h5 style="font-family: Outfit; font-weight: 700; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-primary); margin-bottom: 20px;">Legal & Info</h5>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem;">
          <li><a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>" style="color: var(--text-secondary);">Privacy Guidelines</a></li>
          <li><a href="<?php echo esc_url( home_url( '/terms-conditions/' ) ); ?>" style="color: var(--text-secondary);">Terms of Service</a></li>
          <li><a href="<?php echo esc_url( home_url( '/shipping-policy/' ) ); ?>" style="color: var(--text-secondary);">Shipping Policy</a></li>
          <li><a href="<?php echo esc_url( home_url( '/refund-policy/' ) ); ?>" style="color: var(--text-secondary);">Refund Policy</a></li>
        </ul>
      </div>
      <div>
        <h5 style="font-family: Outfit; font-weight: 700; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-primary); margin-bottom: 20px;">Newsletter</h5>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 16px;">Subscribe to receive launch announcements and exclusive discount coupons.</p>
        <form style="display: flex; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden;" onsubmit="event.preventDefault(); showToast('Subscribed to Newsletter!', 'success');">
          <input type="email" placeholder="Enter email..." required style="flex-grow: 1; padding: 10px 14px; font-size: 0.85rem; color: var(--text-primary); background: var(--bg-primary);">
          <button type="submit" class="btn btn-primary" style="border-radius: 0; padding: 0 16px;"><i class="fa-solid fa-chevron-right"></i></button>
        </form>
      </div>
    </div>
    <div class="container" style="border-top: 1px solid var(--border-color); padding-top: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
      <span style="font-size: 0.85rem; color: var(--text-muted);">&copy; <?php echo date('Y'); ?> Elevora (https://ilvora.link). Elevate Your Tech Lifestyle.</span>
      <div style="display: flex; gap: 12px; font-size: 1.5rem; color: var(--text-muted);">
        <i class="fa-brands fa-cc-visa"></i>
        <i class="fa-brands fa-cc-mastercard"></i>
        <i class="fa-brands fa-cc-paypal"></i>
        <i class="fa-brands fa-cc-apple-pay"></i>
      </div>
    </div>
  </footer>

  <!-- Floating Compare notification drawer -->
  <div class="compare-drawer-wrap" id="compare-drawer-wrap">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <span style="font-family: Outfit; font-weight: 700; font-size: 0.85rem; color: var(--text-primary);">Compare Selected Items</span>
      <div style="display: flex; gap: 6px;" id="compare-drawer-thumbs"></div>
    </div>
    <div style="display: flex; gap: 10px; align-items: center;">
      <a href="<?php echo esc_url( home_url( '/compare/' ) ); ?>" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.8rem; font-family: Outfit;">Compare Now</a>
      <button onclick="clearCompareList()" style="font-size: 0.8rem; color: var(--text-muted); text-decoration: underline; cursor: pointer; border: none; background: none;">Clear</button>
    </div>
  </div>

  <!-- Mini Cart Drawer panel overlay -->
  <div class="cart-drawer-overlay" id="cart-drawer-overlay">
    <div class="cart-drawer">
      <div class="cart-drawer-header">
        <h4 class="cart-drawer-title"><i class="fa-solid fa-shopping-bag" style="color: var(--accent);"></i> Shopping Cart</h4>
        <button class="close-drawer-btn" onclick="closeMiniCartDrawer()" aria-label="Close cart">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="cart-drawer-items" id="cart-drawer-items">
        <!-- Rendered dynamically via cart-new.js -->
      </div>
      <div class="cart-drawer-footer">
        <div class="cart-totals-row">
          <span>Subtotal:</span>
          <span id="cart-drawer-subtotal">$0.00</span>
        </div>
        <div class="cart-drawer-actions">
          <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>" class="btn btn-secondary" style="width: 100%; text-align: center; justify-content: center;">View Cart</a>
          <a href="<?php echo esc_url( home_url( '/checkout/' ) ); ?>" class="btn btn-primary" id="mini-cart-checkout-btn" style="width: 100%; text-align: center; justify-content: center;">Proceed to Checkout</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Micro notifications Toast container -->
  <div id="toast-wrapper" style="position: fixed; bottom: 30px; right: 30px; z-index: 100000; display: flex; flex-direction: column; gap: 10px;"></div>

  <script>
    // Universal notifications toaster helper
    function showToast(message, type = "success") {
      const toast = document.createElement("div");
      toast.style.cssText = "padding: 14px 20px; border-radius: var(--border-radius-md); background-color: var(--bg-secondary); border: 1.5px solid var(--border-color); color: var(--text-primary); font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 10px; box-shadow: var(--shadow-md); transform: translateX(120%); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); opacity: 0;";
      
      let icon = '<i class="fa-solid fa-circle-check" style="color: var(--success);"></i>';
      if (type === "error") {
        icon = '<i class="fa-solid fa-circle-exclamation" style="color: var(--danger);"></i>';
        toast.style.borderColor = "var(--danger)";
      } else if (type === "warning") {
        icon = '<i class="fa-solid fa-triangle-exclamation" style="color: #fbbf24;"></i>';
      } else if (type === "info") {
        icon = '<i class="fa-solid fa-circle-info" style="color: var(--accent);"></i>';
      }

      toast.innerHTML = `${icon} <span>${message}</span>`;
      document.getElementById("toast-wrapper").appendChild(toast);

      requestAnimationFrame(() => {
        toast.style.transform = "translateX(0)";
        toast.style.opacity = "1";
      });

      setTimeout(() => {
        toast.style.transform = "translateX(120%)";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 400);
      }, 3500);
    }

    function clearCompareList() {
      if (typeof saveCompareList === "function") {
        saveCompareList([]);
        showToast("Comparison list cleared", "info");
      }
    }
  </script>

<?php wp_footer(); ?>
</body>
</html>