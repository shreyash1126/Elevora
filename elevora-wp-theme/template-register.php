<?php
/**
 * Template Name: Elevora Registration Page
 */
get_header(); ?>

  <main class="container auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Create Account</h2>
      <p class="auth-subtitle">Join Elevora today and elevate your tech lifestyle.</p>
      
      <form class="auth-form" method="post" action="<?php echo esc_url( wp_registration_url() ); ?>">
        <div class="auth-input-group">
          <label for="reg_username">Username</label>
          <input type="text" name="user_login" id="reg_username" class="auth-input" required autocomplete="username">
        </div>

        <div class="auth-input-group">
          <label for="reg_email">Email Address</label>
          <input type="email" name="user_email" id="reg_email" class="auth-input" required autocomplete="email">
        </div>
        
        <div class="auth-input-group">
          <label for="reg_pass">Password</label>
          <input type="password" name="user_password" id="reg_pass" class="auth-input" required autocomplete="new-password">
        </div>

        <div style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
          <input type="checkbox" id="terms_agree" required style="margin-top: 3px;">
          <label for="terms_agree">I agree to Elevora's <a href="<?php echo esc_url( home_url( '/terms-conditions/' ) ); ?>" target="_blank">Terms of Service</a> and <a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>" target="_blank">Privacy Guidelines</a>.</label>
        </div>

        <button type="submit" class="auth-btn">Register</button>
        
        <input type="hidden" name="redirect_to" value="<?php echo esc_url( home_url( '/my-account/' ) ); ?>">
      </form>

      <div class="auth-footer">
        Already have an account? <a href="<?php echo esc_url( home_url( '/login/' ) ); ?>">Log In</a>
      </div>
    </div>
  </main>

<?php get_footer(); ?>