import { site } from "@/site.config";
import { href } from "@/lib/urls";
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3v3M5.64 5.64l2.12 2.12M3 12h3M18 12h3M16.24 7.76l2.12-2.12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M6.5 17a5.5 5.5 0 0 1 11 0H6.5Z" fill="currentColor" />
      <path
        d="M3 20h18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function Brand({ link = true }: { link?: boolean }) {
  const content = (
    <>
      <BrandMark />
      <span>{site.brand}</span>
    </>
  );
  return link ? (
    <a className="brand" href={href("/")} aria-label={`${site.brand} home`}>
      {content}
    </a>
  ) : (
    <span className="brand">{content}</span>
  );
}
export function CompanyMark({ kind }: { kind: string }) {
  return (
    <span className={`company-mark mark-${kind}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
