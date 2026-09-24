import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale, fibDir } from './core';

export const drawMatrix: ModeDraw = (ctx, size, t, dark, o) => {
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
