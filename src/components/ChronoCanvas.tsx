import { useEffect, useRef, useState, useCallback } from "react";
import { Eye, EyeOff, Clock3, Compass, FastForward } from "lucide-react";
import { chrono } from "../chronoAudio";

export type ChronoMode = "warp" | "precision" | "quantum" | "amber";

export const CHRONO_MODES: Record<ChronoMode, {
  name: string;
  tag: string;
  primary: string;
  secondary: string;
  speed: number;
}> = {
  warp: {
    name: "Temporal Warp",
    tag: "HIGH SPEED (1.8x)",
    primary: "#e8c96a",
    secondary: "#4de3ff",
    speed: 1.8,
  },
  precision: {
    name: "Chronometer 60Hz",
    tag: "STANDARD TICK (1.0x)",
    primary: "#4de3ff",
    secondary: "#e8c96a",
    speed: 1.0,
  },
  quantum: {
    name: "Tachyon Violet",
    tag: "TIME DILATION (0.5x)",
    primary: "#a855f7",
    secondary: "#4de3ff",
    speed: 0.5,
  },
  amber: {
    name: "Solar Epoch",
    tag: "SUNSET REEL (1.2x)",
    primary: "#ffb347",
    secondary: "#ff2975",
    speed: 1.2,
  },
};

export function ChronoField({
  mode = "warp",
  onModeChange,
}: {
  mode?: ChronoMode;
  onModeChange?: (m: ChronoMode) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Layer toggles
  const [showVortex, setShowVortex] = useState(true);
  const [showRings, setShowRings] = useState(true);
  const [showTachymeter, setShowTachymeter] = useState(true);
  const [showDust, setShowDust] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);

  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const modeConfig = CHRONO_MODES[mode];

  const togglePanel = useCallback(() => {
    chrono.click();
    setPanelOpen((v) => !v);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const g = ctx;

    let w = 0, h = 0, raf = 0, t = 0;

    type Dust = {
      r: number;
      a: number;
      s: number;
      c: string;
      speed: number;
      orbitSpeed: number;
      z: number;
    };
    const dust: Dust[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(180, Math.floor((w * h) / 9500));
      dust.length = 0;
      for (let i = 0; i < count; i++) {
        dust.push({
          r: Math.random() * Math.max(w, h) * 0.65,
          a: Math.random() * Math.PI * 2,
          s: 0.6 + Math.random() * 2.2,
          c: Math.random() > 0.5 ? modeConfig.primary : modeConfig.secondary,
          speed: (0.35 + Math.random() * 0.9) * modeConfig.speed,
          orbitSpeed: (0.003 + Math.random() * 0.007) * (Math.random() > 0.5 ? 1 : -1),
          z: Math.random(),
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      mouseRef.current.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const step = () => {
      t += 0.016 * modeConfig.speed;

      // Deep obsidian void with soft temporal persistence
      g.fillStyle = "rgba(7, 7, 11, 0.28)";
      g.fillRect(0, 0, w, h);

      // Chrono Core coordinates (smooth gravity tilt toward mouse)
      let cx = w * 0.5;
      let cy = h * 0.44;
      if (mouseRef.current.active) {
        cx += (mouseRef.current.x - cx) * 0.035;
        cy += (mouseRef.current.y - cy) * 0.035;
      }
      const maxR = Math.max(w, h) * 0.58;

      // 1. TIME-VORTEX SPIRALS
      if (showVortex) {
        g.save();
        g.translate(cx, cy);
        for (let arm = 0; arm < 4; arm++) {
          const armOffset = (arm / 4) * Math.PI * 2;
          g.beginPath();
          for (let stepR = 30; stepR < maxR; stepR += 14) {
            const spiralAngle = armOffset + Math.log(stepR / 20) * 2.8 - t * 0.65;
            const sx = Math.cos(spiralAngle) * stepR;
            const sy = Math.sin(spiralAngle) * (stepR * 0.68);
            if (stepR === 30) g.moveTo(sx, sy);
            else g.lineTo(sx, sy);
          }
          const alpha = 0.08 + Math.sin(t + arm) * 0.03;
          g.strokeStyle = arm % 2 === 0
            ? `${modeConfig.primary}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`
            : `${modeConfig.secondary}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
          g.lineWidth = 1.2;
          g.stroke();
        }
        g.restore();
      }

      // 2. CONCENTRIC CHRONOGRAPH RINGS
      if (showRings) {
        g.save();
        g.translate(cx, cy);

        // Outer calibrated ring with glowing notches
        const ringRadii = [maxR * 0.28, maxR * 0.46, maxR * 0.64];
        ringRadii.forEach((rad, rIdx) => {
          const rotSpeed = (rIdx % 2 === 0 ? 0.08 : -0.05) * (rIdx + 1);
          g.save();
          g.rotate(t * rotSpeed);

          g.beginPath();
          g.arc(0, 0, rad, 0, Math.PI * 2);
          g.strokeStyle = rIdx === 1 ? `${modeConfig.primary}44` : "rgba(232, 201, 106, 0.16)";
          g.lineWidth = rIdx === 1 ? 1.6 : 0.8;
          g.setLineDash(rIdx === 1 ? [12, 8] : [3, 9]);
          g.stroke();
          g.setLineDash([]);

          // Orbiting chronometer jewels
          for (let j = 0; j < 3; j++) {
            const ja = (j / 3) * Math.PI * 2 + t * 0.3;
            const jx = Math.cos(ja) * rad;
            const jy = Math.sin(ja) * rad;
            g.beginPath();
            g.arc(jx, jy, rIdx === 1 ? 3 : 2, 0, Math.PI * 2);
            g.fillStyle = j === 0 ? "#ffffff" : modeConfig.primary;
            g.shadowColor = modeConfig.primary;
            g.shadowBlur = 8;
            g.fill();
            g.shadowBlur = 0;
          }

          g.restore();
        });

        g.restore();
      }

      // 3. TACHYMETER ESCAPEMENT (60 graduations)
      if (showTachymeter) {
        g.save();
        g.translate(cx, cy);
        g.rotate(t * 0.04);
        const tr = maxR * 0.76;

        for (let i = 0; i < 60; i++) {
          const a = (i / 60) * Math.PI * 2;
          const big = i % 5 === 0;
          const r1 = tr - (big ? 14 : 7);
          g.beginPath();
          g.moveTo(Math.cos(a) * r1, Math.sin(a) * (r1 * 0.72));
          g.lineTo(Math.cos(a) * tr, Math.sin(a) * (tr * 0.72));
          g.strokeStyle = big ? modeConfig.primary : "rgba(232, 201, 106, 0.22)";
          g.lineWidth = big ? 1.8 : 0.9;
          g.stroke();
        }

        // Sweeping Chrono Hand with Phosphor Trail
        const handAngle = t * 0.22;
        for (let ghost = 0; ghost < 5; ghost++) {
          const ga = handAngle - ghost * 0.025;
          g.beginPath();
          g.moveTo(0, 0);
          g.lineTo(Math.cos(ga) * (tr * 0.95), Math.sin(ga) * (tr * 0.95 * 0.72));
          g.strokeStyle = ghost === 0 ? modeConfig.primary : `${modeConfig.primary}33`;
          g.lineWidth = ghost === 0 ? 2 : 1;
          g.shadowColor = modeConfig.primary;
          g.shadowBlur = ghost === 0 ? 12 : 0;
          g.stroke();
          g.shadowBlur = 0;
        }

        g.restore();
      }

      // 4. TEMPORAL DUST (Spiraling into the Chrono Singularity)
      if (showDust) {
        for (let i = 0; i < dust.length; i++) {
          const d = dust[i];
          const near = 1 - d.r / maxR;
          d.a += d.orbitSpeed + near * 0.025;
          d.r -= d.speed * (0.2 + near * 1.6);

          if (d.r < 22) {
            d.r = maxR * (0.85 + Math.random() * 0.15);
            d.a = Math.random() * Math.PI * 2;
          }

          const x = cx + Math.cos(d.a) * d.r;
          const y = cy + Math.sin(d.a) * (d.r * 0.72);
          const alpha = 0.2 + near * 0.8;

          g.beginPath();
          g.arc(x, y, d.s * (0.6 + near * 1.2), 0, Math.PI * 2);
          g.fillStyle = d.c;
          g.globalAlpha = Math.min(1, alpha);
          g.shadowColor = d.c;
          g.shadowBlur = near > 0.5 ? 8 : 0;
          g.fill();
          g.globalAlpha = 1;
          g.shadowBlur = 0;
        }
      }

      // Central Chrono Singularity
      const coreGrad = g.createRadialGradient(cx, cy, 0, cx, cy, 26);
      coreGrad.addColorStop(0, "#ffffff");
      coreGrad.addColorStop(0.4, modeConfig.primary);
      coreGrad.addColorStop(1, "transparent");
      g.beginPath();
      g.arc(cx, cy, 24, 0, Math.PI * 2);
      g.fillStyle = coreGrad;
      g.fill();

      raf = requestAnimationFrame(step);
    };

    step();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [mode, modeConfig, showVortex, showRings, showTachymeter, showDust]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden
      />

      {/* Floating Chrono HUD Controller (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-[75]">
        <button
          onClick={togglePanel}
          aria-label="Toggle Chrono HUD"
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-c border border-[rgba(232,201,106,0.3)] text-xs font-mono text-[#f5f0e4] hover:border-[#e8c96a] shadow-lg hover:shadow-[0_0_25px_rgba(232,201,106,0.25)] transition-all duration-300"
        >
          <Clock3 size={13} className="text-[#e8c96a] animate-spin-slow group-hover:rotate-180 transition-transform" />
          <span className="tracking-widest hidden sm:inline">CHRONO_HUD</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4de3ff] animate-blink-c" />
        </button>

        {panelOpen && (
          <div className="absolute bottom-12 left-0 w-80 glass-c-glow rounded-3xl border border-[rgba(232,201,106,0.35)] p-5 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(232,201,106,0.18)] mb-3">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#e8c96a] flex items-center gap-1.5">
                <Compass size={13} /> ESCAPEMENT CONTROLS
              </span>
              <span className="font-mono text-[9px] text-[#4de3ff]">v5.0 PRO</span>
            </div>

            {/* Layer Toggles */}
            <div className="space-y-2 mb-4">
              {[
                { label: "Temporal Vortex", active: showVortex, set: setShowVortex },
                { label: "Chronograph Rings", active: showRings, set: setShowRings },
                { label: "Tachymeter Escapement", active: showTachymeter, set: setShowTachymeter },
                { label: "Time Dust (Spirals)", active: showDust, set: setShowDust },
              ].map(({ label, active, set }) => (
                <button
                  key={label}
                  onClick={() => {
                    chrono.click();
                    set(!active);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl font-mono text-[11px] transition-all border ${
                    active
                      ? "bg-[rgba(232,201,106,0.12)] border-[rgba(232,201,106,0.4)] text-[#f7e8b8]"
                      : "bg-white/[0.02] border-white/5 text-[var(--muted)] hover:text-white"
                  }`}
                >
                  <span>{label}</span>
                  {active ? <Eye size={12} className="text-[#4de3ff]" /> : <EyeOff size={12} />}
                </button>
              ))}
            </div>

            {/* Chrono Speed & Palette Modes */}
            <div className="pt-2 border-t border-[rgba(232,201,106,0.18)]">
              <div className="font-mono text-[9px] tracking-widest text-[#a19a8d] mb-2 uppercase flex items-center justify-between">
                <span>TIME DILATION PRESET</span>
                <FastForward size={11} className="text-[#e8c96a]" />
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(CHRONO_MODES) as ChronoMode[]).map((key) => {
                  const m = CHRONO_MODES[key];
                  const isCurrent = mode === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        chrono.warp();
                        onModeChange?.(key);
                      }}
                      className={`flex flex-col items-start px-2.5 py-2 rounded-xl font-mono text-[10px] border transition-all text-left ${
                        isCurrent
                          ? "border-[#e8c96a] bg-[rgba(232,201,106,0.18)] text-white shadow-md shadow-amber-500/20"
                          : "border-white/5 bg-white/[0.02] text-[#a19a8d] hover:text-white"
                      }`}
                    >
                      <span className="font-bold flex items-center gap-1.5" style={{ color: m.primary }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.primary }} />
                        {m.name.split(" ")[0]}
                      </span>
                      <span className="text-[8px] opacity-70 mt-0.5">{m.tag.split(" ")[0]}</span>
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
