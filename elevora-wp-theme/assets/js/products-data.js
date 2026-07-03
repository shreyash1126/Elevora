// Elevora Premium Electronics Dropshipping Store - Mock Product Database
const ElevoraProducts = [
  {
    id: 1,
    name: "AeroPulse ANC Wireless Headphones",
    category: "Bluetooth Speakers",
    brand: "AeroPulse",
    price: 199.99,
    oldPrice: 299.99,
    rating: 4.8,
    reviewsCount: 142,
    badge: "Sale",
    badgeType: "sale",
    description: "Experience silence perfected. The AeroPulse ANC headphones deliver high-fidelity acoustic performance, class-leading hybrid Active Noise Cancellation, and up to 45 hours of immersive playtime.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80"
    ],
    colors: ["Matte Black", "Space Gray", "Arctic Silver"],
    variants: [
      { color: "Matte Black", stock: 15 },
      { color: "Space Gray", stock: 8 },
      { color: "Arctic Silver", stock: 12 }
    ],
    specs: {
      "Driver Size": "40mm Dynamic Driver",
      "Frequency Response": "20Hz - 20kHz",
      "Bluetooth Version": "Bluetooth 5.2 (aptX Adaptive)",
      "Battery Life": "Up to 45 Hours (ANC Off) / 32 Hours (ANC On)",
      "Charging Port": "USB-C Fast Charging (10-min charge = 5 hours play)"
    },
    features: [
      "Hybrid Active Noise Cancellation with Transparency Mode",
      "Premium memory-foam ear cushions wrapped in protein leather",
      "Quad-microphone beamforming array for crystal-clear calls",
      "Multipoint connection: Seamlessly switch between laptop and phone"
    ]
  },
  {
    id: 2,
    name: "Apex Chrono OLED Smart Watch",
    category: "Mobile Accessories",
    brand: "ApexTrack",
    price: 249.99,
    oldPrice: 329.99,
    rating: 4.7,
    reviewsCount: 98,
    badge: "New",
    badgeType: "new",
    description: "Elevate your health, fitness, and connectivity. Encased in aerospace-grade titanium with an ultra-bright Always-On AMOLED screen, the Apex Chrono monitors biometrics, sleep cycles, and daily performance metrics.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=600&auto=format&fit=crop&q=80"
    ],
    colors: ["Titanium Black", "Mist Gray", "Sunset Gold"],
    variants: [
      { color: "Titanium Black", stock: 20 },
      { color: "Mist Gray", stock: 14 },
      { color: "Sunset Gold", stock: 5 }
    ],
    specs: {
      "Display": "1.43\" Always-On AMOLED, 466x466 pixels, 1000 nits",
      "Water Resistance": "5ATM (Up to 50 meters depth)",
      "Sensors": "Heart Rate, SpO2, Accelerometer, Gyroscope, Barometer",
      "Battery Life": "Up to 10 days normal usage / 4 days intensive",
      "GPS": "Dual-Band Multi-system GPS built-in"
    },
    features: [
      "Continuous Blood Oxygen (SpO2) and Heart Rate Monitoring",
      "120+ specialized tracking modes from running to swimming",
      "Offline music storage and Bluetooth calling directly from the wrist",
      "Over 150+ customizable premium designer watch faces"
    ]
  },
  {
    id: 3,
    name: "VoltMag 15W MagSafe Power Bank",
    category: "Power Banks",
    brand: "VoltMax",
    price: 49.99,
    oldPrice: 79.99,
    rating: 4.6,
    reviewsCount: 312,
    badge: "Hot",
    badgeType: "hot",
    description: "Snap and go. The VoltMag provides a secure magnetic connection for 15W wireless charging, paired with a sleek folding kickstand and a premium rubberized anti-scratch shell.",
    images: [
      "https://images.unsplash.com/photo-1609592424085-f55a64388432?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80"
    ],
    colors: ["Carbon Fiber", "Phantom Blue", "Pure White"],
    variants: [
      { color: "Carbon Fiber", stock: 50 },
      { color: "Phantom Blue", stock: 35 },
      { color: "Pure White", stock: 40 }
    ],
    specs: {
      "Capacity": "10,000mAh Lithium-Polymer",
      "Wireless Output": "5W / 7.5W / 10W / 15W MagSafe Compatible",
      "Wired Input/Output": "USB-C PD 20W Max Input/Output",
      "Dimensions": "104 x 68 x 15 mm",
      "Weight": "185g"
    },
    features: [
      "Strong N52 neodymium magnets align perfectly with iPhone 12/13/14/15",
      "LED digital display tracks remaining battery life down to 1%",
      "Smart circuitry protects against over-voltage, short-circuits, and high heat",
      "Built-in aluminum alloy kickstand for horizontal or vertical viewing"
    ]
  },
  {
    id: 4,
    name: "EchoSphere 360 Portable Speaker",
    category: "Bluetooth Speakers",
    brand: "AeroPulse",
    price: 89.99,
    oldPrice: 129.99,
    rating: 4.9,
    reviewsCount: 220,
    badge: "Best Seller",
    badgeType: "best",
    description: "Rich, room-filling audio in a ruggedly elegant design. Sporting dual passive radiators and custom acoustic drivers, the EchoSphere delivers true 360-degree sound with deep bass and high vocal clarity.",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=600&auto=format&fit=crop&q=80"
    ],
    colors: ["Teal Green", "Navy Indigo", "Stone Gray"],
    variants: [
      { color: "Teal Green", stock: 18 },
      { color: "Navy Indigo", stock: 22 },
      { color: "Stone Gray", stock: 30 }
    ],
    specs: {
      "Audio Output": "30W Stereo Peak (2x 15W drivers)",
      "Waterproofing": "IPX7 Certified Waterproof & Dustproof",
      "Playtime": "Up to 24 Hours on a single charge",
      "Charge Time": "3 Hours via USB-C Quick Charge",
      "Connectivity": "Bluetooth 5.0, AUX 3.5mm, TWS Dual Speaker pairing"
    },
    features: [
      "Acoustic 360 sound projection reaches every corner of the room",
      "IPX7 waterproof rating ensures it can survive drops in water, sand, or rain",
      "Built-in microphone for hands-free speakerphone calling",
      "Dynamic multi-color RGB ambient LED ring synchronized to the music"
    ]
  },
  {
    id: 5,
    name: "SoundPod Studio Pro Earbuds",
    category: "Mobile Accessories",
    brand: "AeroPulse",
    price: 129.99,
    oldPrice: 189.99,
    rating: 4.7,
    reviewsCount: 184,
    badge: "20% OFF",
    badgeType: "sale",
    description: "Redefine sound on the go. Powered by dual-armature drivers, these ultra-compact wireless earbuds provide studio-grade sound quality, customizable equalizer presets, and ergonomic active-fit tips.",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=600&auto=format&fit=crop&q=80"
    ],
    colors: ["Chalk White", "Slate Grey", "Midnight Navy"],
    variants: [
      { color: "Chalk White", stock: 25 },
      { color: "Slate Grey", stock: 30 },
      { color: "Midnight Navy", stock: 15 }
    ],
    specs: {
      "Frequency Response": "10Hz - 40kHz (Hi-Res Audio Wireless)",
      "Codecs Supported": "LDAC, AAC, SBC",
      "IP Rating": "IPX4 Sweat & Water Resistant",
      "Total Playtime": "40 Hours total (8 hrs earbuds + 32 hrs case)",
      "Sensors": "In-ear detection, Touch controls"
    },
    features: [
      "Hi-Res Wireless audio certified with LDAC streaming codec support",
      "Active-Fit liquid silicone eartips in 3 sizes for perfect isolation",
      "Adaptive ANC dynamically adjusts noise cancellation based on environment",
      "Qi wireless charging compatible case with charging status indicator"
    ]
  },
  {
    id: 6,
    name: "KeyPro mechanical gaming keyboard",
    category: "Computer Accessories",
    brand: "KeyPro",
    price: 139.99,
    oldPrice: 199.99,
    rating: 4.8,
    reviewsCount: 76,
    badge: "New",
    badgeType: "new",
    description: "Compact form factor, maximum impact. Built with lubed linear red switches, hot-swappable sockets, and double-shot PBT keycaps, the KeyPro delivers lightning-fast inputs and satisfying typing acoustics.",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&auto=format&fit=crop&q=80"
    ],
    colors: ["Classic White", "Midnight Grey"],
    variants: [
      { color: "Classic White", stock: 10 },
      { color: "Midnight Grey", stock: 18 }
    ],
    specs: {
      "Form Factor": "75% Compact Layout (84 Keys)",
      "Switch Type": "Gateron G-Pro Red Linear (Hot-Swappable)",
      "Connectivity": "Tri-Mode (Bluetooth 5.1 / 2.4GHz Dongle / Wired USB-C)",
      "Backlight": "South-Facing RGB with 18 animations",
      "Battery Capacity": "4000mAh rechargeable lithium"
    },
    features: [
      "Hot-swappable 3/5 pin sockets make modding and changing switches simple",
      "Dual-layer acoustic dampening foam absorbs typing echo and ping",
      "Double-shot PBT keycaps with anti-oil texture and shine-through legend",
      "Tri-mode connectivity pairs up to 3 devices simultaneously"
    ]
  },
  {
    id: 7,
    name: "LuminoSmart Aura Accent Bar",
    category: "RGB Mood Lighting",
    brand: "Lumino",
    price: 69.99,
    oldPrice: 99.99,
    rating: 4.5,
    reviewsCount: 115,
    badge: "Sale",
    badgeType: "sale",
    description: "Transform your living space. Syncing seamlessly with games, movies, and music, the LuminoSmart Aura bathes your desk or media center in stunning, smart multi-color reactive lighting.",
    images: [
      "https://images.unsplash.com/photo-1507646227500-4d389b0012be?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80"
    ],
    colors: ["Classic Black", "Arctic White"],
    variants: [
      { color: "Classic Black", stock: 24 },
      { color: "Arctic White", stock: 16 }
    ],
    specs: {
      "Light Source": "RGBIC Dynamic Addressable LEDs",
      "Power Rating": "15W Max (5V 3A)",
      "Control Method": "App Control, Voice Assistant (Alexa/Google), Physical Buttons",
      "Wireless Range": "Wi-Fi 2.4GHz + Bluetooth 4.2",
      "Length": "45cm per Lightbar"
    },
    features: [
      "RGBIC technology displays multiple vibrant colors on one light bar concurrently",
      "High-sensitivity internal microphone matches light rhythms to audio",
      "Voice controlled via Amazon Alexa or Google Home integration",
      "Sleek stand mounts horizontally or vertically behind monitors/TVs"
    ]
  },
  {
    id: 8,
    name: "GaNCharge 100W multi-port block",
    category: "Wireless Chargers",
    brand: "VoltMax",
    price: 59.99,
    oldPrice: 89.99,
    rating: 4.7,
    reviewsCount: 204,
    badge: "15% OFF",
    badgeType: "sale",
    description: "One charger to power them all. The GaNCharge 100W replaces bulky bricks, utilizing cutting-edge Gallium Nitride tech to fast charge up to four devices simultaneously including laptops, tablets, and phones.",
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80"
    ],
    colors: ["Space Black", "Polar White"],
    variants: [
      { color: "Space Black", stock: 40 },
      { color: "Polar White", stock: 35 }
    ],
    specs: {
      "Total Wattage": "100W Max Shared Output",
      "Ports Layout": "3x USB-C (PD 3.0) + 1x USB-A (QC 4.0/3.0)",
      "Single Port Output": "USB-C1/C2 up to 100W (Max)",
      "Technology": "Gallium Nitride (GaN II) Technology",
      "Dimensions": "65 x 65 x 32 mm"
    },
    features: [
      "GaN II tech offers smaller sizes and better thermal dissipation efficiency",
      "Intelligent power allocation distributes wattage optimally between devices",
      "Folding wall prongs prevent scratching items when stored in travel bags",
      "Built-in protection shields against overcurrent, overcharge, and overheating"
    ]
  },
  {
    id: 9,
    name: "FlexiPlug: 2Pcs - 3-in-1 Foldable Multiplug Adapter with 180Â° Rotation",
    category: "Home > Best Sellers",
    brand: "VoltMax",
    price: 14.99,
    oldPrice: 24.99,
    rating: 4.6,
    reviewsCount: 22,
    badge: "Best Seller",
    badgeType: "best",
    description: "Charge smarter with less clutter and more flexibility. FlexiPlug is designed to solve one of the most common everyday problemsâ€”limited charging points. This compact foldable plug adapter turns a single wall socket into a 3-in-1 power solution, letting you charge multiple devices at once without messy extensions.",
    images: [
      "https://www.geeklane.in/cdn/shop/files/51an0YcDFzL._SL1280.jpg",
      "https://www.geeklane.in/cdn/shop/files/51an0YcDFzL._SL1280.jpg",
      "https://www.geeklane.in/cdn/shop/files/51an0YcDFzL._SL1280.jpg"
    ],
    colors: ["Classic White", "Midnight Black", "Sky Blue"],
    variants: [
      { color: "Classic White", stock: 25 },
      { color: "Midnight Black", stock: 25 },
      { color: "Sky Blue", stock: 25 }
    ],
    specs: {
      "Power Expansion": "3-in-1 Output",
      "Rotation": "180Â° Rotating Head",
      "Design": "Slim, Foldable Plug",
      "Material": "Durable & Fire-Resistant",
      "Portability": "Travel-Friendly Lightweight"
    },
    features: [
      "3-in-1 Power Expansion - Converts one socket into three to charge multiple devices",
      "180Â° Rotating Head - Adjusts easily to fit tight spaces and behind furniture",
      "Foldable Plug Design - Compact, easy to carry while traveling",
      "Clutter-Free Charging - Eliminates the need for bulky extension boards",
      "Durable & Fire-Resistant Build - Made with high-quality materials for safety"
    ]
  }
];

// Helper to fetch product by ID
function getProductById(id) {
  return ElevoraProducts.find(p => p.id === parseInt(id));
}
