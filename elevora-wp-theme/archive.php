<?php
/**
 * The template for displaying archive pages
 */
get_header(); ?>

  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Archive Listing</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">
        <?php
        if ( is_category() ) {
            single_cat_title();
        } elseif ( is_tag() ) {
            single_tag_title();
        } elseif ( is_author() ) {
            the_post();
            echo 'Author: ' . get_the_author();
            rewind_posts();
        } elseif ( is_day() ) {
            echo 'Daily Archive: ' . get_the_date();
        } elseif ( is_month() ) {
            echo 'Monthly Archive: ' . get_the_date( 'F Y' );
        } elseif ( is_year() ) {
            echo 'Yearly Archive: ' . get_the_date( 'Y' );
        } else {
            echo 'Archives';
        }
        ?>
      </h1>
    </div>
  </section>

  <main class="container">
    <div class="blog-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 80px;">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <article class="blog-card reveal-element revealed" id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); overflow: hidden; background-color: var(--bg-primary); display: flex; flex-direction: column;">
          <div class="blog-media" style="height: 220px; overflow: hidden; background-color: var(--bg-secondary);">
            <?php if ( has_post_thumbnail() ) : ?>
              <?php the_post_thumbnail('medium_large', array('style' => 'width: 100%; height: 100%; object-fit: cover;')); ?>
            <?php else : ?>
              <img src="https://images.unsplash.com/photo-1609592424085-f55a64388432?w=600" alt="Placeholder" style="width: 100%; height: 100%; object-fit: cover;">
            <?php endif; ?>
          </div>
          <div class="blog-info" style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
            <div class="blog-meta-row" style="display: flex; gap: 16px; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
              <span><i class="fa-regular fa-calendar"></i> <?php echo get_the_date(); ?></span>
              <span>&bull;</span>
              <span><i class="fa-regular fa-user"></i> <?php the_author(); ?></span>
            </div>
            <h3 class="blog-card-title" style="font-family: 'Outfit'; font-size: 1.25rem; font-weight: 700; line-height: 1.3; margin-bottom: 12px;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
            <p class="blog-card-summary" style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; flex-grow: 1;"><?php echo wp_trim_words( get_the_excerpt(), 15, '...' ); ?></p>
            <a href="<?php the_permalink(); ?>" class="blog-read-btn" style="font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px; color: var(--text-primary); border-bottom: 2px solid var(--accent); width: fit-content; padding-bottom: 2px;">Read Article <i class="fa-solid fa-chevron-right"></i></a>
          </div>
        </article>
      <?php endwhile; else : ?>
        <p><?php esc_html_e( 'No posts found in this archive.', 'elevora' ); ?></p>
      <?php endif; ?>
    </div>

    <div class="pagination" style="display: flex; justify-content: center; gap: 8px; margin-bottom: 80px;">
      <?php
      echo paginate_links( array(
          'prev_text' => '<i class="fa-solid fa-chevron-left"></i>',
          'next_text' => '<i class="fa-solid fa-chevron-right"></i>',
      ) );
      ?>
    </div>
  </main>

<?php get_footer(); ?>