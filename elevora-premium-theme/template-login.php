<?php
/**
 * Template Name: Elevora Login Page
 */
get_header(); ?>

  <main class="container auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Welcome Back</h2>
      <p class="auth-subtitle">Log in to Elevora to manage orders and track shipments.</p>
      
      <form class="auth-form" method="post" action="<?php echo esc_url( wp_login_url() ); ?>">
        <div class="auth-input-group">
          <label for="user_login">Username or Email</label>
          <input type="text" name="log" id="user_login" class="auth-input" required autocomplete="username">
        </div>
        
        <div class="auth-input-group">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label for="user_pass">Password</label>
            <a href="<?php echo esc_url( wp_lostpassword_url() ); ?>" style="font-size: 0.8rem; color: var(--text-muted);">Forgot?</a>
          </div>
          <input type="password" name="pwd" id="user_pass" class="auth-input" required autocomplete="current-password">
        </div>

        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-secondary);">
          <input type="checkbox" name="rememberme" id="rememberme" value="forever">
          <label for="rememberme">Keep me logged in</label>
        </div>

        <button type="submit" class="auth-btn">Log In</button>
        <input type="hidden" name="redirect_to" value="<?php echo esc_url( home_url( '/my-account/' ) ); ?>">
      </form>

      <div class="auth-footer">
        Don't have an account? <a href="<?php echo esc_url( home_url( '/register/' ) ); ?>">Sign Up Now</a>
      </div>
    </div>
  </main>

<?php get_footer(); ?>