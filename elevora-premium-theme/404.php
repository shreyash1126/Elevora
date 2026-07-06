<?php
/**
 * 404 Error page template
 */
get_header(); ?>

  <main class="container" style="padding: 100px 0; text-align: center;">
    <i class="fa-solid fa-triangle-exclamation" style="font-size: 5rem; color: var(--accent); margin-bottom: 24px; opacity: 0.5;"></i>
    <h1 style="font-size: 4rem; font-weight: 800; letter-spacing: -0.05em; margin-bottom: 12px; color: var(--text-primary);">404 Error</h1>
    <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 24px; color: var(--text-secondary);">Holographic Signal Interrupted</h2>
    <p style="color: var(--text-muted); margin-bottom: 40px; max-width: 480px; margin-left: auto; margin-right: auto;">The page you are looking for has been relocated or is offline. Use the links below to return to the active network hub.</p>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary">Return to Homepage</a>
  </main>

<?php get_footer(); ?>