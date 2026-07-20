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
                <a href="<?php echo wc_get_page_permalink('shop'); ?>" class="btn btn-primary">Shop Now</a>
                <a href="<?php echo get_permalink( wc_get_page_id('shop') ); ?>" class="btn btn-secondary">Discover Apex</a>
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
        <a href="<?php echo wc_get_page_permalink('shop'); ?>" class="section-link">Explore Collection <i class="fas fa-arrow-right"></i></a>
      </div>

      <div class="product-grid" id="picks-grid-container">
<?php
$args = array(
    'post_type'      => 'product',
    'posts_per_page' => 8,
    'post_status'    => 'publish'
);

$loop = new WP_Query($args);

if ($loop->have_posts()) :

    while ($loop->have_posts()) :
        $loop->the_post();

        global $product;

        if ( ! $product ) {
            $product = wc_get_product( get_the_ID() );
        }
?>

<div class="pick-card">

    <a href="<?php the_permalink(); ?>" class="pick-card-link">

        <div class="pick-card-img-wrapper">
            <?php echo $product->get_image('woocommerce_thumbnail'); ?>
        </div>

        <div class="pick-card-info">

            <span class="pick-card-category">
                <?php
                echo wc_get_product_category_list(
                    get_the_ID(),
                    ', '
                );
                ?>
            </span>

            <h3 class="pick-card-title">
                <?php the_title(); ?>
            </h3>

            <div class="pick-card-price">
                <?php echo $product->get_price_html(); ?>
            </div>

            <div class="pick-card-footer">
                <?php woocommerce_template_loop_add_to_cart(); ?>
            </div>

        </div>

    </a>

</div>

<?php
    endwhile;

    wp_reset_postdata();

endif;
?>

      </div>
    </section>
  </main>

<?php get_footer(); ?>
