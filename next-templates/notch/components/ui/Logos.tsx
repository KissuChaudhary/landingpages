// Fictional customer marks for the logo strip. Replace with your customers' logos
// (SVG or image) and keep them a similar visual weight.

const glyphs: Record<string, React.ReactNode> = {
  Kiln: <path d="M3 21V11a9 9 0 0 1 18 0v10h-5v-9a4 4 0 0 0-8 0v9z" />,
  "Halden & Co": (
    <>
      <circle cx="9" cy="12" r="6.5" fill="none" strokeWidth="2.4" stroke="currentColor" />
      <circle cx="15" cy="12" r="6.5" fill="none" strokeWidth="2.4" stroke="currentColor" />
    </>
  ),
  Tessellate: <path d="M2 20 8 4l6 16zm8 0 6-16 6 16z" />,
  Ferro: <path d="m12 2 10 10-10 10L2 12zm0 6-4 4 4 4 4-4z" />,
  "Atlas Grey": (
    <>
      <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="2.4" stroke="currentColor" />
      <path d="M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19M3 12h18" fill="none" strokeWidth="2" stroke="currentColor" />
    </>
  ),
  Quarry: <path d="M3 5h18v3H3zm2 5.5h14v3H5zm2 5.5h10v3H7z" />,
  Plover: <path d="M2 16c4-8 9-11 20-11-4 2-6 5-7 9h-4c-1-2-4-2-9 2z" />,
  Morrow: <path d="M2 18a10 10 0 0 1 20 0zm0 2h20v2H2z" />,
};

export function CustomerLogo({ name }: { name: string }) {
  return (
    <span className="logo" aria-label={name} role="img">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {glyphs[name] ?? <rect x="3" y="3" width="18" height="18" rx="5" />}
      </svg>
      <span aria-hidden="true">{name}</span>
    </span>
  );
}
