import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ============================================================
   TIME-VORTEX FIELD — particles spiral into the chrono core
============================================================ */
export function ChronoField() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const g = ctx;
    let w = 0, h = 0, raf = 0, t = 0;
    const mouse = { x: -9999, y: -9999 };
    const dust: { r: number; a: number; s: number; c: string; speed: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(160, Math.floor((w * h) / 11000));
      dust.length = 0;
      for (let i = 0; i < n; i++) {
        dust.push({
          r: Math.random() * Math.max(w, h) * 0.62,
          a: Math.random() * Math.PI * 2,
          s: 0.5 + Math.random() * 1.8,
          c: Math.random() > 0.6 ? "#e8c96a" : "#4de3ff",
          speed: 0.25 + Math.random() * 0.8,
        });
      }
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const step = () => {
      t += 0.016;
      g.fillStyle = "rgba(10,10,14,0.26)";
      g.fillRect(0, 0, w, h);

      // the chrono core drifts gently toward the visitor
      let cx = w * 0.5, cy = h * 0.44;
      if (mouse.x > -999) { cx += (mouse.x - cx) * 0.012; cy += (mouse.y - cy) * 0.012; }
      const maxR = Math.max(w, h) * 0.55;

      // faint tachymeter ring
      g.save();
      g.translate(cx, cy);
      g.rotate(t * 0.03);
      g.strokeStyle = "rgba(232,201,106,0.14)";
      g.lineWidth = 1;
      for (let i = 0; i < 60; i++) {
        const a = (i / 60) * Math.PI * 2;
        const big = i % 5 === 0;
        g.beginPath();
        g.moveTo(Math.cos(a) * (maxR - (big ? 16 : 8)), Math.sin(a) * (maxR - (big ? 16 : 8)));
        g.lineTo(Math.cos(a) * maxR, Math.sin(a) * maxR);
        g.stroke();
      }
      g.restore();

      // sweeping hand with trailing ghost
      const hand = t * 0.18;
      for (let ghost = 0; ghost < 5; ghost++) {
        const a = hand - ghost * 0.02;
        g.beginPath();
        g.moveTo(cx, cy);
        g.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
        g.strokeStyle = `rgba(232,201,106,${0.16 - ghost * 0.028})`;
        g.lineWidth = 1.4;
        g.stroke();
      }

      // time dust spiraling into the core
      for (const d of dust) {
        const near = 1 - d.r / maxR;
        d.a += 0.004 + near * 0.02;
        d.r -= d.speed * (0.3 + near * 1.4);
        if (d.r < 26) { d.r = maxR * (0.9 + Math.random() * 0.12); d.a = Math.random() * Math.PI * 2; }
        const x = cx + Math.cos(d.a) * d.r;
        const y = cy + Math.sin(d.a) * d.r * 0.72;
        const alpha = 0.15 + near * 0.75;
        g.beginPath();
        g.arc(x, y, d.s * (0.6 + near), 0, Math.PI * 2);
        g.fillStyle = d.c;
        g.globalAlpha = alpha;
        g.shadowColor = d.c;
        g.shadowBlur = 6;
        g.fill();
        g.globalAlpha = 1;
        g.shadowBlur = 0;
      }

      raf = requestAnimationFrame(step);
    };

    resize(); step();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" aria-hidden />;
}

/* ============================================================
   MASTER CHRONOGRAPH — live sweep + layered rotating rings
============================================================ */
export function MasterChrono({ size = 340 }: { size?: number }) {
  const [sec, setSec] = useState(() => new Date().getSeconds());
  useEffect(() => {
    const id = setInterval(() => setSec(new Date().getSeconds()), 1000);
    return () => clearInterval(id);
  }, []);
  const ticks = Array.from({ length: 60 });
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* halo */}
      <div className="absolute inset-[-14%] rounded-full opacity-50" style={{ background: "radial-gradient(circle, rgba(232,201,106,0.14), transparent 60%)" }} />
      <svg viewBox="0 0 340 340" width={size} height={size} className="relative">
        {/* outer case */}
        <circle cx="170" cy="170" r="166" fill="rgba(14,14,20,0.55)" stroke="rgba(232,201,106,0.35)" strokeWidth="2" />
        <circle cx="170" cy="170" r="152" fill="none" stroke="rgba(232,201,106,0.16)" strokeWidth="1" />
        {/* ticks */}
        {ticks.map((_, i) => {
          const a = (i / 60) * Math.PI * 2;
          const big = i % 5 === 0;
          const r1 = big ? 128 : 138;
          return (
            <line key={i} x1={170 + Math.cos(a) * r1} y1={170 + Math.sin(a) * r1}
              x2={170 + Math.cos(a) * 148} y2={170 + Math.sin(a) * 148}
              stroke={big ? "rgba(242,223,160,0.75)" : "rgba(232,201,106,0.28)"}
              strokeWidth={big ? 2.2 : 1} strokeLinecap="round" />
          );
        })}
        {/* numerals */}
        {[12, 3, 6, 9].map((n, i) => {
          const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
          return (
            <text key={n} x={170 + Math.cos(a) * 112} y={170 + Math.sin(a) * 112 + 5}
              textAnchor="middle" fontSize="15" fill="rgba(242,223,160,0.9)"
              style={{ fontFamily: "Michroma, sans-serif", letterSpacing: "0.1em" }}>{n}</text>
          );
        })}
        {/* rotating mid ring */}
        <g style={{ transformOrigin: "170px 170px", animation: "chrono-spin 26s linear infinite" }}>
          <circle cx="170" cy="170" r="98" fill="none" stroke="rgba(77,227,255,0.35)" strokeWidth="1.4" strokeDasharray="2 7" />
          <circle cx="268" cy="170" r="3.4" fill="#4de3ff" style={{ filter: "drop-shadow(0 0 6px #4de3ff)" }} />
        </g>
        {/* counter-rotating inner ring */}
        <g style={{ transformOrigin: "170px 170px", animation: "chrono-spin-rev 9s linear infinite" }}>
          <circle cx="170" cy="170" r="74" fill="none" stroke="rgba(232,201,106,0.4)" strokeWidth="1.2" strokeDasharray="10 6" />
          <circle cx="170" cy="96" r="3" fill="#e8c96a" style={{ filter: "drop-shadow(0 0 6px #e8c96a)" }} />
          <circle cx="244" cy="170" r="2" fill="#e8c96a" />
        </g>
        {/* sweep second hand */}
        <g style={{ transformOrigin: "170px 170px", transform: `rotate(${sec * 6}deg)`, transition: "transform 0.9s cubic-bezier(0.2, 0.7, 0.3, 1)" }}>
          <line x1="170" y1="196" x2="170" y2="64" stroke="rgba(242,223,160,0.95)" strokeWidth="2" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 5px #e8c96a)" }} />
        </g>
        {/* center cap */}
        <circle cx="170" cy="170" r="14" fill="#0a0a0e" stroke="rgba(232,201,106,0.6)" strokeWidth="1.6" />
        <circle cx="170" cy="170" r="3" fill="#e8c96a" />
      </svg>
      {/* floating readouts */}
      <div className="absolute -left-2 top-10 glass-c rounded-lg px-2.5 py-1.5 f-mono text-[9px] tracking-[0.2em] text-[#4de3ff] animate-floaty">UTC LOCKED</div>
      <div className="absolute -right-4 bottom-16 glass-c rounded-lg px-2.5 py-1.5 f-mono text-[9px] tracking-[0.2em] text-[#e8c96a] animate-floaty" style={{ animationDelay: "1.4s" }}>ERR −0.00s</div>
      <div className="absolute left-4 -bottom-3 glass-c rounded-lg px-2.5 py-1.5 f-mono text-[9px] tracking-[0.2em] text-[#2ef2c8] animate-floaty" style={{ animationDelay: "2.2s" }}>TEMPORAL INTEGRITY</div>
    </div>
  );
}

/* small dial for cards */
export function MiniDial({ size = 46, color = "#e8c96a", speed = 8, reverse = false }: { size?: number; color?: string; speed?: number; reverse?: boolean }) {
  const ticks = Array.from({ length: 12 });
  return (
    <div style={{ width: size, height: size }} className="relative shrink-0">
      <svg viewBox="0 0 46 46" width={size} height={size}>
        <circle cx="23" cy="23" r="21" fill="rgba(14,14,20,0.6)" stroke={color} strokeOpacity="0.4" strokeWidth="1.4" />
        {ticks.map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1={23 + Math.cos(a) * 16} y1={23 + Math.sin(a) * 16} x2={23 + Math.cos(a) * 19.4} y2={23 + Math.sin(a) * 19.4} stroke={color} strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" />;
        })}
        <g style={{ transformOrigin: "23px 23px", animation: `${reverse ? "chrono-spin-rev" : "chrono-spin"} ${speed}s linear infinite` }}>
          <line x1="23" y1="23" x2="23" y2="9" stroke={color} strokeWidth="1.6" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
        </g>
        <circle cx="23" cy="23" r="2.6" fill={color} />
      </svg>
    </div>
  );
}

/* ============================================================
   PRIMITIVES
============================================================ */
export function Typing({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const [txt, setTxt] = useState("");
  const [pi, setPi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = phrases[pi % phrases.length];
    let d = del ? 26 : 64;
    if (!del && txt === full) d = 1700;
    if (del && txt === "") d = 240;
    const id = setTimeout(() => {
      if (!del && txt === full) { setDel(true); return; }
      if (del && txt === "") { setDel(false); setPi((p) => (p + 1) % phrases.length); return; }
      setTxt(full.slice(0, txt.length + (del ? -1 : 1)));
    }, d);
    return () => clearTimeout(id);
  }, [txt, del, pi, phrases]);
  return <span className={`caret-c ${className}`}>{txt || " "}</span>;
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
        className="f-mono text-[11px] tracking-[0.4em] text-[#e8c96a] mb-4 flex items-center gap-3">
        <span className="w-8 h-px bg-gradient-to-r from-[#e8c96a] to-transparent" />{eyebrow}
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="f-display leading-[1.06] text-[clamp(1.7rem,4.4vw,3.2rem)]">
        {title} <span className="f-serif italic font-normal brass-text text-[1.15em]">{accent}</span>
      </motion.h2>
      {sub && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-4 text-[#9a948a] text-base md:text-lg leading-relaxed">{sub}</motion.p>}
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-[rgba(232,201,106,0.14)] bg-[rgba(14,14,20,0.6)] py-3 select-none">
      <div className="flex w-max" style={{ animation: "marquee-c 34s linear infinite" }}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 f-mono text-[11px] tracking-[0.32em] text-[#9a948a] whitespace-nowrap">
            {t}<span className="text-[#e8c96a]">✧</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   LAYER — shifting UI layer via scroll parallax
============================================================ */
export function Layer({ children, speed = 36, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
}
