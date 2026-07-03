<?php
/**
 * Template Name: Elevora About Brand
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">About Us</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">About Elevora</h1>
    </div>
  </section>

  <main class="container">
    <div class="about-story-grid reveal-element revealed" style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: center; margin-bottom: 80px;">
      <div class="about-story-img" style="border-radius: var(--border-radius-lg); overflow: hidden; box-shadow: var(--shadow-lg); background-color: var(--bg-secondary);">
        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" alt="Elevora creation story" style="width: 100%; display: block;">
      </div>
      <div>
        <span style="color: var(--accent-dark); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; display: inline-block; margin-bottom: 12px;">Our Brand Story</span>
        <h2 style="font-family: Outfit; font-size: 2rem; font-weight: 800; margin-bottom: 18px; line-height: 1.3;">Elevate Your Tech Lifestyle</h2>
        <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.95rem; line-height: 1.7;">Elevora was founded in 2026 with a singular, clear vision: to design and curate highly aesthetic, luxury mobile accessories that fit seamlessly into modern daily routines.</p>
        <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 0.95rem; line-height: 1.7;">We bridge the gap between utility and design elegance. By prioritizing high-grade raw components, advanced power safety certifications, and clean geometric designs, our gadgets act as statements of fashion as much as blocks of high performance.</p>
        <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="btn btn-primary" style="width: auto;">Shop The Catalog</a>
      </div>
    </div>

    <!-- Core Values -->
    <section class="reveal-element revealed" style="margin-bottom: 80px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h2 style="font-family: Outfit; font-size: 2rem; font-weight: 800;">Our Core Values</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 8px;">The principles guiding our designs and customer support pipelines.</p>
      </div>

      <div class="about-values-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
        <div class="value-card" style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 32px; text-align: center; background-color: var(--bg-secondary);">
          <i class="fa-solid fa-cube" style="font-size: 2.5rem; color: var(--accent-dark); margin-bottom: 20px; display: inline-block;"></i>
          <h3 style="font-family: Outfit; font-size: 1.15rem; margin-bottom: 12px;">Luxury Minimalism</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">No unnecessary layers. Sleek matte blocks, clean lines, and soft palettes matching the modern professional.</p>
        </div>
        <div class="value-card" style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 32px; text-align: center; background-color: var(--bg-secondary);">
          <i class="fa-solid fa-shield-halved" style="font-size: 2.5rem; color: var(--accent-dark); margin-bottom: 20px; display: inline-block;"></i>
          <h3 style="font-family: Outfit; font-size: 1.15rem; margin-bottom: 12px;">Premium Quality</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">Aerospace-grade titanium, dual-layer dacron shielding, and smart lithium protection safety grids.</p>
        </div>
        <div class="value-card" style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 32px; text-align: center; background-color: var(--bg-secondary);">
          <i class="fa-solid fa-globe" style="font-size: 2.5rem; color: var(--accent-dark); margin-bottom: 20px; display: inline-block;"></i>
          <h3 style="font-family: Outfit; font-size: 1.15rem; margin-bottom: 12px;">Global Accessibility</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">Fast logistics hubs supporting reliable shipping to over 150 countries with active routing codes.</p>
        </div>
      </div>
    </section>
  </main>

<?php get_footer(); ?>