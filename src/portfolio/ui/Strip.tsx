'use client';

import { useEffect, useRef, useState } from 'react';
import { useHv } from './context';

const SCENES = [
  { id: 'top', label: 'Pulse' },
  { id: 'day', label: 'A day' },
  { id: 'journey', label: 'The chart' },
  { id: 'work', label: 'The work' },
  { id: 'vitals', label: 'What went right' },
  { id: 'allergies', label: 'Allergies' },
  { id: 'question', label: 'The question' },
  { id: 'now', label: 'Now' },
];

const H = 28;
const MID = 18;

/** One little PQRST at x (in a 1000-wide strip). */
function blip(x: number) {
  return ` L${x - 4} ${MID} L${x - 2.6} ${MID + 1.5} L${x - 1.2} ${MID - 12} L${x + 0.4} ${MID + 4} L${x + 1.6} ${MID} L${x + 5} ${MID} L${x + 7} ${MID - 2.5} L${x + 9} ${MID}`;
}

/**
 * Your progress through my life, as a thin heart trace along the bottom of the screen.
 * Each scene is a beat; hover one to see its name, click to jump.
 */
export default function Strip() {
  const { phase, scrollTo } = useHv();
  const [marks, setMarks] = useState<{ id: string; label: string; x: number }[]>([]);
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const clipRef = useRef<SVGRectElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const m = SCENES.map((s) => {
        const el = document.getElementById(s.id);
        return el ? { ...s, x: Math.min(1, Math.max(0, el.offsetTop / max)) } : null;
      }).filter(Boolean) as { id: string; label: string; x: number }[];
      setMarks(m);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        clipRef.current?.setAttribute('width', String(p * 1000));
        if (headRef.current) headRef.current.style.left = `${p * 100}%`;
        setShow(window.scrollY > window.innerHeight * 0.9);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.removeEventListener('scroll', on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  let d = `M0 ${MID}`;
  for (const m of marks) if (m.x > 0.004) d += blip(m.x * 1000);
  d += ` L1000 ${MID}`;

  const visible = show && phase === 'alive';

  return (
    <div
      className="hv-strip fixed inset-x-0 bottom-0 z-[60] px-[var(--gutter)] pb-3 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      aria-label="Page progress"
    >
      <div className="relative h-[28px]">
        <svg viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <clipPath id="hv-strip-clip">
              <rect ref={clipRef} x="0" y="-20" width="0" height={H + 40} />
            </clipPath>
          </defs>
          <path d={d} fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path
            d={d}
            fill="none"
            stroke="var(--strip-hi, var(--pulse))"
            strokeWidth="1.3"
            vectorEffect="non-scaling-stroke"
            clipPath="url(#hv-strip-clip)"
            style={{ filter: 'drop-shadow(0 0 4px var(--pulse-glow))' }}
          />
        </svg>
        <span
          ref={headRef}
          className="pointer-events-none absolute top-[18px] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-[var(--strip-hi,var(--pulse))] shadow-[0_0_10px_var(--pulse-glow)]"
        />
        {marks.map((m) => (
          <button
            key={m.id}
            type="button"
            className="absolute top-0 h-full w-7 -translate-x-1/2"
            style={{ left: `${m.x * 100}%` }}
            onMouseEnter={() => setHover(m.id)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(m.id)}
            onBlur={() => setHover(null)}
            onClick={() => scrollTo(`#${m.id}`)}
            aria-label={`Jump to ${m.label}`}
          >
            <span
              className="hv-label pointer-events-none absolute bottom-[26px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--bg-3)] px-2.5 py-1 text-[9px] text-[var(--ink)] transition-all duration-300"
              style={{ opacity: hover === m.id ? 1 : 0, transform: `translate(-50%, ${hover === m.id ? 0 : 6}px)` }}
            >
              {m.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
