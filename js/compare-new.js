// Elevora - Product Comparison Controller (LocalStorage sync)

const CompareKey = "elevora_compare";
const MaxCompareItems = 4;

function getCompareList() {
  const data = localStorage.getItem(CompareKey);
  return data ? JSON.parse(data) : [];
}

function saveCompareList(list) {
  localStorage.setItem(CompareKey, JSON.stringify(list));
  updateCompareBadges();
  window.dispatchEvent(new Event("compareUpdated"));
}

function toggleCompare(productId) {
  productId = parseInt(productId);
  let list = getCompareList();
  const index = list.indexOf(productId);
  let isAdded = false;

  const product = ElevoraProducts.find(p => p.id === productId);
  if (!product) return false;

  if (index === -1) {
    if (list.length >= MaxCompareItems) {
      if (typeof showToast === "function") {
        showToast(`You can compare up to ${MaxCompareItems} products only.`, "warning");
      }
      return false;
    }
    list.push(productId);
    isAdded = true;
    if (typeof showToast === "function") {
      showToast(`Added ${product.name} to comparison`, "success");
    }
  } else {
    list.splice(index, 1);
    isAdded = false;
    if (typeof showToast === "function") {
      showToast(`Removed ${product.name} from comparison`, "info");
    }
  }

  saveCompareList(list);
  updateCompareUI(productId, isAdded);
  return isAdded;
}

function removeFromCompare(productId) {
  productId = parseInt(productId);
  let list = getCompareList();
  list = list.filter(id => id !== productId);
  saveCompareList(list);
  updateCompareUI(productId, false);
}

function updateCompareBadges() {
  const list = getCompareList();
  const badges = document.querySelectorAll(".compare-count");
  badges.forEach(badge => {
    badge.textContent = list.length;
    badge.style.display = list.length > 0 ? "flex" : "none";
  });
  
  // Manage Compare Drawer view states
  const drawer = document.getElementById("compare-drawer-wrap");
  if (drawer) {
    if (list.length > 0) {
      drawer.classList.add("show");
      const listThumbs = document.getElementById("compare-drawer-thumbs");
      if (listThumbs) {
        listThumbs.innerHTML = list.map(id => {
          const p = ElevoraProducts.find(item => item.id === id);
          return p ? `<div style="width:40px; height:40px; border-radius:var(--border-radius-sm); border:1px solid var(--border-color); background:#fff; overflow:hidden; padding:4px;"><img src="${p.images[0]}" alt="compare" style="width:100%; height:100%; object-fit:contain;"></div>` : "";
        }).join("");
      }
    } else {
      drawer.classList.remove("show");
    }
  }
}

function updateCompareUI(productId, isCompared) {
  const buttons = document.querySelectorAll(`.compare-toggle-btn[data-id="${productId}"]`);
  buttons.forEach(btn => {
    if (isCompared) {
      btn.classList.add("active");
      btn.innerHTML = '<i class="fa-solid fa-code-compare"></i>';
      btn.title = "Remove from Compare";
    } else {
      btn.classList.remove("active");
      btn.innerHTML = '<i class="fa-solid fa-code-compare"></i>';
      btn.title = "Compare Product";
    }
  });
}

function syncCompareStates() {
  const list = getCompareList();
  document.querySelectorAll(".compare-toggle-btn").forEach(btn => {
    const id = parseInt(btn.getAttribute("data-id"));
    if (list.includes(id)) {
      btn.classList.add("active");
      btn.title = "Remove from Compare";
    } else {
      btn.classList.remove("active");
      btn.title = "Compare Product";
    }
  });
}

function renderComparePage() {
  const compareTableContainer = document.getElementById("compare-page-container");
  if (!compareTableContainer) return;

  const list = getCompareList();
  
  if (list.length === 0) {
    compareTableContainer.innerHTML = `
      <div class="empty-state-wrap" style="text-align: center; padding: 80px 24px; border: 1.5px dashed var(--border-color); border-radius: var(--border-radius-lg); background-color: var(--bg-secondary);">
        <i class="fa-solid fa-code-compare" style="font-size: 3.5rem; color: var(--text-muted); margin-bottom: 24px; opacity: 0.4;"></i>
        <h3 style="font-family: Outfit; font-size: 1.5rem; font-weight: 700; margin-bottom: 12px;">No products selected for comparison</h3>
        <p style="color: var(--text-muted); margin-bottom: 24px; max-width: 450px; margin-left: auto; margin-right: auto;">Choose up to 4 electronics items from our shop catalog to compare specifications side-by-side.</p>
        <a href="${getThemeUrl("shop")}" class="btn btn-primary" style="display: inline-flex; width: auto;">Browse Products</a>
      </div>
    `;
    return;
  }

  const products = list.map(id => ElevoraProducts.find(p => p.id === id)).filter(p => p !== undefined);

  const allSpecsKeys = new Set();
  products.forEach(p => {
    if (p.specs) {
      Object.keys(p.specs).forEach(key => allSpecsKeys.add(key));
    }
  });

  let tableHeaderHtml = `
    <div class="compare-row compare-header-row" style="display: grid; grid-template-columns: 240px repeat(${products.length}, 1fr); gap: 20px; align-items: stretch; border-bottom: 2px solid var(--border-color); padding-bottom: 24px;">
      <div class="compare-cell label-cell" style="display: flex; flex-direction: column; justify-content: flex-end; background: none; border-right: none;">
        <h4 style="font-family: Outfit; font-size: 1.1rem; font-weight: 700;">Comparing Info</h4>
        <span style="font-size: 0.8rem; color: var(--text-muted);">${products.length} product${products.length > 1 ? "s" : ""} selected</span>
      </div>
  `;

  products.forEach(p => {
    tableHeaderHtml += `
      <div class="compare-cell product-header-cell" style="position: relative; display: flex; flex-direction: column; text-align: center; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 20px; background-color: var(--bg-secondary);">
        <button class="remove-compare-item" onclick="removeFromCompare(${p.id})" style="position: absolute; top: 12px; right: 12px; width: 28px; height: 28px; border-radius: 50%; background-color: var(--bg-tertiary); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: var(--text-primary); transition: background-color var(--transition-fast); border: none;" title="Remove">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div style="height: 120px; overflow: hidden; margin-bottom: 16px; border-radius: var(--border-radius-md); background-color: #fff; padding: 8px;">
          <img src="${p.images[0]}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
        <span style="font-size: 0.75rem; font-weight: 700; color: var(--accent); text-transform: uppercase; margin-bottom: 6px; display: block;">${p.category}</span>
        <a href="${getThemeUrl("product")}?id=${p.id}" style="font-family: Outfit; font-weight: 700; font-size: 0.95rem; color: var(--text-primary); line-height: 1.3; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 38px; text-decoration: none;">${p.name}</a>
        <div style="display: flex; justify-content: center; gap: 8px; align-items: center; margin-bottom: 16px;">
          <span style="font-family: Outfit; font-weight: 800; font-size: 1.1rem; color: var(--text-primary);">$${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span style="text-decoration: line-through; color: var(--text-muted); font-size: 0.85rem;">$${p.oldPrice.toFixed(2)}</span>` : ""}
        </div>
        <button class="btn btn-primary" style="width: 100%; padding: 8px 12px; font-size: 0.8rem;" onclick="addToCart(${p.id}, 1, '${p.colors[0]}')">Add to Cart</button>
      </div>
    `;
  });

  tableHeaderHtml += `</div>`;

  let tableBodyHtml = `<div class="compare-body" style="margin-top: 30px; display: flex; flex-direction: column; gap: 12px;">`;

  // Brand Row
  tableBodyHtml += `
    <div class="compare-row" style="display: grid; grid-template-columns: 240px repeat(${products.length}, 1fr); gap: 20px; align-items: center; padding: 16px 0; border-bottom: 1.5px solid var(--border-color);">
      <div class="compare-cell label-cell" style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem; background: none; border-right: none;">Brand</div>
  `;
  products.forEach(p => {
    tableBodyHtml += `<div class="compare-cell val-cell" style="font-size: 0.95rem; text-align: center; font-weight: 600; color: var(--text-secondary);">${p.brand}</div>`;
  });
  tableBodyHtml += `</div>`;

  // Rating Row
  tableBodyHtml += `
    <div class="compare-row" style="display: grid; grid-template-columns: 240px repeat(${products.length}, 1fr); gap: 20px; align-items: center; padding: 16px 0; border-bottom: 1.5px solid var(--border-color);">
      <div class="compare-cell label-cell" style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem; background: none; border-right: none;">Customer Rating</div>
  `;
  products.forEach(p => {
    tableBodyHtml += `
      <div class="compare-cell val-cell" style="font-size: 0.9rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <span style="font-weight: 700; margin-bottom: 2px;">${p.rating} / 5.0</span>
        <div style="font-size: 0.75rem; color: #fbbf24; margin-bottom: 2px;">${generateStars(p.rating)}</div>
        <span style="font-size: 0.75rem; color: var(--text-muted);">(${p.reviewsCount} reviews)</span>
      </div>
    `;
  });
  tableBodyHtml += `</div>`;

  // Spec Rows
  allSpecsKeys.forEach(specKey => {
    tableBodyHtml += `
      <div class="compare-row" style="display: grid; grid-template-columns: 240px repeat(${products.length}, 1fr); gap: 20px; align-items: center; padding: 16px 0; border-bottom: 1.5px solid var(--border-color);">
        <div class="compare-cell label-cell" style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem; background: none; border-right: none;">${specKey}</div>
    `;
    products.forEach(p => {
      const specVal = p.specs && p.specs[specKey] ? p.specs[specKey] : `<span style="color: var(--text-muted);">N/A</span>`;
      tableBodyHtml += `<div class="compare-cell val-cell" style="font-size: 0.9rem; text-align: center; color: var(--text-secondary); line-height: 1.4;">${specVal}</div>`;
    });
    tableBodyHtml += `</div>`;
  });

  tableBodyHtml += `</div>`;

  compareTableContainer.innerHTML = tableHeaderHtml + tableBodyHtml;
}

function generateStars(rating) {
  let starsHtml = "";
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  for (let i = 0; i < full; i++) starsHtml += '<i class="fa-solid fa-star"></i>';
  if (half) starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = 0; i < empty; i++) starsHtml += '<i class="fa-regular fa-star"></i>';
  return starsHtml;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCompareBadges();
  syncCompareStates();
  renderComparePage();

  window.addEventListener("compareUpdated", () => {
    updateCompareBadges();
    syncCompareStates();
    renderComparePage();
  });
});
