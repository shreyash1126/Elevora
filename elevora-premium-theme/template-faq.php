<?php
/**
 * Template Name: Elevora FAQ Layout
 */
get_header(); ?>

  <section style="padding: 60px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Common Inquiries</span>
      <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Frequently Asked Questions</h1>
    </div>
  </section>

  <main class="container" style="max-width: 800px; margin-bottom: 80px;">
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <!-- FAQ Item 1 -->
      <div class="accordion-item" style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); background-color: var(--bg-secondary); padding: 24px; cursor: pointer;">
        <div class="accordion-title-row" style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-family: Outfit; font-size: 1.1rem;">
          <span>Do Elevora charging hubs support Apple MagSafe?</span>
          <i class="fa-solid fa-plus" style="transition: transform 0.3s ease;"></i>
        </div>
        <div class="accordion-content-anim">
          <p style="color: var(--text-secondary); margin-top: 14px; font-size: 0.95rem; line-height: 1.6;">Yes, all our Charging Station products are engineered with high-induction neodymium magnetic arrays that perfectly align with and support standard Apple MagSafe charging profiles up to 15W.</p>
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div class="accordion-item" style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); background-color: var(--bg-secondary); padding: 24px; cursor: pointer;">
        <div class="accordion-title-row" style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-family: Outfit; font-size: 1.1rem;">
          <span>What is the average shipping duration?</span>
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="accordion-content-anim">
          <p style="color: var(--text-secondary); margin-top: 14px; font-size: 0.95rem; line-height: 1.6;">Orders are processed inside 48 hours. Shipping standard delivery timelines span 5-10 business days. Express shipments reach in 3-5 business days.</p>
        </div>
      </div>

      <!-- FAQ Item 3 -->
      <div class="accordion-item" style="border: 1.5px solid var(--border-color); border-radius: var(--border-radius-md); background-color: var(--bg-secondary); padding: 24px; cursor: pointer;">
        <div class="accordion-title-row" style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-family: Outfit; font-size: 1.1rem;">
          <span>Do you offer international product warranties?</span>
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="accordion-content-anim">
          <p style="color: var(--text-secondary); margin-top: 14px; font-size: 0.95rem; line-height: 1.6;">Absolutely. All Elevora hardware systems carry an automatically activated 1-Year limited warranty policy that guards against internal chipset failure or hardware assembly decay.</p>
        </div>
      </div>
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll(".accordion-item").forEach(item => {
        item.addEventListener("click", () => {
          const isActive = item.classList.contains("active");
          
          // Collapse others
          document.querySelectorAll(".accordion-item").forEach(el => {
            el.classList.remove("active");
            const icon = el.querySelector(".accordion-title-row i");
            if (icon) icon.className = "fa-solid fa-plus";
          });

          if (!isActive) {
            item.classList.add("active");
            const icon = item.querySelector(".accordion-title-row i");
            if (icon) icon.className = "fa-solid fa-minus";
          }
        });
      });
    });
  </script>