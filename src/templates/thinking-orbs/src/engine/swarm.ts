// Swarm: Fluid, chaotic motion converging on a core — the "gathering" state.
// Uses noise fields to drive particle flow around a sphere.

import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale, hashD, vnoise } from './core';

export const drawSwarm: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.85;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.1, Math.PI / 6, cx, cy, 1);

  const dots: Dot[] = [];
  const swarmN = o.swarmN ?? 120;
  
  for (let i = 0; i < swarmN; i++) {
    const h1 = hashD(i, 1.1);
    const h2 = hashD(i, 2.2);
    
    // Each particle has a unique base position
    const u = h1 * Math.PI * 2;
    const v = Math.acos(2 * h2 - 1);
    
    // Base cartesian
    const bx = Math.sin(v) * Math.cos(u);
    const by = Math.sin(v) * Math.sin(u);
    const bz = Math.cos(v);
    
    // Flow field displacement
    const timeScale = t * (o.speedMul ?? 0.8);
    const noiseScale = 1.5;
    
    // 3D noise approximations using 2D slices
    const nx = vnoise(bx * noiseScale + timeScale, by * noiseScale) * 2 - 1;
    const ny = vnoise(by * noiseScale + timeScale, bz * noiseScale) * 2 - 1;
    const nz = vnoise(bz * noiseScale + timeScale, bx * noiseScale) * 2 - 1;
    
    // Blend base position with noise
    const pull = o.pull ?? 0.6;
    let dx = bx * (1 - pull) + nx * pull;
    let dy = by * (1 - pull) + ny * pull;
    let dz = bz * (1 - pull) + nz * pull;
    
    // Normalize to keep them on or near the sphere surface
    const len = Math.max(1e-6, Math.sqrt(dx * dx + dy * dy + dz * dz));
    
    // Pulsing radius
    const ro = R * (0.6 + 0.4 * vnoise(i, timeScale * 0.5));
    
    dx = (dx / len) * ro;
    dy = (dy / len) * ro;
    dz = (dz / len) * ro;

    const [px, py, pz] = pt(dx, dy, dz);
    const depth = (pz / R + 1) / 2;
    
    dots.push({
      x: px, y: py, z: pz,
      r: ((o.rBase ?? 1.0) + (o.rDepth ?? 2.0) * depth) * rs,
      white: 0.1 + 0.3 * (1 - depth),
      a: 0.2 + 0.8 * depth
    });
  }

  paint(ctx, dots, dark, o.rMin);
};
