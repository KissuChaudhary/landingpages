// Helix: strands twisting around each other like DNA — the "synthesizing" state.
// Uses strands that wind along a spherical or cylindrical path.

import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale, hashD } from './core';

export const drawHelix: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.82;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  // Slow global rotation
  const pt = makeProj(t * 0.15, Math.PI / 4 + Math.sin(t * 0.3) * 0.2, cx, cy, 1);

  const dots: Dot[] = [];
  const strandN = o.strandN ?? 3;
  const segs = o.segs ?? 60;
  const ghostN = o.ghostN ?? 80;

  // ghost core
  if (ghostN > 0) {
    for (let k = 0; k < ghostN; k++) {
      const h1 = hashD(k, 1.1);
      const h2 = hashD(k, 2.2);
      const h3 = hashD(k, 3.3);
      const ro = R * 0.3 * Math.cbrt(h1);
      const theta = h2 * 2 * Math.PI;
      const phi = Math.acos(2 * h3 - 1);
      
      const x = ro * Math.sin(phi) * Math.cos(theta);
      const y = ro * Math.sin(phi) * Math.sin(theta);
      const z = ro * Math.cos(phi);
      
      const [px, py, pz] = pt(x, y, z);
      const depth = (pz / R + 1) / 2;
      
      dots.push({
        x: px, y: py, z: pz,
        r: (o.ghostR ?? 0.8) * rs,
        white: 0.75,
        a: (o.ghostA ?? 0.4) * (0.3 + 0.7 * depth)
      });
    }
  }

  // swirling strands
  for (let s = 0; s < strandN; s++) {
    const sPhase = (s / strandN) * 2 * Math.PI;
    
    for (let i = 0; i <= segs; i++) {
      const f = i / segs; // 0 to 1
      const yNorm = (f * 2 - 1); // -1 to 1
      
      // taper the radius at the poles
      const latR = Math.sqrt(1 - yNorm * yNorm) * R * 0.8;
      
      const twists = o.twists ?? 2.5;
      const wave = Math.sin(t * 2 + f * Math.PI * twists * 2 + sPhase);
      
      const theta = f * Math.PI * twists * 2 + sPhase + t * 0.8;
      
      const lx = Math.cos(theta) * latR;
      const lz = Math.sin(theta) * latR;
      const ly = yNorm * R * 0.9;
      
      // add some dynamic wobbling
      const dx = lx + Math.cos(t * 3 + f * 10) * R * 0.05;
      const dy = ly + Math.sin(t * 2.5 + f * 10) * R * 0.05;
      const dz = lz + Math.cos(t * 2.2 + f * 10) * R * 0.05;

      const [px, py, pz] = pt(dx, dy, dz);
      const depth = (pz / R + 1) / 2;
      
      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.8) * depth) * rs,
        white: 0.15 + 0.3 * (1 - depth)
      });
    }
  }

  paint(ctx, dots, dark, o.rMin);
};
