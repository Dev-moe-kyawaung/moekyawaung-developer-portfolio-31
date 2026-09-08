import { useEffect, useRef, useState } from "react";
import { synth } from "../synthaudio";
import { SW } from "../synthdata";

type Msg = { from: "user" | "ai"; text: string };

const SUGG = [
  { label: "who are you", reply: "GREETINGS HUMAN. I AM GLITCH-80, YOUR SYNC ARCADE SIDEKICK.\nI GUIDE NEW PLAYERS THROUGH THE +4600 LEVELS OF THIS DEVELOPER." },
  { label: "stack", reply: "PRIMARY WEAPONS: KOTLIN, JETPACK COMPOSE, CLEAN ARCH, COROUTINES.\nBACK-END MODULES: FIREBASE, REST. AND AN AI PIN: TFLITE + CLAUDE API." },
  { label: "projects", reply: "LOADING CARTRIDGES… PULSE_SYNC.EXE & POS_PRO_MAX.ROM ARE MY FAVOURITES.\nOPEN THE CRATE LIST TO RETRIEVE THE FULL ROM ARCHIVE." },
  { label: "achieve", reply: "82+ CARTRIDGES UNLOCKED ACROSS 9 WINGS.\nMASTERY: ANDROID, AI, SECURITY, WEB — MULTI-CLASS BUILD." },
  { label: "hi-score", reply: "YOUR HIGH SCORE IS INFLUENCING THE FEED — I SEE A SENIOR-LEVEL CODE X.\nINSERT COIN TO HIRE." },
];

export default function ArcadeAssistant() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"chat" | "guide">("chat");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "ai", text: "INSERT COIN! I'M GLITCH-80, YOUR ARCADE COPILOT. READY TO SEARCH THE CARTRIDGE ATLAS." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [aiDrafted, setAiDrafted] = useState("");
  const [aiShown, setAiShown] = useState("");
  const [scrollDown, setScrollDown] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // Typewriter reveal for the AI draft
  useEffect(() => {
    let raf = 0;
    if (typing) {
      setAiShown("");
      let idx = 0;
      const step = () => {
        idx += 1;
        setAiShown(aiDrafted.slice(0, idx));
        if (idx < aiDrafted.length) raf = requestAnimationFrame(() => setTimeout(step, 18));
        else {
          setTyping(false);
          setMsgs((m) => [...m, { from: "ai", text: aiDrafted }]);
          setAiDrafted("");
          setAiShown("");
          synth.burst();
        }
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typing, aiDrafted]);

  // auto scroll
  useEffect(() => { setScrollDown((s) => s + 1); }, [msgs, typing, aiShown]);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [scrollDown, open]);

  const ask = (q: string, reply?: string) => {
    if (!q.trim()) return;
    synth.select();
    setMsgs((m) => [...m, { from: "user", text: q.trim() }]);
    setInput("");
    const found = reply ?? SUGG.find((s) => s.label.toLowerCase().split(" ")[0] === q.trim().toLowerCase().split(" ").slice(0, 1)[0])?.reply;
    const text = found ?? `ERROR 404: CARTRIDGE '${q}' NOT FOUND. TRY: STACK / PROJECTS / HI-SCORE.`;
    setTimeout(() => { setAiDrafted(text); setTyping(true); }, 350);
  };

  const submit = (e: React.FormEvent) => { e.preventDefault(); ask(input); };
  // guide list
  const guideRows = [
    "LEFT  ▸ SEE THE DEVELOPER MATRIX",
    "DOWN  ▸ EXPLORE THE PROJECT CARTRIDGES",
    "RIGHT ▸ ADMIRE THE SKILL LADDER",
    "A     ▸ OPEN A PROJECT + VIEW SOURCE",
    "B     ▸ REQUEST A 2026 SENIOR ROLE",
    "SELECT ▸ OPEN CARTRIDGE (ARCHIVE) CRATE",
    "START ▸ CONTINUE TO THE FUTURE",
  ];

  return (
    <>
      {/* FLOATING ACTION TRIGGER */}
      <div className="fixed bottom-6 right-5 z-[80] flex flex-col items-center" role="button">
        <button
          className="relative"
          onClick={() => { synth.coin(); setOpen((o) => !o); setView("chat"); }}
          aria-label="AI assistant"
        >
          <span className="block w-16 h-16 rounded-2xl bg-[#1a0b3c] border-[3px] flex items-center justify-center text-3xl"
            style={{ borderColor: "#ff2efd", boxShadow: "0 0 20px rgba(255,46,253,.5), 0 0 40px rgba(0,240,255,.25)", animation: "float-bob 4s ease-in-out infinite" }}>
            🤖
          </span>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#34ff70]" style={{ animation: "led-on 1s infinite", boxShadow: "0 0 10px #34ff70" }} />
        </button>
        {!open && (
          <span className="pixel mt-2 text-[8px] text-[#ffe600] bg-black/85 px-2 py-1 rounded whitespace-nowrap">GLITCH-80</span>
        )}
      </div>

      {/* WINDOW */}
      {open && (
        <div className="fixed z-[85] right-4 sm:right-5 bottom-24 w-[min(94vw,400px)] nbox rounded-xl overflow-hidden"
          style={{ background: "#0a0120", boxShadow: "0 0 50px rgba(255,46,253,.35), 0 0 90px rgba(0,240,255,.12)" }}>
          {/* header */}
          <div className="flex items-center justify-between px-3 py-2" style={{ background: "linear-gradient(90deg,#ff2efd,#9000a8)" }}>
            <div className="pixel text-[9px] text-white tracking-wide">GLITCH-80</div>
            <div className="flex items-center gap-2">
              <button onClick={() => { synth.select(); setView(view === "chat" ? "guide" : "chat"); }} className="pixel text-[7px] text-white bg-black/25 px-1.5 py-1 rounded">HELP</button>
              <button onClick={() => { synth.select(); setOpen(false); }} className="pixel text-[9px] text-white bg-black/25 px-1.5 py-1 rounded">✕</button>
            </div>
          </div>

          {/* mood + body */}
          <div className="p-3">
            {view === "chat" ? (
              <>
                <div className="h-44 overflow-y-auto pr-1 scanlines flex flex-col gap-2" ref={boxRef} style={{ scrollbarWidth: "none" }}>
                  {msgs.map((m, i) => (
                    <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[82%] px-2.5 py-1.5 rounded text-[11px] crtfont ${m.from === "user"
                        ? "bg-[#ff2efd]/20 text-[#fff]" : "bg-[#00f0ff]/10 text-[#bffdff]"}`}
                        style={{ whiteSpace: "pre-line", border: m.from === "ai" ? "1px solid rgba(0,240,255,.3)" : "1px solid rgba(255,46,253,.4)" }}>
                        {m.text}
                        {m.from === "ai" && (
                          <div className="text-[8px] crtfont text-[#00f0ff] mt-1">▸ {SW.handle}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="crtfont text-[#00f0ff] text-[11px] px-2 py-1 rounded" style={{ border: "1px solid rgba(0,240,255,.3)", background: "rgba(0,240,255,.08)" }}>
                        {aiShown}<span style={{ animation: "blinker .7s step-end infinite" }}>_</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* suggestions */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {SUGG.slice(0, 5).map((s) => (
                    <button key={s.label} onClick={() => { synth.blip(); ask(s.label, s.reply); }}
                      className="pixel text-[7px] text-[#ffe600] bg-black/30 border border-[#ffe600]/30 px-2 py-1.5 rounded hover:bg-[#ffe600] hover:text-black transition-colors">
                      {s.label.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* input */}
                <form onSubmit={submit} className="mt-2 flex gap-1.5">
                  <input value={input} onChange={(e) => setInput(e.target.value)}
                    placeholder="TYPE A QUERY…"
                    className="flex-1 bg-black/40 border border-[#00f0ff]/40 rounded px-2 py-1.5 text-[12px] crtfont text-[#00f0ff] focus:outline-none"
                    style={{ caretColor: "#00f0ff" }} />
                  <button type="submit" onClick={() => synth.select()} className="pixel text-[8px] px-3 py-1.5 rounded border border-[#ff2efd] text-[#ff2efd] bg-black/30 hover:bg-[#ff2efd] hover:text-black transition-colors">SEND</button>
                </form>
              </>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="pixel text-[8px] text-[#00f0ff]">CONTROLS GUIDE</span>
                </div>
                <div className="space-y-1.5">
                  {guideRows.map((r) => (
                    <div key={r} className="flex items-center gap-2 crtfont text-[12px] text-[#fff] bg-black/30 px-2 py-1 rounded" style={{ border: "1px solid rgba(255,255,255,.06)" }}>
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
