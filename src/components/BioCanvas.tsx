import { useEffect, useRef } from "react";

type Neuron = {
  x: number; y: number;
  vx: number; vy: number;
  r: number; seed: number;
  hue: number; glow: number;
};
type Pulse = { a: number; b: number; t: number; speed: number };

const HUES = [165, 190, 150, 265, 315];

export default function BioCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, time = 0;
    let neurons: Neuron[] = [];
    let pulses: Pulse[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(110, Math.max(46, Math.floor((w * h) / 16000)));
      neurons = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.6 + Math.random() * 2.6,
        seed: Math.random() * Math.PI * 2,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        glow: 0.5 + Math.random() * 0.5,
      }));
      pulses = [];
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const step = () => {
      time += 0.016;
      // deep abyss with soft trail for organic motion blur
      ctx.fillStyle = "rgba(2, 8, 6, 0.32)";
      ctx.fillRect(0, 0, w, h);

      const LINK = Math.min(190, Math.max(120, w / 9));

      // drift neurons with organic wander
      for (const n of neurons) {
        n.seed += 0.008;
        n.x += n.vx + Math.sin(n.seed + time * 0.6) * 0.22;
        n.y += n.vy + Math.cos(n.seed * 1.3 + time * 0.5) * 0.22;
        // gentle attraction to cursor (chemotaxis)
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < 220 && d > 4) {
          n.x += (dx / d) * 0.5;
          n.y += (dy / d) * 0.5;
        }
        if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
      }

      // synapse links
      const edges: [number, number][] = [];
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const a = neurons[i], b = neurons[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            edges.push([i, j]);
            const alpha = (1 - d / LINK) * 0.34;
            const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            g.addColorStop(0, `hsla(${a.hue}, 95%, 62%, ${alpha})`);
            g.addColorStop(1, `hsla(${b.hue}, 95%, 68%, ${alpha})`);
            ctx.strokeStyle = g;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      // spawn firing pulses along random synapses
      if (!reduced && edges.length && Math.random() < 0.16 && pulses.length < 26) {
        const [a, b] = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ a, b, t: 0, speed: 0.02 + Math.random() * 0.03 });
      }
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k];
        const A = neurons[p.a], B = neurons[p.b];
        if (!A || !B) { pulses.splice(k, 1); continue; }
        p.t += p.speed;
        if (p.t >= 1) {
          // flash the receiving soma
          B.glow = 1.4;
          pulses.splice(k, 1); continue;
        }
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        const fade = Math.sin(p.t * Math.PI);
        ctx.beginPath(); ctx.arc(x, y, 2.4 * fade + 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${(A.hue + B.hue) / 2}, 100%, 72%, ${0.9 * fade + 0.1})`;
        ctx.shadowColor = `hsla(${(A.hue + B.hue) / 2}, 100%, 65%, 0.9)`;
        ctx.shadowBlur = 14;
        ctx.fill(); ctx.shadowBlur = 0;
      }

      // soma bodies — bioluminescent cores
      for (const n of neurons) {
        n.glow += (0.7 - n.glow) * 0.02;
        const breathe = 1 + Math.sin(time * 2 + n.seed * 3) * 0.18;
        const R = n.r * breathe * (0.9 + n.glow * 0.4);
        // halo
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, R * 5);
        halo.addColorStop(0, `hsla(${n.hue}, 100%, 65%, ${0.28 * n.glow})`);
        halo.addColorStop(1, "transparent");
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(n.x, n.y, R * 5, 0, Math.PI * 2); ctx.fill();
        // core
        ctx.beginPath(); ctx.arc(n.x, n.y, R, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 100%, 74%, 0.95)`;
        ctx.shadowColor = `hsla(${n.hue}, 100%, 60%, 0.9)`;
        ctx.shadowBlur = 12 * n.glow;
        ctx.fill(); ctx.shadowBlur = 0;
        // nucleus
        ctx.beginPath(); ctx.arc(n.x, n.y, R * 0.38, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fill();
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

export function OrganicBlobs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute -top-32 -left-32 w-[560px] h-[560px] opacity-25 animate-drift animate-morph"
        style={{ background: "radial-gradient(circle at 40% 40%, #2ef2c8, transparent 65%)", filter: "blur(70px)" }} />
      <div className="absolute top-1/3 -right-40 w-[640px] h-[640px] opacity-20 animate-drift animate-morph"
        style={{ background: "radial-gradient(circle at 60% 50%, #9d7bff, transparent 65%)", filter: "blur(90px)", animationDelay: "-6s" }} />
      <div className="absolute -bottom-48 left-1/4 w-[620px] h-[620px] opacity-15 animate-drift animate-morph"
        style={{ background: "radial-gradient(circle at 50% 50%, #4de3ff, transparent 65%)", filter: "blur(90px)", animationDelay: "-3s" }} />
      <div className="absolute inset-0 petri opacity-70" />
    </div>
  );
}
