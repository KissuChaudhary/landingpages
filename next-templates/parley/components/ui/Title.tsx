import { cn } from "@/lib/utils";
import type { Accented, SectionHead } from "@/site.config";

/** A headline with its second half in the italic serif, in the rose accent colour. */
export function Heading({ title, className, accentClassName = "text-rose-text" }: { title: Accented; className?: string; accentClassName?: string }) {
  return (
    <>
      <span className={className}>{title.before} </span>
      <em className={cn("italic", accentClassName, className)}>{title.accent}</em>
    </>
  );
}

/** The width every section shares. */
export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>{children}</div>;
}

/** The small word above a headline. */
export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-[14px] font-semibold text-rose-text", className)}>{children}</p>;
}

/** Label, headline and one sentence. Centered by default; pass `align="left"` for a split layout. */
export function SectionTitle({ label, title, description, align = "center" }: SectionHead & { align?: "center" | "left" }) {
  const center = align === "center";
  return (
    <header className={cn(center && "mx-auto text-center")}>
      <Label>{label}</Label>
      <h2
        className={cn(
          "display mt-4 text-balance text-[clamp(2.375rem,1.2rem+3.9vw,4rem)] leading-[1.04] text-ink",
          center && "mx-auto max-w-[16em]",
        )}
      >
        <Heading title={title} />
      </h2>
      <p className={cn("text-pretty mt-5 text-[1.0625rem] leading-[1.65] text-ink-mid", center ? "mx-auto max-w-[34rem]" : "max-w-[30rem]")}>
        {description}
      </p>
    </header>
  );
}
