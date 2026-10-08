import { site } from "@/site.config";

export function TempoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 24V14a8 8 0 0 1 16 0v10M16 6v20M7 18h18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function Brand() {
  return (
    <a className="brand" href="#top" aria-label={`${site.brand.name} home`}>
      <TempoMark />
      <span>
        {site.brand.name}
        <span className="brand-period">.</span>
      </span>
    </a>
  );
}
