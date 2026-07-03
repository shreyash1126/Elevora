<?php
/**
 * Template Name: Elevora Contact
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">Contact Support</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Contact Us</h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px;">
      <!-- Contact Info -->
      <div>
        <h2 style="font-family: Outfit; font-size: 1.75rem; font-weight: 800; margin-bottom: 24px;">Get in Touch</h2>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 30px;">Have questions about gadget specifications, custom corporate orders, or active delivery tracking? Contact our helpdesk anytime.</p>
        
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="display: flex; gap: 16px; align-items: start;">
            <i class="fa-solid fa-location-dot" style="font-size: 1.25rem; color: var(--accent-dark); margin-top: 4px;"></i>
            <div>
              <h4 style="font-weight: 700; font-size: 0.95rem;">Warehouse HQ</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">2026 Tech Boulevard, Silicon Valley, CA 94025, USA</p>
            </div>
          </div>
          <div style="display: flex; gap: 16px; align-items: start;">
            <i class="fa-solid fa-envelope" style="font-size: 1.25rem; color: var(--accent-dark); margin-top: 4px;"></i>
            <div>
              <h4 style="font-weight: 700; font-size: 0.95rem;">Email Address</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">support@elevora.com</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mail Form -->
      <div style="background-color: var(--bg-secondary); padding: 40px; border-radius: var(--border-radius-lg); border: 1px solid var(--border-color);">
        <h3 style="font-family: Outfit; font-size: 1.25rem; font-weight: 700; margin-bottom: 20px;">Send a Direct Message</h3>
        <form class="contact-form" onsubmit="event.preventDefault(); showToast('Message successfully dispatched to our helpdesk!', 'success');">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Your Name</label>
              <input type="text" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="Full name">
            </div>
            <div>
              <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Email Address</label>
              <input type="email" required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md);" placeholder="Email address">
            </div>
          </div>
          <div style="margin-bottom: 24px;">
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Message Content</label>
            <textarea required style="width: 100%; padding: 12px; background-color: var(--bg-primary); border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); height: 120px; resize: none;" placeholder="Details of your query..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: auto;">Submit Message</button>
        </form>
      </div>
    </div>
  </main>

<?php get_footer(); ?>