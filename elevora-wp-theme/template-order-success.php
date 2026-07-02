<?php
/**
 * Template Name: Elevora Order Success (Static Fallback)
 */
get_header(); ?>

  <main class="container" style="text-align: center; padding: 120px 24px; max-width: 600px; margin: 0 auto;">
    <div style="width: 80px; height: 80px; background-color: var(--success); color: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin: 0 auto 30px;">
      <i class="fa-solid fa-check"></i>
    </div>
    <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 16px; font-family: Outfit; letter-spacing: -0.02em;">Payment Successful!</h1>
    <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">Thank you for shopping on Elevora. Your secure transaction completed successfully.</p>
    <p style="color: var(--text-secondary); font-weight: 700; font-family: Outfit; margin-bottom: 40px;">Order ID Ref: <span style="color: var(--accent-dark);">EV-ORD-<?php echo rand(100000, 999999); ?></span></p>
    <div style="display: flex; gap: 16px; justify-content: center;">
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-secondary" style="width: auto;">Back to Home</a>
      <a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>" class="btn btn-primary" style="width: auto;">Trace Order Delivery</a>
    </div>
  </main>

<?php get_footer(); ?>