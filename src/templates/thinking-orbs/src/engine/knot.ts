import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale, fibDir } from './core';

export const drawKnot: ModeDraw = (ctx, size, t, dark, o) => {
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
