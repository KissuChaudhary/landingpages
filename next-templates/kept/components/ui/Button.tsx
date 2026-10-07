import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const base =
  "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-[10px] font-medium outline-none " +
  "transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const solid = "h-12 bg-pine px-6 text-[15px] text-on-pine hover:bg-moss";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** The solid button: pine with light text. */
export function Button({ className, children, ...props }: LinkProps) {
  return (
    <a className={cn(base, solid, className)} {...props}>
      {children}
    </a>
  );
}

/** The solid button for use on the pine band: lime with dark text. */
export function LimeButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      className={cn(base, "h-12 cursor-pointer bg-lime px-6 text-[15px] font-semibold text-pine hover:bg-lime-deep focus-visible:ring-offset-pine", className)}
      {...props}
    >
      {children}
      <ArrowRight className="size-4" strokeWidth={2.25} />
    </button>
  );
}

/** A quiet text link with an arrow, for the second action. */
export function TextLink({ className, children, ...props }: LinkProps) {
  return (
    <a
      className={cn(
        "group inline-flex h-12 items-center gap-2 rounded-[10px] px-1 text-[15px] font-medium text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] outline-none transition-colors hover:decoration-ink focus-visible:ring-2 focus-visible:ring-moss",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
    </a>
  );
}
