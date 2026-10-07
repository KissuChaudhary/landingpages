/**
 * Seven wires that drop from the bottom line of the actions row onto the top edge of the product frame.
 * The SVG is exactly as wide as the frame (outer rails), so the landing points sit on the frame itself.
 * Strokes use non-scaling-stroke, so they stay one crisp pixel at any width.
 */
const ORIGIN_X = 520;
const LANDINGS = [90, 230, 380, 520, 660, 810, 950];

const path = (x: number) =>
  x === ORIGIN_X ? `M${ORIGIN_X} 0 V96` : `M${ORIGIN_X} 0 C${ORIGIN_X} 54 ${x} 40 ${x} 96`;

export function EnergyLines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1040 96"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 -top-24 h-24 w-full overflow-visible"
    >
      <defs>
        <linearGradient id="ember-pulse" x1="0" y1="0" x2="0" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--color-ember-200)", stopOpacity: 0 }} />
          <stop offset="0.35" style={{ stopColor: "var(--color-ember-200)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-ember-400)" }} />
        </linearGradient>
      </defs>

      {LANDINGS.map((x, i) => (
        <g key={x}>
          <path d={path(x)} style={{ stroke: "color-mix(in srgb, var(--color-ember-200) 16%, transparent)" }} strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
          <path
            d={path(x)}
            stroke="url(#ember-pulse)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="44 260"
            vectorEffect="non-scaling-stroke"
            className="animate-pulse-line motion-reduce:hidden"
            style={{ animationDelay: `${(i * 0.65) % 3.9}s` }}
          />
          <circle cx={x} cy="96" r="2" style={{ fill: "var(--color-ember-300)" }} opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}
