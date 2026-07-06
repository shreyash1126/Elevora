<?php
/**
 * Template Name: Elevora Order Processed Successfully
 */
get_header(); ?>

  <main class="container" style="padding: 100px 0; text-align: center;">
    <div style="width: 80px; height: 80px; border-radius: 50%; background-color: rgba(16, 185, 129, 0.1); border: 2px solid var(--success); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);">
      <i class="fa-solid fa-check" style="font-size: 2rem; color: var(--success);"></i>
    </div>
    <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 12px; color: var(--text-primary);">Order Transmitted</h1>
    <h2 style="font-size: 1.4rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 24px;">Shipment Protocol Activated</h2>
    <p style="color: var(--text-muted); margin-bottom: 40px; max-width: 480px; margin-left: auto; margin-right: auto;">We have successfully queued your transaction. The warehouse queue has scheduled physical packaging and surge protection checks. Reference number: <strong>ELV-94285-TY</strong>.</p>
    <div style="display: flex; gap: 16px; justify-content: center;">
      <a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>" class="btn btn-primary">Track Route</a>
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-secondary">Return Hub</a>
    </div>
  </main>

<?php get_footer(); ?>