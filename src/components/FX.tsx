import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ChevronUp } from "lucide-react";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const logs = [
    "calibrating observatory lenses",
    "aligning holographic lattice",
    "loading identity crystal",
    "entangling node field",
    "opening the aperture",
  ];
  const shown = Math.min(logs.length, Math.floor((pct / 100) * logs.length) + (pct > 94 ? 1 : 0));

  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const dur = 2100;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setPct(Math.floor((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 280);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, filter: "blur(16px)", scale: 1.04 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "#05060a" }}
    >
      <div className="w-[min(540px,88vw)] relative">
        <div className="hud-corner tl" /><div className="hud-corner tr" />
        <div className="hud-corner bl" /><div className="hud-corner br" />
        <div className="px-8 py-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="font-mono text-[10px] tracking-[0.45em] text-[#e8c36a] mb-2">OBSERVATORY · BOOT</div>
              <div className="font-serif text-5xl italic text-white">M<span className="holo-text not-italic font-display font-extrabold">KA</span></div>
            </div>
            <div className="font-mono text-4xl text-[#7ee0ff] tabular-nums">{pct}%</div>
          </div>
          <div className="h-[2px] bg-white/5 overflow-hidden mb-7">
            <div className="h-full bg-gradient-to-r from-[#e8c36a] via-[#7ee0ff] to-[#e879f9] transition-[width] duration-150"
              style={{ width: `${pct}%`, boxShadow: "0 0 16px #e8c36a" }} />
          </div>
          <div className="font-mono text-[11px] space-y-1.5 min-h-[120px] text-white/50">
            {logs.slice(0, shown).map((l) => (
              <motion.div key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-[#e8c36a]">{"›"}</span> {l}
                <span className="text-emerald-300/80">  · aligned</span>
              </motion.div>
            ))}
            <div className="text-[#7ee0ff]/80">{"›"} aperture open<span className="animate-blink"> ▍</span></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CustomCursor() {
  const [on, setOn] = useState(false);
  const [hot, setHot] = useState(false);
  const [vis, setVis] = useState(false);
  const x = useMotionValue(-80);
  const y = useMotionValue(-80);
  const rx = useSpring(x, { stiffness: 280, damping: 28, mass: 0.55 });
  const ry = useSpring(y, { stiffness: 280, damping: 28, mass: 0.55 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setOn(true);
    document.body.classList.add("obs-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY); setVis(true);
      const t = e.target as HTMLElement | null;
      setHot(!!t?.closest?.("a,button,input,textarea,[data-cursor]"));
    };
    const leave = () => setVis(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      document.body.classList.remove("obs-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!on) return null;
  return (
    <>
      <motion.div className="fixed top-0 left-0 z-[120] pointer-events-none w-1.5 h-1.5 rounded-full bg-[#e8c36a]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: vis ? 1 : 0 }} />
      <motion.div className="fixed top-0 left-0 z-[119] pointer-events-none rounded-full border"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hot ? 56 : 34, height: hot ? 56 : 34, opacity: vis ? 1 : 0,
          borderColor: hot ? "rgba(126,224,255,.85)" : "rgba(232,195,106,.55)",
          backgroundColor: hot ? "rgba(126,224,255,.06)" : "transparent",
        }} />
    </>
  );
}

/** Wormhole / observatory tunnel */
export function QuantumTunnel() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const g = ctx;
    let w = 0, h = 0, dpr = 1, t = 0, raf = 0;
    type Star = { a: number; z: number; s: number };
    let stars: Star[] = [];
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: 180 }, () => ({
        a: Math.random() * Math.PI * 2,
        z: Math.random(),
        s: 0.4 + Math.random() * 1.6,
      }));
    };
    const draw = () => {
      t += 0.012;
      g.fillStyle = "rgba(5,6,10,0.22)";
      g.fillRect(0, 0, w, h);
      const cx = w / 2 + mouse.current.x * 40;
      const cy = h / 2 + mouse.current.y * 24;

      for (let i = 18; i >= 1; i--) {
        const z = ((t * 0.18 + i / 18) % 1);
        const r = 20 + z * Math.max(w, h) * 0.72;
        const a = 0.04 + (1 - z) * 0.22;
        g.beginPath();
        g.ellipse(cx, cy, r * 1.15, r * 0.52, Math.sin(t * 0.2) * 0.15, 0, Math.PI * 2);
        g.strokeStyle = i % 3 === 0 ? `rgba(232,195,106,${a})` : `rgba(126,224,255,${a * 0.7})`;
        g.lineWidth = i % 5 === 0 ? 1.4 : 0.6;
        g.stroke();
      }

      for (const s of stars) {
        s.z += 0.0035 * s.s;
        if (s.z > 1) { s.z = 0; s.a = Math.random() * Math.PI * 2; }
        const r = s.z * Math.max(w, h) * 0.55;
        const x = cx + Math.cos(s.a + t * 0.05) * r * 1.15;
        const y = cy + Math.sin(s.a + t * 0.05) * r * 0.52;
        g.fillStyle = `rgba(245,230,184,${s.z * 0.85})`;
        g.fillRect(x, y, s.z * 2.2, s.z * 2.2);
      }
      raf = requestAnimationFrame(draw);
    };
    const onM = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onM);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onM);
    };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" aria-hidden />;
}

export function Spotlight() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = (e: MouseEvent) => {
      el.style.background = `radial-gradient(520px circle at ${e.clientX}px ${e.clientY}px, rgba(232,195,106,.07), transparent 42%)`;
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return <div ref={ref} className="fixed inset-0 z-[1] pointer-events-none mix-blend-screen" />;
}

export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={`transition-transform duration-200 will-change-transform ${className}`}>
      {children}
    </div>
  );
}

export function TypingText({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const [text, setText] = useState("");
  const [pi, setPi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = phrases[pi % phrases.length];
    let d = del ? 32 : 72;
    if (!del && text === full) d = 1700;
    if (del && text === "") d = 240;
    const id = setTimeout(() => {
      if (!del && text === full) { setDel(true); return; }
      if (del && text === "") { setDel(false); setPi((p) => (p + 1) % phrases.length); return; }
      setText(full.slice(0, text.length + (del ? -1 : 1)));
    }, d);
    return () => clearTimeout(id);
  }, [text, del, pi, phrases]);
  return <span className={`caret ${className}`}>{text || "\u00A0"}</span>;
}

export function CountUp({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1500);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref} className={className}>{val}{suffix}</span>;
}

export function SectionHeading({ eyebrow, title, accent, sub }: { eyebrow: string; title: string; accent: string; sub?: string }) {
  return (
    <div className="mb-14 md:mb-20">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="font-mono text-[11px] tracking-[0.42em] text-[#e8c36a] uppercase mb-4">
        {eyebrow}
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="font-serif text-5xl md:text-7xl italic leading-[0.95] text-[var(--ink)]">
        {title} <span className="holo-text not-italic font-display font-extrabold">{accent}</span>
      </motion.h2>
      {sub && (
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-5 max-w-xl text-[var(--muted)] text-base md:text-lg">
          {sub}
        </motion.p>
      )}
    </div>
  );
}

export function Ticker({ items }: { items: string[] }) {
  const copyRow = (k: number) => (
    <div key={k} className="flex gap-10 pr-10" aria-hidden={k === 1}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-10 font-mono text-xs tracking-[0.32em] text-[var(--muted)] whitespace-nowrap">
          {it}<span className="text-[#e8c36a]">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden py-4 border-y" style={{ borderColor: "var(--line)" }}>
      <div className="flex w-max animate-marquee">{copyRow(0)}{copyRow(1)}</div>
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 720);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <motion.button aria-label="Top"
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 16, pointerEvents: show ? "auto" : "none" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full glass flex items-center justify-center text-[#e8c36a]">
      <ChevronUp size={18} />
    </motion.button>
  );
}

export function Clock() {
  const [s, setS] = useState("");
  useEffect(() => {
    const tick = () => setS(new Date().toISOString().slice(11, 19) + "Z");
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{s}</span>;
}
