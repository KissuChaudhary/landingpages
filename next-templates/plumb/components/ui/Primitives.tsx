import Link from "next/link";
import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import { basePath, href, isExternal } from "@/lib/links";

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string; children: ReactNode };

/**
 * A link that does the right thing for where it goes: client-side navigation between
 * pages, a plain anchor for sections (glided by HashLinks), a new tab for other sites.
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

/** A label whose letters roll up one after another when its link or button is hovered. */
export function Roll({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="roll" aria-hidden="true">
        {Array.from(text).map((c, i) => (
          <span className="roll-c" style={{ "--i": i } as CSSProperties} key={i}>
            <span>{c === " " ? " " : c}</span>
            <span>{c === " " ? " " : c}</span>
          </span>
        ))}
      </span>
    </>
  );
}

export function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** An arrow that leaves to the right on hover while a new one arrives from the left. */
export function Throw({ size = 16 }: { size?: number }) {
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
  /** solid: the ink pill · line: a hairline pill · light: a white pill (on dark) */
  tone?: "solid" | "line" | "light";
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
};

/** The call to action: always a real link, with a rolling label and a thrown arrow. */
export function Button({ to, label, tone = "solid", size = "md", arrow = true, className = "" }: ButtonProps) {
  return (
    <SmartLink to={to} className={`btn btn-${tone} btn-${size} ${className}`}>
      <Roll text={label} />
      {arrow ? <Throw /> : null}
    </SmartLink>
  );
}

/** The small pill above section titles. */
export function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`tag ${className}`}>{children}</span>;
}
