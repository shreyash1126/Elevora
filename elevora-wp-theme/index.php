<?php
/**
 * Main WordPress Template File (Elevora Electronics Theme)
 *
 * @package Elevora
 * @version 2.0.0
 */

get_header(); ?>

  <main>
    <!-- Hero Section -->
    <section class="hero-section" id="hero-slider-section">
      <div class="hero-slider" id="hero-slider">
        <div class="hero-slide active">
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
      </div>
    </section>

    <!-- Elevora Picks Row -->
    <section class="section-padding container">
      <div class="section-header">
        <h2 class="section-title">Elevora Top Picks</h2>
        <a href="<?php echo esc_url( home_url( '/shop.html' ) ); ?>" class="section-link">Explore Collection <i class="fas fa-arrow-right"></i></a>
      </div>

      <div class="product-grid" id="picks-grid-container">
        <!-- Product 1: Smartphone -->
        <div class="pick-card">
          <a href="<?php echo esc_url( home_url( '/product.html?id=unseen' ) ); ?>" class="pick-card-link">
            <div class="pick-card-img-wrapper">
              <span class="pick-badge badge-blue">5G Flagship</span>
              <img src="<?php echo get_template_directory_uri(); ?>/assets/images/smartphone.jpg" alt="Elevora Apex Smartphone 5G">
            </div>
            <div class="pick-card-info">
              <span class="pick-card-category">Mobiles & Audio</span>
              <h3 class="pick-card-title">Elevora Apex Smartphone 5G</h3>
              <div class="pick-card-rating">
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <span>(1240)</span>
              </div>
              <div class="pick-card-footer">
                <div class="pick-card-price">$899.00</div>
                <button class="btn btn-primary pick-add-btn" onclick="event.preventDefault(); addToCart('unseen', 1, true)">Add to Bag</button>
              </div>
            </div>
          </a>
        </div>

        <!-- Product 2: Headphones -->
        <div class="pick-card">
          <a href="<?php echo esc_url( home_url( '/product.html?id=glow' ) ); ?>" class="pick-card-link">
            <div class="pick-card-img-wrapper">
              <span class="pick-badge badge-blue">Active ANC</span>
              <img src="<?php echo get_template_directory_uri(); ?>/assets/images/headphones.jpg" alt="Elevora SoundFlow Headphones">
            </div>
            <div class="pick-card-info">
              <span class="pick-card-category">Mobiles & Audio</span>
              <h3 class="pick-card-title">Elevora SoundFlow Headphones</h3>
              <div class="pick-card-rating">
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <span>(980)</span>
              </div>
              <div class="pick-card-footer">
                <div class="pick-card-price">$299.00</div>
                <button class="btn btn-primary pick-add-btn" onclick="event.preventDefault(); addToCart('glow', 1, true)">Add to Bag</button>
              </div>
            </div>
          </a>
        </div>

        <!-- Product 3: Smartwatch -->
        <div class="pick-card">
          <a href="<?php echo esc_url( home_url( '/product.html?id=play-lotion' ) ); ?>" class="pick-card-link">
            <div class="pick-card-img-wrapper">
              <span class="pick-badge badge-blue">Wearable</span>
              <img src="<?php echo get_template_directory_uri(); ?>/assets/images/smartwatch.jpg" alt="Elevora ChronoFit Smartwatch">
            </div>
            <div class="pick-card-info">
              <span class="pick-card-category">Laptops & Wearables</span>
              <h3 class="pick-card-title">Elevora ChronoFit Smartwatch</h3>
              <div class="pick-card-rating">
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <span>(2150)</span>
              </div>
              <div class="pick-card-footer">
                <div class="pick-card-price">$249.00</div>
                <button class="btn btn-primary pick-add-btn" onclick="event.preventDefault(); addToCart('play-lotion', 1, true)">Add to Bag</button>
              </div>
            </div>
          </a>
        </div>

        <!-- Product 4: Speaker -->
        <div class="pick-card">
          <a href="<?php echo esc_url( home_url( '/product.html?id=body-mist' ) ); ?>" class="pick-card-link">
            <div class="pick-card-img-wrapper">
              <span class="pick-badge badge-blue">IPX7 Waterproof</span>
              <img src="<?php echo get_template_directory_uri(); ?>/assets/images/speaker.jpg" alt="Elevora WaveBlast Speaker">
            </div>
            <div class="pick-card-info">
              <span class="pick-card-category">Mobiles & Audio</span>
              <h3 class="pick-card-title">Elevora WaveBlast Speaker</h3>
              <div class="pick-card-rating">
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <i class="fas fa-star" style="color:var(--color-accent)"></i>
                <span>(730)</span>
              </div>
              <div class="pick-card-footer">
                <div class="pick-card-price">$129.00</div>
                <button class="btn btn-primary pick-add-btn" onclick="event.preventDefault(); addToCart('body-mist', 1, true)">Add to Bag</button>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </main>

<?php get_footer(); ?>
