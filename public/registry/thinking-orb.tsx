import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

export type OrbSize = 64 | 20;

export type OrbTheme = 'auto' | 'dark' | 'light';

export type OrbState =
  | 'working'
  | 'searching'
  | 'solving'
  | 'listening'
  | 'connecting'
  | 'weaving'
  | 'composing'
  | 'breathing'
  | 'shaping'
  | 'synthesizing'
  | 'transmitting'
  | 'gathering'
  | 'resolving'
  | 'reasoning'
  | 'aligning'
  | 'sparking'
  | 'resonating'
  | 'indexing'
  | 'folding'
  | 'drifting'
  | 'focusing'
  | 'syncing'
  | 'processing'
  | 'assisting';

export interface ThinkingOrbProps {
  state?: OrbState;
  size?: OrbSize;
  theme?: OrbTheme;
  speed?: number;
  paused?: boolean;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

// Engine-level contracts shared by every mode implementation.

/** One frame painter: draws a mode into a 2D context at CSS-px `size`. */
type ModeDraw = (
  ctx: CanvasRenderingContext2D,
  size: number,
  t: number,
  dark: boolean,
  opts: ModeOpts
) => void;

// Shared primitives for the dotted 3D thought-orbs. Ported from inkform
// (PlotterLab's HalftoneSphere lineage): honestly 3D — rotated,
// depth-shaded, z-sorted. Depth is carried by dot size and ink weight
// alone. Plain 2D canvas fills only: no ctx.filter, no SVG filters, so
// every mode renders identically in Chrome, Safari and Firefox.

interface Dot {
  x: number;
  y: number;
  z: number;
  r: number;
  /** Ink value: 0 = darkest ink on paper. Mirrored on dark themes. */
  white: number;
  a?: number;
}

/** A stroked edge between two projected points (the `connecting` web). */
interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Ink value, same convention as `Dot.white`. */
  white: number;
  a?: number;
  w: number;
}

type Projector = (x: number, y: number, z: number) => [number, number, number];

function lerp(a: number, b: number, f: number): number {
  return a + (b - a) * f;
}

function frac(x: number): number {
  return x - Math.floor(x);
}

/** Value noise on a 2D lattice — smooth, deterministic, cheap. */
function vnoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  let fx = x - xi;
  let fy = y - yi;
  fx = fx * fx * (3 - 2 * fx);
  fy = fy * fy * (3 - 2 * fy);
  const a = hashD(xi, yi);
  const b = hashD(xi + 1, yi);
  const c = hashD(xi, yi + 1);
  const d = hashD(xi + 1, yi + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

/** Deterministic hash in [0, 1). */
function hashD(a: number, b: number): number {
  const h = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return h - Math.floor(h);
}

/** Stable directions on a unit sphere (Fibonacci lattice). */
function fibDir(i: number, n: number): [number, number, number] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (2 * (i + 0.5)) / n;
  const rad = Math.sqrt(1 - y * y);
  const a = i * golden;
  return [rad * Math.cos(a), y, rad * Math.sin(a)];
}

/** Shortest signed angular distance, wrapped to (-π, π]. */
function angleDelta(a: number, b: number): number {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

/** Shared spin + tilt + orthographic projection. */
function makeProj(yaw: number, tilt: number, cx: number, cy: number, scale: number): Projector {
  const st = Math.sin(tilt);
  const ct = Math.cos(tilt);
  const sy = Math.sin(yaw);
  const cyw = Math.cos(yaw);
  return (x, y, z) => {
    const x1 = x * cyw + z * sy;
    const z1 = -x * sy + z * cyw;
    const y1 = y * ct - z1 * st;
    const z2 = y * st + z1 * ct;
    return [cx + x1 * scale, cy - y1 * scale, z2];
  };
}

/**
 * Painter: z-sort far→near, matte grayscale dots. On dark substrates the
 * ink value is mirrored (1 - white) so near dots read bright — the same
 * depth language on an inverted substrate.
 */
function paint(ctx: CanvasRenderingContext2D, dots: Dot[], dark: boolean, rMin = 0.3): void {
  dots.sort((a, b) => a.z - b.z);
  for (const d of dots) {
    const alpha = d.a ?? 1;
    if (alpha < 0.02) continue;
    const w = Math.min(1, Math.max(0, d.white));
    const g = Math.round((dark ? 1 - w : w) * 255);
    ctx.fillStyle = `rgba(${g},${g},${g},${alpha})`;
    ctx.beginPath();
    ctx.arc(d.x, d.y, Math.max(rMin, d.r), 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Stroke pass for edge-based modes. Runs before `paint` so nodes sit on top. */
function paintLines(ctx: CanvasRenderingContext2D, lines: Line[], dark: boolean): void {
  for (const l of lines) {
    const alpha = l.a ?? 1;
    if (alpha < 0.02) continue;
    const w = Math.min(1, Math.max(0, l.white));
    const g = Math.round((dark ? 1 - w : w) * 255);
    ctx.strokeStyle = `rgba(${g},${g},${g},${alpha})`;
    ctx.lineWidth = l.w;
    ctx.beginPath();
    ctx.moveTo(l.x1, l.y1);
    ctx.lineTo(l.x2, l.y2);
    ctx.stroke();
  }
}

/**
 * Dot radii were tuned for a 300pt frame; sub-linear scaling keeps small
 * spinners legible. Lower pow = radii shrink less with size.
 */
function radiusScale(size: number, pow: number): number {
  return (size / 300) ** pow;
}

// Density profiles + the multiplier machinery that scales them. The base
// rows are inkform's `fine` profiles; each shipped preset (state × size)
// applies count / radius multipliers on top, resolved once per mount.

interface ModeOpts {
  [key: string]: number | undefined;
}

// 2-D lattices (rings × dots-per-ring) come in pairs — each side takes
// √scale so the TOTAL dot count scales by `scale`; flat lists scale
// linearly. `iconD` sets the morph outline's sampling density.
const COUNT_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['latRings', 'lonDensity'],
  ['rings', 'lonDensity'],
  ['lanes', 'segs'],
  ['waves', 'dotsPerWave']
];
const COUNT_KEYS = ['orbitN', 'ghostN', 'nodeN', 'strandN', 'signals', 'swarmN'] as const;
const ICON_DENSITY_KEYS = ['iconD'] as const;

// Every key that sets a dot's rendered radius — scaling all of them keeps
// a dot's near/far falloff intact while shrinking or growing the mark.
const RADIUS_KEYS = [
  'rBase',
  'rDepth',
  'rActive',
  'rDot',
  'ghostR',
  'partR',
  'partRDepth',
  'nodeR',
  'nodeRDepth'
] as const;

function scaleCounts(opts: ModeOpts, scale: number): ModeOpts {
  const out: ModeOpts = { ...opts };
  const done = new Set<string>();
  const rt = Math.sqrt(scale);
  for (const [a, b] of COUNT_PAIRS) {
    const va = out[a];
    const vb = out[b];
    if (va != null && vb != null && !done.has(a) && !done.has(b)) {
      out[a] = Math.max(2, Math.round(va * rt));
      out[b] = Math.max(2, Math.round(vb * rt));
      done.add(a);
      done.add(b);
    }
  }
  for (const k of COUNT_KEYS) {
    const v = out[k];
    // 0 means the mode opted out of that layer entirely (ring has no ghost
    // sphere) — scaling must not resurrect it as a single stray dot
    if (v != null && v !== 0 && !done.has(k)) out[k] = Math.max(1, Math.round(v * scale));
  }
  for (const k of ICON_DENSITY_KEYS) {
    const v = out[k];
    if (v != null) out[k] = Math.max(0.02, v * scale);
  }
  return out;
}

function scaleRadii(opts: ModeOpts, scale: number): ModeOpts {
  const out: ModeOpts = { ...opts };
  for (const k of RADIUS_KEYS) {
    const v = out[k];
    if (v != null) out[k] = v * scale;
  }
  // remember the multiplier itself — spacing-derived radii (the morph
  // outline) use it, since they aren't based on any single radius key
  out.rSizeMul = (out.rSizeMul ?? 1) * scale;
  return out;
}

/** Base (fine) profiles per mode, before preset multipliers. */
const BASE_PROFILES: Record<string, ModeOpts> = {
  globe: {
    latRings: 20,
    lonDensity: 48,
    rBase: 0.65,
    rDepth: 1.8,
    rBoost: 1.1,
    inkFar: 0.60,
    inkSpan: 0.55,
    rsPow: 0.6,
    rMin: 0.3
  },
  orbits: {
    orbitN: 14,
    ghostN: 45,
    ghostR: 0.85,
    ghostA: 0.45,
    particles: 4,
    partR: 1.1,
    partRDepth: 1.7,
    rsPow: 0.6,
    rMin: 0.3
  },
  rubik: {
    latRings: 16,
    lonDensity: 42,
    moveCount: 16,
    rBase: 0.65,
    rDepth: 1.6,
    rActive: 0.35,
    inkFar: 0.60,
    inkSpan: 0.55,
    rsPow: 0.6,
    rMin: 0.3
  },
  wave: {
    rings: 18,
    lonDensity: 44,
    rBase: 0.55,
    rDepth: 1.8,
    rsPow: 0.6,
    rMin: 0.3
  },
  web: {
    nodeN: 35,
    thr: 0.68,
    signals: 6,
    nodeR: 1.3,
    nodeRDepth: 1.9,
    lineW: 0.75,
    rsPow: 0.6,
    rMin: 0.3
  },
  braid: {
    strandN: 60,
    turns: 3.5,
    ghostN: 160,
    rBase: 1.1,
    rDepth: 1.9,
    rsPow: 0.6,
    rMin: 0.3
  },
  ribbon: {
    lanes: 6,
    segs: 96,
    ghostN: 160,
    rBase: 1.0,
    rDepth: 1.8,
    rsPow: 0.6,
    rMin: 0.3
  },
  // ring shares ribbon's painter; faceOn cancels the camera tilt and moves
  // the undulation onto the radius, and there is no ghost sphere behind it
  ring: {
    lanes: 6,
    segs: 96,
    ghostN: 0,
    faceOn: 1,
    rBase: 1.0,
    rDepth: 1.8,
    rsPow: 0.6,
    rMin: 0.3
  },
  morph: {
    rDot: 0.023,
    iconD: 1.1,
    rMin: 0.2
  },
  matrix: {
    nodeN: 150,
    rBase: 1.0,
    rDepth: 1.5,
    rsPow: 0.6,
    rMin: 0.3
  },
  mobius: {
    segs: 150,
    lanes: 3,
    rBase: 1.2,
    rDepth: 1.2,
    rsPow: 0.6,
    rMin: 0.3
  },
  dust: {
    nodeN: 80,
    rBase: 1.5,
    rDepth: 2.0,
    rsPow: 0.6,
    rMin: 0.3
  },
  helix: {
    strandN: 30,
    turns: 4.0,
    ghostN: 100,
    rBase: 1.2,
    rDepth: 1.5,
    rsPow: 0.6,
    rMin: 0.3
  },
  pulse: {
    nodeN: 80,
    rBase: 1.3,
    rDepth: 1.8,
    rsPow: 0.6,
    rMin: 0.3
  },
  swarm: {
    nodeN: 150,
    rBase: 1.0,
    rDepth: 1.5,
    rsPow: 0.6,
    rMin: 0.3
  },
  resolve: {
    lanes: 4,
    segs: 60,
    rBase: 1.1,
    rDepth: 1.6,
    rsPow: 0.6,
    rMin: 0.3
  },
  knot: {
    strandN: 40,
    turns: 2.0,
    ghostN: 80,
    rBase: 1.2,
    rDepth: 1.8,
    rsPow: 0.6,
    rMin: 0.3
  },
  gyro: {
    orbitN: 15,
    ghostN: 50,
    rBase: 1.1,
    rDepth: 1.6,
    rsPow: 0.6,
    rMin: 0.3
  },
  spark: {
    nodeN: 100,
    rBase: 1.2,
    rDepth: 1.7,
    rsPow: 0.6,
    rMin: 0.3
  },
  ripple: {
    rings: 10,
    lonDensity: 30,
    rBase: 1.0,
    rDepth: 1.5,
    rsPow: 0.6,
    rMin: 0.3
  },
  nucleus: {
    ghostN: 60,
    nodeN: 45,
    rBase: 1.2,
    rDepth: 1.5,
    rsPow: 0.6,
    rMin: 0.3
  },
  sonar: {
    waves: 2,
    nodeN: 60,
    rBase: 1.2,
    rDepth: 1.0,
    rsPow: 0.6,
    rMin: 0.3
  },
  dial: {
    nodeN: 40,
    rBase: 1.2,
    rDepth: 1.0,
    rsPow: 0.6,
    rMin: 0.3
  },
  guide: {
    segs: 100,
    rBase: 1.3,
    rDepth: 1.5,
    rsPow: 0.6,
    rMin: 0.3
  }
};

// Morph: a dotted outline cycling circle → triangle → square → circle —
// the "shaping" state. Each shape is a continuous closed path
// parameterised by arc length (top-centre start, clockwise). Every
// frame the engine blends the two neighbouring paths, then lays the
// dots EVENLY along the blended outline — spacing stays uniform at
// every instant of the morph, holds and transitions alike. Plain
// circle fills only: no canvas/SVG filters, fully cross-browser.

type Path = (f: number) => [number, number];

function smoothE(x: number): number {
  return x * x * (3 - 2 * x);
}

function polyPath(verts: ReadonlyArray<readonly [number, number]>): Path {
  const V = verts.length;
  const L: number[] = [];
  let total = 0;
  for (let i = 0; i < V; i++) {
    const a = verts[i];
    const b = verts[(i + 1) % V];
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    L.push(l);
    total += l;
  }
  return (f) => {
    let target = f * total;
    let i = 0;
    while (target > L[i] && i < V - 1) {
      target -= L[i];
      i++;
    }
    const a = verts[i];
    const b = verts[(i + 1) % V];
    const ff = L[i] ? Math.min(1, target / L[i]) : 0;
    return [a[0] + (b[0] - a[0]) * ff, a[1] + (b[1] - a[1]) * ff];
  };
}

const CIRCLE: Path = (f) => {
  const a = -Math.PI / 2 + f * 2 * Math.PI;
  return [Math.cos(a) * 0.24, Math.sin(a) * 0.24];
};
const TRIANGLE = polyPath([
  [0.0, -0.26],
  [0.24, 0.16],
  [-0.24, 0.16]
]);
// 5-vertex walk so the path STARTS at top-centre like the other shapes
const SQUARE = polyPath([
  [0, -0.2],
  [0.2, -0.2],
  [0.2, 0.2],
  [-0.2, 0.2],
  [-0.2, -0.2]
]);
const CYCLE: Path[] = [CIRCLE, TRIANGLE, SQUARE];

// low floor keeps sparse outlines possible while never degenerating
function morphN(d: number): number {
  return Math.max(6, Math.round(34 * d));
}

const HOLD = 1.4;
const MORPH = 0.9;
const SEG = HOLD + MORPH;

// This state was tuned in inkform, which paints it through a blur +
// threshold "goo" filter; we draw plain circles instead, since `ctx.filter`
// and SVG filter refs are not safe to rely on across Chrome / Safari /
// Firefox. The dot GEOMETRY is identical either way — the threshold just
// yields a hard edge where a plain fill has an antialiased one, so these
// dots read a touch softer than inkform's. Don't "correct" for that by
// shrinking the radius: it makes the mark genuinely smaller than the tuning.

const drawMorph: ModeDraw = (ctx, size, t, dark, o) => {
  const K = CYCLE.length;
  const tc = t % (SEG * K);
  const k = Math.floor(tc / SEG);
  const local = tc - k * SEG;
  const m = local > HOLD ? smoothE((local - HOLD) / MORPH) : 0;
  const sprd = o.spread ?? 1;

  // blend the two shape PATHS at m, then measure the blended outline
  const pA = CYCLE[k];
  const pB = CYCLE[(k + 1) % K];
  const M = 160;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < M; i++) {
    const f = i / M;
    const a = pA(f);
    const b = pB(f);
    pts.push([(a[0] + (b[0] - a[0]) * m) * sprd, (a[1] + (b[1] - a[1]) * m) * sprd]);
  }
  const L: number[] = [];
  let total = 0;
  for (let i = 0; i < M; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % M];
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    L.push(l);
    total += l;
  }

  // dot radius depends ONLY on rDot (the size knob); the count sets the
  // gaps. Formed shapes breathe a little (uniform pulse).
  const n = morphN(o.iconD ?? 1);
  const re = (o.rDot ?? 0.021) * 1.35 * sprd;
  const pulse = 1 + 0.02 * Math.sin(local * 3.1);

  const dots: Dot[] = [];
  const c2 = size / 2;
  let seg = 0;
  let acc = 0;
  for (let k2 = 0; k2 < n; k2++) {
    const target = (k2 / n) * total;
    while (acc + L[seg] < target && seg < M - 1) {
      acc += L[seg];
      seg++;
    }
    const a = pts[seg];
    const b = pts[(seg + 1) % M];
    const f = L[seg] ? Math.min(1, (target - acc) / L[seg]) : 0;
    const x = (a[0] + (b[0] - a[0]) * f) * pulse;
    const y = (a[1] + (b[1] - a[1]) * f) * pulse;
    dots.push({
      x: c2 + x * size,
      y: c2 + y * size,
      z: 0,
      r: Math.max(0.35, re * size),
      white: 0.1
    });
  }
  paint(ctx, dots, dark, o.rMin);
};

// Orbits: particles on tilted orbits — the "working" state. No nucleus
// (the tuned preset runs coreless): just ghost paths and the particles
// doing the work.

const drawOrbits: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.82;
  const pt = makeProj(t * 0.12, 0.3, cx, cy, 1);
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const dots: Dot[] = [];
  const orbitN = o.orbitN ?? 12;
  const ghostN = o.ghostN ?? 40;
  const particles = o.particles ?? 3;

  // orbits: each a tilted circle — a ghost path + running particles
  for (let orb = 0; orb < orbitN; orb++) {
    const h1 = hashD(orb, 1.7);
    const h2 = hashD(orb, 5.2);
    const h3 = hashD(orb, 8.9);
    const ro = R * (0.45 + 0.52 * h1);
    const th = h1 * 2 * Math.PI;
    const phi = Math.acos(2 * h2 - 1);
    // orbit plane basis (u, v ⟂ normal n)
    const nx = Math.sin(phi) * Math.cos(th);
    const ny = Math.cos(phi);
    const nz = Math.sin(phi) * Math.sin(th);
    let ux = -ny;
    let uy = nx;
    const uz = 0;
    const ul = Math.max(1e-6, Math.sqrt(ux * ux + uy * uy));
    ux /= ul;
    uy /= ul;
    const vx = ny * uz - nz * uy;
    const vy = nz * ux - nx * uz;
    const vz = nx * uy - ny * ux;
    const speed = (0.25 + 0.55 * h3) * (h3 > 0.5 ? 1 : -1);

    // ghost path
    for (let k = 0; k < ghostN; k++) {
      const a = (k / ghostN) * 2 * Math.PI;
      const [px, py, z] = pt(
        (ux * Math.cos(a) + vx * Math.sin(a)) * ro,
        (uy * Math.cos(a) + vy * Math.sin(a)) * ro,
        (uz * Math.cos(a) + vz * Math.sin(a)) * ro
      );
      const depth = (z / ro + 1) / 2;
      dots.push({
        x: px,
        y: py,
        z,
        r: (o.ghostR ?? 0.9) * rs,
        white: 0.72,
        a: (o.ghostA ?? 0.5) * (0.4 + 0.6 * depth)
      });
    }
    // the particles doing the work
    for (let m = 0; m < particles; m++) {
      const a = t * speed + (m / particles) * 2 * Math.PI + h2 * 6;
      const [px, py, z] = pt(
        (ux * Math.cos(a) + vx * Math.sin(a)) * ro,
        (uy * Math.cos(a) + vy * Math.sin(a)) * ro,
        (uz * Math.cos(a) + vz * Math.sin(a)) * ro
      );
      const depth = (z / ro + 1) / 2;
      dots.push({
        x: px,
        y: py,
        z,
        r: ((o.partR ?? 1.2) + (o.partRDepth ?? 1.6) * depth) * rs,
        white: 0.3 - 0.22 * depth
      });
    }
  }
  paint(ctx, dots, dark, o.rMin);
};

// Ribbon: an undulating sash of parallel strands rides a great circle —
// the "composing" state. The tuned preset freezes the 3D tumble
// (spin 0), leaving the traveling undulation on a fixed band.
//
// The same painter also drives "breathing" (ring), via the `faceOn` flag:
// a face-on circle whose radius — not its out-of-plane offset — undulates,
// so it reads as a ring slowly morphing rather than a sash in orbit.

const drawRibbon: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.78;
  // spin scales the 3D tumble; spin=0 freezes the band's orientation,
  // leaving only the traveling undulation
  const spin = o.spin ?? 1;
  const camTilt = 0.3;
  const pt = makeProj(t * 0.1 * spin, camTilt, cx, cy, 1);
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const dots: Dot[] = [];
  const ghostN = o.ghostN ?? 150;
  for (let i = 0; i < ghostN; i++) {
    const d = fibDir(i, ghostN);
    const [px, py, z] = pt(d[0] * R, d[1] * R, d[2] * R);
    const depth = (z / R + 1) / 2;
    dots.push({ x: px, y: py, z, r: 0.8 * rs, white: 0.78, a: 0.1 + 0.22 * depth });
  }

  // The band plane, precessing (frozen when spin=0). The projection squashes
  // the band's great circle vertically by cos(ta + camTilt); face-on sets
  // ta = -camTilt so that term is 1 and the band reads as a true circle
  // rather than ribbon's tilted ellipse.
  const ya = t * 0.24 * spin;
  const ta = o.faceOn ? -camTilt : 0.55 + 0.3 * Math.sin(t * 0.18) * spin;
  const ux = Math.cos(ya);
  const uy = 0;
  const uz = Math.sin(ya);
  const vx = -uz * Math.sin(ta);
  const vy = Math.cos(ta);
  const vz = ux * Math.sin(ta);
  // plane normal n = u × v
  const nx = uy * vz - uz * vy;
  const ny = uz * vx - ux * vz;
  const nz = ux * vy - uy * vx;

  // Radial lobes swell past R, so pull the base radius in by (most of) the
  // wobble amplitude. The silhouette then stays inside the frame however far
  // the deformation is pushed, while lobes keep getting deeper relative to
  // the mean radius.
  const wobAmp = 0.23 * (o.wobMul ?? 1);
  const baseR = o.faceOn ? R / (1 + 0.85 * wobAmp) : R;

  const baseLanes = o.lanes ?? 5;
  const segs = o.segs ?? 88;
  const lanes = Math.max(1, Math.round(baseLanes * (o.bandMul ?? 1)));
  for (let w = 0; w < lanes; w++) {
    const laneOff = (w - (lanes - 1) / 2) * 0.075;
    const edge = Math.abs(w - (lanes - 1) / 2) / Math.max(1, (lanes - 1) / 2);
    for (let k = 0; k < segs; k++) {
      const a = (k / segs) * 2 * Math.PI;
      // the undulation: two traveling waves along the band; wobMul
      // scales the deformation — 0 is a clean band
      const wob =
        (0.16 * Math.sin(a * 3 - t * 1.7 + w * 0.22) + 0.07 * Math.sin(a * 5 + t * 1.1)) * (o.wobMul ?? 1);
      // A normal-direction wobble is cancelled by the re-normalisation below:
      // the point lands back on the sphere, so the silhouette is pinned at R
      // and the deformation can only ever pull dots inward. Face-on instead
      // modulates the in-plane RADIUS, so lobes genuinely swell outward and
      // pinch inward. Ribbon keeps the original out-of-plane sash wobble.
      const radial = o.faceOn ? 1 + wob : 1;
      const off = o.faceOn ? laneOff : laneOff + wob;
      const x = ux * Math.cos(a) + vx * Math.sin(a) + nx * off;
      const y = uy * Math.cos(a) + vy * Math.sin(a) + ny * off;
      const z = uz * Math.cos(a) + vz * Math.sin(a) + nz * off;
      const l = Math.sqrt(x * x + y * y + z * z);
      const rr = baseR * radial;
      const [px, py, zr] = pt((x / l) * rr, (y / l) * rr, (z / l) * rr);
      const depth = (zr / R + 1) / 2;
      dots.push({
        x: px,
        y: py,
        z: zr,
        r: ((o.rBase ?? 1.1) + (o.rDepth ?? 1.7) * depth) * (1 - 0.25 * edge) * rs,
        white: 0.52 - 0.44 * depth + 0.18 * edge,
        a: 0.4 + 0.6 * depth
      });
    }
  }
  paint(ctx, dots, dark, o.rMin);
};

// Web: a constellation wires itself — the "connecting" state. Nodes drift
// on the sphere under slow value noise; any pair closer than `thr` grows an
// edge, and bright packets run along randomly re-picked node pairs.

const drawWeb: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.8 * (o.spread ?? 1);
  // note the projector carries the radius as its scale, so node vectors stay
  // unit-length and distances below are in unit-sphere space
  const pt = makeProj(t * 0.12, 0.32, cx, cy, R);
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const nodeN = o.nodeN ?? 30;
  const thr = o.thr ?? 0.72;
  const nodeR = o.nodeR ?? 1.4;
  const nodeRDepth = o.nodeRDepth ?? 1.8;

  // nodes: fib lattice + slow noise wander, renormalised to the surface
  const nodes: Array<[number, number, number]> = [];
  for (let i = 0; i < nodeN; i++) {
    const d = fibDir(i, nodeN);
    const x = d[0] + 0.3 * (vnoise(i * 0.31 + 9, t * 0.24) - 0.5) * 2;
    const y = d[1] + 0.3 * (vnoise(i * 0.53 + 27, t * 0.21) - 0.5) * 2;
    const z = d[2] + 0.3 * (vnoise(i * 0.77 + 55, t * 0.27) - 0.5) * 2;
    const l = Math.sqrt(x * x + y * y + z * z);
    nodes.push([x / l, y / l, z / l]);
  }

  const lines: Line[] = [];
  const dots: Dot[] = [];

  // edges between close neighbours, alpha by proximity + depth
  for (let i = 0; i < nodeN; i++) {
    for (let j = i + 1; j < nodeN; j++) {
      const dx = nodes[i][0] - nodes[j][0];
      const dy = nodes[i][1] - nodes[j][1];
      const dz = nodes[i][2] - nodes[j][2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist >= thr) continue;
      const [x1, y1, z1] = pt(nodes[i][0], nodes[i][1], nodes[i][2]);
      const [x2, y2, z2] = pt(nodes[j][0], nodes[j][1], nodes[j][2]);
      const depth = ((z1 + z2) / 2 + 1) / 2;
      lines.push({
        x1,
        y1,
        x2,
        y2,
        white: 0.42,
        a: (1 - dist / thr) * (0.3 + 0.55 * depth),
        w: Math.max(0.6, (o.lineW ?? 0.8) * rs)
      });
    }
  }

  for (let i = 0; i < nodeN; i++) {
    const [px, py, z] = pt(nodes[i][0], nodes[i][1], nodes[i][2]);
    const depth = (z + 1) / 2;
    const pulse = 1 + 0.25 * Math.sin(t * 1.4 + i * 2.7);
    dots.push({
      x: px,
      y: py,
      z,
      r: (nodeR + nodeRDepth * depth) * pulse * rs,
      white: 0.55 - 0.45 * depth
    });
  }

  // signals: bright packets running between paired nodes
  const signals = o.signals ?? 5;
  for (let s = 0; s < signals; s++) {
    const seg = Math.floor(t * 0.55 + s * 7.31);
    const a = Math.floor(hashD(seg, s * 3.1 + 1.7) * nodeN);
    const b = Math.floor(hashD(seg, s * 5.7 + 4.2) * nodeN);
    if (a === b) continue;
    const f = frac(t * 0.55 + s * 7.31);
    const x = lerp(nodes[a][0], nodes[b][0], f);
    const y = lerp(nodes[a][1], nodes[b][1], f);
    const z = lerp(nodes[a][2], nodes[b][2], f);
    const l = Math.max(1e-6, Math.sqrt(x * x + y * y + z * z));
    const [px, py, zr] = pt(x / l, y / l, z / l);
    const depth = (zr + 1) / 2;
    dots.push({
      x: px,
      y: py,
      z: zr,
      r: (nodeR * 1.5 + nodeRDepth * depth) * rs,
      white: 0.05,
      a: 0.5 + 0.5 * depth
    });
  }

  paintLines(ctx, lines, dark);
  paint(ctx, dots, dark, o.rMin);
};

const drawMatrix: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.82;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  // Very subtle, stable rotation
  const pt = makeProj(t * 0.08, Math.PI / 5, cx, cy, 1);
  const dots: Dot[] = [];

  const nodeN = o.nodeN ?? 150;
  const scanZ = Math.sin(t * (o.speedMul ?? 1.2)) * R;
  const scanThickness = R * 0.25;

  for (let i = 0; i < nodeN; i++) {
    // fibonacci sphere for perfectly even distribution
    const [dx, dy, dz] = fibDir(i, nodeN);
    const [px, py, pz] = pt(dx * R, dy * R, dz * R);
    const depth = (pz / R + 1) / 2;
    
    // Calculate distance from scan plane using the un-projected Z
    // This creates a vertical scanning plane intersecting the sphere
    const dist = Math.abs((dz * R) - scanZ);
    // Smooth dropoff for the scan line
    const scanGlow = dist < scanThickness ? Math.pow(1 - dist / scanThickness, 2) : 0;
    
    dots.push({
      x: px, y: py, z: pz,
      r: ((o.rBase ?? 1.0) + (o.rDepth ?? 1.5) * depth + scanGlow * 1.5) * rs,
      white: 0.1 + 0.3 * (1 - depth) + scanGlow * 0.6,
      a: 0.15 + 0.4 * depth + scanGlow * 0.45
    });
  }

  paint(ctx, dots, dark, o.rMin);
};

const drawMobius: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  // Make it fit nicely inside the bounds
  const R = (size / 2) * 0.55; 
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  // Gentle tumble
  const pt = makeProj(t * 0.15, Math.PI / 4 + t * 0.05, cx, cy, 1);
  const dots: Dot[] = [];

  const segs = o.segs ?? 120;
  const lanes = o.lanes ?? 3;
  const stripWidth = R * 0.5;

  for (let l = 0; l < lanes; l++) {
    const laneOffset = lanes > 1 ? (l / (lanes - 1)) * 2 - 1 : 0;
    const rTube = laneOffset * stripWidth;

    for (let i = 0; i < segs; i++) {
      // Flow along the ribbon
      const baseV = (i / segs) * Math.PI * 2;
      // Animate points moving along the strip
      const v = baseV + t * 0.3;
      
      // Mobius parametric equations
      const rx = (R + rTube * Math.cos(v / 2)) * Math.cos(v);
      const ry = (R + rTube * Math.cos(v / 2)) * Math.sin(v);
      const rz = rTube * Math.sin(v / 2);

      const [px, py, pz] = pt(rx, ry, rz);
      const maxR = R + stripWidth;
      const depth = (pz / maxR + 1) / 2;
      
      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.2) * depth) * rs,
        white: 0.1 + 0.4 * (1 - depth),
        a: 0.35 + 0.65 * depth
      });
    }
  }

  paint(ctx, dots, dark, o.rMin);
};

const drawDust: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.85;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.03, Math.PI / 6, cx, cy, 1);
  const dots: Dot[] = [];

  const nodeN = o.nodeN ?? 80;
  
  for (let i = 0; i < nodeN; i++) {
    // Generate unique oscillation properties for each particle
    const f1 = 0.5 + hashD(i, 1.1);
    const f2 = 0.5 + hashD(i, 2.2);
    const f3 = 0.5 + hashD(i, 3.3);
    
    const p1 = hashD(i, 4.4) * Math.PI * 2;
    const p2 = hashD(i, 5.5) * Math.PI * 2;
    const p3 = hashD(i, 6.6) * Math.PI * 2;
    
    // Smooth 3D lissajous-like paths
    const ox = Math.sin(t * f1 * 0.3 + p1);
    const oy = Math.sin(t * f2 * 0.3 + p2);
    const oz = Math.sin(t * f3 * 0.3 + p3);
    
    // Distribute in a spherical volume
    const shellR = Math.cbrt(hashD(i, 7.7)) * R;
    
    // Normalize and scale
    const len = Math.sqrt(ox*ox + oy*oy + oz*oz) || 1;
    const dx = (ox / len) * shellR;
    const dy = (oy / len) * shellR;
    const dz = (oz / len) * shellR;
    
    const [px, py, pz] = pt(dx, dy, dz);
    const depth = (pz / R + 1) / 2;
    
    // Particles occasionally pulse slightly
    const pulse = Math.pow(Math.sin(t * f1 + p1), 4);
    
    dots.push({
      x: px, y: py, z: pz,
      r: ((o.rBase ?? 1.5) + (o.rDepth ?? 2.0) * depth + pulse * 1.0) * rs,
      white: 0.1 + 0.3 * (1 - depth) + pulse * 0.2,
      a: 0.2 + 0.6 * depth + pulse * 0.2
    });
  }

  paint(ctx, dots, dark, o.rMin);
};

const drawNucleus: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.85;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.1, Math.PI / 6, cx, cy, 1);
  const dots: Dot[] = [];

  const coreN = o.ghostN ?? 60;
  const ringN = o.nodeN ?? 45;

  const coreR = R * 0.35;
  const breathe = 1 + Math.sin(t * 2.5) * 0.08;
  for (let i = 0; i < coreN; i++) {
    const [dx, dy, dz] = fibDir(i, coreN);
    const [px, py, pz] = pt(dx * coreR * breathe, dy * coreR * breathe, dz * coreR * breathe);
    const depth = (pz / R + 1) / 2;
    dots.push({
      x: px, y: py, z: pz,
      r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.5) * depth) * rs,
      white: 0.1 + 0.3 * (1 - depth),
      a: 0.2 + 0.6 * depth
    });
  }

  for (let r = 0; r < 2; r++) {
    const angleOffset = r * Math.PI / 2;
    const ringSpeed = t * 1.5 * (r === 0 ? 1 : -1);
    
    for (let i = 0; i < ringN; i++) {
      const theta = (i / ringN) * Math.PI * 2;
      
      const arcFade = Math.pow(Math.sin(theta * 2 + ringSpeed), 2);
      if (arcFade < 0.1) continue;
      
      let rx = Math.cos(theta) * R;
      let ry = Math.sin(theta) * R;
      let rz = 0;

      let tx = rx;
      let ty = ry * Math.cos(angleOffset) - rz * Math.sin(angleOffset);
      let tz = ry * Math.sin(angleOffset) + rz * Math.cos(angleOffset);

      const spinAngle = ringSpeed;
      const sx = tx * Math.cos(spinAngle) - tz * Math.sin(spinAngle);
      const sy = ty;
      const sz = tx * Math.sin(spinAngle) + tz * Math.cos(spinAngle);

      const [px, py, pz] = pt(sx, sy, sz);
      const depth = (pz / R + 1) / 2;

      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.5) * depth) * rs,
        white: 0.2 + 0.5 * (1 - depth),
        a: 0.3 * arcFade + 0.7 * depth * arcFade
      });
    }
  }

  paint(ctx, dots, dark, o.rMin);
};

const drawSonar: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.85;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(0, Math.PI / 5, cx, cy, 1);
  const dots: Dot[] = [];

  const waves = o.waves ?? 2;
  const nodeN = o.nodeN ?? 60;

  const [cpx, cpy, cpz] = pt(0, 0, 0);
  dots.push({
    x: cpx, y: cpy, z: cpz,
    r: ((o.rBase ?? 1.5) * 1.5) * rs,
    white: 0.5,
    a: 0.9
  });

  for (let w = 0; w < waves; w++) {
    const phase = frac(t * (o.speedMul ?? 0.6) + w / waves);
    const waveR = R * Math.pow(phase, 0.5);
    const alpha = phase < 0.1 ? phase / 0.1 : 1 - Math.pow((phase - 0.1) / 0.9, 2);
    
    if (alpha < 0.02) continue;

    for (let i = 0; i < nodeN; i++) {
      const theta = (i / nodeN) * Math.PI * 2;
      const rx = Math.cos(theta) * waveR;
      const ry = 0;
      const rz = Math.sin(theta) * waveR;

      const [px, py, pz] = pt(rx, ry, rz);
      const depth = (pz / R + 1) / 2;

      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.0) * depth) * rs,
        white: 0.2 + 0.4 * (1 - depth),
        a: alpha * (0.3 + 0.7 * depth)
      });
    }
  }

  paint(ctx, dots, dark, o.rMin);
};

const drawDial: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.85;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(0, Math.PI / 6, cx, cy, 1);
  const dots: Dot[] = [];

  const rings = 3;
  const dotsPerRing = o.nodeN ?? 40;

  for (let r = 0; r < rings; r++) {
    const ringR = R * (0.4 + (r / (rings - 1)) * 0.6);
    const speed = (r % 2 === 0 ? 1 : -1) * (1 - r * 0.2) * 0.8;
    const angle = t * speed;
    const segments = 2 + r; 
    
    for (let i = 0; i < dotsPerRing; i++) {
      const f = i / dotsPerRing;
      const segmentPhase = (f * segments) % 1;
      
      if (segmentPhase > 0.8) continue;
      
      const theta = f * Math.PI * 2 + angle;
      const rx = Math.cos(theta) * ringR;
      const ry = Math.sin(theta) * ringR;
      const rz = 0;

      const [px, py, pz] = pt(rx, ry, rz);
      const depth = (pz / R + 1) / 2;

      const leadingGlow = Math.pow(segmentPhase / 0.8, 3);

      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.0) * depth) * rs,
        white: 0.1 + leadingGlow * 0.5 + 0.2 * (1 - depth),
        a: 0.3 + 0.5 * depth + leadingGlow * 0.2
      });
    }
  }

  paint(ctx, dots, dark, o.rMin);
};

const drawGuide: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.85;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.15, Math.PI / 5, cx, cy, 1);
  const dots: Dot[] = [];

  const segs = o.segs ?? 100;
  
  for (let i = 0; i < segs; i++) {
    const f = i / segs;
    const theta = f * Math.PI * 2;
    
    const rx = Math.sin(theta) * R;
    const ry = Math.sin(theta * 2) * R * 0.4;
    const rz = Math.cos(theta) * R * 0.5;

    const [px, py, pz] = pt(rx, ry, rz);
    const depth = (pz / R + 1) / 2;
    
    const travelPhase = (theta - t * 2) % (Math.PI * 2);
    const travelNorm = (travelPhase + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2);
    
    const glow = travelNorm > 0.85 ? Math.pow((travelNorm - 0.85) / 0.15, 2) : 0;

    dots.push({
      x: px, y: py, z: pz,
      r: ((o.rBase ?? 1.3) + (o.rDepth ?? 1.5) * depth + glow * 1.5) * rs,
      white: 0.1 + 0.3 * (1 - depth) + glow * 0.6,
      a: 0.15 + 0.5 * depth + glow * 0.35
    });
  }

  paint(ctx, dots, dark, o.rMin);
};

// The sphere-lattice modes: globe (searching), rubik (solving) and
// wave (listening). All draw a lat/long dot field with mode-specific
// motion, then hand off to the shared z-sorted painter.

// --- the shared solver heartbeat (rubik) ------------------------------
// Rapid eased moves scramble, then replay in reverse (palindrome) so
// everything clicks back to solved, rests, repeats.

interface Move {
  axis: 0 | 1 | 2;
  lo: number;
  hi: number;
  ang: number;
}

function solveCycle(time: number, count: number, slotDur: number, rest: number) {
  const cyc = 2 * count * slotDur + rest;
  const tc = time % cyc;
  const amount = new Array<number>(count).fill(0);
  let active = -1;
  if (tc < 2 * count * slotDur) {
    const slot = Math.floor(tc / slotDur);
    const p = (tc - slot * slotDur) / slotDur;
    const cl = Math.min(1, p / 0.7);
    const ep = 1 - (1 - cl) ** 3; // machine ease-out
    if (slot < count) {
      for (let i = 0; i < slot; i++) amount[i] = 1;
      amount[slot] = ep;
      active = slot;
    } else {
      const u = 2 * count - 1 - slot;
      for (let i = 0; i < u; i++) amount[i] = 1;
      amount[u] = 1 - ep;
      active = u;
    }
  }
  return { amount, active };
}

function applyMoves(
  pt3: [number, number, number],
  moves: Move[],
  sc: { amount: number[]; active: number }
): [number, number, number, boolean] {
  let [x, y, z] = pt3;
  let inActive = false;
  for (let i = 0; i < moves.length; i++) {
    if (sc.amount[i] <= 0) continue;
    const mv = moves[i];
    const coord = mv.axis === 0 ? x : mv.axis === 1 ? y : z;
    if (coord < mv.lo || coord >= mv.hi) continue;
    if (i === sc.active) inActive = true;
    const a = mv.ang * sc.amount[i];
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    if (mv.axis === 0) {
      const y2 = y * ca - z * sa;
      z = y * sa + z * ca;
      y = y2;
    } else if (mv.axis === 1) {
      const x2 = x * ca + z * sa;
      z = -x * sa + z * ca;
      x = x2;
    } else {
      const x2 = x * ca - y * sa;
      y = x * sa + y * ca;
      x = x2;
    }
  }
  return [x, y, z, inActive];
}

function makeMoves(count: number): Move[] {
  const moves: Move[] = [];
  for (let i = 0; i < count; i++) {
    const axis = Math.min(2, Math.floor(hashD(i, 2.3) * 3)) as 0 | 1 | 2;
    const lo = -1.0 + 0.5 * Math.min(3, Math.floor(hashD(i, 5.9) * 4));
    const dir = hashD(i, 7.7) < 0.5 ? 1 : -1;
    moves.push({ axis, lo, hi: lo + 0.5, ang: (dir * Math.PI) / 2 });
  }
  return moves;
}

// --- Globe: lat/long field, a scan meridian sweeps — searching --------

const drawGlobe: ModeDraw = (ctx, size, t, dark, o) => {
  const spin = 0.5;
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size / 2) * 0.82;
  const tilt = 0.4 + 0.06 * Math.sin(t * 0.35);
  const pt = makeProj(t * spin, tilt, cx, cy, radius);
  // scan sweeps relative to the spin; scanMul scales that relative rate
  const scan = t * (spin + (1.7 - spin) * (o.scanMul ?? 1));
  const rs = radiusScale(size, o.rsPow ?? 0.6);
  const dimBase = o.dimBase ?? 1;

  const dots: Dot[] = [];
  const latRings = o.latRings ?? 17;
  const lonDensity = o.lonDensity ?? 44;
  for (let li = 0; li <= latRings; li++) {
    const lat = -Math.PI / 2 + (li / latRings) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    const lonCount = Math.max(1, Math.round(Math.abs(cosLat) * lonDensity));
    for (let lj = 0; lj < lonCount; lj++) {
      const lon = (lj / lonCount) * 2 * Math.PI;
      const [px, py, z] = pt(cosLat * Math.cos(lon), sinLat, cosLat * Math.sin(lon));
      const depth = (z + 1) / 2;
      // the scan: a moving meridian read as a size ripple, not a shine
      const d = angleDelta(lon + t * spin, scan);
      const boost = Math.exp(-(d * d) / 0.18) * Math.max(0, z);
      dots.push({
        x: px,
        y: py,
        z,
        r: ((o.rBase ?? 0.6) + (o.rDepth ?? 1.7) * depth + (o.rBoost ?? 1) * boost) * rs,
        white: (o.inkFar ?? 0.62) - (o.inkSpan ?? 0.54) * depth,
        // dimBase < 1 fades un-scanned dots so the meridian reads clearly
        a: dimBase + (1 - dimBase) * Math.min(1, boost)
      });
    }
  }
  paint(ctx, dots, dark, o.rMin);
};

// --- Rubik: bands twist in quarter turns, scramble → solve — solving --

const drawRubik: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.82;
  const pt = makeProj(t * 0.55, 0.35 + 0.1 * Math.sin(t * 0.9), cx, cy, R);
  const rs = radiusScale(size, o.rsPow ?? 0.6);
  const moveCount = o.moveCount ?? 14;
  const moves = makeMoves(moveCount);
  const sc = solveCycle(t, moveCount, 0.42, 1.2);

  const dots: Dot[] = [];
  const latRings = o.latRings ?? 15;
  const lonDensity = o.lonDensity ?? 40;
  for (let li = 0; li <= latRings; li++) {
    const lat = -Math.PI / 2 + (li / latRings) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    const lonCount = Math.max(1, Math.round(Math.abs(cosLat) * lonDensity));
    for (let lj = 0; lj < lonCount; lj++) {
      const lon = (lj / lonCount) * 2 * Math.PI;
      const [x, y, z, inActive] = applyMoves([cosLat * Math.cos(lon), sinLat, cosLat * Math.sin(lon)], moves, sc);
      const [px, py, zr] = pt(x, y, z);
      const depth = (zr + 1) / 2;
      // the band being turned inks a touch darker — the "hand"
      dots.push({
        x: px,
        y: py,
        z: zr,
        r: ((o.rBase ?? 0.6) + (o.rDepth ?? 1.7) * depth + (inActive ? (o.rActive ?? 0.3) : 0)) * rs,
        white: (o.inkFar ?? 0.62) - (o.inkSpan ?? 0.54) * depth - (inActive ? 0.14 : 0)
      });
    }
  }
  paint(ctx, dots, dark, o.rMin);
};

// --- Wave: a waveform rolls through the rings — listening -------------

const drawWave: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  // 0.76 base × 1.15 — the undulation pulls the sphere inward, so wave read
  // ~15% smaller than the other lattice modes; scaled up to match them
  const R = (size / 2) * 0.874;
  const pt = makeProj(t * 0.18, 0.38, cx, cy, 1);
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const dots: Dot[] = [];
  const rings = o.rings ?? 15;
  const lonDensity = o.lonDensity ?? 40;
  for (let ri = 0; ri <= rings; ri++) {
    const lat = -Math.PI / 2 + (ri / rings) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    // two waves, different tempi — organic, never quite repeating
    const w = 0.62 * Math.sin(t * 2.1 - ri * 0.52) + 0.38 * Math.sin(t * 1.27 + ri * 0.83);
    const rr = R * (0.88 + 0.105 * w);
    const lonCount = Math.max(1, Math.round(Math.abs(cosLat) * lonDensity));
    for (let lj = 0; lj < lonCount; lj++) {
      const lon = (lj / lonCount) * 2 * Math.PI;
      const [px, py, z] = pt(cosLat * Math.cos(lon) * rr, sinLat * rr, cosLat * Math.sin(lon) * rr);
      const depth = (z / R + 1) / 2;
      const crest = Math.max(0, w);
      dots.push({
        x: px,
        y: py,
        z,
        r: ((o.rBase ?? 0.6) + (o.rDepth ?? 1.7) * depth) * (1 + 0.4 * crest) * rs,
        white: 0.66 - 0.56 * depth - 0.1 * crest
      });
    }
  }
  paint(ctx, dots, dark, o.rMin);
};

// Braid: three strands plait around the sphere — the "weaving" state.
// Each strand runs pole to pole on a helix, and a radial breathing term
// makes them trade places, reading as the over/under of a plait.

const drawBraid: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.76;
  const pt = makeProj(t * 0.4, 0.3, cx, cy, 1);
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const dots: Dot[] = [];
  const ghostN = o.ghostN ?? 150;
  for (let i = 0; i < ghostN; i++) {
    const d = fibDir(i, ghostN);
    const [px, py, z] = pt(d[0] * R, d[1] * R, d[2] * R);
    const depth = (z / R + 1) / 2;
    dots.push({ x: px, y: py, z, r: 0.8 * rs, white: 0.78, a: 0.1 + 0.22 * depth });
  }

  const strandN = o.strandN ?? 52;
  const turns = o.turns ?? 3;
  for (let s = 0; s < 3; s++) {
    const phase = (s / 3) * 2 * Math.PI;
    for (let i = 0; i < strandN; i++) {
      // u walks pole to pole; the frac() drift slides the whole strand along
      const u = (frac(i / strandN + t * 0.045) * 2 - 1) * 0.96;
      const surf = Math.sqrt(Math.max(0, 1 - u * u));
      const endFade = Math.min(1, (1 - Math.abs(u)) / 0.1);
      const a = u * Math.PI * turns + phase;
      // radial breathing: strands trade places — the over/under of a plait
      const weave = 1 + 0.075 * Math.sin(u * Math.PI * turns * 2 + phase * 2 + t * 0.8);
      const rr = surf * R * weave;
      const [px, py, zr] = pt(Math.cos(a) * rr, u * R * weave, Math.sin(a) * rr);
      const depth = (zr / R + 1) / 2;
      dots.push({
        x: px,
        y: py,
        z: zr,
        r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.8) * depth) * rs,
        white: 0.55 - 0.45 * depth,
        a: endFade * (0.45 + 0.55 * depth)
      });
    }
  }
  paint(ctx, dots, dark, o.rMin);
};

// Helix: strands twisting around each other like DNA — the "synthesizing" state.
// Uses strands that wind along a spherical or cylindrical path.

const drawHelix: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.82;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  // Slow global rotation
  const pt = makeProj(t * 0.15, Math.PI / 4 + Math.sin(t * 0.3) * 0.2, cx, cy, 1);

  const dots: Dot[] = [];
  const strandN = o.strandN ?? 3;
  const segs = o.segs ?? 60;
  const ghostN = o.ghostN ?? 80;

  // ghost core
  if (ghostN > 0) {
    for (let k = 0; k < ghostN; k++) {
      const h1 = hashD(k, 1.1);
      const h2 = hashD(k, 2.2);
      const h3 = hashD(k, 3.3);
      const ro = R * 0.3 * Math.cbrt(h1);
      const theta = h2 * 2 * Math.PI;
      const phi = Math.acos(2 * h3 - 1);
      
      const x = ro * Math.sin(phi) * Math.cos(theta);
      const y = ro * Math.sin(phi) * Math.sin(theta);
      const z = ro * Math.cos(phi);
      
      const [px, py, pz] = pt(x, y, z);
      const depth = (pz / R + 1) / 2;
      
      dots.push({
        x: px, y: py, z: pz,
        r: (o.ghostR ?? 0.8) * rs,
        white: 0.75,
        a: (o.ghostA ?? 0.4) * (0.3 + 0.7 * depth)
      });
    }
  }

  // swirling strands
  for (let s = 0; s < strandN; s++) {
    const sPhase = (s / strandN) * 2 * Math.PI;
    
    for (let i = 0; i <= segs; i++) {
      const f = i / segs; // 0 to 1
      const yNorm = (f * 2 - 1); // -1 to 1
      
      // taper the radius at the poles
      const latR = Math.sqrt(1 - yNorm * yNorm) * R * 0.8;
      
      const twists = o.twists ?? 2.5;
      const wave = Math.sin(t * 2 + f * Math.PI * twists * 2 + sPhase);
      
      const theta = f * Math.PI * twists * 2 + sPhase + t * 0.8;
      
      const lx = Math.cos(theta) * latR;
      const lz = Math.sin(theta) * latR;
      const ly = yNorm * R * 0.9;
      
      // add some dynamic wobbling
      const dx = lx + Math.cos(t * 3 + f * 10) * R * 0.05;
      const dy = ly + Math.sin(t * 2.5 + f * 10) * R * 0.05;
      const dz = lz + Math.cos(t * 2.2 + f * 10) * R * 0.05;

      const [px, py, pz] = pt(dx, dy, dz);
      const depth = (pz / R + 1) / 2;
      
      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.8) * depth) * rs,
        white: 0.15 + 0.3 * (1 - depth)
      });
    }
  }

  paint(ctx, dots, dark, o.rMin);
};

// Pulse: Expanding concentric spheres/rings — the "transmitting" state.
// Waves of dots radiate outward and fade as they reach the edge.

const drawPulse: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.85;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.2, 0.4 + Math.sin(t * 0.1) * 0.2, cx, cy, 1);

  const dots: Dot[] = [];
  const waves = o.waves ?? 3;
  const dotsPerWave = o.dotsPerWave ?? 80;

  for (let w = 0; w < waves; w++) {
    // phase goes from 0 to 1, wrapping around
    const phase = frac(t * (o.speedMul ?? 0.5) + w / waves);
    // ease out radius
    const rScale = Math.pow(phase, 0.6);
    const waveR = R * rScale;
    
    // fade out as it reaches the edge, and fade in at the core
    const alpha = Math.sin(phase * Math.PI) * (o.maxAlpha ?? 1);

    if (alpha < 0.02) continue;

    for (let i = 0; i < dotsPerWave; i++) {
      const [nx, ny, nz] = fibDir(i, dotsPerWave);
      
      // slightly twist the sphere as it expands
      const twist = phase * Math.PI * 0.5;
      const c = Math.cos(twist);
      const s = Math.sin(twist);
      const nx2 = nx * c - nz * s;
      const nz2 = nx * s + nz * c;

      const [px, py, pz] = pt(nx2 * waveR, ny * waveR, nz2 * waveR);
      const depth = (pz / R + 1) / 2;
      
      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 0.8) + (o.rDepth ?? 1.2) * depth) * rs,
        white: 0.2 + 0.4 * (1 - depth),
        a: alpha * (0.4 + 0.6 * depth)
      });
    }
  }

  paint(ctx, dots, dark, o.rMin);
};

// Swarm: Fluid, chaotic motion converging on a core — the "gathering" state.
// Uses noise fields to drive particle flow around a sphere.

const drawSwarm: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.85;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.1, Math.PI / 6, cx, cy, 1);

  const dots: Dot[] = [];
  const swarmN = o.swarmN ?? 120;
  
  for (let i = 0; i < swarmN; i++) {
    const h1 = hashD(i, 1.1);
    const h2 = hashD(i, 2.2);
    
    // Each particle has a unique base position
    const u = h1 * Math.PI * 2;
    const v = Math.acos(2 * h2 - 1);
    
    // Base cartesian
    const bx = Math.sin(v) * Math.cos(u);
    const by = Math.sin(v) * Math.sin(u);
    const bz = Math.cos(v);
    
    // Flow field displacement
    const timeScale = t * (o.speedMul ?? 0.8);
    const noiseScale = 1.5;
    
    // 3D noise approximations using 2D slices
    const nx = vnoise(bx * noiseScale + timeScale, by * noiseScale) * 2 - 1;
    const ny = vnoise(by * noiseScale + timeScale, bz * noiseScale) * 2 - 1;
    const nz = vnoise(bz * noiseScale + timeScale, bx * noiseScale) * 2 - 1;
    
    // Blend base position with noise
    const pull = o.pull ?? 0.6;
    let dx = bx * (1 - pull) + nx * pull;
    let dy = by * (1 - pull) + ny * pull;
    let dz = bz * (1 - pull) + nz * pull;
    
    // Normalize to keep them on or near the sphere surface
    const len = Math.max(1e-6, Math.sqrt(dx * dx + dy * dy + dz * dz));
    
    // Pulsing radius
    const ro = R * (0.6 + 0.4 * vnoise(i, timeScale * 0.5));
    
    dx = (dx / len) * ro;
    dy = (dy / len) * ro;
    dz = (dz / len) * ro;

    const [px, py, pz] = pt(dx, dy, dz);
    const depth = (pz / R + 1) / 2;
    
    dots.push({
      x: px, y: py, z: pz,
      r: ((o.rBase ?? 1.0) + (o.rDepth ?? 2.0) * depth) * rs,
      white: 0.1 + 0.3 * (1 - depth),
      a: 0.2 + 0.8 * depth
    });
  }

  paint(ctx, dots, dark, o.rMin);
};

const drawResolve: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.85;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.1, Math.PI / 4 + Math.sin(t * 0.2) * 0.2, cx, cy, 1);

  const dots: Dot[] = [];
  const swarmN = o.swarmN ?? 200;
  
  // Phase logic: chaos -> order -> chaos
  // Sharp snapping curve
  const cycle = (t * 0.8) % (Math.PI * 2);
  // smoothstep-like snapping
  let orderPhase = Math.pow(Math.sin(cycle / 2), 6); // 0 to 1, highly peaked at 1

  for (let i = 0; i < swarmN; i++) {
    // Ordered position (sphere surface)
    const [sx, sy, sz] = fibDir(i, swarmN);
    const orderX = sx * R;
    const orderY = sy * R;
    const orderZ = sz * R;

    // Chaotic position (random cloud)
    const h1 = hashD(i, 1.1) * 2 - 1;
    const h2 = hashD(i, 2.2) * 2 - 1;
    const h3 = hashD(i, 3.3) * 2 - 1;
    
    // Spread further when chaotic
    const chaosR = R * 1.5;
    const chaosX = h1 * chaosR;
    const chaosY = h2 * chaosR;
    const chaosZ = h3 * chaosR;

    // Wobble the chaotic position slightly over time
    const cx2 = chaosX + Math.sin(t * 2 + i) * R * 0.1;
    const cy2 = chaosY + Math.cos(t * 2.5 + i) * R * 0.1;
    const cz2 = chaosZ + Math.sin(t * 2.2 + i) * R * 0.1;

    // Lerp based on orderPhase
    const dx = cx2 + (orderX - cx2) * orderPhase;
    const dy = cy2 + (orderY - cy2) * orderPhase;
    const dz = cz2 + (orderZ - cz2) * orderPhase;

    const [px, py, pz] = pt(dx, dy, dz);
    const depth = (pz / R + 1) / 2; // Roughly 0 to 1
    
    // When ordered, glow brighter
    const baseWhite = 0.1 + 0.6 * orderPhase;
    const alpha = 0.3 + 0.7 * orderPhase + 0.5 * depth;

    dots.push({
      x: px, y: py, z: pz,
      r: ((o.rBase ?? 1.0) + (o.rDepth ?? 2.0) * depth) * rs,
      white: baseWhite + 0.3 * (1 - depth),
      a: Math.min(1, alpha)
    });
  }

  paint(ctx, dots, dark, o.rMin);
};

const drawKnot: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.8; 
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.15, Math.PI / 4, cx, cy, 1);
  const dots: Dot[] = [];

  const n = o.ghostN ?? 800; // lots of dots for congestion, but bounded

  for (let i = 0; i < n; i++) {
    // Generate evenly spaced points on a sphere
    const [dx, dy, dz] = fibDir(i, n);
    
    // Twist the points around the Y axis based on their Y position 
    // This gives a beautiful twisting vortex effect on a perfect sphere surface
    const twist = dy * 2.0 * Math.sin(t * 0.5);
    const twistedX = dx * Math.cos(twist) - dz * Math.sin(twist);
    const twistedZ = dx * Math.sin(twist) + dz * Math.cos(twist);
    
    // Slight breathing
    const rFlow = R * (1 + 0.05 * Math.sin(dy * 5 + t * 2));

    const rx = twistedX * rFlow;
    const ry = dy * rFlow;
    const rz = twistedZ * rFlow;

    const [px, py, pz] = pt(rx, ry, rz);
    
    // depth
    const depth = (pz / R + 1) / 2;
    
    // Highlights moving as bands across the sphere
    const band = Math.sin(dy * 10 - t * 4) * Math.cos(twistedX * 5 + t);
    const highlight = Math.pow(band * 0.5 + 0.5, 4);

    dots.push({
      x: px, y: py, z: pz,
      r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.5) * depth + highlight * 0.8) * rs,
      white: 0.15 + 0.25 * (1 - depth) + highlight * 0.6,
      a: 0.3 + 0.7 * depth + highlight * 0.4
    });
  }

  paint(ctx, dots, dark, o.rMin);
};

const drawGyro: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.8;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.1, Math.PI / 5, cx, cy, 1);
  const dots: Dot[] = [];

  const orbitN = o.orbitN ?? 4;
  const nodeN = o.nodeN ?? 40;

  // Global alignment phase
  // Eases into alignment periodically
  const cycle = (t * 0.5) % (Math.PI * 2);
  const alignPhase = Math.pow(Math.sin(cycle / 2), 8); // Sharp peak at 1

  for (let i = 0; i < orbitN; i++) {
    // Each orbit has a random base rotation axis
    const h1 = hashD(i, 1.1) * Math.PI * 2;
    const h2 = hashD(i, 2.2) * Math.PI * 2;
    const h3 = hashD(i, 3.3) * Math.PI * 2;

    // Normal rotation speed for this ring
    const speed = hashD(i, 4.4) * 2 - 1;
    const currentAngle = t * speed;

    // Target alignment: all rings lie flat on the equator (or aligned to specific axes)
    // For visual flair, let's align them to equally spaced latitudes or longitudes
    const targetZAngle = (i / orbitN) * Math.PI;

    // Lerp rotation axes toward target
    const ax = h1 + (0 - h1) * alignPhase;
    const ay = h2 + (0 - h2) * alignPhase;
    const az = h3 + (targetZAngle - h3) * alignPhase;

    // Construct simple rotation matrices
    const cx_a = Math.cos(ax), sx_a = Math.sin(ax);
    const cy_a = Math.cos(ay), sy_a = Math.sin(ay);
    const cz_a = Math.cos(az), sz_a = Math.sin(az);

    for (let j = 0; j < nodeN; j++) {
      // Position along the ring
      const ringAngle = (j / nodeN) * Math.PI * 2 + currentAngle;
      let rx = Math.cos(ringAngle) * R;
      let ry = Math.sin(ringAngle) * R;
      let rz = 0;

      // Apply Z rot
      let tx = rx * cz_a - ry * sz_a;
      let ty = rx * sz_a + ry * cz_a;
      let tz = rz;

      // Apply Y rot
      rx = tx * cy_a + tz * sy_a;
      ry = ty;
      rz = -tx * sy_a + tz * cy_a;

      // Apply X rot
      tx = rx;
      ty = ry * cx_a - rz * sx_a;
      tz = ry * sx_a + rz * cx_a;

      const [px, py, pz] = pt(tx, ty, tz);
      const depth = (pz / R + 1) / 2;
      
      // When aligned, glow brightly
      const glow = alignPhase * 0.6;
      
      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.5) * depth + glow * 2) * rs,
        white: 0.15 + 0.3 * (1 - depth) + glow,
        a: 0.3 + 0.7 * depth + glow
      });
    }
  }

  paint(ctx, dots, dark, o.rMin);
};

const drawSpark: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.9;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.2, Math.PI / 4 + Math.sin(t * 0.1) * 0.2, cx, cy, 1);
  const dots: Dot[] = [];

  const strandN = o.strandN ?? 6;
  const segs = o.segs ?? 20;
  const ghostN = o.ghostN ?? 60;

  // Dense core
  for (let i = 0; i < ghostN; i++) {
    const [dx, dy, dz] = fibDir(i, ghostN);
    // Core throbs slightly
    const coreR = R * 0.25 * (1 + 0.1 * Math.sin(t * 5 + i));
    
    const [px, py, pz] = pt(dx * coreR, dy * coreR, dz * coreR);
    const depth = (pz / R + 1) / 2;
    
    dots.push({
      x: px, y: py, z: pz,
      r: ((o.rBase ?? 1.0) + (o.rDepth ?? 2.0) * depth) * rs,
      white: 0.5 + 0.5 * (1 - depth), // bright core
      a: 0.8
    });
  }

  // Electric spikes
  for (let s = 0; s < strandN; s++) {
    // Each spike fires on a unique rhythm
    const phase = hashD(s, 1.1) * Math.PI * 2;
    const speed = 4 + hashD(s, 2.2) * 2;
    
    // Sharp pulse logic
    const pulse = Math.pow(Math.sin(t * speed + phase), 20); // very sharp spike
    
    if (pulse < 0.05) continue; // cull to save rendering
    
    // Direction of this spike
    const h1 = hashD(s, 3.3) * 2 - 1;
    const h2 = hashD(s, 4.4) * 2 - 1;
    const h3 = hashD(s, 5.5) * 2 - 1;
    const len = Math.sqrt(h1*h1 + h2*h2 + h3*h3);
    const vx = h1 / len;
    const vy = h2 / len;
    const vz = h3 / len;

    // The length of the spike extends dynamically
    const ext = pulse * R;

    for (let i = 0; i < segs; i++) {
      const f = i / segs; // 0 to 1
      
      // Jitter the line slightly to make it look electric
      const jx = (hashD(s, i*1.1) * 2 - 1) * R * 0.05;
      const jy = (hashD(s, i*1.2) * 2 - 1) * R * 0.05;
      const jz = (hashD(s, i*1.3) * 2 - 1) * R * 0.05;

      const px_3d = vx * ext * f + jx;
      const py_3d = vy * ext * f + jy;
      const pz_3d = vz * ext * f + jz;

      const [px, py, pz] = pt(px_3d, py_3d, pz_3d);
      const depth = (pz / R + 1) / 2;
      
      // Tip is brighter
      const tipGlow = f * pulse;
      
      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 1.0) + (o.rDepth ?? 2.0) * depth + tipGlow * 2) * rs,
        white: 0.2 + tipGlow * 0.8,
        a: pulse
      });
    }
  }

  paint(ctx, dots, dark, o.rMin);
};

const drawRipple: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.8;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  // Rotate slowly
  const pt = makeProj(t * 0.2, Math.PI / 4, cx, cy, 1);
  const dots: Dot[] = [];

  const latRings = o.latRings ?? 12;
  const lonDensity = o.lonDensity ?? 20;

  for (let lat = 1; lat < latRings; lat++) {
    const v = (lat / latRings) * Math.PI;
    const slat = Math.sin(v);
    const clat = Math.cos(v);

    const circumference = 2 * Math.PI * slat * R;
    const lons = Math.max(4, Math.floor(circumference / (R / lonDensity)));
    
    for (let lon = 0; lon < lons; lon++) {
      const u = (lon / lons) * Math.PI * 2;
      const slon = Math.sin(u);
      const clon = Math.cos(u);

      // Base sphere coordinate
      const bx = slat * clon;
      const by = slat * slon;
      const bz = clat;

      // Ripple passes from top to bottom
      // Dist depends on Z axis (bz)
      const wavePhase = bz * 5 - t * 4;
      const waveAmp = Math.sin(wavePhase) * Math.exp(-Math.abs(bz) * 1.5) * 0.2;
      
      // Expand radius by waveAmp
      const ro = R * (1 + waveAmp);
      
      const fx = bx * ro;
      const fy = by * ro;
      const fz = bz * ro;

      const [px, py, pz] = pt(fx, fy, fz);
      const depth = (pz / R + 1) / 2;
      
      // Peak of ripple is brighter
      const peakGlow = Math.max(0, waveAmp * 5);

      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 1.0) + (o.rDepth ?? 1.5) * depth + peakGlow) * rs,
        white: 0.1 + 0.3 * (1 - depth) + peakGlow * 0.5,
        a: 0.3 + 0.7 * depth
      });
    }
  }

  // Draw the core to give it a solid feel
  const [px_c, py_c, pz_c] = pt(0, 0, 0);
  dots.push({
    x: px_c, y: py_c, z: pz_c,
    r: (R * 0.4) * rs, // big inner core
    white: 0.1,
    a: 0.5
  });

  paint(ctx, dots, dark, o.rMin);
};

const MODE_DRAWS: Record<ModeKey, ModeDraw> = {
  orbits: drawOrbits,
  globe: drawGlobe,
  rubik: drawRubik,
  wave: drawWave,
  web: drawWeb,
  braid: drawBraid,
  ribbon: drawRibbon,
  ring: drawRibbon, // ring shares ribbon's painter
  morph: drawMorph,
  helix: drawHelix,
  pulse: drawPulse,
  swarm: drawSwarm,
  resolve: drawResolve,
  knot: drawKnot,
  gyro: drawGyro,
  spark: drawSpark,
  ripple: drawRipple,
  matrix: drawMatrix,
  mobius: drawMobius,
  dust: drawDust,
  nucleus: drawNucleus,
  sonar: drawSonar,
  dial: drawDial,
  guide: drawGuide
};

type ModeKey =
  | 'orbits'
  | 'globe'
  | 'rubik'
  | 'wave'
  | 'web'
  | 'braid'
  | 'ribbon'
  | 'ring'
  | 'morph'
  | 'helix'
  | 'pulse'
  | 'swarm'
  | 'resolve'
  | 'knot'
  | 'gyro'
  | 'spark'
  | 'ripple'
  | 'matrix'
  | 'mobius'
  | 'dust'
  | 'nucleus'
  | 'sonar'
  | 'dial'
  | 'guide';

const STATE_TO_MODE: Record<OrbState, ModeKey> = {
  working: 'orbits',
  searching: 'globe',
  solving: 'rubik',
  listening: 'wave',
  connecting: 'web',
  weaving: 'braid',
  composing: 'ribbon',
  breathing: 'ring',
  shaping: 'morph',
  synthesizing: 'helix',
  transmitting: 'pulse',
  gathering: 'swarm',
  resolving: 'resolve',
  reasoning: 'knot',
  aligning: 'gyro',
  sparking: 'spark',
  resonating: 'ripple',
  indexing: 'matrix',
  folding: 'mobius',
  drifting: 'dust',
  focusing: 'nucleus',
  syncing: 'sonar',
  processing: 'dial',
  assisting: 'guide'
};

interface Preset {
  speed: number;
  count: number;
  size: number;
  /** Extra mode opts merged verbatim after scaling. */
  extra?: ModeOpts;
}

const PRESETS: Record<ModeKey, Record<OrbSize, Preset>> = {
  orbits: {
    64: { speed: 1.885, count: 1, size: 1 },
    20: { speed: 3.9, count: 0.238, size: 2.4 }
  },
  globe: {
    64: { speed: 2.015, count: 0.42, size: 1.15, extra: { scanMul: 4.08, dimBase: 0.45 } },
    20: { speed: 2.665, count: 0.105, size: 1.75, extra: { scanMul: 4.335, dimBase: 0.45 } }
  },
  rubik: {
    64: { speed: 1.82, count: 0.35, size: 1.05 },
    20: { speed: 1.95, count: 0.088, size: 1.9 }
  },
  wave: {
    64: { speed: 4.388, count: 0.341, size: 1 },
    20: { speed: 3.998, count: 0.105, size: 1.6 }
  },
  web: {
    64: { speed: 3.315, count: 1.35, size: 0.95 },
    20: { speed: 6.63, count: 0.25, size: 1.52 }
  },
  braid: {
    64: { speed: 1.625, count: 0.5, size: 1 },
    20: { speed: 2.75, count: 0.1125, size: 1.36 }
  },
  ribbon: {
    64: { speed: 2.34, count: 0.25, size: 0.85, extra: { spin: 0, bandMul: 3.9, wobMul: 1 } },
    20: { speed: 3.12, count: 0.051, size: 1.073, extra: { spin: 0, bandMul: 4.94, wobMul: 1 } }
  },
  ring: {
    64: { speed: 3.24, count: 0.25, size: 0.956, extra: { spin: 0, bandMul: 3.627, wobMul: 0.368 } },
    20: { speed: 3.78, count: 0.028, size: 1.622, extra: { spin: 0, bandMul: 3.968, wobMul: 0.565 } }
  },
  morph: {
    64: { speed: 2.405, count: 0.702, size: 0.395, extra: { spread: 1.45 } },
    20: { speed: 2.08, count: 0.53, size: 1.011, extra: { spread: 1.45 } }
  },
  helix: {
    64: { speed: 1.6, count: 1, size: 1 },
    20: { speed: 2.4, count: 0.3, size: 1.6 }
  },
  pulse: {
    64: { speed: 1.5, count: 1, size: 1 },
    20: { speed: 2.0, count: 0.5, size: 1.5 }
  },
  swarm: {
    64: { speed: 1.8, count: 1, size: 1 },
    20: { speed: 2.5, count: 0.4, size: 1.4 }
  },
  resolve: {
    64: { speed: 1.2, count: 1, size: 1 },
    20: { speed: 1.8, count: 0.5, size: 1.5 }
  },
  knot: {
    64: { speed: 1.5, count: 1, size: 1 },
    20: { speed: 2.2, count: 0.4, size: 1.4 }
  },
  gyro: {
    64: { speed: 1.4, count: 1, size: 1 },
    20: { speed: 2.0, count: 0.5, size: 1.5 }
  },
  spark: {
    64: { speed: 1.8, count: 1, size: 1 },
    20: { speed: 2.5, count: 0.3, size: 1.8 }
  },
  ripple: {
    64: { speed: 1.2, count: 1, size: 1 },
    20: { speed: 1.6, count: 0.5, size: 1.5 }
  },
  matrix: {
    64: { speed: 1.5, count: 1, size: 1 },
    20: { speed: 2.2, count: 0.4, size: 1.5 }
  },
  mobius: {
    64: { speed: 1.2, count: 1, size: 1 },
    20: { speed: 1.8, count: 0.5, size: 1.4 }
  },
  dust: {
    64: { speed: 1.0, count: 1, size: 1 },
    20: { speed: 1.5, count: 0.4, size: 1.6 }
  },
  nucleus: {
    64: { speed: 1.5, count: 1, size: 1 },
    20: { speed: 2.0, count: 0.5, size: 1.5 }
  },
  sonar: {
    64: { speed: 1.2, count: 1, size: 1 },
    20: { speed: 1.8, count: 0.5, size: 1.5 }
  },
  dial: {
    64: { speed: 1.4, count: 1, size: 1 },
    20: { speed: 2.0, count: 0.4, size: 1.4 }
  },
  guide: {
    64: { speed: 1.2, count: 1, size: 1 },
    20: { speed: 1.6, count: 0.5, size: 1.4 }
  }
};

interface Resolved {
  mode: ModeKey;
  speed: number;
  opts: ModeOpts;
}

const cache = new Map<string, Resolved>();

function resolvePreset(state: OrbState, size: OrbSize): Resolved {
  const key = `${state}-${size}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const mode = STATE_TO_MODE[state];
  const preset = PRESETS[mode][size];

  let opts: ModeOpts = { ...BASE_PROFILES[mode] };
  if (preset.count !== 1) opts = scaleCounts(opts, preset.count);
  if (preset.size !== 1) opts = scaleRadii(opts, preset.size);
  if (preset.extra) opts = { ...opts, ...preset.extra };

  const resolved: Resolved = { mode, speed: preset.speed, opts };
  cache.set(key, resolved);
  return resolved;
}

// Theme resolution: explicit prop → ancestor data-theme/.dark|.light
// class (watched live) → prefers-color-scheme (subscribed live).
// SSR-safe: everything runs in effects; the pre-mount fallback is dark.

function ancestorTheme(el: Element | null): boolean | null {
  let node: Element | null = el;
  while (node) {
    const attr = node.getAttribute('data-theme');
    if (attr === 'dark') return true;
    if (attr === 'light') return false;
    if (node.classList.contains('dark')) return true;
    if (node.classList.contains('light')) return false;
    node = node.parentElement;
  }
  return null;
}

function systemDark(): boolean {
  return typeof matchMedia === 'undefined' || matchMedia('(prefers-color-scheme: dark)').matches;
}

/** Resolve the effective dark/light substrate for a mounted element. */
function useResolvedDark(theme: OrbTheme, hostRef: React.RefObject<Element | null>): boolean {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (theme === 'dark') {
      setDark(true);
      return;
    }
    if (theme === 'light') {
      setDark(false);
      return;
    }

    const resolve = () => {
      const fromTree = ancestorTheme(hostRef.current);
      setDark(fromTree ?? systemDark());
    };
    resolve();

    // live OS/browser theme switches
    const mq = typeof matchMedia !== 'undefined' ? matchMedia('(prefers-color-scheme: dark)') : null;
    const onMq = () => resolve();
    mq?.addEventListener('change', onMq);

    // live app-level toggles: watch class/data-theme flips on ancestors
    let mo: MutationObserver | null = null;
    if (typeof MutationObserver !== 'undefined' && hostRef.current) {
      mo = new MutationObserver(resolve);
      mo.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme'],
        subtree: true
      });
    }

    return () => {
      mq?.removeEventListener('change', onMq);
      mo?.disconnect();
    };
  }, [theme, hostRef]);

  return dark;
}

/** Live `prefers-reduced-motion` — reduced users get a static frame. */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof matchMedia === 'undefined') return;
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

// The ThinkingOrb component. One shared clock (performance.now) keeps
// every mounted orb in phase; each instance runs its own rAF loop but
// pauses automatically while offscreen (IntersectionObserver) or when
// the tab is hidden (visibilitychange). Reduced-motion users get a
// static representative frame that still follows the live theme.

const LABELS: Record<string, string> = {
  working: 'Working…',
  searching: 'Searching…',
  solving: 'Solving…',
  listening: 'Listening…',
  connecting: 'Connecting…',
  weaving: 'Weaving…',
  composing: 'Composing…',
  breathing: 'Thinking…',
  shaping: 'Shaping…',
  synthesizing: 'Synthesizing…',
  transmitting: 'Transmitting…',
  gathering: 'Gathering…',
  resolving: 'Resolving…',
  reasoning: 'Reasoning…',
  aligning: 'Aligning…',
  sparking: 'Sparking…',
  resonating: 'Resonating…',
  indexing: 'Indexing…',
  folding: 'Folding…',
  drifting: 'Drifting…',
  focusing: 'Focusing…',
  syncing: 'Syncing…',
  processing: 'Processing…',
  assisting: 'Assisting…'
};

export function ThinkingOrb({
  state = 'working',
  size = 64,
  theme = 'auto',
  speed = 1,
  paused = false,
  style,
  'aria-label': ariaLabel,
  ...rest
}: ThinkingOrbProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const dark = useResolvedDark(theme, ref);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(2, (typeof devicePixelRatio !== 'undefined' && devicePixelRatio) || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { mode, speed: baseSpeed, opts } = resolvePreset(state, size);
    const draw = MODE_DRAWS[mode];
    const effSpeed = baseSpeed * speed;

    const frame = (tSec: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      draw(ctx, size, tSec, dark, opts);
    };

    // reduced motion → one static, deterministic frame
    if (reduced) {
      frame(0.6);
      return;
    }

    let raf = 0;
    let running = false;
    const loop = () => {
      frame((performance.now() / 1000) * effSpeed);
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || paused) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // draw at least one frame even when paused/offscreen
    frame((performance.now() / 1000) * effSpeed);

    // pause offscreen + on hidden tabs — free when not visible
    let visible = true;
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && document.visibilityState !== 'hidden') start();
            else stop();
          })
        : null;
    io?.observe(canvas);
    const onVis = () => {
      if (document.visibilityState === 'hidden') stop();
      else if (visible) start();
    };
    document.addEventListener('visibilitychange', onVis);
    if (!io) start();

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [state, size, dark, speed, paused, reduced]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={ariaLabel ?? LABELS[state]}
      style={{ width: size, height: size, display: 'block', ...style }}
      {...rest}
    />
  );
}

