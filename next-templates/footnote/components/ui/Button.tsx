import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const base =
  "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap font-medium outline-none " +
  "transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const primary = "h-11 rounded-lg bg-text px-5 text-[15px] text-bg hover:bg-white";

/** The solid button: warm white on graphite, square-ish corners. Renders a link, or a <button> when `type` is set. */
export function Button({
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a className={cn(base, primary, className)} {...props}>
      {children}
    </a>
  );
}

export function SubmitButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="submit" className={cn(base, primary, "cursor-pointer", className)} {...props}>
      {children}
    </button>
  );
}

/** A quiet text link with an arrow, for the secondary action. */
export function TextLink({ className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      className={cn(
        "group inline-flex h-11 items-center gap-2 rounded-lg px-1 text-[15px] font-medium text-text-mid outline-none transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
    </a>
  );
}
