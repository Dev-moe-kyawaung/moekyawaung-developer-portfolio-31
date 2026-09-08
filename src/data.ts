export type IconName =
  | 'BrainCircuit' | 'LayoutDashboard' | 'Smartphone' | 'Gamepad2' | 'Music4'
  | 'MessageCircle' | 'Trophy' | 'ShoppingCart' | 'Wallet' | 'CloudSun'
  | 'Coins' | 'Video' | 'Store' | 'Plane' | 'Languages' | 'Server'
  | 'ShieldCheck' | 'Cpu' | 'Zap' | 'Code2' | 'Atom' | 'Fingerprint'
  | 'GitBranch' | 'Rocket' | 'Cloud' | 'Database' | 'Globe' | 'Bot'
  | 'Briefcase' | 'GraduationCap' | 'ListTodo' | 'Newspaper';

const C = "https://res.cloudinary.com/dye5qpwii/image/upload";

export const IMG = {
  portrait: `${C}/v1778763535/MKA_25_lbx6fb.webp`,
  portrait2: `${C}/v1778763531/MKA_12_iv8kpm.webp`,
  portrait3: `${C}/v1778763531/MKA_3_zqrhhr.webp`,
  mka11: `${C}/v1778763532/MKA_11_jbijtv.webp`,
  mka13: `${C}/v1778763532/MKA_13_i4bao3.webp`,
  mka22: `${C}/v1778795801/MKA_22_felevo.webp`,
  photo: `${C}/v1778527878/IMG_20260430_053105_uef0yr.png`,
  holo1: `${C}/v1778795856/copilot_image_1778795675037_heh9xk.png`,
  holo2: `${C}/v1778795856/copilot_image_1778794626112_ega7kk.png`,
  holo3: `${C}/v1778795859/copilot_image_1778794430377_n7xlmz.png`,
  holo4: `${C}/v1778795856/copilot_image_1778795000722_eo96gj.png`,
  holo5: `${C}/v1778795847/copilot_image_1778795115579_acfm5j.png`,
  holo6: `${C}/v1778795853/copilot_image_1778794781671_kytvkc.png`,
  preview: `${C}/v1778795825/preview_dzhqvv.webp`,
  fireworks: `${C}/v1779052645/2153-fireworks-composer_gm3e0h.jpg`,
  shot20: `${C}/v1778795799/2024119_20_b94fen.jpg`,
  shot18: `${C}/v1778795800/2024119_18_syk2ou.jpg`,
  shot12: `${C}/v1778795800/2024119_12_sqhcat.jpg`,
};

export const profile = {
  name: "Moe Kyaw Aung",
  nameMM: "မိုးကျော်အောင်",
  short: "MKA",
  role: "Senior Android Developer",
  roleMM: "စီနီယာ Android ဒက်ဗလော့ပါ",
  roles: [
    "Senior Android Developer",
    "Kotlin · Jetpack Compose",
    "Clean Architecture Architect",
    "On-Device AI Engineer",
  ],
  location: "Tachileik, Myanmar 🇲🇲 ↔ Bangkok, Thailand 🇹🇭",
  languages: ["Burmese 🇲🇲", "English 🌐", "Kotlin ☕"],
  focus: {
    Mobile: "Kotlin · Jetpack Compose · MVVM · Clean Arch",
    Backend: "Firebase · REST APIs · Python",
    Security: "Ethical Hacking · Cybersecurity",
    AI: "Claude API · TFLite · On-Device ML",
  },
  building: "MoekyawTranslator — AI Translation App",
  certsLine: "82+ certs · Google Developers Launchpad",
  philosophy: "Code with culture. Build with purpose.",
  philosophyMM: "ကုဒ်ဖြင့်ယဉ်ကျေးမှု · ရည်ရွယ်ချက်ဖြင့်တည်ဆောက်",
  stats: [
    { key: "certs", label: "Certificates", labelMM: "လက်မှတ်များ", value: 82, suffix: "+" },
    { key: "apps", label: "App Lab", labelMM: "အက်ပ်များ", value: 16, suffix: "" },
    { key: "pages", label: "GitHub Worlds", labelMM: "ဝက်ဘ်ကမ္ဘာ", value: 40, suffix: "+" },
    { key: "years", label: "Years", labelMM: "နှစ်", value: 3, suffix: "+" },
  ],
  github: "https://github.com/Dev-moe-kyawaung/",
  email: "moekyawaung2026@gmail.com",
  phone: "+95 9 889 000 889",
  phone2: "+959 666 000 050",
  resume: "https://github.com/Dev-moe-kyawaung/",
  image: IMG.portrait,
  socials: [
    { name: "GitHub", fa: "fa-brands fa-github", href: "https://github.com/Dev-moe-kyawaung/" },
    { name: "LinkedIn", fa: "fa-brands fa-linkedin-in", href: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1" },
    { name: "YouTube", fa: "fa-brands fa-youtube", href: "https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG" },
    { name: "Bluesky", fa: "fa-solid fa-cloud", href: "https://bsky.app/profile/moekyawaung96.bsky.social" },
    { name: "Flickr", fa: "fa-brands fa-flickr", href: "https://www.flickr.com/people/204037451@N06" },
    { name: "Tumblr", fa: "fa-brands fa-tumblr", href: "https://www.tumblr.com/moekyawaung" },
    { name: "Vimeo", fa: "fa-brands fa-vimeo-v", href: "https://vimeo.com/user252414232" },
    { name: "Gravatar", fa: "fa-solid fa-circle-user", href: "https://gravatar.com/moekyawaung2026" },
  ],
};

export type Project = {
  id: string; name: string; repo: string; desc: string; descMM: string;
  cats: string[]; tags: string[]; icon: IconName; accent: string;
  featured?: boolean; year: string; img?: string;
};

export const PROJECT_FILTERS = ["ALL", "ANDROID", "WEB", "AI·DATA", "GAMES", "ENTERPRISE"] as const;

export const projects: Project[] = [
  {
    id: "pulse", name: "PulseSync", featured: true, year: "2026",
    repo: "https://github.com/Dev-moe-kyawaung/pulsesync-android",
    desc: "Senior-level multi-module Android platform — real-time sync, Firebase backend, offline-first and a full CI/CD pipeline.",
    descMM: "အဆင့်မြင့် Android ပလက်ဖောင်း — အချိန်နှင့်တပြေးညီ sync, Firebase, offline-first နှင့် CI/CD.",
    cats: ["ANDROID", "ENTERPRISE"], tags: ["Kotlin", "Multi-module", "Firebase", "CI/CD"],
    icon: "BrainCircuit", accent: "#7ee0ff", img: IMG.holo1,
  },
  {
    id: "pos", name: "POS Ultimate Pro Max", year: "2025",
    repo: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
    desc: "Full-featured point-of-sale — inventory, invoicing and analytics engineered to the Pro Max standard.",
    descMM: "အပြည့်အစုံ POS — စတော့၊ ပြေစာနှင့် ခွဲခြမ်းစိတ်ဖြာမှု.",
    cats: ["ENTERPRISE", "ANDROID"], tags: ["Kotlin", "Room", "MVVM"],
    icon: "Store", accent: "#e8c36a", img: IMG.holo5,
  },
  {
    id: "translator", name: "MoekyawTranslator", year: "2026",
    repo: "https://github.com/Dev-moe-kyawaung/",
    desc: "On-device AI translation using Claude API and TFLite — private, instant, multilingual.",
    descMM: "ကိရိယာပေါ်တွင် AI ဘာသာပြန် — Claude API နှင့် TFLite.",
    cats: ["AI·DATA", "ANDROID"], tags: ["AI", "TFLite", "Claude"],
    icon: "Languages", accent: "#d4a5ff", img: IMG.holo3,
  },
  {
    id: "social", name: "Social Dashboard", year: "2025",
    repo: "https://github.com/moekyawaung-tech/social-dashboard",
    desc: "Real-time social analytics — live streams, audience insights and engagement graphs.",
    descMM: "လူမှုကွန်ရက် ခွဲခြမ်းစိတ်ဖြာမှု တိုက်ရိုက်ဒေတာ.",
    cats: ["WEB"], tags: ["React", "Node", "Realtime"],
    icon: "LayoutDashboard", accent: "#7ee0ff", img: IMG.holo2,
  },
  {
    id: "jobportal", name: "Job Portal App", year: "2025",
    repo: "https://github.com/moekyawaung-tech/Job-Portal-App",
    desc: "Full-stack job platform with candidate search and recruiter pipelines.",
    descMM: "အလုပ်အကိုင် ပလက်ဖောင်း — ရှာဖွေမှုနှင့် recruiter pipeline.",
    cats: ["WEB", "ENTERPRISE"], tags: ["Full-stack", "Auth"],
    icon: "Briefcase", accent: "#6ee7b7", img: IMG.holo4,
  },
  {
    id: "pwa", name: "PWA App", year: "2024",
    repo: "https://github.com/moekyawaung-tech/pwa-app",
    desc: "Offline-first progressive web app — service workers and installable shell.",
    descMM: "အော့ဖ်လိုင်း ဦးစားပေး PWA.",
    cats: ["WEB"], tags: ["PWA", "Offline"],
    icon: "Globe", accent: "#7ee0ff", img: IMG.preview,
  },
  {
    id: "games", name: "Game Collection", year: "2024",
    repo: "https://github.com/moekyawaung-tech/game-collection",
    desc: "Interactive game hub — Snake, arcade physics and canvas playgrounds.",
    descMM: "ဂိမ်းစုစည်းမှု — Snake နှင့် ရူပဗေဒ.",
    cats: ["GAMES"], tags: ["Canvas", "Physics"],
    icon: "Gamepad2", accent: "#f9a8d4", img: IMG.fireworks,
  },
  {
    id: "stock", name: "Stock Market", year: "2025",
    repo: "https://github.com/moekyawaung-tech/",
    desc: "Live market tracking with streaming quotes and predictive indicators.",
    descMM: "စတော့စျေးကွက် တိုက်ရိုက်ခြေရာခံမှု.",
    cats: ["AI·DATA", "WEB"], tags: ["API", "Charts"],
    icon: "Coins", accent: "#6ee7b7",
  },
  {
    id: "weather", name: "Weather App", year: "2024",
    repo: "https://github.com/moekyawaung-tech/Weather-app",
    desc: "Location-aware weather with forecasts and cinematic transitions.",
    descMM: "ရာသီဥတု ခန့်မှန်းချက် အက်ပ်.",
    cats: ["AI·DATA"], tags: ["Geo", "UI/UX"],
    icon: "CloudSun", accent: "#7dd3fc",
  },
  {
    id: "crypto", name: "Crypto Tracker", year: "2025",
    repo: "https://github.com/moekyawaung-tech/",
    desc: "Digital-asset portfolio — live prices, alerts and P&L analytics.",
    descMM: "ကရစ်ပတို ပိုင်ဆိုင်မှု ခြေရာခံ.",
    cats: ["AI·DATA", "WEB"], tags: ["WebSocket"],
    icon: "Wallet", accent: "#e8c36a",
  },
  {
    id: "chat", name: "Chat App", year: "2024",
    repo: "https://github.com/moekyawaung-tech/",
    desc: "Realtime messaging with presence and end-to-end security.",
    descMM: "ချက်တင် စကားပြော — လုံခြုံရေးနှင့်အတူ.",
    cats: ["ANDROID", "WEB"], tags: ["Firebase"],
    icon: "MessageCircle", accent: "#d4a5ff",
  },
  {
    id: "music", name: "Music Player", year: "2024",
    repo: "https://github.com/moekyawaung-tech/video-player",
    desc: "Immersive audio engine — waveform visualization and gapless playback.",
    descMM: "ဂီတ ပလေယာ — လှိုင်းပုံဖော် ပြသမှု.",
    cats: ["GAMES"], tags: ["Audio"],
    icon: "Music4", accent: "#fb7185",
  },
  {
    id: "travel", name: "Thailand Travel", year: "2025",
    repo: "https://github.com/moekyawaung-tech/thailand-travel",
    desc: "Travel companion for Thailand — guides, itineraries, bilingual.",
    descMM: "ထိုင်းခရီးသွား အဖော်အက်ပ်.",
    cats: ["WEB"], tags: ["Bilingual"],
    icon: "Plane", accent: "#5eead4",
  },
  {
    id: "video", name: "Video Player", year: "2024",
    repo: "https://github.com/moekyawaung-tech/video-player",
    desc: "High-performance media player — adaptive playback and offline cache.",
    descMM: "ဗီဒီယို ပလေယာ — adaptive playback.",
    cats: ["ANDROID"], tags: ["ExoPlayer"],
    icon: "Video", accent: "#f87171",
  },
  {
    id: "ecom", name: "E-Commerce Suite", year: "2025",
    repo: "https://github.com/moekyawaung-tech/",
    desc: "Modern storefront with cart, checkout and order orchestration.",
    descMM: "အီလက်ထရွန်နစ် စျေးဝယ် စနစ်.",
    cats: ["WEB", "ENTERPRISE"], tags: ["Payments"],
    icon: "ShoppingCart", accent: "#fbbf24",
  },
  {
    id: "todo", name: "JavaScript Todo", year: "2023",
    repo: "https://github.com/moekyawaung-tech/javascript-todo",
    desc: "Clean, testable todo engine — the humble origin of a larger architecture story.",
    descMM: "JavaScript Todo — ဗိသုကာ၏ အစ.",
    cats: ["WEB"], tags: ["Vanilla JS"],
    icon: "Fingerprint", accent: "#67e8f9",
  },
];

export type AppCard = {
  n: number; name: string; emoji: string; tag: string; href: string; img?: string; fresh?: boolean;
};

export const appLab: AppCard[] = [
  { n: 1, name: "Social Dashboard", emoji: "📱", tag: "NEW", href: "https://github.com/moekyawaung-tech/social-dashboard", img: IMG.holo2, fresh: true },
  { n: 2, name: "PWA App", emoji: "📱", tag: "PWA", href: "https://github.com/moekyawaung-tech/pwa-app", img: IMG.preview },
  { n: 3, name: "Admin Dashboard", emoji: "📊", tag: "OPS", href: "https://github.com/moekyawaung-tech/", img: IMG.holo1 },
  { n: 4, name: "Stock Market", emoji: "📈", tag: "LIVE", href: "https://github.com/moekyawaung-tech/" },
  { n: 5, name: "Game Collection", emoji: "🎮", tag: "PLAY", href: "https://github.com/moekyawaung-tech/game-collection", img: IMG.fireworks },
  { n: 6, name: "Music Player", emoji: "🎵", tag: "AUDIO", href: "https://github.com/moekyawaung-tech/video-player" },
  { n: 7, name: "Chat App", emoji: "💬", tag: "RT", href: "https://github.com/moekyawaung-tech/" },
  { n: 8, name: "World Cup", emoji: "⚽", tag: "SPORT", href: "https://github.com/moekyawaung-tech/" },
  { n: 9, name: "E-commerce", emoji: "🛒", tag: "SHOP", href: "https://github.com/moekyawaung-tech/" },
  { n: 10, name: "Portfolio", emoji: "💼", tag: "SELF", href: "https://github.com/Dev-moe-kyawaung/" },
  { n: 11, name: "Money Tracker", emoji: "💰", tag: "FIN", href: "https://github.com/moekyawaung-tech/" },
  { n: 12, name: "Weather", emoji: "🌤️", tag: "GEO", href: "https://github.com/moekyawaung-tech/Weather-app" },
  { n: 13, name: "Crypto", emoji: "💸", tag: "WEB3", href: "https://github.com/moekyawaung-tech/" },
  { n: 14, name: "Todo", emoji: "📝", tag: "CORE", href: "https://github.com/moekyawaung-tech/javascript-todo" },
  { n: 15, name: "Video Player", emoji: "🎯", tag: "MEDIA", href: "https://github.com/moekyawaung-tech/video-player" },
  { n: 16, name: "LEGEND!", emoji: "🏆", tag: "MAX", href: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max", img: IMG.holo5, fresh: true },
];

export const githubWorlds = [
  { name: "China", href: "https://moekyawaung-china.github.io/" },
  { name: "Developer", href: "https://moekyawaung-developer.github.io/" },
  { name: "Vivo Design", href: "https://moekyawaungvivov30pro-design.github.io/" },
  { name: "MM", href: "https://moekyaw-aung-mm.github.io/" },
  { name: "MK", href: "https://moekyawaung-mk.github.io/" },
  { name: "Microsoft", href: "https://moekyawaung-microsoft.github.io/" },
  { name: "Cyber", href: "https://moekyawaung-cyber.github.io/" },
  { name: "Bangkok", href: "https://moekyawaung-bangkok.github.io/" },
  { name: "Micro", href: "https://moekyawaung-micro.github.io/" },
  { name: "Dev MM", href: "https://moekyawaung-dev-mm.github.io/" },
  { name: "MoeKyaw", href: "https://moekyawaung.github.io/" },
  { name: "Tech", href: "https://moekyawaung-tech.github.io/" },
  { name: "Hack", href: "https://moekyawaung-hack.github.io/" },
  { name: "Graduate", href: "https://moekyawaung-graduate.github.io/" },
  { name: "Linux", href: "https://Moekyawaung-Linux.github.io/" },
  { name: "Coder", href: "https://Moekyawaung-coder.github.io/" },
  { name: "Designer", href: "https://moekyawaung-designer.github.io/" },
  { name: "2026", href: "https://Moekyawaung2026.github.io/" },
  { name: "Web", href: "https://moekyawaung-web.github.io/" },
  { name: "Dev", href: "https://Moekyawaung-dev.github.io/" },
  { name: "Code", href: "https://MoeKyawAung-code.github.io/" },
  { name: "Creator", href: "https://moekyawaung-creator.github.io/" },
  { name: "WebDev", href: "https://moekyawaung-webdeveloper.github.io/" },
  { name: "Edu", href: "https://moekyawaung-edu.github.io/" },
  { name: "Senior", href: "https://moekyawaung-senior.github.io/" },
  { name: "Google", href: "https://moekyawaung-google.github.io/" },
  { name: "Development", href: "https://Moekyawaung-Development.github.io/" },
];

export const lovableLab = [
  { name: "Happy CV", href: "https://happy-cv-creator.lovable.app" },
  { name: "MoeKyawAung", href: "https://moekyawaung.lovable.app" },
  { name: "My Bio", href: "https://moekyawaungmybio.lovable.app/" },
  { name: "CV Palette", href: "https://the-cv-palette.lovable.app" },
  { name: "URL Lab", href: "https://moekyaw-url.lovable.app" },
  { name: "Dev Hub", href: "https://moekyawaung-dev.lovable.app" },
  { name: "CV Beacon", href: "https://cv-beacon.lovable.app/" },
  { name: "Pixel Snap", href: "https://pixel-perfect-snap-39.lovable.app" },
  { name: "Joy Codify", href: "https://joy-codify-life.lovable.app/" },
  { name: "Skill Gallery", href: "https://app-skill-gallery.lovable.app" },
  { name: "Spark Coach", href: "https://spark-coach-create.lovable.app" },
  { name: "Myanmar", href: "https://moekyawaung-myanmar.lovable.app" },
];

export type Domain = {
  title: string; titleMM: string; pct: number; blurb: string; icon: IconName; color: string; chips: string[];
};

export const domains: Domain[] = [
  { title: "Android / Mobile", titleMM: "မိုဘိုင်း", pct: 95, icon: "Smartphone", color: "#7ee0ff",
    blurb: "Production apps on modern Android.", chips: ["Kotlin", "Compose", "Material 3", "Room", "Paging"] },
  { title: "Architecture", titleMM: "ဗိသုကာ", pct: 92, icon: "Atom", color: "#d4a5ff",
    blurb: "Systems that outlive product pivots.", chips: ["Clean Arch", "MVVM", "MVI", "Multi-module"] },
  { title: "Backend & Cloud", titleMM: "က্লাउड", pct: 88, icon: "Cloud", color: "#7dd3fc",
    blurb: "Services that stay online.", chips: ["Firebase", "REST", "Retrofit", "Python"] },
  { title: "Security & DevOps", titleMM: "လုံခြုံရေး", pct: 85, icon: "ShieldCheck", color: "#6ee7b7",
    blurb: "Ship fast without shipping holes.", chips: ["Ethical Hacking", "Actions", "Linux", "Kali"] },
  { title: "AI / On-Device ML", titleMM: "AI", pct: 80, icon: "BrainCircuit", color: "#f9a8d4",
    blurb: "Intelligence that stays private.", chips: ["TFLite", "Claude API", "On-Device ML"] },
  { title: "Frontend & Web", titleMM: "ဝက်ဘ်", pct: 84, icon: "Globe", color: "#e8c36a",
    blurb: "Interfaces that feel native.", chips: ["React", "TypeScript", "PWA", "Node"] },
];

export const tickerTech = [
  "KOTLIN", "JETPACK COMPOSE", "CLEAN ARCHITECTURE", "MVVM", "MVI", "FIREBASE",
  "COROUTINES", "TFLITE", "PYTHON", "ROOM", "GITHUB ACTIONS", "REST API",
  "ETHICAL HACKING", "MATERIAL 3", "CLAUDE API", "REACT", "AZURE", "CI/CD",
];

export type CertCat = { cat: string; icon: string; count: number; items: string[] };

export const certCats: CertCat[] = [
  { cat: "Programming Languages", icon: "⌨️", count: 13, items: ["C Programming", "Java", "Python", "Python Advanced", "JavaScript", "TypeScript", "Ruby", "Rust", "Go", "Dart", "Kotlin", "SQL", "Bash Shell"] },
  { cat: "Web Development", icon: "🌐", count: 13, items: ["HTML5", "CSS3", "Responsive Design", "JavaScript DOM", "React", "Next.js", "Angular", "Vue.js", "Node.js", "Express", "REST APIs", "Web Security", "Web Performance"] },
  { cat: "Mobile & App Dev", icon: "📱", count: 7, items: ["Android Fundamentals", "Kotlin for Android", "Jetpack Compose", "Jetpack Navigation", "Android Lifecycle", "Flutter Basics", "React Native"] },
  { cat: "Databases", icon: "🗄️", count: 6, items: ["PostgreSQL", "MongoDB", "Redis", "Firebase Firestore", "SQLite / Room", "Database Design"] },
  { cat: "AI & Data Science", icon: "🤖", count: 11, items: ["Intro to ML", "Supervised Learning", "Neural Networks", "TensorFlow", "TFLite", "Computer Vision", "NLP", "Pandas", "Data Visualization", "Claude API", "Prompt Engineering"] },
  { cat: "Security & DevOps", icon: "🔐", count: 10, items: ["Cyber Security", "Ethical Hacking", "Penetration Testing", "Network Security", "Linux", "Docker", "CI/CD Pipelines", "GitHub Actions", "Cloud Security", "Zero Trust"] },
  { cat: "Blockchain", icon: "⛓️", count: 4, items: ["Blockchain Fundamentals", "Smart Contracts", "Solidity", "Web3 Basics"] },
  { cat: "Software Engineering", icon: "🛠️", count: 7, items: ["Clean Code", "OOP Design", "SOLID Principles", "Unit Testing", "Integration Testing", "System Design", "Agile / Scrum"] },
  { cat: "Marketing & Business", icon: "📈", count: 11, items: ["Digital Marketing", "SEO", "Brand Strategy", "Startup Fundamentals", "Product Management", "Project Management", "Jira Mastery", "Business Analytics", "Copywriting", "Freelancing", "Personal Branding"] },
];

export const timeline = [
  { year: "2023", tag: "IGNITION", title: "The first commit", titleMM: "ပထမ commit", desc: "Began across web and mobile — JavaScript, Python, and a hunger for clean code.", icon: "Rocket" as IconName, color: "#7ee0ff" },
  { year: "2024", tag: "CASCADE", title: "82+ certifications", titleMM: "လက်မှတ် ၈၂+", desc: "A structured cascade across 9 domains. First cert logged Jul 4, 2024.", icon: "GraduationCap" as IconName, color: "#d4a5ff" },
  { year: "2025", tag: "SPECIALIZATION", title: "Senior Android", titleMM: "စီနီယာ Android", desc: "Deep Kotlin, Compose, MVVM, Clean Architecture. Google Developers Launchpad.", icon: "Atom" as IconName, color: "#6ee7b7" },
  { year: "2026", tag: "FRONTIER", title: "AI on the edge", titleMM: "အစွန်းပိုင်း AI", desc: "Building MoekyawTranslator and PulseSync — on-device AI and full CI/CD.", icon: "BrainCircuit" as IconName, color: "#e8c36a" },
];

export const orbDecisions = [
  { text: "Evaluating offline-first strategy…", type: "OPTIMIZE", color: "#7ee0ff" },
  { text: "Selecting Clean Architecture layers…", type: "ARCHITECT", color: "#d4a5ff" },
  { text: "Encrypting local credential vault…", type: "SECURE", color: "#6ee7b7" },
  { text: "Quantizing model → TFLite int8…", type: "COMPRESS", color: "#e8c36a" },
  { text: "Balancing coroutine dispatchers…", type: "SCHEDULE", color: "#f9a8d4" },
  { text: "Syncing Firestore delta streams…", type: "SYNC", color: "#7ee0ff" },
  { text: "Caching screen state for cold start…", type: "CACHE", color: "#fb923c" },
  { text: "Shrinking APK via resource shaping…", type: "SIZE", color: "#4ade80" },
  { text: "Routing user intent → ViewModel…", type: "ROUTE", color: "#38bdf8" },
  { text: "Running Espresso matrix on CI…", type: "VERIFY", color: "#e879f9" },
];

export const gallery = [
  IMG.portrait, IMG.portrait2, IMG.portrait3, IMG.mka11, IMG.mka13, IMG.mka22,
  IMG.holo1, IMG.holo3, IMG.holo5, IMG.shot20, IMG.shot18, IMG.fireworks,
];

export const copy = {
  en: {
    nav: ["About", "Architecture", "Nodes", "Skills", "Lab", "Vault", "Signal"],
    hire: "HIRE ME",
    open: "OPEN TO WORK",
    explore: "ENTER THE FIELD",
    resume: "DOSSIER",
    scroll: "DESCEND",
    inspect: "INSPECT",
    philosophy: "Code with culture. Build with purpose.",
    aboutEyebrow: "01 · Identity",
    aboutTitle: "The observatory",
    aboutAccent: "of one mind",
    archEyebrow: "02 · Intelligence",
    archTitle: "Quantum AI",
    archAccent: "architecture orb",
    nodesEyebrow: "03 · Artifacts",
    nodesTitle: "Quantum",
    nodesAccent: "nodes",
    skillsEyebrow: "04 · Lattice",
    skillsTitle: "Hex",
    skillsAccent: "abilities",
    labEyebrow: "05 · Collections",
    labTitle: "App",
    labAccent: "laboratory",
    worldsEyebrow: "06 · Universes",
    worldsTitle: "GitHub",
    worldsAccent: "worlds",
    vaultEyebrow: "07 · Archives",
    vaultTitle: "Certificate",
    vaultAccent: "vault",
    contactEyebrow: "08 · Signal",
    contactTitle: "Open a",
    contactAccent: "channel",
    journeyEyebrow: "Timeline",
    journeyTitle: "Trajectory",
    cmdHint: "⌘K  command",
  },
  mm: {
    nav: ["အကြောင်း", "ဗိသုကာ", "နိုဒ်များ", "ကျွမ်းကျင်မှု", "ဓာတ်ခွဲခန်း", "လက်မှတ်", "ဆက်သွယ်"],
    hire: "ခန့်အပ်ပါ",
    open: "အလုပ်လက်ခံသည်",
    explore: "ကွန်ရက်သို့",
    resume: "ကိုယ်ရေးရာဇဝင်",
    scroll: "ဆင်းပါ",
    inspect: "ကြည့်ရှု",
    philosophy: "ကုဒ်ဖြင့်ယဉ်ကျေးမှု · ရည်ရွယ်ချက်ဖြင့်တည်ဆောက်",
    aboutEyebrow: "၀၁ · ကိုယ်ရေး",
    aboutTitle: "စောင့်ကြည့်ရုံ",
    aboutAccent: "တစ်ဦးတည်း",
    archEyebrow: "၀၂ · ဉာဏ်ရည်",
    archTitle: "ကွမ်တမ် AI",
    archAccent: "ဗိသုကာ Orb",
    nodesEyebrow: "၀၃ · လက်ရာ",
    nodesTitle: "ကွမ်တမ်",
    nodesAccent: "နိုဒ်များ",
    skillsEyebrow: "၀၄ · စွမ်းရည်",
    skillsTitle: "နည်းပညာ",
    skillsAccent: "အစုအဝေး",
    labEyebrow: "၀၅ · စုစည်းမှု",
    labTitle: "အက်ပ်",
    labAccent: "ဓာတ်ခွဲခန်း",
    worldsEyebrow: "၀၆ · ကမ္ဘာများ",
    worldsTitle: "GitHub",
    worldsAccent: "ဝက်ဘ်များ",
    vaultEyebrow: "၀၇ · မော်ကွန်း",
    vaultTitle: "လက်မှတ်",
    vaultAccent: "ခန်းမ",
    contactEyebrow: "၀၈ · အချက်ပြ",
    contactTitle: "ချိတ်ဆက်",
    contactAccent: "လိုင်း",
    journeyEyebrow: "အချိန်လိုင်း",
    journeyTitle: "ခရီး",
    cmdHint: "⌘K အမိန့်",
  },
};

export type Lang = keyof typeof copy;
