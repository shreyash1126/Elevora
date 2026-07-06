<?php
/**
 * Sidebar widget area
 */
if ( ! is_active_sidebar( 'sidebar-1' ) ) {
    return;
}
?>
<aside id="secondary" class="widget-area" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 24px;">
  <?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside>