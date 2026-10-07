import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost";
type Size = "md" | "sm";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

const base =
  "group inline-flex shrink-0 select-none items-center justify-center gap-3 whitespace-nowrap rounded-full font-semibold " +
  "tracking-[-0.01em] outline-none transition-[background-color,border-color,color,transform] duration-300 " +
  "focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:translate-y-px";

const sizes: Record<Size, { solid: string; plain: string; disc: string; icon: string }> = {
  md: { solid: "h-13 pl-7 pr-1.5 text-[16px]", plain: "h-13 px-7 text-[16px]", disc: "size-10", icon: "size-[18px]" },
  sm: { solid: "h-10 pl-5 pr-1 text-[14px]", plain: "h-10 px-5 text-[14px]", disc: "size-8", icon: "size-4" },
};

// The signature: a solid pill with a white disc, and the arrow in the disc turns on hover. No shadows.
const variants: Record<Variant, { cls: string; disc?: string }> = {
  primary: { cls: "bg-ink text-on-ink hover:bg-ink-raised", disc: "bg-paper text-ink" },
  light: {
    cls: "bg-paper text-ink hover:bg-wash focus-visible:ring-paper focus-visible:ring-offset-ink",
    disc: "bg-ink text-on-ink",
  },
  secondary: { cls: "border border-line-strong bg-paper text-text hover:border-text hover:bg-wash" },
  ghost: {
    cls: "border border-ink-line bg-transparent text-on-ink hover:border-on-ink/60 hover:bg-white/[0.06] focus-visible:ring-on-ink focus-visible:ring-offset-ink",
  },
};

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const v = variants[variant];
  const s = sizes[size];
  return (
    <a className={cn(base, v.disc ? s.solid : s.plain, v.cls, className)} {...props}>
      <span>{children}</span>
      {v.disc ? (
        <span
          aria-hidden
          className={cn("grid place-items-center rounded-full transition-transform duration-300 group-hover:-rotate-45", s.disc, v.disc)}
        >
          <ArrowRight className={s.icon} strokeWidth={2.5} />
        </span>
      ) : null}
    </a>
  );
}
