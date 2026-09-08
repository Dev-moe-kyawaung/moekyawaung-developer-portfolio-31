import { useState } from "react";
import { ChronoField, type ChronoMode } from "./components/ChronoCanvas";
import { Marquee } from "./components/ChronoFX";
import TimeNavigator from "./components/TimeNavigator";
import {
  Nav, Hero, Soma, Eras, Capsules, Mechanisms, Signal, Footer, BackToTop,
} from "./components/ChronoSections";
import { marqueeItems } from "./chronoData";

export default function ChronoApp() {
  const [chronoMode, setChronoMode] = useState<ChronoMode>("warp");

  return (
    <div
      className="min-h-screen relative overflow-x-clip transition-colors duration-700"
      style={{ background: "#07070b", color: "#f5f0e4" }}
    >
      {/* 
        Interactive Chrono Horizon Engine:
        1. Time-Vortex 4-Arm Spirals
        2. Concentric Chronograph Rings
        3. 60-Graduation Tachymeter Escapement
        4. Temporal Dust with Speed Dilation Modes
      */}
      <ChronoField
        mode={chronoMode}
        onModeChange={setChronoMode}
      />

      <div className="c-vignette" />
      <div className="c-grain" />

      {/* Floating Pocket-Watch AI Assistant: CHRONOS-NAVIGATOR */}
      <TimeNavigator />

      {/* Synchronized Nav with live UTC Chrono Dial */}
      <Nav />

      <main className="relative z-10">
        <Hero />
        <Marquee items={marqueeItems} />
        <Soma />
        <Eras />
        <Capsules />
        <Mechanisms />
        <Signal />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      <BackToTop />
    </div>
  );
}
