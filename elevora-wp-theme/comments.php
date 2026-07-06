<?php
/**
 * The template for displaying comments
 */
if ( post_password_required() ) {
    return;
}
?>

<div id="comments" class="comments-area" style="margin-top: 60px; border-top: 1px solid var(--border-color); padding-top: 40px;">
  <?php if ( have_comments() ) : ?>
    <h3 class="comments-title" style="font-family: Outfit; font-weight: 700; font-size: 1.5rem; margin-bottom: 30px;">
      <?php
      $comments_number = get_comments_number();
      if ( '1' === $comments_number ) {
          printf( _x( 'One thought on &ldquo;%2$s&rdquo;', 'comments title', 'elevora' ), number_format_i18n( $comments_number ), get_the_title() );
      } else {
          printf( _cx( '%1$s thoughts on &ldquo;%2$s&rdquo;', 'comments title', 'elevora' ), number_format_i18n( $comments_number ), get_the_title() );
      }
      ?>
    </h3>

    <ul class="comment-list" style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 24px; margin-bottom: 40px;">
      <?php
      wp_list_comments( array(
          'style'       => 'ul',
          'short_ping'  => true,
          'avatar_size' => 50,
      ) );
      ?>
    </ul>

    <?php if ( ! comments_open() && get_comments_number() ) : ?>
      <p class="no-comments" style="color: var(--text-muted); font-size: 0.9rem; font-style: italic;"><?php esc_html_e( 'Comments are closed for this post.', 'elevora' ); ?></p>
    <?php endif; ?>
  <?php endif; ?>

  <?php
  comment_form( array(
      'class_form'         => 'comment-form auth-form',
      'title_reply'        => 'Submit a Review / Reply',
      'title_reply_to'     => 'Reply to %s',
      'class_submit'       => 'auth-btn btn btn-primary',
      'submit_button'      => '<button name="%1$s" type="submit" id="%2$s" class="%3$s">%4$s</button>',
      'comment_field'      => '<div class="auth-input-group"><label for="comment">Your message</label><textarea id="comment" name="comment" cols="45" rows="8" class="auth-input" style="resize: vertical; height: 120px;" required></textarea></div>',
      'fields'             => array(
          'author' => '<div class="auth-input-group"><label for="author">Name</label><input id="author" name="author" type="text" class="auth-input" required autocomplete="name"></div>',
          'email'  => '<div class="auth-input-group"><label for="email">Email</label><input id="email" name="email" type="email" class="auth-input" required autocomplete="email"></div>',
      ),
  ) );
  ?>
</div>