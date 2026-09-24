import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale } from './core';

export const drawMobius: ModeDraw = (ctx, size, t, dark, o) => {
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
