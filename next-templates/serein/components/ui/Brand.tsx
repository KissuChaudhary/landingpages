import { site } from "@/site.config";
export function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`brand ${className}`}>
      {site.brand}
      <sup>®</sup>
    </span>
  );
}
export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 0c1.5 8 4 10.5 12 12-8 1.5-10.5 4-12 12C10.5 16 8 13.5 0 12 8 10.5 10.5 8 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
