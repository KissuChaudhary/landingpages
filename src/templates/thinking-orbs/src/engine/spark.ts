import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale, hashD, fibDir } from './core';

export const drawSpark: ModeDraw = (ctx, size, t, dark, o) => {
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
