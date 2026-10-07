import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "sm" | "default" | "lg";

type StyleProps = {
  variant?: Variant;
  size?: Size;
  /** Icon rendered before the label. */
  leading?: ReactNode;
  /** Primary buttons carry the white arrow disc; set false for a plain pill. */
  icon?: boolean;
  className?: string;
};

type AsButton = StyleProps & { children: ReactNode; href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, keyof StyleProps>;
type AsLink = StyleProps & { children: ReactNode; href: string } & Omit<ComponentPropsWithoutRef<"a">, keyof StyleProps | "href">;

const heights: Record<Size, string> = {
  sm: "h-8 text-xs",
  default: "h-10 text-sm",
  lg: "h-11 text-[15px]",
};

const primaryPadding: Record<Size, { icon: string; plain: string }> = {
  sm: { icon: "pl-3.5 pr-1", plain: "px-3.5" },
  default: { icon: "pl-[18px] pr-1.5", plain: "px-5" },
  lg: { icon: "pl-[22px] pr-2", plain: "px-6" },
};

const secondaryPadding: Record<Size, string> = { sm: "px-3.5", default: "px-5", lg: "px-6" };
const discSize: Record<Size, string> = { sm: "size-6", default: "size-7", lg: "size-[30px]" };
const arrowSize: Record<Size, string> = { sm: "size-3", default: "size-3.5", lg: "size-4" };

/** The white disc whose chevron turns into an arrow on hover. */
function ArrowDisc({ size }: { size: Size }) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative ml-0.5 flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white", discSize[size])}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cn(
          "absolute stroke-accent transition-all duration-200 ease-out group-hover:translate-x-3 group-hover:opacity-0",
          arrowSize[size],
        )}
      >
        <path d="M9 6s6 4.42 6 6-6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cn(
          "absolute -translate-x-3 stroke-accent opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100",
          arrowSize[size],
        )}
      >
        <path d="M18.5 12H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 18s6-4.42 6-6-6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function buttonClassName({ variant = "primary", size = "default", icon = true, className }: Omit<StyleProps, "leading">) {
  const base =
    "group inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full font-semibold outline-none transition-all focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  if (variant === "primary") {
    return cn(
      base,
      "gap-2 bg-accent text-white hover:bg-accent-strong active:scale-[0.98]",
      heights[size],
      icon ? primaryPadding[size].icon : primaryPadding[size].plain,
      className,
    );
  }

  return cn(
    base,
    "gap-1.5 bg-black/[0.05] text-ink hover:bg-black/[0.08] active:translate-y-px active:scale-[0.98]",
    heights[size],
    secondaryPadding[size],
    className,
  );
}

export function Button(props: AsButton | AsLink) {
  const { variant = "primary", size = "default", icon = true, leading, className, children, ...rest } = props;
  const classes = buttonClassName({ variant, size, icon, className });
  const content =
    variant === "primary" ? (
      <>
        {leading}
        <span>{children}</span>
        {icon ? <ArrowDisc size={size} /> : null}
      </>
    ) : (
      <>
        {leading}
        {children}
      </>
    );

  if (typeof rest.href === "string") {
    return (
      <a {...(rest as Omit<AsLink, keyof StyleProps | "children">)} className={classes}>
        {content}
      </a>
    );
  }

  const { type, ...buttonProps } = rest as Omit<AsButton, keyof StyleProps | "children">;
  return (
    <button {...buttonProps} type={type ?? "button"} className={classes}>
      {content}
    </button>
  );
}
