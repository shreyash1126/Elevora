<?php
/**
 * Single blog post layout
 */
get_header(); ?>

  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <section style="padding: 60px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
      <div class="container" style="max-width: 800px;">
        <div style="font-size: 0.8rem; color: var(--accent-dark); text-transform: uppercase; font-weight: 700; margin-bottom: 16px; letter-spacing: 0.05em; display: flex; gap: 8px;">
          <span>Category</span>
          <span>&bull;</span>
          <span><?php echo get_the_date(); ?></span>
        </div>
        <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1.2; color: var(--text-primary);"><?php the_title(); ?></h1>
      </div>
    </section>

    <main class="container" style="max-width: 800px; margin-bottom: 80px;">
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
        <?php the_content(); ?>
      </article>

      <!-- Comments section -->
      <?php
      if ( comments_open() || get_comments_number() ) {
          comments_template();
      }
      ?>
    </main>
  <?php endwhile; endif; ?>

<?php get_footer(); ?>