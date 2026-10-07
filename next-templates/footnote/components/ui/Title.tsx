import { cn } from "@/lib/utils";
import type { Accented, SectionHead } from "@/site.config";

/** A headline with its second half in the italic serif, in the accent colour. */
export function Heading({ title, className }: { title: Accented; className?: string }) {
  return (
    <>
      <span className={className}>{title.before} </span>
      <em className={cn("italic text-accent", className)}>{title.accent}</em>
    </>
  );
}

/**
 * The title block at the top of a section: a short label with a small square, the headline, and one sentence.
 * It carries its own padding, so it can sit directly between two dividers.
 */
export function SectionTitle({ label, title, description }: SectionHead) {
  return (
    <header className="px-6 py-16 md:px-12 md:py-24">
      <p className="flex items-center gap-2.5 text-[14px] font-medium text-text-mid">
        <span aria-hidden className="size-1.5 rounded-[1px] bg-accent" />
        {label}
      </p>
      <h2 className="display mt-6 max-w-[14em] text-balance text-[clamp(2.5rem,1.3rem+4vw,4.5rem)] leading-[1.02] text-text">
        <Heading title={title} />
      </h2>
      <p className="text-pretty mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.65] text-text-mid">{description}</p>
    </header>
  );
}
