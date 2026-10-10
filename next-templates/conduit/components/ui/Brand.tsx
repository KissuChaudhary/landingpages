import { site } from "@/site.config";
/** Two ports joined by one route: the conduit. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`brand-mark ${className}`}
      viewBox="0 0 22 22"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="7" height="7" fill="currentColor" />
      <rect x="14" y="14" width="7" height="7" fill="currentColor" />
      <path
        d="M8 4.5h8.5a1 1 0 0 1 1 1V14"
        fill="none"
        stroke="var(--signal)"
        strokeWidth="2"
      />
    </svg>
  );
}
export function Brand() {
  return (
    <span className="brand">
      <Mark />
      <span>{site.brand}</span>
    </span>
  );
}
export function SampleLogo({
  name,
  variant = 0,
}: {
  name: string;
  variant?: number;
}) {
  return (
    <span className={`sample-logo logo-${variant}`}>
      <span aria-hidden="true">{["✳", "↗", "◒", "〰"][variant % 4]}</span>
      {name}
    </span>
  );
}
