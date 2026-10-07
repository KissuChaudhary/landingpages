'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { VITALS } from '../data';
import { onBeat } from '../lib/heart';

/** count a displayed value like "$2,900" up from zero, keeping its prefix and commas */
function useCount(value: string, key: number) {
  const [out, setOut] = useState(value);
  useEffect(() => {
    const m = value.match(/^(\D*)([\d,]+)(.*)$/);
    if (!m) {
      setOut(value);
      return;
    }
    const [, pre, num, post] = m;
    const target = parseInt(num.replace(/,/g, ''), 10);
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 900);
      const e = 1 - Math.pow(1 - t, 3);
      setOut(`${pre}${Math.round(target * e).toLocaleString('en-US')}${post}`);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, key]);
  return out;
}

/** a thin ECG trace that scrolls forever and kicks on every real heartbeat */
function Monitor() {
  const dot = useRef<HTMLSpanElement>(null);
  useEffect(
    () =>
      onBeat(() =>
        dot.current?.animate([{ transform: 'scale(1)' }, { transform: 'scale(2.4)', offset: 0.2 }, { transform: 'scale(1)' }], {
          duration: 500,
          easing: 'cubic-bezier(.2,.7,.2,1)',
        }),
      ),
    [],
  );
  const beat = (o: number) =>
    `L${o + 60} 30 L${o + 64} 26 L${o + 68} 30 L${o + 76} 30 L${o + 79} 33 L${o + 83} 6 L${o + 87} 40 L${o + 90} 30 L${o + 100} 30 L${o + 108} 24 L${o + 116} 30 L${o + 160} 30`;
  let d = 'M0 30';
  for (let o = 0; o < 1600; o += 160) d += beat(o);
  return (
    <div className="relative flex items-center gap-4">
      <span ref={dot} className="inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--pulse)] shadow-[0_0_10px_var(--pulse-glow)]" />
      <div className="h-[40px] flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <svg viewBox="0 0 1600 40" preserveAspectRatio="none" className="h-full w-[200%] max-w-none animate-[hv-wave_7s_linear_infinite]" aria-hidden>
          <path d={d} fill="none" stroke="var(--ink)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export default function Vitals() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(VITALS.length - 1, Math.max(0, Math.floor(p * VITALS.length * 0.999)));
    setI((c) => (c === next ? c : next));
  });
  const v = VITALS[i];
  const shown = useCount(v.value, i);

  return (
    <section ref={ref} id="vitals" data-theme="light" className="relative" style={{ height: `${VITALS.length * 90 + 20}svh` }} aria-label="What went right">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-[var(--gutter)] pb-[calc(var(--gutter)+44px)] pt-[88px]">
        <div className="hv-wrap flex items-center justify-between gap-6">
          <div className="hv-label hv-kicker">
            <b>04</b>
            <i />
            <span>What went right</span>
          </div>
          <div className="hv-label flex gap-4 text-[var(--mute)]">
            {VITALS.map((x, k) => (
              <span key={x.id} className="transition-colors duration-500" style={{ color: k === i ? 'var(--ink)' : undefined }}>
                {String(k + 1).padStart(2, '0')}
              </span>
            ))}
          </div>
        </div>

        <div className="hv-wrap mt-6">
          <h2 className="hv-head-title">
            <span>Three honest numbers.</span>
            <span>No vanity metrics.</span>
          </h2>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="hv-label text-[var(--mute)]">{v.label}</div>
          <div className="hv-dot mt-4 leading-[0.85] tabular-nums" style={{ fontSize: 'clamp(76px, 15vw, 230px)' }} aria-live="polite">
            {shown}
          </div>
          <div className="relative mt-6 h-[170px] w-full max-w-[640px] sm:h-[124px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={v.id}
                className="absolute inset-x-0 top-0"
                initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-[clamp(22px,2.4vw,32px)] font-[620] leading-[1.1] tracking-[-0.035em]">{v.title}</h3>
                <p className="mx-auto mt-3 max-w-[48ch] text-[15.5px] leading-[1.55] text-[var(--ink-2)]">{v.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="hv-wrap">
          <Monitor />
        </div>
      </div>
      <style>{`@keyframes hv-wave{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}
