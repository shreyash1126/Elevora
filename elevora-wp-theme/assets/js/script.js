// Elevora E-commerce Store - Central Script Coordinator

// 0. Premium Preloader Overlay
(function createPreloader() {
  const preloader = document.createElement("div");
  preloader.id = "global-preloader";
  preloader.innerHTML = `
    <div class="preloader-content">
      <div class="preloader-logo">ELEVORA</div>
      <div class="preloader-spinner"></div>
    </div>
  `;
  document.documentElement.appendChild(preloader);
  
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.remove();
      }, 600);
    }, 400); // Minimum view time for effect
  });
})();

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

  // 3. Scroll Reveal Transition Observer & Grid Staggering
  // Automatically discover grids across pages to apply reveals and staggered load
  document.querySelectorAll(".product-grid, .category-grid, .features-grid, .bento-grid, #wishlist-grid, .blog-grid").forEach(grid => {
    grid.classList.add("reveal-element");
    Array.from(grid.children).forEach((child, index) => {
      child.classList.add("staggered-item");
    });
  });

  const revealElements = document.querySelectorAll(".reveal-element, .fade-up, .fade-in, .slide-in-left, .slide-in-right");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

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

  // 9. Premium Top Loading Progress Bar Setup
  const topProgressBar = document.createElement("div");
  topProgressBar.className = "top-progress-bar";
  document.body.appendChild(topProgressBar);

  // Instant finish on page load complete
  requestAnimationFrame(() => {
    topProgressBar.style.width = "40%";
    setTimeout(() => {
      topProgressBar.style.width = "100%";
      setTimeout(() => {
        topProgressBar.style.opacity = "0";
        setTimeout(() => {
          topProgressBar.remove();
        }, 300);
      }, 150);
    }, 100);
  });

  // Transition interceptor for clean page routing animations
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href) return;
    
    if (
      href.startsWith("#") || 
      href.startsWith("mailto:") || 
      href.startsWith("tel:") || 
      anchor.getAttribute("target") === "_blank" ||
      href.includes("javascript:") ||
      (!href.endsWith(".html") && !href.includes("/") && !href.startsWith("./") && !href.startsWith("../"))
    ) {
      return;
    }

    e.preventDefault();
    const loadingBar = document.createElement("div");
    loadingBar.className = "top-progress-bar";
    document.body.appendChild(loadingBar);
    
    requestAnimationFrame(() => {
      loadingBar.style.width = "80%";
    });

    setTimeout(() => {
      window.location.href = href;
    }, 200);
  });

  // 10. Click Ripples & Sparkle Particle Generators
  document.addEventListener("click", (e) => {
    // A. Button Ripples
    const rippleBtn = e.target.closest(".btn, .card-action-btn, .slider-arrow, .qty-btn, .category-card, .card-add-btn");
    if (rippleBtn) {
      if (getComputedStyle(rippleBtn).position === "static") {
        rippleBtn.style.position = "relative";
      }
      rippleBtn.classList.add("ripple-element");
      
      const ripple = document.createElement("span");
      ripple.className = "ripple-span";
      
      const rect = rippleBtn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      rippleBtn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    }

    // B. Wishlist toggling sparks
    const wishlistBtn = e.target.closest(".wishlist-toggle-btn, [onclick*='toggleWishlist']");
    if (wishlistBtn) {
      createSparkleBurst(e.clientX, e.clientY, "var(--danger)");
      
      setTimeout(() => {
        const badges = document.querySelectorAll(".wishlist-count");
        badges.forEach(badge => {
          badge.classList.remove("badge-pop");
          void badge.offsetWidth;
          badge.classList.add("badge-pop");
        });
      }, 50);
    }

    // C. Add to Cart Fly Tracking
    const addCartBtn = e.target.closest(".card-add-btn, .btn-primary, [onclick*='addToCart']");
    if (addCartBtn) {
      let productId = null;
      const onclickAttr = addCartBtn.getAttribute("onclick") || "";
      const match = onclickAttr.match(/addToCart\s*\(\s*(\d+)/);
      if (match) {
        productId = parseInt(match[1]);
      } else {
        const card = addCartBtn.closest("[data-id]");
        if (card) {
          productId = parseInt(card.getAttribute("data-id"));
        } else {
          // Check query parameters for single product page
          const urlParams = new URLSearchParams(window.location.search);
          const idParam = urlParams.get('id');
          if (idParam) productId = parseInt(idParam);
        }
      }
      if (productId) {
        animateFlyToCart(productId, e.clientX, e.clientY);
      }
    }
  });
  // 11. Premium 3D Tilt Effect on Cards
  const tiltCards = document.querySelectorAll(".product-card, .premium-cat-card, .most-used-card, .category-card");
  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = ((y - centerY) / centerY) * -5; // max tilt 5 deg
      const tiltY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
      
      // Optional glare effect
      let glare = card.querySelector(".glare-effect");
      if (!glare) {
        glare = document.createElement("div");
        glare.className = "glare-effect";
        glare.style.position = "absolute";
        glare.style.top = "0";
        glare.style.left = "0";
        glare.style.width = "100%";
        glare.style.height = "100%";
        glare.style.pointerEvents = "none";
        glare.style.background = "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 60%)";
        glare.style.transition = "opacity 0.2s ease";
        card.appendChild(glare);
      }
      glare.style.opacity = "1";
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 50%)`;
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      const glare = card.querySelector(".glare-effect");
      if (glare) {
        glare.style.opacity = "0";
      }
    });
  });
  
});

// Toast notification trigger
function showToast(message, type = "success") {
  const container = document.getElementById("toast-notification-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type} toast-with-progress`;
  
  let iconClass = "fa-solid fa-circle-check";
  if (type === "error") iconClass = "fa-solid fa-circle-xmark";
  else if (type === "info") iconClass = "fa-solid fa-circle-info";
  else if (type === "warning") iconClass = "fa-solid fa-triangle-exclamation";

  toast.innerHTML = `
    <i class="${iconClass} toast-icon ${type}"></i>
    <span class="toast-message" style="font-size: 0.85rem; font-weight: 500;">${message}</span>
    <div class="toast-progress-bar"></div>
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

// 11. Flying particles animation helper
function animateFlyToCart(productId, startX, startY) {
  // Try to find product details
  const p = typeof ElevoraProducts !== "undefined" ? ElevoraProducts.find(item => item.id === productId) : null;
  const imageUrl = p ? p.images[0] : "";
  
  // Find cart header targets (or desktop/mobile badges)
  const cartIcon = document.querySelector(".header-action-btn[href*='cart'] i, .cart-count, i.fa-shopping-bag, i.fa-shopping-cart");
  if (!cartIcon) return;
  
  const rect = cartIcon.getBoundingClientRect();
  const endX = rect.left + rect.width / 2;
  const endY = rect.top + rect.height / 2;

  // Create flying container
  const particle = document.createElement("div");
  particle.className = "cart-fly-particle";
  if (imageUrl) {
    particle.style.backgroundImage = `url('${imageUrl}')`;
  }
  
  // Set starting positions
  particle.style.left = `${startX - 16}px`;
  particle.style.top = `${startY - 16}px`;
  particle.style.transform = "scale(0.8)";
  particle.style.opacity = "1";
  document.body.appendChild(particle);

  // Smooth visual arc pathway animation
  requestAnimationFrame(() => {
    particle.style.left = `${endX - 16}px`;
    particle.style.top = `${endY - 16}px`;
    particle.style.transform = "scale(0.2) rotate(360deg)";
    particle.style.opacity = "0.7";
  });

  // Self-destruction on contact and pop triggering
  setTimeout(() => {
    particle.remove();
    
    // Add pop feedback class to cart count badge
    const badges = document.querySelectorAll(".cart-count");
    badges.forEach(badge => {
      badge.classList.remove("badge-pop");
      void badge.offsetWidth; // Reflow reset
      badge.classList.add("badge-pop");
    });
    
    // Tiny magical celebration sparkles
    createSparkleBurst(endX, endY, "var(--accent)");
  }, 750);
}

// 12. Celestial burst sparkle generator
function createSparkleBurst(x, y, color = "var(--accent)") {
  const numSparkles = 8;
  for (let i = 0; i < numSparkles; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle-particle";
    sparkle.style.backgroundColor = color;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    const angle = (i / numSparkles) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
    const distance = 20 + Math.random() * 20;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    sparkle.style.setProperty("--tx", `${tx}px`);
    sparkle.style.setProperty("--ty", `${ty}px`);
    
    document.body.appendChild(sparkle);
    
    // Remove element
    setTimeout(() => {
      sparkle.remove();
    }, 600);
  }
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

// Search Overlay Global Helpers
window.toggleSearchOverlay = function() {
  const overlay = document.getElementById("search-overlay");
  if (overlay) {
    overlay.classList.toggle("open");
    if (overlay.classList.contains("open")) {
      const input = overlay.querySelector(".search-overlay-input");
      if (input) input.focus();
    }
  }
};

window.closeSearchOverlay = function() {
  const overlay = document.getElementById("search-overlay");
  if (overlay) {
    overlay.classList.remove("open");
  }
};

// Add listeners for mobile dropdowns
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".category-nav-item");
  navItems.forEach(item => {
    const dropdown = item.querySelector(".category-dropdown");
    if (dropdown) {
      item.addEventListener("click", (e) => {
        if (window.innerWidth <= 992) {
          const isIcon = e.target.classList.contains("fa-chevron-down") || e.target.tagName === "I";
          // Check if user clicked the parent nav link itself rather than child links
          const isItemSelf = e.target === item || e.target.firstChild === e.target;
          if (isIcon || isItemSelf) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle("mobile-open");
            const chevron = item.querySelector(".fa-chevron-down");
            if (chevron) {
              chevron.style.transform = dropdown.classList.contains("mobile-open") ? "rotate(180deg)" : "none";
            }
          }
        }
      });
    }
  });

  // Check for prefers-reduced-motion setting
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Sticky Header scale and shadow on scroll
  const headerEl = document.querySelector("header");
  if (headerEl) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 80) {
        headerEl.classList.add("scrolled");
      } else {
        headerEl.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Run initially
  }

  // 2. Mouse Tracking Spotlight & 3D Tilt (Desktop only, if motion is allowed)
  if (window.innerWidth > 992 && !prefersReducedMotion) {
    const setupCardInteractions = (card) => {
      card.classList.add("spotlight-card");
      card.classList.add("tilt-card");

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set spotlight coordinates
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        // Calculate 3D tilt angles
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / centerY) * 6; // Max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6; // Max 6 deg

        card.style.setProperty("--rotate-x", `${rotateX}deg`);
        card.style.setProperty("--rotate-y", `${rotateY}deg`);
      });

      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--rotate-x", `0deg`);
        card.style.setProperty("--rotate-y", `0deg`);
      });
    };

    // Apply interaction to existing product cards
    document.querySelectorAll(".product-card").forEach(setupCardInteractions);

    // Watch for dynamic product additions (like filters) to apply setup
    const gridObserver = new MutationObserver((mutations) => {
      mutations.forEach(mut => {
        mut.addedNodes.forEach(node => {
          if (node.classList && node.classList.contains("product-card")) {
            setupCardInteractions(node);
          } else if (node.querySelectorAll) {
            node.querySelectorAll(".product-card").forEach(setupCardInteractions);
          }
        });
      });
    });

    const productsContainer = document.querySelector("#shop-products-grid, #homepage-products-grid, #wishlist-grid");
    if (productsContainer) {
      gridObserver.observe(productsContainer, { childList: true, subtree: true });
    }
  }

  // 3. Magnetic Hover Effect (Desktop only, if motion allowed)
  if (window.innerWidth > 992 && !prefersReducedMotion) {
    document.querySelectorAll(".slider-arrow, .btn-primary, .btn-secondary").forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.03)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  // 4. AJAX Fly-to-Cart Particle Effect
  window.animateFlyToCart = function(buttonElement, imgUrl) {
    if (prefersReducedMotion || !buttonElement || !imgUrl) return;

    // Create moving particle element
    const particle = document.createElement("div");
    particle.className = "cart-fly-particle";
    particle.style.backgroundImage = `url('${imgUrl}')`;

    // Position particle starting at button position
    const btnRect = buttonElement.getBoundingClientRect();
    particle.style.left = `${btnRect.left + btnRect.width / 2 - 16}px`;
    particle.style.top = `${btnRect.top + btnRect.height / 2 - 16}px`;
    document.body.appendChild(particle);

    // Target cart icon coordinates
    const cartIcon = document.getElementById("cart-btn");
    if (!cartIcon) {
      setTimeout(() => particle.remove(), 100);
      return;
    }
    const cartRect = cartIcon.getBoundingClientRect();

    // Trigger frame updates
    requestAnimationFrame(() => {
      particle.style.left = `${cartRect.left + cartRect.width / 2 - 16}px`;
      particle.style.top = `${cartRect.top + cartRect.height / 2 - 16}px`;
      particle.style.transform = "scale(0.2) rotate(360deg)";
      particle.style.opacity = "0.2";
    });

    // Remove particle and trigger morph animation on badge
    setTimeout(() => {
      particle.remove();
      const badge = document.getElementById("cart-badge");
      if (badge) {
        badge.classList.add("badge-pop");
        setTimeout(() => badge.classList.remove("badge-pop"), 450);
      }
    }, 750);
  };

  // 5. Intercept Click Events for Page Transition exits
  if (!prefersReducedMotion) {
    const exitOverlay = document.createElement("div");
    exitOverlay.className = "page-exit-overlay";
    document.body.appendChild(exitOverlay);

    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link && link.href && link.target !== "_blank") {
        // Only trigger on actual internal link clicks (not Javascript void, hash, or external sites)
        const isInternal = link.hostname === window.location.hostname;
        const hrefAttr = link.getAttribute("href") || "";
        const isHash = hrefAttr.startsWith("#") || hrefAttr.startsWith("javascript:");
        
        if (isInternal && !isHash && link.href !== window.location.href) {
          e.preventDefault();
          exitOverlay.classList.add("active");
          
          // Animate a top progress bar
          const progBar = document.createElement("div");
          progBar.className = "top-progress-bar";
          document.body.appendChild(progBar);
          
          setTimeout(() => {
            progBar.style.width = "75%";
          }, 50);

          setTimeout(() => {
            window.location.href = link.href;
          }, 400);
        }
      }
    });
  }
});

