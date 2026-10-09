import type { ReactNode } from "react";
import { ArrowRight, Sparkles, type LucideIcon } from "lucide-react";
export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`frame section ${className}`}>
      <div className="section-inner">{children}</div>
    </section>
  );
}
export function SectionHead({
  label,
  title,
  description,
  icon: Icon = Sparkles,
}: {
  label: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="section-head reveal">
      <span className="eyebrow">
        <Icon size={14} />
        {label}
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
export function Button({
  children,
  onClick,
  href,
  secondary = false,
  className = "",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  secondary?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const classes = `button ${secondary ? "button-secondary" : "button-glow"} ${className}`;
  const content = (
    <>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </>
  );
  return href ? (
    <a className={classes} href={href}>
      {content}
    </a>
  ) : (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
export function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="icon-tile">
      <Icon size={21} strokeWidth={1.8} />
    </span>
  );
}
