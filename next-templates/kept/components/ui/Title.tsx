import { cn } from "@/lib/utils";
import type { Accented, SectionHead } from "@/site.config";

/** A headline with its second half in the italic serif, in moss green. */
export function Heading({ title, className, accentClassName = "text-moss" }: { title: Accented; className?: string; accentClassName?: string }) {
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

/** The small word above a headline, with a short lime rule. */
export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-[14px] font-medium text-moss", className)}>
      <span aria-hidden className="h-[3px] w-6 rounded-full bg-lime-deep" />
      {children}
    </p>
  );
}

/** Label, headline and one sentence, always left-aligned. */
export function SectionTitle({ label, title, description, className }: SectionHead & { className?: string }) {
  return (
    <header className={className}>
      <Label>{label}</Label>
      <h2 className="display mt-5 max-w-[14em] text-balance text-[clamp(2.5rem,1.3rem+4.2vw,4.5rem)] leading-[1.02] text-ink">
        <Heading title={title} />
      </h2>
      <p className="text-pretty mt-5 max-w-[32rem] text-[1.0625rem] leading-[1.65] text-ink-mid">{description}</p>
    </header>
  );
}

/** A line, a dotted leader and a figure: the way a statement sets its rows. */
export function Leader({ left, right, className }: { left: React.ReactNode; right: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-baseline gap-3", className)}>
      <span className="min-w-0">{left}</span>
      <span aria-hidden className="min-w-4 flex-1 translate-y-[-0.3em] border-b border-dotted border-line-strong" />
      <span className="shrink-0">{right}</span>
    </div>
  );
}
