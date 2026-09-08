import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "../utils/audio";
import {
  ExternalLink, X, Code2, LayoutDashboard, Smartphone, Gamepad2, Music4,
  MessageCircle, ShoppingCart, Wallet, CloudSun, Coins, Video, Store, Plane,
  Languages, BrainCircuit, Globe, Briefcase, Fingerprint, Star, Trophy, GraduationCap,
  Server, ShieldCheck, Cpu, Zap, Atom, GitBranch, Rocket, Cloud, Database, Bot,
  ListTodo, Newspaper, Radio, Share2, Layers, Check, Sparkles
} from "lucide-react";
import { projects, PROJECT_FILTERS, type Project, type IconName } from "../data";
import { useObs } from "../context";

const ICONS: Record<IconName, typeof Code2> = {
  BrainCircuit, LayoutDashboard, Smartphone, Gamepad2, Music4, MessageCircle,
  Trophy, ShoppingCart, Wallet, CloudSun, Coins, Video, Store, Plane, Languages,
  Server, ShieldCheck, Cpu, Zap, Code2, Atom, Fingerprint, GitBranch, Rocket,
  Cloud, Database, Globe, Bot, Briefcase, GraduationCap, ListTodo, Newspaper,
};

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const n = parseInt(clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

// Generate deterministic quantum hash
function getQuantumStateHash(_name: string, index: number) {
  const states = ["|001⟩", "|010⟩", "|100⟩", "|110⟩", "|101⟩", "|011⟩", "|111⟩", "|ψ+⟩"];
  return states[index % states.length];
}

export default function QuantumNetwork() {
  const { lang, t } = useObs();
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isSuperposition, setIsSuperposition] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const filteredProjects = useMemo(() => {
    return filter === "ALL"
      ? projects
      : projects.filter((p) => p.cats.includes(filter));
  }, [filter]);

  const countByFilter = useCallback((f: string) => {
    return f === "ALL" ? projects.length : projects.filter((p) => p.cats.includes(f)).length;
  }, []);

  // Entangle All animation trigger
  const triggerSuperposition = useCallback(() => {
    sound.playQuantumBurst();
    setIsSuperposition(true);
    setTimeout(() => setIsSuperposition(false), 2400);
  }, []);

  // Interactive Graph Canvas Line Connection Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1;
    let raf = 0;
    let time = 0;

    type NodePos = {
      id: string;
      x: number;
      y: number;
      accent: string;
      featured?: boolean;
    };

    type QuantumPacket = {
      from: number;
      to: number;
      progress: number;
      speed: number;
      color: string;
    };

    let packets: QuantumPacket[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const render = () => {
      time += 0.02;
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      ctx.clearRect(0, 0, cw, ch);

      // Collect real-time centers of node DOM elements
      const nodeElements = container.querySelectorAll<HTMLElement>("[data-quantum-node]");
      const cRect = container.getBoundingClientRect();
      const nodes: NodePos[] = [];

      nodeElements.forEach((el) => {
        const r = el.getBoundingClientRect();
        nodes.push({
          id: el.dataset.quantumNode || "",
          x: r.left - cRect.left + r.width / 2,
          y: r.top - cRect.top + r.height / 2,
          accent: el.dataset.accent || "#00f0ff",
          featured: el.dataset.featured === "true",
        });
      });

      // Construct graph edges based on proximity and architecture affinity
      const edges: [number, number][] = [];
      const threshold = Math.min(cw, ch) * 0.42 + 130;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < threshold) {
            edges.push([i, j]);
          }
        }
      }

      // 1. Draw Graph Connection Lines
      for (const [i, j] of edges) {
        const na = nodes[i];
        const nb = nodes[j];
        if (!na || !nb) continue;

        const isHot = hoveredNodeId && (na.id === hoveredNodeId || nb.id === hoveredNodeId);
        const isSuper = isSuperposition;

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);

        if (isHot || isSuper) {
          ctx.strokeStyle = hexToRgba(na.accent, 0.75);
          ctx.lineWidth = isHot ? 2 : 1.5;
          ctx.shadowColor = na.accent;
          ctx.shadowBlur = 12;
        } else {
          ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 2. Draw Quantum Packets (Photons)
      if (edges.length > 0 && Math.random() < 0.08) {
        const [fromIdx, toIdx] = edges[Math.floor(Math.random() * edges.length)];
        packets.push({
          from: fromIdx,
          to: toIdx,
          progress: 0,
          speed: 0.012 + Math.random() * 0.015,
          color: nodes[fromIdx]?.accent || "#00f0ff",
        });
      }

      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        const nFrom = nodes[pkt.from];
        const nTo = nodes[pkt.to];

        if (!nFrom || !nTo) {
          packets.splice(p, 1);
          continue;
        }

        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const px = nFrom.x + (nTo.x - nFrom.x) * pkt.progress;
        const py = nFrom.y + (nTo.y - nFrom.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Render Node Center Indicators
      for (const node of nodes) {
        const isHot = hoveredNodeId === node.id || isSuperposition;
        const pulse = 1 + Math.sin(time * 3 + node.x * 0.01) * 0.2;

        ctx.beginPath();
        ctx.arc(node.x, node.y, (isHot ? 6 : 3.5) * pulse, 0, Math.PI * 2);
        ctx.fillStyle = node.accent;
        ctx.shadowColor = node.accent;
        ctx.shadowBlur = isHot ? 16 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [hoveredNodeId, isSuperposition, filteredProjects]);

  return (
    <div className="relative">
      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {PROJECT_FILTERS.map((f) => {
            const isSelected = filter === f;
            return (
              <button
                key={f}
                onClick={() => {
                  sound.playQuantumClick();
                  setFilter(f);
                }}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all border ${
                  isSelected
                    ? "border-cyan-400 bg-cyan-400/20 text-cyan-200 shadow-md shadow-cyan-500/20"
                    : "border-white/10 glass text-[var(--muted)] hover:text-white hover:border-white/30"
                }`}
              >
                {f} <span className="text-[10px] opacity-60">[{countByFilter(f)}]</span>
              </button>
            );
          })}
        </div>

        {/* Graph Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={triggerSuperposition}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-purple-400/40 font-mono text-xs text-purple-300 hover:bg-purple-500/10 shadow-lg hover:shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles size={12} className="text-purple-400 animate-spin-slow" />
            ENTANGLE ALL
          </button>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[var(--muted)]">
            <Radio size={12} className="text-emerald-400 animate-led" />
            GRAPH COHERENCE: <span className="text-cyan-300">99.8%</span>
          </div>
        </div>
      </div>

      {/* Quantum Node Graph Canvas Container */}
      <div ref={containerRef} className="relative min-h-[500px]">
        {/* SVG/Canvas Entangled Graph Lines */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          aria-hidden
        />

        {/* Project Quantum Node Cards Grid */}
        <motion.div
          layout
          className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const Icon = ICONS[project.icon] || Code2;
              const isHovered = hoveredNodeId === project.id;
              const qState = getQuantumStateHash(project.name, idx);

              return (
                <motion.div
                  key={project.id}
                  data-quantum-node={project.id}
                  data-accent={project.accent}
                  data-featured={project.featured ? "true" : "false"}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    borderColor: isHovered ? project.accent : "rgba(255,255,255,0.08)",
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.35, delay: (idx % 6) * 0.04 }}
                  onMouseEnter={() => {
                    sound.playNodeHover();
                    setHoveredNodeId(project.id);
                  }}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => {
                    sound.playQuantumClick();
                    setSelectedProject(project);
                  }}
                  className={`group relative glass rounded-2xl p-5 border cursor-pointer hover:shadow-2xl transition-all duration-300 ${
                    project.featured
                      ? "bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 border-cyan-400/40"
                      : "border-white/10"
                  }`}
                  style={{
                    boxShadow: isHovered
                      ? `0 0 30px ${hexToRgba(project.accent, 0.3)}`
                      : "none",
                  }}
                >
                  {/* Top HUD Node Telemetry */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 text-[10px] font-mono">
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      NODE [0x{String(idx + 1).padStart(2, "0")}]
                    </span>
                    <span
                      className="px-2 py-0.5 rounded font-bold"
                      style={{
                        backgroundColor: `${project.accent}22`,
                        color: project.accent,
                      }}
                    >
                      {qState}
                    </span>
                  </div>

                  {/* Project Header */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: `${project.accent}22`,
                        color: project.accent,
                        border: `1px solid ${project.accent}44`,
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-display font-bold text-base text-[var(--ink)] truncate group-hover:text-cyan-300 transition-colors">
                          {project.name}
                        </h3>
                        {project.featured && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
                            <Star size={9} /> FLAGSHIP
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[10px] text-[var(--muted)]">
                        EST. {project.year} · {project.cats.join(" / ")}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[var(--ink)]/80 line-clamp-3 leading-relaxed mb-4 min-h-[48px]">
                    {lang === "mm" ? project.descMM : project.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-[var(--muted)] border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded text-[var(--muted)]">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[10px] font-mono text-[var(--muted)]">
                    <span className="group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                      <Share2 size={10} /> ENTANGLED
                    </span>
                    <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {t.inspect} <ExternalLink size={10} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quantum Node Inspector Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl glass rounded-3xl p-6 md:p-8 border border-cyan-400/40 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              style={{
                boxShadow: `0 0 60px ${hexToRgba(selectedProject.accent, 0.25)}`,
              }}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-[var(--muted)] hover:text-white hover:border-cyan-400 transition-all"
              >
                <X size={16} />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shrink-0"
                  style={{
                    backgroundColor: `${selectedProject.accent}22`,
                    color: selectedProject.accent,
                    border: `1px solid ${selectedProject.accent}44`,
                  }}
                >
                  {(() => {
                    const ModalIcon = ICONS[selectedProject.icon] || Code2;
                    return <ModalIcon size={28} />;
                  })()}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                      QUANTUM NODE
                    </span>
                    <span className="font-mono text-xs text-[var(--muted)]">
                      {selectedProject.cats.join(" · ")}
                    </span>
                  </div>
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[var(--ink)]">
                    {selectedProject.name}
                  </h2>
                </div>
              </div>

              {/* Full Description */}
              <p className="text-sm md:text-base text-[var(--ink)]/85 leading-relaxed mb-6">
                {lang === "mm" ? selectedProject.descMM : selectedProject.desc}
              </p>

              {/* Quantum Telemetry Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6 bg-black/40 rounded-2xl p-4 border border-white/5 font-mono text-center">
                <div>
                  <div className="text-lg font-bold text-cyan-300">99.8%</div>
                  <div className="text-[10px] text-[var(--muted)]">COHERENCE</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-300">|ψ+⟩</div>
                  <div className="text-[10px] text-[var(--muted)]">SUPERPOSITION</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-300">ACTIVE</div>
                  <div className="text-[10px] text-[var(--muted)]">TELEMETRY</div>
                </div>
              </div>

              {/* Architecture Tags */}
              <div className="mb-6">
                <div className="font-mono text-xs text-[var(--muted)] mb-2.5 flex items-center gap-1.5">
                  <Layers size={13} className="text-cyan-400" /> TECH LATTICE STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-3 py-1 rounded-lg bg-white/5 text-cyan-200 border border-cyan-400/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                <a
                  href={selectedProject.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-mono text-xs tracking-wider text-black font-semibold shadow-lg transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: selectedProject.accent }}
                >
                  <Code2 size={15} /> VIEW SOURCE REPOSITORY
                </a>
                <a
                  href="https://github.com/Dev-moe-kyawaung/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass border border-white/10 font-mono text-xs text-[var(--ink)] hover:border-cyan-400/40 transition-all"
                >
                  <Check size={14} className="text-emerald-400" /> VERIFIED CODE
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
