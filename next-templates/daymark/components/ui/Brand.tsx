import { site } from "@/site.config";
import { href } from "@/lib/urls";
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="11" fill="currentColor" />
      <path d="M12 11h7v18h-7zm9 0h7v7h-7zm0 11h7v7h-7z" fill="var(--ink)" />
    </svg>
  );
}
export function Brand() {
  return (
    <a className="brand" href={href("/")} aria-label={site.brand + " home"}>
      <Mark />
      <span>{site.brand}</span>
    </a>
  );
}
