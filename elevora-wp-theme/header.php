<!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme="light">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
  
  <script>
    // Set theme and create global utility paths before loading assets
    window.ElevoraThemeSettings = {
      template_url: '<?php echo esc_js( get_template_directory_uri() ); ?>',
      home_url: '<?php echo esc_js( home_url( '/' ) ); ?>'
    };
    function getThemeUrl(page) {
      if (page === 'index' || page === '') {
        return window.ElevoraThemeSettings.home_url;
      }
      return window.ElevoraThemeSettings.home_url + page + '/';
    }
  </script>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

  <!-- Announcement Bar -->
  <div class="announcement-bar">
    <div class="announcement-slider">
      <div class="announcement-item"><i class="fa-solid fa-truck-fast"></i> Free International Shipping on orders over <span>$75</span></div>
      <div class="announcement-item"><i class="fa-solid fa-bolt"></i> Deal of the day: <span>20% OFF</span> using code <strong>ELEVORA20</strong></div>
      <div class="announcement-item"><i class="fa-solid fa-rotate-left"></i> Hassle-Free 30 Days Return Policy</div>
    </div>
  </div>

  <!-- Header -->
  <header>
    <div class="container header-container">
      <!-- Top Row -->
      <div class="header-top-row">
        <!-- Search icon/button -->
        <div class="header-search-wrap-toggle">
          <button class="search-trigger-btn" onclick="toggleSearchOverlay()" aria-label="Search gadgets">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <!-- Centered Logo -->
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
          <span>ELEVORA</span><span class="logo-dot"></span>
        </a>

        <!-- Actions -->
        <div class="header-actions">
          <button class="action-btn theme-toggle-btn" id="theme-toggle-btn" title="Toggle Dark/Light Mode">
            <i class="fa-regular fa-moon"></i>
          </button>

          <a href="<?php echo esc_url( get_permalink( get_page_by_path( 'wishlist' ) ) ? get_permalink( get_page_by_path( 'wishlist' ) ) : home_url( '/wishlist/' ) ); ?>" class="action-btn" id="wishlist-btn" title="Wishlist">
            <i class="fa-regular fa-heart"></i>
            <span class="badge-count wishlist-count" id="wishlist-badge">0</span>
          </a>

          <button class="action-btn" id="cart-btn" onclick="openMiniCartDrawer()" title="Shopping Cart">
            <i class="fa-solid fa-shopping-bag"></i>
            <span class="badge-count cart-count" id="cart-badge">0</span>
          </button>

          <a href="<?php echo esc_url( home_url( '/my-account/' ) ); ?>" class="action-btn" title="Account Portal">
            <i class="fa-regular fa-user"></i>
          </a>

          <button class="action-btn mobile-nav-toggle" id="mobile-menu-toggle" title="Toggle Mobile Navigation">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      <!-- Bottom Row (Navigation Items) -->
      <nav class="header-bottom-row category-nav-list nav-menu" id="nav-menu">
        <?php
        if ( has_nav_menu( 'primary' ) ) {
            wp_nav_menu( array(
                'theme_location' => 'primary',
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

  <!-- Search Overlay -->
  <div class="search-overlay" id="search-overlay">
    <div class="search-overlay-container">
      <input type="text" class="header-search-input search-overlay-input" placeholder="Type to search premium gadgets...">
      <button class="search-overlay-close" onclick="closeSearchOverlay()"><i class="fa-solid fa-xmark"></i></button>
    </div>
  </div>