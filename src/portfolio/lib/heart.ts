/**
 * One heart for the whole site. Everything that pulses (the nav readout, the hero trace, the
 * finale) listens to this clock, so they all beat together. Scrolling fast raises the rate;
 * it settles back to resting when you stop.
 */

type BeatFn = (n: number) => void;

const REST = 72;
const subs = new Set<BeatFn>();
let bpm = REST;
let excitement = 0;
let acc = 0;
let count = 0;
let raf = 0;
let last = 0;

function loop(t: number) {
  const dt = last ? Math.min(100, t - last) : 16;
  last = t;
  excitement *= Math.pow(0.9985, dt); // settles over a few seconds
  const target = REST + Math.min(64, excitement);
  bpm += (target - bpm) * Math.min(1, dt / 600);
  acc += (dt / 60000) * bpm;
  if (acc >= 1) {
    acc -= 1;
    count++;
    subs.forEach((f) => f(count));
  }
  raf = requestAnimationFrame(loop);
}

function start() {
  if (raf || typeof window === 'undefined') return;
  last = 0;
  raf = requestAnimationFrame(loop);
}

export function onBeat(fn: BeatFn) {
  subs.add(fn);
  start();
  return () => {
    subs.delete(fn);
    if (!subs.size && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}

/** Feed scroll velocity (px/frame-ish) in; the heart answers. */
export function excite(v: number) {
  excitement = Math.max(excitement, Math.min(64, Math.abs(v) * 1.6));
}

export const getBpm = () => Math.round(bpm);
