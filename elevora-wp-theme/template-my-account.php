<?php
/**
 * Template Name: Elevora My Account (Static Fallback)
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Dashboard</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">My Account</h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <div style="display: grid; grid-template-columns: 1fr 2.5fr; gap: 40px;">
      <!-- Menu sidebar -->
      <aside style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 24px;">
        <div style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid var(--border-color); margin-bottom: 20px;">
          <div style="width: 80px; height: 80px; background-color: var(--accent); color: var(--accent-contrast); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; margin: 0 auto 12px;">U</div>
          <h4 style="font-family: Outfit; font-weight: 700; font-size: 1rem; margin: 0;">Elevora User</h4>
          <span style="font-size: 0.8rem; color: var(--text-muted);">user@elevora.com</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button class="filter-category-btn active" style="font-weight: 600;">Dashboard</button>
          <button class="filter-category-btn" onclick="showToast('Loading secure billing pipelines...', 'info')">Orders History</button>
          <button class="filter-category-btn" onclick="showToast('Loading encrypted key rings...', 'info')">Saved Addresses</button>
          <button class="filter-category-btn" onclick="showToast('Clearing authentication sessions...', 'info'); clearCart();">Logout Session</button>
        </div>
      </aside>

      <!-- Account Dashboard details -->
      <div style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 40px;">
        <h3 style="font-family: Outfit; font-size: 1.5rem; font-weight: 800; margin-bottom: 16px;">Welcome Back!</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 30px;">From your personal dashboard account portal, you can easily view your recent tech accessory purchases, manage secure shipping addresses, and trace courier status numbers.</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="border: 1.5px dashed var(--border-color); border-radius: var(--border-radius-md); padding: 24px; text-align: center;">
            <i class="fa-solid fa-cart-shopping" style="font-size: 2rem; color: var(--accent-dark); margin-bottom: 12px;"></i>
            <h4 style="font-family: Outfit; font-weight: 700; margin-bottom: 6px;">Total Orders</h4>
            <p style="font-size: 1.25rem; font-weight: 800; margin: 0;">0 Orders Placed</p>
          </div>
          <div style="border: 1.5px dashed var(--border-color); border-radius: var(--border-radius-md); padding: 24px; text-align: center;">
            <i class="fa-solid fa-heart" style="font-size: 2rem; color: var(--accent-dark); margin-bottom: 12px;"></i>
            <h4 style="font-family: Outfit; font-weight: 700; margin-bottom: 6px;">Saved Wishlist</h4>
            <p style="font-size: 1.25rem; font-weight: 800; margin: 0;" id="my-account-wishlist-count">0 Items Saved</p>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const wishlist = JSON.parse(localStorage.getItem("elevora_wishlist")) || [];
      const countEl = document.getElementById("my-account-wishlist-count");
      if(countEl) {
        countEl.textContent = `${wishlist.length} Items Saved`;
      }
    });
  </script>
<?php get_footer(); ?>