'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { PRODUCTS, monthLabel, type Product } from '../data';
import SectionHead from '../ui/SectionHead';
import * as sfx from '../lib/sfx';

const ORDER = [...PRODUCTS].sort((a, b) => a.born - b.born);
const N = ORDER.length;

function situation(p: Product) {
  if (p.died === null) {
    if (p.status === 'paying') return 'Alive · the one that pays';
    if (p.status === 'pivoting') return 'Alive · still pivoting';
    return 'Alive · still building';
  }
  if (p.status === 'unlaunched') return 'Never launched';
  return `Flatlined ${monthLabel(p.died)}`;
}

/** dwell on each name, then roll quickly to the next, like a reel clicking into place */
function detent(raw: number) {
  const i = Math.floor(raw);
  const f = raw - i;
  const D = 0.3;
  const t = f < D ? 0 : f > 1 - D ? 1 : (f - D) / (1 - 2 * D);
  return i + t * t * (3 - 2 * t);
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function Work() {
  const reduced = !!useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lineEls = useRef<(HTMLDivElement | null)[]>([]);
  const nameEls = useRef<(HTMLSpanElement | null)[]>([]);
  const metaEls = useRef<(HTMLDivElement | null)[]>([]);
  const geo = useRef({ R: 380, step: 0.36, fits: [] as number[] });
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const last = useRef(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  /* ------------------------------------------------------------- geometry */
  const measure = useCallback(() => {
    const stage = stageRef.current;
    const first = nameEls.current[0];
    if (!stage || !first) return;
    const H = stage.clientHeight;
    const W = stage.clientWidth;
    const F = parseFloat(getComputedStyle(first).fontSize) || 80;
    const R = H * 0.41;
    // room for one name plus the details that unfold under the front one (measured: they wrap on phones)
    const metaH = Math.max(0, ...metaEls.current.map((el) => (el ? el.offsetHeight : 0)));
    const gap = F * 1.08 + metaH + 22;
    const step = Math.asin(Math.min(0.92, gap / R));
    const maxW = W * 0.92;
    const fits = nameEls.current.map((el) => (el ? Math.min(1, maxW / Math.max(1, el.scrollWidth)) : 1));
    geo.current = { R, step, fits };
  }, []);

  /* ---------------------------------------------------------------- paint */
  const paint = useCallback(
    (p: number) => {
      const { R, step, fits } = geo.current;
      const raw = clamp01(p) * (N - 1);
      const pos = reduced ? Math.round(raw) : detent(raw);
      for (let i = 0; i < N; i++) {
        const line = lineEls.current[i];
        const name = nameEls.current[i];
        const meta = metaEls.current[i];
        if (!line || !name) continue;
        const a = (pos - i) * step; // + rolls up and away, - waits below
        const off = Math.abs(a);
        if (off > Math.PI / 2 - 0.04) {
          line.style.visibility = 'hidden';
          continue;
        }
        line.style.visibility = 'visible';
        const depth = Math.cos(a);
        const f = clamp01(1 - Math.abs(pos - i)); // 1 = at the front
        line.style.transform = `translateZ(${-R}px) rotateX(${a.toFixed(4)}rad) translateZ(${R}px)`;
        line.style.opacity = Math.pow(clamp01((depth - 0.08) / 0.92), 1.15).toFixed(3);
        // the front reads like a lens: heavier and wider; everything rolling away thins to a hairline outline
        const fill = f * f;
        name.style.color = `color-mix(in srgb, var(--ink) ${(fill * 100).toFixed(1)}%, transparent)`;
        name.style.setProperty('-webkit-text-stroke', `1px color-mix(in srgb, var(--ink) ${(36 + 30 * depth - 40 * fill).toFixed(1)}%, transparent)`);
        name.style.fontWeight = String(Math.round(300 + 400 * f));
        name.style.fontStretch = `${(84 + 16 * f).toFixed(1)}%`;
        name.style.transform = `scale(${fits[i] ?? 1})`;
        if (meta) {
          const m = clamp01((f - 0.55) / 0.45);
          meta.style.opacity = m.toFixed(3);
          meta.style.transform = `translate3d(-50%, ${(10 * (1 - m)).toFixed(2)}px, 0)`;
        }
      }
      const idx = Math.round(pos);
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
        const now = performance.now();
        if (now - last.current > 60) sfx.tick(0.7);
        last.current = now;
      }
      // keep the bottom progress strip out of this scene while the drum holds the screen
      const root = sectionRef.current?.closest('.hv') as HTMLElement | null;
      const st = stageRef.current?.getBoundingClientRect();
      if (root && st) root.dataset.quiet = st.top < 2 && st.bottom > window.innerHeight - 2 ? 'on' : 'off';
    },
    [reduced],
  );

  useMotionValueEvent(scrollYProgress, 'change', paint);

  useLayoutEffect(() => {
    const run = () => {
      measure();
      paint(scrollYProgress.get());
    };
    run();
    const ro = new ResizeObserver(run);
    if (stageRef.current) ro.observe(stageRef.current);
    document.fonts?.ready.then(run);
    return () => ro.disconnect();
  }, [measure, paint, scrollYProgress]);

  useEffect(
    () => () => {
      const root = sectionRef.current?.closest('.hv') as HTMLElement | null;
      if (root) root.dataset.quiet = 'off';
    },
    [],
  );

  const cur = ORDER[active];

  return (
    <>
      <section id="work" data-theme="light" className="relative pt-[16vh]" aria-label="Everything I shipped">
        <div className="hv-section">
          <SectionHead
            n="03"
            kicker="The work"
            meta={`${N} products · 24 months`}
            title={['Fifteen products,', 'one at a time.']}
            note="Everything I have shipped since October 2024, in the order it was born, and where each one stands today."
          />
        </div>

        <div ref={sectionRef} className="relative mt-[8vh]" style={{ height: `${N * 52 + 40}svh` }}>
          <div ref={stageRef} className="hv-drum-stage sticky top-0 h-svh overflow-hidden">
            {/* the selection window */}
            <div className="hv-drum-window pointer-events-none absolute inset-x-[var(--gutter)] top-1/2" aria-hidden>
              <span className="hv-label absolute left-0 top-1/2 hidden -translate-y-1/2 text-[var(--mute)] sm:block">
                {String(active + 1).padStart(2, '0')} / {N}
              </span>
              <span className="hv-label absolute right-0 top-1/2 hidden -translate-y-1/2 text-right text-[var(--mute)] sm:block">
                {monthLabel(cur.born)} — {cur.died === null ? 'now' : monthLabel(cur.died)}
              </span>
            </div>

            {/* the drum */}
            <div className="hv-drum absolute inset-0" aria-hidden>
              {ORDER.map((p, i) => {
                const alive = p.died === null;
                return (
                  <div
                    key={p.id}
                    ref={(el) => {
                      lineEls.current[i] = el;
                    }}
                    className="hv-drum-line"
                  >
                    <span
                      ref={(el) => {
                        nameEls.current[i] = el;
                      }}
                      className="hv-drum-name"
                    >
                      {p.name}
                    </span>
                    <div
                      ref={(el) => {
                        metaEls.current[i] = el;
                      }}
                      className="hv-drum-meta"
                    >
                      <p className="text-[clamp(14px,1.3vw,17px)] leading-[1.45] text-[var(--ink-2)]">{p.what}</p>
                      <p className="hv-label mt-2.5 [text-wrap:balance]" style={{ color: alive ? 'var(--pulse)' : 'var(--alarm)' }}>
                        <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-current align-middle" />
                        {situation(p)}
                        {!alive && p.cause && <span className="text-[var(--mute)]"> · {p.cause}</span>}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* for screen readers and search engines: the same list, as a list */}
      <ol className="sr-only">
        {ORDER.map((p) => (
          <li key={p.id}>
            {p.name}: {p.what} {situation(p)}.
          </li>
        ))}
      </ol>
    </>
  );
}
