import type { SVGProps } from "react";

// Small stroke icons drawn on a 24px grid. They inherit the text colour.

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: IconProps) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const ArrowUpRight = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowLeft = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M19 12H5m6-6-6 6 6 6" />
  </svg>
);

export const ArrowUp = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M12 19V5m-6 6 6-6 6 6" />
  </svg>
);

/** A check that draws itself when its parent gets .is-in or .is-on (see .draw in base.css). */
export const Check = ({ size = 16, ...props }: IconProps) => (
  <svg {...base(size, props)} strokeWidth={2.4}>
    <path className="draw" pathLength={1} d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Cross = ({ size = 16, ...props }: IconProps) => (
  <svg {...base(size, props)} strokeWidth={2.4}>
    <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
  </svg>
);

export const Plus = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Pause = ({ size = 14, ...props }: IconProps) => (
  <svg {...base(size, props)} fill="currentColor" stroke="none">
    <rect x="6" y="5" width="4" height="14" rx="1.2" />
    <rect x="14" y="5" width="4" height="14" rx="1.2" />
  </svg>
);

export const Play = ({ size = 14, ...props }: IconProps) => (
  <svg {...base(size, props)} fill="currentColor" stroke="none">
    <path d="M8 5.6v12.8a1 1 0 0 0 1.5.86l10.2-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6Z" />
  </svg>
);

/** A four-point sparkle, filled. */
export const Spark = ({ size = 14, ...props }: IconProps) => (
  <svg {...base(size, props)} fill="currentColor" stroke="none">
    <path d="M12 1.5c.7 4.6 2.2 6.4 6.9 7.6.6.2.6 1 0 1.2-4.7 1.2-6.2 3-6.9 7.6-.1.7-1.1.7-1.2 0-.7-4.6-2.2-6.4-6.9-7.6-.6-.2-.6-1 0-1.2 4.7-1.2 6.2-3 6.9-7.6.1-.7 1.1-.7 1.2 0Z" transform="translate(.6 2.4)" />
  </svg>
);

export const Star = ({ size = 14, ...props }: IconProps) => (
  <svg {...base(size, props)} fill="currentColor" stroke="none">
    <path d="M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.9l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 2.8Z" />
  </svg>
);

export const Instagram = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
  </svg>
);

export const TikTok = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M14 3.5v11.2a3.8 3.8 0 1 1-3.8-3.8M14 3.5c.4 2.6 2.2 4.4 5 4.6" />
  </svg>
);

export const LinkedIn = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5m0 2.3c0-1.5 1-2.4 2.3-2.4s2.2.9 2.2 2.4V16" />
  </svg>
);

// Process steps. Each path draws itself when its card comes into view.
const processPaths = {
  spark: ["M12 3v4M12 17v4M3 12h4M17 12h4", "M6.3 6.3l2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4"],
  build: ["M4 20h16", "M6 20V9l6-5 6 5v11", "M10 20v-5h4v5"],
  ticket: ["M4 8a2 2 0 0 0 2-2h12a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4Z", "M14 7v10"],
  glow: ["M12 4a5 5 0 0 1 3 9v2H9v-2a5 5 0 0 1 3-9Z", "M9.5 18h5M10.5 21h3"],
} as const;

export type ProcessIcon = keyof typeof processPaths;

export const ProcessGlyph = ({ name, size = 28 }: { name: string; size?: number }) => (
  <svg {...base(size, {})} strokeWidth={1.8}>
    {(processPaths[name as ProcessIcon] ?? processPaths.spark).map((d, i) => (
      <path key={i} className="draw" pathLength={1} d={d} style={{ transitionDelay: `${200 + i * 160}ms` }} />
    ))}
  </svg>
);
