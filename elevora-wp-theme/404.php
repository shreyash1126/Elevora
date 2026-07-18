<?php
/**
 * The template for displaying 404 pages (Not Found)
 */
get_header(); ?>

  <main class="container" style="text-align: center; padding: 120px 24px; max-width: 600px; margin: 0 auto;">
    <div class="error-code" style="font-family: 'Outfit'; font-size: 6rem; font-weight: 800; color: var(--accent-dark); line-height: 1; margin-bottom: 20px;">404</div>
    <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 16px; font-family: Outfit; letter-spacing: -0.02em;">Oops! Page Not Found</h1>
    <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 32px;">The gadget link or document location you are looking for has been moved, renamed, or is temporarily offline.</p>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary" style="display: inline-flex; width: auto;">Return To Home</a>
  </main>

<?php get_footer(); ?>