import { site } from "@/site.config";
import { href } from "@/lib/urls";

/** The Bounce mark: four pads, one of them lit. */
export function Mark({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
      <rect width="30" height="30" rx="9" fill="var(--ink)" />
      <rect x="7" y="7" width="7" height="7" rx="2" fill="#fff" />
      <rect x="16" y="7" width="7" height="7" rx="2" fill="var(--pink)" className="mark-lit" />
      <rect x="7" y="16" width="7" height="7" rx="2" fill="#fff" />
      <rect x="16" y="16" width="7" height="7" rx="2" fill="#fff" />
    </svg>
  );
}

export function Brand() {
  return (
    <a className="brand" href={href("/")} aria-label={`${site.brand} home`}>
      <Mark />
      <span>{site.brand.toLowerCase()}</span>
    </a>
  );
}
