import type { Dot, ModeDraw } from './types';
import { makeProj, paint, radiusScale } from './core';

export const drawRipple: ModeDraw = (ctx, size, t, dark, o) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.8;
  const rs = radiusScale(size, o.rsPow ?? 0.6);

  // Rotate slowly
  const pt = makeProj(t * 0.2, Math.PI / 4, cx, cy, 1);
  const dots: Dot[] = [];

  const latRings = o.latRings ?? 12;
  const lonDensity = o.lonDensity ?? 20;

  for (let lat = 1; lat < latRings; lat++) {
    const v = (lat / latRings) * Math.PI;
    const slat = Math.sin(v);
    const clat = Math.cos(v);

    const circumference = 2 * Math.PI * slat * R;
    const lons = Math.max(4, Math.floor(circumference / (R / lonDensity)));
    
    for (let lon = 0; lon < lons; lon++) {
      const u = (lon / lons) * Math.PI * 2;
      const slon = Math.sin(u);
      const clon = Math.cos(u);

      // Base sphere coordinate
      const bx = slat * clon;
      const by = slat * slon;
      const bz = clat;

      // Ripple passes from top to bottom
      // Dist depends on Z axis (bz)
      const wavePhase = bz * 5 - t * 4;
      const waveAmp = Math.sin(wavePhase) * Math.exp(-Math.abs(bz) * 1.5) * 0.2;
      
      // Expand radius by waveAmp
      const ro = R * (1 + waveAmp);
      
      const fx = bx * ro;
      const fy = by * ro;
      const fz = bz * ro;

      const [px, py, pz] = pt(fx, fy, fz);
      const depth = (pz / R + 1) / 2;
      
      // Peak of ripple is brighter
      const peakGlow = Math.max(0, waveAmp * 5);

      dots.push({
        x: px, y: py, z: pz,
        r: ((o.rBase ?? 1.0) + (o.rDepth ?? 1.5) * depth + peakGlow) * rs,
        white: 0.1 + 0.3 * (1 - depth) + peakGlow * 0.5,
        a: 0.3 + 0.7 * depth
      });
    }
  }

  // Draw the core to give it a solid feel
  const [px_c, py_c, pz_c] = pt(0, 0, 0);
  dots.push({
    x: px_c, y: py_c, z: pz_c,
    r: (R * 0.4) * rs, // big inner core
    white: 0.1,
    a: 0.5
  });

  paint(ctx, dots, dark, o.rMin);
};
