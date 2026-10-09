import { ArrowUpRight } from "lucide-react";
export function Action({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "text";
  className?: string;
}) {
  const content = (
    <>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </>
  );
  const classes = `action action--${variant} ${className}`;
  return href ? (
    <a className={classes} href={href} onClick={onClick}>
      {content}
    </a>
  ) : (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
