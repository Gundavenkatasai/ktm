/**
 * KTM LC8 V-Twin Web Audio Engine Synthesizer
 * Generates an authentic low-frequency 75° V-Twin idle rumble, rev impulse, and UI clicks
 * adhering to strict browser autoplay policies (starts muted).
 */

class KTMAutosound {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private idleOsc1: OscillatorNode | null = null;
  private idleOsc2: OscillatorNode | null = null;
  private idleSub: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private isRunning: boolean = false;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      console.warn('Web Audio API not supported on this browser.');
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.startEngineSound();
      this.playHapticClick(600, 0.05);
    } else {
      this.stopEngineSound();
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  public playHapticClick(freq = 440, duration = 0.04) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context error guard
    }
  }

  public revEngine() {
    if (this.isMuted || !this.ctx || !this.filter || !this.idleOsc1 || !this.idleOsc2) return;
    try {
      const now = this.ctx.currentTime;
      // Ramp up frequency simulating 10,000 RPM surge
      this.idleOsc1.frequency.cancelScheduledValues(now);
      this.idleOsc1.frequency.setValueAtTime(45, now);
      this.idleOsc1.frequency.linearRampToValueAtTime(125, now + 0.4);
      this.idleOsc1.frequency.exponentialRampToValueAtTime(45, now + 1.2);

      this.idleOsc2.frequency.cancelScheduledValues(now);
      this.idleOsc2.frequency.setValueAtTime(90, now);
      this.idleOsc2.frequency.linearRampToValueAtTime(250, now + 0.4);
      this.idleOsc2.frequency.exponentialRampToValueAtTime(90, now + 1.2);

      this.filter.frequency.cancelScheduledValues(now);
      this.filter.frequency.setValueAtTime(280, now);
      this.filter.frequency.linearRampToValueAtTime(1200, now + 0.4);
      this.filter.frequency.exponentialRampToValueAtTime(280, now + 1.2);
    } catch {
      // Ignore audio error
    }
  }

  private startEngineSound() {
    if (!this.ctx || this.isRunning) return;
    try {
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

      // Primary cylinder
      this.idleOsc1 = this.ctx.createOscillator();
      this.idleOsc1.type = 'sawtooth';
      this.idleOsc1.frequency.setValueAtTime(45, this.ctx.currentTime); // ~1350 RPM idle

      // Secondary 75-degree offset cylinder
      this.idleOsc2 = this.ctx.createOscillator();
      this.idleOsc2.type = 'triangle';
      this.idleOsc2.frequency.setValueAtTime(90, this.ctx.currentTime);

      // Sub-bass thrum
      this.idleSub = this.ctx.createOscillator();
      this.idleSub.type = 'sine';
      this.idleSub.frequency.setValueAtTime(30, this.ctx.currentTime);

      this.idleOsc1.connect(this.filter);
      this.idleOsc2.connect(this.filter);
      this.idleSub.connect(this.filter);
      this.filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.idleOsc1.start();
      this.idleOsc2.start();
      this.idleSub.start();
      this.isRunning = true;
    } catch (err) {
      console.warn('Could not start synthesized engine sound:', err);
    }
  }

  private stopEngineSound() {
    if (!this.isRunning) return;
    try {
      this.idleOsc1?.stop();
      this.idleOsc2?.stop();
      this.idleSub?.stop();
      this.idleOsc1?.disconnect();
      this.idleOsc2?.disconnect();
      this.idleSub?.disconnect();
      this.gainNode?.disconnect();
    } catch {
      // clean stop
    }
    this.isRunning = false;
  }
}

export const soundSystem = new KTMAutosound();
