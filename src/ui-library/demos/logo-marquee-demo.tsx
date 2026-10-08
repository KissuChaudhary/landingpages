'use client';

import React from 'react';
import { LogoMarquee } from '../registry/logo-marquee';

// Made-up marks for the demo; use your customers' SVGs or images.
function Mark({ name, shape }: { name: string; shape: 'circle' | 'square' | 'triangle' | 'ring' | 'bars' | 'diamond' }) {
  const glyph = {
    circle: <circle cx="8" cy="8" r="6" fill="currentColor" />,
    square: <rect x="2.5" y="2.5" width="11" height="11" rx="3" fill="currentColor" />,
    triangle: <path d="M8 2.5 14 13.5H2Z" fill="currentColor" />,
    ring: <circle cx="8" cy="8" r="5.25" fill="none" stroke="currentColor" strokeWidth="2.5" />,
    bars: <path d="M3 3h2.5v10H3zM6.75 6h2.5v7h-2.5zM10.5 4.5H13V13h-2.5z" fill="currentColor" />,
    diamond: <path d="M8 1.5 14.5 8 8 14.5 1.5 8Z" fill="currentColor" />,
  }[shape];
  return (
    <span role="img" aria-label={name} className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.03em]">
      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-[18px]">
        {glyph}
      </svg>
      {name}
    </span>
  );
}

const LOGOS = [
  <Mark key="a" name="Northwind" shape="triangle" />,
  <Mark key="b" name="Fernhill" shape="circle" />,
  <Mark key="c" name="Quillon" shape="square" />,
  <Mark key="d" name="Arcfield" shape="ring" />,
  <Mark key="e" name="Bramble" shape="bars" />,
  <Mark key="f" name="Oakline" shape="diamond" />,
];

export default function LogoMarqueeDemo() {
  return (
    <div className="flex w-full max-w-[720px] flex-col items-center gap-6">
      <p className="text-[12.5px] text-muted-foreground">Trusted by teams who ship weekly</p>
      <LogoMarquee logos={LOGOS} />
    </div>
  );
}
