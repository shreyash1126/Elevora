<?php
/**
 * The template for displaying all pages
 */
get_header(); ?>

  <!-- Breadcrumb and page title -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);"><?php the_title(); ?></span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;"><?php the_title(); ?></h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <?php while ( have_posts() ) : the_post(); ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <div class="entry-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
          <?php the_content(); ?>
        </div>
      </article>
    <?php endwhile; ?>
  </main>

<?php get_footer(); ?>