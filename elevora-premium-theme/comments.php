<?php
/**
 * Comments loop fallback
 */
if ( post_password_required() ) {
    return;
}
?>

<div id="comments" class="comments-area" style="margin-top: 60px; border-top: 1px solid var(--border-color); padding-top: 40px;">
  <?php if ( have_comments() ) : ?>
    <h3 class="comments-title" style="font-family: Outfit; font-weight: 700; font-size: 1.5rem; margin-bottom: 30px;">
      Discussion Reviews (<?php echo get_comments_number(); ?>)
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
  <?php endif; ?>

  <?php
  comment_form( array(
      'class_form'         => 'comment-form auth-form',
      'title_reply'        => 'Add a review reply',
      'class_submit'       => 'auth-btn btn btn-primary',
      'submit_button'      => '<button name="%1$s" type="submit" id="%2$s" class="%3$s">%4$s</button>',
      'comment_field'      => '<div class="auth-input-group"><label>Your Message</label><textarea id="comment" name="comment" cols="45" rows="8" class="auth-input" required></textarea></div>',
      'fields'             => array(
          'author' => '<div class="auth-input-group"><label>Your Name</label><input id="author" name="author" type="text" class="auth-input" required></div>',
          'email'  => '<div class="auth-input-group"><label>Email Address</label><input id="email" name="email" type="email" class="auth-input" required></div>',
      ),
  ) );
  ?>
</div>