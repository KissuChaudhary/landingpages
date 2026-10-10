import type { CSSProperties } from "react";
const colors = [
  ["#ceffe0", "#7ccbaa", "#a0e9c4"],
  ["#d3ccff", "#8980bb", "#b0a7e7"],
  ["#cfdefa", "#7c94b8", "#a6bbde"],
];
/** A code-native isometric sculpture: no texture downloads, video or canvas loop. */
export function Sculpture({
  variant = 0,
  compact = false,
}: {
  variant?: number;
  compact?: boolean;
}) {
  const tiles = Array.from({ length: 49 }, (_, i) => {
    const col = i % 7;
    const row = Math.floor(i / 7);
    const distance = Math.abs(col - 3) + Math.abs(row - 3);
    const height = compact
      ? variant === 2
        ? 18 + col * 15
        : variant === 1
          ? 70
          : 50 + Math.sin(col) * 15
      : 26 + (6 - distance) * 13;
    const x = 300 + (col - row) * 32;
    const y = 245 + (col + row) * 18 - height;
    const palette =
      colors[
        compact
          ? variant % colors.length
          : (Math.floor(col / 2) + variant) % colors.length
      ];
    const visible =
      !compact ||
      variant === 2 ||
      (variant === 1
        ? col === 0 || row === 0 || col === 6 || row === 6
        : Math.abs(col - row) <= 1);
    return { x, y, height, palette, i, distance, visible };
  }).filter((tile) => tile.visible);
  return (
    <div
      className={`sculpture ${compact ? "sculpture-compact" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 600 610" fill="none" className="sculpture-svg">
        <g
          className="sculpture-scaffold"
          stroke="currentColor"
          strokeWidth="0.75"
        >
          <path d="M70 365 300 232 530 365 300 498Z" />
          <path d="M70 400 300 267 530 400 300 533Z" />
          <path d="M300 102v440M70 232v200M530 232v200" strokeDasharray="3 7" />
          <circle cx="300" cy="102" r="4" />
          <circle cx="70" cy="365" r="4" />
          <circle cx="530" cy="365" r="4" />
        </g>
        <g className="sculpture-tiles">
          {tiles.map(({ x, y, height: h, palette: p, i, distance }) => (
            <g
              className="sculpture-tile"
              key={i}
              style={
                {
                  "--tile-delay": `${i * -0.19}s`,
                  "--tile-lift": `${8 + distance * 2}px`,
                } as CSSProperties
              }
            >
              <path
                d={`M${x - 29} ${y}l29 17v${h}l-29 -17Z`}
                fill={p[1]}
                stroke="#101b2a"
                strokeWidth="1.2"
              />
              <path
                d={`M${x} ${y + 17}l29 -17v${h}l-29 17Z`}
                fill={p[2]}
                stroke="#101b2a"
                strokeWidth="1.2"
              />
              <path
                d={`M${x} ${y - 17}l29 17-29 17-29 -17Z`}
                fill={p[0]}
                stroke="#101b2a"
                strokeWidth="1.2"
              />
              <path
                d={`M${x - 23} ${y}l23 -13 23 13`}
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="0.8"
              />
            </g>
          ))}
        </g>
        {!compact && (
          <g
            fill="currentColor"
            className="sculpture-coordinates"
            fontSize="9"
            fontFamily="monospace"
          >
            <text x="48" y="220">
              X / 01
            </text>
            <text x="504" y="220">
              Y / 07
            </text>
            <text x="276" y="570">
              CONNECTED
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
