// 8-bit Web Audio Synthesizer — chiptune arcade blips with no external assets
type Ctx = AudioContext | null;

class Synth {
  private ctx: Ctx = null;
  enabled = false;

  private ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx?.state === "suspended") this.ctx.resume();
  }

  toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) this.ensure();
    return this.enabled;
  }

  private osc(type: OscillatorType, f0: number, f1: number, _t: number, dur: number, vol: number) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    const now = this.ctx.currentTime;
    o.frequency.setValueAtTime(f0, now);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), now + dur);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(vol, now + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    o.connect(g); g.connect(this.ctx.destination);
    o.start(now); o.stop(now + dur + 0.02);
  }

  blip() { if (this.enabled) { this.ensure(); this.osc("square", 660, 990, 0.05, 0.055, 0.05); } }
  select() { if (this.enabled) { this.ensure(); this.osc("square", 520, 1560, 0.06, 0.07, 0.06); } }
  burst() { if (this.enabled) { this.ensure(); this.osc("sawtooth", 220, 40, 0.35, 0.3, 0.08); this.osc("square", 880, 2200, 0.18, 0.14, 0.04); } }
  coin() { if (this.enabled) { this.ensure(); this.osc("triangle", 880, 880, 0.05, 0.1, 0.07); setTimeout(() => this.osc("triangle", 1568, 1568, 0.08, 0.18, 0.07), 90); } }
  jump() { if (this.enabled) { this.ensure(); this.osc("square", 220, 880, 0.1, 0.09, 0.05); } }
}

export const synth = new Synth();
export const fmt = (n: number) => String(n).padStart(2, "0");
