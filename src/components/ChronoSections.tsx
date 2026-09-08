import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Menu, X, ArrowRight, ArrowUpRight, Mail, Phone, MapPin, Copy, Check,
  Download, Volume2, VolumeX, ChevronUp, Play, Pause, Clock3, CalendarClock,
  FastForward, Rewind, Code2
} from "lucide-react";
import { chrono } from "../chronoAudio";
import { c, eras, capsules, mechanisms, wings, type Capsule } from "../chronoData";
import { MasterChrono, MiniDial, Typing, CountUp, SectionHead, Layer } from "./ChronoFX";

/* ================= NAV ================= */
const NAV = [
  { id: "soma", label: "Soma" },
  { id: "eras", label: "Eras Scrub" },
  { id: "capsules", label: "Time Capsules" },
  { id: "mechanisms", label: "Mechanisms" },
  { id: "signal", label: "Signal" },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(!chrono.enabled);
  const [timeUtc, setTimeUtc] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTimeUtc(new Date().toUTCString().slice(17, 25) + " UTC");
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = () => {
      let cur = "hero";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= 200) cur = n.id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 inset-x-0 z-[70]"
      >
        <div className="mx-auto mt-3 max-w-6xl px-3">
          <div className="glass-c rounded-full pl-4 pr-2 py-2 flex items-center justify-between border border-[rgba(232,201,106,0.25)] shadow-2xl">
            <a href="#hero" className="flex items-center gap-2.5">
              <MiniDial size={38} color="#e8c96a" speed={9} />
              <span className="leading-none">
                <span className="block f-display text-[13px] tracking-widest text-[#f5f0e4]">
                  MKA<span className="brass-text font-bold">·CHRONO</span>
                </span>
                <span className="block f-mono text-[9px] tracking-[0.3em] text-[#a19a8d]">
                  TIME ENGINEER
                </span>
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-6">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => chrono.click()}
                  className={`navlink f-mono text-[11px] tracking-[0.2em] uppercase transition-colors ${
                    active === n.id ? "text-[#e8c96a] active font-semibold" : "text-[#a19a8d] hover:text-white"
                  }`}
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* UTC Live Dial */}
              <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 font-mono text-[10px] text-[#4de3ff]">
                <Clock3 size={11} className="animate-spin-slow" />
                <span>{timeUtc}</span>
              </div>

              {/* Audio Synthesizer Toggle */}
              <button
                onClick={() => {
                  const on = chrono.toggle();
                  setMuted(!on);
                }}
                aria-label="Toggle chrono audio"
                title={muted ? "Enable Synthesized Chrono Audio" : "Mute Chrono Audio"}
                className={`w-9 h-9 rounded-full glass-c flex items-center justify-center transition-colors ${
                  muted ? "text-[#a19a8d]" : "text-[#e8c96a] border-[#e8c96a]/50 shadow-md shadow-amber-500/20"
                }`}
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>

              <span className="hidden md:flex items-center gap-2 f-mono text-[10px] tracking-widest text-[#4de3ff] border border-[rgba(77,227,255,0.3)] rounded-full px-3 py-1.5 bg-[rgba(77,227,255,0.06)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4de3ff] animate-blink-c" /> TEMPORAL LOCK
              </span>

              <a
                href="#signal"
                className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 f-mono text-[11px] tracking-[0.15em] font-bold text-[#07070b] shadow-lg hover:scale-105 active:scale-95 transition-transform"
                style={{ background: "linear-gradient(120deg, #f7e8b8, #e8c96a)" }}
              >
                SIGNAL <ArrowRight size={13} />
              </a>

              <button
                onClick={() => setOpen(true)}
                className="lg:hidden w-10 h-10 rounded-full glass-c flex items-center justify-center text-[#e8c96a]"
                aria-label="Menu"
              >
                <Menu size={17} />
              </button>
            </div>
          </div>
          <motion.div
            style={{ scaleX: scrollYProgress, background: "linear-gradient(90deg, #e8c96a, #4de3ff, #a855f7)" }}
            className="h-[2px] mt-2 rounded-full origin-left"
          />
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] lg:hidden bg-[rgba(7,7,11,0.96)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
              <span className="f-display tracking-widest text-[#f5f0e4]">MKA·CHRONO</span>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 rounded-full glass-c flex items-center justify-center text-[#f5f0e4]"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>
            <nav className="px-8 py-6 flex flex-col gap-2">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-4 border-b border-[rgba(232,201,106,0.12)] f-display text-xl flex justify-between items-center text-[#f5f0e4]"
                >
                  {n.label}
                  <span className="f-mono text-xs text-[#e8c96a]">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= HERO ================= */
export function Hero() {
  const { scrollY } = useScroll();
  const yTxt = useTransform(scrollY, [0, 700], [0, 80]);
  const yClock = useTransform(scrollY, [0, 700], [0, -110]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        {/* Shifting Left UI Layer */}
        <motion.div style={{ y: yTxt }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 glass-c rounded-full pl-2 pr-4 py-1.5 mb-6 border border-[rgba(232,201,106,0.3)] shadow-lg"
          >
            <span
              className="f-mono text-[10px] tracking-[0.2em] px-2.5 py-1 rounded-full text-[#07070b] font-bold"
              style={{ background: "linear-gradient(120deg, #f7e8b8, #e8c96a)" }}
            >
              ✧ CHRONO-SHIFT
            </span>
            <span className="f-mono text-[10px] tracking-[0.25em] text-[#f7e8b8]">
              TIME ENGINEER · {c.role.toUpperCase()}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="f-display leading-[0.96] tracking-tight text-[clamp(2.5rem,6.8vw,5.2rem)]"
          >
            Moe Kyaw<br />
            <span className="brass-text glow-brass">Aung</span>
            <span className="f-serif italic font-normal text-[clamp(1.3rem,3.2vw,2.2rem)] text-[#a19a8d] block mt-2">
              engineering time into software.
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-5">
            <Typing phrases={c.roles} className="f-mono text-base md:text-lg text-[#4de3ff]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-5 max-w-xl text-[#a19a8d] leading-relaxed text-sm md:text-base"
          >
            {c.tagline} Senior Android platforms designed with Clean Architecture, offline-first Room DB, and edge AI — currently accelerating{" "}
            <span className="text-white font-medium">{c.building}</span>. {c.location}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#eras"
              onClick={() => chrono.warp()}
              className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 f-mono text-[12px] tracking-[0.15em] font-bold text-[#07070b] hover:scale-[1.03] active:scale-95 transition-transform"
              style={{
                background: "linear-gradient(120deg, #f7e8b8, #e8c96a)",
                boxShadow: "0 10px 34px rgba(232,201,106,0.32)",
              }}
            >
              SCRUB THE TIMELINE <FastForward size={15} />
            </a>
            <a
              href={c.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 glass-c f-mono text-[12px] tracking-[0.15em] text-[#f5f0e4] hover:border-[#e8c96a] transition-colors"
            >
              <Download size={15} /> GITHUB ARCHIVE
            </a>
          </motion.div>

          {/* Temporal Stats Card */}
          <div className="grid grid-cols-4 gap-2.5 mt-10 max-w-xl">
            {c.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + i * 0.08 }}
                className="glass-c rounded-2xl px-2 py-3.5 text-center border border-[rgba(232,201,106,0.18)]"
              >
                <div className="f-display text-xl md:text-2xl brass-text tabular-nums">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="f-mono text-[9px] tracking-[0.18em] text-[#f5f0e4] mt-1 uppercase">{s.label}</div>
                <div className="f-mono text-[8px] tracking-[0.14em] text-[#a19a8d]">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Shifting Right UI Layer (Master Chronograph Engine) */}
        <motion.div
          style={{ y: yClock }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="relative flex justify-center"
        >
          <div className="relative">
            <MasterChrono size={380} />

            {/* Bottom Horizon Window Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-c-glow rounded-2xl px-5 py-3 flex items-center gap-3 whitespace-nowrap shadow-xl">
              <CalendarClock size={16} className="text-[#e8c96a] animate-pulse" />
              <span className="f-mono text-[11px] tracking-[0.2em] text-[#f5f0e4]">
                ACTIVE HORIZON: <span className="text-[#e8c96a] font-bold">2026 · FRONTIER</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 f-mono text-[9px] tracking-[0.4em] text-[#a19a8d] flex flex-col items-center gap-1.5"
      >
        <span>WIND DOWN TIMELINE</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#e8c96a] to-transparent" />
      </motion.div>
    </section>
  );
}

/* ================= SOMA ================= */
export function Soma() {
  const code = [
    { p: "$ calibrate --soma mka", c: "text-[#e8c96a]" },
    { p: "nucleus: senior android · time engineer", c: "text-white/85" },
    { p: "mainspring → kotlin · compose · mvvm · clean", c: "text-[#a19a8d]" },
    { p: "power reserve → firebase · rest · python", c: "text-[#a19a8d]" },
    { p: "escapement → hacking · on-device ml · tflite", c: "text-[#a19a8d]" },
    { p: "$ echo $credo", c: "text-[#e8c96a]" },
    { p: `"${c.philosophy}"`, c: "text-[#4de3ff]" },
  ];

  return (
    <section id="soma" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Layer speed={26}>
          <SectionHead
            eyebrow="01 · SOMA HOROLOGY"
            title="The watchmaker,"
            accent="the mechanism"
            sub="From Tachileik to Bangkok — Android systems tuned like chronometers: sub-16ms frames, isolated clean architecture layers, and on-device machine intelligence."
          />
        </Layer>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <Layer speed={-25}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="glass-c rounded-3xl overflow-hidden relative min-h-[420px] border border-[rgba(232,201,106,0.22)]"
            >
              <img
                src={c.portrait2}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 15%, rgba(7,7,11,0.95))" }}
              />

              <div className="relative p-7 md:p-9 flex flex-col justify-end min-h-[420px]">
                <div className="flex items-center gap-2 f-mono text-[10px] tracking-[0.3em] text-[#e8c96a] mb-3">
                  <Clock3 size={13} /> CALIBRATED SPECIMEN · MKA-2026
                </div>
                <h3 className="f-display text-2xl md:text-3xl leading-tight text-[#f5f0e4]">
                  Full-spectrum engineer — from <span className="text-[#e8c96a]">frame-pacing</span> to{" "}
                  <span className="text-[#4de3ff]">automated pipelines</span> to{" "}
                  <span className="text-[#2ef2c8]">private on-device AI</span>.
                </h3>
                <p className="mt-4 text-[#a19a8d] leading-relaxed text-[15px]">
                  82+ verified credentials across 9 wings, but the definitive metric: high-availability mobile platforms that hold their tempo under enterprise loads.
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {["Burmese 🇲🇲", "English 🌐", "Kotlin ☕"].map((l) => (
                    <span
                      key={l}
                      className="f-mono text-[10px] tracking-widest px-3 py-1.5 rounded-full glass-c text-[#f7e8b8] border border-[rgba(232,201,106,0.25)]"
                    >
                      ✧ {l}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Layer>

          <Layer speed={25}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl overflow-hidden border border-[rgba(232,201,106,0.2)] h-full bg-[rgba(12,13,20,0.9)]"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(232,201,106,0.14)] bg-white/[0.02]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff2975]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb347]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#4de3ff]/80" />
                <span className="ml-2 f-mono text-[10px] text-[#a19a8d] tracking-widest">
                  mka@chrono ~/soma-status
                </span>
              </div>
              <div className="p-6 f-mono text-[12.5px] leading-8">
                {code.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={l.c}
                  >
                    {l.p}
                  </motion.div>
                ))}
                <span className="text-[#e8c96a] animate-blink-c">▍</span>
              </div>
              <div className="px-6 pb-6 grid grid-cols-3 gap-2">
                {[
                  { k: "ESCAPEMENT", v: "Clean Arch" },
                  { k: "CHRONO.AI", v: "TFLite 32ms" },
                  { k: "BARREL", v: "82+ ticks" },
                ].map((f) => (
                  <div key={f.k} className="rounded-2xl glass-c p-3 text-center border border-white/5">
                    <div className="f-mono text-[9px] tracking-[0.2em] text-[#a19a8d]">{f.k}</div>
                    <div className="text-[12px] font-medium mt-1 text-[#f5f0e4]">{f.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </Layer>
        </div>
      </div>
    </section>
  );
}

/* ================= ERAS — TIMELINE SCRUBBER ================= */
const warpVariants = {
  initial: { opacity: 0, scale: 1.08, rotateX: 10, filter: "blur(14px) hue-rotate(80deg)" },
  animate: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px) hue-rotate(0deg)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, scale: 0.9, filter: "blur(12px) hue-rotate(-70deg)", transition: { duration: 0.3 } },
} as const;

export function Eras() {
  const [pos, setPos] = useState(0.9);
  const [dragging, setDragging] = useState(false);
  const [playing, setPlaying] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dirRef = useRef(1);

  const eraIdx = Math.min(3, Math.max(0, Math.round(pos * 3)));
  const era = eras[eraIdx];
  const yearValue = 2023 + pos * 3;

  const setFromClientX = useCallback((clientX: number) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(1, Math.max(0, (clientX - r.left) / r.width)));
  }, []);

  // External scrub commands from Time Navigator AI
  useEffect(() => {
    const h = (e: Event) => {
      const yr = (e as CustomEvent<number>).detail;
      const idx = eras.findIndex((er) => er.yr === yr);
      if (idx >= 0) setPos(idx / 3);
    };
    window.addEventListener("chrono:scrub", h);
    return () => window.removeEventListener("chrono:scrub", h);
  }, []);

  // Pointer drag
  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setFromClientX(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging, setFromClientX]);

  // Auto-play ping-pong scrub
  useEffect(() => {
    if (!playing) return;
    let raf = 0, last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setPos((p) => {
        let np = p + dirRef.current * dt * 0.12;
        if (np >= 1) {
          np = 1;
          dirRef.current = -1;
          chrono.chime();
        }
        if (np <= 0) {
          np = 0;
          dirRef.current = 1;
          chrono.chime();
        }
        return np;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  return (
    <section id="eras" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHead
          eyebrow="02 · TIMELINE SCRUB"
          title="The four"
          accent="windows of evolution"
          sub="Grab the chrono cursor and drag through 2023 → 2026. The UI warps through space-time — every stop reveals an evolutionary epoch."
        />

        <div className="glass-c-glow rounded-[2rem] p-6 md:p-10 relative overflow-hidden border border-[rgba(232,201,106,0.3)] shadow-2xl">
          {/* Era-tinted Ambience Light */}
          <motion.div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
            animate={{ background: `radial-gradient(circle, ${era.color}26, transparent 65%)` }}
            transition={{ duration: 0.8 }}
          />

          {/* Year Dial & Content */}
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-center relative">
            <div className="flex flex-col items-center gap-3 mx-auto">
              <div className="relative w-[190px] h-[190px]">
                <svg viewBox="0 0 190 190" className="w-full h-full">
                  <circle cx="95" cy="95" r="90" fill="rgba(12,13,20,0.8)" stroke="rgba(232,201,106,0.4)" strokeWidth="1.6" />
                  {Array.from({ length: 12 }).map((_, i) => {
                    const a = (i / 12) * Math.PI * 2;
                    return (
                      <line
                        key={i}
                        x1={95 + Math.cos(a) * 76}
                        y1={95 + Math.sin(a) * 76}
                        x2={95 + Math.cos(a) * 85}
                        y2={95 + Math.sin(a) * 85}
                        stroke="rgba(247,232,184,0.6)"
                        strokeWidth={i % 3 === 0 ? 2 : 1.2}
                        strokeLinecap="round"
                      />
                    );
                  })}
                  {eras.map((e, i) => {
                    const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
                    return (
                      <text
                        key={e.yr}
                        x={95 + Math.cos(a) * 62}
                        y={95 + Math.sin(a) * 62 + 4}
                        textAnchor="middle"
                        fontSize="11"
                        fill={eraIdx === i ? e.color : "rgba(161,154,141,0.7)"}
                        style={{ fontFamily: "IBM Plex Mono, monospace" }}
                      >
                        {e.yr}
                      </text>
                    );
                  })}
                  <g
                    style={{
                      transformOrigin: "95px 95px",
                      transform: `rotate(${pos * 360}deg)`,
                      transition: "transform 0.4s cubic-bezier(0.2,0.8,0.2,1)",
                    }}
                  >
                    <line
                      x1="95"
                      y1="95"
                      x2="95"
                      y2="32"
                      stroke={era.color}
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      style={{ filter: `drop-shadow(0 0 6px ${era.color})` }}
                    />
                  </g>
                  <circle cx="95" cy="95" r="6" fill="#07070b" stroke={era.color} strokeWidth="1.6" />
                  <circle cx="95" cy="95" r="2" fill={era.color} />
                </svg>
              </div>

              <div className="text-center">
                <div className="f-display text-4xl brass-text tabular-nums">{yearValue.toFixed(2)}</div>
                <div className="f-mono text-[10px] tracking-[0.3em] text-[#a19a8d] mt-1">TIMESTAMP COORDINATE</div>
              </div>
            </div>

            {/* Time-Warp Content Stage */}
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={era.key}
                  variants={warpVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ perspective: 900 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="f-mono text-[10px] tracking-[0.3em] px-3 py-1.5 rounded-full border font-bold"
                      style={{ color: era.color, borderColor: `${era.color}55`, background: `${era.color}15` }}
                    >
                      {era.phase}
                    </span>
                    <span className="f-mono text-[10px] tracking-[0.2em] text-[#a19a8d]">
                      INTEGRITY: {era.integrity}
                    </span>
                  </div>

                  <h3 className="f-display text-2xl md:text-4xl leading-tight text-[#f5f0e4]">{era.title}</h3>
                  <p className="f-serif italic text-lg md:text-2xl mt-2" style={{ color: era.color }}>
                    {era.subtitle}
                  </p>
                  <p className="text-[#a19a8d] leading-relaxed mt-4 max-w-xl text-sm md:text-base">{era.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {era.feats.map((f) => (
                      <span
                        key={f}
                        className="f-mono text-[10px] tracking-wider px-3 py-1.5 rounded-lg border border-[rgba(232,201,106,0.2)] text-[#f7e8b8] flex items-center gap-1.5 bg-white/[0.02]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: era.color }} />
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Physical Chrono Scrubber Track */}
          <div className="relative mt-10">
            <div className="ticks h-8 rounded-full opacity-60" />
            <div
              ref={trackRef}
              onPointerDown={(e) => {
                setDragging(true);
                setPlaying(false);
                chrono.tick(true);
                setFromClientX(e.clientX);
              }}
              className="scrub-track scrub-cursor relative mt-2 h-14 rounded-full glass-c flex items-center px-2 border border-[rgba(232,201,106,0.25)]"
            >
              <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-none"
                  style={{
                    width: `${pos * 100}%`,
                    background: `linear-gradient(90deg, ${eras[0].color}, ${era.color})`,
                    boxShadow: `0 0 14px ${era.color}`,
                  }}
                />
              </div>

              {/* Era Notches */}
              {eras.map((e, i) => (
                <button
                  key={e.yr}
                  onClick={() => {
                    chrono.tick(true);
                    setPlaying(false);
                    setPos(i / 3);
                  }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 group"
                  style={{ left: `${(i / 3) * 100}%` }}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border-2 transition-all group-hover:scale-125"
                    style={{
                      background: "#07070b",
                      borderColor: eraIdx === i ? era.color : "#4a4538",
                      boxShadow: eraIdx === i ? `0 0 12px ${era.color}` : "none",
                    }}
                  />
                  <span
                    className="f-mono text-[9px] tracking-widest font-bold"
                    style={{ color: eraIdx === i ? era.color : "#6d665b" }}
                  >
                    {e.yr}
                  </span>
                </button>
              ))}

              {/* Scrubber Knob */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
                style={{ left: `${pos * 100}%` }}
              >
                <div
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center shadow-xl"
                  style={{
                    background: "linear-gradient(140deg, #fcedc5, #b98d3a)",
                    borderColor: "#f7e8b8",
                    boxShadow: `0 0 26px ${era.color}`,
                  }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#07070b]" />
                </div>
              </div>
            </div>

            {/* Bottom Scrubber Telemetry Controls */}
            <div className="flex items-center justify-between mt-3 f-mono text-[10px] tracking-[0.25em] text-[#a19a8d]">
              <span className="flex items-center gap-1">
                <Rewind size={11} className="text-[#e8c96a]" /> 2023 · IGNITION
              </span>
              <button
                onClick={() => {
                  setPlaying((p) => !p);
                  chrono.click();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-c text-[#f7e8b8] hover:border-[#e8c96a] transition-all shadow-md"
              >
                {playing ? <Pause size={12} /> : <Play size={12} />} {playing ? "PAUSE AUTO-SCRUB" : "AUTO-SCRUB PLAYBACK"}
              </button>
              <span className="flex items-center gap-1">
                2026 · FRONTIER <FastForward size={11} className="text-[#e8c96a]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CAPSULES ================= */
export function Capsules() {
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);

  const openCapsule = (cp: Capsule) => {
    chrono.ripple();
    setSelectedCapsule(cp);
  };

  return (
    <section id="capsules" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Layer speed={22}>
          <SectionHead
            eyebrow="03 · TIME CAPSULES"
            title="Sealed"
            accent="artifacts"
            sub="Every project is a time capsule sealed in an obsidian casing. Breaking the temporal latch unleashes physical ripple distortions across space-time."
          />
        </Layer>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capsules.map((cp, i) => (
            <motion.button
              key={cp.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.07, duration: 0.5 }}
              onClick={() => openCapsule(cp)}
              className="capsule text-left glass-c rounded-[1.6rem] overflow-hidden group cursor-pointer"
            >
              {/* Ripple animation on card hover */}
              <span className="capsule-hover-ripple" />

              {/* Cap latch strip */}
              <div
                className="relative flex items-center justify-between px-4 py-2.5 border-b border-white/5"
                style={{ background: `linear-gradient(90deg, ${cp.color}1f, transparent)` }}
              >
                <span className="f-mono text-[9px] tracking-[0.25em] font-bold" style={{ color: cp.color }}>
                  SEAL · {cp.eraLabel}
                </span>
                <span className="flex items-center gap-2">
                  <span className="f-mono text-[9px] tracking-widest text-[#a19a8d]">{cp.serial}</span>
                  <span className="latch inline-block w-7 h-3 rounded-full border border-[rgba(232,201,106,0.6)] relative bg-black/40">
                    <span className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-px bg-[#e8c96a]" />
                  </span>
                </span>
              </div>

              <div className="px-5 pb-5 pt-3">
                <div className="flex items-center gap-3 mb-2.5">
                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform"
                    style={{ background: `${cp.color}18`, color: cp.color, border: `1px solid ${cp.color}44` }}
                  >
                    <i className={`${cp.icon} text-base`} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="f-display text-[15px] leading-snug truncate text-[#f5f0e4] group-hover:text-[#e8c96a] transition-colors">
                      {cp.title}
                    </h3>
                    <div className="f-mono text-[9px] tracking-[0.2em] text-[#a19a8d]">
                      EPOCH · {cp.yr}
                    </div>
                  </div>
                </div>

                <p className="text-[12.5px] text-[#a19a8d] leading-relaxed line-clamp-2 min-h-[38px]">
                  {cp.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {cp.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="f-mono text-[9px] tracking-wider px-2 py-1 rounded-md border border-white/10 text-[#f7e8b8] bg-white/[0.02]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[rgba(232,201,106,0.14)]">
                  <span className="f-mono text-[9px] tracking-[0.2em] text-[#a19a8d]">
                    INTEGRITY: <span style={{ color: cp.color }}>{cp.integrity}</span>
                  </span>
                  <span className="f-mono text-[10px] tracking-[0.2em] text-[#f5f0e4] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-bold">
                    UNSEAL <ArrowUpRight size={12} style={{ color: cp.color }} />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Capsule Unseal Modal with Concentric Ripple Distortions */}
      <AnimatePresence>
        {selectedCapsule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-[rgba(3,3,6,0.85)] backdrop-blur-xl"
            onClick={() => setSelectedCapsule(null)}
          >
            {/* 3 Expanding Ripple Distortion Shockwaves */}
            <div className="absolute w-[440px] h-[440px] pointer-events-none">
              <span className="ripple-ring-1" />
              <span className="ripple-ring-2" />
              <span className="ripple-ring-3" />
            </div>

            <motion.div
              initial={{ scale: 1.08, opacity: 0, filter: "blur(20px) contrast(150%) hue-rotate(60deg)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px) contrast(100%) hue-rotate(0deg)" }}
              exit={{ scale: 0.92, opacity: 0, filter: "blur(12px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg glass-c-glow rounded-[2rem] overflow-hidden max-h-[88vh] overflow-y-auto hide-scroll border border-[rgba(232,201,106,0.4)] shadow-2xl warp-distortion"
            >
              <div
                className="relative px-5 py-3.5 flex items-center justify-between border-b border-white/10"
                style={{ background: `linear-gradient(90deg, ${selectedCapsule.color}28, transparent)` }}
              >
                <span className="f-mono text-[10px] tracking-[0.3em] font-bold" style={{ color: selectedCapsule.color }}>
                  ARTIFACT UNSEALED · TEMPORAL COHERENCE
                </span>
                <button
                  onClick={() => {
                    chrono.tick(true);
                    setSelectedCapsule(null);
                  }}
                  className="w-8 h-8 rounded-full glass-c flex items-center justify-center text-[#a19a8d] hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3.5 mb-4">
                  <span
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl"
                    style={{
                      background: `${selectedCapsule.color}20`,
                      color: selectedCapsule.color,
                      border: `1px solid ${selectedCapsule.color}44`,
                      boxShadow: `0 0 28px ${selectedCapsule.color}33`,
                    }}
                  >
                    <i className={`${selectedCapsule.icon} text-2xl`} />
                  </span>
                  <div>
                    <div className="f-mono text-[9px] tracking-[0.3em] text-[#a19a8d]">
                      {selectedCapsule.serial} · WINDOW {selectedCapsule.yr} · {selectedCapsule.eraLabel}
                    </div>
                    <h3 className="f-display text-2xl text-[#f5f0e4] font-bold">{selectedCapsule.title}</h3>
                  </div>
                </div>

                <p className="text-[14px] text-[#a19a8d] leading-relaxed">{selectedCapsule.desc}</p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {selectedCapsule.tech.map((t) => (
                    <span
                      key={t}
                      className="f-mono text-[10px] px-2.5 py-1 rounded-lg border font-medium"
                      style={{
                        borderColor: `${selectedCapsule.color}44`,
                        color: selectedCapsule.color,
                        background: `${selectedCapsule.color}0d`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Telemetry Matrix */}
                <div className="grid grid-cols-3 gap-2 mt-5 f-mono text-center text-[10px]">
                  {[
                    ["INTEGRITY", selectedCapsule.integrity],
                    ["DECAY", "0.00%"],
                    ["STATE", "DEPLOYABLE"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-black/40 border border-white/10 py-2.5">
                      <div className="text-[#f5f0e4] text-sm font-bold">{v}</div>
                      <div className="text-[#a19a8d] tracking-[0.2em] text-[9px]">{k}</div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2.5 mt-6">
                  <a
                    href={selectedCapsule.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center rounded-full py-3 f-mono text-[11px] tracking-[0.2em] font-bold text-[#07070b] hover:scale-[1.02] active:scale-95 transition-transform shadow-lg flex items-center justify-center gap-2"
                    style={{ background: `linear-gradient(120deg, ${selectedCapsule.color}, #f7e8b8)` }}
                  >
                    <Code2 size={13} /> RETRIEVE SOURCE
                  </a>
                  <a
                    href={c.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-full glass-c f-mono text-[11px] tracking-[0.2em] hover:border-[#e8c96a] text-[#f5f0e4]"
                  >
                    PROFILE
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ================= MECHANISMS ================= */
export function Mechanisms() {
  return (
    <section id="mechanisms" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHead
          eyebrow="04 · HOROLOGICAL MECHANISMS"
          title="The clock's"
          accent="gears & escapements"
          sub="Eight mechanical movements maintain Moe's chronometry — each gear calibrated to an exact beat rate and power reserve."
        />

        <div className="grid md:grid-cols-2 gap-4">
          {mechanisms.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 2) * 0.08 }}
              className="glass-c rounded-2xl p-5 flex items-center gap-4 group relative overflow-hidden border border-[rgba(232,201,106,0.18)]"
            >
              <div
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity"
                style={{ background: m.color }}
              />
              <MiniDial size={52} color={m.color} speed={7 + i} reverse={i % 2 === 1} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="f-mono text-[9px] tracking-[0.25em]" style={{ color: m.color }}>
                    {m.tag}
                  </span>
                  <span className="f-display text-lg tabular-nums" style={{ color: m.color }}>
                    {m.level}%
                  </span>
                </div>
                <h4 className="f-display text-[15px] truncate text-[#f5f0e4] font-semibold">{m.name}</h4>
                <p className="f-mono text-[9px] tracking-widest text-[#a19a8d] mt-0.5 mb-2.5">{m.note}</p>

                <div className="ticks h-1.5 rounded-full bg-white/5 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.3, delay: 0.2 }}
                    className="h-full rounded-full relative"
                    style={{ background: `linear-gradient(90deg, ${m.color}55, ${m.color})`, boxShadow: `0 0 12px ${m.color}` }}
                  >
                    <span className="absolute right-0 -top-1 w-3.5 h-3.5 rounded-full bg-white shadow-md" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 9 Verified Wings Archive Badges */}
        <div className="mt-16 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {wings.map((w, i) => (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="glass-c rounded-2xl p-3 text-center border border-white/5"
            >
              <i className={`${w.icon} text-[#e8c96a]`} />
              <div className="f-display text-lg mt-1 text-[#f5f0e4] font-bold">{w.count}</div>
              <div className="f-mono text-[8px] tracking-[0.14em] text-[#a19a8d] uppercase">{w.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= SIGNAL ================= */
export function Signal() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(c.email);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="signal" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHead
          eyebrow="05 · TEMPORAL CHANNEL"
          title="Transmit a"
          accent="signal"
          sub="Senior Android Engineering, edge AI architectures, enterprise scale. The channel is locked — latency near zero."
        />

        <div className="glass-c-glow rounded-[2rem] p-7 md:p-10 relative overflow-hidden border border-[rgba(232,201,106,0.3)] shadow-2xl">
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(232,201,106,0.18), transparent 65%)", filter: "blur(40px)" }}
          />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="f-serif italic text-3xl md:text-[2.6rem] leading-[1.1] text-[#f5f0e4]">
                Let's synchronize <span className="brass-text not-italic f-display">our timelines.</span>
              </p>
              <p className="text-[#a19a8d] mt-4 max-w-sm text-sm md:text-base leading-relaxed">
                Every transmission crosses within one rotation of the hour hand — always with engineering precision.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${c.email}`}
                  className="flex items-center gap-3.5 p-4 rounded-2xl glass-c hover:border-[#e8c96a] transition-colors group"
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(232,201,106,0.14)", color: "#e8c96a" }}
                  >
                    <Mail size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block f-mono text-[9px] tracking-[0.25em] text-[#a19a8d]">EMAIL CHANNEL</span>
                    <span className="block text-sm truncate text-[#f5f0e4] font-mono">{c.email}</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      copy();
                    }}
                    aria-label="Copy email"
                    className="w-8 h-8 rounded-lg glass-c flex items-center justify-center text-[#a19a8d] hover:text-white"
                  >
                    {copied ? <Check size={14} className="text-[#2ef2c8]" /> : <Copy size={14} />}
                  </button>
                </a>

                <a
                  href={`tel:${c.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3.5 p-4 rounded-2xl glass-c hover:border-[#4de3ff] transition-colors"
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(77,227,255,0.14)", color: "#4de3ff" }}
                  >
                    <Phone size={16} />
                  </span>
                  <span>
                    <span className="block f-mono text-[9px] tracking-[0.25em] text-[#a19a8d]">VOICE CHANNEL</span>
                    <span className="block text-sm text-[#f5f0e4] font-mono">{c.phone}</span>
                  </span>
                </a>

                <div className="flex items-center gap-3.5 p-4 rounded-2xl glass-c">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(46,242,200,0.12)", color: "#2ef2c8" }}
                  >
                    <MapPin size={16} />
                  </span>
                  <span className="text-sm text-[#f5f0e4]">{c.location}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="f-mono text-[10px] tracking-[0.3em] text-[#a19a8d] mb-4 text-center">
                — TEMPORAL CONSTELLATION —
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {c.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-c rounded-2xl p-3.5 flex items-center gap-3 hover:border-[#e8c96a] hover:-translate-y-0.5 transition-all group"
                  >
                    <i className={`${s.icon} text-[#e8c96a] group-hover:scale-110 transition-transform`} />
                    <span className="f-mono text-[11px] tracking-widest text-[#f5f0e4]">{s.name}</span>
                  </a>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[rgba(232,201,106,0.16)] bg-black/40 p-5 text-center">
                <Clock3 size={18} className="mx-auto text-[#e8c96a]/70 mb-2 animate-pulse" />
                <p className="f-serif italic text-lg text-[#f5f0e4]">“{c.philosophy}”</p>
                <div className="mt-3 f-mono text-[9px] tracking-[0.3em] text-[#a19a8d]">
                  SYNCHRONIZED · SEQUENCED · SENTIENT-ISH
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */
export function Footer() {
  return (
    <footer className="relative border-t border-[rgba(232,201,106,0.14)] bg-[rgba(5,5,8,0.9)]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-12 pb-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <span className="f-display tracking-[0.25em] text-[#f5f0e4] font-bold">
          MKA<span className="brass-text">·CHRONO</span>
        </span>
        <div className="flex flex-wrap justify-center gap-5">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="f-mono text-[10px] tracking-[0.25em] text-[#a19a8d] hover:text-[#e8c96a] uppercase transition-colors"
            >
              {n.label}
            </a>
          ))}
        </div>
      </div>

      <div className="text-center select-none pointer-events-none leading-none overflow-hidden py-4">
        <span
          className="f-display text-[clamp(3.4rem,15vw,12rem)] text-transparent font-black"
          style={{ WebkitTextStroke: "1px rgba(232,201,106,0.14)" }}
        >
          TICK·TOCK
        </span>
      </div>

      <div className="text-center pb-8 f-mono text-[10px] tracking-[0.2em] text-[#a19a8d]">
        © 2026 {c.name} · {c.philosophy} · TEMPORAL INTEGRITY 99.98%
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.button
      aria-label="Back to top"
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 14, pointerEvents: show ? "auto" : "none" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 left-5 z-[70] w-11 h-11 rounded-full glass-c flex items-center justify-center text-[#e8c96a] shadow-lg border border-[#e8c96a]/40"
    >
      <ChevronUp size={18} />
    </motion.button>
  );
}
