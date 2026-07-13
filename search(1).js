// Elevora - Live Search Autocomplete Engine

document.addEventListener("DOMContentLoaded", () => {
  const searchInputs = document.querySelectorAll(".header-search-input, .shop-search-input");
  
  searchInputs.forEach(input => {
    // Dynamically insert or find suggestion wrapper under input wrapper parent
    let wrapper = input.parentElement;
    let suggestionsContainer = wrapper.querySelector(".search-suggestions");
    
    if (!suggestionsContainer) {
      suggestionsContainer = document.createElement("div");
      suggestionsContainer.className = "search-suggestions";
      wrapper.appendChild(suggestionsContainer);
    }

    // Input changes listener
    input.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      
      if (query.length < 2) {
        suggestionsContainer.innerHTML = "";
        suggestionsContainer.classList.remove("show");
        return;
      }

      // Filter products array
      const matches = ElevoraProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
      ).slice(0, 5); // Limit suggestions to 5 items

      if (matches.length === 0) {
        suggestionsContainer.innerHTML = `
          <div style="padding: 16px; font-size: 0.85rem; color: var(--text-muted); text-align: center;">
            No smart gadgets found matching "${e.target.value}"
          </div>
        `;
        suggestionsContainer.classList.add("show");
        return;
      }

      let html = "";
      matches.forEach(p => {
        html += `
          <a href="product.html?id=${p.id}" class="suggestion-item">
            <div class="suggestion-img">
              <img src="${p.images[0]}" alt="${p.name}">
            </div>
            <div class="suggestion-info">
              <div class="suggestion-name">${p.name}</div>
              <div style="display: flex; gap: 8px; align-items: center;">
                <span class="suggestion-category" style="font-size: 0.7rem; color: var(--accent-dark); font-weight: 700;">${p.category}</span>
                <span class="suggestion-price" style="font-size: 0.8rem; font-weight: 600;">$${p.price.toFixed(2)}</span>
              </div>
            </div>
            <i class="fa-solid fa-chevron-right" style="font-size: 0.75rem; color: var(--text-muted);"></i>
          </a>
        `;
      });

      suggestionsContainer.innerHTML = html;
      suggestionsContainer.classList.add("show");
    });

    // Close suggestions box when user clicks outside input area
    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) {
        suggestionsContainer.classList.remove("show");
      }
    });

    // Support Form submits / Enter press redirection
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  });
});
