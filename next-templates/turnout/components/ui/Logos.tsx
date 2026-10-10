// Fictional client wordmarks for the logo strip. Replace them with your clients' logos
// (SVGs inherit `currentColor`, so they turn grey in the strip and ink on hover).

type Logo = { name: string; glyph: React.ReactNode; style: string };

const glyph = (children: React.ReactNode, width = 22) => (
  <svg width={width} height="22" viewBox={`0 0 ${width} 22`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    {children}
  </svg>
);

export const logos: Logo[] = [
  { name: "HALFMOON", style: "logo-caps", glyph: glyph(<path d="M15 3.5a8 8 0 1 0 0 15 6.5 6.5 0 0 1 0-15Z" fill="currentColor" stroke="none" />) },
  { name: "northpaw", style: "logo-round", glyph: glyph(<><circle cx="11" cy="14" r="4.2" fill="currentColor" stroke="none" /><circle cx="5" cy="8.5" r="2" fill="currentColor" stroke="none" /><circle cx="9" cy="4.5" r="2" fill="currentColor" stroke="none" /><circle cx="14" cy="4.5" r="2" fill="currentColor" stroke="none" /><circle cx="18" cy="8.5" r="2" fill="currentColor" stroke="none" /></>) },
  { name: "Saltwork", style: "logo-serifish", glyph: glyph(<path d="M2 13c3-4 5-4 7 0s4 4 7 0 3-2 4-1" strokeLinecap="round" />) },
  { name: "Orbit Coffee", style: "logo-tight", glyph: glyph(<><circle cx="11" cy="11" r="4" fill="currentColor" stroke="none" /><ellipse cx="11" cy="11" rx="9.5" ry="4" transform="rotate(-20 11 11)" /></>) },
  { name: "Fernway", style: "logo-wide", glyph: glyph(<path d="M11 20V6m0 4-4-3m4 6 5-4m-5 8-5-3" strokeLinecap="round" />) },
  { name: "KILN & CO", style: "logo-mono", glyph: glyph(<path d="M3 19V11a8 8 0 0 1 16 0v8Z" />) },
  { name: "pebble", style: "logo-round", glyph: glyph(<ellipse cx="11" cy="12" rx="8.5" ry="6.5" fill="currentColor" stroke="none" />) },
  { name: "Loma", style: "logo-heavy", glyph: glyph(<path d="M3 17 9 6l4 7 2-3 4 7Z" fill="currentColor" stroke="none" />) },
  { name: "Sunday Soda", style: "logo-tight", glyph: glyph(<><circle cx="11" cy="11" r="4.5" /><path d="M11 1.5v3M11 17.5v3M1.5 11h3M17.5 11h3" strokeLinecap="round" /></>) },
  { name: "Juniper", style: "logo-serifish", glyph: glyph(<><circle cx="7" cy="14" r="3.2" fill="currentColor" stroke="none" /><circle cx="14" cy="8" r="3.2" fill="currentColor" stroke="none" /><circle cx="16" cy="16" r="2.4" fill="currentColor" stroke="none" /></>) },
];

export function LogoMark({ logo }: { logo: Logo }) {
  return (
    <span className={`logo ${logo.style}`}>
      {logo.glyph}
      <span>{logo.name}</span>
    </span>
  );
}
