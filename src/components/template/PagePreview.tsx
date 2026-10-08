'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type Mode = 'desktop' | 'mobile';

interface PagePreviewProps {
  name: string;
  slug: string;
  demoUrl: string;
}

const SCROLL_SPEED = 0.35; // px per ms while hovering

/**
 * Full-page screenshot in a scrollable frame. On a mouse it scrolls itself while hovered, until the visitor
 * scrolls, clicks or uses the keyboard; with reduced motion or on touch it is a plain scroll area.
 */
export default function PagePreview({ name, slug, demoUrl }: PagePreviewProps) {
  const [mode, setMode] = useState<Mode>('desktop');
  const [handedOver, setHandedOver] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = 0;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduced || handedOver) return;

    let raf = 0;
    let delay = 0;
    let last = 0;
    let position = 0;

    const tick = (now: number) => {
      position += (last ? now - last : 16) * SCROLL_SPEED;
      last = now;
      el.scrollTop = position;
      if (el.scrollTop + el.clientHeight < el.scrollHeight - 1) raf = requestAnimationFrame(tick);
    };
    const start = () => {
      delay = window.setTimeout(() => {
        last = 0;
        position = el.scrollTop;
        raf = requestAnimationFrame(tick);
      }, 450);
    };
    const stop = () => {
      window.clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
    const takeOver = () => {
      stop();
      setHandedOver(true);
    };

    el.addEventListener('mouseenter', start);
    el.addEventListener('mouseleave', stop);
    el.addEventListener('wheel', takeOver, { passive: true });
    el.addEventListener('pointerdown', takeOver);
    el.addEventListener('keydown', takeOver);
    return () => {
      stop();
      el.removeEventListener('mouseenter', start);
      el.removeEventListener('mouseleave', stop);
      el.removeEventListener('wheel', takeOver);
      el.removeEventListener('pointerdown', takeOver);
      el.removeEventListener('keydown', takeOver);
    };
  }, [mode, handedOver]);

  const tab = (value: Mode, label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={mode === value}
      onClick={() => setMode(value)}
      className={`text-sm transition-colors ${mode === value ? 'text-neutral-950' : 'text-neutral-400 hover:text-neutral-700'}`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div role="tablist" aria-label="Preview size" className="flex items-center gap-5">
          {tab('desktop', 'Desktop')}
          {tab('mobile', 'Mobile')}
        </div>
        <Link href={demoUrl} className="inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-950">
          Live demo
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200">
        {mode === 'desktop' ? (
          <div
            ref={scrollerRef}
            tabIndex={0}
            aria-label={`Full-page screenshot of the ${name} template on desktop. Scroll to see every section.`}
            className="h-[min(78vh,820px)] min-h-[380px] overflow-y-auto bg-neutral-50 outline-none [scrollbar-width:thin]"
          >
            <img
              src={`/previews/full/${slug}.jpg`}
              alt={`The ${name} landing page template on desktop, from the hero to the footer`}
              className="block w-full"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        ) : (
          <div className="flex h-[min(78vh,820px)] min-h-[380px] justify-center">
            <div
              ref={scrollerRef}
              tabIndex={0}
              aria-label={`Full-page screenshot of the ${name} template on a phone. Scroll to see every section.`}
              className="h-full w-[min(100%,375px)] overflow-y-auto border-x border-neutral-200 outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <img
                src={`/previews/mobile/${slug}.jpg`}
                alt={`The ${name} landing page template on a phone, from the hero to the footer`}
                className="block w-full"
                decoding="async"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
