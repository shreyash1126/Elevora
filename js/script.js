// js/script.js
// Core shared script for Elevora theme: Theme switching, i18n translation, currency converter,
// AI Search Suggestions, Voice/Image Search mockups, AI Chatbot assistant, and state counters.

// Currency Configuration
const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  INR: { symbol: '₹', rate: 83.0 }
};

let currentCurrency = localStorage.getItem('elevora_currency') || 'USD';
let currentLanguage = localStorage.getItem('elevora_lang') || 'en';

// Translation Dictionaries (i18n)
const TRANSLATIONS = {
  en: {
    "nav_home": "Home",
    "nav_shop": "Shop",
    "nav_blog": "Blog",
    "nav_faq": "FAQ",
    "nav_contact": "Contact Us",
    "search_placeholder": "Search electronics with AI...",
    "bot_greeting": "Hi! I am your Elevora AI Shopping Assistant. Ask me to compare products, suggest accessories, or answer shipping questions!",
    "add_to_cart": "Add to Cart",
    "wishlist": "Wishlist",
    "cart": "Cart",
    "track_order": "Track Order",
    "trending": "Trending Now",
    "footer_desc": "Premium online tech gadgets with a modern minimalist aesthetic."
  },
  hi: {
    "nav_home": "मुख्य पृष्ठ",
    "nav_shop": "दुकान",
    "nav_blog": "ब्लॉग",
    "nav_faq": "अक्सर पूछे जाने वाले प्रश्न",
    "nav_contact": "संपर्क करें",
    "search_placeholder": "AI के साथ इलेक्ट्रॉनिक्स खोजें...",
    "bot_greeting": "नमस्ते! मैं आपका एलेवोरा एआई शॉपिंग असिस्टेंट हूं। मुझसे उत्पादों की तुलना करने, सामान का सुझाव देने या शिपिंग प्रश्न पूछने के लिए कहें!",
    "add_to_cart": "कार्ट में जोड़ें",
    "wishlist": "इच्छा-सूची",
    "cart": "कार्ट",
    "track_order": "ऑर्डर ट्रैक करें",
    "trending": "अभी रुझान में",
    "footer_desc": "एक आधुनिक न्यूनतम सौंदर्य के साथ प्रीमियम ऑनलाइन तकनीक गैजेट।"
  },
  es: {
    "nav_home": "Inicio",
    "nav_shop": "Tienda",
    "nav_blog": "Blog",
    "nav_faq": "Preguntas frecuentes",
    "nav_contact": "Contáctenos",
    "search_placeholder": "Buscar electrónica con IA...",
    "bot_greeting": "¡Hola! Soy tu asistente de compras Elevora AI. ¡Pídeme que compare productos, te sugiera accesorios o responda preguntas de envío!",
    "add_to_cart": "Añadir al carrito",
    "wishlist": "Lista de deseos",
    "cart": "Carrito",
    "track_order": "Seguimiento",
    "trending": "Tendencias de hoy",
    "footer_desc": "Dispositivos tecnológicos premium con una estética moderna y minimalista."
  }
};

// Initialize Application State on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initI18n();
  initCurrency();
  initSearch();
  initAIChatbot();
  updateHeaderCounters();
  setupSmoothScroll();
});

// 1. Theme Management (Light/Dark Mode)
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;
  
  // Set initial state based on localStorage or OS preferences
  if (localStorage.getItem('elevora_theme') === 'dark' || 
      (!localStorage.getItem('elevora_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun text-xl"></i>';
  } else {
    document.documentElement.classList.remove('dark');
    themeToggleBtn.innerHTML = '<i class="fas fa-moon text-xl"></i>';
  }

  themeToggleBtn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('elevora_theme', 'light');
      themeToggleBtn.innerHTML = '<i class="fas fa-moon text-xl"></i>';
      showNotification('Switched to Light Mode', 'info');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('elevora_theme', 'dark');
      themeToggleBtn.innerHTML = '<i class="fas fa-sun text-xl"></i>';
      showNotification('Switched to Dark Mode', 'info');
    }
  });
}

// 2. Multi-language Translation Engine (i18n)
function initI18n() {
  const langSelect = document.getElementById('language-selector');
  if (langSelect) {
    langSelect.value = currentLanguage;
    langSelect.addEventListener('change', (e) => {
      currentLanguage = e.target.value;
      localStorage.setItem('elevora_lang', currentLanguage);
      applyTranslations();
      showNotification(`Language changed to ${langSelect.options[langSelect.selectedIndex].text}`, 'success');
    });
  }
  applyTranslations();
}

function applyTranslations() {
  const dictionary = TRANSLATIONS[currentLanguage] || TRANSLATIONS['en'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dictionary[key]) {
      if (el.tagName === 'INPUT' && el.type === 'text') {
        el.placeholder = dictionary[key];
      } else {
        el.innerText = dictionary[key];
      }
    }
  });
}

// 3. Multi-currency Converter
function initCurrency() {
  const currSelect = document.getElementById('currency-selector');
  if (currSelect) {
    currSelect.value = currentCurrency;
    currSelect.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      localStorage.setItem('elevora_currency', currentCurrency);
      applyCurrencies();
      showNotification(`Currency changed to ${currentCurrency}`, 'success');
    });
  }
  applyCurrencies();
}

// Global price formatter
function formatPrice(usdAmount) {
  const currencyData = CURRENCIES[currentCurrency] || CURRENCIES['USD'];
  const converted = (usdAmount * currencyData.rate).toFixed(2);
  // Format localized outputs
  if (currentCurrency === 'INR') {
    return `${currencyData.symbol}${parseFloat(converted).toLocaleString('en-IN')}`;
  }
  return `${currencyData.symbol}${converted}`;
}

// Apply converted currency formatting to any elements with data-price attribute
function applyCurrencies() {
  document.querySelectorAll('[data-price]').forEach(el => {
    const usdVal = parseFloat(el.getAttribute('data-price'));
    if (!isNaN(usdVal)) {
      el.innerText = formatPrice(usdVal);
    }
  });
}

// 4. AI-Powered Dynamic Search
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const suggestionsBox = document.getElementById('search-suggestions');
  if (!searchInput || !suggestionsBox) return;

  const trendingKeywords = ['AeroPulse', 'Smart Watch', 'MagSafe', 'Keyboard', 'Speaker', 'GaN Charger'];

  searchInput.addEventListener('focus', () => {
    suggestionsBox.classList.remove('hidden');
    renderSuggestions(searchInput.value);
  });

  searchInput.addEventListener('input', (e) => {
    renderSuggestions(e.target.value);
  });

  // Hide recommendations when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.classList.add('hidden');
    }
  });

  function renderSuggestions(query) {
    suggestionsBox.innerHTML = '';
    
    // Add Header
    const title = document.createElement('div');
    title.className = 'px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider';
    title.innerText = query.trim() ? 'AI Search Suggestions' : 'Trending Searches';
    suggestionsBox.appendChild(title);

    if (!query.trim()) {
      // Show Trending
      trendingKeywords.forEach(kw => {
        const item = document.createElement('a');
        item.href = `/shop?search=${encodeURIComponent(kw)}`;
        item.className = 'flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-sm text-gray-700 dark:text-gray-300 transition';
        item.innerHTML = `<i class="fas fa-chart-line text-blue-500 mr-3"></i> ${kw}`;
        suggestionsBox.appendChild(item);
      });
    } else {
      // Mock search filtering based on query
      const matches = trendingKeywords.filter(k => k.toLowerCase().includes(query.toLowerCase()));
      if (matches.length === 0) {
        const fallback = document.createElement('div');
        fallback.className = 'px-4 py-3 text-sm text-gray-500 dark:text-gray-400';
        fallback.innerText = `No direct matches. Press Enter to perform AI deep search for "${query}"`;
        suggestionsBox.appendChild(fallback);
      } else {
        matches.forEach(kw => {
          const item = document.createElement('a');
          item.href = `/shop?search=${encodeURIComponent(kw)}`;
          item.className = 'flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-sm text-gray-700 dark:text-gray-300 transition';
          item.innerHTML = `<i class="fas fa-search text-cyan-500 mr-3"></i> ${kw}`;
          suggestionsBox.appendChild(item);
        });
      }
    }
  }

  // Setup Voice & Image Search triggers
  const voiceBtn = document.getElementById('voice-search-btn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', triggerVoiceSearch);
  }

  const imageBtn = document.getElementById('image-search-btn');
  if (imageBtn) {
    imageBtn.addEventListener('click', triggerImageSearch);
  }
}

// 5. Mock Voice Search Modal
function triggerVoiceSearch() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center modal-overlay';
  modal.innerHTML = `
    <div class="glass-heavy p-8 rounded-3xl max-w-sm w-full text-center relative border border-white/20 animate-fade-in-up">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white" onclick="this.closest('.fixed').remove()">
        <i class="fas fa-times text-lg"></i>
      </button>
      <h3 class="text-xl font-bold font-accent mb-4">Listening for Search...</h3>
      <div class="flex items-center justify-center space-x-1 h-12 my-6">
        <span class="soundwave-bar"></span>
        <span class="soundwave-bar"></span>
        <span class="soundwave-bar"></span>
        <span class="soundwave-bar"></span>
        <span class="soundwave-bar"></span>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm">Speak clearly, e.g., "AeroPulse Headphones"</p>
    </div>
  `;
  document.body.appendChild(modal);

  // Mock speech speech recognized after 3 seconds
  setTimeout(() => {
    const input = document.getElementById('search-input');
    if (input) {
      input.value = "AeroPulse Headphones";
      input.dispatchEvent(new Event('input'));
    }
    modal.remove();
    showNotification('Voice Search recognized: "AeroPulse Headphones"', 'success');
  }, 3000);
}

// 6. Mock Image Search Modal
function triggerImageSearch() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center modal-overlay';
  modal.innerHTML = `
    <div class="glass-heavy p-8 rounded-3xl max-w-md w-full relative border border-white/20 animate-fade-in-up">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white" onclick="this.closest('.fixed').remove()">
        <i class="fas fa-times text-lg"></i>
      </button>
      <h3 class="text-xl font-bold font-accent mb-4 text-center">AI Visual Product Search</h3>
      <div class="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 transition" id="image-dropzone">
        <i class="fas fa-cloud-upload-alt text-4xl text-blue-500 mb-3"></i>
        <p class="font-semibold text-sm">Drag and drop an image of an electronics product</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Supports JPG, PNG, WEBP (Max 5MB)</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const dropzone = modal.querySelector('#image-dropzone');
  dropzone.addEventListener('click', () => {
    showNotification('Image uploaded successfully. Analyzing visual features...', 'info');
    setTimeout(() => {
      modal.remove();
      window.location.href = "/shop?search=AeroPulse";
    }, 2000);
  });
}

// 7. Global Notification Engine
function showNotification(message, type = 'success') {
  const container = document.getElementById('notification-container') || createNotificationContainer();
  const alert = document.createElement('div');
  alert.className = `flex items-center p-4 mb-3 rounded-2xl shadow-lg border text-sm transition-all duration-300 transform translate-x-12 opacity-0 glass`;
  
  let icon = '<i class="fas fa-check-circle text-green-500 mr-3 text-lg"></i>';
  if (type === 'error') icon = '<i class="fas fa-exclamation-circle text-red-500 mr-3 text-lg"></i>';
  if (type === 'info') icon = '<i class="fas fa-info-circle text-cyan-500 mr-3 text-lg"></i>';

  alert.innerHTML = `${icon} <span class="font-medium text-slate-800 dark:text-slate-200">${message}</span>`;
  container.appendChild(alert);

  // Trigger entering animation
  setTimeout(() => {
    alert.classList.remove('translate-x-12', 'opacity-0');
  }, 10);

  // Automatically close and remove after 4 seconds
  setTimeout(() => {
    alert.classList.add('translate-x-12', 'opacity-0');
    setTimeout(() => alert.remove(), 300);
  }, 4000);
}

function createNotificationContainer() {
  const div = document.createElement('div');
  div.id = 'notification-container';
  div.className = 'fixed top-24 right-6 z-50 max-w-sm w-full pointer-events-none flex flex-col items-end';
  document.body.appendChild(div);
  return div;
}

// 8. Dynamic Floating AI Shopping Assistant
function initAIChatbot() {
  const assistantHtml = `
    <div class="fixed bottom-6 right-6 z-50">
      <!-- Toggle Chat Button -->
      <button id="ai-chat-toggle" class="bg-gradient-premium bg-gradient-premium-hover text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg animate-glow-pulse focus:outline-none">
        <i class="fas fa-robot text-xl"></i>
      </button>

      <!-- Chat Interface Panel -->
      <div id="ai-chat-panel" class="hidden absolute bottom-18 right-0 w-88 h-120 glass-heavy rounded-3xl flex flex-col border border-white/20 shadow-2xl overflow-hidden animate-fade-in-up">
        <!-- Header -->
        <div class="bg-gradient-premium p-4 text-white flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <i class="fas fa-robot text-lg"></i>
            <div>
              <h4 class="font-bold text-sm">Elevora AI Assistant</h4>
              <p class="text-[10px] text-cyan-200">Online & Ready</p>
            </div>
          </div>
          <button id="ai-chat-close" class="text-white/80 hover:text-white">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Chat History -->
        <div id="ai-chat-history" class="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin">
          <div class="flex items-start space-x-2">
            <div class="bg-blue-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs p-3 rounded-2xl rounded-tl-none max-w-[85%] font-medium">
              ${TRANSLATIONS[currentLanguage].bot_greeting}
            </div>
          </div>
        </div>

        <!-- Predefined Quick Questions -->
        <div class="px-4 py-2 flex flex-wrap gap-1 border-t border-gray-100 dark:border-slate-800">
          <button class="quick-ask text-[10px] bg-gray-100 dark:bg-slate-800 hover:bg-blue-500 hover:text-white px-2 py-1 rounded-full transition text-gray-600 dark:text-gray-300">Compare products</button>
          <button class="quick-ask text-[10px] bg-gray-100 dark:bg-slate-800 hover:bg-blue-500 hover:text-white px-2 py-1 rounded-full transition text-gray-600 dark:text-gray-300">Recommend power bank</button>
          <button class="quick-ask text-[10px] bg-gray-100 dark:bg-slate-800 hover:bg-blue-500 hover:text-white px-2 py-1 rounded-full transition text-gray-600 dark:text-gray-300">Track order FAQ</button>
        </div>

        <!-- Input Bar -->
        <form id="ai-chat-form" class="p-3 border-t border-gray-100 dark:border-slate-800 flex space-x-2">
          <input type="text" id="ai-chat-input" placeholder="Type a message..." class="flex-1 bg-gray-100 dark:bg-slate-800 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white" required>
          <button type="submit" class="bg-blue-600 text-white px-3 py-2 rounded-xl hover:bg-blue-700 transition">
            <i class="fas fa-paper-plane text-xs"></i>
          </button>
        </form>
      </div>
    </div>
  `;

  // Inject Bot HTML
  const botDiv = document.createElement('div');
  botDiv.innerHTML = assistantHtml;
  document.body.appendChild(botDiv);

  // Selector mappings
  const toggleBtn = document.getElementById('ai-chat-toggle');
  const chatPanel = document.getElementById('ai-chat-panel');
  const closeBtn = document.getElementById('ai-chat-close');
  const chatForm = document.getElementById('ai-chat-form');
  const chatInput = document.getElementById('ai-chat-input');
  const chatHistory = document.getElementById('ai-chat-history');

  toggleBtn.addEventListener('click', () => {
    chatPanel.classList.toggle('hidden');
    if (!chatPanel.classList.contains('hidden')) {
      chatInput.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    chatPanel.classList.add('hidden');
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    addChatMessage(query, 'user');
    chatInput.value = '';

    // Simulate AI response logic
    setTimeout(() => {
      const response = processBotQuery(query);
      addChatMessage(response, 'bot');
    }, 1000);
  });

  // Setup click triggers for quick question pills
  document.querySelectorAll('.quick-ask').forEach(pill => {
    pill.addEventListener('click', () => {
      const query = pill.innerText;
      addChatMessage(query, 'user');
      setTimeout(() => {
        const response = processBotQuery(query);
        addChatMessage(response, 'bot');
      }, 1000);
    });
  });

  function addChatMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = sender === 'user' ? 'flex justify-end animate-message' : 'flex justify-start animate-message';
    
    const styleClasses = sender === 'user'
      ? 'bg-blue-600 text-white text-xs p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-md font-medium'
      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs p-3 rounded-2xl rounded-tl-none max-w-[85%] shadow-md border border-gray-100 dark:border-slate-700';

    bubble.innerHTML = `<div class="${styleClasses}">${text}</div>`;
    chatHistory.appendChild(bubble);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function processBotQuery(text) {
    const q = text.toLowerCase();
    if (q.includes('compare') || q.includes('headphones') || q.includes('speaker')) {
      return "Sure! The **AeroPulse ANC Headphones** ($199.99) offer active noise cancellation and up to 45 hours battery. The **EchoSphere 360 Speaker** ($89.99) is an IPX7 waterproof portable speaker with rich omnidirectional audio. If you want private isolation, choose headphones; for sharing, the speaker is best!";
    }
    if (q.includes('recommend') || q.includes('power bank') || q.includes('charger')) {
      return "I highly recommend the **VoltMag 15W MagSafe Power Bank** ($49.99). It features 10,000mAh capacity, built-in kickstand, and snappy magnetic locks compatible with MagSafe phones. Alternatively, check out the **GaNCharge 100W Blocks** ($59.99) for super-fast wired multi-device charging.";
    }
    if (q.includes('track') || q.includes('order') || q.includes('shipping')) {
      return "To track your shipment, navigate to our **[Track Order](/track-order)** page. Enter your Order ID and PIN to view real-time delivery location milestones and delivery agent contact details.";
    }
    if (q.includes('return') || q.includes('refund') || q.includes('warranty')) {
      return "All Elevora electronic products come with a **1-Year Limited Warranty** and a **30-Day Hassle-Free Return Policy**. For further questions, submit a support ticket in your account dashboard.";
    }
    return "Thank you for asking! I'm searching the Elevora catalog... For detailed inquiries, you can browse our **[Shop page](/shop)** or ask me about specific features of our AeroPulse, Apex Chrono, and VoltMag accessories.";
  }
}

// 9. Update Bubble Notification Badges (Cart & Wishlist Count)
function updateHeaderCounters() {
  const cartList = JSON.parse(localStorage.getItem('elevora_cart') || '[]');
  const wishlistList = JSON.parse(localStorage.getItem('elevora_wishlist') || '[]');

  // Cart total items count
  const cartQty = cartList.reduce((acc, item) => acc + item.quantity, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.innerText = cartQty;
    if (cartQty > 0) {
      el.classList.remove('hidden');
      el.classList.add('animate-cart-bounce');
      setTimeout(() => el.classList.remove('animate-cart-bounce'), 400);
    } else {
      el.classList.add('hidden');
    }
  });

  // Wishlist count
  const wishQty = wishlistList.length;
  document.querySelectorAll('.wishlist-badge').forEach(el => {
    el.innerText = wishQty;
    if (wishQty > 0) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
}

// 10. Smooth Scrolling & Parallax Helpers
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
