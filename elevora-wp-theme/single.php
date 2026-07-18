<?php
/**
 * The template for displaying all single posts
 */
get_header(); ?>

  <!-- Article View container -->
  <main class="container">
    <?php while ( have_posts() ) : the_post(); ?>
      <article class="article-wrap" id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="max-width: 800px; margin: 40px auto 80px;">
        <div class="article-meta" style="display: flex; gap: 16px; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px;">
          <span><i class="fa-regular fa-calendar"></i> <?php echo get_the_date(); ?></span>
          <span>&bull;</span>
          <span><i class="fa-regular fa-user"></i> <?php the_author(); ?></span>
        </div>
        <h1 class="article-title" style="font-family: 'Outfit'; font-size: 2.75rem; font-weight: 800; line-height: 1.2; margin-bottom: 24px; letter-spacing: -0.02em;"><?php the_title(); ?></h1>
        
        <?php if ( has_post_thumbnail() ) : ?>
          <div class="article-hero-image" style="border-radius: var(--border-radius-lg); overflow: hidden; margin-bottom: 40px; height: 450px; background-color: var(--bg-secondary);">
            <?php the_post_thumbnail('large', array('style' => 'width: 100%; height: 100%; object-fit: cover;')); ?>
          </div>
        <?php endif; ?>

        <div class="article-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
          <?php the_content(); ?>
        </div>
        
        <!-- Comments Section Wrapper -->
        <?php
        if ( comments_open() || get_comments_number() ) :
            comments_template();
        endif;
        ?>
      </article>
    <?php endwhile; ?>
  </main>

<?php get_footer(); ?>