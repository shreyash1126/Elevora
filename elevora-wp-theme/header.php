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
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
        <span>ELEVORA</span><span class="logo-dot"></span>
      </a>

      <nav class="nav-menu" id="nav-menu">
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

      <div class="header-actions">
        <div class="header-search-wrap">
          <input type="text" placeholder="Search premium tech..." id="header-search-input" class="header-search-input">
          <button id="header-search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
          <div class="search-dropdown" id="search-dropdown"></div>
        </div>

        <button class="action-btn" id="theme-toggle-btn" title="Toggle Dark/Light Mode">
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

        <button class="action-btn mobile-nav-toggle" id="mobile-menu-toggle" title="Toggle Mobile Navigation">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- Category sub-navigation bar -->
  <nav class="category-nav-bar">
    <div class="container category-nav-container">
      <div class="category-nav-list">
        
        <!-- New Arrivals -->
        <a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop/')); ?>" class="category-nav-item">New Arrivals</a>
        
        <!-- Mobile Accessories -->
        <div class="category-nav-item">
          Mobile Accessories <i class="fa-solid fa-chevron-down"></i>
          <div class="category-dropdown">
            <a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop/')); ?>" class="dropdown-link">Mobile Accessories</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Power%20Banks') ); ?>" class="dropdown-link">Power Banks</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Charging%20Cables') ); ?>" class="dropdown-link">Charging Cables</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Wireless%20Chargers') ); ?>" class="dropdown-link">Wireless Chargers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Phone%20Holders') ); ?>" class="dropdown-link">Phone Holders</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Chargers') ); ?>" class="dropdown-link">Chargers</a>
          </div>
        </div>
        
        <!-- Tech Gadgets -->
        <div class="category-nav-item">
          Tech Gadgets <i class="fa-solid fa-chevron-down"></i>
          <div class="category-dropdown">
            <a href="<?php echo esc_url( home_url('/shop/?category=Games%20%26%20Consoles') ); ?>" class="dropdown-link">Games & Consoles</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Bluetooth%20Speakers') ); ?>" class="dropdown-link">Bluetooth Speakers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Power%20Banks') ); ?>" class="dropdown-link">Power Banks</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Charging%20Cables') ); ?>" class="dropdown-link">Charging Cables</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Floating%20Lamps') ); ?>" class="dropdown-link">Floating Lamps</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Wireless%20Chargers') ); ?>" class="dropdown-link">Wireless Chargers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Clocks%20%26%20Timers') ); ?>" class="dropdown-link">Clocks & Timers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=RGB%20%26%20Mood%20Lighting') ); ?>" class="dropdown-link">RGB & Mood Lighting</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Home%20Utility') ); ?>" class="dropdown-link">Home Utility</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Humidifiers') ); ?>" class="dropdown-link">Humidifiers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Kitchen%20Gadgets') ); ?>" class="dropdown-link">Kitchen Gadgets</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Extensions%20%26%20Multi-Plugs') ); ?>" class="dropdown-link">Extensions & Multi-Plugs</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Computer%20Accessories') ); ?>" class="dropdown-link">Computer Accessories</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Home%20Decor') ); ?>" class="dropdown-link">Home Decor</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Spy%20Camera%20%26%20WiFi%20Camera') ); ?>" class="dropdown-link">Spy Camera & WiFi Camera</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Projectors') ); ?>" class="dropdown-link">Projectors</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Party%20Gadgets') ); ?>" class="dropdown-link">Party Gadgets</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Health%20%26%20Beauty') ); ?>" class="dropdown-link">Health & Beauty</a>
          </div>
        </div>
        
        <!-- Tools & Utility -->
        <div class="category-nav-item">
          Tools & Utility <i class="fa-solid fa-chevron-down"></i>
          <div class="category-dropdown">
            <a href="<?php echo esc_url( home_url('/shop/?category=Games%20%26%20Consoles') ); ?>" class="dropdown-link">Games & Consoles</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Bluetooth%20Speakers') ); ?>" class="dropdown-link">Bluetooth Speakers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Power%20Banks') ); ?>" class="dropdown-link">Power Banks</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Charging%20Cables') ); ?>" class="dropdown-link">Charging Cables</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Floating%20Lamps') ); ?>" class="dropdown-link">Floating Lamps</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Wireless%20Chargers') ); ?>" class="dropdown-link">Wireless Chargers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Clocks%20%26%20Timers') ); ?>" class="dropdown-link">Clocks & Timers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=RGB%20%26%20Mood%20Lighting') ); ?>" class="dropdown-link">RGB & Mood Lighting</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Home%20Utility') ); ?>" class="dropdown-link">Home Utility</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Humidifiers') ); ?>" class="dropdown-link">Humidifiers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Kitchen%20Gadgets') ); ?>" class="dropdown-link">Kitchen Gadgets</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Extensions%20%26%20Multi-Plugs') ); ?>" class="dropdown-link">Extensions & Multi-Plugs</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Computer%20Accessories') ); ?>" class="dropdown-link">Computer Accessories</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Home%20Decor') ); ?>" class="dropdown-link">Home Decor</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Spy%20Camera%20%26%20WiFi%20Camera') ); ?>" class="dropdown-link">Spy Camera & WiFi Camera</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Projectors') ); ?>" class="dropdown-link">Projectors</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Party%20Gadgets') ); ?>" class="dropdown-link">Party Gadgets</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Health%20%26%20Beauty') ); ?>" class="dropdown-link">Health & Beauty</a>
          </div>
        </div>
        
        <!-- Car & Travel -->
        <div class="category-nav-item">
          Car & Travel <i class="fa-solid fa-chevron-down"></i>
          <div class="category-dropdown">
            <a href="<?php echo esc_url( home_url('/shop/?category=Games%20%26%20Consoles') ); ?>" class="dropdown-link">Games & Consoles</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Bluetooth%20Speakers') ); ?>" class="dropdown-link">Bluetooth Speakers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Power%20Banks') ); ?>" class="dropdown-link">Power Banks</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Charging%20Cables') ); ?>" class="dropdown-link">Charging Cables</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Floating%20Lamps') ); ?>" class="dropdown-link">Floating Lamps</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Wireless%20Chargers') ); ?>" class="dropdown-link">Wireless Chargers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Clocks%20%26%20Timers') ); ?>" class="dropdown-link">Clocks & Timers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=RGB%20%26%20Mood%20Lighting') ); ?>" class="dropdown-link">RGB & Mood Lighting</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Home%20Utility') ); ?>" class="dropdown-link">Home Utility</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Humidifiers') ); ?>" class="dropdown-link">Humidifiers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Kitchen%20Gadgets') ); ?>" class="dropdown-link">Kitchen Gadgets</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Extensions%20%26%20Multi-Plugs') ); ?>" class="dropdown-link">Extensions & Multi-Plugs</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Computer%20Accessories') ); ?>" class="dropdown-link">Computer Accessories</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Home%20Decor') ); ?>" class="dropdown-link">Home Decor</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Spy%20Camera%20%26%20WiFi%20Camera') ); ?>" class="dropdown-link">Spy Camera & WiFi Camera</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Projectors') ); ?>" class="dropdown-link">Projectors</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Party%20Gadgets') ); ?>" class="dropdown-link">Party Gadgets</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Health%20%26%20Beauty') ); ?>" class="dropdown-link">Health & Beauty</a>
          </div>
        </div>
        
        <!-- Offers & Combos -->
        <div class="category-nav-item">
          Offers & Combos <i class="fa-solid fa-chevron-down"></i>
          <div class="category-dropdown">
            <a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop/')); ?>" class="dropdown-link">Buy 1 Get 1 Free</a>
            <a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop/')); ?>" class="dropdown-link">Under â‚¹999 Deals</a>
            <a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop/')); ?>" class="dropdown-link">Combo Packs</a>
            <a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop/')); ?>" class="dropdown-link">Clearance Sale</a>
          </div>
        </div>
        
        <!-- Shop By Price -->
        <div class="category-nav-item">
          Shop By Price <i class="fa-solid fa-chevron-down"></i>
          <div class="category-dropdown">
            <a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop/')); ?>" class="dropdown-link">Under â‚¹499</a>
            <a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop/')); ?>" class="dropdown-link">Under â‚¹999</a>
            <a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop/')); ?>" class="dropdown-link">Under â‚¹1999</a>
            <a href="<?php echo class_exists('WooCommerce') ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop/')); ?>" class="dropdown-link">Premium Selection</a>
          </div>
        </div>
        
        <!-- Gifting -->
        <div class="category-nav-item">
          Gifting <i class="fa-solid fa-chevron-down"></i>
          <div class="category-dropdown">
            <a href="<?php echo esc_url( home_url('/shop/?category=Games%20%26%20Consoles') ); ?>" class="dropdown-link">Games & Consoles</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Bluetooth%20Speakers') ); ?>" class="dropdown-link">Bluetooth Speakers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Power%20Banks') ); ?>" class="dropdown-link">Power Banks</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Charging%20Cables') ); ?>" class="dropdown-link">Charging Cables</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Floating%20Lamps') ); ?>" class="dropdown-link">Floating Lamps</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Wireless%20Chargers') ); ?>" class="dropdown-link">Wireless Chargers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Clocks%20%26%20Timers') ); ?>" class="dropdown-link">Clocks & Timers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=RGB%20%26%20Mood%20Lighting') ); ?>" class="dropdown-link">RGB & Mood Lighting</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Home%20Utility') ); ?>" class="dropdown-link">Home Utility</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Humidifiers') ); ?>" class="dropdown-link">Humidifiers</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Kitchen%20Gadgets') ); ?>" class="dropdown-link">Kitchen Gadgets</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Extensions%20%26%20Multi-Plugs') ); ?>" class="dropdown-link">Extensions & Multi-Plugs</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Computer%20Accessories') ); ?>" class="dropdown-link">Computer Accessories</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Home%20Decor') ); ?>" class="dropdown-link">Home Decor</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Spy%20Camera%20%26%20WiFi%20Camera') ); ?>" class="dropdown-link">Spy Camera & WiFi Camera</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Projectors') ); ?>" class="dropdown-link">Projectors</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Party%20Gadgets') ); ?>" class="dropdown-link">Party Gadgets</a>
            <a href="<?php echo esc_url( home_url('/shop/?category=Health%20%26%20Beauty') ); ?>" class="dropdown-link">Health & Beauty</a>
          </div>
        </div>
        
        <!-- Support -->
        <div class="category-nav-item">
          Support <i class="fa-solid fa-chevron-down"></i>
          <div class="category-dropdown">
            <a href="<?php echo esc_url( home_url('/track-order/') ); ?>" class="dropdown-link">Track Order</a>
            <a href="<?php echo esc_url( home_url('/contact/') ); ?>" class="dropdown-link">Contact Us</a>
            <a href="<?php echo esc_url( home_url('/faq/') ); ?>" class="dropdown-link">FAQ Desk</a>
            <a href="<?php echo esc_url( home_url('/my-account/') ); ?>" class="dropdown-link">Returns & Refunds</a>
          </div>
        </div>

      </div>
    </div>
  </nav>