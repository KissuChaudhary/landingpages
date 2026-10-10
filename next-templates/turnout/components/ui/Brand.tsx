import { site } from "@/site.config";

/** The Turnout mark: a ribbon that loops once, the same thread that runs through the page. */
export function Mark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={`mark ${className}`} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="var(--lime)" />
      <path
        d="M6 28c6 2 11-1 14-6s7-11 3-13-8 3-5 8 10 5 16 0"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Mark and name together, as in the navigation and footer. */
export function Brand({ size = 30 }: { size?: number }) {
  return (
    <span className="brand">
      <Mark size={size} />
      <span className="brand-name">{site.brand}</span>
    </span>
  );
}
