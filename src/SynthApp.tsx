import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BootScreen, Ticker } from "./components/SynthFX";
import { Nav, Hero, About, CartridgeCrate, Skills, Journey, CertsAndContact, Footer } from "./components/SynthSections";
import ArcadeAssistant from "./components/ArcadeAssistant";
import { tapeLines } from "./synthdata";

export default function SynthApp() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0b0120] text-[#fff]">
      {/* CRT global overlays */}
      <div className="scanlines fixed inset-0 z-[50] pointer-events-none opacity-70" />
      <div className="scanbeam" />

      {/* ambient flicker overlay */}
      <div className="fixed inset-0 z-[2] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(0,0,0,.35))" }} />

      <ArcadeAssistant />

      <AnimatePresence>
        {!booted && <BootScreen onDone={() => setBooted(true)} />}
      </AnimatePresence>

      <div className="relative z-[5]">
        <Nav />
        <main>
          <Hero />
          <Ticker items={tapeLines} />
          <About />
          <CartridgeCrate />
          <Skills />
          <Journey />
          <CertsAndContact />
          <Footer />
        </main>
      </div>

      {/* cheap keyboard hint — no real key mapping to keep tiny */}
      <style>{`.line-clamp-2{-webkit-line-clamp:2;line-clamp:2;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical}`}</style>
    </div>
  );
}
