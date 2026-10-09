import { useId } from "react";
import { site } from "@/site.config";
export function Mark({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg
      className={`brand-mark ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={id}
          x1="6"
          y1="36"
          x2="42"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#132e38" />
          <stop offset=".45" stopColor="#267284" />
          <stop offset="1" stopColor="#e2d0aa" />
        </linearGradient>
      </defs>
      <path
        d="M8 31c0-7 4-14 9-14 3 0 4 3 4 7V15c0-5 3-9 7-9s5 4 5 8v10c0-5 2-9 6-9 5 0 6 5 4 12-2 8-6 15-11 15-3 0-4-3-4-6-2 4-5 7-8 7-4 0-5-4-5-8-2 4-4 5-6 4-2-1-2-4-1-8Z"
        fill={`url(#${id})`}
        stroke="white"
        strokeWidth="1.8"
      />
    </svg>
  );
}
export function Brand() {
  return (
    <span className="brand">
      <Mark />
      <span>
        {site.brand.toLowerCase()}
        <span className="brand-period">.</span>
      </span>
    </span>
  );
}
