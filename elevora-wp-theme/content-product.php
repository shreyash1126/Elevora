<?php
defined('ABSPATH') || exit;

global $product;

if (empty($product) || !$product->is_visible()) {
    return;
}
?>

<li <?php wc_product_class('product-card', $product); ?>>

    <a href="<?php the_permalink(); ?>">

        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('woocommerce_thumbnail'); ?>
        <?php endif; ?>

        <h3><?php the_title(); ?></h3>

        <div class="price">
            <?php echo $product->get_price_html(); ?>
        </div>

    </a>

    <?php woocommerce_template_loop_add_to_cart(); ?>

</li>