import { site } from "@/site.config";
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 10h17l9 10-9 10H7l9-10z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M16 10v20" stroke="currentColor" strokeWidth="3.5" />
    </svg>
  );
}
export function Brand() {
  return (
    <a className="brand" href="#top" aria-label={`${site.brand} home`}>
      <Mark />
      <span>{site.brand}</span>
    </a>
  );
}
