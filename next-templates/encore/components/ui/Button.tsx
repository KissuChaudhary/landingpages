import { ArrowUpRight } from "lucide-react";

/*
 * The page's buttons. On hover the arrow leaves through its corner and a new
 * one comes in from the other, so the button seems to send you somewhere.
 */

type Variant = "berry" | "ink" | "outline" | "white";
const styles: Record<Variant, { button: string; disc: string }> = {
  berry: { button: "bg-berry text-white hover:bg-[#cc124f]", disc: "bg-white/15" },
  ink: { button: "bg-ink text-white hover:bg-[#25212d]", disc: "bg-white/12" },
  outline: { button: "border border-line bg-white text-ink hover:border-[#cfccd6]", disc: "bg-mist" },
  white: { button: "bg-white text-ink hover:bg-[#f3f1f6]", disc: "bg-berry text-white" },
};

export function Button({
  children,
  href,
  variant = "berry",
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
}) {
  const s = styles[variant];
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`btn inline-flex shrink-0 items-center justify-between whitespace-nowrap rounded-full font-[560] tracking-[-0.01em] transition-[background-color,border-color,transform] duration-300 ${
        size === "sm" ? "h-10 gap-2.5 pl-4 pr-1.5 text-[14px]" : "h-[52px] gap-3 pl-6 pr-2 text-[15px]"
      } ${s.button} ${className}`}
    >
      {children}
      <span aria-hidden="true" className={`grid place-items-center rounded-full ${size === "sm" ? "size-7" : "size-9"} ${s.disc}`}>
        <span className="btn-arrow">
          <ArrowUpRight className="size-4" strokeWidth={2.2} />
          <ArrowUpRight className="size-4" strokeWidth={2.2} />
        </span>
      </span>
    </a>
  );
}
