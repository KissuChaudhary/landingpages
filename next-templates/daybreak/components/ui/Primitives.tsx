import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
export function Frame({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`frame ${className}`}>
      <span className="corner corner-left" aria-hidden="true" />
      <span className="corner corner-right" aria-hidden="true" />
      {children}
    </section>
  );
}
export function SectionHead({
  label,
  title,
  text,
  level = 2,
  align = "center",
}: {
  label: string;
  title: string;
  text?: string;
  level?: 1 | 2;
  align?: "left" | "center";
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <header className={`section-head align-${align}`} data-reveal>
      <p className="eyebrow">{label}</p>
      <Heading>{title}</Heading>
      {text && <p className="section-description">{text}</p>}
    </header>
  );
}
export function ButtonLabel({ children }: { children: ReactNode }) {
  return (
    <span className="button-label">
      <span>{children}</span>
      <ArrowUpRight size={15} aria-hidden="true" />
    </span>
  );
}
export function Delayed({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      data-reveal
      style={{ "--delay": `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}
