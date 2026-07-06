<?php
/**
 * Default page layout
 */
get_header(); ?>

  <main class="container" style="padding: 60px 0 80px;">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 30px; letter-spacing: -0.02em;"><?php the_title(); ?></h1>
        <div class="entry-content" style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.8;">
          <?php the_content(); ?>
        </div>
      </article>
    <?php endwhile; endif; ?>
  </main>

<?php get_footer(); ?>