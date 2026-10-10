import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { path } from "@/lib/urls";
export function Button({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: string;
  tone?: "dark" | "light" | "outline";
  className?: string;
}) {
  return (
    <a className={`button button-${tone} ${className}`} href={path(href)}>
      <span className="button-label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      <span className="button-icon">
        <ArrowUpRight size={16} aria-hidden="true" />
      </span>
    </a>
  );
}
export function SectionHead({
  label,
  heading,
  text,
  align = "center",
}: {
  label: string;
  heading: string[];
  text?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`section-head align-${align} reveal`}>
      <span className="eyebrow">
        <i />
        {label}
      </span>
      <h2>
        {heading.map((line, i) => (
          <span key={line} className={i > 0 ? "muted-heading" : ""}>
            {line}
          </span>
        ))}
      </h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
export function Avatar({
  initials,
  tone = "sage",
}: {
  initials: string;
  tone?: string;
}) {
  return <span className={`avatar tone-${tone}`}>{initials}</span>;
}
