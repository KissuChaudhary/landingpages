import type { CSSProperties, ReactNode } from "react";
import { site } from "@/site.config";
import { home } from "@/lib/links";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={diagonal ? "arrow diagonal" : "arrow"}
    >
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 30 13-23h6L11 30H5ZM17 30l9-16 9 16h-6l-3-5-3 5h-6Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function Brand() {
  return (
    <a className="brand" href={home()} aria-label={`${site.name} home`}>
      <Mark />
      <span>{site.name.toLowerCase()}</span>
    </a>
  );
}
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  className?: string;
}) {
  return (
    <a href={href} className={`button button-${variant} ${className}`}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}
export function Label({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span aria-hidden="true" className="label-mark" />
      {children}
    </p>
  );
}
export function Title({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <h2 className={`section-title ${className}`} data-title>
      {lines.map((line, i) => (
        <span className="title-line" key={line}>
          {line.split(" ").map((word, j) => (
            <span
              className="title-word"
              key={j}
              style={{ "--word": i * 5 + j } as CSSProperties}
            >
              {word}
              {j < line.split(" ").length - 1 ? "\u00a0" : ""}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}
export function Check() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m4 10 4 4 8-8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
