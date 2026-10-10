import { site } from "@/site.config";
import { href } from "@/lib/urls";
export function LeafMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 58"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 54V19M24 43C8 43 3 29 8 17c13 0 19 9 16 26Zm0-9C40 34 45 20 40 8c-13 0-19 9-16 26ZM24 19C16 12 20 5 24 2c4 3 8 10 0 17Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="m11 22 13 18m13-27L24 31"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
export function Brand() {
  return (
    <a className="brand" href={href("/")} aria-label={`${site.brand} home`}>
      <LeafMark />
      <span>
        {site.brand}
        <small>{site.descriptor}</small>
      </span>
    </a>
  );
}
