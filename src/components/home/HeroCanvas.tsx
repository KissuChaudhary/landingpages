'use client';

import React from 'react';

/* The hero sits on a design canvas: a faint hairline grid, rulers along the top and left edges with zero at the page's
 * centre, and two guides that follow the pointer with their coordinates on the rulers, the way a design tool shows them.
 * Mouse only; touch screens get the still canvas. Purely decorative, so it's hidden from assistive tech. */

const STEP = 64; // grid and major ticks
const LABEL_EVERY = 128;

export default function HeroCanvas() {
  const root = React.useRef<HTMLDivElement>(null);
  const vGuide = React.useRef<HTMLDivElement>(null);
  const hGuide = React.useRef<HTMLDivElement>(null);
  const xTag = React.useRef<HTMLSpanElement>(null);
  const yTag = React.useRef<HTMLSpanElement>(null);
  const [width, setWidth] = React.useState(1440);
  const [height, setHeight] = React.useState(880);

  React.useEffect(() => {
    const el = root.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const resize = new ResizeObserver(() => {
      setWidth(el.clientWidth);
      setHeight(el.clientHeight);
    });
    resize.observe(el);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let target = { x: 0, y: 0 };
    let at = { x: 0, y: 0 };
    let shown = false;
    let frame = 0;
    const paint = () => {
      frame = 0;
      const k = reduced ? 1 : 0.22;
      at = { x: at.x + (target.x - at.x) * k, y: at.y + (target.y - at.y) * k };
      const cx = el.clientWidth / 2;
      if (vGuide.current) vGuide.current.style.transform = `translateX(${at.x}px)`;
      if (hGuide.current) hGuide.current.style.transform = `translateY(${at.y}px)`;
      if (xTag.current) {
        xTag.current.style.transform = `translateX(${at.x}px) translateX(-50%)`;
        xTag.current.textContent = String(Math.round(at.x - cx));
      }
      if (yTag.current) {
        yTag.current.style.transform = `translateY(${at.y}px) translateY(-50%) rotate(-90deg)`;
        yTag.current.textContent = String(Math.round(at.y));
      }
      if (Math.abs(target.x - at.x) > 0.3 || Math.abs(target.y - at.y) > 0.3) frame = requestAnimationFrame(paint);
    };
    const show = (on: boolean) => {
      if (shown === on) return;
      shown = on;
      el.dataset.guides = on ? 'on' : 'off';
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      if (!inside) return show(false);
      if (!shown) at = { x, y };
      target = { x, y };
      show(true);
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => show(false);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      resize.disconnect();
      cancelAnimationFrame(frame);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // Ruler numbers, every 128px out from the centre.
  const half = Math.ceil(width / 2 / LABEL_EVERY) + 1;
  const xLabels = Array.from({ length: half * 2 + 1 }, (_, i) => (i - half) * LABEL_EVERY);
  const yLabels = Array.from({ length: Math.ceil(height / LABEL_EVERY) }, (_, i) => (i + 1) * LABEL_EVERY);

  return (
    <div ref={root} aria-hidden="true" data-guides="off" className="hero-canvas pointer-events-none absolute inset-x-0 top-0 h-[880px] select-none">
      <div className="hero-grid absolute inset-0" />

      {/* Top ruler */}
      <div className="hero-ruler-x absolute inset-x-0 top-0 h-6">
        {xLabels.map((v) => (
          <span key={v} className="absolute top-[3px] font-mono text-[9.5px] leading-none text-[#b5b6be]" style={{ left: `calc(50% + ${v}px + 3px)` }}>
            {v}
          </span>
        ))}
      </div>

      {/* Left ruler (wide screens) */}
      <div className="hero-ruler-y absolute bottom-0 left-0 top-6 hidden w-6 lg:block">
        {yLabels.map((v) => (
          <span key={v} className="absolute left-[3px] origin-top-left font-mono text-[9.5px] leading-none text-[#b5b6be]" style={{ top: v + 18, transform: 'rotate(-90deg)' }}>
            {v}
          </span>
        ))}
      </div>
      <span className="absolute left-0 top-0 hidden size-6 border-b border-r border-black/[0.06] bg-white lg:block" />

      {/* Guides */}
      <div ref={vGuide} className="hero-guide absolute bottom-0 left-0 top-6 w-px bg-primary/30" />
      <div ref={hGuide} className="hero-guide absolute left-0 right-0 top-0 h-px bg-primary/30 lg:left-6" />
      <span ref={xTag} className="hero-guide absolute left-0 top-[5px] rounded-[3px] bg-primary px-1 py-px font-mono text-[9.5px] leading-[12px] text-white tabular-nums" />
      <span ref={yTag} className="hero-guide absolute left-[5px] top-0 hidden origin-center rounded-[3px] bg-primary px-1 py-px font-mono text-[9.5px] leading-[12px] text-white tabular-nums lg:block" />
    </div>
  );
}
