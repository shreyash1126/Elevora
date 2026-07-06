<?php
/**
 * Template Name: Elevora Contact Us
 */
get_header(); ?>

  <section style="padding: 60px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Get in Touch</span>
      <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Contact Support</h1>
    </div>
  </section>

  <main class="container" style="display: grid; grid-template-columns: 1.5fr 2fr; gap: 60px; margin-bottom: 80px;">
    <div>
      <h3 style="font-family: Outfit; font-size: 1.5rem; font-weight: 700; margin-bottom: 20px;">Active Signals</h3>
      <p style="color: var(--text-secondary); margin-bottom: 30px;">Reach out directly for order assistance, bulk corporate sales queries, or warranty submissions.</p>
      
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; gap: 16px; align-items: center;">
          <div class="action-btn" style="color: var(--accent);"><i class="fa-solid fa-envelope"></i></div>
          <div>
            <h5 style="font-weight: 700; font-size: 0.95rem;">Email Address</h5>
            <span style="color: var(--text-secondary); font-size: 0.9rem;">support@elevora.com</span>
          </div>
        </div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <div class="action-btn" style="color: var(--accent);"><i class="fa-solid fa-location-dot"></i></div>
          <div>
            <h5 style="font-weight: 700; font-size: 0.95rem;">Tech Hub Headquarters</h5>
            <span style="color: var(--text-secondary); font-size: 0.9rem;">Silicon Avenue, Tech City, IN</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Form -->
    <div class="auth-card" style="max-width: 100%;">
      <form class="auth-form" onsubmit="event.preventDefault(); showToast('Message dispatched to support team!', 'success');">
        <div class="auth-input-group">
          <label>Your Full Name</label>
          <input type="text" class="auth-input" required placeholder="Jane Doe">
        </div>
        <div class="auth-input-group">
          <label>Email Address</label>
          <input type="email" class="auth-input" required placeholder="jane@example.com">
        </div>
        <div class="auth-input-group">
          <label>Support Query / Message</label>
          <textarea class="auth-input" required placeholder="Write message..." style="resize: vertical; height: 120px;"></textarea>
        </div>
        <button type="submit" class="auth-btn">Dispatch Signal</button>
      </form>
    </div>
  </main>

<?php get_footer(); ?>