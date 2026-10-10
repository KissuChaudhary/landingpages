// Line icons on a 24px grid, drawn for this template. Paths marked pathLength="1" can draw in.

type P = { size?: number; className?: string };
const base = (size: number) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true });

export const ArrowRight = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={2} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowUpRight = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={2} className={className}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);
export const ArrowLeft = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={2} className={className}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
export const Check = ({ size = 14, className, draw }: P & { draw?: boolean }) => (
  <svg {...base(size)} strokeWidth={2.6} className={className}>
    <path className={draw ? "draw" : undefined} pathLength={draw ? 1 : undefined} d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
export const Plus = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={2} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Chevron = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={2} className={className}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
export const Pause = ({ size = 14, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
    <rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
  </svg>
);
export const Play = ({ size = 14, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path d="M7.5 4.8v14.4L19.5 12z" fill="currentColor" />
  </svg>
);
export const Spark = ({ size = 14, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path d="M12 2.5c.6 4.7 2.8 6.9 7.5 7.5-4.7.6-6.9 2.8-7.5 7.5-.6-4.7-2.8-6.9-7.5-7.5 4.7-.6 6.9-2.8 7.5-7.5z" fill="currentColor" />
  </svg>
);
export const Lock = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={1.8} className={className}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </svg>
);
export const Globe = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5z" />
  </svg>
);
export const Card = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="M3 10h18M7 15h3" />
  </svg>
);
export const Shield = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <path d="M12 3.5l7.5 3v5.2c0 4.3-3.1 7.6-7.5 8.8-4.4-1.2-7.5-4.5-7.5-8.8V6.5z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </svg>
);
export const Calendar = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <rect x="3.5" y="5" width="17" height="15" rx="3" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);
export const Bolt = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <path d="M13 3L5 13.5h6L10.5 21 19 10.5h-6z" />
  </svg>
);
export const Image = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="M20.5 15.5l-4.5-4.5-8.5 8.5" />
  </svg>
);
export const Video = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <rect x="3" y="6" width="13" height="12" rx="3" />
    <path d="M16 10.5l5-3v9l-5-3" />
  </svg>
);
export const Link = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={1.8} className={className}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </svg>
);
export const Bag = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <path d="M5 8h14l-1 12H6z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);
export const Mail = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);
export const Qr = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <rect x="4" y="4" width="6" height="6" rx="1.2" />
    <rect x="14" y="4" width="6" height="6" rx="1.2" />
    <rect x="4" y="14" width="6" height="6" rx="1.2" />
    <path d="M14 14h2v2M18 18h2v2h-2M14 20v-2M20 14h0" />
  </svg>
);
export const Sparkles = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <path d="M10 4c.5 3.6 2.4 5.5 6 6-3.6.5-5.5 2.4-6 6-.5-3.6-2.4-5.5-6-6 3.6-.5 5.5-2.4 6-6zM18 14.5c.3 1.7 1.1 2.5 2.8 2.8-1.7.3-2.5 1.1-2.8 2.8-.3-1.7-1.1-2.5-2.8-2.8 1.7-.3 2.5-1.1 2.8-2.8z" />
  </svg>
);
export const Wallet = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H17v3" />
    <rect x="4" y="7.5" width="16.5" height="12" rx="2.5" />
    <path d="M16 13.5h1.5" />
  </svg>
);
export const Badge = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <path d="M12 3l2.4 1.7 2.9-.1.9 2.8 2.3 1.8-.9 2.8.9 2.8-2.3 1.8-.9 2.8-2.9-.1L12 21l-2.4-1.7-2.9.1-.9-2.8-2.3-1.8.9-2.8-.9-2.8 2.3-1.8.9-2.8 2.9.1z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </svg>
);
export const Chat = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} className={className}>
    <path d="M5 18.5V7a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 19 7v6.5a2.5 2.5 0 0 1-2.5 2.5H8.5z" />
    <path d="M9 9.5h6M9 12.5h3.5" />
  </svg>
);
export const Percent = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.8} className={className}>
    <path d="M18 6L6 18" />
    <circle cx="7.5" cy="7.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
);
export const Menu = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.8} className={className}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

// Social glyphs for the footer.
export const Instagram = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={1.7}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
);
export const XLogo = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" />
  </svg>
);
export const Bluesky = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M6.3 4.3C8.6 6 11.1 9.5 12 11.4c.9-1.9 3.4-5.4 5.7-7.1 1.7-1.2 4.3-2.2 4.3.8 0 .6-.3 5-.5 5.7-.7 2.5-3.3 3.1-5.6 2.7 4 .7 5 3 2.8 5.2-4.2 4.3-6-1.1-6.5-2.5l-.2-.5-.2.5c-.5 1.4-2.3 6.8-6.5 2.5-2.2-2.2-1.2-4.5 2.8-5.2-2.3.4-4.9-.2-5.6-2.7C2.3 10.1 2 5.7 2 5.1c0-3 2.6-2 4.3-.8z" />
  </svg>
);
