import Link from "next/link";
import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import { site } from "@/site.config";
import { basePath, href, isExternal } from "@/lib/urls";
import { ArrowUpRight } from "@/components/ui/Icons";

/** Where "Plan an event" goes: the booking page when there is one, otherwise the contact page. */
export const planHref = () => site.links.booking || "/contact";

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string; children: ReactNode; ariaLabel?: string };

/**
 * A link that does the right thing for its destination: client-side navigation between
 * pages, a plain anchor for in-page sections (smooth-scrolled by HashLinks), and a new tab
 * for other sites.
 */
export function SmartLink({ to, children, ariaLabel, ...rest }: SmartLinkProps) {
  if (isExternal(to)) {
    const web = /^(https?:)?\/\//.test(to);
    return (
      <a {...rest} href={to} aria-label={ariaLabel} {...(web ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  if (to.includes("#") || basePath) {
    return (
      <a {...rest} href={href(to)} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link {...rest} href={to} aria-label={ariaLabel}>
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
            <span>{c === " " ? " " : c}</span>
            <span>{c === " " ? " " : c}</span>
          </span>
        ))}
      </span>
    </>
  );
}

/** The arrow inside the round button: on hover it leaves to the top right and a new one arrives. */
export function ThrowArrow({ size = 18 }: { size?: number }) {
  return (
    <span className="throw" aria-hidden="true">
      <ArrowUpRight size={size} />
      <ArrowUpRight size={size} />
    </span>
  );
}

type ActionProps = {
  to: string;
  label: string;
  /** ink: dark pill · light: white pill · lime: lime pill */
  tone?: "ink" | "light" | "lime";
  size?: "md" | "lg";
  className?: string;
};

/** The call to action: a pill and a round arrow that move together. Always a real link. */
export function Action({ to, label, tone = "ink", size = "md", className = "" }: ActionProps) {
  return (
    <SmartLink to={to} className={`action action-${tone} action-${size} ${className}`}>
      <span className="action-pill">
        <Roll text={label} />
      </span>
      <span className="action-dot">
        <ThrowArrow />
      </span>
    </SmartLink>
  );
}

/** A round arrow button on its own, for cards and headers. */
export function ArrowDot({ tone = "lime", size = 44 }: { tone?: "lime" | "light" | "ink"; size?: number }) {
  return (
    <span className={`arrow-dot arrow-dot-${tone}`} style={{ width: size, height: size }} aria-hidden="true">
      <ThrowArrow size={Math.round(size * 0.4)} />
    </span>
  );
}
