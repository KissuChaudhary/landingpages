import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale, hashD, fibDir } from './core';

export const drawResolve: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.85;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.1, Math.PI / 4 + Math.sin(t * 0.2) * 0.2, cx, cy, 1);

  const dots: Dot[] = [];
  const swarmN = o.swarmN ?? 200;
  
  // Phase logic: chaos -> order -> chaos
  // Sharp snapping curve
  const cycle = (t * 0.8) % (Math.PI * 2);
  // smoothstep-like snapping
  let orderPhase = Math.pow(Math.sin(cycle / 2), 6); // 0 to 1, highly peaked at 1

  for (let i = 0; i < swarmN; i++) {
    // Ordered position (sphere surface)
    const [sx, sy, sz] = fibDir(i, swarmN);
    const orderX = sx * R;
    const orderY = sy * R;
    const orderZ = sz * R;

    // Chaotic position (random cloud)
    const h1 = hashD(i, 1.1) * 2 - 1;
    const h2 = hashD(i, 2.2) * 2 - 1;
    const h3 = hashD(i, 3.3) * 2 - 1;
    
    // Spread further when chaotic
    const chaosR = R * 1.5;
    const chaosX = h1 * chaosR;
    const chaosY = h2 * chaosR;
    const chaosZ = h3 * chaosR;

    // Wobble the chaotic position slightly over time
    const cx2 = chaosX + Math.sin(t * 2 + i) * R * 0.1;
    const cy2 = chaosY + Math.cos(t * 2.5 + i) * R * 0.1;
    const cz2 = chaosZ + Math.sin(t * 2.2 + i) * R * 0.1;

    // Lerp based on orderPhase
    const dx = cx2 + (orderX - cx2) * orderPhase;
    const dy = cy2 + (orderY - cy2) * orderPhase;
    const dz = cz2 + (orderZ - cz2) * orderPhase;

    const [px, py, pz] = pt(dx, dy, dz);
    const depth = (pz / R + 1) / 2; // Roughly 0 to 1
    
    // When ordered, glow brighter
    const baseWhite = 0.1 + 0.6 * orderPhase;
    const alpha = 0.3 + 0.7 * orderPhase + 0.5 * depth;

    dots.push({
      x: px, y: py, z: pz,
      r: ((o.rBase ?? 1.0) + (o.rDepth ?? 2.0) * depth) * rs,
      white: baseWhite + 0.3 * (1 - depth),
      a: Math.min(1, alpha)
    });
  }

  paint(ctx, dots, dark, o.rMin);
};
