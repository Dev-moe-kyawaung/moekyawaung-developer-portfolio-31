import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { orbDecisions } from "../data";
import { Cpu, Zap, ShieldCheck, Boxes, GitBranch, Smartphone, Cloud, BrainCircuit } from "lucide-react";

const ICONS = [Cpu, Zap, ShieldCheck, Boxes, GitBranch, Smartphone, Cloud, BrainCircuit];

type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; color: string };

export default function Orb() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [idx, setIdx] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const burstRef = useRef(0);
  const idxRef = useRef(0);
  idxRef.current = idx;

  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % orbDecisions.length), 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const g = ctx;
    let w = 0, h = 0, t = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: P[] = [];

    const size = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    const burst = (n: number, color: string) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 1.1 + Math.random() * 3.4;
        particles.push({
          x: w / 2, y: h / 2, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          life: 0, max: 50 + Math.random() * 40, size: 1.2 + Math.random() * 3, color,
        });
      }
    };
    burst(36, "#e8c36a");
    burst(24, "#7ee0ff");
    const ambient = setInterval(() => burst(3, orbDecisions[idxRef.current]?.color ?? "#e8c36a"), 280);

    const draw = () => {
      t += 0.018;
      g.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;

      let grad = g.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.48);
      grad.addColorStop(0, "rgba(232,195,106,.16)");
      grad.addColorStop(0.45, "rgba(126,224,255,.06)");
      grad.addColorStop(1, "transparent");
      g.fillStyle = grad; g.fillRect(0, 0, w, h);

      for (const [rx, ry, speed] of [
        [Math.min(w, h) * 0.22, Math.min(w, h) * 0.09, 0.48],
        [Math.min(w, h) * 0.3, Math.min(w, h) * 0.12, -0.28],
      ] as [number, number, number][]) {
        g.save(); g.translate(cx, cy); g.rotate(Math.sin(t * 0.25) * 0.12);
        g.beginPath(); g.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        g.strokeStyle = "rgba(232,195,106,.28)"; g.lineWidth = 1; g.stroke();
        for (let k = 0; k < 5; k++) {
          const a = t * speed + (k / 5) * Math.PI * 2;
          g.beginPath(); g.arc(Math.cos(a) * rx, Math.sin(a) * ry, k === 0 ? 3.2 : 1.5, 0, Math.PI * 2);
          g.fillStyle = k === 0 ? "#fff" : "rgba(126,224,255,.8)";
          g.fill();
        }
        g.restore();
      }

      const R = Math.min(w, h) * 0.16;
      const pulse = 1 + Math.sin(t * 1.5) * 0.05;
      grad = g.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.08, cx, cy, R * pulse);
      grad.addColorStop(0, "rgba(255,250,230,.95)");
      grad.addColorStop(0.28, "rgba(232,195,106,.85)");
      grad.addColorStop(0.55, "rgba(126,224,255,.4)");
      grad.addColorStop(1, "transparent");
      g.fillStyle = grad; g.beginPath(); g.arc(cx, cy, R * pulse, 0, Math.PI * 2); g.fill();

      g.beginPath(); g.arc(cx, cy, R * 0.2, 0, Math.PI * 2);
      g.fillStyle = "rgba(255,255,255,.9)"; g.fill();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= 0.97; p.vy *= 0.97; p.x += p.vx; p.y += p.vy; p.life++;
        const lp = 1 - p.life / p.max;
        g.globalAlpha = Math.max(0, lp);
        g.fillStyle = p.color;
        g.fillRect(p.x, p.y, p.size, p.size * 0.55);
        if (p.life >= p.max) particles.splice(i, 1);
      }
      g.globalAlpha = 1;

      if (burstRef.current !== burstKey) {
        burstRef.current = burstKey;
        burst(32, orbDecisions[idxRef.current]?.color ?? "#e8c36a");
        burst(12, "#ffffff");
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); clearInterval(ambient); window.removeEventListener("resize", size); };
  }, [burstKey]);

  const d = orbDecisions[idx];
  const Di = ICONS[idx % ICONS.length];

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-1 mb-1">
        <div className="font-mono text-[10px] tracking-[0.32em] text-[#e8c36a]/80">CORE · ARCHITECT</div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-led" /> LIVE
        </div>
      </div>
      <button onClick={() => setBurstKey((k) => k + 1)} aria-label="Burst" data-cursor className="relative mx-auto block">
        <canvas ref={canvasRef} className="w-[260px] h-[260px] md:w-[320px] md:h-[320px]" />
      </button>
      <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl px-4 py-3 flex items-center gap-3 mt-1">
        <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${d.color}22`, color: d.color }}>
          <Di size={15} />
        </span>
        <div className="min-w-0">
          <div className="font-mono text-[10px] tracking-[0.28em]" style={{ color: d.color }}>{d.type}</div>
          <div className="text-sm truncate text-[var(--ink)]">{d.text}</div>
        </div>
      </motion.div>
    </div>
  );
}
