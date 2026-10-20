import { Category, Product, Review } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-smartphones',
    name: 'Smartphones',
    slug: 'smartphones',
    iconName: 'Smartphone',
    description: 'Latest 5G smartphones from Apple, Samsung, OnePlus, Xiaomi, Vivo and more with authentic brand warranty.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    itemCount: 42,
    featuredBrands: ['Apple', 'Samsung', 'OnePlus', 'Vivo', 'Xiaomi', 'Realme']
  },
  {
    id: 'cat-laptops',
    name: 'Laptops & Tablets',
    slug: 'laptops',
    iconName: 'Laptop',
    description: 'High-performance ultrabooks, MacBooks, business laptops, and tablets with zero-cost EMI plans.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    itemCount: 28,
    featuredBrands: ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS']
  },
  {
    id: 'cat-audio',
    name: 'Audio & Wearables',
    slug: 'audio',
    iconName: 'Headphones',
    description: 'Immersive noise-cancelling headphones, true wireless earbuds, Bluetooth party speakers, and smartwatches.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    itemCount: 35,
    featuredBrands: ['Sony', 'Apple', 'JBL', 'Marshall', 'Boat', 'Sennheiser']
  },
  {
    id: 'cat-smart-tvs',
    name: 'Smart TVs & Home',
    slug: 'smart-tvs',
    iconName: 'Tv',
    description: '4K OLED & Neo QLED smart televisions, cinematic soundbars, and home entertainment setups.',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    itemCount: 19,
    featuredBrands: ['Sony', 'Samsung', 'LG', 'OnePlus']
  },
  {
    id: 'cat-accessories',
    name: 'Mobile Accessories',
    slug: 'accessories',
    iconName: 'Cpu',
    description: 'GaN fast chargers, wireless charging pads, rugged armor cases, power banks, and tempered screen protectors.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    itemCount: 64,
    featuredBrands: ['Anker', 'Apple', 'Samsung', 'Belkin', 'Spigen']
  },
  {
    id: 'cat-telecom-tools',
    name: 'Telecom & Remote Controls',
    slug: 'telecom-tools',
    iconName: 'Radio',
    description: 'Optical fiber power meters, laser visual fault locators, universal AC & Smart TV remotes, and 5G routers.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    itemCount: 22,
    featuredBrands: ['TelecomPull Pro', 'Universal Tech', 'Comway', 'JioFiber', 'Airtel Enterprise']
  },
  {
    id: 'cat-refurbished',
    name: 'Certified Refurbished',
    slug: 'refurbished',
    iconName: 'Sparkles',
    description: 'Grade A+ quality-tested pre-owned smartphones and laptops with 12-month TelecomPull warranty.',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    itemCount: 18,
    featuredBrands: ['Apple', 'Samsung', 'OnePlus']
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'tp-phone-01',
    name: 'Apple iPhone 16 Pro (128GB)',
    slug: 'apple-iphone-16-pro',
    brand: 'Apple',
    category: 'smartphones',
    subcategory: 'Flagship Phones',
    price: 119900,
    originalPrice: 129900,
    discountPercent: 8,
    rating: 4.9,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    isDeal: true,
    warranty: '1 Year Apple Official Brand Warranty',
    description: 'The iPhone 16 Pro features a Grade 5 titanium design with a refined microblasted texture. Powered by the groundbreaking A18 Pro chip, it brings unprecedented efficiency and graphics performance for pro-grade mobile gaming and 4K 120 fps Dolby Vision recording.',
    keyFeatures: [
      'A18 Pro chip with 6-core GPU and hardware ray tracing',
      '48MP Fusion Camera with 5x Telephoto optical zoom',
      'Camera Control button for intuitive tactile photo capture',
      'Super Retina XDR OLED display with ProMotion 120Hz',
      'Up to 27 hours video playback with fast MagSafe charging'
    ],
    specs: {
      'Display': '6.3-inch Super Retina XDR OLED, 2622x1206 px, 120Hz',
      'Processor': 'Apple A18 Pro (3nm architecture)',
      'Rear Camera': '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto',
      'Front Camera': '12MP TrueDepth with Autofocus',
      'Battery': '3582 mAh, 25W MagSafe Wireless Charging',
      'OS': 'iOS 18 with Apple Intelligence',
      'Weight': '199 grams'
    },
    colors: [
      { name: 'Natural Titanium', hex: '#9d9990' },
      { name: 'Desert Titanium', hex: '#c5b59e' },
      { name: 'White Titanium', hex: '#edebe7' },
      { name: 'Black Titanium', hex: '#373738' }
    ],
    storageVariants: [
      { capacity: '128 GB', priceDiff: 0 },
      { capacity: '256 GB', priceDiff: 10000 },
      { capacity: '512 GB', priceDiff: 30000 },
      { capacity: '1 TB', priceDiff: 50000 }
    ],
    tags: ['iphone', 'apple', 'flagship', '5g', 'best-seller', 'pro-camera']
  },
  {
    id: 'tp-phone-02',
    name: 'Samsung Galaxy S25 Ultra 5G',
    slug: 'samsung-galaxy-s25-ultra',
    brand: 'Samsung',
    category: 'smartphones',
    subcategory: 'Flagship Phones',
    price: 129999,
    originalPrice: 139999,
    discountPercent: 7,
    rating: 4.8,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    isDeal: false,
    warranty: '1 Year Manufacturer Warranty + 6 Months Screen Protection',
    description: 'Samsung Galaxy S25 Ultra reimagines mobile intelligence with Galaxy AI 2.0, an integrated titanium chassis with rounded ergonomic corners, built-in S Pen, and the stunning 200MP quad-telephoto system.',
    keyFeatures: [
      'Snapdragon 8 Elite Mobile Platform for Galaxy',
      '200MP Quad-Camera array with 100x Space Zoom',
      'Built-in S-Pen with Air Actions and handwriting recognition',
      'Dynamic AMOLED 2X, 1-120Hz adaptive with Gorilla Armor',
      '5000 mAh battery with 45W Super Fast Charging 2.0'
    ],
    specs: {
      'Display': '6.8-inch Dynamic AMOLED 2X, 3120x1440 QHD+, 2600 nits',
      'Processor': 'Snapdragon 8 Elite (3nm, octa-core up to 4.47 GHz)',
      'Rear Camera': '200MP OIS + 50MP Periscope + 50MP Ultra Wide + 10MP Telephoto',
      'Front Camera': '12MP Dual Pixel AF',
      'Battery': '5000 mAh, 45W wired, 15W wireless',
      'OS': 'Android 15, One UI 7 (7 years OS updates)',
      'Weight': '219 grams'
    },
    colors: [
      { name: 'Titanium Silverblue', hex: '#778899' },
      { name: 'Titanium Gray', hex: '#5a5b5e' },
      { name: 'Titanium Black', hex: '#1c1d1f' }
    ],
    storageVariants: [
      { capacity: '256 GB / 12GB RAM', priceDiff: 0 },
      { capacity: '512 GB / 12GB RAM', priceDiff: 12000 },
      { capacity: '1 TB / 16GB RAM', priceDiff: 28000 }
    ],
    tags: ['samsung', 'galaxy', 's25-ultra', 'spen', '200mp', 'galaxy-ai']
  },
  {
    id: 'tp-phone-03',
    name: 'OnePlus 13 5G (Arctic Dawn)',
    slug: 'oneplus-13-5g',
    brand: 'OnePlus',
    category: 'smartphones',
    subcategory: 'Flagship Phones',
    price: 69999,
    originalPrice: 74999,
    discountPercent: 7,
    rating: 4.7,
    reviewCount: 175,
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 25,
    isFeatured: true,
    isDeal: true,
    warranty: '1 Year OnePlus India Warranty',
    description: 'Equipped with the Hasselblad Master Camera System and a massive 6000 mAh Silicon-Carbon glacier battery with 100W SUPERVOOC charging.',
    keyFeatures: [
      'Snapdragon 8 Elite chipset with Cryo-velocity vapor cooling',
      '6000 mAh Glacier battery with 100W SUPERVOOC charging',
      '50MP Hasselblad Triple Camera System with 3x periscope zoom',
      '2K Oriental Screen with 4500 nits peak brightness and Glove Touch',
      'IP68 & IP69 water and dust resistance rating'
    ],
    specs: {
      'Display': '6.82-inch 2K 120Hz Oriental Display, Dolby Vision',
      'Processor': 'Snapdragon 8 Elite (3nm)',
      'Rear Camera': '50MP Sony LYT-808 + 50MP Periscope + 50MP Ultra Wide',
      'Front Camera': '32MP Ultra-clear selfie camera',
      'Battery': '6000 mAh Silicon-Carbon, 100W SuperVOOC, 50W AIRVOOC',
      'OS': 'OxygenOS 15 based on Android 15',
      'Weight': '213 grams'
    },
    colors: [
      { name: 'Arctic Dawn', hex: '#e3eaf2' },
      { name: 'Midnight Ocean', hex: '#111827' },
      { name: 'Black Eclipse', hex: '#262626' }
    ],
    storageVariants: [
      { capacity: '256 GB / 12GB RAM', priceDiff: 0 },
      { capacity: '512 GB / 16GB RAM', priceDiff: 8000 }
    ],
    tags: ['oneplus', 'oneplus13', 'fast-charging', 'hasselblad']
  },
  {
    id: 'tp-phone-04',
    name: 'Vivo X200 Pro 5G ZEISS Edition',
    slug: 'vivo-x200-pro',
    brand: 'Vivo',
    category: 'smartphones',
    subcategory: 'Camera Phones',
    price: 94999,
    originalPrice: 99999,
    discountPercent: 5,
    rating: 4.9,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 9,
    isFeatured: false,
    isDeal: false,
    warranty: '1 Year Brand Warranty',
    description: 'The pinnacle of mobile portrait photography, co-engineered with ZEISS optics and featuring the industry-leading 200MP ZEISS APO Telephoto camera sensor.',
    keyFeatures: [
      '200MP ZEISS APO Telephoto sensor with T* lens coating',
      'Dimensity 9400 chipset with revolutionary NPU capabilities',
      '6000 mAh BlueOcean battery with 90W FlashCharge',
      '1.5K 8T LTPO Eye-care display with 4500 nits peak brightness'
    ],
    specs: {
      'Display': '6.78-inch Quad Curved AMOLED, 120Hz LTPO',
      'Processor': 'MediaTek Dimensity 9400 (3nm)',
      'Rear Camera': '50MP Sony LYT-818 + 200MP ZEISS Telephoto + 50MP Ultra Wide',
      'Front Camera': '32MP ZEISS Portrait',
      'Battery': '6000 mAh, 90W Wired + 30W Wireless',
      'OS': 'Funtouch OS 15 based on Android 15'
    },
    colors: [
      { name: 'Titanium Gray', hex: '#6b7280' },
      { name: 'Midnight Black', hex: '#0f172a' }
    ],
    tags: ['vivo', 'zeiss', 'camera-phone', 'telephoto']
  },
  {
    id: 'tp-laptop-01',
    name: 'Apple MacBook Air 15" M3 Chip',
    slug: 'apple-macbook-air-15-m3',
    brand: 'Apple',
    category: 'laptops',
    subcategory: 'Ultrabooks',
    price: 134900,
    originalPrice: 144900,
    discountPercent: 7,
    rating: 4.9,
    reviewCount: 210,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    isDeal: true,
    warranty: '1 Year Apple Official International Warranty',
    description: 'Strikingly thin and fast. The 15-inch MacBook Air with the M3 chip pairs expansive screen estate with whisper-quiet, fanless architecture and up to 18 hours of battery life.',
    keyFeatures: [
      'Apple M3 chip with 8-core CPU and 10-core GPU',
      'Liquid Retina display with 500 nits and True Tone technology',
      'Support for up to two external displays with laptop lid closed',
      'Six-speaker sound system with Spatial Audio and Force-cancelling woofers',
      'MagSafe 3 charging port and two Thunderbolt 4 ports'
    ],
    specs: {
      'Display': '15.3-inch Liquid Retina Display, 2880x1864 pixels',
      'Processor': 'Apple M3 8-core CPU, 10-core GPU, 16-core Neural Engine',
      'Memory': '16GB Unified Memory',
      'Storage': '512GB Fast NVMe SSD',
      'Battery': '66.5 watt-hour lithium-polymer, up to 18 hours',
      'Weight': '1.51 kg'
    },
    colors: [
      { name: 'Midnight', hex: '#1c2438' },
      { name: 'Starlight', hex: '#ede6d6' },
      { name: 'Space Gray', hex: '#595959' },
      { name: 'Silver', hex: '#e2e2e2' }
    ],
    storageVariants: [
      { capacity: '512GB SSD / 16GB RAM', priceDiff: 0 },
      { capacity: '1TB SSD / 24GB RAM', priceDiff: 38000 }
    ],
    tags: ['macbook', 'apple', 'm3', 'laptop', 'thin-light']
  },
  {
    id: 'tp-laptop-02',
    name: 'Dell XPS 14 OLED (Core Ultra 7)',
    slug: 'dell-xps-14-oled',
    brand: 'Dell',
    category: 'laptops',
    subcategory: 'Creator Laptops',
    price: 189990,
    originalPrice: 209990,
    discountPercent: 10,
    rating: 4.8,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    isDeal: false,
    warranty: '1 Year Dell Onsite ProSupport + Accidental Damage Protection',
    description: 'Precision-crafted from CNC machined aluminum with Gorilla Glass 3 palm rest and invisible haptic touch pad. Features a stunning 3.2K InfinityEdge OLED touch screen and dedicated NVIDIA GeForce RTX 4050 graphics.',
    keyFeatures: [
      'Intel Core Ultra 7 155H processor with Intel AI Boost NPU',
      'NVIDIA GeForce RTX 4050 6GB GDDR6 laptop GPU',
      '14.5-inch 3.2K OLED 120Hz Touch display, 100% DCI-P3',
      'Seamless glass touchpad with integrated haptic feedback'
    ],
    specs: {
      'Display': '14.5-inch 3.2K (3200x2000) OLED 120Hz Touch, 400 nits',
      'Processor': 'Intel Core Ultra 7 155H (16 Cores, up to 4.8 GHz)',
      'RAM': '32GB LPDDR5x 7467 MHz Dual Channel',
      'Storage': '1TB PCIe Gen 4 NVMe M.2 SSD',
      'Graphics': 'NVIDIA GeForce RTX 4050 6GB GDDR6',
      'Weight': '1.68 kg'
    },
    colors: [
      { name: 'Platinum', hex: '#d4d8dd' },
      { name: 'Graphite', hex: '#2b2d30' }
    ],
    tags: ['dell', 'xps', 'oled', 'creator', 'rtx4050']
  },
  {
    id: 'tp-audio-01',
    name: 'Apple AirPods Pro (2nd Gen) USB-C',
    slug: 'apple-airpods-pro-2-usb-c',
    brand: 'Apple',
    category: 'audio',
    subcategory: 'Wireless Earbuds',
    price: 21900,
    originalPrice: 24900,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 42,
    isFeatured: true,
    isDeal: true,
    warranty: '1 Year Apple Official Warranty',
    description: 'Up to 2x more Active Noise Cancellation than the previous generation, Adaptive Audio that tailors noise control to your environment, and Personalized Spatial Audio with dynamic head tracking.',
    keyFeatures: [
      'H2 Apple Silicon with computational audio processing',
      'Adaptive Audio with Conversation Awareness and Voice Isolation',
      'Precision Finding MagSafe Case with speaker and lanyard loop',
      'Lossless audio capability with Apple Vision Pro',
      'Up to 30 hours of listening time with charging case'
    ],
    specs: {
      'Driver': 'Custom high-excursion Apple driver & amplifier',
      'Connectivity': 'Bluetooth 5.3, H2 chip',
      'Battery Life': 'Up to 6 hours (ANC on), 30 hours with case',
      'Water Resistance': 'IP54 dust, sweat, and water resistant',
      'Port': 'USB-C + Qi / MagSafe wireless'
    },
    colors: [
      { name: 'White', hex: '#ffffff' }
    ],
    tags: ['apple', 'airpods', 'tws', 'noise-cancelling', 'best-seller']
  },
  {
    id: 'tp-audio-02',
    name: 'Sony WH-1000XM5 Wireless ANC Headphones',
    slug: 'sony-wh-1000xm5',
    brand: 'Sony',
    category: 'audio',
    subcategory: 'Over-Ear Headphones',
    price: 28990,
    originalPrice: 34990,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 388,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 19,
    isFeatured: true,
    isDeal: true,
    warranty: '1 Year Sony India Warranty',
    description: 'Industry-leading noise canceling with two processors and 8 microphones. Specially developed 30mm driver unit with carbon fiber composite material for unparalleled acoustics.',
    keyFeatures: [
      'Dual processors (Integrated Processor V1 + HD QN1)',
      '8 microphones engineered for supreme ambient noise elimination',
      'Auto NC Optimizer adjusts cancellation to wearing conditions and air pressure',
      'Speak-to-Chat automatically pauses playback when you start speaking',
      '30-hour battery life with 3-minute quick charge giving 3 hours playback'
    ],
    specs: {
      'Driver': '30mm precision-engineered Carbon Fiber composite',
      'Frequency Response': '4 Hz - 40,000 Hz (Hi-Res Audio Certified)',
      'Battery Life': '30 hours (ANC on) / 40 hours (ANC off)',
      'Bluetooth': 'v5.2 with LDAC, AAC, SBC and Multipoint connection',
      'Weight': '250 grams'
    },
    colors: [
      { name: 'Silver Platinum', hex: '#d9d7ce' },
      { name: 'Midnight Blue', hex: '#1e293b' },
      { name: 'Black', hex: '#171717' }
    ],
    tags: ['sony', 'headphones', 'anc', 'audiophile', 'hi-res']
  },
  {
    id: 'tp-tv-01',
    name: 'Sony Bravia XR 65" 4K OLED Smart Google TV (A80L)',
    slug: 'sony-bravia-xr-65-oled',
    brand: 'Sony',
    category: 'smart-tvs',
    subcategory: 'OLED Smart TVs',
    price: 184990,
    originalPrice: 249900,
    discountPercent: 26,
    rating: 4.8,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 5,
    isFeatured: true,
    isDeal: true,
    warranty: '2 Years Comprehensive Sony Warranty + Free Installation',
    description: 'Cognitive Processor XR delivers deep, natural contrast and vivid pure black OLED picture. Acoustic Surface Audio+ turns the entire screen into a multi-channel speaker.',
    keyFeatures: [
      'Cognitive Processor XR with XR Triluminos Pro',
      'Pure Black OLED panel with infinite contrast ratio',
      'Acoustic Surface Audio+ with integrated subwoofers',
      'HDMI 2.1 4K 120Hz, VRR and ALLM for PlayStation 5 gaming',
      'Google TV with hands-free voice search and Apple AirPlay'
    ],
    specs: {
      'Screen Size': '65 Inch (164 cm) 4K OLED',
      'Resolution': '3840 x 2160 pixels, 120Hz Refresh Rate',
      'Audio Output': '50W Acoustic Surface Audio+, Dolby Atmos',
      'Ports': '4x HDMI (2x HDMI 2.1), 2x USB, Optical Digital Audio, LAN',
      'Smart OS': 'Google TV with 32GB on-board storage'
    },
    colors: [
      { name: 'Titanium Black Bezel', hex: '#111827' }
    ],
    tags: ['sony', 'bravia', 'oled', '4k', 'smart-tv', 'google-tv']
  },
  {
    id: 'tp-tool-01',
    name: 'TelecomPull Pro Optical Fiber Power Meter & VFL Kit',
    slug: 'telecompull-pro-optical-fiber-power-meter-vfl',
    brand: 'TelecomPull Pro',
    category: 'telecom-tools',
    subcategory: 'Optical & Network Tools',
    price: 2499,
    originalPrice: 3999,
    discountPercent: 37,
    rating: 4.9,
    reviewCount: 164,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 65,
    isFeatured: true,
    isDeal: true,
    warranty: '1 Year TelecomPull Replacement Warranty',
    description: 'Specialized optical fiber testing instrument designed for telecom field technicians, FTTH installers, and network engineers. Features a high-accuracy optical power meter paired with a 10mW red laser visual fault locator for detecting breaks and micro-bends.',
    keyFeatures: [
      'Dual-function: -70 to +10 dBm Optical Power Meter + 10km Visual Fault Locator',
      'Tests 6 standard wavelengths: 850nm, 1300nm, 1310nm, 1490nm, 1550nm, 1625nm',
      'Universal 2.5mm FC/SC/ST connector interface adapter included',
      'Backlit LCD display with auto-shutdown and LED emergency flashlight',
      'Shockproof ruggedized silicone sleeve protects against drops and harsh site work'
    ],
    specs: {
      'Wavelength Range': '800nm to 1700nm',
      'Measurement Range': '-70 dBm to +10 dBm (InGaAs Detector)',
      'VFL Laser Output': '10 mW (Effective distance up to 10-12 km)',
      'Connectors': '2.5mm Universal (FC / SC / ST / LC with adapter)',
      'Battery': 'Rechargeable Li-ion via USB-C or 2x AA alkaline'
    },
    colors: [
      { name: 'Industrial Blue / Black', hex: '#0284c7' }
    ],
    tags: ['telecom-tool', 'optical-fiber', 'ftth', 'vfl', 'power-meter', 'technician']
  },
  {
    id: 'tp-tool-02',
    name: 'Universal Smart AC & TV Remote Controller (All Brands)',
    slug: 'universal-smart-ac-tv-remote',
    brand: 'TelecomPull Pro',
    category: 'telecom-tools',
    subcategory: 'Remote Controls',
    price: 499,
    originalPrice: 999,
    discountPercent: 50,
    rating: 4.8,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 150,
    isFeatured: true,
    isDeal: true,
    warranty: '6 Months Replacement Warranty',
    description: 'Vipul Telecom / TelecomPull legacy bestseller! Compatible with over 10,000 models of Split and Window Air Conditioners (Voltas, Daikin, LG, Samsung, Hitachi, Carrier, Blue Star, Panasonic) plus Smart TV IR codes. Features one-touch auto-search pairing.',
    keyFeatures: [
      'Pre-programmed for 100+ global brands of Air Conditioners and TVs',
      'High-contrast digital backlit LCD showing temperature and fan speed modes',
      'Built-in clock and on/off timing schedule features',
      'Durable ABS buttons with anti-fade laser printed markings',
      'Memory retention function preserves code even when batteries are replaced'
    ],
    specs: {
      'Operable Distance': 'More than 8 to 10 meters line of sight',
      'Power Source': '2x AAA 1.5V batteries (not included)',
      'Material': 'Impact-resistant ABS plastic',
      'Compatibility': 'Daikin, Voltas, LG, Samsung, Hitachi, Carrier, Lloyd, Panasonic, etc.'
    },
    colors: [
      { name: 'Classic White', hex: '#f8fafc' }
    ],
    tags: ['remote-control', 'ac-remote', 'universal-remote', 'bestseller']
  },
  {
    id: 'tp-acc-01',
    name: 'TelecomPull 100W GaN Super Fast Charger (3 Ports)',
    slug: 'telecompull-100w-gan-fast-charger',
    brand: 'TelecomPull Pro',
    category: 'accessories',
    subcategory: 'Chargers & Adapters',
    price: 2499,
    originalPrice: 4499,
    discountPercent: 44,
    rating: 4.9,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 88,
    isFeatured: true,
    isDeal: true,
    warranty: '18 Months Replacement Warranty',
    description: 'Next-gen Gallium Nitride (GaN III) technology delivers ultra-compact 100W Power Delivery. Rapidly charge your MacBook Pro, iPhone, and Android device simultaneously from a single plug.',
    keyFeatures: [
      '100W total output with intelligent power allocation across 2x USB-C + 1x USB-A',
      'Charges a 16" MacBook Pro from 0 to 50% in just 30 minutes',
      'Supports PD 3.0, PPS, QC 4+, Samsung 45W Super Fast Charging 2.0',
      '40% smaller than standard 96W OEM chargers with foldable pins',
      'ActiveShield 2.0 temperature monitoring runs 3,000,000 safety checks daily'
    ],
    specs: {
      'Max Output': '100W Max PD',
      'Input': '100-240V ~ 50/60Hz 2.1A (Universal Travel Compatible)',
      'Outputs': 'USB-C1: 100W, USB-C2: 100W, USB-A: 22.5W',
      'Protections': 'Over-voltage, over-current, short-circuit, over-temp'
    },
    colors: [
      { name: 'Matte Black', hex: '#18181b' },
      { name: 'Glacier White', hex: '#ffffff' }
    ],
    tags: ['charger', 'gan', '100w', 'macbook-charger', 'fast-charging']
  },
  {
    id: 'tp-ref-01',
    name: 'Apple iPhone 14 128GB - Certified Refurbished (Grade A+)',
    slug: 'apple-iphone-14-refurbished-grade-a',
    brand: 'Apple',
    category: 'refurbished',
    subcategory: 'Refurbished iPhones',
    price: 39999,
    originalPrice: 69900,
    discountPercent: 43,
    rating: 4.8,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 11,
    isFeatured: true,
    isDeal: true,
    isRefurbished: true,
    refurbishedGrade: 'Grade A+ Pristine (Like New)',
    warranty: '12 Months TelecomPull Hardware & Battery Warranty',
    description: 'Thoroughly tested via our 52-point hardware and software diagnostic certification. Zero scratches on screen, 90%+ battery health guaranteed, and packaged with brand new fast cable.',
    keyFeatures: [
      '52-Point Diagnostic certified by TelecomPull engineers',
      '100% genuine Apple components with 90%+ battery health guaranteed',
      '12 Months comprehensive warranty & 7-day hassle-free replacement',
      'A15 Bionic chip with 5-core GPU and Photonic Engine cameras',
      'Emergency SOS via satellite and Crash Detection'
    ],
    specs: {
      'Condition': 'Grade A+ (Flawless cosmetic condition, zero dents or scratches)',
      'Battery Health': '90% - 100% Original Apple Battery Capacity',
      'Accessories': 'Comes with MFi-certified braided USB-C to Lightning cable and SIM tool',
      'Warranty': '1 Year TelecomPull Certified Shield'
    },
    colors: [
      { name: 'Midnight Blue', hex: '#1e293b' },
      { name: 'Starlight', hex: '#f8fafc' },
      { name: 'Purple', hex: '#d8b4fe' }
    ],
    storageVariants: [
      { capacity: '128 GB', priceDiff: 0 },
      { capacity: '256 GB', priceDiff: 5000 }
    ],
    tags: ['refurbished', 'iphone14', 'grade-a', 'budget-flagship', 'pre-owned']
  },
  {
    id: 'tp-ref-02',
    name: 'Samsung Galaxy S23 5G 128GB - Certified Refurbished',
    slug: 'samsung-galaxy-s23-refurbished',
    brand: 'Samsung',
    category: 'refurbished',
    subcategory: 'Refurbished Android',
    price: 36999,
    originalPrice: 74999,
    discountPercent: 51,
    rating: 4.7,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 8,
    isFeatured: false,
    isDeal: true,
    isRefurbished: true,
    refurbishedGrade: 'Grade A+ Pristine (Like New)',
    warranty: '12 Months TelecomPull Hardware Warranty',
    description: 'Compact flagship powerhouse with Snapdragon 8 Gen 2 for Galaxy. Professionally sanitized, inspected, and backed by a full 1-year TelecomPull warranty.',
    keyFeatures: [
      'Compact 6.1" Dynamic AMOLED 2X 120Hz display',
      'Snapdragon 8 Gen 2 Mobile Platform for Galaxy',
      '50MP Nightography primary camera system with 3x optical zoom',
      '12 Months TelecomPull warranty with zero-touch delivery'
    ],
    specs: {
      'Condition': 'Grade A+ (Like new with spotless glass and frame)',
      'Processor': 'Snapdragon 8 Gen 2 for Galaxy (4nm)',
      'RAM / Storage': '8GB RAM + 128GB UFS 4.0 Storage',
      'Battery Health': 'Guaranteed >92% OEM battery capacity'
    },
    colors: [
      { name: 'Phantom Black', hex: '#18181b' },
      { name: 'Cream', hex: '#fef3c7' },
      { name: 'Green', hex: '#374151' }
    ],
    tags: ['samsung', 's23', 'refurbished', 'compact-flagship']
  },
  {
    id: 'tp-acc-02',
    name: '3-in-1 Foldable MagSafe Wireless Charging Station',
    slug: '3-in-1-magsafe-wireless-charging-station',
    brand: 'TelecomPull Pro',
    category: 'accessories',
    subcategory: 'Wireless Chargers',
    price: 1999,
    originalPrice: 3499,
    discountPercent: 43,
    rating: 4.8,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 52,
    isFeatured: false,
    isDeal: false,
    warranty: '1 Year Warranty',
    description: 'Charge your iPhone, Apple Watch, and AirPods simultaneously with strong magnetic alignment and portable foldable travel design.',
    keyFeatures: [
      'Simultaneous 15W MagSafe Phone + 5W Watch + 5W Earbuds charging',
      'Foldable 180° hinge easily fits into any pocket or travel backpack',
      'Anti-slip silicone pad with intelligent heat dissipation vents',
      'Compatible with iPhone 12 through 16 series and Qi wireless devices'
    ],
    specs: {
      'Input': '9V/2A, 12V/2A via USB Type-C',
      'Outputs': '15W / 10W / 7.5W / 5W',
      'Material': 'Aviation Aluminum + Soft Silicone Leather'
    },
    colors: [
      { name: 'Space Gray', hex: '#334155' },
      { name: 'Alpine White', hex: '#f8fafc' }
    ],
    tags: ['magsafe', 'wireless-charger', 'apple-accessories', 'desk-setup']
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Rajesh Verma',
    role: 'IT Consultant, New Delhi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '14 Oct 2026',
    comment: 'Ordered an iPhone 16 Pro and 100W GaN charger from TelecomPull. Arrived in Delhi within 20 hours in tamper-evident packaging. Real brand invoice and serial number activated seamlessly on Apple Support. Best price in India!',
    verified: true
  },
  {
    id: 't-2',
    name: 'Sneha Patel',
    role: 'Architect, Ahmedabad',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '02 Oct 2026',
    comment: 'The No-Cost EMI option with HDFC was completely zero-interest with zero hidden processing charges for my MacBook Air 15. Customer service answered my WhatsApp question in 2 minutes.',
    verified: true
  },
  {
    id: 't-3',
    name: 'Anil Kulkarni',
    role: 'Network Telecom Contractor, Mumbai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '28 Sep 2026',
    comment: 'As a telecom technician working on fiber optic rollouts, finding quality optical power meters and remotes was hard until I found TelecomPull. Bought 5 units for our site team; rugged, accurate, and durable!',
    verified: true
  }
];

export const FAQS = [
  {
    question: 'Are all products sold on TelecomPull 100% genuine and brand authorized?',
    answer: 'Yes, absolutely. TelecomPull (formerly Vipul Telecom, established in 2014) is an authorized retail and online electronics dealer and JioMart Digital partner. Every product comes in original factory sealed packaging with a valid manufacturer GST tax invoice and official brand warranty valid across all authorized service centers nationwide.',
    category: 'Authenticity & Warranty'
  },
  {
    question: 'How does No-Cost EMI work on TelecomPull?',
    answer: 'We partner with major banks including HDFC, ICICI, SBI, Axis, Kotak, and Bajaj Finserv. On eligible items, the interest amount charged by the bank is instantly provided as an upfront instant discount on checkout, making the effective interest rate 0%.',
    category: 'Payments & EMI'
  },
  {
    question: 'What is your shipping timeline and delivery coverage?',
    answer: 'We provide pan-India delivery across 19,000+ pincodes. Metro cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad) receive express delivery within 24 to 48 hours. Orders above ₹999 qualify for Free Express Shipping.',
    category: 'Shipping & Delivery'
  },
  {
    question: 'What is the warranty and return policy on Certified Refurbished phones?',
    answer: 'Every Certified Refurbished device undergoes a strict 52-point inspection by TelecomPull engineers. They come with a 12-Month TelecomPull Warranty covering hardware faults, guaranteed 90%+ battery health, and a 7-day hassle-free replacement window.',
    category: 'Refurbished & Pre-Owned'
  },
  {
    question: 'Do you supply bulk telecom tools, optical meters, and AC remotes for businesses?',
    answer: 'Yes! We specialize in wholesale B2B telecom equipment, fiber optical power meters, visual fault locators, universal remote controls, and bulk corporate gadget gifting. Visit our Services / Wholesale page or contact us directly for GST volume pricing.',
    category: 'Telecom & Wholesale'
  }
];

export const BLOG_POSTS = [
  {
    id: 'blog-1',
    title: 'Top 5 Flagship Smartphones of 2026 Compared: Camera, Battery & Value',
    slug: 'top-flagship-smartphones-2026',
    excerpt: 'We benchmarked the iPhone 16 Pro, Galaxy S25 Ultra, and OnePlus 13 across real-world Indian conditions, 5G signal reception, and battery endurance.',
    author: 'Aman Sharma',
    date: '18 Oct 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    category: 'Buying Guides'
  },
  {
    id: 'blog-2',
    title: 'How Optical Power Meters & VFLs Work in Modern FTTH Networks',
    slug: 'optical-power-meter-telecom-guide',
    excerpt: 'An essential field technician guide on measuring dBm loss, inspecting fiber end-faces, and finding micro-bends with visual red laser fault locators.',
    author: 'Vipul Telecom Team',
    date: '10 Oct 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    category: 'Telecom Tech'
  },
  {
    id: 'blog-3',
    title: 'Smart Buying: Brand New vs Certified Refurbished Electronics',
    slug: 'refurbished-electronics-buying-guide',
    excerpt: 'Learn how buying certified Grade A+ pre-owned tech can save you up to 50% while getting complete 1-year warranty peace of mind.',
    author: 'TelecomPull Editorial',
    date: '28 Sep 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    category: 'Tech Savings'
  }
];

export const STORE_LOCATIONS = [
  {
    id: 'store-delhi',
    name: 'TelecomPull Flagship Experience Store',
    address: 'Shop No. 14-16, Electronics Market Complex, Karol Bagh / Gaffar Market Area',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110005',
    phone: '+91 98712 34567 / 011-28754120',
    email: 'delhi@telecompull.com',
    hours: 'Mon - Sun: 10:30 AM - 8:30 PM',
    isFlagship: true
  },
  {
    id: 'store-mumbai',
    name: 'TelecomPull West Hub & Service Point',
    address: 'Unit 4, Lamington Road Tech Arcade, Grant Road East',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400007',
    phone: '+91 98201 98765',
    email: 'mumbai@telecompull.com',
    hours: 'Mon - Sat: 11:00 AM - 8:00 PM',
    isFlagship: false
  },
  {
    id: 'store-gujarat',
    name: 'TelecomPull Regional Distribution Hub',
    address: 'Opposite Central Bus Station, Himatnagar / Sabarkantha Hub',
    city: 'Sabarkantha',
    state: 'Gujarat',
    pincode: '383001',
    phone: '+91 94270 54321',
    email: 'gujarat@telecompull.com',
    hours: 'Mon - Sat: 10:00 AM - 7:30 PM',
    isFlagship: false
  }
];
