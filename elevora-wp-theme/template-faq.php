<?php
/**
 * Template Name: Elevora FAQ
 */
get_header(); ?>

  <!-- Page Title hero -->
  <section style="padding: 40px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <div class="breadcrumb" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary);">FAQ Desk</span>
      </div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Frequently Asked Questions</h1>
    </div>
  </section>

  <main class="container" style="margin-bottom: 80px;">
    <div class="faq-accordion" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
      <!-- FAQ 1 -->
      <div class="faq-item" style="border: 1px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background-color: var(--bg-primary); transition: border-color var(--transition-fast);">
        <button class="faq-question" style="width: 100%; padding: 20px 24px; text-align: left; font-weight: 700; font-size: 1.05rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
          How long does delivery take?
          <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; transition: transform var(--transition-fast);"></i>
        </button>
        <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height var(--transition-normal);">
          <div class="faq-answer-inner" style="padding: 0 24px 20px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Standard delivery takes 5-10 business days depending on location. Express courier delivery options are available at checkout, delivering within 2-4 business days.
          </div>
        </div>
      </div>
      <!-- FAQ 2 -->
      <div class="faq-item" style="border: 1px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background-color: var(--bg-primary); transition: border-color var(--transition-fast);">
        <button class="faq-question" style="width: 100%; padding: 20px 24px; text-align: left; font-weight: 700; font-size: 1.05rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
          Do Elevora gadgets come with a warranty?
          <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; transition: transform var(--transition-fast);"></i>
        </button>
        <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height var(--transition-normal);">
          <div class="faq-answer-inner" style="padding: 0 24px 20px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Yes, every single product sold on Elevora comes with a standard 12-month manufacturer warranty. The warranty covers hardware malfunctions and battery degradation defects.
          </div>
        </div>
      </div>
      <!-- FAQ 3 -->
      <div class="faq-item" style="border: 1px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background-color: var(--bg-primary); transition: border-color var(--transition-fast);">
        <button class="faq-question" style="width: 100%; padding: 20px 24px; text-align: left; font-weight: 700; font-size: 1.05rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
          How can I track my package?
          <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; transition: transform var(--transition-fast);"></i>
        </button>
        <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height var(--transition-normal);">
          <div class="faq-answer-inner" style="padding: 0 24px 20px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Once your order is processed, you will receive an email containing a route tracking code. Simply enter this tracking number on our "Track Order" portal to view live courier status updates.
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll(".faq-question").forEach(q => {
        q.addEventListener("click", () => {
          const item = q.parentElement;
          const answer = q.nextElementSibling;
          const activeItem = document.querySelector(".faq-item.active");
          if (activeItem && activeItem !== item) {
            activeItem.classList.remove("active");
            activeItem.querySelector(".faq-answer").style.maxHeight = null;
          }
          item.classList.toggle("active");
          if (item.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
          } else {
            answer.style.maxHeight = null;
          }
        });
      });
    });
  </script>
<?php get_footer(); ?>