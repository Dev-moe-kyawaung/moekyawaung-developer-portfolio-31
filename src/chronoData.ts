export const CLOUD = "https://res.cloudinary.com/dye5qpwii/image/upload";

export const c = {
  name: "Moe Kyaw Aung",
  role: "Senior Android Developer",
  splice: "Time Engineer · On-Device AI",
  tagline: "I engineer time — cold starts measured in frames, builds in minutes, growth in years.",
  location: "Tachileik, Myanmar ↔ Bangkok, Thailand",
  roles: [
    "Senior Android Developer",
    "Chrono-Shift Time Engineer",
    "On-Device AI Architect",
    "Kotlin · Compose Chronomancer",
  ],
  building: "MoekyawTranslator — compressing language through time",
  philosophy: "Code with culture. Build with purpose.",
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
  stats: [
    { label: "TICKS", sub: "certificates", value: 82, suffix: "+" },
    { label: "CAPSULES", sub: "shipped apps", value: 16, suffix: "" },
    { label: "TIMELINES", sub: "github worlds", value: 40, suffix: "+" },
    { label: "ORBITS", sub: "years", value: 3, suffix: "+" },
  ],
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

/* ------------------------------------------------------------
   THE FOUR WINDOWS OF EVOLUTION — scrubbed on the timeline
------------------------------------------------------------ */
export type Era = {
  yr: number;
  key: string;
  phase: string;
  title: string;
  subtitle: string;
  desc: string;
  feats: string[];
  color: string;
  integrity: string;
};

export const eras: Era[] = [
  {
    yr: 2023, key: "ignition", phase: "IGNITION WINDOW",
    title: "The signal ignites",
    subtitle: "First cells of code divide across web & mobile",
    desc: "JavaScript spores, Python sparks. The earliest commits flicker into being — a todo engine, a first weather probe. The clock starts ticking.",
    feats: ["First save files committed", "Web + mobile spores", "Hunger for clean signal"],
    color: "#ff2975", integrity: "78.2%",
  },
  {
    yr: 2024, key: "cascade", phase: "CASCADE WINDOW",
    title: "Certification cascade",
    subtitle: "82+ certificates crystallize across 9 domains",
    desc: "A structured cascade — from C to compilers, AI to cyber, chains to systems. First bloom on Jul 4, 2024. The toolkit hardens into a workshop.",
    feats: ["82+ tick certificates", "9 domain wings", "First bloom · Jul 4, 2024"],
    color: "#00f0ff", integrity: "88.6%",
  },
  {
    yr: 2025, key: "specialization", phase: "SPECIALIZATION WINDOW",
    title: "Senior symbiosis",
    subtitle: "Kotlin, Compose & Clean Architecture fuse",
    desc: "Deep specialization — multi-module Android, MVVM/MVI, Firebase bloodstream. Google Developers Launchpad. The maker matures into an engineer.",
    feats: ["Senior Android title", "Launchpad acceleration", "POS Pro Max reef"],
    color: "#2ef2c8", integrity: "94.1%",
  },
  {
    yr: 2026, key: "frontier", phase: "FRONTIER WINDOW",
    title: "The chrono frontier",
    subtitle: "On-device AI, full CI/CD — building the future",
    desc: "MoekyawTranslator and PulseSync. INT8 tissue, offline-first marrow, zero-regression pipelines. The clock itself is being re-engineered.",
    feats: ["MoekyawTranslator culture", "PulseSync platform", "Senior-scale CI/CD"],
    color: "#e8c96a", integrity: "99.98%",
  },
];

/* ------------------------------------------------------------
   TIME CAPSULES — projects sealed per era
------------------------------------------------------------ */
export type Capsule = {
  id: string;
  title: string;
  serial: string;
  eraKey: string;
  eraLabel: string;
  yr: number;
  tech: string[];
  desc: string;
  href: string;
  integrity: string;
  icon: string;
  color: string;
  img?: string;
  flagship?: boolean;
};

export const capsules: Capsule[] = [
  { id: "pulse", title: "PulseSync Platform", serial: "TC-2026-001", eraKey: "frontier", eraLabel: "FRONTIER", yr: 2026, tech: ["Kotlin", "Firebase", "CI/CD"], desc: "Multi-module Android platform — real-time sync, offline-first marrow, full CI/CD circulation.", href: "https://github.com/Dev-moe-kyawaung/pulsesync-android", integrity: "99.2%", icon: "fa-solid fa-satellite-dish", color: "#e8c96a", img: c.holoA, flagship: true },
  { id: "translator", title: "MoekyawTranslator", serial: "TC-2026-002", eraKey: "frontier", eraLabel: "FRONTIER", yr: 2026, tech: ["TFLite", "Claude API", "Compose"], desc: "On-device translation tissue — private INT8 inference, 32ms spikes.", href: "https://github.com/Dev-moe-kyawaung/", integrity: "97.8%", icon: "fa-solid fa-robot", color: "#e8c96a", img: c.holoC },
  { id: "pos", title: "POS Ultimate Pro Max", serial: "TC-2025-003", eraKey: "specialization", eraLabel: "SPECIALIZATION", yr: 2025, tech: ["Kotlin", "Room", "MVVM"], desc: "Point-of-sale reef — inventory polyps, invoicing currents, analytics glow.", href: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max", integrity: "96.4%", icon: "fa-solid fa-credit-card", color: "#2ef2c8", img: c.holoB, flagship: true },
  { id: "job", title: "Job Portal Kelp", serial: "TC-2025-004", eraKey: "specialization", eraLabel: "SPECIALIZATION", yr: 2025, tech: ["Full-stack", "Auth"], desc: "Hiring platform — candidate drift, recruiter currents, role filters.", href: "https://github.com/moekyawaung-tech/Job-Portal-App", integrity: "93.7%", icon: "fa-solid fa-briefcase", color: "#2ef2c8" },
  { id: "social", title: "Social Dashboard Bloom", serial: "TC-2025-005", eraKey: "specialization", eraLabel: "SPECIALIZATION", yr: 2025, tech: ["React", "Node", "Realtime"], desc: "Real-time analytics bloom — live data plankton, engagement tides.", href: "https://github.com/moekyawaung-tech/social-dashboard", integrity: "92.9%", icon: "fa-solid fa-chart-line", color: "#2ef2c8" },
  { id: "games", title: "Arcade Colony 01", serial: "TC-2024-006", eraKey: "cascade", eraLabel: "CASCADE", yr: 2024, tech: ["Canvas", "Physics"], desc: "Game colony — snake trails, physics spores, particle reefs.", href: "https://github.com/moekyawaung-tech/game-collection", integrity: "90.3%", icon: "fa-solid fa-gamepad", color: "#00f0ff", img: c.fireworks },
  { id: "pwa", title: "PWA Mycelium", serial: "TC-2024-007", eraKey: "cascade", eraLabel: "CASCADE", yr: 2024, tech: ["PWA", "Workers"], desc: "Offline-first web mycelium — installable shell, service-worker roots.", href: "https://github.com/moekyawaung-tech/pwa-app", integrity: "91.1%", icon: "fa-solid fa-compact-disc", color: "#00f0ff", img: c.preview },
  { id: "music", title: "Synthwave Plankton FM", serial: "TC-2024-008", eraKey: "cascade", eraLabel: "CASCADE", yr: 2024, tech: ["Audio", "Visualizer"], desc: "Media deck with waveform bioluminescence — gapless currents.", href: "https://github.com/moekyawaung-tech/video-player", integrity: "88.4%", icon: "fa-solid fa-headphones", color: "#00f0ff" },
  { id: "weather", title: "WX-2024 Atoll", serial: "TC-2024-009", eraKey: "cascade", eraLabel: "CASCADE", yr: 2024, tech: ["Geo", "Radar"], desc: "Radar atoll — forecasts, pressure gradients, cinematic fronts.", href: "https://github.com/moekyawaung-tech/Weather-app", integrity: "87.6%", icon: "fa-solid fa-cloud-sun", color: "#00f0ff" },
  { id: "chat", title: "Proto-Chat Synapse", serial: "TC-2024-010", eraKey: "cascade", eraLabel: "CASCADE", yr: 2024, tech: ["Firebase", "E2E"], desc: "Realtime messaging — presence glow, typing sparks, encrypted axons.", href: "https://github.com/moekyawaung-tech/", integrity: "89.2%", icon: "fa-solid fa-comment-dots", color: "#00f0ff" },
  { id: "video", title: "Reelplay Spore", serial: "TC-2024-011", eraKey: "cascade", eraLabel: "CASCADE", yr: 2024, tech: ["ExoPlayer", "Cache"], desc: "Adaptive video spore — ExoPlayer core, subtitle cilia, offline cyst.", href: "https://github.com/moekyawaung-tech/video-player", integrity: "88.9%", icon: "fa-solid fa-video", color: "#00f0ff" },
  { id: "todo", title: "DO_THIS Proto-Engine", serial: "TC-2023-012", eraKey: "ignition", eraLabel: "IGNITION", yr: 2023, tech: ["Vanilla JS", "Tests"], desc: "The first save file — a clean, tested todo engine where the timeline begins.", href: "https://github.com/moekyawaung-tech/javascript-todo", integrity: "81.5%", icon: "fa-solid fa-list-check", color: "#ff2975" },
];

/* ------------------------------------------------------------
   MECHANISMS — skill gears
------------------------------------------------------------ */
export const mechanisms = [
  { tag: "MAINSPRING", name: "Kotlin / Android", level: 98, note: "99.9% temporal precision", color: "#e8c96a" },
  { tag: "ESCAPEMENT", name: "Jetpack Compose / M3", level: 96, note: "60fps escapement", color: "#4de3ff" },
  { tag: "TRAIN", name: "Clean / MVVM / MVI", level: 94, note: "12 wheels aligned", color: "#2ef2c8" },
  { tag: "POWER", name: "Firebase / Retrofit", level: 90, note: "0ms latency reserve", color: "#ffb347" },
  { tag: "CHRONO.AI", name: "TFLite / Claude API", level: 86, note: "32ms inference tick", color: "#ff2975" },
  { tag: "ESCAPE.HAT", name: "Ethical Hacking / SecOps", level: 88, note: "AES chrono-lock", color: "#00f0ff" },
  { tag: "FACE", name: "React / TypeScript", level: 84, note: "cross-era dials", color: "#2ef2c8" },
  { tag: "BARREL", name: "GitHub Actions / CI", level: 90, note: "green barrel", color: "#e8c96a" },
];

export const marqueeItems = [
  "KOTLIN", "COMPOSE", "CLEAN ARCH", "MVVM", "FIREBASE", "COROUTINES", "TFLITE",
  "ROOM", "MATERIAL 3", "CLAUDE API", "ACTIONS", "REST", "PYTHON", "CI/CD",
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
