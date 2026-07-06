<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="profile" href="https://gmpg.org/xfn/11">
  <?php wp_head(); ?>
  <script>
    // Helper to generate dynamic WordPress URLs inside local JS files
    function getThemeUrl(pageSlug) {
      const urls = {
        home: "<?php echo esc_url(home_url('/')); ?>",
        shop: "<?php echo esc_url(home_url('/shop/')); ?>",
        product: "<?php echo esc_url(home_url('/product/')); ?>",
        cart: "<?php echo esc_url(home_url('/cart/')); ?>",
        checkout: "<?php echo esc_url(home_url('/checkout/')); ?>",
        wishlist: "<?php echo esc_url(home_url('/wishlist/')); ?>",
        "my-account": "<?php echo esc_url(home_url('/my-account/')); ?>",
        about: "<?php echo esc_url(home_url('/about-us/')); ?>",
        contact: "<?php echo esc_url(home_url('/contact-us/')); ?>",
        faq: "<?php echo esc_url(home_url('/faq/')); ?>",
        blog: "<?php echo esc_url(home_url('/blog/')); ?>",
        "track-order": "<?php echo esc_url(home_url('/track-order/')); ?>",
        compare: "<?php echo esc_url(home_url('/compare/')); ?>",
        login: "<?php echo esc_url(home_url('/login/')); ?>",
        register: "<?php echo esc_url(home_url('/register/')); ?>"
      };
      return urls[pageSlug] || "<?php echo esc_url(home_url('/')); ?>" + pageSlug + "/";
    }
  </script>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

  <!-- Rotating announcement bar -->
  <section class="announcement-bar">
    <div class="container announcement-slider">
      <div class="announcement-item" style="display: flex;">
        <span>ðŸ”¥ FLASH SALE:</span> USE CODE ELEVORA20 FOR 20% OFF ALL PRODUCTS SITEWIDE!
      </div>
      <div class="announcement-item" style="display: none;">
        <span>ðŸšš FREE SHIPPING:</span> ON ALL ORDERS OVER $100 & EASY 30-DAY RETURNS
      </div>
    </div>
  </section>

  <!-- Premium header -->
  <header>
    <div class="container header-container">
      <div class="header-top-row">
        <!-- Mobile hamburger menu -->
        <button id="mobile-menu-toggle" class="action-btn" style="display: none;" aria-label="Toggle Menu">
          <i class="fa-solid fa-bars"></i>
        </button>
        
        <!-- Logo -->
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">ELEVORA<span class="logo-dot"></span></a>
        
        <!-- Search bar input -->
        <div style="flex-grow: 1; max-width: 500px; margin: 0 40px; position: relative;" class="desktop-search-wrap">
          <form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" style="display: flex; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background-color: var(--bg-secondary);">
            <input type="search" placeholder="Search premium electronics..." value="<?php echo get_search_query(); ?>" name="s" style="flex-grow: 1; padding: 10px 16px; font-size: 0.9rem; color: var(--text-primary);" autocomplete="off">
            <button type="submit" style="padding: 0 16px; color: var(--text-secondary); cursor: pointer;" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>

        <!-- Right Side icons -->
        <div class="header-actions">
          <button class="action-btn theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle Theme">
            <i class="fa-regular fa-moon"></i>
          </button>
          <button class="action-btn" onclick="toggleSearchOverlay()" aria-label="Search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <a href="<?php echo esc_url( home_url( '/wishlist/' ) ); ?>" class="action-btn wishlist-toggle-btn" aria-label="Wishlist">
            <i class="fa-regular fa-heart"></i>
            <span class="badge-count wishlist-count" style="display: none;">0</span>
          </a>
          <button class="action-btn" id="cart-btn" onclick="openMiniCartDrawer()" aria-label="Cart">
            <i class="fa-solid fa-shopping-bag"></i>
            <span class="badge-count cart-count" id="cart-badge" style="display: none;">0</span>
          </button>
        </div>
      </div>

      <!-- Categories Nav bar -->
      <nav class="category-nav-list" id="nav-menu">
        <?php
        if ( has_nav_menu( 'menu-1' ) ) {
            wp_nav_menu( array(
                'theme_location' => 'menu-1',
                'container'      => false,
                'items_wrap'     => '%3$s',
                'fallback_cb'    => 'elevora_fallback_menu',
            ) );
        } else {
            elevora_fallback_menu();
        }
        ?>
      </nav>
    </div>
  </header>

  <!-- Fullscreen Autocomplete Search Overlay -->
  <div class="search-overlay" id="search-overlay">
    <button class="search-overlay-close" onclick="closeSearchOverlay()" aria-label="Close search">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="search-overlay-container">
      <input type="text" placeholder="Type key electronics terms (e.g. MagSafe, ANC Wireless)..." class="search-overlay-input" id="search-overlay-input" autocomplete="off">
      <div class="search-suggestions" id="search-suggestions">
        <!-- Matches rendered dynamically via search.js -->
      </div>
    </div>
  </div>