'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MONTHS_TOTAL, PRODUCTS, monthLabel, type Product } from '../data';
import { useHv } from './context';
import Stamp from './Stamp';
import { clamp, hashString, mulberry32 } from '../lib/math';
import * as sfx from '../lib/sfx';

const ORDER = [...PRODUCTS].sort((a, b) => a.born - b.born);
const ease = [0.16, 1, 0.3, 1] as const;

function lifePath(p: Product, W: number, H: number) {
  const r = mulberry32(hashString(p.id + 'chart'));
  const mid = H * 0.55;
  const x0 = (p.born / MONTHS_TOTAL) * W;
  const x1 = ((p.died ?? MONTHS_TOTAL) / MONTHS_TOTAL) * W;
  const money = p.status === 'paying';
  let d = `M0 ${mid} L${x0.toFixed(1)} ${mid}`;
  let x = x0 + 4;
  while (x < x1 - 14) {
    const fade = p.died === null ? 1 : clamp((x1 - x) / ((x1 - x0) * 0.3));
    const a = H * (money ? 0.42 : 0.24 + r() * 0.14) * (0.25 + 0.75 * fade);
    d += ` L${(x + 4).toFixed(1)} ${mid} L${(x + 6).toFixed(1)} ${mid + 3} L${(x + 8.5).toFixed(1)} ${(mid - a).toFixed(1)} L${(x + 11).toFixed(1)} ${(
      mid +
      a * 0.3
    ).toFixed(1)} L${(x + 13).toFixed(1)} ${mid}`;
    x += 13 + r() * 7;
  }
  d += ` L${W} ${mid}`;
  return { d, x1, mid };
}

function Lifeline({ p }: { p: Product }) {
  const W = 520;
  const H = 90;
  const { d, x1, mid } = useMemo(() => lifePath(p, W, H), [p]);
  const alive = p.died === null;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-hidden>
        <line x1="0" x2={W} y1={mid} y2={mid} stroke="rgba(237,240,238,0.1)" />
        {[0, 12, 24].map((m) => (
          <line key={m} x1={(m / MONTHS_TOTAL) * W} x2={(m / MONTHS_TOTAL) * W} y1="0" y2={H} stroke="rgba(237,240,238,0.08)" />
        ))}
        <motion.path
          d={d}
          fill="none"
          stroke={alive ? 'var(--pulse)' : 'var(--ink-2)'}
          strokeWidth="1.4"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: [0.45, 0, 0.2, 1], delay: 0.5 }}
          style={{ filter: alive ? 'drop-shadow(0 0 5px var(--pulse-glow))' : undefined }}
        />
        {!alive && (
          <motion.text
            x={x1}
            y={mid + 5}
            textAnchor="middle"
            fontSize="14"
            fill="var(--alarm)"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.1, duration: 0.4 }}
          >
            ✕
          </motion.text>
        )}
      </svg>
      <div className="hv-label mt-2 flex justify-between text-[9px] text-[var(--mute)]">
        <span>{monthLabel(0)}</span>
        <span>{monthLabel(12)}</span>
        <span>{monthLabel(24)}</span>
      </div>
    </div>
  );
}

function Body({ p, n }: { p: Product; n: number }) {
  const [slam, setSlam] = useState(false);
  const alive = p.died === null;
  const domain = p.url?.replace(/^https?:\/\/(www\.)?/, '');

  useEffect(() => {
    const id = window.setTimeout(() => setSlam(true), 650);
    return () => clearTimeout(id);
  }, []);

  const reveal = (d = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay: 0.35 + d },
  });

  return (
    <div className="hv-chart-grid hv-wrap px-[var(--gutter)] pb-[14vh] pt-[108px]">
      {/* side: the patient */}
      <div className="hv-chart-side">
        <motion.div {...reveal(0)} className="hv-label flex items-center gap-2.5" style={{ color: alive ? 'var(--pulse)' : 'var(--alarm)' }}>
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: 'currentColor', boxShadow: alive ? '0 0 10px var(--pulse-glow)' : 'none' }}
          />
          {alive ? `Alive · since ${monthLabel(p.born)}` : `Flatlined · ${monthLabel(p.died!)}`}
        </motion.div>
        <div className="relative mt-5">
          <motion.h2 {...reveal(0.05)} className="hv-display pr-10 text-[clamp(44px,6.2vw,104px)] font-[680] leading-[0.88] tracking-[-0.055em]">
            {p.name}
          </motion.h2>
          <Stamp text={p.verdict} tone={alive ? 'alive' : 'dead'} slam={slam} rotate={-9} size="lg" className="absolute -right-1 -top-12 sm:-right-2" />
        </div>
        <motion.p {...reveal(0.1)} className="mt-6 max-w-[40ch] text-[18px] leading-[1.45] text-[var(--ink-2)]">
          {p.what}
        </motion.p>

        <motion.div {...reveal(0.15)} className="mt-10">
          <h3>Its heartbeat</h3>
          <div className="mt-4">
            <Lifeline p={p} />
          </div>
        </motion.div>

        {p.facts && (
          <motion.dl {...reveal(0.2)} className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {p.facts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-6 py-3">
                <dt className="hv-label text-[var(--mute)]">{f.k}</dt>
                <dd className="text-right text-[15px] font-[520] tracking-[-0.01em]">{f.v}</dd>
              </div>
            ))}
          </motion.dl>
        )}

        {p.url && alive && (
          <motion.a
            {...reveal(0.25)}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="visit"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--pulse)] px-6 py-3.5 text-[14px] font-[640] tracking-[-0.01em] text-white shadow-[0_14px_30px_-12px_var(--pulse-glow)] transition-transform duration-500 hover:scale-[1.03]"
          >
            Visit {domain} <span aria-hidden>↗</span>
          </motion.a>
        )}
        <motion.div {...reveal(0.25)} className="hv-label mt-8 text-[var(--mute)]">
          Film {String(n).padStart(2, '0')} of {ORDER.length}
        </motion.div>
      </div>

      {/* main: the notes */}
      <div className="min-w-0">
        {p.image && (
          <motion.div {...reveal(0.05)} className="mb-14 overflow-hidden rounded-[10px] bg-white shadow-[0_30px_70px_-35px_rgba(11,13,12,0.45),0_0_0_1px_rgba(11,13,12,0.08)]">
            <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-[var(--faint)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--faint)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--faint)]" />
              <span className="hv-label ml-3 text-[var(--mute)]">{domain}</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={`${p.name} homepage`} className="block w-full" />
          </motion.div>
        )}

        <motion.section {...reveal(0.1)}>
          <h3>The landing page said</h3>
          <p className="relative mt-4 inline text-[clamp(26px,3vw,44px)] font-[560] leading-[1.08] tracking-[-0.035em] text-[var(--mute)]">
            “{p.hype}”
            <motion.span
              className="absolute left-0 top-[55%] h-[3px] origin-left bg-[var(--alarm)]"
              style={{ width: '100%' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 1.2 }}
            />
          </p>
        </motion.section>

        <motion.section {...reveal(0.2)} className="mt-14">
          <h3>What actually happened</h3>
          <p className="mt-4 text-[clamp(24px,2.6vw,38px)] font-[520] leading-[1.18] tracking-[-0.03em]">{p.truth}</p>
        </motion.section>

        <motion.section {...reveal(0.3)} className="mt-14">
          <h3>Procedures · what I built</h3>
          <ol className="mt-5 border-t border-[var(--line)]">
            {p.did.map((d, i) => (
              <li key={i} className="flex gap-5 border-b border-[var(--line)] py-4 text-[16.5px] leading-[1.5] text-[var(--ink)]">
                <span className="hv-dot pt-[3px] text-[13px] text-[var(--pulse)]">{String(i + 1).padStart(2, '0')}</span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </motion.section>

        {!alive && p.cause && (
          <motion.section {...reveal(0.35)} className="mt-14">
            <h3 className="!text-[var(--alarm)]">Cause of death</h3>
            <p className="mt-4 text-[clamp(22px,2.2vw,32px)] font-[560] tracking-[-0.03em] text-[var(--alarm)]">{p.cause}.</p>
          </motion.section>
        )}

        <motion.section {...reveal(0.4)} className="mt-14 border-t border-[var(--line-2)] pt-8">
          <h3>Takeaway</h3>
          <p
            className="mt-4 text-[clamp(30px,3.6vw,56px)] font-[640] leading-[1] tracking-[-0.045em]"
            style={{ color: alive ? 'var(--pulse)' : 'var(--ink)', textShadow: alive ? '0 0 30px rgba(61,255,154,0.25)' : 'none' }}
          >
            {p.lesson}
          </p>
        </motion.section>
      </div>
    </div>
  );
}

export default function Chart() {
  const { chart, closeChart, openChart, lockScroll } = useHv();
  const scrollRef = useRef<HTMLDivElement>(null);
  const open = !!chart;
  const idx = chart ? ORDER.findIndex((p) => p.id === chart.id) : -1;
  const p = idx >= 0 ? ORDER[idx] : null;
  const origin = useRef({ x: 0, y: 0 });
  if (chart) origin.current = { x: chart.x, y: chart.y };

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    sfx.slide(1);
    return () => lockScroll(false);
  }, [open, lockScroll]);

  const go = (d: number) => {
    const next = ORDER[(idx + d + ORDER.length) % ORDER.length];
    openChart(next.id, origin.current);
    scrollRef.current?.scrollTo({ top: 0 });
    sfx.slide(0.7);
  };

  useEffect(() => {
    if (!open) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChart();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idx]);

  const { x, y } = origin.current;

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="chart"
          ref={scrollRef}
          className="hv-chart hv-light"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={`${p.name}, the full chart`}
          initial={{ clipPath: `circle(0px at ${x}px ${y}px)` }}
          animate={{ clipPath: `circle(160% at ${x}px ${y}px)` }}
          exit={{ clipPath: `circle(0px at ${x}px ${y}px)` }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* top bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between bg-[linear-gradient(#eceeed,rgba(236,238,237,0.88)_70%,transparent)] px-[var(--gutter)] pb-6 pt-[18px]">
            <div className="hv-label text-[var(--mute)]">
              Chart · <span className="text-[var(--ink)]">{p.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => go(-1)} className="hv-label rounded-full px-3 py-2 transition-colors hover:bg-[var(--bg-3)]" aria-label="Previous product">
                ← Prev
              </button>
              <button type="button" onClick={() => go(1)} className="hv-label rounded-full px-3 py-2 transition-colors hover:bg-[var(--bg-3)]" aria-label="Next product">
                Next →
              </button>
              <button
                type="button"
                onClick={closeChart}
                data-cursor="close"
                className="hv-label ml-2 rounded-full border border-[var(--line-2)] px-4 py-2 transition-colors hover:border-[var(--ink)]"
                aria-label="Close the chart"
              >
                Close ✕
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <Body p={p} n={idx + 1} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
