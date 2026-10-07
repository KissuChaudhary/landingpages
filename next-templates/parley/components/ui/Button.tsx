import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const base =
  "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold outline-none " +
  "transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const solid = "h-12 bg-ink px-7 text-[15px] text-paper hover:bg-plum";
const outline = "h-12 border border-line-strong px-7 text-[15px] text-ink hover:bg-blush";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** The solid pill: ink on paper. */
export function Button({ className, children, ...props }: LinkProps) {
  return (
    <a className={cn(base, solid, className)} {...props}>
      {children}
    </a>
  );
}

/** The outlined pill, for the second action next to a solid one. */
export function OutlineButton({ className, children, ...props }: LinkProps) {
  return (
    <a className={cn(base, outline, className)} {...props}>
      {children}
    </a>
  );
}

export function SubmitButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="submit" className={cn(base, solid, "cursor-pointer", className)} {...props}>
      {children}
      <ArrowRight className="size-4" strokeWidth={2.25} />
    </button>
  );
}
