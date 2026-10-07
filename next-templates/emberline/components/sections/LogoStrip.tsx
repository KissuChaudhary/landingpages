import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

/**
 * Plain-text wordmarks, so there are no logo files to license or host. Each name gets its own small
 * typographic treatment so the row reads as a set of different brands. Replace with real logos
 * (as <Image> or inline SVG) once you have customers who agree to be shown.
 */
const STYLES = [
  "font-semibold tracking-[-0.03em]",
  "font-serif text-[1.15em] italic",
  "font-medium uppercase tracking-[0.18em] text-[0.85em]",
  "font-semibold tracking-[0.02em]",
  "font-serif text-[1.15em]",
  "font-medium tracking-[-0.01em]",
];

export function LogoStrip() {
  const { label, names } = siteConfig.logos;
  return (
    <section aria-label={label} className="relative py-14 md:py-16">
      <div className="mx-auto w-[var(--content)]">
        <p className="mb-8 text-center text-[13px] text-ink-low">{label}</p>
        <ul className="grid grid-cols-2 items-center gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
          {names.map((name, i) => (
            <li
              key={name}
              className={cn(
                "flex items-center justify-center gap-2 text-[19px] text-ink/55 transition-colors duration-300 hover:text-ink/90",
                STYLES[i % STYLES.length],
              )}
            >
              <span aria-hidden className="size-2.5 rounded-[3px] bg-current opacity-70 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
