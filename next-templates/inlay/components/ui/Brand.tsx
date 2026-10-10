import { site } from "@/site.config";

/** The mark: four tiles, the top-right one still settling. Swap it for your own logo here. */
export function Mark({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={`mark ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="1.5" width="9.5" height="9.5" rx="2.6" fill="currentColor" />
      <rect className="mark-free" x="13" y="1.5" width="9.5" height="9.5" rx="2.6" fill="var(--ultra)" />
      <rect x="1.5" y="13" width="9.5" height="9.5" rx="2.6" fill="currentColor" />
      <rect x="13" y="13" width="9.5" height="9.5" rx="2.6" fill="currentColor" />
    </svg>
  );
}

export function Brand({ size = 24 }: { size?: number }) {
  return (
    <span className="brand">
      <Mark size={size} />
      <span className="brand-name">{site.brand}</span>
    </span>
  );
}
