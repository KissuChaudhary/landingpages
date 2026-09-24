// Pulse: Expanding concentric spheres/rings — the "transmitting" state.
// Waves of dots radiate outward and fade as they reach the edge.

import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale, fibDir, frac } from './core';

export const drawPulse: ModeDraw = (ctx, size, t, dark, o) => {
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
