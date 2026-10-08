import { site } from "@/site.config";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`brand-mark ${className}`}
      width="30"
      height="32"
      viewBox="0 0 30 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 2 28 25 15 30 2 25 15 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m15 2 0 28M2 25l13-9 13 9M15 16 8 13m7 3 7-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Brand() {
  return (
    <a className="brand" href="#top" aria-label={`${site.brand.name} home`}>
      <BrandMark />
      <span>{site.brand.name}</span>
    </a>
  );
}
