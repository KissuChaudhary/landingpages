'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useHv } from './context';
import { getBpm, onBeat } from '../lib/heart';

export default function Nav() {
  const { phase, sound, toggleSound, scrollTo } = useHv();
  const heartRef = useRef<HTMLSpanElement>(null);
  const [bpm, setBpm] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // while the heart is restarting, the rate climbs from almost nothing to resting
  useEffect(() => {
    if (phase !== 'writing') return;
    const t0 = performance.now();
    const id = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - t0) / 4300);
      setBpm(Math.round(31 + (72 - 31) * (1 - Math.pow(1 - t, 2))));
    }, 140);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'alive') return;
    return onBeat(() => {
      setBpm(getBpm());
      heartRef.current?.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.9)', offset: 0.15 }, { transform: 'scale(1)' }],
        { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)' },
      );
    });
  }, [phase]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.55);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const flat = phase === 'boot';

  return (
    <header className="hv-nav">
      <div className="flex items-start justify-between px-[var(--gutter)] pt-[18px]">
        {/* left: plain text until the signature arrives to take its place */}
        <div className="relative h-10 w-[120px]">
          <AnimatePresence>
            {phase !== 'alive' && (
              <motion.div
                key="name"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="hv-label leading-[1.6]"
              >
                <div className="text-[var(--ink)]">Harvansh</div>
                <div className="text-[var(--mute)]">Solo builder</div>
              </motion.div>
            )}
          </AnimatePresence>
          {phase === 'alive' && scrolled && (
            <button
              type="button"
              aria-label="Back to the top"
              className="absolute -inset-2 rounded-md"
              data-cursor="top"
              onClick={() => scrollTo(0)}
            />
          )}
        </div>

        <div className="flex items-center gap-5 sm:gap-7">
          <div className="hv-label flex items-center gap-2.5" aria-live="off">
            <span ref={heartRef} className={`hv-heart ${flat ? '!bg-[var(--alarm)] !shadow-[0_0_10px_var(--alarm-dim)] animate-pulse' : ''}`} />
            <span className="opacity-60">HR</span>
            <span className={`hv-dot min-w-[3ch] text-[13px] ${flat ? 'text-[var(--alarm)]' : ''}`}>{flat || bpm === null ? '---' : bpm}</span>
          </div>

          <button
            type="button"
            onClick={toggleSound}
            className="hv-label flex items-center gap-2 py-2"
            aria-pressed={sound}
            aria-label={sound ? 'Turn sound off' : 'Turn sound on'}
          >
            <span className="flex h-3 items-end gap-[2px]" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-[2px] bg-current"
                  style={{
                    height: sound ? undefined : 2,
                    animation: sound ? `hv-eq ${0.46 + i * 0.13}s ease-in-out ${i * 0.07}s infinite alternate` : undefined,
                  }}
                />
              ))}
            </span>
            <span className="hidden sm:inline">Sound {sound ? 'on' : 'off'}</span>
          </button>
        </div>
      </div>
      <style>{`@keyframes hv-eq{from{height:2px}to{height:12px}}`}</style>
    </header>
  );
}
