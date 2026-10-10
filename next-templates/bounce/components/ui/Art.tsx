import type { CSSProperties } from "react";

/** Abstract cover art for a track: two colours, a soft orb and a ring. Pure CSS, so it costs nothing to load. */
export function Cover({ colors, className, label }: { colors: string[]; className?: string; label?: string }) {
  return (
    <span className={`cover${className ? ` ${className}` : ""}`} style={{ "--a": colors[0], "--b": colors[1] } as CSSProperties} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <i />
    </span>
  );
}

/** A static waveform strip, drawn from a seed so every track has its own shape. */
export function Waveform({ seed, bars = 48, className }: { seed: number; bars?: number; className?: string }) {
  let s = seed * 7919 + 13;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const heights = Array.from({ length: bars }, (_, i) => {
    const swell = Math.sin((i / bars) * Math.PI) * 0.55 + 0.35;
    return Math.max(0.12, Math.min(1, swell * (0.6 + rnd() * 0.6)));
  });
  return (
    <svg className={`wave${className ? ` ${className}` : ""}`} viewBox={`0 0 ${bars * 4} 40`} preserveAspectRatio="none" aria-hidden="true">
      {heights.map((h, i) => (
        <rect key={i} x={i * 4 + 0.6} y={20 - h * 18} width="2.4" height={h * 36} rx="1.2" />
      ))}
    </svg>
  );
}
