import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost";
type Size = "md" | "sm";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  /** Show the arrow disc. On by default for primary and light. */
  arrow?: boolean;
};

const base =
  "group inline-flex shrink-0 select-none items-center justify-center gap-3 whitespace-nowrap rounded-full font-medium " +
  "tracking-[-0.005em] outline-none transition-[background-color,border-color,color,box-shadow,transform] duration-300 " +
  "focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:translate-y-px";

const sizes: Record<Size, { solid: string; plain: string }> = {
  md: { solid: "h-12 pl-6 pr-1.5 text-[15px]", plain: "h-12 px-7 text-[15px]" },
  sm: { solid: "h-10 pl-5 pr-1 text-[14px]", plain: "h-10 px-5 text-[14px]" },
};

const variants: Record<Variant, string> = {
  // The template's signature button: black pill, white disc with an arrow.
  primary: "bg-ink text-on-ink shadow-[0_10px_24px_-10px_rgb(23_20_15/0.6)] hover:bg-[#2b2620]",
  secondary: "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-paper-raised",
  // For dark surfaces.
  light: "bg-on-ink text-ink hover:bg-white focus-visible:ring-on-ink focus-visible:ring-offset-ink",
  ghost:
    "border border-line-on-ink bg-transparent text-on-ink hover:border-on-ink/60 hover:bg-white/[0.06] focus-visible:ring-on-ink focus-visible:ring-offset-ink",
};

const discs: Partial<Record<Variant, string>> = {
  primary: "bg-on-ink text-ink",
  light: "bg-ink text-on-ink",
};

export function Button({ variant = "primary", size = "md", arrow, className, children, ...props }: ButtonProps) {
  const disc = discs[variant];
  const showArrow = (arrow ?? Boolean(disc)) && Boolean(disc);
  const dimension = size === "sm" ? "size-8" : "size-9";

  return (
    <a className={cn(base, showArrow ? sizes[size].solid : sizes[size].plain, variants[variant], className)} {...props}>
      <span>{children}</span>
      {showArrow ? (
        <span
          aria-hidden
          className={cn(
            "grid place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105",
            dimension,
            disc,
          )}
        >
          <ArrowRight className={size === "sm" ? "size-3.5" : "size-4"} strokeWidth={2.25} />
        </span>
      ) : null}
    </a>
  );
}
