<?php
/**
 * Template Name: Elevora Customer Center
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
      <div>
        <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Security Control</span>
        <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">My Account</h1>
      </div>
      <a href="<?php echo esc_url( wp_logout_url( home_url( '/' ) ) ); ?>" class="btn btn-secondary" style="font-size: 0.85rem; padding: 10px 18px;">Disconnect Session</a>
    </div>
  </section>

  <!-- Split account dashboard -->
  <main class="container" style="display: grid; grid-template-columns: 240px 1fr; gap: 40px; margin-bottom: 80px;">
    
    <!-- Left Navigation links -->
    <aside style="display: flex; flex-direction: column; gap: 12px;">
      <a href="#" class="sidebar-filter-link active" style="font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-gauge"></i> Dashboard</a>
      <a href="<?php echo esc_url( home_url( '/wishlist/' ) ); ?>" class="sidebar-filter-link" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;"><i class="fa-regular fa-heart"></i> Saved Devices</a>
      <a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>" class="sidebar-filter-link" style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-truck"></i> Shipments</a>
    </aside>

    <!-- Content -->
    <div class="auth-card" style="max-width: 100%;">
      <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.25rem; margin-bottom: 16px;">Core Hub Overview</h3>
      <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 30px;">Welcome back, <strong>Customer</strong>. Access order references, trace delivery loops, and edit your profile password metrics from here.</p>

      <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.2rem; margin-bottom: 16px; border-top: 1.5px solid var(--border-color); padding-top: 30px;">Recent Shipping Referencing</h3>
      <div style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); padding: 20px; display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-primary);">
        <div>
          <h5 style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">Order #ELV-94285-TY</h5>
          <span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-top: 4px;">Dispatched Jul 05, 2026 &bull; Express Courier</span>
        </div>
        <a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>" class="btn btn-secondary" style="font-size: 0.8rem; padding: 8px 16px;">Trace Route</a>
      </div>
    </div>
  </main>

  <style>
    .sidebar-filter-link { transition: all var(--transition-fast); }
    .sidebar-filter-link.active, .sidebar-filter-link:hover { color: var(--accent) !important; padding-left: 8px; }
  </style>
<?php get_footer(); ?>