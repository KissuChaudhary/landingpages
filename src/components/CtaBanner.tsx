'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { LogoMark } from '@/components/site/Logo';
import { TEMPLATES } from '@/data/templates';
import { primaryButton, secondaryButton } from '@/components/home/buttons';

/* The closing call: real template previews in three tilted rows that drift in opposite directions as you scroll, fading
 * into a calm centre where the headline sits. Nothing moves on its own; with reduced motion the rows stay put. */

const PER_ROW = 8;

export function CtaBanner() {
  const card = React.useRef<HTMLDivElement>(null);
  const slugs = TEMPLATES.map((t) => t.slug);
  const rows = [0, 1, 2].map((r) => {
    const start = (r * PER_ROW) % Math.max(1, slugs.length);
    return Array.from({ length: PER_ROW }, (_, i) => slugs[(start + i) % slugs.length]);
  });

  React.useEffect(() => {
    const el = card.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <section className="px-4 pb-20 pt-4 sm:px-6 sm:pb-24 sm:pt-6">
      <div ref={card} className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-black/[0.07] bg-[#fafafa]">
        <div aria-hidden="true" className="absolute inset-[-20%] flex flex-col justify-center gap-4 [transform:rotate(-7deg)]">
          {rows.map((row, r) => (
            <div
              key={r}
              className="flex w-max gap-4"
              style={{
                transform: `translateX(calc(${r % 2 ? -18 : -8}% + (var(--p, 0.5) - 0.5) * ${r % 2 ? 260 : -260}px))`,
              }}
            >
              {[...row, ...row].map((slug, i) => (
                <div key={`${slug}-${i}`} className="h-[150px] w-[240px] shrink-0 overflow-hidden rounded-[12px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)] sm:h-[175px] sm:w-[280px]">
                  <img src={`/previews/card/${slug}.webp`} alt="" loading="lazy" decoding="async" draggable={false} className="size-full object-cover object-top" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 58% 64% at 50% 50%, #fafafa 40%, rgb(250 250 250 / 0.88) 58%, rgb(250 250 250 / 0.2) 88%)' }}
        />

        <div className="relative flex flex-col items-center px-6 py-24 text-center sm:py-32">
          <LogoMark size={52} />
          <h2 className="mt-7 max-w-2xl text-balance text-[34px] font-medium leading-[1.05] tracking-[-0.045em] text-[#181925] sm:text-[52px]">
            Your next launch, <span className="text-primary">already finished.</span>
          </h2>
          <p className="mt-5 max-w-md text-pretty text-[16px] leading-relaxed text-[#666] sm:text-[17px]">
            Pick a template tonight, make it yours in one file, and ship it by the weekend.
          </p>
          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
            <a href="#catalog" className={primaryButton}>
              Browse templates
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <Link href="/#pricing" className={secondaryButton}>
              See pricing
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[13px] text-[#888]">
            {['One-time payment', 'Commercial license', 'Free updates'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" strokeWidth={2.4} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
