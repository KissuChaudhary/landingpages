"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "./MotionProvider";
import { useInView, usePageVisible } from "./useInView";

type Point = { x: number; y: number; z: number; band: number; ring: number };

/** An original torus-knot point sculpture. No WebGL, textures, or dependencies. */
function makePoints(detail: number): Point[] {
  const points: Point[] = [];
  const center = (u: number) => {
    const r = 1.18 + 0.4 * Math.cos(3 * u);
    return [r * Math.cos(2 * u), r * Math.sin(2 * u), 0.6 * Math.sin(3 * u)];
  };
  for (let i = 0; i < detail; i++) {
    const u = (i / detail) * Math.PI * 2;
    const a = center(u),
      b = center(u + 0.001);
    const tangent = b.map((v, j) => v - a[j]);
    const length = Math.hypot(...tangent);
    const t = tangent.map((v) => v / length);
    const normalLength = Math.hypot(t[0], t[1]);
    const n = [-t[1] / normalLength, t[0] / normalLength, 0];
    const bn = [-t[2] * n[1], t[2] * n[0], t[0] * n[1] - t[1] * n[0]];
    for (let j = 0; j < 22; j++) {
      const v = (j / 22) * Math.PI * 2;
      const tube = 0.21 + 0.04 * Math.sin(u * 3);
      const p = a.map(
        (c, k) => c + tube * (Math.cos(v) * n[k] + Math.sin(v) * bn[k]),
      );
      points.push({ x: p[0], y: p[1], z: p[2], band: u, ring: j });
    }
  }
  return points;
}

export function AgentSculpture({ compact = false }: { compact?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [host, visible] = useInView<HTMLDivElement>({
    once: false,
    rootMargin: "100px",
  });
  const pageVisible = usePageVisible();
  const { reduced } = useMotion();
  const pointer = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);

  useEffect(() => {
    const element = canvas.current,
      container = host.current;
    if (!element || !container) return;
    const ctx = element.getContext("2d");
    if (!ctx) return;
    let width = 0,
      height = 0,
      frame = 0,
      last = 0,
      angle = rotation.current;
    let easedX = 0,
      easedY = 0;
    const points = makePoints(compact ? 100 : 160);
    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(width * dpr);
      element.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cancelAnimationFrame(frame);
      draw(0);
    };
    const draw = (time: number) => {
      if (time && time - last < 32) {
        frame = requestAnimationFrame(draw);
        return;
      }
      if (time) angle += Math.min(time - (last || time), 40) * 0.00008;
      rotation.current = angle;
      last = time;
      easedX += (pointer.current.x - easedX) * 0.035;
      easedY += (pointer.current.y - easedY) * 0.035;
      ctx.clearRect(0, 0, width, height);
      const ry = -0.3 + angle + easedX * 0.16,
        rx = 0.72 + easedY * 0.14;
      const scale = Math.min(width, height) * (compact ? 0.235 : 0.24);
      const projected = points
        .map((p) => {
          const x = p.x * Math.cos(ry) + p.z * Math.sin(ry);
          const z = -p.x * Math.sin(ry) + p.z * Math.cos(ry);
          const y = p.y * Math.cos(rx) - z * Math.sin(rx);
          const depth = p.y * Math.sin(rx) + z * Math.cos(rx);
          const perspective = 4.8 / (4.8 - depth);
          return {
            x: width * 0.5 + x * scale * perspective,
            y: height * 0.51 + y * scale * perspective,
            z: depth,
            band: p.band,
            ring: p.ring,
            perspective,
          };
        })
        .sort((a, b) => a.z - b.z);
      for (const p of projected) {
        const depth = (p.z + 1.8) / 3.6;
        const blue = Math.sin(p.band * 2 + angle) > -0.4;
        ctx.fillStyle = blue
          ? `rgba(40,85,237,${0.2 + depth * 0.7})`
          : `rgba(144,171,219,${0.16 + depth * 0.48})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (0.8 + depth * 0.52) * p.perspective, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced && visible && pageVisible)
        frame = requestAnimationFrame(draw);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [compact, host, reduced, visible, pageVisible]);

  return (
    <div
      ref={host}
      className={`agent-sculpture ${compact ? "sculpture-compact" : ""}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((e.clientX - r.left) / r.width) * 2 - 1,
          y: ((e.clientY - r.top) / r.height) * 2 - 1,
        };
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
      }}
      aria-hidden="true"
    >
      <canvas ref={canvas} />
    </div>
  );
}
