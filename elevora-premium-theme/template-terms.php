<?php
/**
 * Template Name: Elevora Terms of Service
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Terms of Service</h1>
    </div>
  </section>

  <main class="container" style="max-width: 800px; margin-bottom: 80px;">
    <article class="entry-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <?php the_content(); ?>
      <?php endwhile; else : ?>
        <h2>1. User Agreement</h2>
        <p>By using the Elevora website, you agree to comply with all guidelines, privacy rules, and shipping guidelines outlined on this portal.</p>
      <?php endif; ?>
    </article>
  </main>

<?php get_footer(); ?>