import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass, FastForward, Sparkles, ArrowRight
} from "lucide-react";
import { chrono } from "../chronoAudio";
import { eras, type Era } from "../chronoData";

type Msg = {
  id: string;
  from: "host" | "navigator";
  text: string;
  eraRef?: Era;
  action?: {
    label: string;
    targetYear?: number;
    targetSection?: string;
  };
};

const TEMPORAL_QUESTIONS = [
  { label: "2023: Ignition", q: "Tell me about 2023 ignition" },
  { label: "2024: 82+ Certs", q: "Explain the 2024 certification cascade" },
  { label: "2025: Senior Spec", q: "What happened in 2025 specialization?" },
  { label: "2026: AI Frontier", q: "What is Moe building in 2026?" },
  { label: "Architecture Path", q: "How did Moe evolve into a Clean Architecture engineer?" },
  { label: "On-Device AI", q: "Explain the on-device AI evolution with TFLite" },
];

function generateTemporalAnswer(query: string): { text: string; eraRef?: Era; action?: { label: string; targetYear?: number; targetSection?: string } } {
  const q = query.toLowerCase();

  if (q.includes("2023") || q.includes("ignition") || q.includes("start") || q.includes("begin")) {
    const era = eras[0];
    return {
      text: "⚡ ERA 2023 [IGNITION WINDOW]:\nThe genesis cycle. Moe ignited his coding journey across web and mobile ecosystems. Starting with vanilla JavaScript, Python, and foundational data structures, he forged his first project capsules like the Todo Engine. Every senior architect begins with clean fundamentals.",
      eraRef: era,
      action: { label: "WARP TIMELINE TO 2023", targetYear: 2023 },
    };
  }

  if (q.includes("2024") || q.includes("cert") || q.includes("cascade") || q.includes("hub")) {
    const era = eras[1];
    return {
      text: "📜 ERA 2024 [CASCADE WINDOW]:\nThe hyper-learning milestone. Moe completed an extraordinary 82+ verified technical certifications across 9 distinct engineering wings (Programming, Web, Mobile, Data, AI, Security, Blockchain, Systems, Marketing). His first verified certificate logged on July 4, 2024, building an unshakeable full-stack foundation.",
      eraRef: era,
      action: { label: "WARP TIMELINE TO 2024", targetYear: 2024 },
    };
  }

  if (q.includes("2025") || q.includes("special") || q.includes("senior") || q.includes("pos") || q.includes("launchpad")) {
    const era = eras[2];
    return {
      text: "🛠️ ERA 2025 [SPECIALIZATION WINDOW]:\nMoe specialized deeply into Senior Android Engineering with Kotlin, Jetpack Compose, MVVM/MVI, and Clean Architecture. Selected for Google Developers Launchpad programs, he architected production-grade enterprise capsules like POS Ultimate Pro Max, Job Portal, and real-time social dashboards.",
      eraRef: era,
      action: { label: "WARP TIMELINE TO 2025", targetYear: 2025 },
    };
  }

  if (q.includes("2026") || q.includes("frontier") || q.includes("translator") || q.includes("pulsesync") || q.includes("building")) {
    const era = eras[3];
    return {
      text: "🚀 ERA 2026 [FRONTIER WINDOW]:\nThe current chrono horizon. Moe is building flagship platforms: 'MoekyawTranslator' (on-device AI translation powered by Claude API and INT8 TFLite quantized models) and 'PulseSync' (senior multi-module offline-first Android platform with 100% CI/CD automated pipeline).",
      eraRef: era,
      action: { label: "WARP TIMELINE TO 2026", targetYear: 2026 },
    };
  }

  if (q.includes("architecture") || q.includes("clean") || q.includes("mvvm") || q.includes("modular")) {
    return {
      text: "🏛️ ARCHITECTURAL TRAJECTORY:\nMoe's architectural philosophy matured through 4 deliberate phases:\n1. 2023: Monolithic scripts & procedural flow\n2. 2024: Component-based separation & modular databases\n3. 2025: Domain-driven Clean Architecture with sealed ViewStates\n4. 2026: 12-module feature isolation, dynamic feature delivery, and hardware-backed keystores.",
      action: { label: "INSPECT CAPSULES", targetSection: "#capsules" },
    };
  }

  if (q.includes("ai") || q.includes("ml") || q.includes("tflite") || q.includes("claude")) {
    return {
      text: "🧠 ON-DEVICE AI SYNTHESIS:\nRather than relying strictly on heavy cloud latency, Moe specializes in on-device private edge inference using TensorFlow Lite INT8 quantization (achieving sub-35ms latency) coupled with Claude API for high-level semantic translation reasoning.",
      action: { label: "VIEW MOEKYAW TRANSLATOR", targetSection: "#capsules" },
    };
  }

  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("signal")) {
    return {
      text: "📡 TEMPORAL SIGNAL CHANNELS:\nMoe is actively open for Senior Android Engineer and on-device AI engineering opportunities. Reach him directly at moekyawaung2026@gmail.com or via telephone at +95 9 889 000 889.",
      action: { label: "TRANSMIT DIRECT SIGNAL", targetSection: "#signal" },
    };
  }

  return {
    text: `⏱️ TEMPORAL QUERY LOGGED: "${query}"\nAs your Time Navigator, I can guide you through any of Moe's 4 evolutionary eras (2023-2026), his 82+ verified certificates, or his flagship on-device AI architectures. Choose a temporal coordinate below.`,
    action: { label: "SCRUB COMPLETE TIMELINE", targetSection: "#eras" },
  };
}

export default function TimeNavigator() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "intro",
      from: "navigator",
      text: "Greetings, traveler of the timeline. I am CHRONOS-NAVIGATOR, your artificial chronometry intelligence. I maintain the historical record of Moe Kyaw Aung's engineering evolution from 2023 to 2026. Select a temporal milestone or ask any question to inspect his trajectory.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isWarping, setIsWarping] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [unreadCount, setUnreadCount] = useState(1);
  const [chronoAngle, setChronoAngle] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Rotate navigator gyro
  useEffect(() => {
    const id = setInterval(() => {
      setChronoAngle((a) => (a + 6) % 360);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingText, open]);

  // Execute navigation action
  const handleAction = (action: Msg["action"]) => {
    if (!action) return;
    chrono.warp();

    if (action.targetYear) {
      window.dispatchEvent(new CustomEvent("chrono:scrub", { detail: action.targetYear }));
      setTimeout(() => {
        document.querySelector("#eras")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    } else if (action.targetSection) {
      document.querySelector(action.targetSection)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Submit query
  const handleSend = (queryText: string) => {
    const q = queryText.trim();
    if (!q || isWarping) return;

    chrono.tick(true);
    const userMsg: Msg = {
      id: Date.now().toString(),
      from: "host",
      text: q,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsWarping(true);

    const result = generateTemporalAnswer(q);

    // Stream typewriter answer
    let charIdx = 0;
    setStreamingText("");

    const interval = setInterval(() => {
      charIdx += 4;
      setStreamingText(result.text.slice(0, charIdx));

      if (charIdx >= result.text.length) {
        clearInterval(interval);
        setStreamingText("");
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            from: "navigator",
            text: result.text,
            eraRef: result.eraRef,
            action: result.action,
          },
        ]);
        setIsWarping(false);
        chrono.chime();
      }
    }, 20);
  };

  return (
    <>
      {/* Floating Time Navigator Pocket Watch Device */}
      <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-center gap-2">
        <AnimatePresence>
          {!open && unreadCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-c rounded-full px-3.5 py-1.5 f-mono text-[10px] tracking-widest text-[#f5f0e4] border border-[rgba(232,201,106,0.4)] shadow-xl"
            >
              <span className="text-[#e8c96a]">✧</span> CHRONOS-NAVIGATOR ACTIVE
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            chrono.click();
            setOpen((prev) => !prev);
            setUnreadCount(0);
          }}
          aria-label="Toggle Time Navigator AI"
          className="relative group p-1"
        >
          {/* Expanding Temporal Shockwaves */}
          <span className="absolute inset-0 rounded-full border border-[rgba(232,201,106,0.55)] animate-ping" />
          <span className="absolute inset-[-4px] rounded-full border border-[rgba(77,227,255,0.4)] animate-pulse" />

          {/* Horological Gyroscope Outer Casing */}
          <div className="relative w-16 h-16 rounded-full glass-c-glow flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 64 64" className="w-14 h-14">
              {/* Outer dial ring */}
              <circle cx="32" cy="32" r="29" fill="rgba(12, 12, 18, 0.95)" stroke="#e8c96a" strokeWidth="1.6" />
              {/* 12 dial notches */}
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i / 12) * Math.PI * 2;
                return (
                  <line
                    key={i}
                    x1={32 + Math.cos(a) * 23}
                    y1={32 + Math.sin(a) * 23}
                    x2={32 + Math.cos(a) * 27}
                    y2={32 + Math.sin(a) * 27}
                    stroke="#f7e8b8"
                    strokeWidth={i % 3 === 0 ? "2" : "1.2"}
                  />
                );
              })}
              {/* Spinning escapement wheel */}
              <g
                style={{
                  transformOrigin: "32px 32px",
                  transform: `rotate(${chronoAngle}deg)`,
                  transition: "transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              >
                <line x1="32" y1="32" x2="32" y2="10" stroke="#4de3ff" strokeWidth="2" strokeLinecap="round" />
                <circle cx="32" cy="14" r="2" fill="#e8c96a" />
              </g>
              <circle cx="32" cy="32" r="3.5" fill="#e8c96a" />
              {isWarping && (
                <circle
                  cx="32"
                  cy="32"
                  r="27"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                  className="animate-spin"
                />
              )}
            </svg>

            {/* Glowing Navigator Core Icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#4de3ff] animate-ping" />
            </div>
          </div>

          <span className="f-mono text-[9px] tracking-[0.25em] text-[#e8c96a] font-semibold mt-1 block text-center">
            CHRONOS-AI
          </span>
        </button>
      </div>

      {/* Main Holographic Time Navigator Interface Dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed z-[85] right-4 sm:right-6 bottom-28 w-[min(94vw,440px)] glass-c-glow rounded-3xl overflow-hidden border border-[rgba(232,201,106,0.35)] shadow-2xl"
          >
            {/* Header Telemetry */}
            <div className="px-5 py-4 border-b border-[rgba(232,201,106,0.18)] bg-[rgba(10,10,16,0.7)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl glass-c flex items-center justify-center text-[#e8c96a] border border-[rgba(232,201,106,0.3)]">
                  <Compass size={18} className={isWarping ? "animate-spin" : ""} />
                </div>
                <div>
                  <div className="f-display text-sm tracking-wide text-[#f5f0e4] flex items-center gap-2">
                    CHRONOS-NAVIGATOR
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4de3ff] animate-blink-c" />
                  </div>
                  <div className="f-mono text-[10px] text-[#a19a8d] tracking-widest">
                    TEMPORAL AI · 2023 → 2026 ARCHIVE
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  chrono.click();
                  setOpen(false);
                }}
                className="w-8 h-8 rounded-full glass-c flex items-center justify-center text-[#a19a8d] hover:text-white transition-colors"
                aria-label="Close Navigator"
              >
                ✕
              </button>
            </div>

            {/* Conversation Log Stream */}
            <div
              ref={scrollRef}
              className="h-[320px] overflow-y-auto p-4 space-y-3 hide-scroll bg-[rgba(7,7,11,0.55)]"
            >
              {messages.map((m) => {
                const isNav = m.from === "navigator";
                return (
                  <div key={m.id} className={`flex ${isNav ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        isNav
                          ? "bg-[rgba(22,23,34,0.85)] border border-[rgba(232,201,106,0.22)] text-[#f5f0e4] shadow-md"
                          : "bg-gradient-to-r from-[#e8c96a] to-[#f7e8b8] text-[#07070b] font-medium font-mono"
                      }`}
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {m.text}

                      {/* Era Milestone Banner */}
                      {m.eraRef && (
                        <div className="mt-2.5 pt-2 border-t border-[rgba(232,201,106,0.2)] flex items-center justify-between font-mono text-[10px]">
                          <span style={{ color: m.eraRef.color }}>
                            ● {m.eraRef.phase}
                          </span>
                          <span className="text-[#a19a8d]">
                            INTEGRITY: {m.eraRef.integrity}
                          </span>
                        </div>
                      )}

                      {/* Action Navigation Button */}
                      {m.action && (
                        <button
                          onClick={() => handleAction(m.action)}
                          className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl f-mono text-[10px] tracking-wider font-bold transition-all hover:scale-102 active:scale-98"
                          style={{
                            background: "linear-gradient(90deg, #e8c96a, #4de3ff)",
                            color: "#07070b",
                            boxShadow: "0 0 15px rgba(232, 201, 106, 0.35)",
                          }}
                        >
                          <FastForward size={12} /> {m.action.label}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Streaming Typewriter Output */}
              {isWarping && streamingText && (
                <div className="flex justify-start">
                  <div className="max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed bg-[rgba(22,23,34,0.85)] border border-[rgba(77,227,255,0.4)] text-[#f5f0e4]">
                    {streamingText}
                    <span className="caret-c" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Era Evolution Suggestion Chips */}
            <div className="px-4 py-2 border-t border-[rgba(232,201,106,0.12)] bg-[rgba(10,10,16,0.8)]">
              <div className="f-mono text-[9px] tracking-widest text-[#a19a8d] mb-1.5 uppercase flex items-center gap-1">
                <Sparkles size={10} className="text-[#e8c96a]" /> QUICK EVOLUTION QUERIES:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TEMPORAL_QUESTIONS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSend(item.q)}
                    className="f-mono text-[9.5px] px-2.5 py-1 rounded-lg border border-[rgba(232,201,106,0.22)] bg-white/[0.02] text-[#f7e8b8] hover:border-[#e8c96a] hover:bg-[rgba(232,201,106,0.12)] transition-all"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 border-t border-[rgba(232,201,106,0.18)] bg-[rgba(7,7,11,0.9)] flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about 2023-2026, on-device AI, or architecture..."
                className="flex-1 bg-black/40 border border-[rgba(232,201,106,0.25)] rounded-2xl px-4 py-2.5 text-xs text-[#f5f0e4] placeholder:text-[#a19a8d]/60 focus:outline-none focus:border-[#e8c96a]"
              />
              <button
                type="submit"
                disabled={isWarping || !input.trim()}
                aria-label="Send Query"
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-[#07070b] font-bold shrink-0 disabled:opacity-40 transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #f7e8b8, #e8c96a)",
                  boxShadow: "0 0 16px rgba(232, 201, 106, 0.4)",
                }}
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
