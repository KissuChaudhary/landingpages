import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale, hashD } from './core';

export const drawGyro: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.8;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.1, Math.PI / 5, cx, cy, 1);
  const dots: Dot[] = [];

  const orbitN = o.orbitN ?? 4;
  const nodeN = o.nodeN ?? 40;

  // Global alignment phase
  // Eases into alignment periodically
  const cycle = (t * 0.5) % (Math.PI * 2);
  const alignPhase = Math.pow(Math.sin(cycle / 2), 8); // Sharp peak at 1

  for (let i = 0; i < orbitN; i++) {
    // Each orbit has a random base rotation axis
    const h1 = hashD(i, 1.1) * Math.PI * 2;
    const h2 = hashD(i, 2.2) * Math.PI * 2;
    const h3 = hashD(i, 3.3) * Math.PI * 2;

    // Normal rotation speed for this ring
    const speed = hashD(i, 4.4) * 2 - 1;
    const currentAngle = t * speed;

    // Target alignment: all rings lie flat on the equator (or aligned to specific axes)
    // For visual flair, let's align them to equally spaced latitudes or longitudes
    const targetZAngle = (i / orbitN) * Math.PI;

    // Lerp rotation axes toward target
    const ax = h1 + (0 - h1) * alignPhase;
    const ay = h2 + (0 - h2) * alignPhase;
    const az = h3 + (targetZAngle - h3) * alignPhase;

    // Construct simple rotation matrices
    const cx_a = Math.cos(ax), sx_a = Math.sin(ax);
    const cy_a = Math.cos(ay), sy_a = Math.sin(ay);
    const cz_a = Math.cos(az), sz_a = Math.sin(az);

    for (let j = 0; j < nodeN; j++) {
      // Position along the ring
      const ringAngle = (j / nodeN) * Math.PI * 2 + currentAngle;
      let rx = Math.cos(ringAngle) * R;
      let ry = Math.sin(ringAngle) * R;
      let rz = 0;

      // Apply Z rot
      let tx = rx * cz_a - ry * sz_a;
      let ty = rx * sz_a + ry * cz_a;
      let tz = rz;

      // Apply Y rot
      rx = tx * cy_a + tz * sy_a;
      ry = ty;
      rz = -tx * sy_a + tz * cy_a;

      // Apply X rot
      tx = rx;
      ty = ry * cx_a - rz * sx_a;
      tz = ry * sx_a + rz * cx_a;

      const [px, py, pz] = pt(tx, ty, tz);
      const depth = (pz / R + 1) / 2;
      
      // When aligned, glow brightly
      const glow = alignPhase * 0.6;
      
      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.5) * depth + glow * 2) * rs,
        white: 0.15 + 0.3 * (1 - depth) + glow,
        a: 0.3 + 0.7 * depth + glow
      });
    }
  }

  paint(ctx, dots, dark, o.rMin);
};
