// ============================================================
// Web Audio API Synthesizer for Quantum Matrix Effects
// No external MP3 files required — pure browser oscillator synthesis
// ============================================================

class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.initCtx();
      this.playQuantumClick();
    }
    return this.enabled;
  }

  public playNodeHover() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio context may be restricted
    }
  }

  public playQuantumClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(740, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1480, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Audio context may be restricted
    }
  }

  public playQuantumBurst() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Sub-bass impact
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(180, now);
      osc1.frequency.exponentialRampToValueAtTime(45, now + 0.45);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.45);

      // Plasma shimmer
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(800, now);
      osc2.frequency.exponentialRampToValueAtTime(2200, now + 0.25);
      gain2.gain.setValueAtTime(0.04, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.25);
    } catch {
      // Audio context may be restricted
    }
  }

  public playDataStream() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      const f = 1200 + Math.random() * 800;
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio context may be restricted
    }
  }
}

export const sound = new SoundFX();
