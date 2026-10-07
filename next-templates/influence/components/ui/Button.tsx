import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const base =
  "inline-flex shrink-0 select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold outline-none " +
  "transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** The solid pill: near-black with white text. */
export function Button({ className, children, ...props }: LinkProps) {
  return (
    <a className={cn(base, "h-14 bg-ink px-8 text-[16px] text-white hover:bg-[#2b2b2b]", className)} {...props}>
      {children}
    </a>
  );
}

/** The white pill with a hairline, for the second action. */
export function GhostButton({ className, children, ...props }: LinkProps) {
  return (
    <a className={cn(base, "h-14 border border-line-strong bg-sheet px-8 text-[16px] text-ink hover:border-ink", className)} {...props}>
      {children}
    </a>
  );
}

/** The orange pill, for use on the dark band. */
export function OrangeButton({ className, children, ...props }: LinkProps) {
  return (
    <a className={cn(base, "h-14 bg-orange px-8 text-[16px] text-ink hover:bg-orange-deep focus-visible:ring-offset-night", className)} {...props}>
      {children}
    </a>
  );
}
