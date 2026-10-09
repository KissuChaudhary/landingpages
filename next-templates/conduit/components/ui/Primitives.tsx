import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
export function Button({
  children,
  href,
  onClick,
  variant = "solid",
  type = "button",
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "light";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const content = (
    <>
      <ArrowRight size={17} className="button-arrow" aria-hidden="true" />
      <span className="button-text">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </>
  );
  const classes = `button button-${variant} ${className}`;
  return href ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
export function Label({ children }: { children: ReactNode }) {
  return (
    <p className="section-label">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
export function SectionHead({
  label,
  title,
  centered = false,
  children,
  level = 2,
}: {
  label: string;
  title: string;
  centered?: boolean;
  children?: ReactNode;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className={`section-head ${centered ? "centered" : ""}`} data-reveal>
      <Label>{label}</Label>
      <Heading>{title}</Heading>
      {children}
    </div>
  );
}
export function Frame({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={`frame ${className}`} id={id}>
      <span className="frame-corner top-left" aria-hidden="true" />
      <span className="frame-corner top-right" aria-hidden="true" />
      {children}
    </section>
  );
}
