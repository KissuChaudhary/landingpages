'use client';

import { useEffect, useRef } from 'react';
import * as sfx from '../lib/sfx';

export type StampTone = 'alive' | 'dead' | 'ink';

/**
 * A rubber stamp. When `slam` flips to true it comes down hard (with a thud if sound is on).
 */
export default function Stamp({
  text,
  tone,
  slam,
  rotate = -8,
  size = 'md',
  className = '',
  style,
  sound = true,
}: {
  text: string;
  tone: StampTone;
  slam: boolean;
  rotate?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
  sound?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !slam || done.current) return;
    done.current = true;
    el.style.opacity = '1';
    el.animate(
      [
        { transform: `rotate(${rotate - 6}deg) scale(2.6)`, opacity: 0, filter: 'blur(6px)' },
        { transform: `rotate(${rotate}deg) scale(0.93)`, opacity: 1, filter: 'blur(0px)', offset: 0.62 },
        { transform: `rotate(${rotate}deg) scale(1.02)`, offset: 0.8 },
        { transform: `rotate(${rotate}deg) scale(1)`, opacity: 1 },
      ],
      { duration: 460, easing: 'cubic-bezier(.5,0,.2,1)' },
    );
    if (sound) window.setTimeout(() => sfx.thud(0.8), 270);
  }, [slam, rotate, sound]);

  return (
    <span
      ref={ref}
      className={`hv-stamp hv-stamp--${tone} hv-stamp--${size} ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, opacity: slam ? 1 : 0, ...style }}
      aria-hidden
    >
      {text}
    </span>
  );
}
