'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { MILESTONES, MONTHS_TOTAL, PRODUCTS, monthLabel, type Product } from '../data';
import { clamp, hashString, mulberry32 } from '../lib/math';
import { useRange } from '../lib/scroll';
import { useHv } from '../ui/context';
import * as sfx from '../lib/sfx';

const ROWS = [...PRODUCTS].sort((a, b) => a.born - b.born);

interface Dims {
  W: number;
  H: number;
}

/** A heartbeat trace between two x positions. `dying` weakens the last stretch before the end. */
function ecgPath(p: Product, x0: number, x1: number, dying: boolean, H: number) {
  const rand = mulberry32(hashString(p.id));
  const mid = H / 2;
  const isMoney = p.status === 'paying';
  const baseAmp = (isMoney ? 0.46 : 0.26 + rand() * 0.12) * H;
  let x = x0;
  let d = `M ${x0.toFixed(1)} ${mid}`;
  while (x < x1 - 0.5) {
    const pitch = (isMoney ? 15 : 17) + rand() * 9;
    const remaining = (x1 - x) / Math.max(1, x1 - x0);
    const fade = dying ? clamp(remaining / 0.24) : 1;
    const amp = baseAmp * (0.25 + 0.75 * fade);
    const at = (f: number) => Math.min(x1, x + pitch * f).toFixed(1);
    const k = H / 40;
    d +=
      ` L ${at(0.3)} ${mid}` +
      ` L ${at(0.37)} ${mid - 2.4 * k * fade} L ${at(0.44)} ${mid}` +
      ` L ${at(0.56)} ${mid}` +
      ` L ${at(0.61)} ${mid + 4 * k * fade} L ${at(0.68)} ${mid - amp} L ${at(0.75)} ${mid + 6 * k * fade} L ${at(0.81)} ${mid}` +
      ` L ${at(0.9)} ${mid - 3 * k * fade} L ${at(1)} ${mid}`;
    x += pitch;
  }
  return d;
}

function Row({
  p,
  idx,
  month,
  reduced,
  dims,
  hover,
  setHover,
}: {
  p: Product;
  idx: number;
  month: MotionValue<number>;
  reduced: boolean;
  dims: Dims;
  hover: string | null;
  setHover: (id: string | null) => void;
}) {
  const { openChart } = useHv();
  const { W, H } = dims;
  const end = p.died ?? MONTHS_TOTAL;
  const x0 = (p.born / MONTHS_TOTAL) * W;
  const x1 = (end / MONTHS_TOTAL) * W;
  const isMoney = p.status === 'paying';
  const alive = p.died === null;
  const unlaunched = p.status === 'unlaunched';
  const path = useMemo(() => ecgPath(p, x0, x1, !alive, H), [p, x0, x1, alive, H]);

  const f = useTransform(month, (m) => (reduced ? 1 : clamp((m - p.born) / Math.max(0.01, end - p.born))));
  const born = useTransform(month, (m) => (reduced || m >= p.born - 0.15 ? 1 : 0.2));
  const crossOpacity = useTransform(f, (v) => clamp((v - 0.965) / 0.035));
  const crossScale = useTransform(f, (v) => 0.3 + 0.7 * clamp((v - 0.965) / 0.035));
  const headX = useTransform(f, (v) => x0 + v * (x1 - x0));
  const headOpacity = useTransform(f, (v) => (v <= 0 ? 0 : alive ? 1 : 1 - clamp((v - 0.94) / 0.06)));

  // a small funeral: the flatline tone the moment a line finishes
  const done = useRef(false);
  useMotionValueEvent(f, 'change', (v) => {
    if (!alive && v >= 1 && !done.current) {
      done.current = true;
      sfx.flatline(0.45, 0.6);
    } else if (v < 0.9) {
      done.current = false;
    }
  });

  const cross = x1 / W;
  const labelLeft = cross > 0.9;
  const color = isMoney ? 'var(--pulse)' : alive ? 'var(--ink)' : '#59615d';
  const on = hover === p.id;

  return (
    <button
      type="button"
      className="group relative flex w-full items-center text-left"
      style={{ height: H }}
      data-cursor="peek"
      aria-label={`${p.name}: ${p.verdict}. Open its chart.`}
      onMouseEnter={() => setHover(p.id)}
      onMouseLeave={() => setHover(null)}
      onFocus={() => setHover(p.id)}
      onBlur={() => setHover(null)}
      onClick={() => openChart(p.id)}
    >
      <motion.div style={{ opacity: born }} className="flex w-[var(--label-w)] shrink-0 items-baseline gap-2.5 pr-3">
        <span className="hv-label hidden w-5 text-[9.5px] text-[var(--mute)] sm:inline">{String(idx + 1).padStart(2, '0')}</span>
        <span
          className={`truncate text-[12.5px] leading-none tracking-[-0.01em] transition-colors sm:text-[15px] ${
            isMoney ? 'font-semibold text-[var(--pulse)]' : alive ? 'text-[var(--ink)]' : 'text-[var(--ink-2)] group-hover:text-[var(--ink)]'
          }`}
        >
          {p.name}
        </span>
      </motion.div>

      <div className="relative h-full flex-1">
        <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--line)]" />
        {/* hover: a soft band behind this one line; everything else stays readable */}
        <div
          className="pointer-events-none absolute -inset-x-2 inset-y-[2px] rounded-[4px] bg-[rgba(237,240,238,0.05)] transition-opacity duration-300"
          style={{ opacity: on ? 1 : 0 }}
        />
        <span
          className="hv-label pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] text-[var(--ink)] transition-opacity duration-300"
          style={{ opacity: on ? 1 : 0 }}
        >
          Open chart →
        </span>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute left-0 top-0 overflow-visible" aria-hidden>
          <motion.path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={isMoney ? 2 : 1.2}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray={unlaunched ? '2 3' : undefined}
            style={{ pathLength: f, filter: isMoney ? 'drop-shadow(0 0 6px rgba(61,255,154,0.6))' : alive ? 'drop-shadow(0 0 4px rgba(237,240,238,0.35))' : undefined }}
          />
        </svg>

        <motion.span style={{ x: headX, opacity: headOpacity }} className="pointer-events-none absolute left-0 top-1/2 -ml-[5px] -mt-[5px] h-[10px] w-[10px]">
          {alive && <span className="absolute inset-0 animate-ping rounded-full opacity-60" style={{ background: color }} />}
          <span className="absolute inset-[2px] rounded-full" style={{ background: color, boxShadow: `0 0 10px ${isMoney ? 'var(--pulse-glow)' : 'rgba(237,240,238,0.4)'}` }} />
        </motion.span>

        {!alive && (
          <>
            <motion.span
              style={{ left: `${cross * 100}%`, opacity: crossOpacity, scale: crossScale }}
              className="pointer-events-none absolute top-1/2 -ml-[5px] -mt-[7px] text-[12px] leading-none text-[var(--alarm)]"
            >
              ✕
            </motion.span>
            <motion.span
              style={{
                opacity: crossOpacity,
                ...(labelLeft ? { right: `calc(${(1 - cross) * 100}% + 12px)` } : { left: `calc(${cross * 100}% + 12px)` }),
              }}
              className="hv-label pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[9px] text-[var(--mute)] sm:block"
            >
              {p.cause ?? p.verdict}
            </motion.span>
          </>
        )}
      </div>
    </button>
  );
}

export default function Lifelines() {
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const month = useRange(scrollYProgress, [0.05, 0.9], [0, MONTHS_TOTAL]);
  const [hover, setHover] = useState<string | null>(null);

  const [dims, setDims] = useState<Dims>({ W: 880, H: 30 });
  useEffect(() => {
    const measure = () => {
      const W = Math.round(trackRef.current?.clientWidth ?? 880);
      const H = Math.round(clamp((window.innerHeight - 440) / 15, 20, 38));
      setDims((d) => (d.W === W && d.H === H ? d : { W, H }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const [snap, setSnap] = useState({ m: 0, alive: 0, dead: 0 });
  useMotionValueEvent(month, 'change', (m) => {
    const mm = reduced ? MONTHS_TOTAL : m;
    const alive = PRODUCTS.filter((p) => p.born <= mm && (p.died === null || p.died > mm)).length;
    const dead = PRODUCTS.filter((p) => p.died !== null && p.died <= mm).length;
    setSnap((s) => (s.alive === alive && s.dead === dead && Math.round(s.m) === Math.round(mm) ? s : { m: mm, alive, dead }));
  });

  const playLeft = useTransform(month, (m) => `${(m / MONTHS_TOTAL) * 100}%`);
  const playOpacity = useTransform(month, (m) => (m <= 0.05 ? 0.35 : 1));
  const milestone = [...MILESTONES].reverse().find((ms) => ms.m <= snap.m + 0.01);
  const ticks = [0, 3, 6, 9, 12, 15, 18, 21, 24];

  return (
    <section
      id="journey"
      ref={ref}
      data-theme="dark"
      className="relative"
      style={{ height: reduced ? 'auto' : '430svh' }}
      aria-label={`The journey: ${PRODUCTS.length} products over 24 months`}
    >
      <div
        className={`${reduced ? '' : 'sticky top-0 h-svh'} flex flex-col overflow-hidden px-[var(--gutter)] pb-[52px] pt-[86px]`}
        style={{ '--label-w': 'clamp(106px, 16vw, 220px)' } as React.CSSProperties}
      >
        <div className="hv-wrap flex items-end justify-between gap-6">
          <div>
            <div className="hv-label hv-kicker">
              <b>02</b>
              <i />
              <span>The chart</span>
            </div>
            <h2 className="hv-head-title mt-5">
              <span>Twenty-four months,</span>
              <span>on a heart monitor.</span>
            </h2>
          </div>
          <dl className="hv-label hidden shrink-0 grid-cols-3 gap-9 text-right sm:grid">
            <div>
              <dt className="text-[var(--mute)]">Month</dt>
              <dd className="hv-dot mt-1.5 text-[22px] tracking-normal">
                {String(Math.min(MONTHS_TOTAL, Math.round(snap.m))).padStart(2, '0')}
                <span className="text-[var(--mute)]">/{MONTHS_TOTAL}</span>
              </dd>
            </div>
            <div>
              <dt className="text-[var(--mute)]">Alive</dt>
              <dd className="hv-dot hv-pulse-text mt-1.5 text-[22px] tracking-normal">{String(snap.alive).padStart(2, '0')}</dd>
            </div>
            <div>
              <dt className="text-[var(--mute)]">Flatlined</dt>
              <dd className="hv-dot mt-1.5 text-[22px] tracking-normal text-[var(--alarm)]">{String(snap.dead).padStart(2, '0')}</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto mt-6 w-full max-w-[1360px] flex-1">
          <div className="relative flex h-7 items-end">
            <div className="w-[var(--label-w)] shrink-0" />
            <div ref={trackRef} className="relative h-full flex-1">
              {ticks.map((t) => (
                <div
                  key={t}
                  className="hv-label absolute bottom-1 -translate-x-1/2 whitespace-nowrap text-[9px] text-[var(--mute)]"
                  style={{ left: `${(t / MONTHS_TOTAL) * 100}%` }}
                >
                  {dims.W < 520 ? (t % 12 === 0 ? `’${String(24 + t / 12)}` : '') : t % 12 === 0 || t === 6 || t === 18 ? monthLabel(t) : ''}
                </div>
              ))}
            </div>
          </div>

          <div className="relative border-t border-[var(--line-2)]">
            <div className="pointer-events-none absolute bottom-0 left-[var(--label-w)] right-0 top-0">
              {ticks.map((t) => (
                <div key={t} className="absolute bottom-0 top-0 w-px bg-[var(--line)]" style={{ left: `${(t / MONTHS_TOTAL) * 100}%` }} />
              ))}
            </div>

            {!reduced && (
              <div className="pointer-events-none absolute bottom-0 left-[var(--label-w)] right-0 top-0 z-10">
                <motion.div
                  style={{ left: playLeft, opacity: playOpacity }}
                  className="absolute bottom-0 top-[-8px] w-px bg-[var(--pulse)] shadow-[0_0_12px_var(--pulse-glow)]"
                >
                  <span
                    className="hv-label absolute -top-[2px] left-1/2 whitespace-nowrap bg-[var(--pulse)] px-1.5 py-[2px] text-[9px] text-[#04140b]"
                    style={{ transform: `translate(${snap.m > 19 ? '-100%' : snap.m < 3 ? '0%' : '-50%'}, -100%)` }}
                  >
                    {monthLabel(snap.m)}
                  </span>
                </motion.div>
              </div>
            )}

            <div className="relative">
              {ROWS.map((p, i) => (
                <Row key={p.id} p={p} idx={i} month={month} reduced={reduced} dims={dims} hover={hover} setHover={setHover} />
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-4 flex w-full max-w-[1360px] flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div className="min-h-[48px]">
            {milestone && (
              <motion.div key={milestone.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <div className="hv-label text-[var(--pulse)]">
                  {milestone.approx ? '~ ' : ''}
                  {monthLabel(milestone.m)}
                </div>
                <div className="mt-1 text-[17px] font-[560] leading-tight tracking-[-0.02em] sm:text-[21px]">
                  {milestone.label} <span className="font-normal text-[var(--ink-2)]">· {milestone.sub}</span>
                </div>
              </motion.div>
            )}
          </div>
          <p className="hv-label max-w-[36ch] text-[9px] leading-relaxed text-[var(--mute)] sm:text-right">
            Dates are from memory, not git log. Directionally right, precisely wrong. Click any line to open its chart.
          </p>
        </div>
      </div>
    </section>
  );
}
