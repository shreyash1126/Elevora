<?php
/**
 * Main WordPress Template File (Elevora Electronics Theme)
 *
 * @package Elevora
 * @version 2.0.0
 */

get_header(); ?>

  <main>
    <!-- 1. Hero Section with Auto Slider -->
    <section class="hero-section" id="hero-slider-section">
      <div class="hero-slider" id="hero-slider">
        <!-- Slide 1 -->
        <div class="hero-slide">
          <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero_bg.jpg" alt="Elevora Premium Electronics Setup" class="hero-bg">
          <div class="hero-overlay"></div>
          <div class="container" style="position:relative; z-index:3; width:100%;">
            <div class="hero-content">
              <span class="hero-tag">Bestseller</span>
              <h1 class="hero-title">Tech that Powers<br>Your Passion</h1>
              <p class="hero-desc">Meet the Elevora Apex Smartphone 5G. Ultimate speed, professional triple cameras, and a jaw-dropping 120Hz LTPO display.</p>
              <div style="display:flex; gap:16px;">
                <a href="<?php echo esc_url( home_url( '/shop.html' ) ); ?>" class="btn btn-primary">Shop Now</a>
                <a href="<?php echo esc_url( home_url( '/product.html?id=unseen' ) ); ?>" class="btn btn-secondary">Discover Apex</a>
              </div>
            </div>
          </div>
        </div>
        <!-- Slide 2 -->
        <div class="hero-slide">
          <img src="<?php echo get_template_directory_uri(); ?>/assets/images/laptop.jpg" alt="Premium ultra-thin laptop open on desk" class="hero-bg">
          <div class="hero-overlay"></div>
          <div class="container" style="position:relative; z-index:3; width:100%;">
            <div class="hero-content">
              <span class="hero-tag" style="background-color: var(--color-accent);">Ultra Slim</span>
              <h1 class="hero-title">Power Meets<br>Extreme Portability</h1>
              <p class="hero-desc">Meet Elevora AirBook Slim. A featherlight quad-core laptop engineered for creators, developers, and professionals on the go.</p>
              <div style="display:flex; gap:16px;">
                <a href="<?php echo esc_url( home_url( '/product.html?id=sheerscreen' ) ); ?>" class="btn btn-primary">Shop AirBook</a>
                <a href="<?php echo esc_url( home_url( '/shop.html' ) ); ?>" class="btn btn-secondary">Explore All</a>
              </div>
            </div>
          </div>
        </div>
        <!-- Slide 3 -->
        <div class="hero-slide">
          <img src="<?php echo get_template_directory_uri(); ?>/assets/images/headphones.jpg" alt="Wireless active noise canceling headphones" class="hero-bg">
          <div class="hero-overlay"></div>
          <div class="container" style="position:relative; z-index:3; width:100%;">
            <div class="hero-content">
              <span class="hero-tag">Premium Audio</span>
              <h1 class="hero-title">Pure Audio Bliss,<br>Zero Distraction</h1>
              <p class="hero-desc">SoundFlow Wireless Headphones with hybrid ANC, spatial 3D audio, and up to 40 hours of continuous music enjoyment.</p>
              <div style="display:flex; gap:16px;">
                <a href="<?php echo esc_url( home_url( '/product.html?id=glow' ) ); ?>" class="btn btn-primary">Shop SoundFlow</a>
                <a href="<?php echo esc_url( home_url( '/shop.html' ) ); ?>" class="btn btn-secondary">View Key Specs</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Slider Arrows -->
      <button class="slider-arrow prev" aria-label="Previous Slide"><i class="fas fa-chevron-left"></i></button>
      <button class="slider-arrow next" aria-label="Next Slide"><i class="fas fa-chevron-right"></i></button>
      <!-- Slider Dots -->
      <div class="slider-dots"></div>
    </section>

    <!-- 2. Live Brand Marquee -->
    <section class="live-brand-marquee">
      <div class="marquee-track">
        <div class="marquee-list">
          <span>ELEVATE YOUR TECH EXPERIENCE</span>
          <svg class="marquee-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent);"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>1-YEAR STANDARD WARRANTY</span>
          <svg class="marquee-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent);"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>FREE SHIPPING ON ORDERS $150+</span>
          <svg class="marquee-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent);"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>PREMIUM CUSTOMER SUPPORT</span>
        </div>
      </div>
    </section>

    <!-- 3. Elevora Top Picks Section -->
    <section class="section-padding container">
      <div class="section-header">
        <h2 class="section-title">Elevora Top Picks</h2>
        <a href="<?php echo esc_url( home_url( '/shop.html' ) ); ?>" class="section-link">Explore Collection <i class="fas fa-arrow-right"></i></a>
      </div>

      <!-- Container for dynamic app.js render and fallback cards -->
      <div class="product-grid" id="picks-grid-container">
        <!-- Product 1 -->
        <div class="product-card">
          <div class="product-card-badge">Bestseller</div>
          <div class="product-card-img">
            <a href="product.html?id=unseen"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/smartphone.jpg" alt="Elevora Apex Smartphone 5G"></a>
            <button class="product-card-quickadd" onclick="event.preventDefault(); addToCart('unseen', 1, true)">Quick Add +</button>
          </div>
          <div class="product-card-info">
            <span class="product-card-type">Phones</span>
            <h3 class="product-card-title"><a href="product.html?id=unseen">Elevora Apex Smartphone 5G</a></h3>
            <div class="product-card-price">$899.00</div>
          </div>
        </div>

        <!-- Product 2 -->
        <div class="product-card">
          <div class="product-card-badge new">New</div>
          <div class="product-card-img">
            <a href="product.html?id=glow"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/headphones.jpg" alt="Elevora SoundFlow Headphones"></a>
            <button class="product-card-quickadd" onclick="event.preventDefault(); addToCart('glow', 1, true)">Quick Add +</button>
          </div>
          <div class="product-card-info">
            <span class="product-card-type">Audio</span>
            <h3 class="product-card-title"><a href="product.html?id=glow">Elevora SoundFlow Headphones</a></h3>
            <div class="product-card-price">$299.00</div>
          </div>
        </div>

        <!-- Product 3 -->
        <div class="product-card">
          <div class="product-card-badge">Bestseller</div>
          <div class="product-card-img">
            <a href="product.html?id=play-lotion"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/smartwatch.jpg" alt="Elevora ChronoFit Smartwatch"></a>
            <button class="product-card-quickadd" onclick="event.preventDefault(); addToCart('play-lotion', 1, true)">Quick Add +</button>
          </div>
          <div class="product-card-info">
            <span class="product-card-type">Wearables</span>
            <h3 class="product-card-title"><a href="product.html?id=play-lotion">Elevora ChronoFit Smartwatch</a></h3>
            <div class="product-card-price">$249.00</div>
          </div>
        </div>

        <!-- Product 4 -->
        <div class="product-card">
          <div class="product-card-badge">Bestseller</div>
          <div class="product-card-img">
            <a href="product.html?id=body-mist"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/speaker.jpg" alt="Elevora WaveBlast Speaker"></a>
            <button class="product-card-quickadd" onclick="event.preventDefault(); addToCart('body-mist', 1, true)">Quick Add +</button>
          </div>
          <div class="product-card-info">
            <span class="product-card-type">Audio</span>
            <h3 class="product-card-title"><a href="product.html?id=body-mist">Elevora WaveBlast Speaker</a></h3>
            <div class="product-card-price">$129.00</div>
          </div>
        </div>

        <!-- Product 5 -->
        <div class="product-card">
          <div class="product-card-badge new">New</div>
          <div class="product-card-img">
            <a href="product.html?id=sheerscreen"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/laptop.jpg" alt="Elevora AirBook Slim Laptop"></a>
            <button class="product-card-quickadd" onclick="event.preventDefault(); addToCart('sheerscreen', 1, true)">Quick Add +</button>
          </div>
          <div class="product-card-info">
            <span class="product-card-type">Computers</span>
            <h3 class="product-card-title"><a href="product.html?id=sheerscreen">Elevora AirBook Slim Laptop</a></h3>
            <div class="product-card-price">$999.00</div>
          </div>
        </div>

        <!-- Product 6 -->
        <div class="product-card">
          <div class="product-card-badge new">New</div>
          <div class="product-card-img">
            <a href="product.html?id=skin-tint"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/monitor.jpg" alt="Elevora CineVue Curved Monitor"></a>
            <button class="product-card-quickadd" onclick="event.preventDefault(); addToCart('skin-tint', 1, true)">Quick Add +</button>
          </div>
          <div class="product-card-info">
            <span class="product-card-type">Computers</span>
            <h3 class="product-card-title"><a href="product.html?id=skin-tint">Elevora CineVue 4K Monitor</a></h3>
            <div class="product-card-price">$449.00</div>
          </div>
        </div>

        <!-- Product 7 -->
        <div class="product-card">
          <div class="product-card-badge">Bestseller</div>
          <div class="product-card-img">
            <a href="product.html?id=glow-stick"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/charger.jpg" alt="Elevora PowerDock Charger"></a>
            <button class="product-card-quickadd" onclick="event.preventDefault(); addToCart('glow-stick', 1, true)">Quick Add +</button>
          </div>
          <div class="product-card-info">
            <span class="product-card-type">Accessories</span>
            <h3 class="product-card-title"><a href="product.html?id=glow-stick">Elevora PowerDock Charger</a></h3>
            <div class="product-card-price">$49.00</div>
          </div>
        </div>

        <!-- Product 8 -->
        <div class="product-card">
          <div class="product-card-badge new">New</div>
          <div class="product-card-img">
            <a href="product.html?id=mattescreen"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/keyboard.jpg" alt="Elevora ClickMaster Keyboard"></a>
            <button class="product-card-quickadd" onclick="event.preventDefault(); addToCart('mattescreen', 1, true)">Quick Add +</button>
          </div>
          <div class="product-card-info">
            <span class="product-card-type">Accessories</span>
            <h3 class="product-card-title"><a href="product.html?id=mattescreen">Elevora ClickMaster Keyboard</a></h3>
            <div class="product-card-price">$149.00</div>
          </div>
        </div>

      </div>
    </section>

  </main>

<?php get_footer(); ?>
