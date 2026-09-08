import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "../utils/audio";
import {
  Cpu, Zap, ShieldCheck, Boxes, GitBranch, Smartphone, BrainCircuit,
  Play, Pause, Sparkles, Layers, Activity, ChevronRight, CheckCircle2, RotateCw
} from "lucide-react";

export type ArchDecision = {
  id: string;
  category: "ARCHITECTURE" | "OFFLINE" | "AI_ML" | "STATE" | "SECURITY" | "MODULAR" | "DEVOPS";
  title: string;
  titleMM: string;
  summary: string;
  summaryMM: string;
  impact: string;
  metric: string;
  metricLabel: string;
  color: string;
  icon: typeof Cpu;
  layers: string[];
  tech: string[];
};

export const ARCH_DECISIONS: ArchDecision[] = [
  {
    id: "clean-arch",
    category: "ARCHITECTURE",
    title: "Clean Architecture: Domain Purity",
    titleMM: "Clean Architecture: ဒိုမိန်း သီးခြားခွဲထုတ်ခြင်း",
    summary: "Pure Kotlin business logic completely insulated from Android SDK lifecycle, ensuring 100% unit-testable UseCases.",
    summaryMM: "Android SDK မှ ကင်းလွတ်သော သန့်ရှင်းသည့် Kotlin စီးပွားရေးလုပ်ငန်းယုတ္တိ၊ ၁၀၀% စမ်းသပ်နိုင်မှု။",
    impact: "Zero framework coupling, infinite maintainability",
    metric: "98.4%",
    metricLabel: "TEST ISOLATION",
    color: "#00f0ff",
    icon: Boxes,
    layers: ["UI (Jetpack Compose)", "Presentation (ViewModel/MVI)", "Domain (UseCases/Entities)", "Data (Room/Retrofit)"],
    tech: ["Kotlin", "Clean Arch", "Coroutines", "Dagger/Hilt"],
  },
  {
    id: "offline-first",
    category: "OFFLINE",
    title: "Offline-First: SQLite/Room Single Source of Truth",
    titleMM: "Offline-First: Room DB ဒေသတွင်း ပထမဆုံး သိမ်းဆည်းမှု",
    summary: "UI observes Room DB Flow exclusively. Firebase Firestore streams push delta syncs in the background with zero UI freeze.",
    summaryMM: "UI သည် Room DB Flow ကိုသာ ကြည့်သည်။ Firebase delta sync ဖြင့် နောက်ကွယ်တွင် လုပ်ဆောင်သည်။",
    impact: "Zero latency cold-starts, seamless offline resilience",
    metric: "< 16ms",
    metricLabel: "FRAME LATENCY",
    color: "#10b981",
    icon: Smartphone,
    layers: ["Compose UI", "Repository Pattern", "Room DAO (Flow)", "Remote Sync Worker"],
    tech: ["Room DB", "Firebase Firestore", "WorkManager", "Kotlin Flow"],
  },
  {
    id: "on-device-ml",
    category: "AI_ML",
    title: "On-Device ML: TFLite INT8 Quantization",
    titleMM: "On-Device ML: TFLite 8-bit Quantized Inference",
    summary: "Model compressed from 32MB FP32 to 8.2MB INT8 with sub-35ms inference on Neural Processing Units without transmitting user data.",
    summaryMM: "မော်ဒယ်အရွယ်အစား ၃၂MB မှ ၈.၂MB သို့ လျှော့ချပြီး ကိရိယာပေါ်တွင် သီးသန့် ဘာသာပြန်ခြင်း။",
    impact: "100% private on-device intelligence, 4x memory savings",
    metric: "32ms",
    metricLabel: "INFERENCE TIME",
    color: "#f59e0b",
    icon: BrainCircuit,
    layers: ["Camera/Audio In", "TFLite Interpreter (INT8)", "Tensor Buffer", "Compose Overlay"],
    tech: ["TensorFlow Lite", "Claude API", "Python", "On-Device ML"],
  },
  {
    id: "reactive-state",
    category: "STATE",
    title: "MVI Unidirectional Data Flow (StateFlow)",
    titleMM: "MVI တစ်ဖက်သတ် ဒေတာ စီးဆင်းမှု စနစ်",
    summary: "Single immutable UI State with sealed Intent hierarchy. Eliminates race conditions across navigation and process death.",
    summaryMM: "မပြောင်းလဲနိုင်သော UI State တစ်ခုတည်းဖြင့် race condition အမှားများကို အပြီးတိုင် ရှင်းထုတ်သည်။",
    impact: "Deterministic UI states, time-travel debugging",
    metric: "0",
    metricLabel: "RACE CONDITIONS",
    color: "#a855f7",
    icon: Zap,
    layers: ["UI Intent", "ViewModel State Machine", "Immutable ViewState", "Compose Recomposition"],
    tech: ["StateFlow", "SharedFlow", "Compose", "Coroutines"],
  },
  {
    id: "zero-trust-sec",
    category: "SECURITY",
    title: "Hardware Enclave: Android Keystore + Biometric",
    titleMM: "ဟာ့ဒ်ဝဲ လုံခြုံရေး: Android Keystore စနစ်",
    summary: "Cryptographic keys generated and stored inside hardware-backed Secure Element (TEE). In-memory tokens wiped after use.",
    summaryMM: "ဟာ့ဒ်ဝဲ အကာအကွယ်ဖြင့် သော့များကို လုံခြုံစွာ ထိန်းသိမ်းပြီး မန်မိုရီမှ ချက်ချင်း ရှင်းလင်းသည်။",
    impact: "Hardened against memory dump attacks & root exploits",
    metric: "AES-256",
    metricLabel: "HARDWARE GCM",
    color: "#ec4899",
    icon: ShieldCheck,
    layers: ["BiometricPrompt", "CryptoObject", "Hardware Keystore TEE", "EncryptedSharedPreferences"],
    tech: ["Android Keystore", "Ethical Hacking", "Kali Linux", "Bio-Auth"],
  },
  {
    id: "multi-module",
    category: "MODULAR",
    title: "Multi-Module Architecture: Feature Isolation",
    titleMM: "Multi-Module: ကဏ္ဍအလိုက် မော်ဂျူး ခွဲထုတ်မှု",
    summary: "12 high-cohesion Gradle modules with API/Implementation boundaries. Accelerates incremental CI build times by 62%.",
    summaryMM: "Gradle မော်ဂျူး ၁၂ ခုဖြင့် တည်ဆောက်ချိန်ကို ၆၂% လျှင်မြန်စေသည်။",
    impact: "Dynamic Feature Delivery ready, compile-time guardrails",
    metric: "-62%",
    metricLabel: "BUILD DURATION",
    color: "#06b6d4",
    icon: GitBranch,
    layers: [":app", ":core:network", ":core:database", ":feature:translator"],
    tech: ["Gradle Kotlin DSL", "Dynamic Delivery", "Clean Arch"],
  },
  {
    id: "cicd-devops",
    category: "DEVOPS",
    title: "Automated CI/CD: GitHub Actions Matrix",
    titleMM: "အလိုအလျောက် စမ်းသပ်ထုတ်ဝေမှု CI/CD",
    summary: "Multi-device Espresso and MockK regression suites run on every commit with automatic Play Store / Firebase App Distribution delivery.",
    summaryMM: "commit တိုင်းတွင် အလိုအလျောက် စမ်းသပ်စစ်ဆေးပြီး အက်ပ်ကို ချက်ချင်း ဖြန့်ချိသည်။",
    impact: "Continuous zero-regression delivery pipeline",
    metric: "100%",
    metricLabel: "AUTOMATION",
    color: "#3b82f6",
    icon: Activity,
    layers: ["Git Push", "Static Lint / Detekt", "Espresso UI Matrix", "Fastlane Deployment"],
    tech: ["GitHub Actions", "Fastlane", "Espresso", "MockK"],
  },
];

type OrbSpark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
};

type Shockwave = {
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
};

export default function AIOrb({ isBurmese = false }: { isBurmese?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [autoSim, setAutoSim] = useState<boolean>(true);
  const [burstCount, setBurstCount] = useState<number>(0);

  const activeDecision = ARCH_DECISIONS[activeIdx];

  // Particle Cannon arrays
  const sparksRef = useRef<OrbSpark[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);

  // Trigger Burst Function
  const triggerBurst = useCallback((colorOverride?: string) => {
    sound.playQuantumBurst();
    setBurstCount((c) => c + 1);

    const targetColor = colorOverride || activeDecision.color;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cx = canvas.width / (2 * (window.devicePixelRatio || 1));
    const cy = canvas.height / (2 * (window.devicePixelRatio || 1));

    // Emit 65 directional plasma sparks
    for (let i = 0; i < 65; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6.5;
      sparksRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 45,
        size: 1.5 + Math.random() * 3.8,
        color: i % 4 === 0 ? "#ffffff" : targetColor,
      });
    }

    // Emit expanding shockwave
    shockwavesRef.current.push({
      radius: 10,
      maxRadius: 130,
      alpha: 0.9,
      color: targetColor,
    });
  }, [activeDecision.color]);

  // Select decision
  const selectDecision = useCallback((idx: number) => {
    sound.playQuantumClick();
    setActiveIdx(idx);
    triggerBurst(ARCH_DECISIONS[idx].color);
  }, [triggerBurst]);

  // Auto-simulate timer
  useEffect(() => {
    if (!autoSim) return;
    const id = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % ARCH_DECISIONS.length;
        triggerBurst(ARCH_DECISIONS[next].color);
        return next;
      });
    }, 4200);
    return () => clearInterval(id);
  }, [autoSim, triggerBurst]);

  // Canvas Animation Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1;
    let w = 0;
    let h = 0;
    let time = 0;
    let raf = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Render 3D AI Orb
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const currentColor = activeDecision.color;

      // 1. Plasma Outer Aura
      const auraRadius = Math.min(w, h) * 0.42;
      const auraGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, auraRadius);
      auraGrad.addColorStop(0, `${currentColor}33`);
      auraGrad.addColorStop(0.5, `${currentColor}0f`);
      auraGrad.addColorStop(1, "transparent");
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Shockwaves
      for (let s = shockwavesRef.current.length - 1; s >= 0; s--) {
        const sw = shockwavesRef.current[s];
        sw.radius += 3.5;
        sw.alpha *= 0.94;
        ctx.beginPath();
        ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.lineWidth = 2.5;
        ctx.shadowColor = sw.color;
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        if (sw.radius >= sw.maxRadius || sw.alpha <= 0.01) {
          shockwavesRef.current.splice(s, 1);
        }
      }

      // 3. Counter-Rotating Gyroscopic Rings
      const ringConfigs = [
        { rx: 78, ry: 26, speed: 0.6, tilt: 0.25, color: currentColor },
        { rx: 94, ry: 32, speed: -0.4, tilt: -0.45, color: "#ffffff" },
        { rx: 62, ry: 20, speed: 0.9, tilt: 0.85, color: currentColor },
      ];

      for (const ring of ringConfigs) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.tilt + Math.sin(time * 0.4) * 0.1);

        ctx.beginPath();
        ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `${ring.color}44`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Traveling quantum nodes on rings
        for (let k = 0; k < 4; k++) {
          const a = time * ring.speed + (k / 4) * Math.PI * 2;
          const px = Math.cos(a) * ring.rx;
          const py = Math.sin(a) * ring.ry;

          ctx.beginPath();
          ctx.arc(px, py, k === 0 ? 3.5 : 1.8, 0, Math.PI * 2);
          ctx.fillStyle = ring.color;
          ctx.shadowColor = ring.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        ctx.restore();
      }

      // 4. Central Glowing Event Horizon / Core
      const coreR = Math.min(w, h) * 0.17;
      const pulse = 1 + Math.sin(time * 2.2) * 0.06;

      const coreGrad = ctx.createRadialGradient(
        cx - coreR * 0.25,
        cy - coreR * 0.25,
        coreR * 0.1,
        cx,
        cy,
        coreR * pulse
      );
      coreGrad.addColorStop(0, "#ffffff");
      coreGrad.addColorStop(0.3, currentColor);
      coreGrad.addColorStop(0.75, `${currentColor}55`);
      coreGrad.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(cx, cy, coreR * pulse, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.shadowColor = currentColor;
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner Singularity
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      // 5. Plasma Sparks from Burst
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const p = sparksRef.current[i];
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const lifeRatio = 1 - p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size * lifeRatio), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = Math.max(0, lifeRatio);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        if (p.life >= p.maxLife) {
          sparksRef.current.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [activeDecision]);

  const IconComponent = activeDecision.icon;

  return (
    <div className="relative glass foil rounded-3xl p-6 md:p-8 border border-cyan-500/20 overflow-hidden shadow-2xl">
      {/* Background Quantum Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f0ff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top Header HUD Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-2.5">
          <span
            className="w-3 h-3 rounded-full animate-ping"
            style={{ backgroundColor: activeDecision.color }}
          />
          <span className="font-mono text-xs tracking-[0.25em] text-[#00f0ff] uppercase flex items-center gap-2">
            AI ARCHITECTURE ORB
            <span className="px-2 py-0.5 rounded text-[9px] bg-white/10 text-white font-mono">
              BURST #{burstCount}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto Simulator Toggle */}
          <button
            onClick={() => {
              sound.playQuantumClick();
              setAutoSim((a) => !a);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] border transition-all ${
              autoSim
                ? "bg-emerald-500/10 border-emerald-400/40 text-emerald-300"
                : "bg-white/5 border-white/10 text-[var(--muted)] hover:text-white"
            }`}
          >
            {autoSim ? <Pause size={10} /> : <Play size={10} />}
            {autoSim ? "SIMULATING" : "MANUAL"}
          </button>

          {/* Trigger Burst Button */}
          <button
            onClick={() => triggerBurst()}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full font-mono text-[10px] tracking-wider text-black font-semibold shadow-lg hover:shadow-cyan-400/30 transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: activeDecision.color }}
          >
            <Sparkles size={11} /> BURST
          </button>
        </div>
      </div>

      <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive 3D Canvas Orb (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div
            onClick={() => triggerBurst()}
            className="relative cursor-pointer group flex items-center justify-center"
            title="Click to trigger architecture burst"
          >
            <canvas
              ref={canvasRef}
              className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-mono text-[10px] tracking-[0.3em] px-3 py-1 rounded-full bg-black/80 text-white border border-white/20">
                TAP TO DETONATE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-center font-mono text-[11px] text-[var(--muted)] tracking-widest mt-2">
            <RotateCw size={11} className="animate-spin-slow text-cyan-400" />
            <span>NEURAL REASONING CORE · PHASE ALIGNED</span>
          </div>
        </div>

        {/* Right: Architecture Decision Card & Blueprint (7 cols) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDecision.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-6 border border-white/10"
              style={{
                boxShadow: `0 0 30px ${activeDecision.color}15`,
              }}
            >
              {/* Category & Metric */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                    style={{
                      backgroundColor: `${activeDecision.color}22`,
                      color: activeDecision.color,
                      border: `1px solid ${activeDecision.color}44`,
                    }}
                  >
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <span
                      className="font-mono text-[10px] tracking-[0.25em] font-semibold"
                      style={{ color: activeDecision.color }}
                    >
                      {activeDecision.category} DECISION
                    </span>
                    <h3 className="font-display font-bold text-lg md:text-xl text-[var(--ink)]">
                      {isBurmese ? activeDecision.titleMM : activeDecision.title}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className="font-mono text-2xl font-bold tracking-tight"
                    style={{ color: activeDecision.color }}
                  >
                    {activeDecision.metric}
                  </div>
                  <div className="font-mono text-[9px] text-[var(--muted)] tracking-widest">
                    {activeDecision.metricLabel}
                  </div>
                </div>
              </div>

              {/* Rationale Summary */}
              <p className="text-[13px] md:text-sm text-[var(--ink)]/85 leading-relaxed mb-4">
                {isBurmese ? activeDecision.summaryMM : activeDecision.summary}
              </p>

              {/* Architecture Blueprint Stack */}
              <div className="bg-black/30 rounded-xl p-3.5 border border-white/5 mb-4">
                <div className="font-mono text-[10px] tracking-widest text-[#00f0ff] flex items-center gap-1.5 mb-2.5">
                  <Layers size={11} /> ARCHITECTURE DATA FLOW
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeDecision.layers.map((layer, lIdx) => (
                    <div key={layer} className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-white/5 text-white/90 border border-white/10">
                        {layer}
                      </span>
                      {lIdx < activeDecision.layers.length - 1 && (
                        <ChevronRight size={12} className="text-cyan-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact & Tech Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 size={13} /> {activeDecision.impact}
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {activeDecision.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-[var(--muted)] border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Decision Selector Carousel */}
          <div className="mt-5">
            <div className="font-mono text-[10px] tracking-widest text-[var(--muted)] mb-2 uppercase">
              SELECT ARCHITECTURAL SCENARIO (CLICK TO TEST)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ARCH_DECISIONS.map((dec, idx) => {
                const isCurrent = idx === activeIdx;
                return (
                  <button
                    key={dec.id}
                    onClick={() => selectDecision(idx)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl font-mono text-[11px] border text-left transition-all ${
                      isCurrent
                        ? "border-cyan-400 bg-cyan-400/15 text-white shadow-lg"
                        : "border-white/5 bg-white/[0.02] text-[var(--muted)] hover:text-white hover:border-white/20"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: dec.color }}
                    />
                    <span className="truncate">{dec.category}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
