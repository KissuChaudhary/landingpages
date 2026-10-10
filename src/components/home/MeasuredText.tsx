'use client';

import React from 'react';
import { NumberRoll } from '@/ui-library/registry/number-roll';

/* A selected text layer: the frame follows the morphing word, on phones as well as wide screens. */

export default function MeasuredText({ children, label = 'Text' }: { children: React.ReactNode; label?: string }) {
  const box = React.useRef<HTMLSpanElement>(null);
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
    <span ref={box} className="relative inline-block whitespace-nowrap align-baseline">
      {children}
      <span aria-hidden="true" className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-[2px] border border-primary/45">
        {['-left-[4px] -top-[4px]', '-right-[4px] -top-[4px]', '-left-[4px] -bottom-[4px]', '-right-[4px] -bottom-[4px]'].map((pos) => (
          <span key={pos} className={`absolute size-[7px] rounded-[1px] border border-primary bg-white ${pos}`} />
        ))}
        <span className="absolute bottom-[calc(100%+6px)] left-0 font-mono text-[10px] leading-none tracking-normal text-primary sm:text-[11px]">{label}</span>
        {size.w > 0 && (
          <span className="absolute left-1/2 top-[calc(100%+7px)] flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-[4px] bg-primary px-1.5 py-[3px] font-mono text-[10px] font-medium leading-none tracking-normal text-white sm:text-[10.5px]">
            <NumberRoll value={size.w} format={{ useGrouping: false }} duration={700} />
            <span className="opacity-60">×</span>
            <NumberRoll value={size.h} format={{ useGrouping: false }} duration={700} />
          </span>
        )}
      </span>
    </span>
  );
}
