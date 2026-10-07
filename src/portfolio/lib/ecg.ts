import { SIG_STROKES } from '../signature';
import { mulberry32 } from './math';

export type Pt = [number, number];

/**
 * One PQRST complex starting at x, on baseline y, `w` wide, R-wave `a` px tall.
 * y grows downwards (SVG), so "up" is negative.
 */
export function beat(x: number, y: number, w: number, a: number): Pt[] {
  const pts: Pt[] = [];
  const bump = (t0: number, t1: number, h: number, n = 7) => {
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      pts.push([x + w * (t0 + (t1 - t0) * t), y - Math.sin(Math.PI * t) * h]);
    }
  };
  pts.push([x, y]);
  bump(0.06, 0.2, a * 0.11); // P
  pts.push([x + w * 0.29, y]);
  pts.push([x + w * 0.33, y + a * 0.09]); // Q
  pts.push([x + w * 0.385, y - a]); // R
  pts.push([x + w * 0.44, y + a * 0.3]); // S
  pts.push([x + w * 0.48, y]);
  pts.push([x + w * 0.56, y]);
  bump(0.56, 0.8, a * 0.2, 9); // T
  pts.push([x + w, y]);
  return pts;
}

/** Where the R peak of a beat starting at x lands. */
export const rPeakX = (x: number, w: number) => x + w * 0.385;

/** A baseline from x0 to x1 with complexes starting at each of `beats` (absolute x). */
export function ecgLine(x0: number, x1: number, y: number, beats: number[], w: number, a: number): Pt[] {
  const pts: Pt[] = [[x0, y]];
  for (const bx of [...beats].sort((p, q) => p - q)) {
    if (bx < x0 || bx + w > x1) continue;
    pts.push(...beat(bx, y, w, a));
  }
  pts.push([x1, y]);
  return pts;
}

export function polyline(pts: Pt[]): string {
  if (!pts.length) return '';
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) d += `L${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)}`;
  return d;
}

/** Catmull-Rom through the points, as cubic beziers. */
export function smoothPath(pts: Pt[]): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d;
}

/** The signature strokes placed with scale k and origin (ox, oy). */
export function signatureStrokes(k: number, ox: number, oy: number): Pt[][] {
  return SIG_STROKES.map((s) => s.map(([x, y]) => [ox + x * k, oy + y * k] as Pt));
}

/** The defibrillator artifact: a violent, decaying zig-zag across the whole width. */
export function joltPath(W: number, y: number, amp: number, seed: number): string {
  const r = mulberry32(seed);
  const pts: Pt[] = [[0, y]];
  const n = Math.max(24, Math.round(W / 22));
  for (let i = 1; i < n; i++) {
    const t = i / n;
    // loudest near the middle, like the paddles are there
    const env = Math.pow(Math.sin(Math.PI * t), 0.6);
    const sgn = i % 2 ? -1 : 1;
    pts.push([W * t, y + sgn * amp * env * (0.35 + r() * 0.65)]);
  }
  pts.push([W, y]);
  return polyline(pts);
}

/** A flat line with a little electrical noise (asystole is never perfectly flat). */
export function noisyFlat(W: number, y: number, amp: number, phase: number, n = 90): string {
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const x = (W * i) / n;
    const v =
      Math.sin(i * 0.9 + phase * 1.7) * 0.5 +
      Math.sin(i * 2.3 - phase * 2.9) * 0.3 +
      Math.sin(i * 5.1 + phase * 5.3) * 0.2;
    pts.push([x, y + v * amp]);
  }
  return polyline(pts);
}
