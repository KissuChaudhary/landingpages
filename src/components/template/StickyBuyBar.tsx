'use client';

import React, { useEffect, useState } from 'react';
import BuyButton from './BuyButton';

interface StickyBuyBarProps {
  name: string;
  price: string;
  checkout: string;
  /** id of the hero's buy area; the bar only appears once that has scrolled out of view */
  watchId: string;
}

/** Phones only: the price and buy button, pinned to the bottom once the hero's own button is gone. */
export default function StickyBuyBar({ name, price, checkout, watchId }: StickyBuyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [watchId]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/90 px-5 py-3 backdrop-blur-lg transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="min-w-0 truncate text-sm text-neutral-950">
          {name} <span className="text-neutral-500">· {price}</span>
        </p>
        <BuyButton href={checkout} className="h-10 px-5">
          Buy
        </BuyButton>
      </div>
    </div>
  );
}
