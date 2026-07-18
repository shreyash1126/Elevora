  <!-- Footer -->
  <footer>
    <div class="container footer-top">
      <div class="footer-column footer-about">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
          <span>ELEVORA</span><span class="logo-dot"></span>
        </a>
        <p>Curating premium smart gadgets and mobile power essentials that match modern digital lifestyles. Buy electronics in sleek minimalist designs.</p>
        <div class="footer-socials">
          <a href="#" class="social-link" aria-label="Elevora Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" class="social-link" aria-label="Elevora Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" class="social-link" aria-label="Elevora Twitter"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" class="social-link" aria-label="Elevora LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
        </div>
      </div>
      <div class="footer-column">
        <h4>Shop</h4>
        <ul>
          <li><a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop/')); ?>">All Products</a></li>
          <li><a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop')) . '?filter_cat=headphones') : esc_url(home_url('/shop/?filter_cat=Headphones')); ?>">Headphones</a></li>
          <li><a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop')) . '?filter_cat=smart-watches') : esc_url(home_url('/shop/?filter_cat=Smart%20Watches')); ?>">Smart Watches</a></li>
          <li><a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop')) . '?filter_cat=earbuds') : esc_url(home_url('/shop/?filter_cat=Earbuds')); ?>">Earbuds</a></li>
          <li><a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop')) . '?filter_cat=power-banks') : esc_url(home_url('/shop/?filter_cat=Power%20Banks')); ?>">Power Banks</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Support</h4>
        <ul>
          <li><a href="<?php echo esc_url( home_url( '/faq/' ) ); ?>">FAQ Desk</a></li>
          <li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact Us</a></li>
          <li><a href="<?php echo esc_url( home_url( '/track-order/' ) ); ?>">Track Order</a></li>
          <li><a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('myaccount'))) : esc_url(home_url('/my-account/')); ?>">My Account</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Company</h4>
        <ul>
          <li><a href="<?php echo esc_url( home_url( '/about/' ) ); ?>">About Brand</a></li>
          <li><a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>">Tech Blog</a></li>
          <li><a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>">Privacy Guidelines</a></li>
          <li><a href="<?php echo esc_url( home_url( '/terms-conditions/' ) ); ?>">Terms & Conditions</a></li>
        </ul>
      </div>
      <div class="footer-column footer-newsletter">
        <h4>Subscribe</h4>
        <p>Get early product launches and exclusive VIP coupon discount offers directly in your inbox.</p>
        <form class="newsletter-section-form" style="display: flex; border: 1.5px solid #2d2d35; border-radius: var(--border-radius-md); overflow: hidden; background-color: #141417;">
          <input type="email" placeholder="Email address" class="newsletter-input" style="flex-grow: 1; padding: 12px; color: #ffffff;" required>
          <button type="submit" class="newsletter-btn">Join</button>
        </form>
      </div>
    </div>
    
    <div class="container footer-bottom">
      <p>&copy; <?php echo date('Y'); ?> Elevora. All rights reserved. Premium Electronics Dropshipping.</p>
      <div class="payment-methods">
        <i class="fa-brands fa-cc-visa" title="Visa"></i>
        <i class="fa-brands fa-cc-mastercard" title="Mastercard"></i>
        <i class="fa-brands fa-cc-stripe" title="Stripe"></i>
        <i class="fa-brands fa-cc-apple-pay" title="Apple Pay"></i>
      </div>
    </div>
  </footer>

  <!-- Mini Cart Drawer Modal Overlay -->
  <div class="cart-drawer-overlay" id="cart-drawer-overlay">
    <div class="cart-drawer">
      <div class="cart-drawer-header">
        <h4 class="cart-drawer-title"><i class="fa-solid fa-shopping-bag" style="color: var(--accent-dark);"></i> Your Cart</h4>
        <button class="close-drawer-btn" onclick="closeMiniCartDrawer()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="cart-drawer-items" id="cart-drawer-items">
        <!-- Loaded Dynamically via cart.js / WooCommerce AJAX -->
      </div>
      <div class="cart-drawer-footer">
        <div class="cart-totals-row">
          <span>Subtotal</span>
          <span style="font-weight: 600;" id="cart-drawer-subtotal">$0.00</span>
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 16px;">Shipping & promo coupons calculated at checkout page.</div>
        <div class="cart-drawer-actions">
          <a href="<?php echo esc_url( home_url('/cart/') ); ?>" class="btn btn-secondary" style="width: 100%;" onclick="closeMiniCartDrawer()">View Full Cart</a>
          <a href="<?php echo esc_url( home_url('/checkout/') ); ?>" class="btn btn-primary" style="width: 100%;" id="mini-cart-checkout-btn">Checkout Now</a>
        </div>
      </div>
    </div>
  </div>

  <?php wp_footer(); ?>
</body>
</html>