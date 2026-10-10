import type { CSSProperties, ReactNode } from "react";
import { href } from "@/lib/links";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={diagonal ? "arrow diagonal" : "arrow"}
    >
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function Mark() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M3 3h11v11H3zm15 0h11v11H18zM3 18h11v11H3zm15 0h11v11H18z" />
    </svg>
  );
}
export function Button({
  children,
  to,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  to: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <a href={href(to)} className={`button button-${variant} ${className}`}>
      <span>{children}</span>
      <span className="button-arrow">
        <Arrow diagonal />
      </span>
    </a>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow-square" aria-hidden="true" />
      {children}
    </p>
  );
}
export function Title({
  lines,
  className = "",
  as = "h2",
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2";
}) {
  const Tag = as;
  return (
    <Tag className={`section-title ${className}`}>
      {lines.map((line, i) => (
        <span
          className="wipe-line"
          data-reveal
          key={line}
          style={{ "--delay": `${i * 100}ms` } as CSSProperties}
        >
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
