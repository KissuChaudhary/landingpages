'use client';

import React from 'react';
import { NumberRoll } from '@/ui-library/registry/number-roll';

/* The headline, selected like a layer on a canvas: a hairline frame with corner handles, the layer's name above it and
 * its size below. The frame hugs the text, so it eases along when the changing word morphs, and the width rolls to its
 * new value once the word has settled. Wide screens only; on phones the headline stands on its own. */

export default function MeasuredHeading({ children, label = 'Heading' }: { children: React.ReactNode; label?: string }) {
  const box = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });

  React.useEffect(() => {
    const el = box.current;
    if (!el) return;
    let timer = 0;
    const read = () => setSize({ w: Math.round(el.offsetWidth), h: Math.round(el.offsetHeight) });
    read();
    // Wait for the morph to finish before rolling the numbers, so they move once, not on every frame.
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(read, 140);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={box} className="relative mx-auto w-fit">
      {children}
      <span aria-hidden="true" className="pointer-events-none absolute -inset-x-5 -inset-y-1.5 hidden rounded-[2px] border border-primary/45 md:block">
        {['-left-[4px] -top-[4px]', '-right-[4px] -top-[4px]', '-left-[4px] -bottom-[4px]', '-right-[4px] -bottom-[4px]'].map((pos) => (
          <span key={pos} className={`absolute size-[7px] rounded-[1px] border border-primary bg-white ${pos}`} />
        ))}
        <span className="absolute -top-[22px] left-0 font-mono text-[11px] leading-none tracking-normal text-primary">{label}</span>
        {size.w > 0 && (
          <span className="absolute -bottom-[11px] left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-[4px] bg-primary px-1.5 py-[3px] font-mono text-[10.5px] font-medium leading-none tracking-normal text-white">
            <NumberRoll value={size.w} format={{ useGrouping: false }} duration={700} />
            <span className="opacity-60">×</span>
            <NumberRoll value={size.h} format={{ useGrouping: false }} duration={700} />
          </span>
        )}
      </span>
    </div>
  );
}
