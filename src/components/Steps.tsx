'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { SectionHeader } from '@/components/theirs/section-header';
import { TextMorph } from '@/ui-library/registry/text-morph';
import { NumberRoll } from '@/ui-library/registry/number-roll';

/* How it works, as three small scenes that play while they're on screen: real templates shuffling, one frame that changes
 * shape from desktop to phone, and a config file being edited before a deploy goes live. Every change morphs; with
 * reduced motion each scene holds its first state. */

const reducedQuery = '(prefers-reduced-motion: reduce)';
const subscribe = (cb: () => void) => {
  const q = window.matchMedia(reducedQuery);
  q.addEventListener('change', cb);
  return () => q.removeEventListener('change', cb);
};
const useReduced = () => React.useSyncExternalStore(subscribe, () => window.matchMedia(reducedQuery).matches, () => false);

/** Counts 0, 1, 2… every `ms` while the element is on screen. */
function useTicker<T extends Element>(ms: number) {
  const ref = React.useRef<T>(null);
  const reduced = useReduced();
  const [tick, setTick] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    if (!visible || reduced) return;
    const t = window.setInterval(() => setTick((n) => n + 1), ms);
    return () => window.clearInterval(t);
  }, [visible, reduced, ms]);
  return [ref, tick] as const;
}

const SHOWCASE = [
  { slug: 'inlay', name: 'Inlay' },
  { slug: 'tessera', name: 'Tessera' },
  { slug: 'turnout', name: 'Turnout' },
];

const scene = 'relative aspect-[5/4] overflow-hidden rounded-[22px] border border-black/[0.07] bg-[#fafafa] bg-[radial-gradient(circle,rgba(24,25,37,0.07)_1px,transparent_1px)] bg-[length:14px_14px]';

function Shuffle() {
  const [ref, tick] = useTicker<HTMLDivElement>(2800);
  const front = tick % SHOWCASE.length;
  return (
    <div ref={ref} className={scene}>
      <div className="absolute inset-x-[11%] top-[15%] bottom-[22%]">
        {SHOWCASE.map((t, i) => {
          const depth = (i - front + SHOWCASE.length) % SHOWCASE.length; // 0 front, 1 middle, 2 back
          return (
            <div
              key={t.slug}
              className="absolute inset-0 overflow-hidden rounded-[12px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateY(${depth * -15}px) scale(${1 - depth * 0.06})`,
                opacity: depth === 2 ? 0.55 : 1,
                zIndex: 3 - depth,
              }}
            >
              <img src={`/previews/card/${t.slug}.webp`} alt="" className="size-full object-cover object-top" loading="lazy" draggable={false} />
            </div>
          );
        })}
      </div>
      <div className="absolute inset-x-0 bottom-[7%] flex justify-center">
        <span className="inline-flex h-7 items-center gap-2 rounded-full bg-white pl-2.5 pr-3 text-[12.5px] font-medium text-[#181925] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
          <span className="size-1.5 rounded-full bg-primary" />
          <TextMorph>{SHOWCASE[front].name}</TextMorph>
        </span>
      </div>
    </div>
  );
}

const SCREENS = [
  { label: 'Desktop', width: 1440, frame: 88 },
  { label: 'Tablet', width: 768, frame: 56 },
  { label: 'Phone', width: 390, frame: 30 },
];

function Screens() {
  const [ref, tick] = useTicker<HTMLDivElement>(2400);
  const i = tick % SCREENS.length;
  const s = SCREENS[i];
  const phone = s.label === 'Phone';
  return (
    <div ref={ref} className={scene}>
      <div className="absolute inset-x-0 top-[8%] flex justify-center">
        <div className="relative grid grid-cols-3 rounded-full bg-white p-[3px] text-[11.5px] font-medium shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
          <span
            aria-hidden="true"
            className="absolute inset-y-[3px] left-[3px] w-[calc((100%-6px)/3)] rounded-full bg-[#181925] transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
            style={{ transform: `translateX(${i * 100}%)` }}
          />
          {SCREENS.map((x, k) => (
            <span key={x.label} className={`relative z-10 px-3 py-1 text-center transition-colors duration-300 ${k === i ? 'text-white' : 'text-[#888]'}`}>
              {x.label}
            </span>
          ))}
        </div>
      </div>
      <div
        className="absolute bottom-[14%] left-1/2 top-[24%] -translate-x-1/2 overflow-hidden rounded-[10px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)] transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: `${s.frame}%` }}
      >
        <img src="/previews/card/inlay.webp" alt="" className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 ${phone ? 'opacity-0' : 'opacity-100'}`} loading="lazy" draggable={false} />
        <img src="/previews/mobile/inlay.jpg" alt="" className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 ${phone ? 'opacity-100' : 'opacity-0'}`} loading="lazy" draggable={false} />
      </div>
      <div className="absolute inset-x-0 bottom-[4.5%] flex justify-center font-mono text-[11px] text-primary tabular-nums">
        <NumberRoll value={s.width} format={{ useGrouping: false }} duration={700} />
        <span className="ml-1 text-[#999]">px</span>
      </div>
    </div>
  );
}

const BRANDS = [
  { name: 'Acme', color: '#305dde' },
  { name: 'Northwind', color: '#0f9f6e' },
  { name: 'Yours', color: '#e5484d' },
];

function Ship() {
  const [ref, tick] = useTicker<HTMLDivElement>(1300);
  // Each brand gets three beats: edit, deploying, live.
  const beat = tick % 3;
  const brand = BRANDS[Math.floor(tick / 3) % BRANDS.length];
  const state = beat === 0 ? 'idle' : beat === 1 ? 'busy' : 'done';
  const label = state === 'idle' ? 'Deploy' : state === 'busy' ? 'Deploying' : 'Live';
  return (
    <div ref={ref} className={scene}>
      <div className="absolute inset-x-[9%] top-[12%] overflow-hidden rounded-[12px] bg-white font-mono text-[11.5px] leading-[1.9] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between border-b border-black/[0.06] px-3.5 py-1.5 text-[10.5px] text-[#999]">
          <span>site.config.ts</span>
          <span className="size-1.5 rounded-full bg-[#ddd]" />
        </div>
        <div className="px-3.5 py-2.5 text-[#555]">
          <p>
            <span className="text-[#8a63d2]">export const</span> site = {'{'}
          </p>
          <p className="pl-4">
            brand: <span className="text-[#0f7b55]">&quot;<TextMorph>{brand.name}</TextMorph>&quot;</span>,
          </p>
          <p className="flex items-center pl-4">
            accent: <span className="ml-1 text-[#0f7b55]">&quot;{brand.color}&quot;</span>
            <span className="ml-2 size-2.5 rounded-full transition-colors duration-500" style={{ background: brand.color }} />
          </p>
          <p className="pl-4">
            cta: <span className="text-[#0f7b55]">&quot;Start free&quot;</span>,
          </p>
          <p>{'};'}</p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-[11%] flex justify-center">
        <span
          className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition-colors duration-500 ${
            state === 'done' ? 'bg-[#0f9f6e] text-white' : 'bg-[#181925] text-white'
          }`}
        >
          <span className={`grid place-items-center overflow-hidden transition-[width,opacity] duration-500 ${state === 'idle' ? 'w-0 opacity-0' : 'w-3.5 opacity-100'}`}>
            {state === 'busy' ? (
              <span className="size-3.5 animate-spin rounded-full border-2 border-white border-r-transparent" />
            ) : (
              <Check className="size-3.5" strokeWidth={3} />
            )}
          </span>
          <TextMorph>{label}</TextMorph>
        </span>
      </div>
    </div>
  );
}

const STEPS = [
  { title: 'Pick a direction', body: 'Every template is a complete, original site: its own concept, copy and motion, not a theme with a new colour.', Scene: Shuffle },
  { title: 'Try it on every screen', body: 'Each demo runs as a real build. Switch between desktop, tablet and phone before you spend a cent.', Scene: Screens },
  { title: 'Make it yours, then ship', body: 'Words, links, prices and colours live in one config file. Change them, deploy anywhere Next.js runs.', Scene: Ship },
];

export function Steps() {
  return (
    <section id="how-it-works" className="mx-auto flex max-w-6xl scroll-mt-20 flex-col gap-12 px-5 py-20 sm:gap-16 sm:px-6 sm:py-28">
      <SectionHeader
        badge="How it works"
        title="From demo to deployed in an afternoon."
        description="Try any template live, make it yours in one file, and ship it the same day."
      />
      <ol className="m-0 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-6">
        {STEPS.map(({ title, body, Scene }, i) => (
          <li key={title} className="flex flex-col">
            <Scene />
            <div className="mt-5 flex items-baseline gap-2.5 px-1">
              <span className="font-mono text-[12px] text-primary">0{i + 1}</span>
              <h3 className="text-[17px] font-medium tracking-[-0.02em] text-[#181925]">{title}</h3>
            </div>
            <p className="mt-2 px-1 text-[14.5px] leading-relaxed text-[#666]">{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
