import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale, frac } from './core';

export const drawSonar: ModeDraw = (ctx, size, t, dark, o) => {
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
