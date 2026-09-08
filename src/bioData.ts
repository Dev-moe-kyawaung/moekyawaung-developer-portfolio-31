export const CLOUD = "https://res.cloudinary.com/dye5qpwii/image/upload";

export const bio = {
  name: "Moe Kyaw Aung",
  latin: "MKA · NEURAL STRAIN 2026",
  role: "Senior Android Developer",
  splice: "AI Engineer · On-Device ML",
  tagline: "I grow software the way reefs grow light — layer by layer, signal by signal.",
  location: "Tachileik, Myanmar ↔ Bangkok, Thailand",
  roles: [
    "Senior Android Developer",
    "On-Device AI Engineer",
    "Clean Architecture Gardener",
    "Kotlin · Compose Symbiont",
  ],
  building: "MoekyawTranslator — living translation tissue",
  philosophy: "Code with culture. Build with purpose.",
  stats: [
    { label: "Synapses", sub: "certificates", value: 82, suffix: "+" },
    { label: "Clusters", sub: "shipped apps", value: 16, suffix: "" },
    { label: "Colonies", sub: "github worlds", value: 40, suffix: "+" },
    { label: "Cycles", sub: "years growing", value: 3, suffix: "+" },
  ],
  email: "moekyawaung2026@gmail.com",
  phone: "+95 9 889 000 889",
  github: "https://github.com/Dev-moe-kyawaung/",
  portrait: `${CLOUD}/v1778763535/MKA_25_lbx6fb.webp`,
  portrait2: `${CLOUD}/v1778763531/MKA_12_iv8kpm.webp`,
  holoA: `${CLOUD}/v1778795856/copilot_image_1778795675037_heh9xk.png`,
  holoB: `${CLOUD}/v1778795856/copilot_image_1778794626112_ega7kk.png`,
  holoC: `${CLOUD}/v1778795859/copilot_image_1778794430377_n7xlmz.png`,
  preview: `${CLOUD}/v1778795825/preview_dzhqvv.webp`,
  fireworks: `${CLOUD}/v1779052645/2153-fireworks-composer_gm3e0h.jpg`,
  socials: [
    { name: "GitHub", icon: "fa-brands fa-github", href: "https://github.com/Dev-moe-kyawaung/" },
    { name: "LinkedIn", icon: "fa-brands fa-linkedin-in", href: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1" },
    { name: "YouTube", icon: "fa-brands fa-youtube", href: "https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG" },
    { name: "Bluesky", icon: "fa-solid fa-cloud", href: "https://bsky.app/profile/moekyawaung96.bsky.social" },
    { name: "Flickr", icon: "fa-brands fa-flickr", href: "https://www.flickr.com/people/204037451@N06" },
    { name: "Vimeo", icon: "fa-brands fa-vimeo-v", href: "https://vimeo.com/user252414232" },
    { name: "Tumblr", icon: "fa-brands fa-tumblr", href: "https://www.tumblr.com/moekyawaung" },
    { name: "Gravatar", icon: "fa-solid fa-circle-user", href: "https://gravatar.com/moekyawaung2026" },
  ],
};

export type Cluster = {
  id: string;
  title: string;
  strain: string;
  glow: string;
  icon: string;
  desc: string;
  tech: string[];
  href: string;
  yr: string;
  img?: string;
  flagship?: boolean;
  synapses: number;
};

export const clusters: Cluster[] = [
  { id: "pulse", title: "PulseSync Tissue", strain: "ANDROID · REALTIME", glow: "#2ef2c8", icon: "fa-solid fa-satellite-dish", desc: "Multi-module Android organism. Real-time sync, Firebase plasma, offline-first marrow, full CI/CD circulation.", tech: ["Kotlin", "Firebase", "CI/CD", "Multi-module"], href: "https://github.com/Dev-moe-kyawaung/pulsesync-android", yr: "2026", img: bio.holoA, flagship: true, synapses: 96 },
  { id: "pos", title: "POS Pro Max Reef", strain: "POINT-OF-SALE", glow: "#b8ff5c", icon: "fa-solid fa-credit-card", desc: "Full point-of-sale reef — inventory polyps, invoicing currents, analytics glow.", tech: ["Kotlin", "Room", "MVVM"], href: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max", yr: "2025", img: bio.holoB, flagship: true, synapses: 88 },
  { id: "translator", title: "MoekyawTranslator", strain: "ON-DEVICE AI", glow: "#9d7bff", icon: "fa-solid fa-robot", desc: "Living translation tissue. INT8-quantized TFLite neurons fire privately on-device.", tech: ["TFLite", "Claude API", "Compose"], href: "https://github.com/Dev-moe-kyawaung/", yr: "2026", img: bio.holoC, synapses: 92 },
  { id: "social", title: "Social Dashboard Bloom", strain: "ANALYTICS", glow: "#4de3ff", icon: "fa-solid fa-chart-line", desc: "Social analytics bloom — live data plankton, audience radar, engagement tides.", tech: ["React", "Node", "Realtime"], href: "https://github.com/moekyawaung-tech/social-dashboard", yr: "2025", synapses: 74 },
  { id: "games", title: "Arcade Colony 01", strain: "GAME CHIP", glow: "#ff6ad5", icon: "fa-solid fa-gamepad", desc: "Game colony — snake trails, physics spores, particle reefs to play in.", tech: ["Canvas", "Physics", "Particles"], href: "https://github.com/moekyawaung-tech/game-collection", yr: "2024", img: bio.fireworks, synapses: 68 },
  { id: "pwa", title: "PWA Mycelium", strain: "INSTALLABLE", glow: "#2ef2c8", icon: "fa-solid fa-compact-disc", desc: "Offline-first mycelium web app. Installable shell, service-worker roots.", tech: ["PWA", "Workers", "Sync"], href: "https://github.com/moekyawaung-tech/pwa-app", yr: "2024", img: bio.preview, synapses: 64 },
  { id: "music", title: "Synthwave Plankton FM", strain: "AUDIO", glow: "#9d7bff", icon: "fa-solid fa-headphones", desc: "Media deck with waveform bioluminescence. Gapless currents.", tech: ["Audio", "Visualizer"], href: "https://github.com/moekyawaung-tech/video-player", yr: "2024", synapses: 61 },
  { id: "video", title: "Reelplay Spore", strain: "MEDIA", glow: "#4de3ff", icon: "fa-solid fa-video", desc: "Adaptive video spore — ExoPlayer core, subtitle cilia, offline cyst.", tech: ["ExoPlayer", "Cache"], href: "https://github.com/moekyawaung-tech/video-player", yr: "2024", synapses: 58 },
  { id: "chat", title: "Proto-Chat Synapse", strain: "MESSAGING", glow: "#2ef2c8", icon: "fa-solid fa-comment-dots", desc: "Realtime messaging synapse — presence glow, typing sparks, encrypted axons.", tech: ["Firebase", "E2E"], href: "https://github.com/moekyawaung-tech/", yr: "2024", synapses: 66 },
  { id: "job", title: "Job Portal Kelp", strain: "HIRING HUB", glow: "#b8ff5c", icon: "fa-solid fa-briefcase", desc: "Hiring kelp forest — candidate drift, recruiter currents, role filters.", tech: ["Full-stack", "Auth"], href: "https://github.com/moekyawaung-tech/Job-Portal-App", yr: "2025", synapses: 63 },
  { id: "ecom", title: "Neon Tide Store", strain: "COMMERCE", glow: "#ff6ad5", icon: "fa-solid fa-cart-shopping", desc: "Storefront tidepool — cart anemones, secure checkout shell.", tech: ["Checkout", "Storefront"], href: "https://github.com/moekyawaung-tech/", yr: "2025", synapses: 60 },
  { id: "weather", title: "WX-2026 Atoll", strain: "FORECAST", glow: "#4de3ff", icon: "fa-solid fa-cloud-sun", desc: "Radar atoll — forecasts, pressure gradients, cinematic fronts.", tech: ["Geo", "Radar"], href: "https://github.com/moekyawaung-tech/Weather-app", yr: "2024", synapses: 57 },
];

export const pathways = [
  { tag: "SOMA.CORE", name: "Kotlin / Android", level: 98, note: "marrow · 99.9% viability", color: "#2ef2c8" },
  { tag: "DERMIS.UI", name: "Jetpack Compose / M3", level: 96, note: "60fps cilia beat", color: "#4de3ff" },
  { tag: "CORTEX", name: "Clean / MVVM / MVI", level: 94, note: "12 lobes isolated", color: "#9d7bff" },
  { tag: "VESSELS", name: "Firebase / Retrofit", level: 90, note: "0ms clot latency", color: "#b8ff5c" },
  { tag: "SYNAPSE.AI", name: "TFLite / Claude API", level: 86, note: "32ms firing", color: "#ff6ad5" },
  { tag: "IMMUNE", name: "Ethical Hacking / SecOps", level: 88, note: "AES membrane", color: "#2ef2c8" },
  { tag: "TENDRIL.WEB", name: "React / TypeScript", level: 84, note: "cross-tissue", color: "#4de3ff" },
  { tag: "CIRCULATION", name: "GitHub Actions / CI", level: 90, note: "green bloodstream", color: "#b8ff5c" },
];

export const tape = [
  "KOTLIN", "COMPOSE", "CLEAN ARCH", "MVVM", "FIREBASE", "COROUTINES",
  "TFLITE", "ROOM", "MATERIAL 3", "CLAUDE API", "HACKING", "ACTIONS", "REST", "PYTHON",
];

export const wings = [
  { icon: "fa-solid fa-code", name: "Languages", count: 13 },
  { icon: "fa-solid fa-globe", name: "Web", count: 13 },
  { icon: "fa-solid fa-mobile-screen", name: "Mobile", count: 7 },
  { icon: "fa-solid fa-database", name: "Data", count: 6 },
  { icon: "fa-solid fa-robot", name: "AI", count: 11 },
  { icon: "fa-solid fa-shield-halved", name: "Security", count: 10 },
  { icon: "fa-solid fa-link", name: "Chains", count: 4 },
  { icon: "fa-solid fa-sliders", name: "Systems", count: 7 },
  { icon: "fa-solid fa-chart-simple", name: "Growth", count: 11 },
];

export const growth = [
  { yr: "2023", phase: "SPORE", title: "First cell division", desc: "Web + mobile spores. Hunger for clean signal.", color: "#4de3ff", icon: "fa-solid fa-seedling" },
  { yr: "2024", phase: "BLOOM", title: "82+ synapse certs", desc: "Nine tissue wings colonized. First bloom Jul 4.", color: "#9d7bff", icon: "fa-solid fa-award" },
  { yr: "2025", phase: "REEF", title: "Senior symbiosis", desc: "Kotlin, Compose, Clean Arch fused into reef.", color: "#2ef2c8", icon: "fa-solid fa-dna" },
  { yr: "2026", phase: "ABYSSAL", title: "On-device frontier", desc: "Translator + PulseSync glowing in the deep.", color: "#b8ff5c", icon: "fa-solid fa-microchip" },
];

export const symbiontBrain: { keys: string[]; reply: string }[] = [
  { keys: ["who", "you", "soma", "about"], reply: "I am SYMBIONT-01, a living culture grown from Moe Kyaw Aung's work. Senior Android developer, on-device AI engineer — Kotlin marrow, Compose skin, Firebase bloodstream. Ask me about CLUSTERS, PATHWAYS, or how to SIGNAL him." },
  { keys: ["project", "cluster", "app", "work", "pulse", "pos"], reply: "The reef holds 12 neural clusters. PulseSync Tissue and POS Pro Max Reef are the flagships — multi-module Android with realtime sync. MoekyawTranslator is the newest growth: private INT8 translation tissue. Scroll to CLUSTERS and touch one — it will fire." },
  { keys: ["skill", "pathway", "stack", "tech", "kotlin"], reply: "Eight myelinated pathways: Kotlin/Android 98, Compose 96, Clean/MVVM 94, Firebase 90, TFLite/Claude 86, Security 88, React 84, CI 90. Every bar below is a living axon — watch them conduct." },
  { keys: ["hire", "contact", "email", "signal", "job"], reply: "To signal the soma: moekyawaung2026@gmail.com or +95 9 889 000 889. He answers within a day — always with tea. The SIGNAL section below has direct synapses." },
  { keys: ["cert", "wing", "trophy", "learn"], reply: "82+ synapse certificates across 9 wings — languages, web, mobile, data, AI, security, chains, systems, growth. The ARCHIVE section maps them all." },
  { keys: ["hi", "hello", "hey", "yo"], reply: "Hello, host. The culture warms to you. Try asking about CLUSTERS, PATHWAYS, or SIGNAL." },
];
