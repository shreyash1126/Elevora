<?php
/**
 * Template Name: Elevora Track Order
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Tracking Portal</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Track Your Order</h1>
    </div>
  </section>

  <main class="container" style="max-width: 600px; margin: 0 auto 80px; text-align: center;">
    <div style="background-color: var(--bg-secondary); padding: 40px; border-radius: var(--border-radius-lg); border: 1px solid var(--border-color);">
      <i class="fa-solid fa-truck-ramp-box" style="font-size: 3rem; color: var(--accent-dark); margin-bottom: 20px;"></i>
      <h3 style="font-family: Outfit; font-size: 1.25rem; font-weight: 700; margin-bottom: 12px;">Live Route Logistics</h3>
      <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-bottom: 30px;">Input the route tracking code sent in your order dispatch email notification (e.g., EV-123456) below.</p>
      
      <form onsubmit="event.preventDefault(); showToast('Tracking credentials resolved. Loading transit routing details...', 'info');">
        <input type="text" required placeholder="Logistics ID: e.g. EV-123456" style="width: 100%; padding: 14px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); text-align: center; font-family: Outfit; font-weight: 600; margin-bottom: 20px;">
        <button type="submit" class="btn btn-primary" style="width: 100%;">Fetch Route Status</button>
      </form>
    </div>
  </main>

<?php get_footer(); ?>