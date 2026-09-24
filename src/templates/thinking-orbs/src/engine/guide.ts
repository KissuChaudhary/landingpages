import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale } from './core';

export const drawGuide: ModeDraw = (ctx, size, t, dark, o) => {
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
