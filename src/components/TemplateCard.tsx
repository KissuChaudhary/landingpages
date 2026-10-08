'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface TemplateCardProps {
  slug: string;
  name: string;
  /** What it is, e.g. "AI writing tool landing page". */
  kind: string;
  price: string;
  href: string;
  /** Load the screenshot right away (for cards visible on first paint). */
  priority?: boolean;
}

const SCROLL_SPEED = 450; // px per second while hovered

/**
 * A screenshot, the name, what it is and the price. On a mouse, hovering scrolls the template's whole page
 * inside the frame; the tall image is only fetched on the first hover.
 */
export default function TemplateCard({ slug, name, kind, price, href, priority = false }: TemplateCardProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLImageElement>(null);
  const canScroll = useRef(false);
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    canScroll.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const measure = () => {
    if (frameRef.current && pageRef.current) setDistance(pageRef.current.offsetHeight - frameRef.current.offsetHeight);
  };

  const onEnter = () => {
    if (!canScroll.current) return;
    setRequested(true);
    if (ready) measure();
    setHovered(true);
  };

  const scrolling = hovered && ready;

  return (
    <Link href={href} className="group block" onPointerEnter={onEnter} onPointerLeave={() => setHovered(false)}>
      <div ref={frameRef} className="relative aspect-[16/10] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
        <img
          src={`/previews/card/${slug}.webp`}
          alt={`The ${name} landing page template`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        {requested && (
          <img
            ref={pageRef}
            src={`/previews/card-full/${slug}.jpg`}
            alt=""
            aria-hidden="true"
            decoding="async"
            onLoad={() => {
              measure();
              setReady(true);
            }}
            className={`absolute inset-x-0 top-0 w-full will-change-transform ${ready ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: `translate3d(0, ${scrolling ? -distance : 0}px, 0)`,
              transitionProperty: 'transform',
              transitionDuration: scrolling ? `${Math.max(distance / SCROLL_SPEED, 1.5)}s` : '0.9s',
              transitionTimingFunction: scrolling ? 'linear' : 'cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-base font-medium tracking-[-0.01em] text-neutral-950">{name}</h3>
        <span className="text-sm tabular-nums text-neutral-500">{price}</span>
      </div>
      <p className="mt-1 text-sm text-neutral-500">{kind}</p>
    </Link>
  );
}
