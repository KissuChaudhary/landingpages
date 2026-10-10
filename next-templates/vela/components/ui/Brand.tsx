import { site } from "@/site.config";
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`brand-mark ${className}`}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 5h10l5 10 5-10h10L18 33 3 5Z" fill="currentColor" />
      <path
        d="m13 5 5 10 5-10M8 14h20"
        stroke="var(--mark-cut, #f85b3d)"
        strokeWidth="2"
      />
    </svg>
  );
}
export function Brand() {
  return (
    <span className="brand">
      <BrandMark />
      {site.brand}
      <span className="brand-dot">®</span>
    </span>
  );
}
