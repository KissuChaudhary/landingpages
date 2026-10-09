"use client";

import * as React from "react";
import { useMotion } from "./MotionProvider";
import { useInView, usePageVisible } from "./useInView";

/*
 * GLYPH FIELD: the bill, falling.
 *
 * A river of monospaced characters follows a cost curve: a high plateau on
 * the left drops through the middle to a low line on the right. On the left
 * the river is thick and made of dense characters ($ % # 8); as it falls it
 * thins into digits and finally into sparse mint dots, the waste cut away.
 *
 *   flow      the pattern drifts along the curve, left to right
 *   pointer   characters near the cursor brighten and scramble, and faint
 *             figures surface around it even off the river
 *   pulse     change `pulse` and a bright mint wave runs along the river
 *   rest      paused, reduced motion or off screen: one still frame
 *
 * Everything is drawn on one canvas at up to 30fps, only while visible.
 */

type Tone = "dark" | "light";

type Props = {
  tone?: Tone;
  /** Change this number to send a wave along the river. */
  pulse?: number;
  /** An ellipse (fractions of the size) where the river fades, so text over it stays readable. */
  mask?: { x: number; y: number; rx: number; ry: number };
  /** Top and bottom of the curve, as fractions of the height. */
  range?: [number, number];
  className?: string;
};

const DENSE = "$%#&8@B0";
const DIGITS = "0123456789";
const SPARSE = "::··..";
const PALETTE: Record<Tone, { base: [number, number, number]; accent: [number, number, number]; scale: number }> = {
  dark: { base: [234, 239, 236], accent: [124, 240, 181], scale: 1 },
  light: { base: [12, 14, 16], accent: [10, 133, 82], scale: 0.62 },
};
const RANGE: [number, number] = [0.14, 0.86];
const LEVELS = 10;
const FRAME = 1000 / 30;

function hash(x: number, y: number) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
function noise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

type Cell = { x: number; y: number; t: number; col: number; row: number; seed: number; edge: number };

export function GlyphField({ tone = "dark", pulse = 0, mask, range = RANGE, className = "" }: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [wrapRef, inView] = useInView<HTMLDivElement>({ once: false, rootMargin: "120px 0px" });
  const { still } = useMotion();
  const visible = usePageVisible();
  const state = React.useRef({
    cells: [] as Cell[],
    w: 0,
    h: 0,
    cw: 11,
    ch: 16,
    font: "12px monospace",
    time: 0,
    pulseAt: -10,
    pointer: null as null | { x: number; y: number },
    ready: false,
  });
  const draw = React.useRef<() => void>(() => {});

  // Build the grid and keep only the cells near the river.
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = state.current;
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-fragment").trim() || "monospace";

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      s.w = rect.width;
      s.h = rect.height;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      const small = rect.width < 640;
      s.cw = small ? 9 : 11;
      s.ch = small ? 13 : 16;
      s.font = `${small ? 10.5 : 12.5}px ${family}`;
      const cols = Math.ceil(rect.width / s.cw) + 1;
      const rows = Math.ceil(rect.height / s.ch) + 1;
      const cells: Cell[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * s.cw;
          const y = row * s.ch + s.ch * 0.7;
          const t = x / rect.width;
          // On phones the copy fills the width, so the river keeps nearer the corners.
          const center = curveY(t, rect.height, small ? [range[0] * 0.4, Math.min(0.96, range[1] * 1.1)] : range);
          const half = thickness(t, rect.height, small);
          const d = Math.abs(y - center) / half;
          const seed = hash(col * 7 + 3, row * 13 + 5);
          let edge = d < 1 ? 1 - d * d : 0;
          if (d >= 1 && d < 1.7 && seed > 0.9) edge = 0.3 * (1.7 - d);
          if (edge > 0) cells.push({ x, y, t, col, row, seed, edge });
        }
      }
      s.cells = cells;
      s.ready = true;
      draw.current();
    };

    let cancelled = false;
    (document.fonts?.load(`12px ${family}`) ?? Promise.resolve())
      .catch(() => {})
      .then(() => !cancelled && layout());
    const observer = new ResizeObserver(() => s.ready && layout());
    observer.observe(canvas);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [range]);

  // One frame of the river.
  React.useEffect(() => {
    draw.current = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const s = state.current;
      if (!canvas || !ctx || !s.ready) return;
      const { base, accent, scale } = PALETTE[tone];
      ctx.clearRect(0, 0, s.w, s.h);
      ctx.font = s.font;
      ctx.textBaseline = "alphabetic";
      const buckets: [number, number, string][][] = Array.from({ length: LEVELS * 2 }, () => []);
      const time = s.time;
      const pulseP = (time - s.pulseAt) / 1.7;
      const pointer = s.pointer;
      const radius = 130;

      for (const c of s.cells) {
        const flow = c.t * 7 - time * 0.42;
        const raw = 0.6 * noise(flow * 1.7, c.row * 0.19 + time * 0.07) + 0.4 * noise(flow * 4.1 + 40, c.row * 0.41 - time * 0.05);
        const n = smooth(0.28, 0.78, raw);
        let level = c.edge * (0.2 + n);
        const threshold = 0.43 + 0.08 * smooth(0.25, 1, c.t) + (c.seed - 0.5) * 0.16;
        let lit = false;
        let scramble = 0;
        if (pulseP >= 0 && pulseP <= 1.15) {
          const dist = Math.abs(c.t - pulseP);
          if (dist < 0.06) {
            const k = 1 - dist / 0.06;
            level += k * 0.75;
            lit = k > 0.35;
            scramble = 18;
          }
        }
        if (pointer) {
          const dx = c.x - pointer.x;
          const dy = c.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius) {
            const k = 1 - dist / radius;
            level += k * 0.55;
            lit = lit || k > 0.55;
            scramble = Math.max(scramble, 14 * k);
          }
        }
        if (level < threshold) continue;
        const strength = Math.min(1, (level - threshold) / (1 - threshold));
        // Fades in from the left edge so the river never starts at a hard line.
        let alpha = (0.12 + 0.88 * Math.pow(strength, 1.25)) * smooth(0, 0.12, c.t);
        if (mask) {
          const wide = s.w < 640 ? 1.5 : 1;
          const mx = (c.x / s.w - mask.x) / Math.min(0.75, mask.rx * wide);
          const my = (c.y / s.h - mask.y) / (mask.ry * (s.w < 640 ? 1.15 : 1));
          alpha *= 0.2 + 0.8 * smooth(0.35, 1.05, mx * mx + my * my);
        }
        if (alpha < 0.05) continue;
        // Strong cells on the left are dense characters; weaker ones and the right side thin out.
        const q = strength + (0.45 - c.t) * 0.9;
        const set = q > 0.7 ? DENSE : q > 0.18 ? DIGITS : SPARSE;
        const tick = Math.floor(time * (1.6 + scramble) + c.seed * 50);
        const char = set[(Math.floor(c.seed * 97) + tick) % set.length];
        // Past the drop the river turns to savings: mint, dithered by seed.
        const mint = lit || c.t + (c.seed - 0.5) * 0.18 > 0.64;
        const level10 = Math.min(LEVELS - 1, Math.floor(alpha * LEVELS));
        buckets[(mint ? LEVELS : 0) + level10].push([c.x, c.y, char]);
      }

      // Faint figures surface around the pointer, even off the river.
      if (pointer && tone === "dark") {
        const c0 = Math.max(0, Math.floor((pointer.x - radius) / s.cw));
        const c1 = Math.floor((pointer.x + radius) / s.cw);
        const r0 = Math.max(0, Math.floor((pointer.y - radius) / s.ch));
        const r1 = Math.floor((pointer.y + radius) / s.ch);
        for (let row = r0; row <= r1; row++) {
          for (let col = c0; col <= c1; col++) {
            const seed = hash(col * 7 + 3, row * 13 + 5);
            if (seed < 0.55) continue;
            const x = col * s.cw;
            const y = row * s.ch + s.ch * 0.7;
            const dist = Math.hypot(x - pointer.x, y - pointer.y);
            if (dist > radius) continue;
            let k = (1 - dist / radius) * 0.32;
            if (mask) {
              const wide = s.w < 640 ? 1.5 : 1;
              const mx = (x / s.w - mask.x) / Math.min(0.75, mask.rx * wide);
              const my = (y / s.h - mask.y) / (mask.ry * (s.w < 640 ? 1.15 : 1));
              k *= smooth(0.45, 1.05, mx * mx + my * my);
            }
            if (k < 0.05) continue;
            const char = DIGITS[(Math.floor(seed * 31) + Math.floor(time * 6)) % DIGITS.length];
            buckets[Math.min(LEVELS - 1, Math.floor(k * LEVELS))].push([x, y, char]);
          }
        }
      }

      buckets.forEach((glyphs, i) => {
        if (!glyphs.length) return;
        const mint = i >= LEVELS;
        const [r, g, b] = mint ? accent : base;
        const a = (((i % LEVELS) + 1) / LEVELS) * scale * (mint ? 1 : 0.92);
        ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
        for (const [x, y, ch] of glyphs) ctx.fillText(ch, x, y);
      });
    };
    draw.current();
  }, [tone, mask]);

  // A wave runs along the river whenever `pulse` changes.
  const firstPulse = React.useRef(true);
  React.useEffect(() => {
    if (firstPulse.current) {
      firstPulse.current = false;
      return;
    }
    state.current.pulseAt = state.current.time;
  }, [pulse]);

  // The pointer, read from the section the field sits in.
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement?.parentElement;
    if (!canvas || !host || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.current.pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const leave = () => (state.current.pointer = null);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  // The loop runs only while the field can be seen and motion is allowed.
  React.useEffect(() => {
    if (still || !inView || !visible) {
      draw.current();
      return;
    }
    let frame = 0;
    let last = performance.now();
    let acc = 0;
    const tick = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      acc += dt;
      if (acc >= FRAME) {
        state.current.time += acc / 1000;
        acc = 0;
        draw.current();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [still, inView, visible]);

  return (
    <div ref={wrapRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

function curveY(t: number, h: number, [top, bottom]: [number, number]) {
  const s0 = sigmoid(-0.47 * 7);
  const s1 = sigmoid(0.53 * 7);
  const s = (sigmoid((t - 0.47) * 7) - s0) / (s1 - s0);
  return h * (top + (bottom - top) * s);
}

function thickness(t: number, h: number, small: boolean) {
  const max = small ? 0.09 : 0.12;
  const min = small ? 0.028 : 0.036;
  return h * (max - (max - min) * smooth(0.12, 0.92, t));
}
