export type Project = {
  id: string;
  title: string;
  spec: string;
  rating: string;
  yr: string;
  tech: string;
  desc: string;
  img?: string;
  href: string;
  mhz?: number;
  icon: string;
};

const cloud = "https://res.cloudinary.com/dye5qpwii/image/upload";

export const SW = {
  name: "Moe Kyaw Aung",
  handle: "MKA_2026",
  role: "Senior Android Developer",
  tag: "REALITY.SHIFTER",
  location: "TACHILEIK ▸ BANGKOK",
  roles: ["Senior Android Developer", "Kotlin · Compose Master", "Clean Architecture Overlord", "On-Device AI Engineer", "Full-Stack Polymath"],
  building: "MoekyawTranslator — an AI translation arcade cabinet",
  certs: "82+ CARTRIDGES · 9 DOMAINS",
  philosophy: "Code with chrome. Shipped with glow.",
  stats: [
    { label: "CART.EXT", value: 82, suffix: "+", unit: "CERTS" },
    { label: "HI-SCORE", value: 16, suffix: "", unit: "APPS" },
    { label: "BASES.LNK", value: 40, suffix: "+", unit: "WORLDS" },
    { label: "PWR.LVL", value: 3, suffix: "+", unit: "YRS" },
  ],
  email: "moekyawaung2026@gmail.com",
  phone: "+95 9 889 000 889",
  github: "https://github.com/Dev-moe-kyawaung/",
  portrait: `${cloud}/v1778763535/MKA_25_lbx6fb.webp`,
  portrait2: `${cloud}/v1778763531/MKA_12_iv8kpm.webp`,
  portrait3: `${cloud}/v1778763531/MKA_3_zqrhhr.webp`,
  preview: `${cloud}/v1778795825/preview_dzhqvv.webp`,
  holo1: `${cloud}/v1778795856/copilot_image_1778795675037_heh9xk.png`,
  holo2: `${cloud}/v1778795856/copilot_image_1778794626112_ega7kk.png`,
  holo3: `${cloud}/v1778795859/copilot_image_1778794430377_n7xlmz.png`,
  fireworks: `${cloud}/v1779052645/2153-fireworks-composer_gm3e0h.jpg`,
  socials: [
    { name: "GITHUB", icon: "fa-brands fa-github", href: "https://github.com/Dev-moe-kyawaung/" },
    { name: "LINKEDIN", icon: "fa-brands fa-linkedin-in", href: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1" },
    { name: "YOUTUBE", icon: "fa-brands fa-youtube", href: "https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG" },
    { name: "BLUESKY", icon: "fa-solid fa-cloud", href: "https://bsky.app/profile/moekyawaung96.bsky.social" },
    { name: "FLICKR", icon: "fa-brands fa-flickr", href: "https://www.flickr.com/people/204037451@N06" },
    { name: "VIMEO", icon: "fa-brands fa-vimeo-v", href: "https://vimeo.com/user252414232" },
    { name: "TUMBLR", icon: "fa-brands fa-tumblr", href: "https://www.tumblr.com/moekyawaung" },
    { name: "GRAVATAR", icon: "fa-solid fa-circle-user", href: "https://gravatar.com/moekyawaung2026" },
  ],
};

export const projects: Project[] = [
  { id: "pulse", title: "PULSE_SYNC.EXE", spec: "ANDROID · REALTIME", rating: "★★★★★", yr: "2026", href: "https://github.com/Dev-moe-kyawaung/pulsesync-android", tech: "KOTLIN / FIREBASE / CI-CD", desc: "Multi-module Android platform. Real-time sync, offline-first, full CI/CD pipeline.", img: SW.holo1, mhz: 3248, icon: "fa-solid fa-satellite-dish" },
  { id: "pos", title: "POS_PRO_MAX.ROM", spec: "POINT-OF-SALE", rating: "★★★★★", yr: "2025", href: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max", tech: "KOTLIN / ROOM / MVVM", desc: "Full point-of-sale with inventory, invoicing and analytics. The epic cartridge.", img: SW.holo2, mhz: 4200, icon: "fa-solid fa-credit-card" },
  { id: "social", title: "SOCIAL_DASH.BIN", spec: "ANALYTICS", rating: "★★★★☆", yr: "2025", href: "https://github.com/moekyawaung-tech/social-dashboard", tech: "REACT / NODE / LIVE", desc: "Real-time social analytics. Live data streams + audience radar.", img: SW.holo3, icon: "fa-solid fa-chart-line" },
  { id: "translator", title: "MOEK_AI.TRN", spec: "ON-DEVICE AI", rating: "★★★★★", yr: "2026", href: "https://github.com/Dev-moe-kyawaung/", tech: "TFLITE / CLAUDE", desc: "MoekyawTranslator — private on-device translation core. INT8 quantized.", icon: "fa-solid fa-robot" },
  { id: "games", title: "ARCADE_VOL.01", spec: "GAME CHIP", rating: "★★★★☆", yr: "2024", href: "https://github.com/moekyawaung-tech/game-collection", tech: "CANVAS / PHYSICS", desc: "Game station — snake, physics toys and particle playgrounds.", img: SW.fireworks, icon: "fa-solid fa-gamepad" },
  { id: "crypto", title: "CRYPTO.WLT", spec: "WALLET", rating: "★★★★☆", yr: "2025", href: "https://github.com/moekyawaung-tech/", tech: "WEBSOCKET", desc: "Track coins, get volatility alerts, watch P&L.", icon: "fa-solid fa-coins" },
  { id: "pwa", title: "PWA_OFFLINE.PWA", spec: "INSTALLME", rating: "★★★★☆", yr: "2024", href: "https://github.com/moekyawaung-tech/pwa-app", tech: "SW / WORKERS", desc: "Offline-first progressive web app. Installable, snappy, synced.", img: SW.preview, icon: "fa-solid fa-compact-disc" },
  { id: "music", title: "SYNTHWAVE.FM", spec: "AUDIO PLAYER", rating: "★★★★☆", yr: "2024", href: "https://github.com/moekyawaung-tech/video-player", tech: "AUDIO / VISUAL", desc: "A media deck with waveform visualizer. Crank the bass.", icon: "fa-solid fa-headphones" },
  { id: "video", title: "REELPLAY.VDX", spec: "MEDIA", rating: "★★★★☆", yr: "2024", href: "https://github.com/moekyawaung-tech/video-player", tech: "EXOPLAYER", desc: "High-performance video player. Adaptive + offline cache.", icon: "fa-solid fa-video" },
  { id: "chat", title: "PROTO_CHAT.COM", spec: "MESSAGING", rating: "★★★★☆", yr: "2024", href: "https://github.com/moekyawaung-tech/", tech: "FIREBASE", desc: "Realtime chat with presence stream and end-to-end cipher.", icon: "fa-solid fa-comment-dots" },
  { id: "job", title: "JOB_PORTAL.JPZ", spec: "HIRING HUB", rating: "★★★★☆", yr: "2025", href: "https://github.com/moekyawaung-tech/Job-Portal-App", tech: "FULL-STACK", desc: "Job platform — candidate search, recruiter pipeline.", icon: "fa-solid fa-briefcase" },
  { id: "ecom", title: "NEON_STORE.LTD", spec: "E-COMMERCE", rating: "★★★★☆", yr: "2025", href: "https://github.com/moekyawaung-tech/", tech: "CHECKOUT", desc: "Retro storefront with cart and secure checkout.", icon: "fa-solid fa-cart-shopping" },
  { id: "weather", title: "WX_2026.WTH", spec: "FORECAST", rating: "★★★★☆", yr: "2024", href: "https://github.com/moekyawaung-tech/Weather-app", tech: "GEO / RADAR", desc: "Radar weather — forecasts and cinematic transitions.", icon: "fa-solid fa-cloud-sun" },
  { id: "travel", title: "BKK_SLIDE.THK", spec: "TRAVEL", rating: "★★★★☆", yr: "2025", href: "https://github.com/moekyawaung-tech/thailand-travel", tech: "BILINGUAL", desc: "Thailand travel guide — itineraries, dual language.", icon: "fa-solid fa-plane" },
  { id: "stock", title: "TICKER.ZZZ", spec: "MARKET", rating: "★★★★☆", yr: "2025", href: "https://github.com/moekyawaung-tech/", tech: "APIS / CHARTS", desc: "Live stock telemetry + predictive readouts.", icon: "fa-solid fa-chart-column" },
  { id: "todo", title: "DO_THIS.TDL", spec: "EARLY FORMAT", rating: "★★★☆☆", yr: "2023", href: "https://github.com/moekyawaung-tech/javascript-todo", tech: "VANILLA JS", desc: "A clean, tested todo engine. The first save file.", icon: "fa-solid fa-list-check" },
];

export const skillsLines = [
  { tag: "SYS.CORE", skill: "Kotlin / Android", level: 98, stat: "SYS-VER 99.9" },
  { tag: "UI", skill: "Jetpack Compose / M3", level: 96, stat: "RENDER 60FPS" },
  { tag: "ARCH", skill: "Clean / MVVM / MVI", level: 94, stat: "MODULES 12" },
  { tag: "NET", skill: "Firebase / Retrofit", level: 90, stat: "SYNC 0ms" },
  { tag: "AI", skill: "TFLite / Claude API", level: 86, stat: "INF 32ms" },
  { tag: "SEC", skill: "Ethical Hacking", level: 88, stat: "ENCRYPT AES" },
  { tag: "WEB", skill: "React / TypeScript", level: 84, stat: "BUILD LOVED" },
  { tag: "OPS", skill: "GitHub Actions / CI", level: 90, stat: "PIPELINE GREEN" },
];

export const tapeLines = [
  "KOTLIN", "JETPACK COMPOSE", "CLEAN ARCHITECTURE", "MVVM", "MVI", "FIREBASE",
  "COROUTINES", "TFLITE", "ROOM", "MATERIAL 3", "CLAUDE API", "ETHICAL HACKING",
  "GITHUB ACTIONS", "REST API", "PYTHON", "REACT", "EXOPLAYER", "CI/CD",
];

export const certWings = [
  { icon: "fa-solid fa-code", name: "PROGRAMMING", count: 13, n: "LANGUAGES" },
  { icon: "fa-solid fa-globe", name: "WEB DEV", count: 13, n: "MODULES" },
  { icon: "fa-solid fa-mobile-screen", name: "MOBILE", count: 7, n: "APPS" },
  { icon: "fa-solid fa-database", name: "DATABASES", count: 6, n: "ENGINES" },
  { icon: "fa-solid fa-robot", name: "AI / DATA", count: 11, n: "MODELS" },
  { icon: "fa-solid fa-shield-halved", name: "SECURITY", count: 10, n: "PROTOCOLS" },
  { icon: "fa-solid fa-link", name: "BLOCKCHAIN", count: 4, n: "CHAINS" },
  { icon: "fa-solid fa-sliders", name: "SW ENGINE", count: 7, n: "SYSTEMS" },
  { icon: "fa-solid fa-chart-simple", name: "BUSINESS", count: 11, n: "PLAYS" },
];

export const journey = [
  { yr: "2023", chip: "INSERT COIN", title: "First save file", desc: "Began the longplay across web + mobile. Hunger for clean code.", icon: "fa-solid fa-ghost", color: "#00f0ff" },
  { yr: "2024", chip: "LEVEL UP!", title: "82+ cartridge certs", desc: "Unlocked 9 domains. First achievement Jul 4, 2024.", icon: "fa-solid fa-award", color: "#c86bff" },
  { yr: "2025", chip: "BOSS BATTLE", title: "Senior specialization", desc: "Mastered Kotlin, Compose, Clean Arch. Launchpad boosted.", icon: "fa-solid fa-gamepad", color: "#ff2975" },
  { yr: "2026", chip: "NEW GAME+", title: "On-device AI frontier", desc: "Building MoekyawTranslator + PulseSync on the edge.", icon: "fa-solid fa-microchip", color: "#ffe600" },
];

export const arcadeFacts = [
  { k: "POWER", v: "82+ CARTRIDGES" },
  { k: "CONTINUES", v: "INFINITE" },
  { k: "LIVES", v: "3+ YRS" },
  { k: "HIGH SCORE", v: "16 APPS" },
];

/* Boot log lines */
export const bootLines = [
  "INITIALIZING MOTORBOARD 68000",
  "CALIBRATING CHROME-DISPLAY",
  "LOADING RETRO WRAPPER v2.0",
  "MOUNTING NEON GRID DECK",
  "SIGNAL FOUND :: PLAYER 1",
];
