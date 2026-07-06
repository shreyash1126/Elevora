// System Fallback Script Coordinator - Purged of Elevora animations and styles

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Drawer Toggle
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

  // Simple Announcement Bar Rotator
  const announcementItems = document.querySelectorAll(".announcement-item");
  if (announcementItems.length > 1) {
    let activeIdx = 0;
    setInterval(() => {
      announcementItems[activeIdx].style.display = "none";
      activeIdx = (activeIdx + 1) % announcementItems.length;
      announcementItems[activeIdx].style.display = "flex";
    }, 4500);
  }

  // Simple Back to Top Button
  let backBtn = document.createElement("button");
  backBtn.className = "back-to-top";
  backBtn.setAttribute("aria-label", "Back to top");
  backBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(backBtn);

  backBtn.style.cssText = "position:fixed; bottom:20px; right:20px; width:40px; height:40px; border-radius:4px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary); display:none; align-items:center; justify-content:center; cursor:pointer; z-index:997;";

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backBtn.style.display = "flex";
    } else {
      backBtn.style.display = "none";
    }
  }, { passive: true });

  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Search overlay opening helpers
window.toggleSearchOverlay = function() {
  const overlay = document.getElementById("search-overlay");
  if (overlay) {
    overlay.classList.toggle("open");
  }
};

window.closeSearchOverlay = function() {
  const overlay = document.getElementById("search-overlay");
  if (overlay) {
    overlay.classList.remove("open");
  }
};

// Toast notification helper (Simple)
window.showToast = function(message, type = "success") {
  let wrapper = document.getElementById("toast-wrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "toast-wrapper";
    wrapper.style.cssText = "position:fixed; bottom:20px; right:20px; z-index:9999; display:flex; flex-direction:column; gap:8px;";
    document.body.appendChild(wrapper);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = "padding:10px 16px; background:#fff; border:1px solid #cbd5e1; border-radius:4px; color:#000; box-shadow:0 2px 8px rgba(0,0,0,0.15); font-weight:600; font-size:0.9rem;";
  wrapper.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

// No-op for fly-to-cart particle animation
window.animateFlyToCart = function() {};

// Quickview Modal Handlers
window.openQuickView = function(id) {
  const modal = document.getElementById("quickview-modal-overlay");
  const body = document.getElementById("quickview-modal-body");
  if (!modal || !body) return;

  const p = ElevoraProducts.find(item => item.id === parseInt(id));
  if (!p) return;

  const discountPercentage = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

  body.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 30px; align-items: start; padding: 20px;">
      <div style="background-color: var(--bg-secondary); border-radius: var(--border-radius-md); overflow: hidden; position: relative; padding: 10px;">
        <img id="quickview-main-image" src="${p.images[0]}" alt="${p.name}" style="width: 100%; object-fit: contain; max-height: 250px;">
        <div style="display: flex; gap: 8px; margin-top: 10px; justify-content: center;">
          ${p.images.map((img) => `
            <img src="${img}" alt="Thumbnail" style="width: 40px; height: 40px; border-radius: 4px; border: 1px solid var(--border-color); cursor: pointer;" onclick="document.getElementById('quickview-main-image').src='${img}'">
          `).join('')}
        </div>
      </div>
      <div>
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px; display: inline-block;">${p.category}</span>
        <h2 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 12px;">${p.name}</h2>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
          <span style="font-size: 1.5rem; font-weight: 700;">$${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span style="text-decoration: line-through; color: var(--text-muted); font-size: 1rem;">$${p.oldPrice.toFixed(2)}</span>` : ""}
          ${p.oldPrice ? `<span style="background-color: rgba(224, 49, 49, 0.1); color: var(--danger); font-size: 0.8rem; font-weight: 700; padding: 4px 8px; border-radius: 4px;">${discountPercentage}% OFF</span>` : ""}
        </div>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px;">${p.description}</p>
        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 0.85rem; font-weight: 600; margin-bottom: 8px;">Select Color:</h4>
          <div style="display: flex; gap: 8px;" id="quickview-colors-wrapper">
            ${p.colors.map((c, idx) => `
              <button class="color-picker-dot ${idx === 0 ? 'active' : ''}" data-color="${c}" onclick="selectQuickViewColor(this)" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 4px; border: 1px solid var(--border-color); cursor:pointer;">${c}</button>
            `).join('')}
          </div>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <div style="display: flex; border: 1px solid var(--border-color); border-radius: var(--border-radius-sm); overflow: hidden; height: 40px; align-items: center; background: #fff;">
            <button class="qty-btn" onclick="adjustQuickViewQty(-1)" style="width: 30px; height: 100%; border:none; background:none; cursor:pointer;">-</button>
            <span id="quickview-qty-val" style="display: flex; align-items: center; justify-content: center; width: 30px; font-weight: 600;">1</span>
            <button class="qty-btn" onclick="adjustQuickViewQty(1)" style="width: 30px; height: 100%; border:none; background:none; cursor:pointer;">+</button>
          </div>
          <button class="btn btn-primary" onclick="addQuickViewToCart(${p.id})" style="flex-grow: 1; height: 40px;">Add to Cart</button>
        </div>
      </div>
    </div>
  `;

  modal.style.display = "block";
}

window.closeQuickView = function() {
  const modal = document.getElementById("quickview-modal-overlay");
  if (modal) modal.style.display = "none";
};

let quickViewActiveColor = "";
window.selectQuickViewColor = function(btn) {
  const wrapper = document.getElementById("quickview-colors-wrapper");
  if (wrapper) {
    wrapper.querySelectorAll("button").forEach(b => b.classList.remove("active"));
  }
  btn.classList.add("active");
  quickViewActiveColor = btn.getAttribute("data-color");
};

window.adjustQuickViewQty = function(amount) {
  const qtyEl = document.getElementById("quickview-qty-val");
  if (!qtyEl) return;
  let val = parseInt(qtyEl.textContent) + amount;
  if (val < 1) val = 1;
  qtyEl.textContent = val;
};

window.addQuickViewToCart = function(id) {
  const activeBtn = document.querySelector("#quickview-colors-wrapper button.active");
  const color = activeBtn ? activeBtn.getAttribute("data-color") : "";
  const qty = parseInt(document.getElementById("quickview-qty-val").textContent) || 1;
  if (typeof addToCart === "function") {
    addToCart(id, qty, color);
  }
  closeQuickView();
};
