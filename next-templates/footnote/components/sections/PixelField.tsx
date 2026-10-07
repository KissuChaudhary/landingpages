"use client";

import { useEffect, useRef } from "react";

/**
 * A field of small squares that fades out toward the left and bottom, with a few of them slowly lighting
 * up in the accent colour. Drawn on a canvas; with reduced motion it is drawn once and stays still.
 */
const CELL = 22;
const SIZE = 3;

function hash(x: number, y: number) {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

export function PixelField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const fadeX = Math.pow(col / cols, 1.6);
          const fadeY = Math.pow(1 - row / rows, 0.8);
          const base = fadeX * fadeY;
          const seed = hash(col, row);
          if (seed > 0.55 + base * 0.4) continue;
          const pulse = 0.5 + 0.5 * Math.sin(time / 1800 + seed * 40);
          const lit = seed < 0.05 && base > 0.25;
          const alpha = lit ? 0.35 + pulse * 0.5 : 0.09 + base * 0.28;
          ctx.fillStyle = lit ? `rgba(138,180,255,${alpha.toFixed(3)})` : `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.fillRect(col * CELL + (CELL - SIZE) / 2, row * CELL + (CELL - SIZE) / 2, SIZE, SIZE);
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) draw(0);
    else frame = requestAnimationFrame(loop);

    const observer = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full" />;
}
