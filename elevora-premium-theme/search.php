<?php
/**
 * Search results layout
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">
        Search Results for: <span style="color:var(--accent);"><?php echo get_search_query(); ?></span>
      </h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <?php if ( have_posts() ) : ?>
      <div class="blog-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 80px;">
        <?php while ( have_posts() ) : the_post(); ?>
          <article class="blog-card reveal-element" id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); overflow: hidden; background-color: var(--bg-primary); display: flex; flex-direction: column;">
            <div class="blog-info" style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
              <span class="card-category" style="font-size: 0.75rem; text-transform: uppercase; color: var(--accent-dark); font-weight: 700; margin-bottom: 6px; display: block;"><?php echo get_post_type(); ?></span>
              <h3 class="blog-card-title" style="font-family: 'Outfit'; font-size: 1.25rem; font-weight: 700; line-height: 1.3; margin-bottom: 12px;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
              <p class="blog-card-summary" style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; flex-grow: 1;"><?php echo wp_trim_words( get_the_excerpt(), 20, '...' ); ?></p>
              <a href="<?php the_permalink(); ?>" style="font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px; color: var(--text-primary); border-bottom: 2px solid var(--accent); width: fit-content; padding-bottom: 2px;">View Page <i class="fa-solid fa-chevron-right"></i></a>
            </div>
          </article>
        <?php endwhile; ?>
      </div>
    <?php else : ?>
      <div class="empty-state-wrap" style="text-align: center; padding: 60px 0;">
        <i class="fa-solid fa-magnifying-glass-minus" style="font-size: 3.5rem; color: var(--text-muted); margin-bottom: 20px; opacity: 0.4;"></i>
        <h3 style="font-family: Outfit; font-size: 1.5rem; font-weight: 700; margin-bottom: 12px;">No matching results</h3>
        <p style="color: var(--text-muted); margin-bottom: 24px;">Please try alternative keywords or check spelling parameters.</p>
      </div>
    <?php endif; ?>
  </main>

<?php get_footer(); ?>