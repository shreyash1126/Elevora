<!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme="light">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

  <!-- 1. Announcement Bar -->
  <div class="announcement-bar">
    <div class="announcement-bar-content">
      <span>⚡ FREE SHIPPING ON ORDERS $150+!</span>
      <span>⚡ UPGRADE YOUR DAILY PRODUCTIVITY WITH ELEVORA TECH</span>
      <span>⚡ GET 10% OFF YOUR FIRST ORDER WITH CODE: TECH10</span>
      <span>⚡ FREE SHIPPING ON ORDERS $150+!</span>
    </div>
  </div>

  <!-- 2. Sticky Header -->
  <header class="site-header">
    <div class="container">
      <div class="header-main">
        <!-- Left Section (hamburger on mobile) -->
        <div class="header-left">
          <button class="hamburger" id="hamburger-btn" aria-label="Open Navigation Menu">
            <i class="fas fa-bars"></i>
          </button>
        </div>

        <!-- Center Section (Centered Logo) -->
        <div class="header-center">
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo" id="brand-logo">
            ele<span class="logo-tech-container"><svg viewBox="0 0 100 100" style="width:20px; height:20px; display:inline-block; vertical-align:middle; margin:0 2px; color:var(--color-primary);"><circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="8" fill="none"/><path d="M50 10 L50 40 M50 60 L50 90 M10 50 L40 50 M60 50 L90 50" stroke="currentColor" stroke-width="8" stroke-linecap="round"/></svg></span>ora
          </a>
        </div>

        <!-- Right Section (Search, Theme Toggle, Account, Cart) -->
        <div class="header-right">
          <div class="header-search" id="desktop-search-trigger">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search..." readonly>
          </div>
          
          <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Dark/Bright Theme">
            <i class="fas fa-sun sun-icon"></i>
            <i class="fas fa-moon moon-icon"></i>
          </button>
          
          <a href="#" class="header-account-link" id="account-btn">
            <i class="far fa-user"></i>
            <span>Sign In</span>
          </a>
          
          <button class="header-btn" id="cart-btn" aria-label="Open Shopping Bag">
            <i class="fas fa-shopping-bag"></i>
            <span class="cart-count">0</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="header-nav">
      <div class="container">
        <ul class="nav-list">
          <li class="nav-item"><a href="<?php echo esc_url( home_url( '/shop.html' ) ); ?>" class="nav-link">Shop All</a></li>
          <li class="nav-item"><a href="<?php echo esc_url( home_url( '/shop.html?category=Mobiles%20%26%20Audio' ) ); ?>" class="nav-link">Mobiles & Audio</a></li>
          <li class="nav-item"><a href="<?php echo esc_url( home_url( '/shop.html?category=Laptops%20%26%20Wearables' ) ); ?>" class="nav-link">Laptops & Wearables</a></li>
          <li class="nav-item"><a href="<?php echo esc_url( home_url( '/quiz.html' ) ); ?>" class="nav-link">Tech Quiz</a></li>
          <li class="nav-item"><a href="<?php echo esc_url( home_url( '/about.html' ) ); ?>" class="nav-link">Discover</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <!-- Mobile Drawer -->
  <div class="mobile-menu-drawer" id="mobile-drawer">
    <ul class="mobile-nav-list">
      <li class="mobile-nav-item"><a href="<?php echo esc_url( home_url( '/shop.html' ) ); ?>" class="mobile-nav-link">Shop All</a></li>
      <li class="mobile-nav-item"><a href="<?php echo esc_url( home_url( '/quiz.html' ) ); ?>" class="mobile-nav-link">Tech Quiz</a></li>
      <li class="mobile-nav-item"><a href="<?php echo esc_url( home_url( '/about.html' ) ); ?>" class="mobile-nav-link">Discover</a></li>
    </ul>
    <div class="mobile-search">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search Elevora Tech..." id="mobile-search-trigger" readonly>
    </div>
  </div>

  <div class="overlay" id="site-overlay"></div>
