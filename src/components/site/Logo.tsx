import React from 'react';

/* The Hairline mark: an H whose crossbar is a hairline, set in a blue squircle like an app icon. The two stems are the
 * library's tiles; the line between them is the whole idea. `bar` thickens the crossbar for tiny sizes. */
export function LogoMark({ size = 24, bar = 2.6, className = '' }: { size?: number; bar?: number; className?: string }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a7bff" />
          <stop offset="1" stopColor="#2343c4" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={`${id}-stem`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dce5ff" />
        </linearGradient>
      </defs>
      <path d="M32 1.5c13.6 0 21.4 0 25.9 4.6 4.6 4.5 4.6 12.3 4.6 25.9s0 21.4-4.6 25.9c-4.5 4.6-12.3 4.6-25.9 4.6s-21.4 0-25.9-4.6C1.5 53.4 1.5 45.6 1.5 32S1.5 10.6 6.1 6.1C10.6 1.5 18.4 1.5 32 1.5Z" fill={`url(#${id}-bg)`} />
      <path d="M32 2.25c13.4 0 21 0 25.4 4.35C61.75 11 61.75 18.6 61.75 32s0 21-4.35 25.4C53 61.75 45.4 61.75 32 61.75s-21 0-25.4-4.35C2.25 53 2.25 45.4 2.25 32s0-21 4.35-25.4C11 2.25 18.6 2.25 32 2.25Z" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.5" />
      <rect x="16" y="15" width="10" height="34" rx="5" fill={`url(#${id}-stem)`} />
      <rect x="38" y="15" width="10" height="34" rx="5" fill={`url(#${id}-stem)`} />
      <rect x="25" y={32 - bar / 2} width="14" height={bar} rx={bar / 2} fill="#fff" />
    </svg>
  );
}
