import Link from "next/link";
import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import { basePath, href, isExternal } from "@/lib/urls";
import { ArrowRight } from "@/components/ui/Icons";

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string; children: ReactNode };

/**
 * A link that does the right thing for its destination: client-side navigation between
 * pages, a plain anchor for in-page sections (smooth-scrolled by HashLinks) and a new tab
 * for other sites.
 */
export function SmartLink({ to, children, ...rest }: SmartLinkProps) {
  if (isExternal(to)) {
    const web = /^(https?:)?\/\//.test(to);
    return (
      <a {...rest} href={to} {...(web ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  if (to.includes("#") || basePath) {
    return (
      <a {...rest} href={href(to)}>
        {children}
      </a>
    );
  }
  return (
    <Link {...rest} href={to}>
      {children}
    </Link>
  );
}

/** A label whose letters roll up one after another when its link is hovered. */
export function Roll({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="roll" aria-hidden="true">
        {Array.from(text).map((c, i) => (
          <span className="roll-c" style={{ "--i": i } as CSSProperties} key={i}>
            <span>{c === " " ? " " : c}</span>
            <span>{c === " " ? " " : c}</span>
          </span>
        ))}
      </span>
    </>
  );
}

/** An arrow that leaves to the right on hover while a new one arrives from the left. */
export function ThrowArrow({ size = 16 }: { size?: number }) {
  return (
    <span className="throw" aria-hidden="true">
      <ArrowRight size={size} />
      <ArrowRight size={size} />
    </span>
  );
}

type ButtonProps = {
  to: string;
  label: string;
  tone?: "ink" | "ultra" | "line" | "white";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  className?: string;
};

/** The call to action: a pill whose label rolls on hover. Always a real link. */
export function Button({ to, label, tone = "ink", size = "md", arrow = true, className = "" }: ButtonProps) {
  return (
    <SmartLink to={to} className={`btn btn-${tone} ${size !== "md" ? `btn-${size}` : ""} ${className}`}>
      <Roll text={label} />
      {arrow && <ThrowArrow />}
    </SmartLink>
  );
}
