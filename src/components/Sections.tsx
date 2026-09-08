import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  Menu, X, Mail, Phone, MapPin, Download, ArrowRight, Copy, Check,
  Smartphone, Atom, Cloud, ShieldCheck, BrainCircuit, Globe, Rocket,
  GraduationCap, Search, Sun, Moon, Languages, Volume2, VolumeX,
} from "lucide-react";
import { sound } from "../utils/audio";
import AIOrb from "./AIOrb";
import {
  profile, domains, certCats, timeline, tickerTech, appLab, githubWorlds,
  lovableLab, gallery, IMG,
} from "../data";
import Orb from "./Orb";
import { TypingText, CountUp, SectionHeading, Ticker, Magnetic, Clock } from "./FX";
import { useObs } from "../context";

const NAV_IDS = ["about", "architecture", "projects", "skills", "lab", "vault", "contact"];

const DICO: Record<string, typeof Smartphone> = {
  Smartphone, Atom, Cloud, ShieldCheck, BrainCircuit, Globe,
};
const TICO: Record<string, typeof Rocket> = { Rocket, GraduationCap, Atom, BrainCircuit };

export function Navbar() {
  const { t, lang, setLang, theme, toggleTheme } = useObs();
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(!sound.enabled);

  const handleToggleAudio = () => {
    const isEnabled = sound.toggle();
    setMuted(!isEnabled);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let cur = "hero";
      for (const id of NAV_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 2 }}
        className={`fixed top-0 inset-x-0 z-[80] transition-all ${scrolled ? "backdrop-blur-2xl border-b" : ""}`}
        style={{ background: scrolled ? "color-mix(in srgb, var(--void) 82%, transparent)" : "transparent", borderColor: "var(--line)" }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <span className="w-9 h-9 hex bg-gradient-to-br from-[#00f0ff] to-[#8b5cf6] text-[#05060a] font-display font-extrabold text-xs flex items-center justify-center">MKA</span>
            <span className="hidden sm:block font-mono text-[10px] tracking-[0.32em] text-[var(--muted)]">
              QUANTUM_MATRIX <Clock />
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_IDS.map((id, i) => (
              <a key={id} href={`#${id}`}
                className={`navlink font-mono text-[11px] tracking-[0.16em] uppercase ${active === id ? "text-[#00f0ff] active" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}>
                {t.nav[i] || id}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {/* Audio Synth FX Toggle */}
            <button
              onClick={handleToggleAudio}
              title={muted ? "Audio Muted (Click to enable Quantum Audio)" : "Quantum Audio Enabled"}
              className={`w-9 h-9 rounded-full glass flex items-center justify-center transition-colors ${
                muted ? "text-[var(--muted)] hover:text-white" : "text-cyan-400 border-cyan-400/50 shadow-md shadow-cyan-500/20"
              }`}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} className="animate-pulse" />}
            </button>

            {/* Language Switch */}
            <button onClick={() => setLang(lang === "en" ? "mm" : "en")}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass font-mono text-[10px] tracking-widest text-[var(--muted)] hover:text-[var(--ink)]">
              <Languages size={12} /> {lang === "en" ? "မြန်မာ" : "EN"}
            </button>

            {/* Theme Switch */}
            <button onClick={toggleTheme} aria-label="Theme"
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#00f0ff]">
              {theme === "void" ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <a href={`mailto:${profile.email}`} className="hidden md:inline-flex px-4 py-2 rounded-full font-mono text-[11px] tracking-[0.2em] text-[#05060a] font-bold"
              style={{ background: "linear-gradient(90deg,#00f0ff,#8b5cf6)" }}>{t.hire}</a>

            <button onClick={() => setOpen(true)} className="lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center" aria-label="Menu">
              <Menu size={16} />
            </button>
          </div>
        </div>
        <motion.div style={{ scaleX: scrollYProgress }} className="h-[2px] origin-left bg-gradient-to-r from-[#00f0ff] via-[#8b5cf6] to-[#00ff88]" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex flex-col lg:hidden" style={{ background: "var(--void)" }}>
            <div className="flex items-center justify-between px-6 h-16 border-b" style={{ borderColor: "var(--line)" }}>
              <span className="font-serif italic text-2xl">MKA</span>
              <button onClick={() => setOpen(false)} className="w-10 h-10 rounded-xl glass flex items-center justify-center"><X size={16} /></button>
            </div>
            <nav className="p-6 flex flex-col gap-1">
              {NAV_IDS.map((id, i) => (
                <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
                  className="py-4 border-b font-serif italic text-3xl text-[var(--ink)]" style={{ borderColor: "var(--line)" }}>
                  {t.nav[i]}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Hero() {
  const { t, lang } = useObs();
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[12%] left-[8%] w-[42vw] h-[42vw] rounded-full border animate-spin-slow" style={{ borderColor: "var(--line)" }} />
        <div className="absolute top-[8%] left-[14%] w-[32vw] h-[32vw] hex border animate-spin-rev opacity-40" style={{ borderColor: "rgba(232,195,106,.2)" }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 w-full grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-[11px] tracking-[0.32em] text-[#e8c36a] px-3 py-1.5 rounded-full glass">
              {profile.role.toUpperCase()}
            </span>
            <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-led" /> {t.open}
            </span>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-serif italic text-xl md:text-2xl text-[var(--muted)] mb-2">
            {profile.nameMM}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-serif italic leading-[0.9] text-[clamp(3.2rem,9vw,7.4rem)] text-[var(--ink)] mb-4">
            Moe Kyaw <span className="holo-text not-italic font-display font-extrabold">Aung</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mb-6">
            <TypingText phrases={profile.roles} className="font-mono text-lg md:text-xl text-[#7ee0ff]" />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="flex items-center gap-2 text-[var(--muted)] mb-6">
            <MapPin size={14} className="text-[#e8c36a]" /> {profile.location}
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            className="max-w-xl text-[var(--muted)] leading-relaxed mb-8">
            High-performance Android — Kotlin, Compose, Clean Architecture — with on-device AI.
            Currently building <span className="text-[var(--ink)] font-medium">{profile.building}</span>.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-3 mb-12">
            <Magnetic>
              <a href="#projects" className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-mono text-xs tracking-[0.2em] text-[#05060a]"
                style={{ background: "linear-gradient(90deg,#e8c36a,#7ee0ff)" }}>
                {t.explore} <ArrowRight size={14} />
              </a>
            </Magnetic>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass font-mono text-xs tracking-[0.2em] text-[var(--ink)]">
              <Download size={14} /> {t.resume}
            </a>
            <span className="hidden md:inline-flex items-center font-mono text-[10px] tracking-[0.28em] text-[var(--muted)] px-3">
              {t.cmdHint}
            </span>
          </motion.div>

          <div className="grid grid-cols-4 gap-3 max-w-xl">
            {profile.stats.map((s, i) => (
              <motion.div key={s.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08 }}
                className="glass rounded-2xl px-2 py-4 text-center">
                <div className="font-serif italic text-3xl holo-text not-italic font-display font-bold tabular-nums">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="font-mono text-[9px] tracking-[0.16em] text-[var(--muted)] mt-1 uppercase">
                  {lang === "mm" ? s.labelMM : s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
          className="relative">
          <div className="relative rounded-[2rem] overflow-hidden scan glass p-4 md:p-6">
            <div className="hud-corner tl" /><div className="hud-corner tr" />
            <div className="hud-corner bl" /><div className="hud-corner br" />
            <div className="relative rounded-2xl overflow-hidden mb-4">
              <img src={IMG.portrait} alt={profile.name} className="w-full aspect-[4/5] max-h-[380px] object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.3em] text-[#e8c36a]">ID · MKA-2026</div>
            </div>
            <Orb />
          </div>
        </motion.div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] text-[var(--muted)]">
        {t.scroll}
        <div className="mx-auto mt-2 w-px h-8 bg-gradient-to-b from-[#e8c36a] to-transparent" />
      </motion.div>
    </section>
  );
}

export function About() {
  const { t } = useObs();
  const code = [
    { p: "$ whoami", c: "text-[#e8c36a]" },
    { p: "moe-kyaw-aung · Senior Android Engineer", c: "text-[var(--ink)]" },
    { p: "$ cat focus.map", c: "text-[#e8c36a]" },
    { p: "Mobile   → Kotlin · Compose · MVVM · Clean Arch", c: "text-[var(--muted)]" },
    { p: "Backend  → Firebase · REST · Python", c: "text-[var(--muted)]" },
    { p: "Security → Ethical Hacking · Cybersecurity", c: "text-[var(--muted)]" },
    { p: "AI/ML    → Claude API · TFLite · On-device", c: "text-[var(--muted)]" },
    { p: "$ echo $philosophy", c: "text-[#e8c36a]" },
    { p: `"${profile.philosophy}"`, c: "text-emerald-300" },
  ];
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <SectionHeading eyebrow={t.aboutEyebrow} title={t.aboutTitle} accent={t.aboutAccent} sub={t.philosophy} />

        <div className="grid md:grid-cols-6 gap-4 auto-rows-[140px] md:auto-rows-[160px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-3 md:row-span-2 relative rounded-3xl overflow-hidden glass">
            <img src={IMG.portrait2} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <div className="font-serif italic text-3xl text-white">{profile.name}</div>
              <div className="font-mono text-[11px] tracking-[0.25em] text-[#e8c36a]">{profile.role}</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-3 rounded-3xl glass p-6 flex flex-col justify-center">
            <p className="text-[var(--muted)] leading-relaxed">
              From Tachileik to Bangkok — I design Android systems that stay coherent under pressure:
              offline-first, testable, and culturally intentional.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-2 rounded-3xl overflow-hidden">
            <img src={IMG.mka11} alt="" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-1 rounded-3xl overflow-hidden">
            <img src={IMG.holo3} alt="" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-6 rounded-3xl overflow-hidden border" style={{ background: "#0a0c12", borderColor: "var(--line)" }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "var(--line)" }}>
              <span className="w-2 h-2 rounded-full bg-rose-400/80" />
              <span className="w-2 h-2 rounded-full bg-amber-400/80" />
              <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-mono text-[10px] text-[var(--muted)]">mka@observatory ~/identity</span>
            </div>
            <div className="p-5 font-mono text-[12px] leading-7">
              {code.map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }} className={l.c}>{l.p}</motion.div>
              ))}
              <span className="text-[#00f0ff] animate-blink">▍</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ArchitectureSection() {
  const { t, lang } = useObs();
  return (
    <section id="architecture" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow={t.archEyebrow}
          title={t.archTitle}
          accent={t.archAccent}
          sub="Interactive Neural Reasoning Core — simulates mobile architecture tradeoffs with quantum directional particle bursts."
        />
        <AIOrb isBurmese={lang === "mm"} />
      </div>
    </section>
  );
}

export function Skills() {
  const { t, lang } = useObs();
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <SectionHeading eyebrow={t.skillsEyebrow} title={t.skillsTitle} accent={t.skillsAccent}
          sub="A hexagonal lattice of craft — six domains, one obsession." />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {domains.map((d, i) => {
            const Icon = DICO[d.icon] ?? Smartphone;
            return (
              <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}
                className="glass foil rounded-3xl p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <span className="w-12 h-12 hex flex items-center justify-center"
                    style={{ background: `${d.color}22`, color: d.color }}><Icon size={20} /></span>
                  <span className="font-serif italic text-4xl" style={{ color: d.color }}>{d.pct}</span>
                </div>
                <h4 className="font-display font-bold text-lg text-[var(--ink)]">{lang === "mm" ? d.titleMM : d.title}</h4>
                <p className="text-sm text-[var(--muted)] mt-1 mb-4">{d.blurb}</p>
                <div className="h-[3px] rounded-full bg-white/5 overflow-hidden mb-4">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${d.pct}%` }} viewport={{ once: true }}
                    transition={{ duration: 1.2 }} className="h-full rounded-full"
                    style={{ background: d.color, boxShadow: `0 0 12px ${d.color}` }} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {d.chips.map((c) => (
                    <span key={c} className="px-2 py-1 rounded-md font-mono text-[10px] text-[var(--muted)] border" style={{ borderColor: "var(--line)" }}>{c}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  const { t, lang } = useObs();
  return (
    <section className="relative py-20">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow={t.journeyEyebrow} title={t.journeyTitle} accent="2023 — 2026" />
        <div className="relative">
          <div className="absolute left-5 md:left-1/2 top-2 bottom-2 w-px md:-translate-x-1/2"
            style={{ background: "linear-gradient(180deg, #e8c36a, transparent)" }} />
          {timeline.map((tl, i) => {
            const Icon = TICO[tl.icon] ?? Rocket;
            const left = i % 2 === 0;
            return (
              <div key={tl.year} className="relative md:grid md:grid-cols-2 md:gap-x-20 md:py-6 pl-14 md:pl-0 mb-8 md:mb-0">
                <span className="absolute top-6 md:top-1/2 md:-translate-y-1/2 left-5 md:left-1/2 md:-translate-x-1/2 w-3.5 h-3.5 rounded-full border-2"
                  style={{ background: "var(--void)", borderColor: tl.color, boxShadow: `0 0 16px ${tl.color}` }} />
                <div className={`${left ? "md:col-start-1 md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}>
                  <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="glass rounded-2xl p-5">
                    <div className={`flex items-center gap-3 mb-2 ${left ? "md:flex-row-reverse" : ""}`}>
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${tl.color}22`, color: tl.color }}>
                        <Icon size={15} />
                      </span>
                      <div>
                        <div className="font-serif italic text-2xl text-[var(--ink)]">{tl.year}</div>
                        <div className="font-mono text-[9px] tracking-[0.28em]" style={{ color: tl.color }}>{tl.tag}</div>
                      </div>
                    </div>
                    <h4 className="font-display font-semibold text-[var(--ink)]">{lang === "mm" ? tl.titleMM : tl.title}</h4>
                    <p className="text-sm text-[var(--muted)] mt-1">{tl.desc}</p>
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

export function Lab() {
  const { t } = useObs();
  return (
    <section id="lab" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <SectionHeading eyebrow={t.labEyebrow} title={t.labTitle} accent={t.labAccent}
          sub="Sixteen instruments in the laboratory — swipe the reel." />
      </div>
      <div className="hide-scroll overflow-x-auto pb-4">
        <div className="flex gap-4 px-5 md:px-8 min-w-max">
          {appLab.map((a, i) => (
            <motion.a key={a.n} href={a.href} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="w-[240px] shrink-0 glass foil rounded-3xl overflow-hidden group">
              <div className="h-36 relative" style={{ background: "linear-gradient(135deg, rgba(232,195,106,.2), rgba(126,224,255,.08))" }}>
                {a.img && <img src={a.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity" />}
                <span className="absolute top-3 left-3 font-serif italic text-3xl text-white/90">{String(a.n).padStart(2, "0")}</span>
                <span className="absolute top-3 right-3 font-mono text-[9px] tracking-widest px-2 py-1 rounded-full glass">{a.tag}</span>
              </div>
              <div className="p-4">
                <div className="text-xl mb-1">{a.emoji}</div>
                <div className="font-serif italic text-xl text-[var(--ink)]">{a.name}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 mt-24">
        <SectionHeading eyebrow={t.worldsEyebrow} title={t.worldsTitle} accent={t.worldsAccent}
          sub="A constellation of published GitHub worlds." />
        <div className="flex flex-wrap gap-2 justify-center">
          {githubWorlds.map((g) => (
            <a key={g.href} href={g.href} target="_blank" rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-full glass font-mono text-[11px] tracking-[0.12em] text-[var(--muted)] hover:text-[#e8c36a] hover:border-[#e8c36a]/40 transition-all">
              {g.name}
            </a>
          ))}
        </div>

        <h3 className="font-serif italic text-3xl text-center mt-16 mb-6 text-[var(--ink)]">Lovable <span className="holo-text not-italic font-display font-bold">atelier</span></h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {lovableLab.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              className="glass foil rounded-2xl p-4 hover:border-[#e8c36a]/40 transition-all">
              <div className="font-mono text-[10px] text-[#7ee0ff] tracking-widest mb-1">LOVABLE</div>
              <div className="font-serif italic text-lg text-[var(--ink)]">{l.name}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Vault() {
  const { t } = useObs();
  const [cat, setCat] = useState(certCats[0].cat);
  const [q, setQ] = useState("");
  const active = certCats.find((c) => c.cat === cat) ?? certCats[0];
  const items = active.items.filter((it) => it.toLowerCase().includes(q.toLowerCase()));
  return (
    <section id="vault" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow={t.vaultEyebrow} title={t.vaultTitle} accent={t.vaultAccent}
          sub="82+ verified credentials — a self-directed curriculum across nine wings of the archive." />
        <div className="relative max-w-md mx-auto mb-6">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the vault…"
            className="w-full pl-10 pr-4 py-3 rounded-2xl glass font-mono text-sm outline-none text-[var(--ink)]" />
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {certCats.map((c) => (
            <button key={c.cat} onClick={() => setCat(c.cat)}
              className={`px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.1em] border
                ${cat === c.cat ? "border-[#e8c36a] text-[#e8c36a]" : "border-[var(--line)] text-[var(--muted)]"}`}>
              {c.icon} {c.cat} [{c.count}]
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {items.map((it) => (
            <span key={it} className="px-3 py-2 rounded-xl glass text-sm text-[var(--ink)]">{it}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section className="py-16">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {gallery.slice(0, 8).map((src, i) => (
          <motion.div key={src} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className={`relative overflow-hidden rounded-2xl ${i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""}`}>
            <img src={src} alt="" className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useObs();
  const [copied, setCopied] = useState(false);
  const copyMail = async () => {
    try { await navigator.clipboard.writeText(profile.email); } catch { /* ignore */ }
    setCopied(true); setTimeout(() => setCopied(false), 1400);
  };
  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow={t.contactEyebrow} title={t.contactTitle} accent={t.contactAccent} />
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-serif italic text-4xl md:text-6xl text-[var(--ink)] leading-[1.05] mb-6">
              Let’s entangle <span className="holo-text not-italic font-display font-extrabold">timelines.</span>
            </p>
            <p className="text-[var(--muted)] mb-8 max-w-md">Senior Android / full-stack. Replies within a day — always with coffee.</p>
            <div className="space-y-3">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-4 p-4 rounded-2xl glass">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#e8c36a]/15 text-[#e8c36a]"><Mail size={16} /></span>
                <span className="flex-1">
                  <span className="block font-mono text-[10px] tracking-[0.25em] text-[var(--muted)]">EMAIL</span>
                  <span className="text-sm text-[var(--ink)]">{profile.email}</span>
                </span>
                <button onClick={(e) => { e.preventDefault(); copyMail(); }} className="w-9 h-9 rounded-lg glass flex items-center justify-center">
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 p-4 rounded-2xl glass">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#7ee0ff]/15 text-[#7ee0ff]"><Phone size={16} /></span>
                <span>
                  <span className="block font-mono text-[10px] tracking-[0.25em] text-[var(--muted)]">PHONE</span>
                  <span className="text-sm text-[var(--ink)]">{profile.phone}</span>
                </span>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-2xl glass">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#e879f9]/15 text-[#e879f9]"><MapPin size={16} /></span>
                <span className="text-sm text-[var(--ink)]">{profile.location}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {profile.socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                className="glass foil rounded-2xl p-4 flex items-center gap-3 hover:border-[#e8c36a]/40">
                <i className={`${s.fa} text-[#e8c36a]`} />
                <span className="font-mono text-xs tracking-widest text-[var(--ink)]">{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useObs();
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 pt-14 pb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#hero" className="font-serif italic text-3xl text-[var(--ink)]">M<span className="holo-text not-italic font-display font-extrabold">KA</span></a>
        <div className="flex flex-wrap gap-5">
          {NAV_IDS.map((id, i) => (
            <a key={id} href={`#${id}`} className="font-mono text-[10px] tracking-[0.28em] text-[var(--muted)] hover:text-[#e8c36a] uppercase">{t.nav[i]}</a>
          ))}
        </div>
      </div>
      <div className="text-center font-serif italic text-[clamp(4rem,16vw,14rem)] leading-none select-none pointer-events-none"
        style={{ WebkitTextStroke: "1px color-mix(in srgb, var(--ink) 12%, transparent)", color: "transparent" }}>
        OBSERVE
      </div>
      <Ticker items={tickerTech} />
      <div className="text-center py-6 font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">
        © 2026 {profile.name} · {t.philosophy}
      </div>
    </footer>
  );
}
