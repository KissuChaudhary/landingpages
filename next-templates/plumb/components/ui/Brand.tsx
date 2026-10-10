import { site } from "@/site.config";

/**
 * The Plumb mark: a plumb line and its bob. The bob swings on its line when the brand is
 * hovered (styles in app/globals.css, .mark-bob). Swap the paths for your own mark; the
 * favicon is public/icon.svg.
 */
export function Mark({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={`mark ${className}`} width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <g className="mark-bob">
        <path d="M11 1.5v11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="11" cy="16.5" r="4.6" fill="var(--signal)" />
      </g>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand ${className}`}>
      <Mark />
      <span className="brand-name">{site.brand.name}</span>
    </span>
  );
}
