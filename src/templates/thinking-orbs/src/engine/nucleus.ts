import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale, fibDir } from './core';

export const drawNucleus: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.85;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  const pt = makeProj(t * 0.1, Math.PI / 6, cx, cy, 1);
  const dots: Dot[] = [];

  const coreN = o.ghostN ?? 60;
  const ringN = o.nodeN ?? 45;

  const coreR = R * 0.35;
  const breathe = 1 + Math.sin(t * 2.5) * 0.08;
  for (let i = 0; i < coreN; i++) {
    const [dx, dy, dz] = fibDir(i, coreN);
    const [px, py, pz] = pt(dx * coreR * breathe, dy * coreR * breathe, dz * coreR * breathe);
    const depth = (pz / R + 1) / 2;
    dots.push({
      x: px, y: py, z: pz,
      r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.5) * depth) * rs,
      white: 0.1 + 0.3 * (1 - depth),
      a: 0.2 + 0.6 * depth
    });
  }

  for (let r = 0; r < 2; r++) {
    const angleOffset = r * Math.PI / 2;
    const ringSpeed = t * 1.5 * (r === 0 ? 1 : -1);
    
    for (let i = 0; i < ringN; i++) {
      const theta = (i / ringN) * Math.PI * 2;
      
      const arcFade = Math.pow(Math.sin(theta * 2 + ringSpeed), 2);
      if (arcFade < 0.1) continue;
      
      let rx = Math.cos(theta) * R;
      let ry = Math.sin(theta) * R;
      let rz = 0;

      let tx = rx;
      let ty = ry * Math.cos(angleOffset) - rz * Math.sin(angleOffset);
      let tz = ry * Math.sin(angleOffset) + rz * Math.cos(angleOffset);

      const spinAngle = ringSpeed;
      const sx = tx * Math.cos(spinAngle) - tz * Math.sin(spinAngle);
      const sy = ty;
      const sz = tx * Math.sin(spinAngle) + tz * Math.cos(spinAngle);

      const [px, py, pz] = pt(sx, sy, sz);
      const depth = (pz / R + 1) / 2;

      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 1.2) + (o.rDepth ?? 1.5) * depth) * rs,
        white: 0.2 + 0.5 * (1 - depth),
        a: 0.3 * arcFade + 0.7 * depth * arcFade
      });
    }
  }

  paint(ctx, dots, dark, o.rMin);
};
