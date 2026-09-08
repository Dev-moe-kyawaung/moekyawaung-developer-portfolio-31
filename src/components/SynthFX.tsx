import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function useSoundEnabledWatcher() {
  // placeholder to keep import graph stable
  return null;
}

/* ---------------- CRT BOOT SCREEN ---------------- */
export function BootScreen({ onDone }: { onDone: () => void }) {
  const lines = [
    "MOTOROLA 68000 BIOS v2.4",
    "CHROME DISPLAY ......... OK",
    "NEON GRID .............. OK",
    "SCANLINES .............. OK",
    "MTN_DEW_VENDOR .......... READY",
    "PRESS <START> TO BEGIN",
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setShown((s) => {
      if (s >= lines.length) { clearInterval(id); return s; }
      return s + 1;
    }), 300);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shown >= lines.length) {
      const timeout = setTimeout(onDone, 1100);
      return () => clearTimeout(timeout);
    }
  }, [shown, onDone]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#02000d] flex flex-col items-center justify-center p-6 scanlines"
    >
      <div className="pixel text-[10px] sm:text-xs text-[#00f0ff] mb-6 tracking-wider glow-cyan">MKA // SYSTEM BOOT</div>
      <div className="crtfont text-xl sm:text-2xl text-[#34ff70] w-full max-w-md leading-tight" style={{ textShadow: "0 0 12px #34ff70" }}>
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} style={{ whiteSpace: "pre" }}>&gt; {l}</div>
        ))}
        <span className="inline-block w-3 h-4 align-middle" style={{ background: "#34ff70", animation: "blinker 0.8s step-end infinite" }} />
      </div>
      {shown >= lines.length && (
        <button onClick={onDone} className="pixel text-[9px] sm:text-[10px] text-[#ffe600] glow-yellow animate-pulse mt-8 bg-black/40 nbox rounded px-4 py-3 hover:scale-110 transition-transform">
          ▶ PRESS START
        </button>
      )}
    </motion.div>
  );
}

/* ---------------- RETRO TICKER ---------------- */
export function Ticker({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3 select-none" style={{ background: "linear-gradient(90deg,#200068,#ff2975)", boxShadow: "0 0 26px rgba(255,41,117,.4)" }}>
      <div className="flex w-max" style={{ animation: "carousel 42s linear infinite" }}>
        {row.map((it, i) => (
          <span key={i} className="px-6 retrofont text-sm sm:text-base tracking-widest flex items-center gap-6">
            <span className="glow-cyan text-[#fff]">▮▯ {it}</span>
            <span className="pixel text-[8px] text-[#ffe600]">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- NEON PERSPECTIVE GRID ---------------- */
export function NeonGrid({ rows = 18, className = "" }: { rows?: number; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 overflow-hidden ${className}`} style={{ perspective: "420px" }}>
      <div className="absolute left-1/2 bottom-0 w-[240%] -translate-x-1/2" style={{ transform: "rotateX(68deg) translateY(60%)" }}>
        <div className="relative w-full" style={{ paddingTop: "42%" }}>
          <div className="absolute inset-0" data-grid>
            {Array.from({ length: rows }).map((_, i) => {
              const depth = (i + 1) / rows;
              return (
                <div key={`h${i}`}
                  className="absolute inset-x-0 h-px"
                  style={{
                    top: `${Math.pow(depth, 1.6) * 90}%`,
                    background: "linear-gradient(90deg,transparent,rgba(0,240,255,.5),transparent)",
                    boxShadow: "0 0 8px rgba(0,240,255,.5)",
                    opacity: depth,
                  }}
                />
              );
            })}
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={`v${i}`} className="absolute top-0 bottom-0 border-l"
                style={{ left: `${(i / 22) * 100}%`, borderColor: "rgba(0,240,255,.22)" }} />
            ))}
            {/* moving "traveler" glow */}
            <div className="absolute left-[15%] w-24 h-24 rounded-full blur-2xl opacity-70"
              style={{ background: "#ff2975", animation: "float-bob 4s ease-in-out infinite" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SUNSET ---------------- */
export function Sunset() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[760px] h-[360px]">
      {/* horizon glow band */}
      <div className="absolute inset-x-0 bottom-0 h-[300px]"
        style={{ background: "linear-gradient(180deg, transparent 0%, #ff2975 45%, #ff901f 72%, #ffd319 100%)", maskImage: "linear-gradient(180deg,transparent,#000 60%)", WebkitMaskImage: "linear-gradient(180deg,transparent,#000 60%)", opacity: 0.9 }} />
      {/* sun disc with retro slits */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[210px] h-[210px] rounded-full overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #fff6c8 0%, #ffe600 22%, #ff901f 48%, #ff2975 78%, #d40c6f 100%)",
          boxShadow: "0 0 90px #ff2975, 0 0 200px #9000a8, inset 0 0 40px rgba(255,255,255,.4)",
          animation: "sun-pulse 4s ease-in-out infinite",
        }}>
        {[26, 58, 92, 128, 166].map((ty) => (
          <div key={ty} className="absolute inset-x-0 h-[9px]" style={{ top: ty, background: "#200068", boxShadow: "0 0 8px #200068", opacity: 0.9 }} />
        ))}
      </div>
      {/* faint reflective band under sun */}
      <div className="absolute left-1/2 translate-x-[-50%] top-1/2 h-px w-[560px]"
        style={{ background: "linear-gradient(90deg,transparent,#ffe600,transparent)", opacity: 0.6 }} />
    </div>
  );
}

/* ---------------- 8-BIT CLOCK ---------------- */
export function Clock() {
  const [s, setS] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setS(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick(); const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{s}</span>;
}

/* ---------------- TYPING (CRT) ---------------- */
export function RetroType({ words, className = "" }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  const [txt, setTxt] = useState("");
  useEffect(() => {
    const full = words[i];
    let d = del ? 30 : 75;
    if (!del && txt === full) d = 1300;
    if (del && txt === "") d = 300;
    const id = setTimeout(() => {
      if (!del && txt === full) { setDel(true); return; }
      if (del && txt === "") { setDel(false); setI((x) => (x + 1) % words.length); return; }
      setTxt(full.slice(0, txt.length + (del ? -1 : 1)));
    }, d);
    return () => clearTimeout(id);
  }, [txt, del, i, words]);
  return <span className={`caret ${className}`}>{txt}</span>;
}

/* ---------------- COUNT-UP (score) ---------------- */
export function CountUp({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1400);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref} className={className}>{v}{suffix}</span>;
}

/* ---------------- SECTION KICKER ---------------- */
export function Kicker({ k }: { k: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="pixel text-[9px] text-[#ffe600] glow-yellow tracking-wider">{k}</span>
      <span className="inline-block h-px bg-gradient-to-r from-[#ff2975] to-transparent w-24" />
    </div>
  );
}

/* ---------------- CARTRIDGE SLOT DECOR frame ---------------- */
export function CornerHooks() {
  return (
    <>
      {["top-2 left-2 border-t-2 border-l-2", "top-2 right-2 border-t-2 border-r-2", "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"].map((c) => (
        <span key={c} className={`absolute w-4 h-4 border-[#ff2975] smooth-glow ${c}`} />
      ))}
    </>
  );
}

/* ---------------- CRT MARQUEE STATUS LED ---------------- */
export function Led() {
  return <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff2efd] align-middle" style={{ animation: "led-on 1.4s ease-in-out infinite", boxShadow: "0 0 10px #ff2efd" }} />;
}
