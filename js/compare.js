// Elevora E-commerce Store - Product Comparison Engine

const CompareKey = "elevora_compare";

// Get active comparison list from storage
function getCompareList() {
  const data = localStorage.getItem(CompareKey);
  return data ? JSON.parse(data) : [];
}

// Save compare list to storage and update UI
function saveCompareList(list) {
  localStorage.setItem(CompareKey, JSON.stringify(list));
  syncCompareButtons();
  renderCompareBar();
  // Dispatch event for components to adapt
  window.dispatchEvent(new Event("compareUpdated"));
}

// Add or remove product from comparison
function toggleCompare(productId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  productId = parseInt(productId);
  let list = getCompareList();
  const index = list.indexOf(productId);

  if (index === -1) {
    if (list.length >= 3) {
      if (typeof showToast === "function") {
        showToast("You can compare up to 3 products at a time.", "warning");
      } else {
        alert("You can compare up to 3 products at a time.");
      }
      return;
    }
    list.push(productId);
    if (typeof showToast === "function") {
      const p = ElevoraProducts.find(item => item.id === productId);
      showToast(`Added ${p ? p.name.slice(0, 18) : "product"} to compare list`, "success");
    }
  } else {
    list.splice(index, 1);
    if (typeof showToast === "function") {
      showToast("Removed from compare list", "info");
    }
  }

  saveCompareList(list);
}

// Clear all items in compare list
function clearCompareList() {
  saveCompareList([]);
}

// Synchronize compare toggle button states
function syncCompareButtons() {
  const list = getCompareList();
  
  // Find all compare toggle buttons
  document.querySelectorAll(".compare-toggle-btn").forEach(btn => {
    const id = parseInt(btn.getAttribute("data-id"));
    if (list.includes(id)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Render dynamic comparison bottom panel bar
function renderCompareBar() {
  let bar = document.getElementById("compare-drawer-bar");
  const list = getCompareList();

  if (list.length === 0) {
    if (bar) {
      bar.classList.remove("show");
      setTimeout(() => {
        if (bar && getCompareList().length === 0) bar.remove();
      }, 300);
    }
    return;
  }

  if (!bar) {
    bar = document.createElement("div");
    bar.id = "compare-drawer-bar";
    bar.className = "compare-bar-container";
    document.body.appendChild(bar);
  }

  let html = `
    <div class="compare-bar-inner">
      <div class="compare-bar-products">
        ${list.map(id => {
          const p = ElevoraProducts.find(item => item.id === id);
          if (!p) return "";
          return `
            <div class="compare-bar-item">
              <img src="${p.images[0]}" alt="${p.name}" class="compare-item-thumb">
              <span class="compare-item-name">${p.name.split(" ")[0]} ${p.name.split(" ")[1] || ""}</span>
              <button class="compare-item-remove" onclick="toggleCompare(${p.id}, event)" aria-label="Remove">&times;</button>
            </div>
          `;
        }).join("")}
      </div>
      <div class="compare-bar-actions">
        <button class="btn btn-primary" onclick="openComparisonModal()" style="padding: 10px 20px; font-size: 0.85rem; font-family: Outfit; font-weight: 700; width: auto; border-radius: var(--border-radius-sm);">Compare Now</button>
        <button class="btn btn-secondary" onclick="clearCompareList()" style="padding: 10px 15px; font-size: 0.85rem; font-family: Outfit; border-color: transparent; width: auto; border-radius: var(--border-radius-sm);">Clear</button>
      </div>
    </div>
  `;

  bar.innerHTML = html;
  
  // Trigger animation frame
  setTimeout(() => bar.classList.add("show"), 50);
}

// Build and open Comparison Spec Grid Modal
function openComparisonModal() {
  let modal = document.getElementById("comparison-modal-overlay");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "comparison-modal-overlay";
    modal.className = "compare-modal-overlay";
    document.body.appendChild(modal);
  }

  const list = getCompareList();
  if (list.length === 0) return;

  const products = list.map(id => ElevoraProducts.find(p => p.id === id)).filter(Boolean);

  // Extract all unique spec keys
  const allSpecKeys = new Set();
  products.forEach(p => {
    if (p.specs) {
      Object.keys(p.specs).forEach(key => allSpecKeys.add(key));
    }
  });

  let tableHtml = `
    <div class="compare-modal-card">
      <div class="compare-modal-header">
        <h3 style="font-family: Outfit; font-size: 1.5rem; font-weight: 800; margin: 0;"><i class="fa-solid fa-scale-balanced" style="color: var(--accent); margin-right: 8px;"></i> Product Comparison</h3>
        <button class="compare-modal-close" onclick="closeComparisonModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="compare-modal-body">
        <div class="compare-table-responsive">
          <table class="compare-table">
            <thead>
              <tr>
                <th>Specs & Features</th>
                ${products.map(p => `
                  <th>
                    <div class="compare-th-content">
                      <img src="${p.images[0]}" alt="${p.name}" class="compare-table-img">
                      <h4 class="compare-table-title">${p.name}</h4>
                      <span class="compare-table-brand">${p.brand}</span>
                    </div>
                  </th>
                `).join("")}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="spec-label">Price</td>
                ${products.map(p => `
                  <td class="spec-value">
                    <strong class="compare-price">$${p.price.toFixed(2)}</strong>
                    ${p.oldPrice ? `<span class="compare-old-price">$${p.oldPrice.toFixed(2)}</span>` : ""}
                  </td>
                `).join("")}
              </tr>
              <tr>
                <td class="spec-label">Rating</td>
                ${products.map(p => `
                  <td class="spec-value">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <i class="fa-solid fa-star" style="color: #ffd60a;"></i>
                      <strong>${p.rating}</strong>
                      <span style="color: var(--text-muted); font-size: 0.8rem;">(${p.reviewsCount} reviews)</span>
                    </div>
                  </td>
                `).join("")}
              </tr>
              <tr>
                <td class="spec-label">Category</td>
                ${products.map(p => `<td class="spec-value">${p.category}</td>`).join("")}
              </tr>
              ${Array.from(allSpecKeys).map(key => `
                <tr>
                  <td class="spec-label">${key}</td>
                  ${products.map(p => {
                    const val = p.specs[key] || "—";
                    return `<td class="spec-value">${val}</td>`;
                  }).join("")}
                </tr>
              `).join("")}
              <tr>
                <td class="spec-label">Key Highlights</td>
                ${products.map(p => `
                  <td class="spec-value">
                    <ul class="compare-features-list">
                      ${p.features.map(f => `<li>${f}</li>`).join("")}
                    </ul>
                  </td>
                `).join("")}
              </tr>
              <tr class="action-row">
                <td>Buy Action</td>
                ${products.map(p => `
                  <td>
                    <button class="btn btn-primary" onclick="addToCart(${p.id}, 1, '${p.colors[0]}'); closeComparisonModal();" style="width: 100%; border-radius: var(--border-radius-sm);">Add to Cart</button>
                  </td>
                `).join("")}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  modal.innerHTML = tableHtml;
  
  // Close comparison modal on click background
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeComparisonModal();
    }
  });

  // Force reflow and show
  modal.offsetHeight;
  modal.classList.add("active");
}

// Close Comparison Specs Modal
function closeComparisonModal() {
  const modal = document.getElementById("comparison-modal-overlay");
  if (modal) {
    modal.classList.remove("active");
  }
}

// Init triggers
document.addEventListener("DOMContentLoaded", () => {
  syncCompareButtons();
  renderCompareBar();

  // Re-sync when cards are re-rendered
  window.addEventListener("cartUpdated", syncCompareButtons);
  window.addEventListener("wishlistUpdated", syncCompareButtons);
  window.addEventListener("compareUpdated", syncCompareButtons);
});
