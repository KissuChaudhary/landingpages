'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { NOW, PERSON, PRODUCTS, STACK, daysBuilding } from '../data';
import { onBeat } from '../lib/heart';
import { useHv } from '../ui/context';
import SectionHead from '../ui/SectionHead';

const LIVING = ['bringback', 'drawgle', 'theirs'].map((id) => PRODUCTS.find((p) => p.id === id)!);
const NOTE: Record<string, string> = {
  bringback: 'pays',
  drawgle: 'built, not sold',
  theirs: '1 user, via ChatGPT',
};

const WORD = 'STILL BEATING';

function Finale() {
  const ref = useRef<HTMLDivElement>(null);
  const cometRef = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduced = !!useReducedMotion();

  useEffect(() => {
    if (!inView || reduced) return;
    return onBeat(() => {
      cometRef.current?.animate([{ strokeDashoffset: 0.1 }, { strokeDashoffset: -1.05 }], { duration: 1100, easing: 'cubic-bezier(.45,0,.2,1)' });
      const letters = ref.current?.querySelectorAll<HTMLSpanElement>('[data-l]');
      letters?.forEach((el, i) => {
        el.animate(
          [
            { fontWeight: 260, color: '#0b0d0c' },
            { fontWeight: 880, color: '#07a35a', offset: 0.28 },
            { fontWeight: 260, color: '#0b0d0c' },
          ],
          { duration: 720, delay: 120 + i * 62, easing: 'cubic-bezier(.3,.7,.3,1)' },
        );
      });
    });
  }, [inView, reduced]);

  return (
    <div ref={ref} className="relative mt-[16vh] select-none py-[4vh]">
      <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-1/2 h-[60%] w-full -translate-y-1/2" aria-hidden>
        <path
          d="M0 60 L160 60 L172 60 L178 66 L186 12 L194 86 L200 60 L214 60 L226 50 L240 60 L480 60 L492 60 L498 66 L506 8 L514 88 L520 60 L534 60 L546 50 L560 60 L800 60 L812 60 L818 66 L826 14 L834 84 L840 60 L854 60 L866 50 L880 60 L1000 60"
          fill="none"
          stroke="rgba(11,13,12,0.14)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={cometRef}
          d="M0 60 L160 60 L172 60 L178 66 L186 12 L194 86 L200 60 L214 60 L226 50 L240 60 L480 60 L492 60 L498 66 L506 8 L514 88 L520 60 L534 60 L546 50 L560 60 L800 60 L812 60 L818 66 L826 14 L834 84 L840 60 L854 60 L866 50 L880 60 L1000 60"
          fill="none"
          stroke="var(--pulse)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          style={{ strokeDasharray: '0.1 2', strokeDashoffset: 0.1 }}
        />
      </svg>
      <h2
        className="relative whitespace-nowrap text-center uppercase leading-[0.8]"
        style={{ fontFamily: 'var(--f-display)', fontStretch: '125%', fontWeight: 260, fontSize: 'clamp(40px, 8.6vw, 168px)', letterSpacing: '-0.04em' }}
        aria-label="Still beating."
      >
        {WORD.split('').map((c, i) => (
          <span key={i} data-l className="inline-block" aria-hidden>
            {c === ' ' ? ' ' : c}
          </span>
        ))}
      </h2>
    </div>
  );
}

export default function Outro() {
  const { replay } = useHv();
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => setDays(daysBuilding()), []);

  return (
    <section id="now" data-theme="light" className="relative overflow-hidden pt-[16vh]" aria-label="Right now">
      <div className="hv-section">
        <SectionHead n="07" kicker="Now" title={['No new products.', 'Just the ones still breathing.']} />
        <div className="hv-wrap">
          <div className="mt-12 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-[clamp(20px,1.9vw,26px)] font-[520] leading-[1.3] tracking-[-0.02em]">{NOW.headline}</p>
              <p className="hv-body mt-5 max-w-[52ch] text-[17px]">{NOW.body}</p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
              <div className="hv-label text-[var(--mute)]">Still breathing</div>
              <ul className="mt-4 border-t border-[var(--line)]">
                {LIVING.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="visit"
                      className="group flex items-center justify-between gap-4 border-b border-[var(--line)] py-5 transition-colors hover:text-[var(--pulse)]"
                    >
                      <span className="flex items-center gap-3.5">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--pulse)] opacity-50" />
                          <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--pulse)] shadow-[0_0_10px_var(--pulse-glow)]" />
                        </span>
                        <span className="text-[22px] font-[600] tracking-[-0.03em]">{p.name}</span>
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="hv-label text-[var(--mute)] transition-colors group-hover:text-[var(--pulse)]">{NOTE[p.id]}</span>
                        <span className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden>
                          ↗
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* contact */}
          <div className="mt-[16vh] grid gap-8 border-t border-[var(--line)] pt-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="hv-label text-[var(--mute)]">Say hi</div>
              <p className="hv-body mt-4 max-w-[34ch]">DMs are open. It is a small audience, so the odds of a reply are good.</p>
            </div>
            <div className="lg:col-span-8">
              <a
                href={PERSON.x}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="go"
                className="group inline-flex items-baseline gap-4 text-[clamp(40px,7.2vw,124px)] font-[660] leading-[0.9] tracking-[-0.055em] transition-colors hover:text-[var(--pulse)]"
              >
                {PERSON.handle}
                <span className="text-[0.5em] transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2" aria-hidden>
                  ↗
                </span>
              </a>
              <div className="hv-label mt-4 text-[var(--mute)]">on X · building in public, reluctantly</div>
            </div>
          </div>

          <motion.div
            className="mt-[12vh] flex flex-wrap gap-x-5 gap-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="hv-label text-[var(--mute)]">The stack that runs all of it</span>
            {STACK.map((s) => (
              <span key={s} className="hv-label text-[var(--ink-2)]">
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <Finale />

      <footer className="hv-section pb-[calc(var(--gutter)+28px)] pt-[10vh]">
        <div className="hv-wrap flex flex-col justify-between gap-4 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center">
          <div className="hv-label text-[var(--mute)]">
            © 2026 Harvansh · Built between 21:30 and 01:30 · Day {days ?? '—'}
          </div>
          <button type="button" onClick={replay} className="hv-label self-start text-[var(--ink-2)] transition-colors hover:text-[var(--pulse)] sm:self-auto">
            Flatline it again ↺
          </button>
        </div>
      </footer>
    </section>
  );
}
