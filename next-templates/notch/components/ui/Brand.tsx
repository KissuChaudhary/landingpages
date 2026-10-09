import { site } from "@/site.config";
import { href } from "@/lib/urls";

/** The Notch mark: three counted strokes and the one that ties them off. */
export function Mark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="var(--blue)" />
      <g stroke="#fff" strokeWidth="2.3" strokeLinecap="round">
        <path d="M9 7.5v13M13 7.5v13M17 7.5v13" />
        <path d="M6.5 18.5 21.5 9.5" />
      </g>
    </svg>
  );
}

export function Brand({ className }: { className?: string }) {
  return (
    <a className={`brand${className ? ` ${className}` : ""}`} href={href("/")} aria-label={`${site.brand} home`}>
      <Mark />
      <span>{site.brand}</span>
    </a>
  );
}

/** Larger tally used as the hero badge. The strokes draw in one by one on load. */
export function TallyBadge() {
  const strokes = [9.5, 14.5, 19.5, 24.5];
  return (
    <span className="tally" aria-hidden="true">
      <svg width="34" height="34" viewBox="0 0 34 34">
        <g stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none">
          {strokes.map((x, i) => (
            <path key={x} d={`M${x} 7v20`} pathLength={1} style={{ "--i": i } as React.CSSProperties} />
          ))}
          <path className="tally-cross" d="M5 22.5 29 11.5" pathLength={1} style={{ "--i": 4 } as React.CSSProperties} />
        </g>
      </svg>
    </span>
  );
}
