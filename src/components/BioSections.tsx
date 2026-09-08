import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll } from "framer-motion";
import {
  Menu, X, ArrowRight, ArrowUpRight, Mail, Phone, MapPin, Copy, Check,
  Dna, Brain, Cpu, Sparkles, FlaskConical, Microscope, ChevronUp, Download, Activity, Zap,
} from "lucide-react";
import { bio, clusters, pathways, tape, wings, growth, type Cluster } from "../bioData";

/* ================= primitives ================= */

export function Typing({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const [txt, setTxt] = useState("");
  const [pi, setPi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = phrases[pi % phrases.length];
    let d = del ? 28 : 66;
    if (!del && txt === full) d = 1700;
    if (del && txt === "") d = 260;
    const id = setTimeout(() => {
      if (!del && txt === full) { setDel(true); return; }
      if (del && txt === "") { setDel(false); setPi((p) => (p + 1) % phrases.length); return; }
      setTxt(full.slice(0, txt.length + (del ? -1 : 1)));
    }, d);
    return () => clearTimeout(id);
  }, [txt, del, pi, phrases]);
  return <span className={`caret-bio ${className}`}>{txt || " "}</span>;
}

export function CountUp({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1500);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref} className={className}>{v}{suffix}</span>;
}

export function SectionHead({ eyebrow, title, accent, sub }: { eyebrow: string; title: string; accent: string; sub?: string }) {
  return (
    <div className="mb-12 md:mb-16 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="f-mono text-[11px] tracking-[0.4em] text-[#2ef2c8] mb-4 flex items-center gap-3">
        <span className="w-8 h-px bg-gradient-to-r from-[#2ef2c8] to-transparent" />{eyebrow}
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="f-display font-bold leading-[1.02] text-[clamp(2rem,5vw,3.6rem)]">
        {title} <span className="f-serif italic font-normal bio-text">{accent}</span>
      </motion.h2>
      {sub && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-4 text-[#8fb8a8] text-base md:text-lg leading-relaxed">{sub}</motion.p>}
    </div>
  );
}

export function Tape() {
  const row = [...tape, ...tape];
  return (
    <div className="relative overflow-hidden border-y border-[rgba(46,242,200,0.15)] bg-[rgba(3,14,11,0.7)] py-3.5 select-none">
      <style>{`@keyframes bio-marquee { to { transform: translateX(-50%); } }`}</style>
      <div className="flex w-max" style={{ animation: "bio-marquee 30s linear infinite" }}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 f-mono text-[11px] tracking-[0.3em] text-[#8fb8a8] whitespace-nowrap">
            {t}<span className="text-[#2ef2c8]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================= nav ================= */

const NAV = [
  { id: "soma", label: "Soma" },
  { id: "pathways", label: "Pathways" },
  { id: "clusters", label: "Clusters" },
  { id: "growth", label: "Growth" },
  { id: "archive", label: "Archive" },
  { id: "signal", label: "Signal" },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const [sc, setSc] = useState(false);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => {
      setSc(window.scrollY > 24);
      let cur = "hero";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= 220) cur = n.id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      <motion.header initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}
        className="fixed top-0 inset-x-0 z-[70]">
        <div className={`mx-auto mt-3 max-w-6xl px-3 transition-all ${sc ? "" : ""}`}>
          <div className="membrane rounded-full pl-4 pr-2 py-2 flex items-center justify-between" style={{ borderRadius: 999 }}>
            <a href="#hero" className="flex items-center gap-2.5">
              <span className="relative w-9 h-9 block">
                <span className="absolute inset-0 rounded-full animate-morph block" style={{ background: "radial-gradient(circle at 35% 30%, #fff, #2ef2c8 45%, #04120e 80%)", boxShadow: "0 0 16px rgba(46,242,200,0.7)" }} />
                <span className="absolute inset-0 flex items-center justify-center f-display text-[10px] font-bold text-[#02120c]">M</span>
              </span>
              <span className="leading-none">
                <span className="block f-display font-bold text-[13px] tracking-widest">MKA·BIO</span>
                <span className="block f-mono text-[9px] tracking-[0.3em] text-[#8fb8a8]">NEURAL STRAIN</span>
              </span>
            </a>
            <nav className="hidden lg:flex items-center gap-6">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} className={`navlink f-mono text-[11px] tracking-[0.2em] uppercase ${active === n.id ? "text-[#2ef2c8] active" : "text-[#8fb8a8] hover:text-white"}`}>{n.label}</a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <span className="hidden md:flex items-center gap-2 f-mono text-[10px] tracking-widest text-[#b8ff5c] border border-[rgba(184,255,92,0.3)] rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b8ff5c] animate-blink-soft" /> VIABLE · HIREABLE
              </span>
              <a href="#signal" className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 f-mono text-[11px] tracking-[0.15em] font-bold text-[#02120c]" style={{ background: "linear-gradient(120deg,#2ef2c8,#4de3ff)" }}>
                SIGNAL <ArrowRight size={13} />
              </a>
              <button onClick={() => setOpen(true)} className="lg:hidden w-10 h-10 rounded-full membrane-soft flex items-center justify-center" aria-label="Menu"><Menu size={17} /></button>
            </div>
          </div>
          <motion.div style={{ scaleX: scrollYProgress, background: "linear-gradient(90deg,#2ef2c8,#4de3ff,#9d7bff)" }} className="h-[2px] mt-2 rounded-full origin-left" />
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] lg:hidden" style={{ background: "rgba(2,8,6,0.92)", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center justify-between px-6 h-20">
              <span className="f-display font-bold tracking-widest">MKA·BIO</span>
              <button onClick={() => setOpen(false)} className="w-10 h-10 rounded-full membrane-soft flex items-center justify-center" aria-label="Close"><X size={17} /></button>
            </div>
            <nav className="px-8 flex flex-col gap-1">
              {NAV.map((n, i) => (
                <motion.a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="py-4 border-b border-[rgba(46,242,200,0.12)] f-display text-2xl flex justify-between items-center">
                  {n.label}<span className="f-mono text-xs text-[#2ef2c8]">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= hero ================= */

function Vitals() {
  return (
    <div className="membrane rounded-2xl p-4">
      <div className="flex items-center justify-between f-mono text-[10px] tracking-[0.25em] text-[#8fb8a8] mb-2">
        <span className="flex items-center gap-2"><Activity size={12} className="text-[#2ef2c8]" /> VITALS · LIVE</span>
        <span className="text-[#b8ff5c]">72 BPM</span>
      </div>
      <svg viewBox="0 0 300 60" className="w-full h-12">
        <path d="M0 30 H90 L100 30 L108 12 L118 48 L126 22 L132 30 H180 L188 30 L194 18 L204 44 L210 30 H300"
          fill="none" stroke="#2ef2c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 6px #2ef2c8)", strokeDasharray: 320, animation: "ecg 3s linear infinite" }} />
      </svg>
      <div className="grid grid-cols-3 gap-2 mt-2 f-mono text-center">
        {[["O₂", "98%"], ["ATP", "HIGH"], ["pH", "7.4"]].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-black/25 border border-[rgba(46,242,200,0.12)] py-1.5">
            <div className="text-[9px] text-[#8fb8a8] tracking-[0.2em]">{k}</div>
            <div className="text-[12px] text-[#e9fff4]">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 membrane rounded-full pl-2 pr-4 py-1.5 mb-6">
            <span className="f-mono text-[10px] tracking-[0.2em] px-2.5 py-1 rounded-full text-[#02120c] font-bold" style={{ background: "linear-gradient(120deg,#2ef2c8,#b8ff5c)" }}>● LIVE CULTURE</span>
            <span className="f-mono text-[10px] tracking-[0.25em] text-[#9ff5dc]">NEURAL BIOTECH · AI ENGINEER</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="f-display font-bold leading-[0.95] tracking-tight text-[clamp(2.8rem,7.5vw,5.6rem)]">
            Moe Kyaw<br /><span className="bio-text glow-mint">Aung</span>
            <span className="f-serif italic font-normal text-[clamp(1.4rem,3.5vw,2.4rem)] text-[#9ff5dc] block mt-2">grown, not built.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-5">
            <Typing phrases={bio.roles} className="f-mono text-base md:text-lg text-[#4de3ff]" />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-5 max-w-xl text-[#a9cabc] leading-relaxed">
            {bio.tagline} Senior Android systems with on-device AI — currently culturing{" "}
            <span className="text-white font-medium">{bio.building}</span>. {bio.location}.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#clusters" className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 f-mono text-[12px] tracking-[0.15em] font-bold text-[#02120c] hover:scale-[1.03] active:scale-95 transition-transform" style={{ background: "linear-gradient(120deg,#2ef2c8,#4de3ff)", boxShadow: "0 10px 34px rgba(46,242,200,0.3)" }}>
              EXPLORE CLUSTERS <ArrowRight size={15} />
            </a>
            <a href={bio.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 membrane f-mono text-[12px] tracking-[0.15em] text-[#e9fff4] hover:border-[rgba(46,242,200,0.45)] transition-colors">
              <Download size={15} /> GITHUB STRAIN
            </a>
          </motion.div>
          <div className="grid grid-cols-4 gap-2.5 mt-10 max-w-xl">
            {bio.stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 + i * 0.08 }}
                className="membrane rounded-2xl px-2 py-3.5 text-center">
                <div className="f-display font-bold text-xl md:text-2xl bio-text tabular-nums"><CountUp to={s.value} suffix={s.suffix} /></div>
                <div className="f-mono text-[9px] tracking-[0.18em] text-[#e9fff4] mt-1 uppercase">{s.label}</div>
                <div className="f-mono text-[8px] tracking-[0.14em] text-[#8fb8a8]">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* living specimen */}
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.8 }} className="relative">
          <div className="membrane rounded-[2rem] p-5 md:p-6 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(46,242,200,0.25), transparent 65%)", filter: "blur(30px)" }} />
            <div className="flex items-center justify-between f-mono text-[10px] tracking-[0.3em] text-[#8fb8a8] mb-4">
              <span>SPECIMEN · MKA-2026</span>
              <span className="flex items-center gap-1.5 text-[#b8ff5c]"><span className="w-1.5 h-1.5 rounded-full bg-[#b8ff5c] animate-blink-soft" /> VIABLE</span>
            </div>
            <div className="relative mx-auto w-fit">
              <div className="absolute -inset-5 animate-morph opacity-40" style={{ background: "conic-gradient(from 0deg, rgba(46,242,200,0.35), rgba(157,123,255,0.3), rgba(77,227,255,0.3), rgba(46,242,200,0.35))", filter: "blur(24px)" }} />
              <img src={bio.portrait} alt={bio.name} className="relative w-[240px] md:w-[280px] aspect-[4/5] object-cover object-top animate-morph animate-breathe border border-[rgba(46,242,200,0.35)]" style={{ boxShadow: "0 0 50px rgba(46,242,200,0.25)" }} />
              {[
                { t: "KOTLIN", x: "-left-6 top-8", c: "#2ef2c8" },
                { t: "TFLITE", x: "-right-5 top-1/3", c: "#9d7bff" },
                { t: "COMPOSE", x: "-left-4 bottom-10", c: "#4de3ff" },
              ].map((b) => (
                <span key={b.t} className={`absolute ${b.x} hidden sm:block f-mono text-[9px] tracking-[0.2em] px-2.5 py-1.5 rounded-full membrane-soft animate-floaty`} style={{ color: b.c, borderColor: `${b.c}44` }}>◦ {b.t}</span>
              ))}
            </div>
            <div className="mt-5"><Vitals /></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= soma (about) ================= */

export function Soma() {
  const code = [
    { p: "$ stain --soma mka", c: "text-[#2ef2c8]" },
    { p: "nucleus: senior android engineer", c: "text-white/85" },
    { p: "marrow → kotlin · compose · mvvm · clean", c: "text-[#8fb8a8]" },
    { p: "plasma → firebase · rest · python", c: "text-[#8fb8a8]" },
    { p: "spikes → ethical hacking · on-device ml", c: "text-[#8fb8a8]" },
    { p: "$ echo $credo", c: "text-[#2ef2c8]" },
    { p: `"${bio.philosophy}"`, c: "text-[#b8ff5c]" },
  ];
  return (
    <section id="soma" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHead eyebrow="01 · SOMA" title="One cell," accent="many signals" sub="From Tachileik to Bangkok — Android systems that stay coherent under pressure: offline-first, testable, culturally intentional." />
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}
            className="membrane rounded-3xl overflow-hidden relative">
            <img src={bio.portrait2} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" loading="lazy" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 20%, rgba(2,8,6,0.9))" }} />
            <div className="relative p-7 md:p-9 flex flex-col justify-end min-h-[420px]">
              <div className="flex items-center gap-2 f-mono text-[10px] tracking-[0.3em] text-[#2ef2c8] mb-3"><Dna size={13} /> CELL LINE · MKA</div>
              <h3 className="f-display font-bold text-2xl md:text-3xl leading-tight">Full-spectrum engineer — from <span className="text-[#2ef2c8]">pixel</span> to <span className="text-[#9d7bff]">pipeline</span> to <span className="text-[#b8ff5c]">privacy</span>.</h3>
              <p className="mt-4 text-[#a9cabc] leading-relaxed text-[15px]">82+ structured growth mediums across 9 tissue wings. But the true metric: shipped organisms that feel effortless — and a symbiont (bottom-right) that will happily tour you around.</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {["Burmese", "English", "Kotlin"].map((l) => (
                  <span key={l} className="f-mono text-[10px] tracking-widest px-3 py-1.5 rounded-full membrane-soft text-[#9ff5dc]">◦ {l}</span>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden border border-[rgba(46,242,200,0.16)]" style={{ background: "#030d0a" }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(46,242,200,0.12)] bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff6ad5]/80" /><span className="w-2.5 h-2.5 rounded-full bg-[#b8ff5c]/80" /><span className="w-2.5 h-2.5 rounded-full bg-[#2ef2c8]/80" />
              <span className="ml-2 f-mono text-[10px] text-[#8fb8a8] tracking-widest">mka@abyss ~/soma</span>
            </div>
            <div className="p-6 f-mono text-[12.5px] leading-8">
              {code.map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className={l.c}>{l.p}</motion.div>
              ))}
              <span className="text-[#2ef2c8] animate-blink-soft">▍</span>
            </div>
            <div className="px-6 pb-6 grid grid-cols-3 gap-2">
              {[
                { icon: Brain, k: "CORTEX", v: "Clean Arch" },
                { icon: Cpu, k: "SPIKES", v: "TFLite 32ms" },
                { icon: FlaskConical, k: "MEDIUM", v: "82+ certs" },
              ].map((f) => (
                <div key={f.k} className="rounded-2xl membrane-soft p-3 text-center">
                  <f.icon size={16} className="mx-auto text-[#2ef2c8] mb-1.5" />
                  <div className="f-mono text-[9px] tracking-[0.2em] text-[#8fb8a8]">{f.k}</div>
                  <div className="text-[12px] font-medium">{f.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================= pathways (skills) ================= */

export function Pathways() {
  return (
    <section id="pathways" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHead eyebrow="02 · NEURAL PATHWAYS" title="Myelinated" accent="pathways" sub="Eight axons, one obsession — signals that arrive fast, intact, and beautifully insulated." />
        <div className="grid md:grid-cols-2 gap-4">
          {pathways.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: (i % 2) * 0.08 }}
              className="membrane rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full opacity-25 blur-3xl group-hover:opacity-50 transition-opacity" style={{ background: p.color }} />
              <div className="flex items-center justify-between mb-1.5">
                <span className="f-mono text-[10px] tracking-[0.25em]" style={{ color: p.color }}>{p.tag}</span>
                <span className="f-display font-bold text-2xl tabular-nums" style={{ color: p.color }}>{p.level}</span>
              </div>
              <h4 className="f-display font-bold text-lg">{p.name}</h4>
              <p className="f-mono text-[10px] tracking-widest text-[#8fb8a8] mt-0.5 mb-3">{p.note}</p>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden relative">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.level}%` }} viewport={{ once: true }} transition={{ duration: 1.3, delay: 0.2 }}
                  className="h-full rounded-full relative" style={{ background: `linear-gradient(90deg, ${p.color}55, ${p.color})`, boxShadow: `0 0 14px ${p.color}` }}>
                  <span className="absolute right-0 -top-0.5 w-3 h-3 rounded-full bg-white" style={{ boxShadow: `0 0 12px ${p.color}, 0 0 4px #fff`, animation: "blink-soft 1.2s ease-in-out infinite" }} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= clusters (projects) ================= */

function SynapseHeader({ glow, fired }: { glow: string; fired: boolean }) {
  return (
    <svg viewBox="0 0 200 54" className="w-full h-[54px]" preserveAspectRatio="none">
      <line x1="14" y1="27" x2="100" y2="27" stroke={glow} strokeOpacity="0.35" strokeWidth="1.5" className="axon-flow" />
      <line x1="100" y1="27" x2="186" y2="27" stroke={glow} strokeOpacity="0.35" strokeWidth="1.5" className="axon-flow" />
      <circle cx="14" cy="27" r="5" fill={glow} opacity="0.9" style={{ filter: `drop-shadow(0 0 6px ${glow})` }} />
      <circle cx="14" cy="27" r="2" fill="#fff" />
      <circle cx="100" cy="27" r={fired ? 8 : 6} fill="none" stroke={glow} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 8px ${glow})` }} />
      <circle cx="100" cy="27" r="3" fill={glow} />
      <circle cx="186" cy="27" r="5" fill={glow} opacity="0.9" style={{ filter: `drop-shadow(0 0 6px ${glow})` }} />
      <circle cx="186" cy="27" r="2" fill="#fff" />
      <circle r="3" fill="#fff" style={{ filter: `drop-shadow(0 0 6px #fff)` }}>
        <animateMotion dur={fired ? "0.7s" : "2.4s"} repeatCount="indefinite" path="M14 27 L186 27" />
      </circle>
    </svg>
  );
}

const FILTERS = ["ALL", "ANDROID", "AI", "WEB", "MEDIA"] as const;
function matches(c: Cluster, f: string): boolean {
  if (f === "ALL") return true;
  const hay = `${c.strain} ${c.tech.join(" ")}`.toUpperCase();
  if (f === "ANDROID") return /KOTLIN|ANDROID|ROOM|MVVM|EXOPLAYER/.test(hay);
  if (f === "AI") return /AI|TFLITE|CLAUDE/.test(hay);
  if (f === "WEB") return /REACT|PWA|FULL-STACK|CHECKOUT|AUTH/.test(hay);
  return /MEDIA|AUDIO|CANVAS|GAME|VIDEO|PHYSICS/.test(hay);
}

export function Clusters() {
  const [filter, setFilter] = useState<string>("ALL");
  const [sel, setSel] = useState<Cluster | null>(null);
  const [hot, setHot] = useState<string | null>(null);
  const visible = clusters.filter((c) => matches(c, filter));
  return (
    <section id="clusters" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHead eyebrow="03 · NEURAL CLUSTERS" title="Project" accent="clusters" sub="Every project is a cluster of neurons. Hover to fire its synapses — click to dissect it under the microscope." />
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`f-mono text-[11px] tracking-[0.2em] px-4 py-2 rounded-full border transition-all ${filter === f ? "text-[#02120c] font-bold border-transparent" : "membrane-soft text-[#8fb8a8] hover:text-white"}`}
              style={filter === f ? { background: "linear-gradient(120deg,#2ef2c8,#4de3ff)", boxShadow: "0 0 20px rgba(46,242,200,0.35)" } : {}}>
              {f} <span className="opacity-60">·{clusters.filter((c) => matches(c, f)).length}</span>
            </button>
          ))}
        </div>
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <motion.button key={c.id} layout
                initial={{ opacity: 0, y: 26, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.45 }}
                onMouseEnter={() => setHot(c.id)} onMouseLeave={() => setHot(null)}
                onClick={() => setSel(c)}
                className="cluster-card text-left membrane rounded-3xl overflow-hidden group"
                style={hot === c.id ? { borderColor: `${c.glow}88`, boxShadow: `0 0 40px ${c.glow}33` } : {}}>
                {c.img ? (
                  <div className="relative h-32 overflow-hidden">
                    <img src={c.img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(2,8,6,0.9))" }} />
                    <span className="absolute top-3 left-3 f-mono text-[9px] tracking-[0.2em] px-2.5 py-1 rounded-full membrane-soft" style={{ color: c.glow }}>{c.strain}</span>
                    {c.flagship && <span className="absolute top-3 right-3 f-mono text-[9px] tracking-[0.2em] px-2.5 py-1 rounded-full text-[#02120c] font-bold" style={{ background: "linear-gradient(120deg,#b8ff5c,#2ef2c8)" }}>★ FLAGSHIP</span>}
                  </div>
                ) : (
                  <div className="relative h-24 flex items-center justify-center overflow-hidden" style={{ background: `radial-gradient(ellipse at 50% 120%, ${c.glow}33, transparent 70%)` }}>
                    <i className={`${c.icon} text-4xl`} style={{ color: c.glow, filter: `drop-shadow(0 0 14px ${c.glow})` }} />
                    <span className="absolute top-3 left-3 f-mono text-[9px] tracking-[0.2em] px-2.5 py-1 rounded-full membrane-soft" style={{ color: c.glow }}>{c.strain}</span>
                  </div>
                )}
                <div className="px-1 pt-1"><SynapseHeader glow={c.glow} fired={hot === c.id} /></div>
                <div className="p-5 pt-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="f-display font-bold text-[17px] leading-snug">{c.title}</h3>
                    <span className="f-mono text-[10px] text-[#8fb8a8] shrink-0">{c.yr}</span>
                  </div>
                  <p className="text-[13px] text-[#a9cabc] leading-relaxed mt-2 line-clamp-2 min-h-[38px]">{c.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {c.tech.slice(0, 3).map((t) => (
                      <span key={t} className="f-mono text-[9px] tracking-wider px-2 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[#9ff5dc]">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[rgba(46,242,200,0.12)]">
                    <span className="f-mono text-[10px] tracking-[0.2em] text-[#8fb8a8] flex items-center gap-1.5">
                      <Zap size={11} style={{ color: c.glow }} /> {c.synapses} SYNAPSES
                    </span>
                    <span className="f-mono text-[10px] tracking-[0.2em] text-[#e9fff4] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      DISSECT <ArrowUpRight size={12} style={{ color: c.glow }} />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-center justify-center p-4" style={{ background: "rgba(1,6,5,0.8)", backdropFilter: "blur(10px)" }} onClick={() => setSel(null)}>
            <motion.div initial={{ y: 30, scale: 0.94 }} animate={{ y: 0, scale: 1 }} exit={{ y: 14, scale: 0.96 }} transition={{ type: "spring", damping: 24, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg membrane rounded-3xl overflow-hidden max-h-[88vh] overflow-y-auto hide-scroll">
              {sel.img && <div className="relative h-44"><img src={sel.img} alt="" className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, rgba(2,8,6,0.85))" }} /></div>}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${sel.glow}1e`, color: sel.glow, border: `1px solid ${sel.glow}44`, boxShadow: `0 0 24px ${sel.glow}33` }}>
                    <i className={`${sel.icon} text-xl`} />
                  </span>
                  <button onClick={() => setSel(null)} className="w-9 h-9 rounded-full membrane-soft flex items-center justify-center text-[#8fb8a8] hover:text-white" aria-label="Close"><X size={15} /></button>
                </div>
                <div className="f-mono text-[10px] tracking-[0.3em] mb-1" style={{ color: sel.glow }}>{sel.strain} · EST {sel.yr}</div>
                <h3 className="f-display font-bold text-2xl md:text-3xl">{sel.title}</h3>
                <div className="my-4"><SynapseHeader glow={sel.glow} fired /></div>
                <p className="text-[14px] text-[#a9cabc] leading-relaxed">{sel.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {sel.tech.map((t) => (
                    <span key={t} className="f-mono text-[10px] px-2.5 py-1 rounded-lg border" style={{ borderColor: `${sel.glow}44`, color: sel.glow, background: `${sel.glow}0d` }}>{t}</span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-5 f-mono text-center text-[10px]">
                  {[["COHERE", "99.2%"], ["SPIKE", `${sel.synapses}Hz`], ["STATE", "VIABLE"]].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-black/30 border border-white/10 py-2.5">
                      <div className="text-[#e9fff4] text-sm font-bold">{v}</div>
                      <div className="text-[#8fb8a8] tracking-[0.2em]">{k}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2.5 mt-6">
                  <a href={sel.href} target="_blank" rel="noopener noreferrer" className="flex-1 text-center rounded-full py-3 f-mono text-[11px] tracking-[0.2em] font-bold text-[#02120c] hover:scale-[1.02] active:scale-95 transition-transform" style={{ background: `linear-gradient(120deg, ${sel.glow}, #4de3ff)` }}>◉ VIEW SOURCE</a>
                  <a href={bio.github} target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-full membrane-soft f-mono text-[11px] tracking-[0.2em] hover:border-[rgba(46,242,200,0.4)]">STRAIN</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ================= growth / archive / signal / footer ================= */

export function Growth() {
  return (
    <section id="growth" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <SectionHead eyebrow="04 · GROWTH RINGS" title="Four" accent="seasons of growth" sub="From spore to abyssal reef — compounding tissue, year over year." />
        <div className="relative">
          <div className="absolute left-5 md:left-1/2 top-2 bottom-2 w-px md:-translate-x-1/2" style={{ background: "linear-gradient(180deg,#2ef2c8,#9d7bff,transparent)" }} />
          {growth.map((g, i) => {
            const left = i % 2 === 0;
            return (
              <div key={g.yr} className="relative md:grid md:grid-cols-2 md:gap-x-16 md:py-5 pl-14 md:pl-0 mb-8 md:mb-0">
                <span className="absolute top-7 md:top-1/2 md:-translate-y-1/2 left-5 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 animate-morph" style={{ background: "#020806", borderColor: g.color, boxShadow: `0 0 16px ${g.color}` }} />
                <div className={left ? "md:col-start-1 md:pr-10 md:text-right" : "md:col-start-2 md:pl-10"}>
                  <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="membrane rounded-2xl p-5 inline-block w-full text-left">
                    <div className={`flex items-center gap-3 mb-2 ${left ? "md:flex-row-reverse" : ""}`}>
                      <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${g.color}1a`, color: g.color }}><i className={`${g.icon} text-sm`} /></span>
                      <div>
                        <div className="f-display font-bold text-xl">{g.yr}</div>
                        <div className="f-mono text-[9px] tracking-[0.3em]" style={{ color: g.color }}>{g.phase}</div>
                      </div>
                    </div>
                    <h4 className="f-display font-bold">{g.title}</h4>
                    <p className="text-[13px] text-[#8fb8a8] mt-1">{g.desc}</p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Archive() {
  const [q, setQ] = useState("");
  const all = wings.flatMap((w) => Array.from({ length: w.count }, (_, i) => `${w.name} · specimen ${String(i + 1).padStart(2, "0")}`));
  const shown = all.filter((s) => s.toLowerCase().includes(q.toLowerCase())).slice(0, 24);
  return (
    <section id="archive" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHead eyebrow="05 · BIOLUMINESCENT ARCHIVE" title="Certificate" accent="plankton" sub="82+ glowing specimens across 9 wings — a self-grown curriculum, verified and viable." />
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 mb-8">
          {wings.map((w, i) => (
            <motion.div key={w.name} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="membrane rounded-2xl p-3 text-center">
              <i className={`${w.icon} text-[#2ef2c8]`} />
              <div className="f-display font-bold text-lg mt-1">{w.count}</div>
              <div className="f-mono text-[8px] tracking-[0.14em] text-[#8fb8a8] uppercase">{w.name}</div>
            </motion.div>
          ))}
        </div>
        <div className="max-w-md mx-auto relative mb-6">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter the plankton…"
            className="w-full membrane rounded-full pl-5 pr-4 py-3 f-mono text-[13px] outline-none placeholder:text-[#8fb8a8]/60 focus:border-[rgba(46,242,200,0.5)]" />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {shown.map((s) => (
            <span key={s} className="f-mono text-[11px] px-3 py-2 rounded-xl membrane-soft text-[#c9ecdd] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ef2c8] animate-blink-soft" />{s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Signal() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(bio.email); } catch { /* noop */ }
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };
  return (
    <section id="signal" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHead eyebrow="06 · SYNAPTIC CLEFT" title="Transmit a" accent="signal" sub="Senior Android / AI roles, collaborations, reef-building — the cleft is open, latency near zero." />
        <div className="membrane rounded-[2rem] p-7 md:p-10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(46,242,200,0.18), transparent 65%)", filter: "blur(40px)" }} />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="f-serif italic text-3xl md:text-[2.6rem] leading-[1.1]">Let's grow <span className="bio-text not-italic f-display font-bold">something alive.</span></p>
              <p className="text-[#8fb8a8] mt-4 max-w-sm">Every message crosses the cleft within a day — always with tea, always with a plan.</p>
              <div className="mt-6 space-y-3">
                <a href={`mailto:${bio.email}`} className="flex items-center gap-3.5 p-4 rounded-2xl membrane-soft hover:border-[rgba(46,242,200,0.4)] transition-colors group">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(46,242,200,0.14)", color: "#2ef2c8" }}><Mail size={16} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block f-mono text-[9px] tracking-[0.25em] text-[#8fb8a8]">EMAIL AXON</span>
                    <span className="block text-sm truncate">{bio.email}</span>
                  </span>
                  <button onClick={(e) => { e.preventDefault(); copy(); }} aria-label="Copy email" className="w-8 h-8 rounded-lg membrane-soft flex items-center justify-center text-[#8fb8a8] hover:text-white">{copied ? <Check size={14} className="text-[#b8ff5c]" /> : <Copy size={14} />}</button>
                </a>
                <a href={`tel:${bio.phone.replace(/\s/g, "")}`} className="flex items-center gap-3.5 p-4 rounded-2xl membrane-soft hover:border-[rgba(157,123,255,0.4)] transition-colors">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(157,123,255,0.14)", color: "#9d7bff" }}><Phone size={16} /></span>
                  <span><span className="block f-mono text-[9px] tracking-[0.25em] text-[#8fb8a8]">VOICE DENDRITE</span><span className="block text-sm">{bio.phone}</span></span>
                </a>
                <div className="flex items-center gap-3.5 p-4 rounded-2xl membrane-soft">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(184,255,92,0.12)", color: "#b8ff5c" }}><MapPin size={16} /></span>
                  <span className="text-sm">{bio.location}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="f-mono text-[10px] tracking-[0.3em] text-[#8fb8a8] mb-4 text-center">— COLONY CHANNELS —</div>
              <div className="grid grid-cols-2 gap-2.5">
                {bio.socials.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="membrane-soft rounded-2xl p-3.5 flex items-center gap-3 hover:border-[rgba(46,242,200,0.4)] hover:-translate-y-0.5 transition-all group">
                    <i className={`${s.icon} text-[#2ef2c8] group-hover:scale-110 transition-transform`} />
                    <span className="f-mono text-[11px] tracking-widest">{s.name}</span>
                  </a>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-[rgba(46,242,200,0.14)] bg-black/25 p-5 text-center">
                <Microscope size={18} className="mx-auto text-[#2ef2c8]/70 mb-2" />
                <p className="f-serif italic text-lg text-[#e9fff4]">“{bio.philosophy}”</p>
                <div className="mt-3 flex justify-center gap-2 f-mono text-[9px] tracking-[0.25em] text-[#8fb8a8]">
                  <span className="flex items-center gap-1"><Sparkles size={10} className="text-[#b8ff5c]" /> CULTURED</span>
                  <span className="flex items-center gap-1"><Dna size={10} className="text-[#2ef2c8]" /> SEQUENCED</span>
                  <span className="flex items-center gap-1"><Brain size={10} className="text-[#9d7bff]" /> SENTIENT-ISH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-[rgba(46,242,200,0.12)]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-12 pb-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <span className="f-display font-bold tracking-[0.25em]">MKA<span className="bio-text">·BIO</span></span>
        <div className="flex flex-wrap justify-center gap-5">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="f-mono text-[10px] tracking-[0.25em] text-[#8fb8a8] hover:text-[#2ef2c8] uppercase">{n.label}</a>
          ))}
        </div>
      </div>
      <div className="text-center select-none pointer-events-none leading-none overflow-hidden">
        <span className="f-display font-bold text-[clamp(4rem,17vw,13rem)] text-transparent" style={{ WebkitTextStroke: "1px rgba(46,242,200,0.12)" }}>SYMBIOSIS</span>
      </div>
      <div className="text-center pb-8 f-mono text-[10px] tracking-[0.2em] text-[#8fb8a8]">© 2026 {bio.name} · {bio.philosophy}</div>
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
    <motion.button aria-label="Back to top" animate={{ opacity: show ? 1 : 0, y: show ? 0 : 14, pointerEvents: show ? "auto" : "none" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 left-5 z-[70] w-11 h-11 rounded-full membrane flex items-center justify-center text-[#2ef2c8]">
      <ChevronUp size={18} />
    </motion.button>
  );
}
