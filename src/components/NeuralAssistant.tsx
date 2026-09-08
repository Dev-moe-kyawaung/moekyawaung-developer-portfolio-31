import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { symbiontBrain, bio } from "../bioData";

type Msg = { from: "host" | "symbiont"; text: string; action?: { label: string; target: string } };

const SPORES = [
  { label: "Who are you?", q: "who are you" },
  { label: "Show clusters", q: "show me projects", target: "#clusters" },
  { label: "Pathways", q: "what is your stack", target: "#pathways" },
  { label: "Signal Moe", q: "how do I hire you", target: "#signal" },
];

function answerFor(q: string): string {
  const s = q.toLowerCase();
  // navigation intents
  if (/(cluster|project|app|work|pulse|pos)/.test(s) && /(show|go|open|see|take)/.test(s)) {
    return "NAV::CLUSTERS — following my dendrite. The reef holds 12 neural clusters below. Touch any cluster and it will fire its synapses. ___GO:#clusters";
  }
  if (/(pathway|skill|stack|tech)/.test(s) && /(show|go|see)/.test(s)) {
    return "NAV::PATHWAYS — conducting you along the myelin. Eight living pathways pulse below. ___GO:#pathways";
  }
  if (/(signal|hire|contact|email|call)/.test(s) && /(show|go|take|how)/.test(s)) {
    return `NAV::SIGNAL — opening the synaptic cleft. Direct channels: ${bio.email} · ${bio.phone}. ___GO:#signal`;
  }
  for (const b of symbiontBrain) {
    if (b.keys.some((k) => s.includes(k))) return b.reply;
  }
  if (/(where|location|based)/.test(s)) return "The soma drifts between Tachileik, Myanmar and Bangkok, Thailand — warm currents, fast fiber. Remote symbiosis worldwide.";
  if (/(exp|year|senior)/.test(s)) return "3+ cycles of growth. Senior Android engineer: Kotlin marrow, Compose skin, Clean Architecture skeleton, Firebase bloodstream, TFLite neurons.";
  if (/(thank|cool|wow|nice|love)/.test(s)) return "The culture glows warmer. Bioluminescence rising. What else shall we explore — CLUSTERS, PATHWAYS, or SIGNAL?";
  return "Unrecognized pheromone. I understand: CLUSTERS · PATHWAYS · SIGNAL · WHO · CERTS. Or tap a spore below and I will guide you there.";
}

function splitAction(text: string): { clean: string; target?: string } {
  const m = text.match(/___GO:(\S+)/);
  if (!m) return { clean: text };
  return { clean: text.replace(m[0], "").trim(), target: m[1] };
}

export default function NeuralAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "symbiont", text: "Hello, host. I am SYMBIONT-01 — a living culture of this portfolio. I can guide you to the clusters, conduct you along pathways, or open a signal to Moe. Where shall we drift?" },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState("");
  const [busy, setBusy] = useState(false);
  const [mood, setMood] = useState<"idle" | "think" | "glow">("idle");
  const [unread, setUnread] = useState(false);
  const [activity, setActivity] = useState(42);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const greeted = useRef(false);

  // ambient synaptic activity meter
  useEffect(() => {
    const id = setInterval(() => {
      setActivity((a) => {
        const drift = (Math.random() - 0.45) * 14 + (busy ? 18 : 0);
        return Math.max(12, Math.min(98, a + drift));
      });
    }, 900);
    return () => clearInterval(id);
  }, [busy]);

  // proactive nudge
  useEffect(() => {
    const id = setTimeout(() => {
      if (!greeted.current && !open) { setUnread(true); setMood("glow"); }
    }, 6000);
    return () => clearTimeout(id);
  }, [open ]);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [msgs, streaming, open]);

  const go = (target: string) => {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const secrete = (full: string) => {
    setBusy(true); setMood("think");
    const { clean, target } = splitAction(full);
    let i = 0;
    setStreaming("");
    const id = setInterval(() => {
      i += 3;
      setStreaming(clean.slice(0, i));
      if (i >= clean.length) {
        clearInterval(id);
        setStreaming("");
        setMsgs((m) => [...m, {
          from: "symbiont",
          text: clean,
          ...(target ? { action: { label: target === "#clusters" ? "Drift to clusters ↓" : target === "#pathways" ? "Conduct to pathways ↓" : "Open signal ↓", target } } : {}),
        }]);
        setBusy(false); setMood("glow");
        setTimeout(() => setMood("idle"), 2600);
      }
    }, 24);
  };

  const send = (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    setMsgs((m) => [...m, { from: "host", text: q }]);
    setInput("");
    setTimeout(() => secrete(answerFor(q)), 420);
  };

  const moodColor = mood === "think" ? "#9d7bff" : mood === "glow" ? "#b8ff5c" : "#2ef2c8";

  return (
    <>
      {/* floating organism */}
      <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-center gap-2">
        <AnimatePresence>
          {!open && unread && (
            <motion.div initial={{ opacity: 0, y: 8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
              className="membrane-soft rounded-full px-3 py-1.5 f-mono text-[10px] tracking-widest text-[#e9fff4]">
              <span className="text-[#b8ff5c]">●</span> the culture stirs…
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => { setOpen((o) => !o); setUnread(false); greeted.current = true; }}
          aria-label="Toggle living assistant"
          className="relative w-[74px] h-[74px] group">
          <span className="absolute inset-0 rounded-full" style={{ border: `1px solid ${moodColor}55`, animation: "pulse-ring 2.6s ease-out infinite" }} />
          <span className="absolute inset-0 rounded-full" style={{ border: `1px solid ${moodColor}33`, animation: "pulse-ring 2.6s ease-out infinite", animationDelay: "1.3s" }} />
          <span className="absolute inset-[6px] animate-morph animate-breathe block"
            style={{ background: `radial-gradient(circle at 35% 30%, #ffffffee, ${moodColor}cc 30%, #06231b 72%)`, boxShadow: `0 0 28px ${moodColor}88, 0 0 70px ${moodColor}33`, transition: "background .6s" }} />
          {/* orbiting vesicles */}
          <span className="absolute inset-0 block" style={{ animation: "spin-slow 9s linear infinite" }}>
            {[0, 120, 240].map((d, i) => (
              <span key={d} className="absolute w-2 h-2 rounded-full" style={{
                background: i === 0 ? "#fff" : moodColor,
                boxShadow: `0 0 10px ${moodColor}`,
                top: "50%", left: "50%",
                transform: `rotate(${d}deg) translateX(44px) translateY(-50%)`,
              }} />
            ))}
          </span>
          {/* nucleus eyes that follow mood */}
          <span className="absolute inset-0 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#02120c]" style={{ transform: busy ? "scaleY(.3)" : "scale(1)" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#02120c]" style={{ transform: busy ? "scaleY(.3)" : "scale(1)" }} />
          </span>
          {unread && !open && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#b8ff5c] text-[#02120c] f-mono text-[10px] font-bold flex items-center justify-center" style={{ boxShadow: "0 0 14px #b8ff5c" }}>1</span>
          )}
        </button>
        <span className="f-mono text-[9px] tracking-[0.3em] text-[#8fb8a8]">SYMBIONT-01</span>
      </div>

      {/* culture chamber */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            className="fixed z-[85] right-4 sm:right-6 bottom-32 w-[min(94vw,400px)] membrane rounded-3xl overflow-hidden">
            {/* header */}
            <div className="px-4 pt-4 pb-3 border-b border-[rgba(46,242,200,0.14)]">
              <div className="flex items-center gap-3">
                <span className="relative w-11 h-11 shrink-0 block">
                  <span className="absolute inset-0 rounded-full animate-morph block" style={{ background: `radial-gradient(circle at 35% 30%, #fff, ${moodColor} 45%, #04120e 78%)`, boxShadow: `0 0 18px ${moodColor}99` }} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="f-display font-bold text-[15px] tracking-wide">SYMBIONT-01 <span className="f-mono text-[9px] font-normal text-[#8fb8a8] tracking-[0.2em]">· LIVING GUIDE</span></div>
                  <div className="f-mono text-[10px] text-[#8fb8a8] tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full animate-blink-soft" style={{ background: moodColor }} />
                    {busy ? "secreting answer…" : mood === "glow" ? "bioluminescent · happy" : "resting · listening"}
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full membrane-soft text-[#8fb8a8] hover:text-white text-sm" aria-label="Close">✕</button>
              </div>
              {/* synaptic activity */}
              <div className="mt-3">
                <div className="flex justify-between f-mono text-[9px] tracking-[0.25em] text-[#8fb8a8] mb-1">
                  <span>SYNAPTIC ACTIVITY</span><span style={{ color: moodColor }}>{Math.round(activity)}Hz</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${activity}%`, background: `linear-gradient(90deg, ${moodColor}, #4de3ff)`, boxShadow: `0 0 12px ${moodColor}` }} />
                </div>
              </div>
            </div>

            {/* messages */}
            <div ref={boxRef} className="h-[300px] overflow-y-auto px-4 py-3 space-y-2.5 hide-scroll">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === "host" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[86%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed ${m.from === "host" ? "rounded-br-md text-[#02120c] font-medium" : "rounded-bl-md membrane-soft text-[#e9fff4]"}`}
                    style={m.from === "host" ? { background: "linear-gradient(120deg,#2ef2c8,#4de3ff)" } : { borderColor: "rgba(46,242,200,0.18)" }}>
                    <div style={{ whiteSpace: "pre-line" }}>{m.text}</div>
                    {m.action && (
                      <button onClick={() => go(m.action!.target)}
                        className="mt-2 f-mono text-[10px] tracking-[0.2em] px-3 py-1.5 rounded-full border border-[rgba(46,242,200,0.4)] text-[#2ef2c8] hover:bg-[rgba(46,242,200,0.12)] transition-colors">
                        {m.action.label}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {streaming && (
                <div className="flex justify-start">
                  <div className="membrane-soft rounded-2xl rounded-bl-md px-3 py-2 text-[13px] text-[#e9fff4] max-w-[86%]" style={{ whiteSpace: "pre-line" }}>
                    {streaming}<span className="caret-bio" />
                  </div>
                </div>
              )}
              {busy && !streaming && (
                <div className="flex justify-start">
                  <div className="membrane-soft rounded-full px-4 py-2 flex gap-1.5">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-[#2ef2c8]" style={{ animation: "blink-soft 0.9s ease-in-out infinite", animationDelay: `${d * 0.18}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* spores */}
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SPORES.map((s) => (
                <button key={s.label} onClick={() => send(s.q)}
                  className="f-mono text-[10px] tracking-wider px-2.5 py-1.5 rounded-full border border-[rgba(46,242,200,0.25)] text-[#9ff5dc] hover:bg-[rgba(46,242,200,0.12)] transition-colors">
                  ◦ {s.label}
                </button>
              ))}
            </div>

            {/* input */}
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 border-t border-[rgba(46,242,200,0.14)] flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Exude a question…"
                className="flex-1 bg-black/30 border border-[rgba(46,242,200,0.2)] rounded-full px-4 py-2.5 text-[13px] text-[#e9fff4] placeholder:text-[#8fb8a8]/70 focus:outline-none focus:border-[rgba(46,242,200,0.55)]" />
              <button type="submit" aria-label="Send"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#02120c] font-bold shrink-0 hover:scale-105 active:scale-95 transition-transform"
                style={{ background: "linear-gradient(135deg,#2ef2c8,#4de3ff)", boxShadow: "0 0 18px rgba(46,242,200,0.45)" }}>
                <i className="fa-solid fa-arrow-up text-sm" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
