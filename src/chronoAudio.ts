// Web Audio Synthesizer for Chrono-Shift Horology and Temporal Warp
class ChronoSynth {
  private ctx: AudioContext | null = null;
  public enabled = false;

  private ensure() {
    if (!this.ctx && typeof window !== "undefined") {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.ensure();
      this.chime();
    }
    return this.enabled;
  }

  public tick(fine = false) {
    if (!this.enabled) return;
    try {
      this.ensure();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      const f = fine ? 2800 : 1850;
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.025);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.028);
    } catch {}
  }

  public click() {
    if (!this.enabled) return;
    try {
      this.ensure();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(620, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch {}
  }

  public chime() {
    if (!this.enabled) return;
    try {
      this.ensure();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [880, 1174.66, 1318.51, 1760];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.035, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.85);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.9);
      });
    } catch {}
  }

  public warp() {
    if (!this.enabled) return;
    try {
      this.ensure();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.exponentialRampToValueAtTime(1680, now + 0.45);
      gain1.gain.setValueAtTime(0.07, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.52);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(900, now + 0.1);
      osc2.frequency.exponentialRampToValueAtTime(320, now + 0.6);
      gain2.gain.setValueAtTime(0.04, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.62);
    } catch {}
  }

  public ripple() {
    if (!this.enabled) return;
    try {
      this.ensure();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.linearRampToValueAtTime(840, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.45);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.48);
    } catch {}
  }
}

export const chrono = new ChronoSynth();
