import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";

export function Button({
  children,
  className = "",
  light = false,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { light?: boolean }) {
  return (
    <a
      {...props}
      className={`button ${light ? "button-light" : ""} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
