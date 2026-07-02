// Elevora E-commerce Store - Central Script Coordinator

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Drawer Toggle
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.className = navMenu.classList.contains("open") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
    });
  }

  // 2. Announcement Bar Rotator
  const announcementItems = document.querySelectorAll(".announcement-item");
  if (announcementItems.length > 1) {
    let activeIdx = 0;
    setInterval(() => {
      announcementItems[activeIdx].style.display = "none";
      activeIdx = (activeIdx + 1) % announcementItems.length;
      announcementItems[activeIdx].style.display = "flex";
    }, 4500);
  }

  // 3. Scroll Reveal Transition Observer
  const revealElements = document.querySelectorAll(".reveal-element");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if observer not supported
    revealElements.forEach(el => el.classList.add("revealed"));
  }

  // 4. Back to Top Button
  let backBtn = document.createElement("button");
  backBtn.className = "back-to-top";
  backBtn.setAttribute("aria-label", "Back to top");
  backBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(backBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backBtn.classList.add("show");
    } else {
      backBtn.classList.remove("show");
    }
  });

  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 5. Hide Navbar on Scroll Down, Show on Scroll Up
  let lastScrollY = window.scrollY;
  const header = document.querySelector("header");
  
  if (header) {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY) {
          header.classList.add("hide-nav");
        } else {
          header.classList.remove("hide-nav");
        }
      } else {
        header.classList.remove("hide-nav");
      }
      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  // 6. Newsletter Subscription Form Handler
  const newsletterForms = document.querySelectorAll(".newsletter-form, .newsletter-section-form");
  newsletterForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value.trim() !== "") {
        showToast("Successfully subscribed to Elevora news!", "success");
        input.value = "";
      }
    });
  });

  // 7. Initialize Toast Container
  let toastContainer = document.createElement("div");
  toastContainer.className = "toast-container";
  toastContainer.id = "toast-notification-container";
  document.body.appendChild(toastContainer);
  
  // 8. Create Quick View Overlay Modal Container
  let modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.id = "quickview-modal-overlay";
  modalOverlay.innerHTML = `
    <div class="modal-content-wrap">
      <button class="modal-close-btn" onclick="closeQuickView()"><i class="fa-solid fa-xmark"></i></button>
      <div id="quickview-modal-body" style="padding: 30px;"></div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  // Close QuickView on overlay background click
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeQuickView();
    }
  });
});

// Toast notification trigger
function showToast(message, type = "success") {
  const container = document.getElementById("toast-notification-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let iconClass = "fa-solid fa-circle-check";
  if (type === "error") iconClass = "fa-solid fa-circle-xmark";
  else if (type === "info") iconClass = "fa-solid fa-circle-info";
  else if (type === "warning") iconClass = "fa-solid fa-triangle-exclamation";

  toast.innerHTML = `
    <i class="${iconClass} toast-icon ${type}"></i>
    <span class="toast-message" style="font-size: 0.85rem; font-weight: 500;">${message}</span>
  `;

  container.appendChild(toast);
  
  // Trigger transition layout
  setTimeout(() => toast.classList.add("show"), 50);

  // Remove toast after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

// Open dynamic quick view details modal
function openQuickView(id) {
  const modal = document.getElementById("quickview-modal-overlay");
  const body = document.getElementById("quickview-modal-body");
  if (!modal || !body) return;

  const p = ElevoraProducts.find(item => item.id === parseInt(id));
  if (!p) return;

  const discountPercentage = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

  body.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 30px; align-items: start;">
      <div style="background-color: var(--bg-secondary); border-radius: var(--border-radius-md); overflow: hidden; position: relative;">
        <img id="quickview-main-image" src="${p.images[0]}" alt="${p.name}" style="width: 100%; object-fit: cover;">
        <div style="display: flex; gap: 8px; margin-top: 10px; padding: 10px; justify-content: center;">
          ${p.images.map((img, idx) => `
            <img src="${img}" alt="Thumbnail" style="width: 50px; height: 50px; border-radius: 4px; border: 1px solid var(--border-color); cursor: pointer;" onclick="document.getElementById('quickview-main-image').src='${img}'">
          `).join('')}
        </div>
      </div>
      <div>
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-dark); text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; margin-bottom: 8px;">${p.category}</span>
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 12px; line-height: 1.3;">${p.name}</h2>
        
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
          <div style="color: var(--accent-dark);">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
          </div>
          <span style="font-size: 0.85rem; font-weight: 600;">${p.rating}</span>
          <span style="font-size: 0.85rem; color: var(--text-muted);">(${p.reviewsCount} reviews)</span>
        </div>

        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
          <span style="font-family: 'Outfit'; font-size: 1.75rem; font-weight: 800; color: var(--text-primary);">$${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span style="font-family: 'Outfit'; font-size: 1.2rem; text-decoration: line-through; color: var(--text-muted);">$${p.oldPrice.toFixed(2)}</span>` : ""}
          ${p.oldPrice ? `<span style="background-color: rgba(224, 49, 49, 0.1); color: var(--danger); font-size: 0.8rem; font-weight: 700; padding: 4px 8px; border-radius: 4px;">${discountPercentage}% OFF</span>` : ""}
        </div>

        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 24px;">${p.description}</p>
        
        <!-- Options & Color Picker -->
        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 0.9rem; font-weight: 600; margin-bottom: 8px;">Select Color:</h4>
          <div style="display: flex; gap: 8px;" id="quickview-colors-wrapper">
            ${p.colors.map((c, idx) => `
              <button class="color-picker-dot ${idx === 0 ? 'active' : ''}" data-color="${c}" onclick="selectQuickViewColor(this)" style="padding: 6px 14px; font-size: 0.8rem; font-weight: 600; border-radius: 4px; border: 1.5px solid var(--border-color);">${c}</button>
            `).join('')}
          </div>
        </div>

        <!-- Quantity and actions -->
        <div style="display: flex; gap: 12px; align-items: center;">
          <div style="display: flex; border: 1px solid var(--border-color); border-radius: var(--border-radius-sm); overflow: hidden; height: 46px;">
            <button class="qty-btn" onclick="adjustQuickViewQty(-1)" style="width: 32px; height: 100%;">-</button>
            <span id="quickview-qty-val" style="display: flex; align-items: center; justify-content: center; padding: 0 16px; font-weight: 600;">1</span>
            <button class="qty-btn" onclick="adjustQuickViewQty(1)" style="width: 32px; height: 100%;">+</button>
          </div>
          <button class="btn btn-primary" onclick="addQuickViewToCart(${p.id})" style="flex-grow: 1; height: 46px; padding: 0 24px; font-size: 0.9rem;">Add to Cart</button>
          <button class="btn btn-secondary btn-icon" onclick="toggleWishlist(${p.id}); closeQuickView();" style="width: 46px; height: 46px; border-radius: var(--border-radius-sm);"><i class="fa-regular fa-heart"></i></button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
}

function closeQuickView() {
  const modal = document.getElementById("quickview-modal-overlay");
  if (modal) modal.classList.remove("open");
}

// Helpers for QuickView Modal state
let quickViewActiveColor = "";
function selectQuickViewColor(btn) {
  const wrapper = document.getElementById("quickview-colors-wrapper");
  if (wrapper) {
    wrapper.querySelectorAll("button").forEach(b => b.classList.remove("active"));
  }
  btn.classList.add("active");
  quickViewActiveColor = btn.getAttribute("data-color");
}

function adjustQuickViewQty(amount) {
  const qtyEl = document.getElementById("quickview-qty-val");
  if (!qtyEl) return;
  let val = parseInt(qtyEl.textContent);
  val += amount;
  if (val < 1) val = 1;
  qtyEl.textContent = val;
}

function addQuickViewToCart(id) {
  const qtyEl = document.getElementById("quickview-qty-val");
  const qty = qtyEl ? parseInt(qtyEl.textContent) : 1;
  
  const activeBtn = document.querySelector("#quickview-colors-wrapper button.active");
  const color = activeBtn ? activeBtn.getAttribute("data-color") : "";

  if (typeof addToCart === "function") {
    addToCart(id, qty, color);
    closeQuickView();
  }
}
