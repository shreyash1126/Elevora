// Elevora - Central Script Coordinator (Electric Obsidian Theme)

// 0. Premium Preloader Overlay
(function createPreloader() {
  const preloader = document.createElement("div");
  preloader.id = "global-preloader";
  preloader.innerHTML = `
    <div class="preloader-content">
      <div class="preloader-logo">ELEVORA<span class="logo-dot"></span></div>
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
    }, 450);
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  // Check for prefers-reduced-motion setting
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  document.querySelectorAll(".product-grid, .category-grid, .features-grid, .bento-grid, #wishlist-grid, .blog-grid").forEach(grid => {
    grid.classList.add("reveal-element");
    Array.from(grid.children).forEach((child) => {
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
    revealElements.forEach(el => el.classList.add("revealed"));
  }

  // 4. Back to Top Button
  let backBtn = document.createElement("button");
  backBtn.className = "back-to-top";
  backBtn.setAttribute("aria-label", "Back to top");
  backBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(backBtn);

  // Style BTT button
  backBtn.style.cssText = "position:fixed; bottom:30px; right:30px; width:48px; height:48px; border-radius:var(--border-radius-md); background:var(--bg-secondary); border:1.5px solid var(--border-color); color:var(--text-primary); display:flex; align-items:center; justify-content:center; cursor:pointer; opacity:0; visibility:hidden; transition:all var(--transition-fast); z-index:997;";

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backBtn.style.opacity = "1";
      backBtn.style.visibility = "visible";
    } else {
      backBtn.style.opacity = "0";
      backBtn.style.visibility = "hidden";
    }
  }, { passive: true });

  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 5. Sticky Header Scroll handler
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
    handleHeaderScroll();
  }

  // 6. Interactive Card Tilts & Spotlight Glows (Desktop only)
  if (window.innerWidth > 992 && !prefersReducedMotion) {
    const setupCardInteractions = (card) => {
      card.classList.add("spotlight-card");
      card.classList.add("tilt-card");

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / centerY) * 7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.setProperty("--rotate-x", `${rotateX}deg`);
        card.style.setProperty("--rotate-y", `${rotateY}deg`);
      });

      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--rotate-x", `0deg`);
        card.style.setProperty("--rotate-y", `0deg`);
      });
    };

    document.querySelectorAll(".product-card, .category-card").forEach(setupCardInteractions);

    const gridObserver = new MutationObserver((mutations) => {
      mutations.forEach(mut => {
        mut.addedNodes.forEach(node => {
          if (node.classList && (node.classList.contains("product-card") || node.classList.contains("category-card"))) {
            setupCardInteractions(node);
          } else if (node.querySelectorAll) {
            node.querySelectorAll(".product-card, .category-card").forEach(setupCardInteractions);
          }
        });
      });
    });

    const productsContainer = document.querySelector("#shop-products-grid, #homepage-products-grid, #wishlist-grid");
    if (productsContainer) {
      gridObserver.observe(productsContainer, { childList: true, subtree: true });
    }
  }

  // 7. Magnetic Arrows & Buttons Hovering (Desktop only)
  if (window.innerWidth > 992 && !prefersReducedMotion) {
    document.querySelectorAll(".slider-arrow, .btn-primary, .btn-secondary").forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.02)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  // 8. Add to Cart SVG Flight Particle
  window.animateFlyToCart = function(buttonElement, imgUrl) {
    if (prefersReducedMotion || !buttonElement || !imgUrl) return;

    const particle = document.createElement("div");
    particle.className = "cart-fly-particle";
    particle.style.backgroundImage = `url('${imgUrl}')`;

    const btnRect = buttonElement.getBoundingClientRect();
    particle.style.left = `${btnRect.left + btnRect.width / 2 - 18}px`;
    particle.style.top = `${btnRect.top + btnRect.height / 2 - 18}px`;
    document.body.appendChild(particle);

    const cartIcon = document.getElementById("cart-btn");
    if (!cartIcon) {
      setTimeout(() => particle.remove(), 100);
      return;
    }
    const cartRect = cartIcon.getBoundingClientRect();

    requestAnimationFrame(() => {
      particle.style.left = `${cartRect.left + cartRect.width / 2 - 18}px`;
      particle.style.top = `${cartRect.top + cartRect.height / 2 - 18}px`;
      particle.style.transform = "scale(0.2) rotate(360deg)";
      particle.style.opacity = "0.1";
    });

    setTimeout(() => {
      particle.remove();
      const badge = document.getElementById("cart-badge");
      if (badge) {
        badge.classList.add("badge-pop");
        setTimeout(() => badge.classList.remove("badge-pop"), 450);
      }
    }, 800);
  };

  // 9. Intercept links clicks for premium Page transition exit
  if (!prefersReducedMotion) {
    const exitOverlay = document.createElement("div");
    exitOverlay.className = "page-exit-overlay";
    document.body.appendChild(exitOverlay);

    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link && link.href && link.target !== "_blank") {
        const isInternal = link.hostname === window.location.hostname;
        const hrefAttr = link.getAttribute("href") || "";
        const isHash = hrefAttr.startsWith("#") || hrefAttr.startsWith("javascript:");
        
        if (isInternal && !isHash && link.href !== window.location.href) {
          e.preventDefault();
          exitOverlay.classList.add("active");
          
          const progBar = document.createElement("div");
          progBar.className = "top-progress-bar";
          document.body.appendChild(progBar);
          
          setTimeout(() => {
            progBar.style.width = "75%";
          }, 40);

          setTimeout(() => {
            window.location.href = link.href;
          }, 350);
        }
      }
    });
  }
  
  // 10. Sticky Mobile Add-to-Cart scroll indicator
  const mobileBar = document.querySelector(".sticky-mobile-bar");
  const mainBuyBtn = document.querySelector(".product-info-col .btn-primary");
  if (mobileBar && mainBuyBtn) {
    window.addEventListener("scroll", () => {
      const rect = mainBuyBtn.getBoundingClientRect();
      if (rect.bottom < 0) {
        mobileBar.style.display = "flex";
      } else {
        mobileBar.style.display = "none";
      }
    }, { passive: true });
  }
});

// Search overlay opening helpers
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
