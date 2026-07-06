<?php
/**
 * Template Name: Elevora Checkout (Static Fallback)
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>">Cart</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Secure Checkout</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Secure Checkout</h1>
    </div>
  </section>

  <!-- Checkout Grid Layout -->
  <div class="container" style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; margin-bottom: 80px; align-items: start;">
    <!-- Form Panel -->
    <div style="background-color: var(--bg-secondary); padding: 40px; border-radius: var(--border-radius-lg); border: 1px solid var(--border-color);">
      <h3 style="font-family: Outfit; font-size: 1.25rem; font-weight: 700; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1.5px solid var(--border-color);">Billing & Shipping Details</h3>
      <form onsubmit="event.preventDefault(); clearCart(); window.location.href='<?php echo esc_url(home_url('/order-success/')); ?>';">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">First Name</label>
            <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="John">
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Last Name</label>
            <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="Doe">
          </div>
        </div>
        <div style="margin-bottom: 20px;">
          <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Street Address</label>
          <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="House number and street name">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">City</label>
            <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="City">
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">State</label>
            <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="State">
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Postal Code</label>
            <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="Postal code">
          </div>
        </div>
        
        <h3 style="font-family: Outfit; font-size: 1.25rem; font-weight: 700; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1.5px solid var(--border-color);">Payment Option</h3>
        <div style="background-color: var(--bg-primary); padding: 20px; border-radius: var(--border-radius-md); border: 1.5px solid var(--border-color); margin-bottom: 30px;">
          <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; font-weight: 700;">
            <input type="radio" checked style="accent-color: var(--accent-dark); width: 18px; height: 18px;">
            Credit Card (Secure Stripe gateway simulation)
          </label>
          <div style="display: flex; gap: 16px; margin-top: 16px; font-size: 1.5rem; color: var(--text-muted);">
            <i class="fa-brands fa-cc-visa"></i>
            <i class="fa-brands fa-cc-mastercard"></i>
            <i class="fa-brands fa-cc-stripe"></i>
            <i class="fa-brands fa-cc-apple-pay"></i>
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary" style="width: 100%; height: 50px;">Place Secure Order</button>
      </form>
    </div>

    <!-- Review items panel -->
    <aside style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 32px;" id="checkout-summary-col">
      <!-- Populated dynamically via JS checkout sync -->
    </aside>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      // Sync checkout items review
      const summaryCol = document.getElementById("checkout-summary-col");
      if(!summaryCol) return;

      const cart = JSON.parse(localStorage.getItem("elevora_cart")) || [];
      if(cart.length === 0) {
        summaryCol.innerHTML = "<p>No items in cart</p>";
        return;
      }

      let html = `<h3 style="font-family: Outfit; font-size: 1.25rem; font-weight: 700; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1.5px solid var(--border-color);">Review Items</h3>`;
      let subtotal = 0;

      cart.forEach(item => {
        const p = ElevoraProducts.find(prod => prod.id === item.productId);
        if(p) {
          const itemTotal = p.price * item.quantity;
          subtotal += itemTotal;
          html += `
            <div style="display: flex; gap: 12px; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
              <img src="${p.images[0]}" alt="${p.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--border-radius-md);">
              <div style="flex: 1;">
                <h5 style="font-size: 0.9rem; font-weight: 700; margin: 0 0 4px 0;">${p.name}</h5>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Variant: ${item.color} | Qty: ${item.quantity}</p>
              </div>
              <span style="font-weight: 700; font-size: 0.9rem;">$${itemTotal.toFixed(2)}</span>
            </div>
          `;
        }
      });

      // Calculate totals
      const coupon = localStorage.getItem("elevora_applied_coupon");
      let discount = 0;
      if (coupon === "ELEVORA20") {
        discount = subtotal * 0.20;
      }
      const shipping = subtotal >= 100 ? 0 : 9.99;
      const total = subtotal - discount + shipping;

      html += `
        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px; font-size: 0.9rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          ${discount > 0 ? `
          <div style="display: flex; justify-content: space-between; color: var(--danger); font-weight: 700;">
            <span>Coupon Discount</span>
            <span>-$${discount.toFixed(2)}</span>
          </div>` : ''}
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Shipping</span>
            <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; margin-top: 12px; padding-top: 12px; border-top: 1.5px solid var(--border-color);">
            <span>Order Total</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>
      `;

      summaryCol.innerHTML = html;
    });
  </script>

<?php get_footer(); ?>