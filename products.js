const products = [
  {
    id: "unseen",
    name: "Elevora Apex Smartphone 5G",
    tagline: "Ultimate power, boundary-pushing display.",
    price: 899.00,
    originalPrice: 999.00,
    rating: 4.8,
    reviewsCount: 1240,
    type: "Phones",
    category: "Mobiles & Audio",
    sub: "smartphones",
    tags: ["phones", "5g", "flagship", "gifting", "new-arrivals", "tech-gadgets"],
    spf: 2,
    isBestseller: true,
    isNew: false,
    isOffer: true,
    image: "assets/images/smartphone.jpg",
    description: "Elevora Apex Smartphone 5G features a gorgeous 120Hz LTPO display, professional-grade triple camera system, and the lightning-fast Apex Core Gen 2 processor. Engineered for extreme multitasking, seamless connectivity, and stellar battery efficiency.",
    ingredients: "Display: 6.7-inch QHD+ AMOLED; Processor: Apex Core Gen 2; Battery: 5000mAh; RAM: 12GB; Storage: 256GB.",
    benefits: [
      "Pro-grade triple camera array with optical zoom",
      "Dynamic 120Hz AMOLED display for smooth visuals",
      "Next-gen processor handles gaming and productivity",
      "IP68 water and dust resistance for daily security"
    ],
    howToUse: "Power on and follow on-screen guides to transfer data. Keep software updated. Supports 45W fast charging."
  },
  {
    id: "glow",
    name: "Elevora SoundFlow Headphones",
    tagline: "Pure acoustic bliss, zero distractions.",
    price: 299.00,
    originalPrice: 349.00,
    rating: 4.7,
    reviewsCount: 980,
    type: "Audio",
    category: "Mobiles & Audio",
    sub: "headphones",
    tags: ["audio", "anc", "wireless", "gifting", "new-arrivals", "combos", "travel"],
    spf: 1,
    isBestseller: true,
    isNew: true,
    isOffer: true,
    image: "assets/images/headphones.jpg",
    description: "Elevora SoundFlow Wireless Headphones offer top-tier Active Noise Cancellation (ANC), studio-quality spatial audio, and high-fidelity custom drivers. Experience premium comfort with plush memory foam earcups and up to 40 hours of battery life.",
    ingredients: "Driver size: 40mm; Bluetooth: 5.3; Battery: Up to 40 hours (ANC on); Connection: Wireless / 3.5mm jack.",
    benefits: [
      "Hybrid Active Noise Cancellation filters ambient noise",
      "High-fidelity spatial audio for immersive theater sound",
      "Ergonomic memory foam cushions for all-day comfort",
      "Fast charging: 10 mins gives 5 hours playback"
    ],
    howToUse: "Turn on bluetooth pairing, connect to your phone. Adjust ANC settings using the ear cup controls."
  },
  {
    id: "play-lotion",
    name: "Elevora ChronoFit Smartwatch",
    tagline: "Track your health, elevate your style.",
    price: 249.00,
    originalPrice: 289.00,
    rating: 4.9,
    reviewsCount: 2150,
    type: "Wearables",
    category: "Laptops & Wearables",
    sub: "wearables",
    tags: ["fitness", "watch", "health", "gifting", "new-arrivals"],
    spf: 2,
    isBestseller: true,
    isNew: false,
    isOffer: true,
    image: "assets/images/smartwatch.jpg",
    description: "Elevora ChronoFit Smartwatch is your ultimate fitness partner and health monitor. Tracks heart rate, blood oxygen, sleep quality, and active stress levels. Housed in a lightweight aluminum body with a high-res customizable AMOLED screen.",
    ingredients: "Screen: 1.43-inch AMOLED; Sensors: PPG Heart Rate, SpO2, Accelerometer; Connectivity: GPS, Bluetooth.",
    benefits: [
      "Continuous heart rate and advanced health tracking",
      "Water-resistant up to 50 meters for swimming",
      "Customizable dials and premium silicone sport band",
      "Up to 7 days battery life on a single charge"
    ],
    howToUse: "Install Elevora Fit App on your phone, pair device via Bluetooth. Synchronize goals."
  },
  {
    id: "body-mist",
    name: "Elevora WaveBlast Speaker",
    tagline: "Waterproof, powerful, and ready to party.",
    price: 129.00,
    originalPrice: 159.00,
    rating: 4.6,
    reviewsCount: 730,
    type: "Audio",
    category: "Mobiles & Audio",
    sub: "speakers",
    tags: ["audio", "speakers", "waterproof", "car-travel", "travel", "gifting", "under-150"],
    spf: 1,
    isBestseller: true,
    isNew: false,
    isOffer: true,
    image: "assets/images/speaker.jpg",
    description: "Elevora WaveBlast is a portable outdoor Bluetooth speaker delivering massive 360-degree sound and deep bass. IPX7 waterproof rating ensures it handles poolside splashes easily. Dynamic RGB light show pulses to your music beat.",
    ingredients: "Power Output: 30W; Waterproofing: IPX7; Playtime: Up to 15 hours; Lights: 4 RGB modes.",
    benefits: [
      "Room-filling 360-degree sound with deep passive radiators",
      "IPX7 fully waterproof construction for beach and pool",
      "15 hours playtime with fast USB-C recharging",
      "Integrated multi-color LED visual light show"
    ],
    howToUse: "Press and hold power, enable Bluetooth pairing on your device. Connect and stream your playlist."
  },
  {
    id: "mattescreen",
    name: "Elevora ClickMaster Keyboard",
    tagline: "Tactile keypresses, customized RGB comfort.",
    price: 149.00,
    originalPrice: 179.00,
    rating: 4.5,
    reviewsCount: 540,
    type: "Accessories",
    category: "Laptops & Wearables",
    sub: "keyboards",
    tags: ["keyboard", "rgb", "tools-utility", "utility", "under-150", "gifting"],
    spf: 1,
    isBestseller: false,
    isNew: true,
    isOffer: false,
    image: "assets/images/keyboard.jpg",
    description: "Elevora ClickMaster features premium tactile brown mechanical switches, custom double-shot PBT keycaps, and multi-zone customizable RGB backlighting. Sleek aluminum top-plate and detachable wrist rest provide comfortable typing.",
    ingredients: "Key Switch: Tactile Mechanical Brown; Keycaps: Double-shot PBT; Connection: Wired USB-C; Layout: Full Size.",
    benefits: [
      "Tactile mechanical switches for satisfying responsive typing",
      "Vibrant custom RGB backlighting with dynamic profiles",
      "Heavy-duty aluminum alloy top panel for durable builds",
      "Ergonomic layout with removable magnetic wrist rest"
    ],
    howToUse: "Plug in the USB-C cable to your computer. Download key mapper software to customize RGB lighting."
  },
  {
    id: "skin-tint",
    name: "Elevora CineVue 4K Monitor",
    tagline: "Stunning color accuracy, immersive curved screen.",
    price: 449.00,
    originalPrice: 499.00,
    rating: 4.8,
    reviewsCount: 890,
    type: "Computers",
    category: "Laptops & Wearables",
    sub: "monitors",
    tags: ["monitors", "4k", "display", "tools-utility", "utility", "gifting"],
    spf: 3,
    isBestseller: false,
    isNew: true,
    isOffer: true,
    image: "assets/images/monitor.jpg",
    description: "Elevora CineVue is a 32-inch curved 4K monitor designed for designers and gamers. Features HDR10 support, 99% sRGB color coverage, and built-in stereo speakers. Curved display reduces eye strain.",
    ingredients: "Resolution: 3840 x 2160 (4K); Panel: IPS Curved; Refresh Rate: 60Hz; Ports: 2x HDMI, 1x DP, USB Hub.",
    benefits: [
      "Crisp 4K UHD resolution with rich HDR10 detailing",
      "Curved screen provides panoramic field of view",
      "High color accuracy (99% sRGB) for photo and video work",
      "Built-in dual speakers and multi-port hub connectivity"
    ],
    howToUse: "Assemble base, connect to power, plug in HDMI/DisplayPort cable to your device. Adjust height/tilt."
  },
  {
    id: "sheerscreen",
    name: "Elevora AirBook Slim Laptop",
    tagline: "Featherlight design, powerhouse speed.",
    price: 999.00,
    originalPrice: 1199.00,
    rating: 4.7,
    reviewsCount: 420,
    type: "Computers",
    category: "Laptops & Wearables",
    sub: "laptops",
    tags: ["laptops", "computers", "tools-utility", "gifting", "new-arrivals"],
    spf: 2,
    isBestseller: false,
    isNew: true,
    isOffer: true,
    image: "assets/images/laptop.jpg",
    description: "Elevora AirBook Slim is a beautifully thin and light laptop built for on-the-go professionals. Featuring a crisp 14-inch IPS display, next-gen Intel processor, and long battery life. Silent fanless design.",
    ingredients: "Processor: Intel i5 Quad-Core; RAM: 16GB; Storage: 512GB NVMe SSD; Screen: 14\" IPS FHD.",
    benefits: [
      "Ultra-thin 0.5-inch metal chassis weighs only 2.7 lbs",
      "Vivid 14-inch display with narrow bezels",
      "Silent fanless design maintains peak cooler performance",
      "Fast-charging battery lasts up to 12 hours"
    ],
    howToUse: "Charge fully, press power button, complete Windows setup wizard. Install your productivity apps."
  },
  {
    id: "glow-stick",
    name: "Elevora PowerDock 100W GaN Charger",
    tagline: "Ultra-compact multi-port fast charger.",
    price: 49.00,
    originalPrice: 65.00,
    rating: 4.8,
    reviewsCount: 650,
    type: "Accessories",
    category: "Laptops & Wearables",
    sub: "chargers",
    tags: ["chargers", "mobile-accessories", "under-50", "car-travel", "utility", "travel"],
    spf: 1,
    isBestseller: true,
    isNew: false,
    isOffer: true,
    image: "assets/images/charger.jpg",
    description: "Elevora PowerDock uses Gallium Nitride (GaN) technology to deliver massive 100W power output in a compact size. Charge up to 3 devices simultaneously with 2x USB-C ports and 1x USB-A port.",
    ingredients: "Max Power: 100W; Tech: GaN V3; Ports: 2x USB-C PD, 1x USB-A QC; Weight: 150g.",
    benefits: [
      "Advanced GaN tech makes it 40% smaller than average chargers",
      "Max 100W power delivery fast-charges laptops and phones",
      "Three output ports allow simultaneous multi-charging",
      "Advanced cooling and device overcharge protection"
    ],
    howToUse: "Plug into wall outlet, connect charging cables from the ports to your devices."
  },
  {
    id: "play-gel",
    name: "Elevora Pods Pro Earbuds",
    tagline: "True wireless freedom, rich active sound.",
    price: 179.00,
    originalPrice: 219.00,
    rating: 4.6,
    reviewsCount: 310,
    type: "Audio",
    category: "Mobiles & Audio",
    sub: "earbuds",
    tags: ["audio", "earbuds", "mobile-accessories", "gifting", "new-arrivals", "combos"],
    spf: 1,
    isBestseller: false,
    isNew: false,
    isOffer: true,
    image: "assets/images/earbuds.jpg",
    description: "Elevora Pods Pro deliver premium audio clarity with active noise-canceling technology. In-ear fit with three soft silicone tips ensures secure, comfortable wear. Sweat and water-resistant for workouts.",
    ingredients: "ANC depth: -35dB; Bluetooth: 5.2; Battery: 6 hrs (buds) + 24 hrs (case); Water rating: IPX4.",
    benefits: [
      "Smart Active Noise Cancellation blocks outside noise",
      "Sweat and splashproof (IPX4) for intensive workouts",
      "Compact case supports wireless and USB-C fast charging",
      "Touch controls manage music, calls, and voice assistant"
    ],
    howToUse: "Remove earbuds from case, pair via Bluetooth. Double tap earbud to play/pause or toggle ANC."
  },
  {
    id: "lip-shield",
    name: "Elevora Focus DSLR Camera",
    tagline: "Capture every detail, frame your memories.",
    price: 699.00,
    originalPrice: 799.00,
    rating: 4.8,
    reviewsCount: 520,
    type: "Cameras",
    category: "Laptops & Wearables",
    sub: "cameras",
    tags: ["cameras", "tech-gadgets", "gifting", "new-arrivals"],
    spf: 2,
    isBestseller: false,
    isNew: true,
    isOffer: true,
    image: "assets/images/camera.jpg",
    description: "Elevora Focus DSLR Camera lets you shoot high-resolution images and cinematic 1080p video. Comes with a versatile 18-55mm lens kit, intuitive touchscreen interface, and built-in Wi-Fi.",
    ingredients: "Sensor: 24.2 MP APS-C; Video: 1080p @ 60fps; Screen: 3.0\" Tilt LCD; Lens: 18-55mm IS Kit.",
    benefits: [
      "High-res APS-C sensor captures rich color and detail",
      "Fast autofocus system tracks moving subjects easily",
      "Vibrant tiltable LCD touchscreen simplifies low angles",
      "Built-in Wi-Fi and Bluetooth connects directly to phones"
    ],
    howToUse: "Insert SD card and battery, attach lens, switch dial to Auto or Manual, frame, and press shutter button."
  },
  {
    id: "car-mount-pro",
    name: "Elevora MagDrive Car Mount",
    tagline: "Hands-free navigation with MagSafe wireless fast charging.",
    price: 39.00,
    originalPrice: 55.00,
    rating: 4.9,
    reviewsCount: 410,
    type: "Accessories",
    category: "Mobiles & Audio",
    sub: "car-holders",
    tags: ["car-travel", "mobile-accessories", "under-50", "utility", "travel", "mounts"],
    spf: 1,
    isBestseller: true,
    isNew: true,
    isOffer: true,
    image: "assets/images/charger.jpg",
    description: "Elevora MagDrive clips securely onto any car air vent and holds your phone with military-grade N52 magnets. Built-in 15W Qi wireless fast charger keeps your smartphone topped up during long drives.",
    ingredients: "Magnet Type: N52 Neodymium; Charging Speed: 15W Max; Mount: Vent Clip & Suction Cup.",
    benefits: [
      "Ultra-strong magnetic hold resists turns and sudden brakes",
      "Fast 15W wireless charging built into mount pad",
      "360-degree rotation for optimal driving angles",
      "Universal support for MagSafe iPhones and Android cases"
    ],
    howToUse: "Clip mount to air vent, plug USB cable into car charger, snap phone into magnetic pad."
  },
  {
    id: "travel-organizer-bag",
    name: "Elevora Tech Voyager Travel Organizer",
    tagline: "Water-resistant padded case for cables, docks & power banks.",
    price: 29.00,
    originalPrice: 40.00,
    rating: 4.7,
    reviewsCount: 380,
    type: "Accessories",
    category: "Laptops & Wearables",
    sub: "travel",
    tags: ["travel", "car-travel", "utility", "under-50", "mobile-accessories", "gifting"],
    spf: 1,
    isBestseller: false,
    isNew: true,
    isOffer: true,
    image: "assets/images/keyboard.jpg",
    description: "Elevora Tech Voyager is a multi-compartment travel organizer case featuring water-repellent ballistic nylon, elastic cable loops, and cushioned pockets for chargers, hard drives, and earbuds.",
    ingredients: "Material: 900D Waterproof Nylon; Pockets: 12 Cable Straps, 3 Mesh Pockets, 1 Tablet Sleeve.",
    benefits: [
      "Keep all tech accessories neat, organized, and tangle-free",
      "Durable water-resistant exterior guards against spills and rain",
      "Slim profile fits easily into backpacks or carry-on luggage",
      "Cushioned interior prevents scratches on delicate electronics"
    ],
    howToUse: "Store chargers, power docks, cables, and earbuds into elastic straps and zipped pouches."
  }
];

// --- Dynamic Products Manager (LocalStorage Sync) ---
function getProducts() {
  const stored = localStorage.getItem('elevora_products');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      console.error('Error parsing stored elevora_products:', e);
    }
  }
  return products;
}

function saveProducts(productList) {
  localStorage.setItem('elevora_products', JSON.stringify(productList));
}

function addProduct(newProduct) {
  const current = getProducts();
  current.unshift(newProduct);
  saveProducts(current);
  return current;
}

function updateProduct(id, updatedData) {
  const current = getProducts();
  const index = current.findIndex(p => p.id === id);
  if (index !== -1) {
    current[index] = { ...current[index], ...updatedData };
    saveProducts(current);
  }
  return current;
}

function deleteProduct(id) {
  let current = getProducts();
  current = current.filter(p => p.id !== id);
  saveProducts(current);
  return current;
}

function resetProducts() {
  localStorage.removeItem('elevora_products');
  return products;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    products,
    getProducts,
    saveProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts
  };
}
