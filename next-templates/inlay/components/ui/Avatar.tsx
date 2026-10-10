// A geometric avatar drawn from a name: a colour field, one large shape and one small one.
// The same name always gives the same avatar. Swap in photos with a plain <img> if you prefer.

const PALETTE = ["#2b3bff", "#ff3d2e", "#f3d33c", "#a9e5cb", "#d2cbff", "#0d0e12", "#c3d9ff", "#eceae3"];

export function Avatar({ name, size = 36, className = "" }: { name: string; size?: number; className?: string }) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const pick = (n: number) => {
    h = (Math.imul(h ^ (h >>> 15), 2246822507) + 0x9e3779b9) >>> 0;
    return (h >>> 8) % n;
  };
  const bg = PALETTE[pick(PALETTE.length)];
  let fg = PALETTE[pick(PALETTE.length)];
  if (fg === bg) fg = PALETTE[(PALETTE.indexOf(bg) + 3) % PALETTE.length];
  let ac = PALETTE[pick(PALETTE.length)];
  if (ac === bg || ac === fg) ac = bg === "#0d0e12" ? "#eceae3" : "#0d0e12";
  const kind = pick(4);
  return (
    <svg className={`avatar ${className}`} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" fill={bg} />
      {kind === 0 && (
        <>
          <circle cx="50" cy="100" r="50" fill={fg} />
          <circle cx="72" cy="30" r="12" fill={ac} />
        </>
      )}
      {kind === 1 && (
        <>
          <path d="M0 100 A100 100 0 0 1 100 0 L100 100Z" fill={fg} />
          <rect x="14" y="14" width="26" height="26" fill={ac} />
        </>
      )}
      {kind === 2 && (
        <>
          <rect x="0" y="50" width="100" height="50" fill={fg} />
          <circle cx="50" cy="50" r="22" fill={ac} />
        </>
      )}
      {kind === 3 && (
        <>
          <path d="M0 0 L100 100 L0 100Z" fill={fg} />
          <circle cx="70" cy="34" r="16" fill={ac} />
        </>
      )}
    </svg>
  );
}
