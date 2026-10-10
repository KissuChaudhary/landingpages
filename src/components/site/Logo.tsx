import React from 'react';

/* The Hairline mark: four UI tiles fill a squircle, and the letter H exists only as the hairline seams between them —
 * two tall side tiles and a centre column split in two. At header size the seams render at about 1px: the H is
 * literally a hairline. Same geometry as scripts/brand-icons.mjs, which renders the favicons. */

const rr = (x: number, y: number, w: number, h: number, [a, b, c, d]: number[]) =>
  `M${x + a} ${y}H${x + w - b}Q${x + w} ${y} ${x + w} ${y + b}V${y + h - c}Q${x + w} ${y + h} ${x + w - c} ${y + h}H${x + d}Q${x} ${y + h} ${x} ${y + h - d}V${y + a}Q${x} ${y} ${x + a} ${y}Z`;

function tiles(seam: number) {
  const m = 7.5;
  const end = 64 - m;
  const mid = 14;
  const cx0 = 32 - mid / 2;
  const cx1 = 32 + mid / 2;
  const o = 9;
  const i = 1.2;
  return [
    rr(m, m, cx0 - seam - m, end - m, [o, i, i, o]),
    rr(cx1 + seam, m, end - cx1 - seam, end - m, [i, o, o, i]),
    rr(cx0, m, mid, 32 - seam / 2 - m, [i, i, i, i]),
    rr(cx0, 32 + seam / 2, mid, end - 32 - seam / 2, [i, i, i, i]),
  ];
}

const SQUIRCLE =
  'M32 1.5c13.6 0 21.4 0 25.9 4.6 4.6 4.5 4.6 12.3 4.6 25.9s0 21.4-4.6 25.9c-4.5 4.6-12.3 4.6-25.9 4.6s-21.4 0-25.9-4.6C1.5 53.4 1.5 45.6 1.5 32S1.5 10.6 6.1 6.1C10.6 1.5 18.4 1.5 32 1.5Z';

export function LogoMark({ size = 24, seam = 2.6, className = '' }: { size?: number; seam?: number; className?: string }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4b7cff" />
          <stop offset="1" stopColor="#1f3fbf" />
        </linearGradient>
        <linearGradient id={`${id}rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={`${id}tile`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d6e1ff" />
        </linearGradient>
      </defs>
      <path d={SQUIRCLE} fill={`url(#${id}bg)`} />
      <path d={SQUIRCLE} transform="translate(32 32) scale(.975) translate(-32 -32)" fill="none" stroke={`url(#${id}rim)`} strokeWidth="1.4" />
      {tiles(seam).map((d, i) => (
        <path key={i} d={d} fill={`url(#${id}tile)`} />
      ))}
    </svg>
  );
}
