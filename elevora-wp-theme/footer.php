  <!-- Cart Drawer -->
  <div class="cart-drawer" id="cart-drawer">
    <div class="cart-header">
      <h3>Your Bag</h3>
      <button class="cart-close" id="cart-close" aria-label="Close Shopping Bag"><i class="fas fa-times"></i></button>
    </div>
    <div class="cart-items" id="cart-items-list"></div>
    <div class="cart-footer">
      <div class="cart-summary-line">
        <span>Subtotal</span>
        <span id="cart-subtotal">$0.00</span>
      </div>
      <div class="cart-summary-line">
        <span>Estimated Shipping</span>
        <span id="cart-shipping">Calculated at checkout</span>
      </div>
      <div class="cart-summary-line total">
        <span>Estimated Total</span>
        <span id="cart-total">$0.00</span>
      </div>
      <a href="<?php echo esc_url( home_url( '/checkout.html' ) ); ?>" class="btn btn-primary" style="width:100%;">Proceed to Checkout</a>
    </div>
  </div>

  <!-- Search Modal -->
  <div class="search-modal" id="search-modal">
    <button class="search-modal-close" id="search-close" aria-label="Close search"><i class="fas fa-times"></i></button>
    <div class="search-modal-box">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Type to search tech (e.g. Apex, SoundFlow, AirBook)..." id="search-input">
    </div>
    <div class="search-results-container" id="search-results"></div>
  </div>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-info-logo">
            ele<span class="logo-tech-container" style="width:24px; height:24px; display:inline-block; vertical-align:middle; margin-left: 2px;"><svg viewBox="0 0 100 100" style="width:100%; height:100%; color:var(--color-primary);"><circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="8" fill="none"/><path d="M50 10 L50 40 M50 60 L50 90 M10 50 L40 50 M60 50 L90 50" stroke="currentColor" stroke-width="8" stroke-linecap="round"/></svg></span>ora
          </div>
          <p class="footer-info-desc">Elevora designs premium, high-performance electronics and smart devices to elevate your daily digital lifestyle.</p>
        </div>
        <div>
          <h4 class="footer-title">Shop Laptops & Devices</h4>
          <ul class="footer-links">
            <li><a href="<?php echo esc_url( home_url( '/shop.html' ) ); ?>">Shop All</a></li>
            <li><a href="<?php echo esc_url( home_url( '/shop.html?category=Mobiles%20%26%20Audio' ) ); ?>">Mobiles & Audio</a></li>
            <li><a href="<?php echo esc_url( home_url( '/shop.html?category=Laptops%20%26%20Wearables' ) ); ?>">Laptops & Wearables</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-title">Support</h4>
          <ul class="footer-links">
            <li><a href="<?php echo esc_url( home_url( '/about.html' ) ); ?>">Our Story</a></li>
            <li><a href="<?php echo esc_url( home_url( '/quiz.html' ) ); ?>">Tech Match Quiz</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; <?php echo date('Y'); ?> Elevora Electronics. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    document.getElementById('desktop-search-trigger').addEventListener('click', () => {
      document.getElementById('search-btn').click();
    });
    document.getElementById('mobile-search-trigger').addEventListener('click', () => {
      document.getElementById('search-btn').click();
    });

    const vSearchBtn = document.createElement('button');
    vSearchBtn.id = 'search-btn';
    vSearchBtn.style.display = 'none';
    document.body.appendChild(vSearchBtn);
  </script>

<?php wp_footer(); ?>
</body>
</html>
