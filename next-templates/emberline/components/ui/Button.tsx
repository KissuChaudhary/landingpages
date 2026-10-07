import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  /** Show the arrow chip (primary only). */
  arrow?: boolean;
};

const base =
  "group relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium " +
  "tracking-[-0.005em] outline-none transition-[transform,box-shadow,background-color,border-color,color] duration-300 " +
  "focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
  "active:translate-y-px";

const sizes: Record<Size, string> = {
  md: "h-12 pl-6 pr-[10px] text-[15px]",
  sm: "h-9 pl-4 pr-[6px] text-[13px]",
};

const variants: Record<Variant, string> = {
  // Filled ember gradient with a lit top edge. Dark text: 12:1 contrast.
  primary:
    "text-on-ember bg-[linear-gradient(180deg,var(--color-ember-100)_0%,var(--color-ember-300)_58%,var(--color-ember-400)_100%)] " +
    "shadow-[inset_0_1px_0_rgb(255_255_255/0.7),inset_0_-1px_0_color-mix(in_srgb,var(--color-ember-700)_40%,transparent),0_0_0_1px_color-mix(in_srgb,var(--color-ember-300)_35%,transparent),0_10px_28px_-8px_color-mix(in_srgb,var(--color-ember-500)_55%,transparent)] " +
    "hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.8),inset_0_-1px_0_color-mix(in_srgb,var(--color-ember-700)_40%,transparent),0_0_0_1px_color-mix(in_srgb,var(--color-ember-200)_55%,transparent),0_14px_36px_-6px_color-mix(in_srgb,var(--color-ember-500)_75%,transparent)] " +
    "hover:-translate-y-px",
  // Glass with a hairline border. Reads as secondary without disappearing into the page.
  secondary:
    "text-ink bg-white/[0.04] backdrop-blur-md border border-white/[0.13] pl-6 pr-6 " +
    "hover:bg-white/[0.08] hover:border-ember-300/45 hover:text-ember-50",
};

export function Button({ variant = "primary", size = "md", arrow, className, children, ...props }: ButtonProps) {
  const showArrow = arrow ?? variant === "primary";
  const chip = size === "sm" ? "size-6" : "size-8";
  const icon = size === "sm" ? "size-3.5" : "size-4";

  return (
    <a
      className={cn(
        base,
        sizes[size],
        variants[variant],
        variant === "secondary" && (size === "sm" ? "pl-4 pr-4" : "pl-6 pr-6"),
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? (
        <span
          aria-hidden
          className={cn(
            "grid place-items-center rounded-full bg-on-ember text-ember-200 transition-transform duration-300 group-hover:translate-x-0.5",
            chip,
          )}
        >
          <ArrowRight className={icon} strokeWidth={2.25} />
        </span>
      ) : null}
    </a>
  );
}
