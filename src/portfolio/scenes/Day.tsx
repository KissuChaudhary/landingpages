'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { DAY, daysBuilding } from '../data';
import { clamp, lerp } from '../lib/math';
import * as sfx from '../lib/sfx';

/* scroll progress -> hour of day (piecewise: the workday flies by, the night gets room) */
const TIME_KEYS: [number, number][] = [
  [0, 5.5],
  [0.1, 6],
  [0.2, 9],
  [0.36, 17],
  [0.52, 21],
  [0.6, 21.5],
  [0.9, 25.5],
  [1, 26],
];

/* hour -> sky */
const SKY: [number, string][] = [
  [5.5, '#050606'],
  [6.0, '#141d26'],
  [6.9, '#b7c3cc'],
  [8.4, '#eceeed'],
  [16.6, '#eceeed'],
  [18.0, '#a9aec0'],
  [19.1, '#2a2f4d'],
  [20.4, '#10142a'],
  [21.3, '#050606'],
  [26.0, '#050606'],
];

function piece(keys: [number, number][], p: number) {
  for (let i = 0; i < keys.length - 1; i++) {
    const [a, va] = keys[i];
    const [b, vb] = keys[i + 1];
    if (p <= b) return lerp(va, vb, clamp((p - a) / (b - a)));
  }
  return keys[keys.length - 1][1];
}

const hex = (h: string) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
function sky(hour: number): [number, number, number] {
  for (let i = 0; i < SKY.length - 1; i++) {
    const [a, ca] = SKY[i];
    const [b, cb] = SKY[i + 1];
    if (hour <= b) {
      const t = clamp((hour - a) / (b - a));
      const A = hex(ca);
      const B = hex(cb);
      return [lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)];
    }
  }
  return hex(SKY[SKY.length - 1][1]) as [number, number, number];
}
const lum = ([r, g, b]: number[]) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(lerp(v, b[i], t)));
const rgb = (c: number[]) => `rgb(${c[0]},${c[1]},${c[2]})`;

const INK_DARK = [11, 13, 12];
const INK_LIGHT = [237, 240, 238];

function clock(hour: number): [string, string] {
  const h = Math.floor(hour) % 24;
  const m = Math.floor((hour % 1) * 60);
  return [String(h).padStart(2, '0'), String(m).padStart(2, '0')];
}

/* the ruler spans 05:30 -> 02:00 */
const R0 = 5.5;
const R1 = 26;
const rx = (h: number) => ((h - R0) / (R1 - R0)) * 100;

export default function Day() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const hhRef = useRef<HTMLSpanElement>(null);
  const mmRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const [mine, setMine] = useState(false);
  const [days, setDays] = useState(729);
  const alarmed = useRef(false);

  useEffect(() => setDays(daysBuilding()), []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const apply = (p: number) => {
    const stage = stageRef.current;
    const section = ref.current;
    if (!stage || !section) return;
    const hour = piece(TIME_KEYS, p);
    const bg = sky(hour);
    const L = lum(bg);
    const t = clamp((L - 0.34) / 0.22);
    const ink = mix(INK_LIGHT, INK_DARK, t);
    const ink2 = mix([170, 177, 173], [70, 76, 73], t);
    stage.style.backgroundColor = rgb(bg);
    stage.style.setProperty('--d-ink', rgb(ink));
    stage.style.setProperty('--d-ink2', rgb(ink2));
    stage.style.setProperty('--d-line', `rgba(${ink.join(',')},0.16)`);
    const theme = L > 0.45 ? 'light' : 'dark';
    if (section.dataset.theme !== theme) section.dataset.theme = theme;

    const isMine = hour >= 21.25;
    const [hh, mm] = clock(hour);
    if (hhRef.current && hhRef.current.textContent !== hh) hhRef.current.textContent = hh;
    if (mmRef.current && mmRef.current.textContent !== mm) mmRef.current.textContent = mm;
    if (headRef.current) headRef.current.style.left = `${rx(hour)}%`;

    let i = DAY.findIndex((d) => hour >= d.from && hour < d.to);
    if (i < 0) i = hour < DAY[0].from ? 0 : DAY.length - 1;
    setBeat((b) => (b === i ? b : i));
    setMine((m) => (m === isMine ? m : isMine));

    // 06:00: the alarm goes off, once per pass
    if (hour >= 6 && hour < 6.4 && !alarmed.current) {
      alarmed.current = true;
      clockRef.current?.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-10px) rotate(-1deg)' },
          { transform: 'translateX(9px) rotate(1deg)' },
          { transform: 'translateX(-7px)' },
          { transform: 'translateX(5px)' },
          { transform: 'translateX(0)' },
        ],
        { duration: 520, iterations: 2 },
      );
      sfx.beep(0.6);
      window.setTimeout(() => sfx.beep(0.6), 180);
    }
    if (hour < 5.9 || hour > 7) alarmed.current = false;
  };

  useMotionValueEvent(scrollYProgress, 'change', apply);
  useEffect(() => {
    apply(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const d = DAY[beat];

  return (
    <section ref={ref} id="day" data-theme="dark" className="relative" style={{ height: '560svh' }} aria-label="A normal weekday">
      <div
        ref={stageRef}
        className="sticky top-0 flex h-svh w-full flex-col overflow-hidden px-[var(--gutter)] pb-[calc(var(--gutter)+40px)] pt-[88px]"
        style={{ backgroundColor: '#050606', color: 'var(--d-ink, #edf0ee)' }}
      >
        <div className="hv-wrap flex items-center justify-between">
          <div className="hv-label hv-kicker" style={{ color: 'var(--d-ink2)' }}>
            <b style={{ color: mine ? 'var(--pulse)' : 'var(--d-ink)' }}>01</b>
            <i />
            <span>A normal weekday, roughly</span>
          </div>
          <div className="hv-label hidden sm:block" style={{ color: 'var(--d-ink2)' }}>
            {mine ? 'The only hours that are mine' : 'Everyone else’s hours'}
          </div>
        </div>

        {/* the clock */}
        <div className="flex flex-1 flex-col items-center justify-center">
          <div
            ref={clockRef}
            className="hv-dot flex items-center tabular-nums leading-[0.8] transition-[color,text-shadow] duration-700"
            style={{
              fontSize: 'clamp(84px, 21vw, 330px)',
              color: mine ? 'var(--pulse)' : 'var(--d-ink)',
              textShadow: mine ? '0 0 40px rgba(61,255,154,0.45), 0 0 110px rgba(61,255,154,0.25)' : 'none',
              letterSpacing: '-0.02em',
            }}
            aria-hidden
          >
            <span ref={hhRef}>05</span>
            {/* Doto's own colon is odd at this size, so the clock gets a blinking one of its own */}
            <span className="mx-[0.06em] flex h-[0.62em] flex-col justify-between animate-[hv-colon_1s_steps(1)_infinite]">
              <span className="block h-[0.105em] w-[0.105em] rounded-full bg-current" style={{ boxShadow: mine ? '0 0 20px rgba(61,255,154,0.6)' : 'none' }} />
              <span className="block h-[0.105em] w-[0.105em] rounded-full bg-current" style={{ boxShadow: mine ? '0 0 20px rgba(61,255,154,0.6)' : 'none' }} />
            </span>
            <span ref={mmRef}>30</span>
          </div>

          <div className="relative mt-[4.5vh] h-[150px] w-full max-w-[760px] text-center sm:h-[132px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={beat}
                className="absolute inset-x-0 top-0"
                initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="hv-label" style={{ color: d.mine ? 'var(--pulse)' : 'var(--d-ink2)' }}>
                  {d.time}
                </div>
                <h2 className="hv-display mt-3 text-[clamp(34px,5.2vw,76px)] font-[640] leading-[0.95] tracking-[-0.045em]">{d.title}</h2>
                <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-[1.5] sm:text-[17px]" style={{ color: 'var(--d-ink2)' }}>
                  {beat === DAY.length - 1 ? (
                    <>
                      × <span className="hv-dot text-[1.15em]" style={{ color: 'var(--pulse)' }}>{days}</span> {d.body}
                    </>
                  ) : (
                    d.body
                  )}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* the ruler: where the hours actually go */}
        <div className="hv-wrap">
          <div className="relative h-[54px]">
            {/* segments */}
            <div className="absolute inset-x-0 top-[18px] h-[10px]" style={{ background: 'var(--d-line)' }} />
            <Seg from={9} to={17} label="The 9-to-5" kind="job" />
            <Seg from={17} to={21} label="Dad" kind="dad" />
            <Seg from={21.5} to={25.5} label="Mine" kind="mine" />
            {/* hour ticks */}
            {[6, 9, 12, 15, 18, 21, 24].map((h) => (
              <div key={h} className="absolute top-[34px] -translate-x-1/2" style={{ left: `${rx(h)}%` }}>
                <div className="mx-auto h-[5px] w-px" style={{ background: 'var(--d-ink2)' }} />
                <div className="hv-label mt-1 text-[9.5px]" style={{ color: 'var(--d-ink2)' }}>
                  {String(h % 24).padStart(2, '0')}
                </div>
              </div>
            ))}
            {/* the playhead */}
            <div ref={headRef} className="absolute top-[8px] h-[30px] w-[2px] -translate-x-1/2" style={{ left: 0, background: mine ? 'var(--pulse)' : 'var(--d-ink)' }}>
              <span
                className="absolute -top-[5px] left-1/2 h-[9px] w-[9px] -translate-x-1/2 rounded-full"
                style={{ background: mine ? 'var(--pulse)' : 'var(--d-ink)', boxShadow: mine ? '0 0 14px var(--pulse-glow)' : 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes hv-colon{0%,60%{opacity:1}61%,100%{opacity:.25}}`}</style>
    </section>
  );
}

function Seg({ from, to, label, kind }: { from: number; to: number; label: string; kind: 'job' | 'dad' | 'mine' }) {
  const style: React.CSSProperties =
    kind === 'job'
      ? {
          background: 'repeating-linear-gradient(135deg, var(--d-ink2) 0 1px, transparent 1px 6px)',
          opacity: 0.75,
        }
      : kind === 'dad'
        ? { boxShadow: 'inset 0 0 0 1px var(--d-ink2)' }
        : { background: 'var(--pulse)', boxShadow: '0 0 18px var(--pulse-glow)' };
  return (
    <div className="absolute top-[18px] h-[10px]" style={{ left: `${rx(from)}%`, width: `${rx(to) - rx(from)}%` }}>
      <div className="absolute inset-0" style={style} />
      <div
        className="hv-label absolute -top-[17px] left-0 whitespace-nowrap text-[9.5px]"
        style={{ color: kind === 'mine' ? 'var(--pulse)' : 'var(--d-ink2)' }}
      >
        {label}
      </div>
    </div>
  );
}
