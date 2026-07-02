// Elevora - Live Search Autocomplete Engine with Voice Recognition

document.addEventListener("DOMContentLoaded", () => {
  const searchInputs = document.querySelectorAll(".header-search-input, .shop-search-input");
  
  // Voice Search Web Speech API Integration
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  searchInputs.forEach(input => {
    // Dynamically insert or find suggestion wrapper under input wrapper parent
    let wrapper = input.parentElement;
    let suggestionsContainer = wrapper.querySelector(".search-suggestions");
    
    if (!suggestionsContainer) {
      suggestionsContainer = document.createElement("div");
      suggestionsContainer.className = "search-suggestions";
      wrapper.appendChild(suggestionsContainer);
    }

    // Add microphone button for voice search if supported
    if (SpeechRecognition && !wrapper.querySelector(".voice-search-btn")) {
      const voiceBtn = document.createElement("button");
      voiceBtn.type = "button";
      voiceBtn.className = "voice-search-btn";
      voiceBtn.setAttribute("aria-label", "Search with voice");
      voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
      
      // Pad input right side to prevent text overlapping microphone button
      input.style.paddingRight = "42px";
      wrapper.appendChild(voiceBtn);
      
      // Initialize Speech Recognition
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      let isListening = false;
      
      voiceBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isListening) {
          recognition.stop();
          return;
        }
        
        try {
          recognition.start();
        } catch (err) {
          console.error("Speech recognition start failed:", err);
        }
      });
      
      recognition.onstart = () => {
        isListening = true;
        voiceBtn.classList.add("listening");
        voiceBtn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i>';
        showVoiceListeningUI();
      };
      
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        // Strip out trailing punctuation
        const query = text.replace(/[.\p{P}]/gu, "").trim();
        input.value = query;
        
        // Trigger input event to show suggestions list
        const inputEvent = new Event("input", { bubbles: true });
        input.dispatchEvent(inputEvent);
        
        if (typeof showToast === "function") {
          showToast(`Speech recognized: "${query}"`, "success");
        }
        
        // Auto-redirect header search after a short delay
        if (input.classList.contains("header-search-input")) {
          setTimeout(() => {
            window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
          }, 1200);
        }
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error !== "no-speech") {
          if (typeof showToast === "function") {
            showToast(`Voice search failed: ${event.error}`, "error");
          }
        }
        resetVoiceSearchState();
      };
      
      recognition.onend = () => {
        resetVoiceSearchState();
      };
      
      function resetVoiceSearchState() {
        isListening = false;
        voiceBtn.classList.remove("listening");
        voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        hideVoiceListeningUI();
      }
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

// Soundwave overlay UI handlers
function showVoiceListeningUI() {
  let overlay = document.getElementById("voice-search-modal");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "voice-search-modal";
    overlay.className = "voice-modal-overlay";
    overlay.innerHTML = `
      <div class="voice-modal-card">
        <button class="voice-modal-close" onclick="hideVoiceListeningUI()"><i class="fa-solid fa-xmark"></i></button>
        <div class="voice-pulse-ring">
          <i class="fa-solid fa-microphone"></i>
        </div>
        <h3 style="font-family: Outfit; font-weight: 800; font-size: 1.5rem; margin: 0 0 10px;">Listening...</h3>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 24px;">Speak clearly into your device microphone.</p>
        <div class="sound-wave">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  // Close voice search if they click background overlay
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      hideVoiceListeningUI();
    }
  };

  overlay.offsetHeight; // Force reflow
  overlay.classList.add("active");
}

function hideVoiceListeningUI() {
  const overlay = document.getElementById("voice-search-modal");
  if (overlay) {
    overlay.classList.remove("active");
  }
}

// Mobile Search Overlay Toggle
function toggleMobileSearch() {
  const overlay = document.getElementById("mobile-search-overlay");
  if (overlay) {
    overlay.classList.toggle("open");
    if (overlay.classList.contains("open")) {
      const input = overlay.querySelector(".header-search-input");
      if (input) input.focus();
    }
  }
}
