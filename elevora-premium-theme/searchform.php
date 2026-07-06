<?php
/**
 * Searchform fallback
 */
?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>" style="display: flex; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background-color: var(--bg-primary);">
  <input type="search" class="search-field" placeholder="Search gadgets..." value="<?php echo get_search_query(); ?>" name="s" style="flex-grow: 1; padding: 12px; border: none; outline: none; background: none; color: var(--text-primary);">
  <button type="submit" class="btn btn-secondary" style="border-radius: 0; padding: 0 20px;" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
</form>