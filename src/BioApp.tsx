import BioCanvas, { OrganicBlobs } from "./components/BioCanvas";
import NeuralAssistant from "./components/NeuralAssistant";
import {
  Nav, Hero, Soma, Pathways, Clusters, Growth, Archive, Signal, Footer, BackToTop, Tape,
} from "./components/BioSections";

export default function BioApp() {
  return (
    <div className="min-h-screen relative overflow-x-clip" style={{ background: "#020806", color: "#e9fff4" }}>
      <BioCanvas />
      <OrganicBlobs />
      <div className="bio-vignette" />
      <div className="bio-grain" />
      <NeuralAssistant />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Tape />
        <Soma />
        <Pathways />
        <Clusters />
        <Growth />
        <Archive />
        <Signal />
      </main>
      <div className="relative z-10"><Footer /></div>
      <BackToTop />
    </div>
  );
}
