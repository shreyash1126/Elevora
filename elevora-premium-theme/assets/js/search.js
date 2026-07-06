// Elevora - Live Search Suggestions controller (New Design)

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-overlay-input");
  const suggestionsBox = document.getElementById("search-suggestions");

  if (!searchInput || !suggestionsBox) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      suggestionsBox.innerHTML = "";
      suggestionsBox.classList.remove("show");
      return;
    }

    // Filter matches
    const matches = ElevoraProducts.filter(p => {
      return p.name.toLowerCase().includes(query) || 
             p.category.toLowerCase().includes(query) ||
             p.brand.toLowerCase().includes(query);
    }).slice(0, 5); // Max 5 suggestions

    if (matches.length === 0) {
      suggestionsBox.innerHTML = `
        <div style="padding: 16px 20px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          No matching premium gadgets found
        </div>
      `;
      suggestionsBox.classList.add("show");
      return;
    }

    let html = "";
    matches.forEach(p => {
      html += `
        <a href="${getThemeUrl("product")}?id=${p.id}" class="suggestion-item" style="text-decoration: none; display: flex;">
          <div class="suggestion-img">
            <img src="${p.images[0]}" alt="${p.name}">
          </div>
          <div class="suggestion-info">
            <div class="suggestion-name">${p.name}</div>
            <div style="display: flex; gap: 8px; font-size: 0.8rem; font-family: Outfit; font-weight: 700;">
              <span style="color: var(--text-primary);">$${p.price.toFixed(2)}</span>
              ${p.oldPrice ? `<span style="text-decoration: line-through; color: var(--text-muted);">$${p.oldPrice.toFixed(2)}</span>` : ""}
            </div>
          </div>
          <i class="fa-solid fa-chevron-right" style="color: var(--text-muted); font-size: 0.8rem;"></i>
        </a>
      `;
    });

    suggestionsBox.innerHTML = html;
    suggestionsBox.classList.add("show");
  });

  // Close search suggestions on outside clicks
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.classList.remove("show");
    }
  });
});
