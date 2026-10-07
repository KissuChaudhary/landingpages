import { cn } from "@/lib/utils";
import type { SectionHead } from "@/site.config";

/** The width every section shares. */
export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8", className)}>{children}</div>;
}

/** The small pill above a title: a label with a pulsing dot. */
export function Pill({ children, dark = false, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em]",
        dark ? "border-orange/40 bg-orange/10 text-orange" : "border-orange/30 bg-orange-soft text-orange-text",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-orange" />
      {children}
    </p>
  );
}

/** A headline: heavy sans, then one phrase in the italic serif. */
export function Heading({ title, className, accentClassName }: { title: SectionHead["title"]; className?: string; accentClassName?: string }) {
  return (
    <>
      <span className={className}>{title.before} </span>
      <span className={cn("accent-serif", accentClassName)}>{title.accent}</span>
    </>
  );
}

/** Pill, headline and one sentence, centred. */
export function SectionTitle({ label, title, description, dark = false }: SectionHead & { dark?: boolean }) {
  return (
    <header className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
      <Pill dark={dark}>{label}</Pill>
      <h2
        className={cn(
          "display mt-6 text-balance text-[clamp(2.5rem,1.4rem+4.2vw,4.5rem)] leading-[1.02]",
          dark ? "text-on-night" : "text-ink",
        )}
      >
        <Heading title={title} />
      </h2>
      <p className={cn("text-pretty mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.65]", dark ? "text-on-night-mid" : "text-ink-mid")}>
        {description}
      </p>
    </header>
  );
}
