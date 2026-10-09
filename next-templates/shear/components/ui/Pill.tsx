import { Mark } from "./Brand";

/*
 * The page's one button: a label and a dark disc holding the mark. On hover
 * the disc turns a little and the mark's halves slide along their cut.
 */

type Variant = "mint" | "ink" | "light";
const styles: Record<Variant, { pill: string; disc: string }> = {
  mint: { pill: "bg-mint text-[#04140c] hover:bg-[#8ff5c3]", disc: "bg-ink text-mint" },
  ink: { pill: "bg-ink text-white hover:bg-[#16191d]", disc: "bg-mint text-ink" },
  light: { pill: "bg-white text-ink border border-line hover:border-[#cfd5d1]", disc: "bg-ink text-mint" },
};

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export function Pill({ children, href, variant = "mint", size = "md", className = "", type = "button", onClick }: Props) {
  const s = styles[variant];
  const classes = `pill inline-flex shrink-0 items-center whitespace-nowrap rounded-full font-[520] tracking-[-0.01em] transition-[background-color,border-color,transform] duration-300 ${
    size === "sm" ? "h-9 gap-2.5 pl-4 pr-1 text-[13px]" : "h-12 gap-3 pl-5 pr-1.5 text-[14.5px]"
  } ${s.pill} ${className}`;
  const disc = (
    <span aria-hidden="true" className={`pill-disc grid place-items-center rounded-full ${size === "sm" ? "size-7" : "size-9"} ${s.disc}`}>
      <Mark className={size === "sm" ? "size-3.5" : "size-4"} />
    </span>
  );
  if (href)
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
        {disc}
      </a>
    );
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
      {disc}
    </button>
  );
}
