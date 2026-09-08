import { useEffect, useRef, useState, useCallback } from "react";
import { sound } from "../utils/audio";
import { Sliders, Eye, EyeOff, Sparkles, Binary, Grid3X3, Atom } from "lucide-react";

export type Palette = "cyan" | "matrix" | "violet" | "amber";

export const PALETTES: Record<Palette, {
  name: string;
  primary: string;
  secondary: string;
  glow: string;
  dim: string;
  accent: string;
}> = {
  cyan: {
    name: "Quantum Cyan",
    primary: "#00f0ff",
    secondary: "#8b5cf6",
    glow: "rgba(0, 240, 255, 0.45)",
    dim: "rgba(0, 240, 255, 0.12)",
    accent: "#38bdf8",
  },
  matrix: {
    name: "Matrix Emerald",
    primary: "#00ff66",
    secondary: "#10b981",
    glow: "rgba(0, 255, 102, 0.45)",
    dim: "rgba(0, 255, 102, 0.12)",
    accent: "#34d399",
  },
  violet: {
    name: "Nebula Violet",
    primary: "#c084fc",
    secondary: "#00f0ff",
    glow: "rgba(192, 132, 252, 0.45)",
    dim: "rgba(192, 132, 252, 0.12)",
    accent: "#f472b6",
  },
  amber: {
    name: "Solar Plasma",
    primary: "#fbbf24",
    secondary: "#f97316",
    glow: "rgba(251, 191, 36, 0.45)",
    dim: "rgba(251, 191, 36, 0.12)",
    accent: "#fb923c",
  },
};

const GLYPHS = [
  "|0⟩", "|1⟩", "|ψ⟩", "ℏ", "⊗", "⊕", "Ψ", "Ω", "λ", "∫", "∇", "Σ", "π",
  "0", "1", "α", "β", "Δt", "E=mc²", "iℏ∂/∂t", "KOTLIN", "COMPOSE", "CLEAN",
  "ROOM", "FLOW", "TFLITE", "0x7F", "0xFF", "val", "fun", "launch",
  "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス",
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  entangledIndex: number;
  energy: number;
};

type Stream = {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
  fontSize: number;
  lastUpdate: number;
};

export default function QuantumCanvas({
  palette = "cyan",
  onPaletteChange,
}: {
  palette?: Palette;
  onPaletteChange?: (p: Palette) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Layer switches
  const [showMatrix, setShowMatrix] = useState<boolean>(true);
  const [showParticles, setShowParticles] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showFractal, setShowFractal] = useState<boolean>(true);
  const [hudOpen, setHudOpen] = useState<boolean>(false);

  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const themeRef = useRef(PALETTES[palette]);
  themeRef.current = PALETTES[palette];

  const toggleHud = useCallback(() => {
    sound.playQuantumClick();
    setHudOpen((v) => !v);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let time = 0;

    // Initialize Particles
    let particles: Particle[] = [];
    const initParticles = () => {
      const count = Math.min(180, Math.max(70, Math.floor((w * h) / 9000)));
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: 1 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
        entangledIndex: (i + 1) % count,
        energy: 0.3 + Math.random() * 0.7,
      }));
    };

    // Initialize Matrix Streams
    let streams: Stream[] = [];
    const initStreams = () => {
      const colWidth = 26;
      const cols = Math.floor(w / colWidth);
      streams = Array.from({ length: cols }, (_, i) => {
        const len = 12 + Math.floor(Math.random() * 18);
        return {
          x: i * colWidth + colWidth / 2,
          y: Math.random() * -h,
          speed: 1.5 + Math.random() * 3.2,
          chars: Array.from({ length: len }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
          length: len,
          fontSize: 10 + Math.floor(Math.random() * 4),
          lastUpdate: 0,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
      initStreams();
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // =========================================================
    // RENDER LOOP
    // =========================================================
    const render = () => {
      time += 0.016;
      const theme = themeRef.current;

      // Dark quantum background trail
      ctx.fillStyle = "rgba(2, 4, 8, 0.28)";
      ctx.fillRect(0, 0, w, h);

      // 1. SHIFTING MATRIX GRID (3D Perspective cyber plane)
      if (showGrid) {
        ctx.save();
        const gridHorizon = h * 0.42;
        const gridLines = 18;
        const gridCols = 24;
        const gridSpeed = (time * 28) % 40;

        ctx.strokeStyle = theme.dim;
        ctx.lineWidth = 0.8;

        // Radial perspective lines converging to quantum vanishing point
        const cx = w * 0.5 + (mouseRef.current.active ? (mouseRef.current.x - w * 0.5) * 0.15 : 0);
        const cy = gridHorizon;

        for (let c = -gridCols; c <= gridCols; c++) {
          const bottomX = cx + c * (w / gridCols) * 1.8;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(bottomX, h);
          ctx.stroke();
        }

        // Horizontal undulating depth lines
        for (let r = 1; r <= gridLines; r++) {
          const p = (r + gridSpeed / 40) / gridLines;
          const y = cy + Math.pow(p, 2.2) * (h - cy);
          const alpha = p * 0.35;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          if (theme.primary !== "#00f0ff") {
            ctx.strokeStyle = theme.primary.replace(")", `, ${alpha})`).replace("rgb", "rgba");
          }

          ctx.beginPath();
          // Undulate grid horizontally with quantum sine wave
          for (let gx = 0; gx <= w; gx += 30) {
            const wave = Math.sin(gx * 0.008 + time * 2 + r * 0.5) * (p * 12);
            if (gx === 0) ctx.moveTo(gx, y + wave);
            else ctx.lineTo(gx, y + wave);
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. FRACTAL ANIMATION (Quantum Mandelbrot / Julia Recursive Bloom)
      if (showFractal) {
        ctx.save();
        const fx = w * 0.82;
        const fy = h * 0.32;
        const branches = 6;
        const maxDepth = 4;
        const angleOffset = Math.sin(time * 0.3) * 0.4;

        const drawQuantumBranch = (
          x: number,
          y: number,
          len: number,
          angle: number,
          depth: number
        ) => {
          if (depth <= 0 || !ctx) return;
          const nx = x + Math.cos(angle) * len;
          const ny = y + Math.sin(angle) * len;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nx, ny);
          const a = 0.15 + (depth / maxDepth) * 0.25;
          ctx.strokeStyle = theme.primary.startsWith("#")
            ? `${theme.primary}${Math.floor(a * 255).toString(16).padStart(2, "0")}`
            : theme.glow;
          ctx.lineWidth = depth * 0.9;
          ctx.stroke();

          // Subatomic node at branch joint
          ctx.beginPath();
          ctx.arc(nx, ny, depth * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = theme.secondary;
          ctx.fill();

          const newLen = len * 0.68;
          const spread = 0.45 + angleOffset * 0.2;
          drawQuantumBranch(nx, ny, newLen, angle - spread, depth - 1);
          drawQuantumBranch(nx, ny, newLen, angle + spread, depth - 1);
        };

        for (let b = 0; b < branches; b++) {
          const rot = (b / branches) * Math.PI * 2 + time * 0.15;
          drawQuantumBranch(fx, fy, 45, rot, maxDepth);
        }
        ctx.restore();
      }

      // 3. CASCADING DATA STREAMS (Matrix Rain with Quantum Glyphs)
      if (showMatrix) {
        ctx.save();
        ctx.font = '11px "Share Tech Mono", monospace';
        ctx.textAlign = "center";

        for (const s of streams) {
          s.y += s.speed;
          if (s.y - s.length * 15 > h) {
            s.y = Math.random() * -120;
            s.speed = 1.6 + Math.random() * 3.2;
          }

          // Random char mutation
          if (Math.random() < 0.05) {
            const idx = Math.floor(Math.random() * s.chars.length);
            s.chars[idx] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }

          for (let j = 0; j < s.chars.length; j++) {
            const charY = s.y - j * 15;
            if (charY < 0 || charY > h) continue;

            const isHead = j === 0;
            const alpha = isHead ? 0.95 : Math.max(0.04, 1 - j / s.chars.length) * 0.35;

            if (isHead) {
              ctx.fillStyle = "#ffffff";
              ctx.shadowColor = theme.primary;
              ctx.shadowBlur = 10;
            } else {
              ctx.fillStyle = theme.primary.startsWith("#")
                ? `${theme.primary}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`
                : theme.primary;
              ctx.shadowBlur = 0;
            }

            ctx.fillText(s.chars[j], s.x, charY);
          }
        }
        ctx.restore();
      }

      // 4. PARTICLE SIMULATIONS (Wave-particle duality & Entangled Pairs)
      if (showParticles) {
        ctx.save();
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const mouseActive = mouseRef.current.active;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Motion with quantum wave harmonic
          p.phase += 0.02;
          p.x += p.vx + Math.sin(p.phase) * 0.3;
          p.y += p.vy + Math.cos(p.phase) * 0.3;

          // Screen wrap
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          // Mouse gravity interaction
          if (mouseActive) {
            const dx = mx - p.x;
            const dy = my - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180 && dist > 1) {
              const force = (180 - dist) / 180;
              p.x += (dx / dist) * force * 1.5;
              p.y += (dy / dist) * force * 1.5;
            }
          }

          // Draw quantum particle with wave glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = theme.primary;
          ctx.shadowBlur = 8;
          ctx.shadowColor = theme.primary;
          ctx.fill();

          // Entangled line connections between close particle pairs
          const pair = particles[p.entangledIndex];
          if (pair) {
            const edx = pair.x - p.x;
            const edy = pair.y - p.y;
            const edist = Math.sqrt(edx * edx + edy * edy);
            if (edist < 110) {
              const ea = (1 - edist / 110) * 0.25;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pair.x, pair.y);
              ctx.strokeStyle = `rgba(139, 92, 246, ${ea})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [showMatrix, showParticles, showGrid, showFractal]);

  return (
    <>
      {/* Background Matrix Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden
      />

      {/* Floating HUD Controller (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-[75]">
        <button
          onClick={toggleHud}
          aria-label="Toggle Quantum HUD"
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full glass border border-white/10 text-xs font-mono text-[var(--ink)] hover:border-cyan-400/50 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
        >
          <Sliders size={13} className="text-[#00f0ff] animate-spin-slow group-hover:rotate-180 transition-transform" />
          <span className="tracking-widest hidden sm:inline">QUANTUM_HUD</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-led" />
        </button>

        {hudOpen && (
          <div className="absolute bottom-12 left-0 w-72 glass rounded-2xl border border-cyan-400/30 p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#00f0ff] flex items-center gap-1.5">
                <Atom size={12} /> FIELD CONTROLS
              </span>
              <span className="font-mono text-[9px] text-[var(--muted)]">v4.0 MATRIX</span>
            </div>

            {/* Layer Toggles */}
            <div className="space-y-2 mb-4">
              {[
                { label: "Cascading Rain", active: showMatrix, set: setShowMatrix, icon: Binary },
                { label: "Quantum Fractal", active: showFractal, set: setShowFractal, icon: Sparkles },
                { label: "Particle Entanglement", active: showParticles, set: setShowParticles, icon: Atom },
                { label: "Shifting Matrix Grid", active: showGrid, set: setShowGrid, icon: Grid3X3 },
              ].map(({ label, active, set, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => {
                    sound.playQuantumClick();
                    set(!active);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl font-mono text-[11px] transition-all border ${
                    active
                      ? "bg-cyan-500/10 border-cyan-400/40 text-cyan-200"
                      : "bg-white/[0.02] border-white/5 text-[var(--muted)] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={12} className={active ? "text-cyan-400" : "text-gray-500"} />
                    {label}
                  </span>
                  {active ? <Eye size={12} className="text-emerald-400" /> : <EyeOff size={12} />}
                </button>
              ))}
            </div>

            {/* Palette Switcher */}
            <div className="pt-2 border-t border-white/10">
              <div className="font-mono text-[9px] tracking-widest text-[var(--muted)] mb-2 uppercase">
                Quantum Palette
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(PALETTES) as Palette[]).map((key) => {
                  const p = PALETTES[key];
                  const isCurrent = palette === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        sound.playQuantumClick();
                        onPaletteChange?.(key);
                      }}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg font-mono text-[10px] border transition-all ${
                        isCurrent
                          ? "border-cyan-400 bg-cyan-400/15 text-white"
                          : "border-white/5 bg-white/[0.02] text-[var(--muted)] hover:text-white"
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.primary }} />
                      <span className="truncate">{p.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
