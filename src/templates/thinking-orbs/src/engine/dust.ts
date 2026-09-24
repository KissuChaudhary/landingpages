import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale, hashD } from './core';

export const drawDust: ModeDraw = (ctx, size, t, dark, o) => {
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
