import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { synth } from "../synthaudio";
import { SW, projects, Project as Proj, skillsLines, tapeLines, certWings, journey } from "../synthdata";
import { Sunset, NeonGrid, Clock, RetroType, CountUp, Kicker, Led } from "./SynthFX";

const LIST = ["HOME", "ABOUT", "CART.RDG", "SKILLS", "ARCADE", "CONTACT"];
const SECTIONS = ["hero", "about", "crate", "skills", "journey", "contact"];
const CLOCK = { 0: "[P1]", 1: "[CO-OP]", 2: "[VS]", 3: "[CPU]" };

/* ---------------- NAV ---------------- */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 20);
      let cur = "hero";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: .6 }}
      className="fixed top-0 inset-x-0 z-[70] flex items-center justify-between px-4 sm:px-6 h-14"
      style={{ background: scrolled ? "rgba(11,1,32,.85)" : "transparent", backdropFilter: scrolled ? "blur(8px)" : "none", borderBottom: "1px solid rgba(255,41,117,.2)" }}>
      <a href="#hero" className="retrofont text-lg tracking-wider slide-hint select-none">MKA<span style={{ color: "#ff2975" }}>_80s</span></a>
      <nav className="hidden md:flex gap-6">
        {LIST.map((l, i) => {
          const is = SECTIONS[i] === active || active === SECTIONS[i];
          return (
            <a key={l} href={`#${SECTIONS[i]}`} onClick={() => synth.blip()}
              className={`retrofont text-xs tracking-widest transition-all ${is ? "text-[#ffe600] glow-yellow" : "text-[#cdb5ff] hover:text-white"}`}>
              {l}
            </a>
          );
        })}
      </nav>
      <div className="flex items-center gap-3">
        <span className="pixel hidden sm:block text-[8px] text-[#00f0ff]"><Led /> CONN • 99.9%</span>
        <span className="pixel text-[9px] text-[#34ff70]"><Clock /></span>
      </div>
    </motion.header>
  );
}

/* ---------------- HERO ---------------- */
export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <Sunset />
      <NeonGrid />
      {/* chrome title */}
      <div className="relative z-10 max-w-[760px] mx-auto px-5 pt-24 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} className="flex items-center justify-center gap-3 mb-4">
          <span className="pixel text-[8px] text-[#ffe600]">PLAYER 1 READY</span>
          <Led />
          <span className="pixel text-[8px] text-[#ffe600]">{CLOCK[1]}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .8 }}
          className="font-display leading-[.95] select-none">
          <span className="block retro text-[clamp(3rem,10vw,8rem)]" style={{ filter: "drop-shadow(0 0 20px rgba(0,240,255,.4))" }}>MOE KYAW</span>
          <span className="block retro text-[clamp(3rem,10vw,8rem)]" style={{ filter: "drop-shadow(0 0 20px rgba(255,41,117,.5))" }}>AUNG</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}>
          <RetroType words={SW.roles} className="orbitron text-sm sm:text-base md:text-xl text-[#ffe600] glow-yellow" />
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }} className="mt-4 orbitron text-[10px] sm:text-xs tracking-[.3em] text-[#cdb5ff]">
          {SW.tag} • {SW.location}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="#crate" onClick={() => synth.coin()} className="pixel text-[9px] text-black px-5 py-3 rounded transition hover:scale-105"
            style={{ background: "linear-gradient(180deg,#ffe600,#ff901f)", boxShadow: "0 6px 0 #7a4a00, 0 0 22px rgba(255,233,25,.5)" }}>
            ▶ START GAME
          </a>
          <a href="#about" onClick={() => synth.blip()} className="nbox nbox-cyan pixel text-[9px] text-[#00f0ff] px-5 py-3 rounded hover:scale-105 transition"
            style={{ background: "#0a0120" }}>
            SELECT CONTINUE
          </a>
        </motion.div>
      </div>

      {/* stats marquee row bottom */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t border-white/10" style={{ background: "rgba(11,1,32,.55)" }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
          {SW.stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 + i * .1 }} className="text-center">
              <div className="pixel text-[6px] text-[#34ff70] mb-1">{s.label}</div>
              <div className="retrofont text-xl text-[#ffe600] glow-yellow"><CountUp to={s.value} suffix={s.suffix} /></div>
              <div className="font-mono text-[9px] text-[#cdb5ff] tracking-widest">{s.unit}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT / PLAYER ID CARD ---------------- */
export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <Kicker k="PLAYER SELECT // CMD" />
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }}
            className="nbox rounded-2xl overflow-hidden relative max-w-sm mx-auto">
            <div className="absolute inset-0 scanlines opacity-60 pointer-events-none z-10" />
            <img src={SW.portrait} alt={SW.name} className="w-full aspect-[4/5] object-cover" style={{ filter: "contrast(1.05) saturate(1.15)" }} />
            {/* label strip */}
            <div className="absolute bottom-0 inset-x-0 p-4 nbox-cyan" style={{ background: "linear-gradient(90deg,rgba(0,240,255,.2),rgba(255,41,117,.2))" }}>
              <div className="retrofont text-white text-lg">{SW.name}</div>
              <div className="pixel text-[7px] mt-1 text-[#ffe600]">{SW.role.toUpperCase()}</div>
            </div>
          </motion.div>
          <div>
            <h2 className="chrome retrofont text-5xl sm:text-6xl leading-none mb-5">PLAYER ID</h2>
            <div className="retrofont text-lg text-[#ffe600] glow-yellow mb-1">{SW.role}</div>
            <div className="crtfont text-xl text-[#00f0ff] mb-4">{SW.building}</div>
            <p className="text-[15px] text-[#e9d8ff] leading-relaxed mb-6 max-w-md">
              High-performance Android systems — Kotlin, Compose, Clean Arch — with a synthwave soul
              and laser-focused engineering. Building on-device AI + full CI/CD, cartridge after cartridge.
            </p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="crtfont text-xl tracking-[.1em] text-[#cdb5ff] nbox max-w-sm px-4 py-3 rounded bg-[#0a0120]">
              <span className="text-[#ffe600]">►</span> {SW.certs}
            </motion.p>
            <div className="flex flex-wrap gap-2 mt-6">
              <a className="pixel text-[9px] text-[#ffe600] border border-[#ffe600]/40 px-3 py-2 rounded" href="#crate">ROLL DOWN ▶</a>
              <a className="pixel text-[9px] text-[#34ff70] border border-[#34ff70]/40 px-3 py-2 rounded" href="#skills">ABILITY ★</a>
              <a className="pixel text-[9px] text-[#00f0ff] border border-[#00f0ff]/40 px-3 py-2 rounded" href={`mailto:${SW.email}`}>EMAIL ✉</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECT CARTRIDGE CRATE ---------------- */
export function CartridgeCrate() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Proj | null>(null);
  const fileProj = projects.filter((p) => (p.title + p.desc).toLowerCase().includes(q.toLowerCase()));

  return (
    <section id="crate" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <Kicker k="WEAPON SELECT // ROM ARCHIVE" />
        <h2 className="chrome retrofont text-5xl sm:text-7xl leading-none mb-3">CARTRIDGES</h2>
        <p className="crtfont text-2xl text-[#cdb5ff] mb-8">SELECT YOUR DATA CARTRIDGE · {fileProj.length} FILES</p>

        {/* file pane */}
        <div className="nbox nbox-cyan rounded-xl overflow-hidden bg-[#0a0120]/70 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#00f0ff]/20 scanlines" style={{ background: "rgba(0,240,255,.06)" }}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2efd]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffe600]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34ff70]" />
            <span className="ml-2 pixel text-[7px] text-[#00f0ff]">C:\\RETRO\\CRATE\\</span>
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)}
            className="w-full bg-transparent px-4 py-2 orbitron text-sm text-[#ffe600] focus:outline-none" placeholder="TYPE TO FILTER ROMs…" />
        </div>

        {/* grid of cartridges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {fileProj.map((p, i) => (
            <Cartridge key={p.id} p={p} i={i} onOpen={() => { synth.coin(); setOpen(p); }} />
          ))}
          {fileProj.length === 0 && (
            <div className="col-span-full crtfont text-2xl text-[#ff2efd] text-center py-10">NO CARTRIDGES FOUND FOR “{q}”</div>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button className="pixel text-[8px] text-[#34ff70] border border-[#34ff70]/40 px-4 py-2 rounded" onClick={() => synth.select()}>▼ LOCK-ON ALL FILES</button>
        </div>
        {open && <Detail p={open} onClose={() => setOpen(null)} />}
      </div>
    </section>
  );
}

/* A single cartridge slide-in */
function Cartridge({ p, i, onOpen }: { p: Proj; i: number; onOpen: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -120, rotate: -6 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: .5, delay: (i % 4) * .08, type: "spring", bounce: .3 }}
      onClick={onOpen}
      className="group text-left cursor-pointer"
    >
      <div className="nbox rounded-xl overflow-hidden bg-[#0a0120] h-full transition-transform group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(0,240,255,.4)]"
        style={{ boxShadow: "0 8px 0 rgba(255,41,117,.18)" }}>
        {/* cartridge label top */}
        <div className="flex items-center justify-between px-2 py-1 bg-gradient-to-r from-[#200068] via-[#9000a8] to-[#200068]">
          <span className="pixel text-[6px] text-white/80">{p.yr}</span>
          <span className="flex gap-0.5">{Array.from({ length: 6 }).map((_, k) => (
            <i key={k} className="w-1 h-2 bg-yellow-200" style={{ opacity: (Math.random() * .6 + .3) }} />
          ))}</span>
        </div>
        {/* art */}
        <div className="relative h-28 overflow-hidden" style={{ background: "linear-gradient(135deg,#1a0b3c,#0a0120)" }}>
          {p.img ? <img src={p.img} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100" /> :
            <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-70">{p.icon && <i className={p.icon} style={{ color: "#c86bff" }} />}</div>}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0120]"/>
          <span className="absolute top-2 left-2 pixel text-[7px] text-[#00f0ff]">{p.spec}</span>
          <div className="absolute top-2 right-2 pixel text-[8px] text-[#ffe600]">{p.rating}</div>
        </div>
        {/* body */}
        <div className="p-3">
          <div className="retrofont text-sm text-white leading-tight mb-1">{p.title}</div>
          <div className="font-mono text-[9px] text-[#00f0ff] mb-2 flex items-center gap-1"><i className="fa-solid fa-microchip" style={{ color: "#ff2efd" }} /><span>{p.tech}</span></div>
          <p className="font-mono text-[10px] text-[#cdb5ff] line-clamp-2 min-h-[26px]">{p.desc}</p>
          <div className="pixel mt-2 text-[8px] text-[#34ff70] group-hover:text-[#00f0ff]">▶ LOAD</div>
        </div>
      </div>
    </motion.button>
  );
}

/* DETAIL MODAL */
function Detail({ p, onClose }: { p: Proj; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
  return (
    <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: .9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg nbox rounded-2xl bg-[#0a0120] overflow-hidden scanlines">
        <div className="flex justify-between items-center px-5 py-3 bg-gradient-to-r from-[#ff2975] via-[#9000a8] to-[#200068]">
          <div className="retrofont text-white">{p.title}</div>
          <button onClick={() => { synth.blip(); onClose(); }} className="pixel text-[10px] text-white hover:scale-110">✕</button>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="pixel text-[8px] text-[#00f0ff]">{p.spec} · {p.yr}</span>
            <span className="orbitron text-[12px] text-[#ffe600]">{p.rating}</span>
          </div>
          <p className="crtfont text-2xl text-[#e9d8ff] mb-4">{p.desc}</p>
          <div className="nbox rounded-lg p-3 mb-5 scanlines">
            <div className="pixel text-[7px] text-[#34ff70] mb-1">TECH MODULE</div>
            <div className="retrofont text-sm text-white">{p.tech}</div>
          </div>
          <div className="flex gap-3">
            <a href={p.href} target="_blank" rel="noopener noreferrer" onClick={() => synth.coin()}
              className="flex-1 text-center pixel text-[9px] text-black py-3 rounded transition hover:scale-105"
              style={{ background: "linear-gradient(180deg,#00f0ff,#00b3c4)", boxShadow: "0 5px 0 #006a77" }}>
              ▶ DEPLOY / RUN
            </a>
            <a href={SW.github} target="_blank" rel="noopener noreferrer" onClick={() => synth.blip()}
              className="flex-1 text-center pixel text-[9px] text-white border border-white/30 py-3 rounded hover:scale-105 transition">SOURCE</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- SKILLS LADDER ---------------- */
export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <Kicker k="CHARACTER ABILITIES // LVL 99" />
        <h2 className="chrome retrofont text-5xl sm:text-7xl leading-none mb-10">POWER GRID</h2>
        <div className="nbox rounded-xl overflow-hidden bg-[#0a0120]">
          {skillsLines.map((s, i) => (
            <motion.div key={s.skill} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }}
              className={`px-4 py-3 ${i !== 0 ? "border-t border-white/10" : ""} scanlines`}>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="pixel text-[7px] text-[#00f0ff]">{s.tag}</span>
                  <span className="retrofont text-sm text-white serif;">{s.skill}</span>
                </div>
                <span className="pixel text-[9px] text-[#ffe600]">{s.level}<span className="text-[#ff2efd]">PTS</span></span>
              </div>
              <div className="flex gap-1 h-3">
                {Array.from({ length: 20 }).map((_, k) => (
                  <div key={k} className="flex-1" style={{
                    background: k / 20 < s.level / 100 ? linearBar(i) : "rgba(255,255,255,.08)",
                    boxShadow: k / 20 < s.level / 100 ? "0 0 10px rgba(0,240,255,.4)" : "none",
                    height: "100%", borderRadius: 2,
                  }} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function linearBar(i: number) {
  const colors = ["#00f0ff", "#c86bff", "#ff2efd", "#ffe600", "#34ff70", "#ff2975", "#00f0ff", "#ff901f"];
  return `linear-gradient(180deg, ${colors[i % colors.length]}, ${colors[(i + 2) % colors.length]})`;
}

/* ---------------- JOURNEY / ARCADE STAGE HISTORY ---------------- */
export function Journey() {
  return (
    <section id="journey" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <Kicker k="STAGE SELECT // HISTORY" />
        <h2 className="chrome retrofont text-5xl sm:text-7xl leading-none mb-10">HIGH SCORES</h2>
        <div className="relative nbox rounded-xl overflow-hidden bg-[#0a0120]">
          <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg,#ff2975,#00f0ff)" }} />
          {journey.map((j, i) => (
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
              className="relative pl-14 pr-4 py-5">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 nbox rounded flex items-center justify-center" style={{ background: "#0a0120" }}>
                <i className={j.icon} style={{ color: j.color }} />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="retrofont text-lg" style={{ color: j.color }}>{j.yr}</span>
                <span className="pixel text-[7px] text-[#ffe600]">{j.chip}</span>
              </div>
              <div className="retrofont text-white text-lg">{j.title}</div>
              <p className="font-mono text-[12px] text-[#cdb5ff] max-w-lg">{j.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CERTS / CONTACT ---------------- */
export function CertsAndContact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <Kicker k="ACHIEVEMENT UNLOCKED // COLLECTION" />
        <h2 className="chrome retrofont text-5xl sm:text-7xl leading-none mb-1">{SW.certs.split(" ·")[0]}</h2>
        <p className="crtfont text-2xl text-[#cdb5ff] mb-8 flex gap-2 items-center">{Array.from({length:5}).map((_,i)=><span key={i} className="text-[#ffe600]">★</span>)} TROPHIES UNLOCKED</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {certWings.map((c) => (
            <div key={c.name} className="nbox rounded-lg p-4 bg-[#0a0120]/70 scanlines">
              <div className="flex items-center gap-2 mb-1"><i className={`${c.icon} text-[#00f0ff]`} /><span className="pixel text-[7px] text-[#34ff70]">{c.count}</span></div>
              <div className="retrofont text-white text-sm">{c.name}</div>
              <div className="font-mono text-[9px] text-[#cdb5ff]">{c.n}</div>
            </div>
          ))}
        </div>

        <hr className="my-14" style={{ borderColor: "rgba(255,41,117,.2)" }} />
        <Kicker k="GAME OVER? // MORE LIVES!" />
        <h2 className="chrome retrofont text-5xl sm:text-7xl leading-none mb-4">CONTACT_24</h2>
        <p className="crtfont text-2xl text-[#e9d8ff] mb-8 max-w-xl">Got a controller? Let's play co-op on your next product. My high-score board is accepting new challengers.</p>
        <div className="flex flex-wrap gap-3 mb-8">
          <a href={`mailto:${SW.email}`} onClick={() => synth.coin()} className="pixel text-[9px] text-black px-5 py-3 rounded hover:scale-105 transition" style={{ background: "linear-gradient(180deg,#00f0ff,#00b3c4)", boxShadow: "0 5px 0 #006a77" }}>✉ EMAIL PLAYER 1</a>
          <a href={`tel:${SW.phone.replace(/\s/g, "")}`} className="pixel text-[9px] text-[#ffe600] border border-[#ffe600]/40 px-5 py-3 rounded hover:scale-105">☎ CALL-IN</a>
          <a href={SW.github} target="_blank" rel="noopener noreferrer" className="pixel text-[9px] text-[#ff2efd] border border-[#ff2efd]/40 px-5 py-3 rounded hover:scale-105">GITHUB ✓</a>
        </div>
        <div className="flex flex-wrap gap-2">
          {SW.socials.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 nbox px-3 py-2 rounded bg-[#0a0120]/70 hover:shadow-[0_0_16px_rgba(0,240,255,.3)] hover:-translate-y-0.5 transition-all">
              <i className={`${s.icon} text-[#ffe600]`} />
              <span className="pixel text-[7px] text-white">{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
export function Footer() {
  return (
    <footer className="relative pt-6">
      <TickerBand />
      <div className="retro text-center text-[clamp(4rem,18vw,16rem)] tracking-wide leading-none opacity-90 select-none">GAME OVER</div>
      <div className="text-center pb-10 -mt-4 space-y-1">
        <p className="pixel text-[8px] text-[#ffe600]">INSERT COIN FOR MORE OF {SW.name.toUpperCase()}</p>
        <p className="crtfont text-lg text-[#cdb5ff]">© 2026 {SW.name} · {SW.philosophy}</p>
        <p className="crtfont text-lg text-[#00f0ff]">CREDIT: 1 · {Array.from({length:70}).map((_,i)=><span key={i}>-</span>)} 1985-2026</p>
      </div>
    </footer>
  );
}

function TickerBand() {
  const row = [...tapeLines, ...tapeLines];
  return (
    <div className="overflow-hidden py-3 select-none" style={{ background: "linear-gradient(90deg,#200068,#ff2975)" }}>
      <div className="flex w-max" style={{ animation: "carousel 40s linear infinite" }}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-4 px-4 retrofont text-white tracking-widest text-sm sm:text-base">
            <span style={{ textShadow: "0 0 8px #fff" }}>{t}</span>
            <i className="fa-solid fa-gamepad text-[#ffe600] text-xs" />
          </span>
        ))}
      </div>
    </div>
  );
}
