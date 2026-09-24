import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale } from './core';

export const drawDial: ModeDraw = (ctx, size, t, dark, o) => {
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
