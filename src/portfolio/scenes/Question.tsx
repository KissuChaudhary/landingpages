'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { COUNTS } from '../data';
import { clamp, easeInOutCubic, hashString, lerp, mulberry32 } from '../lib/math';

const A_LINES = ['What can I', 'build?'];
const B_LINES = ['What is worth', 'building?'];
const WORTH = new Set([6, 7, 8, 9, 10]); // indexes of w-o-r-t-h among B's letters (W h a t i s w o r t h …)

interface Pos {
  x: number;
  y: number;
}
interface Glyph {
  ch: string;
  kind: 'move' | 'out' | 'in';
  from?: Pos;
  to?: Pos;
  worth?: boolean;
  seed: number;
  order: number;
}

/** letters (no spaces) with the line they sit on */
const letters = (lines: string[]) => lines.join(' ').replace(/ /g, '').split('');

function lcsPairs(a: string[], b: string[]): [number, number][] {
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out: [number, number][] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      out.push([i, j]);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return out;
}

function Measure({ lines, innerRef }: { lines: string[]; innerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={innerRef} className="hv-q-type pointer-events-none invisible absolute inset-x-0 top-0 text-center" aria-hidden>
      {lines.map((l, li) => (
        <div key={li}>
          {l.split(' ').map((w, wi) => (
            <span key={wi}>
              {wi > 0 && ' '}
              {w.split('').map((c, ci) => (
                <span key={ci} data-ch>
                  {c}
                </span>
              ))}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Question() {
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);
  const glyphEls = useRef<(HTMLSpanElement | null)[]>([]);
  const [glyphs, setGlyphs] = useState<Glyph[]>([]);
  const [height, setHeight] = useState(0);
  const [phase, setPhase] = useState<'then' | 'now'>('then');
  const [done, setDone] = useState(false);
  const [light, setLight] = useState(false);
  const progress = useRef(0);

  const layout = useCallback(() => {
    const A = aRef.current;
    const B = bRef.current;
    if (!A || !B) return;
    const pos = (root: HTMLDivElement) =>
      Array.from(root.querySelectorAll<HTMLSpanElement>('[data-ch]')).map((s) => ({ x: s.offsetLeft, y: s.offsetTop, w: s.offsetWidth }));
    const pa = pos(A);
    const pb = pos(B);
    const la = letters(A_LINES);
    const lb = letters(B_LINES);
    const pairs = lcsPairs(la, lb);
    const aTo = new Map<number, number>(pairs);
    const bUsed = new Set(pairs.map((p) => p[1]));
    // a second pass: leftover letters that exist on both sides still travel (the "n" crosses over)
    la.forEach((c, i) => {
      if (aTo.has(i)) return;
      const j = lb.findIndex((d, k) => d === c && !bUsed.has(k));
      if (j >= 0) {
        aTo.set(i, j);
        bUsed.add(j);
      }
    });
    const out: Glyph[] = [];
    la.forEach((c, i) => {
      const r = hashString(c + i);
      const j = aTo.get(i);
      if (j !== undefined) out.push({ ch: c, kind: 'move', from: pa[i], to: pb[j], worth: WORTH.has(j), seed: r, order: i / la.length });
      else out.push({ ch: c, kind: 'out', from: pa[i], seed: r, order: i / la.length });
    });
    lb.forEach((c, j) => {
      if (!bUsed.has(j)) out.push({ ch: c, kind: 'in', to: pb[j], worth: WORTH.has(j), seed: hashString(c + j + 'b'), order: j / lb.length });
    });
    setGlyphs(out);
    setHeight(Math.max(A.offsetHeight, B.offsetHeight));
  }, []);

  useLayoutEffect(() => {
    layout();
    const ro = new ResizeObserver(layout);
    if (boxRef.current) ro.observe(boxRef.current);
    document.fonts?.ready.then(layout);
    return () => ro.disconnect();
  }, [layout]);

  const paint = useCallback(
    (p: number) => {
      progress.current = p;
      const t = reduced ? (p > 0.5 ? 1 : 0) : clamp((p - 0.2) / 0.5);
      const em = parseFloat(getComputedStyle(boxRef.current ?? document.body).fontSize) || 100;
      glyphs.forEach((g, k) => {
        const el = glyphEls.current[k];
        if (!el) return;
        const rnd = mulberry32(g.seed);
        if (g.kind === 'move' && g.from && g.to) {
          const d = g.order * 0.28;
          const e = easeInOutCubic(clamp((t - d) / (1 - 0.28)));
          const arc = Math.sin(Math.PI * e) * em * 0.32 * (g.to.x < g.from.x ? 1 : -1);
          const x = lerp(g.from.x, g.to.x, e);
          const y = lerp(g.from.y, g.to.y, e) + arc;
          el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
          el.style.opacity = '1';
          const green = g.worth ? clamp((e - 0.6) / 0.4) : 0;
          el.style.color = green > 0 ? `color-mix(in srgb, var(--pulse) ${Math.round(green * 100)}%, var(--ink))` : 'var(--ink)';
          el.style.textShadow = green > 0 ? `0 0 ${Math.round(40 * green)}px rgba(61,255,154,${(0.5 * green).toFixed(2)})` : 'none';
        } else if (g.kind === 'out' && g.from) {
          const e = clamp(t / 0.42);
          const k2 = e * e;
          const x = g.from.x + (rnd() - 0.5) * em * 0.8 * k2;
          const y = g.from.y + em * 1.1 * k2;
          el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${((rnd() - 0.5) * 70 * k2).toFixed(1)}deg)`;
          el.style.opacity = String(1 - clamp((e - 0.3) / 0.7));
          el.style.color = e > 0.02 ? 'var(--alarm)' : 'var(--ink)';
          el.style.filter = `blur(${(6 * k2).toFixed(1)}px)`;
          el.style.textShadow = 'none';
        } else if (g.kind === 'in' && g.to) {
          const e = clamp((t - 0.42 - g.order * 0.14) / 0.44);
          const eo = 1 - Math.pow(1 - e, 3);
          el.style.transform = `translate3d(${g.to.x.toFixed(1)}px, ${(g.to.y - em * 0.55 * (1 - eo)).toFixed(1)}px, 0)`;
          el.style.opacity = String(eo);
          el.style.filter = `blur(${(7 * (1 - eo)).toFixed(1)}px)`;
          const green = g.worth ? clamp((e - 0.5) / 0.5) : 0;
          el.style.color = green > 0 ? `color-mix(in srgb, var(--pulse) ${Math.round(green * 100)}%, var(--ink))` : 'var(--ink)';
          el.style.textShadow = green > 0 ? `0 0 ${Math.round(40 * green)}px rgba(61,255,154,${(0.5 * green).toFixed(2)})` : 'none';
        }
      });
      const now = t > 0.5 ? 'now' : 'then';
      setPhase((ph) => (ph === now ? ph : now));
      const fin = t > 0.96;
      setDone((dd) => (dd === fin ? dd : fin));
      // the answer arrives with the morning
      const lit = t > 0.8;
      setLight((l) => (l === lit ? l : lit));
    },
    [glyphs, reduced],
  );

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', paint);
  useEffect(() => paint(scrollYProgress.get()), [paint, scrollYProgress]);

  return (
    <section
      ref={ref}
      id="question"
      data-theme={light ? 'light' : 'dark'}
      className="relative"
      style={{ height: '320svh' }}
      aria-label="The only thing that really changed"
    >
      <h2 className="sr-only">
        In October 2024 the question was: what can I build? Now it is: what is worth building?
      </h2>
      <div className="sticky top-0 flex h-svh flex-col justify-between overflow-hidden px-[var(--gutter)] pb-[calc(var(--gutter)+40px)] pt-[88px]">
        <div className="hv-wrap">
          <div className="hv-label hv-kicker">
            <b>06</b>
            <i />
            <span>The only thing that really changed</span>
          </div>
        </div>

        <div className="hv-wrap">
          <div className="relative mb-[4vh] h-6 text-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={phase}
                className="hv-label"
                style={{ color: phase === 'now' ? 'var(--pulse)' : 'var(--mute)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
              >
                {phase === 'then' ? 'October 2024 · the question was' : 'September 2026 · the question is'}
              </motion.div>
            </AnimatePresence>
          </div>

          <div ref={boxRef} className="hv-q-type relative mx-auto" style={{ height: height || undefined }} aria-hidden>
            <Measure lines={A_LINES} innerRef={aRef} />
            <Measure lines={B_LINES} innerRef={bRef} />
            {glyphs.map((g, k) => (
              <span
                key={`${g.kind}-${k}-${g.ch}`}
                ref={(el) => {
                  glyphEls.current[k] = el;
                }}
                className="absolute left-0 top-0 will-change-transform transition-[color] duration-1000"
                style={{
                  transform: g.from ? `translate3d(${g.from.x}px, ${g.from.y}px, 0)` : g.to ? `translate3d(${g.to.x}px, ${g.to.y}px, 0)` : undefined,
                  opacity: g.kind === 'in' ? 0 : 1,
                }}
              >
                {g.ch}
              </span>
            ))}
          </div>
        </div>

        <div className="hv-wrap min-h-[92px]">
          <motion.p
            className="mx-auto max-w-[52ch] text-center text-[16px] leading-[1.55] text-[var(--ink-2)] sm:text-[18px]"
            initial={false}
            animate={{ opacity: done ? 1 : 0, y: done ? 0 : 16 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Almost everything on this page, BringBack, the competitor, the Google slump, {COUNTS.dead} flatlines, has been teaching me how to
            answer it. Knowing how to build was never the hard part.
          </motion.p>
        </div>
      </div>
      <style>{`.hv-q-type{font-family:var(--f-display);font-weight:680;font-size:clamp(44px,11.5vw,172px);line-height:.92;letter-spacing:-.05em;white-space:nowrap}`}</style>
    </section>
  );
}
