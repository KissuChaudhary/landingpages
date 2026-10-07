/**
 * Tiny procedural sound engine. Zero audio files: everything is synthesized with WebAudio.
 * Nothing plays until the visitor's first gesture (the shock), and the choice is remembered.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;
let enabled = true;
const listeners = new Set<(on: boolean) => void>();

const KEY = 'hv-sound';

export function readStoredSound(): boolean {
  try {
    return localStorage.getItem(KEY) !== '0';
  } catch {
    return true;
  }
}

export function isSoundOn() {
  return enabled;
}

export function onSoundChange(fn: (on: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function setSound(on: boolean, remember = true) {
  enabled = on;
  if (remember) {
    try {
      localStorage.setItem(KEY, on ? '1' : '0');
    } catch {}
  }
  if (!on) stopCharge();
  listeners.forEach((l) => l(on));
}

/** Must be called from inside a user gesture at least once (autoplay rules). */
export function unlock() {
  ensure();
}

function ensure() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.5;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp);
    comp.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function noise(): AudioBuffer | null {
  const c = ensure();
  if (!c) return null;
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, c.sampleRate * 1.5, c.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  return noiseBuf;
}

function burst(o: { dur: number; type?: BiquadFilterType; freq: number; q?: number; gain: number; attack?: number; freqTo?: number; delay?: number }) {
  const c = ensure();
  const buf = noise();
  if (!c || !buf || !master) return;
  const t0 = c.currentTime + (o.delay ?? 0);
  const src = c.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const f = c.createBiquadFilter();
  f.type = o.type ?? 'bandpass';
  f.frequency.setValueAtTime(o.freq, t0);
  if (o.freqTo) f.frequency.exponentialRampToValueAtTime(o.freqTo, t0 + o.dur);
  f.Q.value = o.q ?? 1;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(o.gain, t0 + (o.attack ?? 0.005));
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);
  src.connect(f);
  f.connect(g);
  g.connect(master);
  src.start(t0, Math.random());
  src.stop(t0 + o.dur + 0.05);
}

function tone(o: { freq: number; freqTo?: number; dur: number; gain: number; type?: OscillatorType; delay?: number; attack?: number; hold?: number }) {
  const c = ensure();
  if (!c || !master) return;
  const t0 = c.currentTime + (o.delay ?? 0);
  const osc = c.createOscillator();
  osc.type = o.type ?? 'sine';
  osc.frequency.setValueAtTime(o.freq, t0);
  if (o.freqTo) osc.frequency.exponentialRampToValueAtTime(o.freqTo, t0 + o.dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(o.gain, t0 + (o.attack ?? 0.006));
  if (o.hold) g.gain.setValueAtTime(o.gain, t0 + o.hold);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);
  osc.connect(g);
  g.connect(master);
  osc.start(t0);
  osc.stop(t0 + o.dur + 0.05);
}

/* ------------------------------------------------------------ defibrillator */

let chargeOsc: OscillatorNode | null = null;
let chargeOsc2: OscillatorNode | null = null;
let chargeGain: GainNode | null = null;

/** The rising whine of a defibrillator charging. `level` is 0..1. */
export function setCharge(level: number) {
  if (!enabled) return;
  const c = ensure();
  if (!c || !master) return;
  if (!chargeOsc) {
    chargeOsc = c.createOscillator();
    chargeOsc2 = c.createOscillator();
    chargeOsc.type = 'sine';
    chargeOsc2.type = 'triangle';
    chargeGain = c.createGain();
    chargeGain.gain.value = 0.0001;
    chargeOsc.connect(chargeGain);
    const g2 = c.createGain();
    g2.gain.value = 0.25;
    chargeOsc2.connect(g2);
    g2.connect(chargeGain);
    chargeGain.connect(master);
    chargeOsc.start();
    chargeOsc2.start();
  }
  const t = c.currentTime;
  const f = 260 * Math.pow(2600 / 260, Math.max(0, Math.min(1, level)));
  chargeOsc.frequency.setTargetAtTime(f, t, 0.03);
  chargeOsc2!.frequency.setTargetAtTime(f * 1.004, t, 0.03);
  chargeGain!.gain.setTargetAtTime(level <= 0.001 ? 0.0001 : 0.02 + level * 0.05, t, 0.04);
}

export function stopCharge() {
  if (!ctx || !chargeOsc) return;
  const t = ctx.currentTime;
  chargeGain?.gain.setTargetAtTime(0.0001, t, 0.02);
  const o1 = chargeOsc;
  const o2 = chargeOsc2;
  chargeOsc = null;
  chargeOsc2 = null;
  chargeGain = null;
  o1.stop(t + 0.2);
  o2?.stop(t + 0.2);
}

/** CLEAR. */
export function shock() {
  stopCharge();
  if (!enabled) return;
  tone({ freq: 92, freqTo: 34, dur: 0.5, gain: 0.95 });
  burst({ dur: 0.22, type: 'bandpass', freq: 2600, q: 0.7, gain: 0.45, freqTo: 900 });
  burst({ dur: 0.06, type: 'highpass', freq: 5200, gain: 0.35 });
  burst({ dur: 0.5, type: 'lowpass', freq: 400, gain: 0.25, delay: 0.02, freqTo: 60 });
}

/* ------------------------------------------------------------------ monitor */

/** The bedside-monitor beep. */
export function beep(v = 1) {
  if (!enabled) return;
  tone({ freq: 988, dur: 0.12, gain: 0.11 * v, hold: 0.05 });
}

/** A line going flat. */
export function flatline(dur = 0.7, v = 1) {
  if (!enabled) return;
  tone({ freq: 988, dur, gain: 0.05 * v, hold: dur * 0.7, attack: 0.02 });
}

/* --------------------------------------------------------------------- misc */

export function tick(v = 1) {
  if (!enabled) return;
  burst({ dur: 0.03, freq: 3200, q: 4, gain: 0.1 * v });
}

/** A rubber stamp hitting paper. */
export function thud(v = 1) {
  if (!enabled) return;
  tone({ freq: 140, freqTo: 44, dur: 0.22, gain: 0.8 * v });
  burst({ dur: 0.07, type: 'lowpass', freq: 900, gain: 0.45 * v });
  burst({ dur: 0.16, type: 'bandpass', freq: 380, q: 0.8, gain: 0.12 * v, delay: 0.02 });
}

/** Film being slid onto a lightbox. */
export function slide(v = 1) {
  if (!enabled) return;
  burst({ dur: 0.28, type: 'bandpass', freq: 1800, freqTo: 4200, q: 0.6, gain: 0.07 * v, attack: 0.04 });
}

/** A soft lub-dub. */
export function heart(v = 1) {
  if (!enabled) return;
  tone({ freq: 70, freqTo: 42, dur: 0.16, gain: 0.5 * v });
  tone({ freq: 62, freqTo: 38, dur: 0.14, gain: 0.35 * v, delay: 0.19 });
}
