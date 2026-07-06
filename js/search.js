// Live search suggestions controller - Purged of Elevora branding styles

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-overlay-input");
  const suggestionsBox = document.getElementById("search-suggestions");

  if (!searchInput || !suggestionsBox) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      suggestionsBox.innerHTML = "";
      suggestionsBox.style.display = "none";
      return;
    }

    const matches = ElevoraProducts.filter(p => {
      return p.name.toLowerCase().includes(query) || 
             p.category.toLowerCase().includes(query) ||
             p.brand.toLowerCase().includes(query);
    }).slice(0, 5);

    if (matches.length === 0) {
      suggestionsBox.innerHTML = `
        <div style="padding: 12px 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          No matching products found
        </div>
      `;
      suggestionsBox.style.display = "block";
      return;
    }

    let html = "";
    matches.forEach(p => {
      html += `
        <a href="product.html?id=${p.id}" style="text-decoration: none; display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-bottom: 1px solid var(--border-color); color: var(--text-primary);">
          <div style="width: 40px; height: 40px; background: #fff; padding: 4px; border: 1px solid var(--border-color); border-radius: var(--border-radius-sm);">
            <img src="${p.images[0]}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div style="flex-grow: 1;">
            <div style="font-weight: 600; font-size: 0.9rem;">${p.name}</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">$${p.price.toFixed(2)}</div>
          </div>
        </a>
      `;
    });

    suggestionsBox.innerHTML = html;
    suggestionsBox.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.style.display = "none";
    }
  });
});
