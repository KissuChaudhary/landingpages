'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useHv } from '../ui/context';
import { ecgLine, joltPath, noisyFlat, polyline, rPeakX, signatureStrokes, smoothPath, type Pt } from '../lib/ecg';
import { SIG_BASELINE, SIG_W } from '../signature';
import { clamp, easeInOutCubic, lerp, smoothstep } from '../lib/math';
import { useRange } from '../lib/scroll';
import { onBeat } from '../lib/heart';
import * as sfx from '../lib/sfx';
import { COUNTS, daysBuilding } from '../data';

/* ------------------------------------------------------------------ geometry */

type Kind = 'ecg' | 'link' | 'sig';

interface Piece {
  id: string;
  d: string;
  kind: Kind;
  layer: 'stage' | 'sig';
  /** R-peak x positions (ecg pieces). */
  peaks?: number[];
}

interface Geo {
  W: number;
  H: number;
  base: number;
  mobile: boolean;
  pieces: Piece[];
  box: { x: number; y: number; w: number; h: number };
}

const norm = (x: number, y: number) => {
  const n = Math.hypot(x, y) || 1;
  return [x / n, y / n] as const;
};

function buildGeo(W: number, H: number): Geo {
  const mobile = W < 720;
  const Sw = mobile ? Math.min(W * 0.84, 440) : clamp(W * 0.46, 520, 800);
  const k = Sw / SIG_W;
  // the signature's visual centre (≈43 units above its baseline) sits a little above the middle
  const base = H * (mobile ? 0.43 : 0.45) + 43 * k;
  const ox = (W - Sw) / 2;
  const oy = base - SIG_BASELINE * k;
  const strokes = signatureStrokes(k, ox, oy);

  const first = strokes[0];
  const last = strokes[strokes.length - 1];
  const s0 = first[0];
  const [tx, ty] = norm(first[2][0] - s0[0], first[2][1] - s0[1]);
  const e0 = last[last.length - 1];
  const [ux, uy] = norm(e0[0] - last[last.length - 3][0], e0[1] - last[last.length - 3][1]);

  // lead-in: rise from the baseline into the first stroke of the "h"
  const dIn = clamp(64 * k, 56, 170);
  const xa = s0[0] - dIn;
  const linkIn = `M${xa.toFixed(2)} ${base.toFixed(2)}C${(xa + dIn * 0.55).toFixed(2)} ${base.toFixed(2)} ${(s0[0] - tx * dIn * 0.42).toFixed(2)} ${(
    s0[1] -
    ty * dIn * 0.42
  ).toFixed(2)} ${s0[0].toFixed(2)} ${s0[1].toFixed(2)}`;

  // lead-out: the tail of the last "h" settles back onto the baseline
  const dOut = clamp(40 * k, 36, 120);
  const xb = e0[0] + dOut;
  const linkOut = `M${e0[0].toFixed(2)} ${e0[1].toFixed(2)}C${(e0[0] + ux * dOut * 0.45).toFixed(2)} ${(e0[1] + uy * dOut * 0.45).toFixed(2)} ${(
    xb -
    dOut * 0.5
  ).toFixed(2)} ${base.toFixed(2)} ${xb.toFixed(2)} ${base.toFixed(2)}`;

  // heartbeats either side, as tall as the loops of the h's want them to be
  const bw = clamp(W * 0.072, 62, 116);
  const amp = clamp(78 * k, 64, 210);
  const gap = bw * 1.85;
  const left: number[] = [];
  for (let x = xa - 28 - bw; x > 12; x -= gap) left.push(x);
  const right: number[] = [];
  for (let x = xb + 34; x + bw < W - 12; x += gap) right.push(x);

  const pieces: Piece[] = [];
  if (xa > 2) {
    pieces.push({
      id: 'ecg-l',
      kind: 'ecg',
      layer: 'stage',
      d: polyline(ecgLine(-2, xa, base, left, bw, amp)),
      peaks: left.map((x) => rPeakX(x, bw)),
    });
  }
  pieces.push({ id: 'in', kind: 'link', layer: 'stage', d: linkIn });
  strokes.forEach((s, i) => pieces.push({ id: `sig-${i}`, kind: 'sig', layer: 'sig', d: smoothPath(s) }));
  pieces.push({ id: 'out', kind: 'link', layer: 'stage', d: linkOut });
  if (xb < W - 2) {
    pieces.push({
      id: 'ecg-r',
      kind: 'ecg',
      layer: 'stage',
      d: polyline(ecgLine(xb, W + 2, base, right, bw, amp)),
      peaks: right.map((x) => rPeakX(x, bw)),
    });
  }

  const all = strokes.flat();
  const minX = Math.min(...all.map((p) => p[0]));
  const maxX = Math.max(...all.map((p) => p[0]));
  const minY = Math.min(...all.map((p) => p[1]));
  const maxY = Math.max(...all.map((p) => p[1]));
  return { W, H, base, mobile, pieces, box: { x: minX, y: minY, w: maxX - minX, h: maxY - minY } };
}

/* ------------------------------------------------------------------ timeline */

interface Seg {
  el: SVGPathElement;
  comet: SVGPathElement | null;
  kind: Kind;
  t0: number;
  t1: number;
  len: number;
  /** ecg only: sampled x for each length step, to sweep at constant horizontal speed */
  xs?: Float32Array;
  ls?: Float32Array;
  x0: number;
  speed: number;
}

interface Timeline {
  segs: Seg[];
  total: number;
  events: { t: number; kind: 'beat' | 'loop' }[];
}

function measure(geo: Geo, els: (SVGPathElement | null)[], comets: (SVGPathElement | null)[]): Timeline | null {
  const k = geo.box.w / SIG_W;
  const V_ECG = clamp(geo.W * 0.42, 260, 720);
  const V_LINK = 420 * Math.max(0.8, k / 2);
  const V_PEN = 470 * k;
  const segs: Seg[] = [];
  const events: Timeline['events'] = [];
  let t = 0;
  for (let i = 0; i < geo.pieces.length; i++) {
    const p = geo.pieces[i];
    const el = els[i];
    if (!el) return null;
    const len = el.getTotalLength();
    if (p.kind === 'ecg') {
      const n = Math.max(40, Math.ceil(len / 3));
      const xs = new Float32Array(n + 1);
      const ls = new Float32Array(n + 1);
      for (let j = 0; j <= n; j++) {
        ls[j] = (j / n) * len;
        xs[j] = el.getPointAtLength(ls[j]).x;
      }
      for (let j = 1; j <= n; j++) if (xs[j] < xs[j - 1]) xs[j] = xs[j - 1]; // keep it monotonic
      const dur = (xs[n] - xs[0]) / V_ECG;
      segs.push({ el, comet: comets[i], kind: p.kind, t0: t, t1: t + dur, len, xs, ls, x0: xs[0], speed: V_ECG });
      for (const px of p.peaks ?? []) events.push({ t: t + (px - xs[0]) / V_ECG, kind: 'beat' });
      t += dur;
    } else {
      const v = p.kind === 'sig' ? V_PEN : V_LINK;
      const dur = len / v;
      segs.push({ el, comet: comets[i], kind: p.kind, t0: t, t1: t + dur, len, x0: 0, speed: v });
      if (p.kind === 'sig' && (p.id === 'sig-0' || p.id === `sig-${geo.pieces.filter((q) => q.kind === 'sig').length - 1}`)) {
        // the top of each "h" loop beats like an R wave
        let best = 0;
        let bestY = Infinity;
        const n = 60;
        for (let j = 0; j <= n; j++) {
          const y = el.getPointAtLength((j / n) * len).y;
          if (y < bestY) {
            bestY = y;
            best = j / n;
          }
        }
        events.push({ t: t + best * dur, kind: 'loop' });
      }
      t += dur + (p.kind === 'sig' ? 0.07 : 0);
    }
  }
  events.sort((a, b) => a.t - b.t);
  return { segs, total: t, events };
}

/** local length drawn in a segment at time T */
function lengthAt(s: Seg, T: number): number {
  if (T <= s.t0) return 0;
  if (T >= s.t1) return s.len;
  const u = (T - s.t0) / (s.t1 - s.t0);
  if (s.kind === 'ecg' && s.xs && s.ls) {
    const x = s.x0 + (T - s.t0) * s.speed;
    let lo = 0;
    let hi = s.xs.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (s.xs[mid] <= x) lo = mid;
      else hi = mid;
    }
    const span = s.xs[hi] - s.xs[lo];
    const f = span > 0 ? (x - s.xs[lo]) / span : 0;
    return s.ls[lo] + (s.ls[hi] - s.ls[lo]) * clamp(f);
  }
  if (s.kind === 'sig') {
    // a hand speeds up in the middle of a stroke and slows at the ends
    const eased = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
    return s.len * lerp(u, eased, 0.3);
  }
  return s.len * u;
}

/* ---------------------------------------------------------------------- hero */

type Stage = 'boot' | 'shock' | 'writing' | 'done';

const CHARGE_MS = 1150;
const DRAIN_MS = 420;

export default function Hero() {
  const reduced = !!useReducedMotion();
  const { phase, setPhase, lockScroll } = useHv();

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const shakeRef = useRef<HTMLDivElement>(null);
  const flatRef = useRef<SVGPathElement>(null);
  const joltRef = useRef<SVGPathElement>(null);
  const penRef = useRef<HTMLDivElement>(null);
  const sigRef = useRef<HTMLDivElement>(null);
  const ecgSvgRef = useRef<SVGSVGElement>(null);
  const beatGlowRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const clearRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const pathEls = useRef<(SVGPathElement | null)[]>([]);
  const cometEls = useRef<(SVGPathElement | null)[]>([]);

  const [geo, setGeo] = useState<Geo | null>(null);
  const [stage, setStage] = useState<Stage>('boot');
  const [held, setHeld] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const lastNudge = useRef(0);
  const [days, setDays] = useState<number | null>(null);

  const stageRefState = useRef<Stage>('boot');
  stageRefState.current = stage;
  const timeline = useRef<Timeline | null>(null);
  const charge = useRef(0);
  const holding = useRef(false);
  const penMaxX = useRef(0);
  const dock = useRef(0);

  /* -------------------------------------------------------------- sizing */
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measureNow = () => {
      const W = Math.round(el.clientWidth);
      const H = Math.round(el.clientHeight);
      setGeo((g) => (g && g.W === W && Math.abs(g.H - H) < 2 ? g : buildGeo(W, H)));
    };
    measureNow();
    const ro = new ResizeObserver(measureNow);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => setDays(daysBuilding()), []);

  // (re)measure the timeline whenever the geometry changes
  useLayoutEffect(() => {
    if (!geo) return;
    timeline.current = measure(geo, pathEls.current, cometEls.current);
    const tl = timeline.current;
    if (!tl) return;
    const drawn = stageRefState.current === 'done';
    for (const s of tl.segs) {
      s.el.style.strokeDashoffset = drawn ? '0' : '1';
      s.el.style.opacity = drawn ? '1' : '0';
      if (s.comet) s.comet.style.opacity = '0';
    }
    if (flatRef.current) {
      flatRef.current.setAttribute('d', drawn ? '' : noisyFlat(geo.W, geo.base, 1.2, 0));
    }
    applyDock(dock.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo]);

  /* ------------------------------------------------------------ scroll lock */
  useEffect(() => {
    if (phase === 'alive') return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [phase, lockScroll]);

  /* ---------------------------------------------------------- finish / skip */
  const finish = useCallback(() => {
    const tl = timeline.current;
    if (tl) {
      for (const s of tl.segs) {
        s.el.style.strokeDashoffset = '0';
        s.el.style.opacity = '1';
      }
    }
    flatRef.current?.setAttribute('d', '');
    if (penRef.current) penRef.current.style.opacity = '0';
    sfx.stopCharge();
    setStage('done');
    setPhase('alive');
  }, [setPhase]);

  useEffect(() => {
    if (reduced && stage === 'boot' && geo && timeline.current) finish();
  }, [reduced, stage, geo, finish]);

  /* ---------------------------------------------------------------- writing */
  const write = useCallback(() => {
    const tl = timeline.current;
    const g = geo;
    if (!tl || !g) {
      finish();
      return;
    }
    setStage('writing');
    setPhase('writing');
    penMaxX.current = 0;
    let fired = 0;
    const start = performance.now();
    const pen = penRef.current;
    if (pen) pen.style.opacity = '1';

    const frame = (now: number) => {
      if (stageRefState.current !== 'writing') return;
      const T = (now - start) / 1000;
      let head: DOMPoint | null = null;
      for (const s of tl.segs) {
        if (T <= s.t0) {
          s.el.style.opacity = '0';
          continue;
        }
        s.el.style.opacity = '1';
        const l = lengthAt(s, T);
        s.el.style.strokeDashoffset = String(1 - l / s.len);
        if (T < s.t1 || (!head && s === tl.segs[tl.segs.length - 1])) head = s.el.getPointAtLength(l);
      }
      if (head && pen) {
        pen.style.transform = `translate3d(${head.x}px, ${head.y}px, 0)`;
        penMaxX.current = Math.max(penMaxX.current, head.x);
      }
      // the old flat line gets eaten by the pen, like a monitor sweep
      if (flatRef.current) {
        const x0 = penMaxX.current + 10;
        flatRef.current.setAttribute('d', x0 < g.W ? polyline(flatFrom(x0, g.W, g.base, T)) : '');
      }
      while (fired < tl.events.length && tl.events[fired].t <= T) {
        const ev = tl.events[fired++];
        sfx.beep(ev.kind === 'loop' ? 0.8 : 1);
        pulseGlow(1);
      }
      if (T >= tl.total + 0.05) {
        if (pen) pen.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
        finish();
        return;
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, finish, setPhase]);

  /* ------------------------------------------------------------------ shock */
  const fire = useCallback(() => {
    const g = geo;
    holding.current = false;
    setHeld(false);
    setStage('shock');
    sfx.shock();
    stageRef.current?.style.setProperty('--charge', '0');

    flashRef.current?.animate([{ opacity: 0.9 }, { opacity: 0 }], { duration: 560, easing: 'cubic-bezier(.1,.7,.2,1)' });
    clearRef.current?.animate(
      [
        { opacity: 0, transform: 'scale(1.12)' },
        { opacity: 1, transform: 'scale(1.02)', offset: 0.12 },
        { opacity: 1, transform: 'scale(1)', offset: 0.5 },
        { opacity: 0, transform: 'scale(0.98)' },
      ],
      { duration: 820, easing: 'cubic-bezier(.2,.7,.2,1)' },
    );
    shakeRef.current?.animate(
      [
        { transform: 'translate3d(0,0,0)' },
        { transform: 'translate3d(-16px,9px,0) rotate(-0.5deg)' },
        { transform: 'translate3d(12px,-7px,0) rotate(0.35deg)' },
        { transform: 'translate3d(-7px,4px,0) rotate(-0.15deg)' },
        { transform: 'translate3d(3px,-2px,0)' },
        { transform: 'translate3d(0,0,0)' },
      ],
      { duration: 560, easing: 'cubic-bezier(.2,.7,.2,1)' },
    );

    // the violent electrical artifact, decaying back to a flat line
    if (g && joltRef.current && flatRef.current) {
      const jolt = joltRef.current;
      const flat = flatRef.current;
      flat.setAttribute('d', '');
      const t0 = performance.now();
      const seed = Math.floor(Math.random() * 1e6);
      const step = (now: number) => {
        const t = now - t0;
        const amp = g.H * 0.3 * Math.exp(-t / 150);
        if (t < 620) {
          jolt.setAttribute('d', joltPath(g.W, g.base, amp, seed + Math.floor(t / 34)));
          jolt.style.opacity = String(1 - t / 700);
          requestAnimationFrame(step);
        } else {
          jolt.setAttribute('d', '');
          flat.setAttribute('d', noisyFlat(g.W, g.base, 0.6, 0));
        }
      };
      requestAnimationFrame(step);
    }
    // a beat of silence. then:
    window.setTimeout(write, 1150);
  }, [geo, write]);

  /* -------------------------------------------------------- charging loop */
  useEffect(() => {
    if (stage !== 'boot' || !geo || reduced) return;
    let raf = 0;
    let last = performance.now();
    let t = 0;
    const circ = 2 * Math.PI * 49;
    const loop = (now: number) => {
      // real elapsed time (generous cap), so a janky device still charges in ~1.1s of holding
      const dt = Math.min(250, now - last);
      last = now;
      t += dt / 1000;
      const c0 = charge.current;
      const c = holding.current ? Math.min(1, c0 + dt / CHARGE_MS) : Math.max(0, c0 - dt / DRAIN_MS);
      charge.current = c;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(circ * (1 - c));
      if (pctRef.current) pctRef.current.textContent = String(Math.round(c * 100)).padStart(3, '0');
      if (flatRef.current) flatRef.current.setAttribute('d', noisyFlat(geo.W, geo.base, 1.1 + c * c * 16, t * (1 + c * 6)));
      if (flatRef.current) flatRef.current.style.opacity = String(0.4 + c * 0.6);
      if (shakeRef.current) {
        const s = c * c * 3.2;
        shakeRef.current.style.transform = c > 0 ? `translate3d(${(Math.random() - 0.5) * s}px, ${(Math.random() - 0.5) * s}px, 0)` : '';
      }
      if (stageRef.current) stageRef.current.style.setProperty('--charge', c.toFixed(3));
      if (c > 0 || holding.current) sfx.setCharge(c);
      else sfx.stopCharge();
      if (c >= 1) {
        if (shakeRef.current) shakeRef.current.style.transform = '';
        fire();
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [stage, geo, reduced, fire]);

  // input: press & hold (pointer or keyboard)
  const startHold = useCallback(() => {
    if (stageRefState.current !== 'boot') return;
    sfx.unlock();
    holding.current = true;
    setHeld(true);
  }, []);
  const endHold = useCallback(() => {
    holding.current = false;
    setHeld(false);
  }, []);

  useEffect(() => {
    if (stage !== 'boot') return;
    const down = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'Enter') && !e.repeat) {
        if ((e.target as HTMLElement)?.closest?.('a,button:not([data-shock])')) return;
        e.preventDefault();
        startHold();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') endHold();
    };
    // trying to scroll past a flatlined page gets a gentle nudge toward the button
    const wheel = () => {
      const now = performance.now();
      if (now - lastNudge.current < 1100) return;
      lastNudge.current = now;
      btnRef.current?.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.14)' }, { transform: 'scale(0.97)' }, { transform: 'scale(1)' }],
        { duration: 620, easing: 'cubic-bezier(.2,.7,.2,1)' },
      );
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('wheel', wheel, { passive: true });
    window.addEventListener('touchmove', wheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('touchmove', wheel);
    };
  }, [stage, startHold, endHold]);

  /* ------------------------------------------------------------ alive pulse */
  const pulseGlow = (v: number) => {
    beatGlowRef.current?.animate([{ opacity: 0.55 * v }, { opacity: 0 }], { duration: 700, easing: 'cubic-bezier(.2,.6,.3,1)' });
  };

  useEffect(() => {
    if (stage !== 'done' || reduced) return;
    let running = false;
    return onBeat((n) => {
      if (dock.current > 0.05) return;
      pulseGlow(0.55);
      if (n % 5 !== 0 || running) return;
      const tl = timeline.current;
      if (!tl) return;
      running = true;
      const speed = 2.3;
      const t0 = performance.now();
      const COMET = 150;
      const frame = (now: number) => {
        const T = ((now - t0) / 1000) * speed;
        for (const s of tl.segs) {
          if (!s.comet) continue;
          if (T <= s.t0 || T >= s.t1 + (COMET / s.len) * (s.t1 - s.t0)) {
            s.comet.style.opacity = '0';
            continue;
          }
          const l = T >= s.t1 ? s.len + ((T - s.t1) / (s.t1 - s.t0)) * s.len : lengthAt(s, T);
          const f = l / s.len;
          const cl = COMET / s.len;
          s.comet.style.opacity = '1';
          s.comet.style.strokeDasharray = `${cl} 3`;
          s.comet.style.strokeDashoffset = String(cl - f);
        }
        if (T < tl.total + 0.4 && dock.current <= 0.05) requestAnimationFrame(frame);
        else {
          for (const s of tl.segs) if (s.comet) s.comet.style.opacity = '0';
          running = false;
        }
      };
      requestAnimationFrame(frame);
    });
  }, [stage, reduced]);

  /* ------------------------------------------------------------------ dock */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const applyDock = (p: number) => {
    const g = geo;
    const sig = sigRef.current;
    if (!g || !sig) return;
    const e = easeInOutCubic(clamp(p));
    const targetW = g.mobile ? 66 : 86;
    const sDock = targetW / g.box.w;
    const S = Math.exp(lerp(0, Math.log(sDock), e));
    const x = lerp(g.box.x, g.mobile ? 16 : 26, e);
    const y = lerp(g.box.y, g.mobile ? 15 : 20, e);
    const tx = x - S * g.box.x;
    const ty = y - S * g.box.y;
    sig.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${S.toFixed(4)})`;
    sig.style.setProperty('--sw', `${(lerp(2.1, 1.5, e) / S).toFixed(3)}px`);
    sig.dataset.docked = e > 0.98 ? 'true' : 'false';
    if (ecgSvgRef.current) ecgSvgRef.current.style.opacity = String(1 - smoothstep(0, 0.32, p));
  };

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    dock.current = v;
    applyDock(v);
  });

  const uiOpacity = useRange(scrollYProgress, [0, 0.35], [1, 0]);
  const uiY = useRange(scrollYProgress, [0, 0.5], [0, -50]);

  const alive = stage === 'done';
  const boot = stage === 'boot';
  const k = geo ? geo.box.w / SIG_W : 1;

  return (
    <>
      <section
        ref={sectionRef}
        id="top"
        data-theme="dark"
        className="relative"
        style={{ height: '160svh' }}
        aria-label="Introduction"
      >
        <div
          ref={stageRef}
          className="hv-hero-stage"
          data-cursor={boot ? 'hold' : undefined}
          style={{ touchAction: boot ? 'none' : undefined }}
          onPointerDown={(e) => {
            if (!boot) return;
            if ((e.target as HTMLElement).closest('a,button:not([data-shock])')) return;
            (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
            startHold();
          }}
          onPointerUp={endHold}
          onPointerCancel={endHold}
          onLostPointerCapture={endHold}
          onContextMenu={(e) => boot && e.preventDefault()}
        >
          <div ref={shakeRef} className="hv-shake">
            {/* a glow that breathes with every beat */}
            <div
              ref={beatGlowRef}
              className="pointer-events-none absolute inset-0 opacity-0"
              style={{
                background: `radial-gradient(42% 34% at 50% ${geo ? ((geo.base - 50 * k) / geo.H) * 100 : 45}%, rgba(61,255,154,0.16), transparent 70%)`,
              }}
            />
            {/* charge vignette */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                opacity: 'var(--charge, 0)' as unknown as number,
                boxShadow: 'inset 0 0 160px 10px rgba(61,255,154,0.22)',
                transition: 'opacity 1.4s cubic-bezier(.2,.7,.2,1)',
              }}
            />

            {geo && (
              <svg
                ref={ecgSvgRef}
                className="hv-ecg hv-glow"
                width={geo.W}
                height={geo.H}
                viewBox={`0 0 ${geo.W} ${geo.H}`}
                aria-hidden
              >
                <path ref={flatRef} className="hv-flat" d="" />
                <path ref={joltRef} className="hv-jolt" d="" />
                {geo.pieces.map((p, i) =>
                  p.layer === 'stage' ? (
                    <g key={p.id}>
                      <path
                        ref={(el) => {
                          pathEls.current[i] = el;
                        }}
                        className="hv-trace"
                        d={p.d}
                        pathLength={1}
                        style={{ strokeDasharray: '1 2', strokeDashoffset: 1, opacity: 0 }}
                      />
                      <path
                        ref={(el) => {
                          cometEls.current[i] = el;
                        }}
                        className="hv-comet"
                        d={p.d}
                        pathLength={1}
                        style={{ opacity: 0 }}
                      />
                    </g>
                  ) : null,
                )}
              </svg>
            )}

            <div ref={penRef} className="hv-pen" />

            {/* ---------------------------------------------------- boot UI */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={false}
              animate={{ opacity: boot ? 1 : 0 }}
              transition={{ duration: boot ? 0.6 : 0.25 }}
              aria-hidden={!boot}
            >
              {/* the monitor keeps sweeping the flat line, looking for a beat that isn't there */}
              {geo && (
                <div className="absolute inset-x-0 h-[2px]" style={{ top: geo.base - 1 }}>
                  <div className="hv-sweep" />
                </div>
              )}
              {geo && (
                <div
                  className="hv-label hv-alarm absolute left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em]"
                  style={{ top: geo.base - (geo.mobile ? 64 : 92) }}
                >
                  No pulse
                </div>
              )}
              {geo && (
                <div className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-4" style={{ top: geo.base + (geo.mobile ? 44 : 64) }}>
                  <button
                    ref={btnRef}
                    type="button"
                    data-shock
                    data-cursor="hold"
                    className="hv-shock pointer-events-auto"
                    data-held={held}
                    aria-label="Press and hold to shock the heart back"
                    onKeyDown={(e) => {
                      if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
                        e.preventDefault();
                        startHold();
                      }
                    }}
                    onKeyUp={endHold}
                  >
                    <svg className="hv-shock-ring" viewBox="0 0 104 104" aria-hidden>
                      <circle cx="52" cy="52" r="49" stroke="rgba(237,240,238,0.12)" />
                      <circle
                        ref={ringRef}
                        cx="52"
                        cy="52"
                        r="49"
                        stroke="var(--pulse)"
                        strokeLinecap="round"
                        style={{ strokeDasharray: 2 * Math.PI * 49, strokeDashoffset: 2 * Math.PI * 49, filter: 'drop-shadow(0 0 6px var(--pulse-glow))' }}
                      />
                    </svg>
                    <span className="hv-shock-core">
                      <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden>
                        <path d="M13 1 2 15h8l-2 10 11-14h-8l2-10Z" fill={held ? 'var(--pulse)' : 'none'} stroke="var(--pulse)" strokeWidth="1.4" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <div className="hv-label text-center text-[var(--ink-2)]">
                    {held ? (
                      <span>
                        Charging <span ref={pctRef} className="hv-dot text-[13px] text-[var(--pulse)]">000</span>
                      </span>
                    ) : (
                      <span>
                        Press & hold <span className="text-[var(--mute)]">to shock</span>
                        <span ref={pctRef} className="hidden" />
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="absolute bottom-[var(--gutter)] left-[var(--gutter)] max-w-[min(88vw,420px)]">
                <p className="hv-display text-[clamp(20px,2vw,26px)] font-[450] leading-[1.15] tracking-[-0.02em] text-[var(--ink-2)]">
                  {COUNTS.products} products. {COUNTS.dead} flatlined.
                  <br />
                  <span className="text-[var(--ink)]">Let&apos;s see if this one survives.</span>
                </p>
              </div>
            </motion.div>

            {boot && (
              <button
                type="button"
                onClick={() => {
                  sfx.unlock();
                  finish();
                }}
                className="hv-label absolute right-[var(--gutter)] top-[76px] z-10 py-2 text-[var(--mute)] transition-colors hover:text-[var(--ink)] sm:bottom-[var(--gutter)] sm:top-auto"
              >
                Skip the drama →
              </button>
            )}

            {/* ---------------------------------------------------- the shock */}
            <div ref={clearRef} className="hv-clear" aria-hidden>
              CLEAR
            </div>

            {/* ---------------------------------------------------- alive UI */}
            <motion.div style={{ opacity: uiOpacity, y: uiY }} className="pointer-events-none absolute inset-0">
              <motion.div
                className="absolute bottom-[var(--gutter)] left-[var(--gutter)] w-[min(92vw,620px)]"
                initial={false}
                animate={alive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: alive ? 0.2 : 0 }}
              >
                <div className="hv-label flex items-center gap-2.5 text-[var(--pulse)]">
                  <span className="hv-heart" data-beat />
                  Alive · day {days ?? '—'}
                </div>
                <h1 className="hv-display mt-4 text-[clamp(28px,3.3vw,50px)] font-[560] leading-[1.02] tracking-[-0.035em]">
                  <span className="sr-only">Harvansh. </span>
                  A 9-to-5 dad who builds software after the house goes quiet.
                </h1>
                <p className="hv-body mt-5 max-w-[48ch]">
                  Two years. {COUNTS.products} products. {COUNTS.dead} flatlined, one pays, and I&apos;m still beating. This is the chart.
                </p>
              </motion.div>

              <motion.div
                className="hv-label absolute bottom-[var(--gutter)] right-[var(--gutter)] hidden items-center gap-3 text-[var(--mute)] sm:flex"
                initial={false}
                animate={alive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: alive ? 0.8 : 0 }}
              >
                Scroll
                <span className="relative block h-9 w-px overflow-hidden bg-[var(--line)]">
                  <span className="absolute inset-x-0 top-0 h-3 animate-[hv-drip_1.6s_var(--ease-io)_infinite] bg-[var(--pulse)]" />
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* the signature lives in its own fixed layer so it can fly up and become the logo */}
      {geo && (
        <div ref={sigRef} className="hv-sig" style={{ width: geo.W, height: geo.H }} aria-hidden>
          <svg className="hv-glow" width={geo.W} height={geo.H} viewBox={`0 0 ${geo.W} ${geo.H}`} style={{ overflow: 'visible' }}>
            {geo.pieces.map((p, i) =>
              p.layer === 'sig' ? (
                <g key={p.id}>
                  <path
                    ref={(el) => {
                      pathEls.current[i] = el;
                    }}
                    className="hv-trace"
                    d={p.d}
                    pathLength={1}
                    style={{ strokeDasharray: '1 2', strokeDashoffset: 1, opacity: 0 }}
                  />
                  <path
                    ref={(el) => {
                      cometEls.current[i] = el;
                    }}
                    className="hv-comet"
                    d={p.d}
                    pathLength={1}
                    style={{ opacity: 0 }}
                  />
                </g>
              ) : null,
            )}
          </svg>
        </div>
      )}

      <div ref={flashRef} className="hv-flash" aria-hidden />
      <style>{`@keyframes hv-drip{0%{transform:translateY(-100%)}100%{transform:translateY(300%)}}`}</style>
    </>
  );
}

/** the not-yet-overwritten part of the flat line, from x0 to W */
function flatFrom(x0: number, W: number, y: number, t: number): Pt[] {
  const pts: Pt[] = [];
  const n = Math.max(2, Math.round((W - x0) / 16));
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((W - x0) * i) / n;
    pts.push([x, y + Math.sin(x * 0.05 + t * 9) * 0.5]);
  }
  return pts;
}
