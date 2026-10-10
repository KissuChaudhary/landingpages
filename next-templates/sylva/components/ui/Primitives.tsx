import { ArrowUpRight, ArrowRight } from "lucide-react";
import { href } from "@/lib/urls";
export function Button({
  children,
  to,
  outline = false,
  className = "",
}: {
  children: React.ReactNode;
  to: string;
  outline?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href(to)}
      className={`button ${outline ? "button-outline" : ""} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight size={17} strokeWidth={1.5} />
    </a>
  );
}
export function TextLink({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  return (
    <a className="text-link" href={href(to)}>
      <span>{children}</span>
      <span className="arrow-circle">
        <ArrowRight size={18} strokeWidth={1.4} />
      </span>
    </a>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`section-heading ${centered ? "centered" : ""}`}
      data-reveal
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2>
        {title} <em>{accent}</em>
      </h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
