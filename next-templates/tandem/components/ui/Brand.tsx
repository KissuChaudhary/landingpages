import { site } from "@/site.config";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={`brand-mark ${className}`}
    >
      <path className="mark-left" d="M3 9h10v6H9v8H3V9Z" fill="currentColor" />
      <path
        className="mark-right"
        d="M19 9h10v14H19v-6h4v-2h-4V9Z"
        fill="currentColor"
      />
      <path d="M13 9h6v6h-6zM13 17h6v6h-6z" fill="currentColor" opacity=".38" />
    </svg>
  );
}

export function Brand() {
  return (
    <a href="#" className="brand" aria-label={`${site.brand.name} home`}>
      <BrandMark />
      <span>{site.brand.name}</span>
    </a>
  );
}
