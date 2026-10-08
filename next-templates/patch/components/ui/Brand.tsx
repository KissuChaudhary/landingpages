import { site } from "@/site.config";
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11 6H6v20h5M21 6h5v20h-5M13 13h6v6h-6z"
        stroke="currentColor"
        strokeWidth="2.1"
      />
    </svg>
  );
}
export function Brand({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand ${small ? "brand-small" : ""}`}>
      <Mark />
      <span>
        {site.brand.name}
        <span className="brand-stop">.</span>
      </span>
    </span>
  );
}
