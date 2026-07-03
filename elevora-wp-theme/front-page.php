<?php
/**
 * Template Name: Elevora Homepage
 */
get_header(); ?>

  <!-- Hero Banner Slider -->
  <section class="hero-slider-container">
    <div class="hero-slider" id="homepage-hero-slider">
      <!-- Slide 1 -->
      <div class="hero-slide active" style="background-image: url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600');">
        <div class="container">
          <div class="hero-content">
            <span class="hero-tag">Acoustic Clarity</span>
            <h1>AeroPulse ANC Wireless</h1>
            <p>Experience silence perfected. Hybrid Active Noise Cancellation engineered to quiet busy creative environments.</p>
            <a href="<?php echo esc_url( home_url('/product/?id=1') ); ?>" class="btn btn-primary">Discover Sound</a>
          </div>
        </div>
      </div>
      <!-- Slide 2 -->
      <div class="hero-slide" style="background-image: url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600');">
        <div class="container">
          <div class="hero-content">
            <span class="hero-tag">Active Health</span>
            <h1>Apex Chrono OLED Watch</h1>
            <p>Aerospace titanium shell with always-on AMOLED panels. Trace routes, sleep depth, and heart grids.</p>
            <a href="<?php echo esc_url( home_url('/product/?id=2') ); ?>" class="btn btn-primary">Explore Health</a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Slider Indicators -->
    <div class="slider-dots" id="homepage-slider-dots">
      <span class="slider-dot active" data-index="0"></span>
      <span class="slider-dot" data-index="1"></span>
    </div>
    
    <!-- Slider Nav -->
    <div class="slider-arrows">
      <button class="slider-arrow" id="homepage-prev-btn" aria-label="Previous slide"><i class="fa-solid fa-chevron-left"></i></button>
      <button class="slider-arrow" id="homepage-next-btn" aria-label="Next slide"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
  </section>

  <!-- Category Carousel Section -->
  <section class="section-spacing container reveal-element">
    <div class="section-title-wrap">
      <div>
        <h2 class="section-title">Shop by Category</h2>
        <p class="section-subtitle">Premium curations sorted by usage profiles.</p>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="slider-arrow" id="category-carousel-prev" style="width: 40px; height: 40px; font-size: 0.8rem;"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="slider-arrow" id="category-carousel-next" style="width: 40px; height: 40px; font-size: 0.8rem;"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>

    <!-- Scrollable quick list -->
    <div style="width: 100%; overflow: hidden; position: relative;">
      <div class="category-grid" id="category-carousel-inner" style="display: flex; gap: 20px; overflow-x: auto; scrollbar-width: none; padding-bottom: 10px;">
        <!-- Card 1 -->
        <a href="<?php echo esc_url( home_url('/shop/?category=Headphones') ); ?>" class="category-card" style="flex: 0 0 250px;">
          <i class="fa-solid fa-headphones category-card-icon"></i>
          <span class="category-card-title">Headphones</span>
        </a>
        <!-- Card 2 -->
        <a href="<?php echo esc_url( home_url('/shop/?category=Smart%20Watches') ); ?>" class="category-card" style="flex: 0 0 250px;">
          <i class="fa-solid fa-clock category-card-icon"></i>
          <span class="category-card-title">Smart Watches</span>
        </a>
        <!-- Card 3 -->
        <a href="<?php echo esc_url( home_url('/shop/?category=Earbuds') ); ?>" class="category-card" style="flex: 0 0 250px;">
          <i class="fa-solid fa-ear-listen category-card-icon"></i>
          <span class="category-card-title">Wireless Earbuds</span>
        </a>
        <!-- Card 4 -->
        <a href="<?php echo esc_url( home_url('/shop/?category=Power%20Banks') ); ?>" class="category-card" style="flex: 0 0 250px;">
          <i class="fa-solid fa-battery-three-quarters category-card-icon"></i>
          <span class="category-card-title">Power Banks</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Curated Product Tabs Grid -->
  <section class="section-spacing container reveal-element">
    <div style="text-align: center; margin-bottom: 40px;">
      <h2 style="font-size: 2.25rem; font-weight: 800; font-family: Outfit;">Trending Curations</h2>
      <p style="color: var(--text-muted); margin-top: 8px;">Explore high-fidelity engineering matched with sleek modular geometries.</p>
    </div>

    <!-- Filter Buttons -->
    <div class="tabs-nav">
      <button class="tab-btn active" onclick="loadTabProducts('all')">Trending</button>
      <button class="tab-btn" onclick="loadTabProducts('new')">New Drops</button>
      <button class="tab-btn" onclick="loadTabProducts('sale')">Top Deals</button>
    </div>

    <!-- Products target loading -->
    <div class="products-grid" id="homepage-products-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">
      <!-- Populated Dynamically via Javascript Fallback / WooCommerce PHP loop -->
    </div>
  </section>

  <!-- Deal of the day section -->
  <section class="promo-deal-section reveal-element">
    <div class="container promo-deal-wrap">
      <div>
        <span style="color: var(--accent); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; display: inline-block; margin-bottom: 15px;">Limited Time Coupon Promotion</span>
        <h2 style="font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 20px; font-family: Outfit;">AeroPulse Headphone Special Deal</h2>
        <p style="color: #a0a0a5; font-size: 1rem; line-height: 1.6; margin-bottom: 30px;">Unlock an additional 20% discount on checkout loops using the verified promo code. Free shipping applies.</p>
        
        <!-- Timer boxes -->
        <div class="deal-timer-wrap">
          <div class="timer-box"><div class="timer-num" id="deal-days">02</div><div class="timer-label">Days</div></div>
          <div class="timer-box"><div class="timer-num" id="deal-hours">14</div><div class="timer-label">Hrs</div></div>
          <div class="timer-box"><div class="timer-num" id="deal-minutes">28</div><div class="timer-label">Mins</div></div>
          <div class="timer-box"><div class="timer-num" id="deal-seconds">45</div><div class="timer-label">Secs</div></div>
        </div>
        
        <div style="font-family: Outfit; font-weight: 700; font-size: 1.1rem; color: #ffffff;">Promo Code: <span style="color: var(--accent); background-color: #222; padding: 4px 8px; border-radius: var(--border-radius-sm);">ELEVORA20</span></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" alt="Special Promo Headphone" style="border-radius: var(--border-radius-lg); box-shadow: var(--shadow-lg);">
      </div>
    </div>
  </section>

  <!-- Scooter Delivery Road Divider -->
  <div class="road-divider-container" style="position: relative; height: 150px; background-color: var(--bg-secondary); overflow: hidden; margin: 40px 0;">
    <!-- Road Surface -->
    <div class="road-divider" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 35px; background-color: #222;">
      <!-- Lane Line -->
      <div class="road-lane-line" style="position: absolute; top: 50%; left: 0; width: 100%; height: 2px; border-top: 2px dashed rgba(255, 255, 255, 0.6); transform: translateY(-50%);"></div>
    </div>
    
    <!-- Speed Breakers -->
    <div class="speed-breaker" style="position: absolute; left: 30%; bottom: 25px; width: 36px; height: 18px; background: repeating-linear-gradient(-45deg, #ffd60a, #ffd60a 6px, #000 6px, #000 12px); border-radius: 18px 18px 0 0; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>
    <div class="speed-breaker" style="position: absolute; left: 70%; bottom: 25px; width: 36px; height: 18px; background: repeating-linear-gradient(-45deg, #ffd60a, #ffd60a 6px, #000 6px, #000 12px); border-radius: 18px 18px 0 0; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>

    <!-- Delivery Boy Scooter image -->
    <div class="delivery-scooter-wrap" id="delivery-scooter-wrap" style="position: absolute; bottom: 32px; left: -130px; width: 125px; height: 100px; background-image: url('<?php echo get_template_directory_uri(); ?>/assets/images/road-delivery.png'); background-size: contain; background-repeat: no-repeat; z-index: 3; transition: none;"></div>
  </div>

  <!-- Why Choose Us Cards -->
  <section class="section-spacing container reveal-element">
    <div style="text-align: center; margin-bottom: 40px;">
      <h2 class="section-title">Why Elevora?</h2>
      <p class="section-subtitle" style="margin: 8px auto 0;">We build premium tech essentials with bulletproof warranties and secure delivery pipelines.</p>
    </div>

    <div class="usps-grid">
      <div class="usp-card">
        <i class="fa-solid fa-truck-fast usp-icon"></i>
        <h4 class="usp-title">Fast Shipping</h4>
        <p class="usp-text">Express worldwide logistics direct to your doorstep with real-time route tracing codes.</p>
      </div>
      <div class="usp-card">
        <i class="fa-solid fa-shield-halved usp-icon"></i>
        <h4 class="usp-title">Secure Checkout</h4>
        <p class="usp-text">Encrypted token gateways protecting your payments via major international card processors.</p>
      </div>
      <div class="usp-card">
        <i class="fa-solid fa-rotate-left usp-icon"></i>
        <h4 class="usp-title">30-Day Returns</h4>
        <p class="usp-text">Not fully satisfied? Return your unused gadget within 30 days for a swift full refund.</p>
      </div>
      <div class="usp-card">
        <i class="fa-solid fa-circle-question usp-icon"></i>
        <h4 class="usp-title">24/7 Desk Help</h4>
        <p class="usp-text">Professional service engineers answering technical questions and order inquiries day or night.</p>
      </div>
    </div>
  </section>

  <!-- Interactive Accordion FAQs -->
  <section class="section-spacing container reveal-element">
    <div style="text-align: center; margin-bottom: 50px;">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p class="section-subtitle" style="margin: 8px auto 0;">Find swift solutions to common inquiries about shipping, warranty, and returns.</p>
    </div>

    <div class="faq-accordion">
      <div class="faq-item">
        <button class="faq-question">
          How long does delivery take?
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Standard delivery takes 5-10 business days depending on location. Express courier delivery options are available at checkout, delivering within 2-4 business days.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          Do Elevora gadgets come with a warranty?
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes, every single product sold on Elevora comes with a standard 12-month manufacturer warranty. The warranty covers hardware malfunctions and battery degradation defects.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          How can I track my package?
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Once your order is processed, you will receive an email containing a route tracking code. Simply enter this tracking number on our "Track Order" portal to view live courier status updates.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Customer Newsletter Section -->
  <section style="background-color: var(--bg-secondary); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 80px 0;" class="reveal-element">
    <div class="container" style="max-width: 600px; text-align: center;">
      <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 12px; font-family: Outfit;">Stay in the Tech Loop</h2>
      <p style="color: var(--text-muted); margin-bottom: 24px; font-size: 0.95rem;">Join Elevora's circular letters for early drops, exclusive coupon codes, and guides.</p>
      <form class="newsletter-form" style="max-width: 500px; margin: 0 auto;">
        <input type="email" placeholder="Your premium email address" class="newsletter-input" required style="background-color: var(--bg-primary); color: var(--text-primary); border: 1.5px solid var(--border-color);">
        <button type="submit" class="newsletter-btn">Subscribe</button>
      </form>
    </div>
  </section>

  <!-- Brand Story Section -->
  <section class="brand-story-section">
    <div class="container brand-story-wrap">
      <!-- Left Stack Boxes Column -->
      <div class="brand-story-img-frame">
        <img src="https://images.unsplash.com/photo-1566241477600-ac026ad43874?w=600" alt="Elevora packages" class="brand-story-img">
      </div>
      <!-- Right Details Column -->
      <div class="brand-story-content">
        <h2 class="brand-story-title">All Things Tech & Trusted</h2>
        <p class="brand-story-text">
          At Elevora, we offer more than gadgetsâ€”we deliver experiences. With handpicked, authentic products for every occasion, we set trends, not follow them!
        </p>
        <a href="<?php echo esc_url( home_url('/about/') ); ?>" class="brand-story-btn" style="display: inline-block; padding: 12px 24px; text-align: center;">
          Get to Know Us
        </a>
      </div>
    </div>
  </section>

  <!-- Dynamic Scooter animation listener -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      // Scooter Scroll Trigger Animation with Lerp and Bounce
      const scooter = document.getElementById("delivery-scooter-wrap");
      if (scooter) {
        let targetMovePct = -15;
        let currentMovePct = -15;

        // Initialize targetMovePct based on current scroll position
        const initScroll = () => {
          const rect = scooter.parentElement.getBoundingClientRect();
          const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
          if (rect.top <= viewHeight && rect.bottom >= 0) {
            const visiblePct = (viewHeight - rect.top) / (viewHeight + rect.height);
            targetMovePct = Math.min(Math.max(visiblePct * 125, -15), 115);
          }
        };
        initScroll();

        window.addEventListener("scroll", () => {
          const rect = scooter.parentElement.getBoundingClientRect();
          const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
          if (rect.top <= viewHeight && rect.bottom >= 0) {
            const visiblePct = (viewHeight - rect.top) / (viewHeight + rect.height);
            targetMovePct = Math.min(Math.max(visiblePct * 125, -15), 115);
          }
        }, { passive: true });

        function animate() {
          // Lerp for smooth horizontal movement
          currentMovePct += (targetMovePct - currentMovePct) * 0.08;
          
          // Update horizontal position
          scooter.style.left = `calc(${currentMovePct}% - 125px)`;

          // Speed breakers at 30% and 70%
          const b1 = 30;
          const b2 = 70;
          const halfWidth = 6; // Width of collision zone

          let bump = 0;
          let tilt = 0;

          if (Math.abs(currentMovePct - b1) < halfWidth) {
            const diff = (currentMovePct - b1) / halfWidth;
            bump = 16 * Math.cos(diff * Math.PI / 2);
            tilt = -12 * diff * (bump / 16);
          } else if (Math.abs(currentMovePct - b2) < halfWidth) {
            const diff = (currentMovePct - b2) / halfWidth;
            bump = 16 * Math.cos(diff * Math.PI / 2);
            tilt = -12 * diff * (bump / 16);
          }

          scooter.style.transform = `translateY(-${bump}px) rotate(${tilt}deg)`;

          requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
      }

      // Simple Deal Countdown Clock
      const daysBox = document.getElementById("deal-days");
      const hrsBox = document.getElementById("deal-hours");
      const minsBox = document.getElementById("deal-minutes");
      const secsBox = document.getElementById("deal-seconds");

      if (daysBox) {
        let totalSecs = (2 * 24 * 3600) + (14 * 3600) + (28 * 60) + 45;
        setInterval(() => {
          if (totalSecs > 0) {
            totalSecs--;
            const d = Math.floor(totalSecs / (3600 * 24));
            const h = Math.floor((totalSecs % (3600 * 24)) / 3600);
            const m = Math.floor((totalSecs % 3600) / 60);
            const s = totalSecs % 60;

            daysBox.textContent = d.toString().padStart(2, '0');
            hrsBox.textContent = h.toString().padStart(2, '0');
            minsBox.textContent = m.toString().padStart(2, '0');
            secsBox.textContent = s.toString().padStart(2, '0');
          }
        }, 1000);
      }
    });
  </script>

<?php get_footer(); ?>