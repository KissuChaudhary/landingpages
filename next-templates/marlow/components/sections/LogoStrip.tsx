import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/**
 * Plain-text wordmarks, each with its own typographic treatment so the row reads as separate brands, and
 * there are no logo files to license or host. Swap in real logos (inline SVG or <Image>) once your clients
 * agree to be shown.
 */
const STYLES = [
  "display text-[26px]",
  "font-semibold tracking-[-0.03em] text-[20px]",
  "display italic text-[26px]",
  "font-mono text-[15px] uppercase tracking-[0.2em]",
  "font-semibold text-[20px] tracking-[0.01em]",
  "display text-[24px] tracking-[-0.05em]",
];

export function LogoStrip() {
  const { label, names } = siteConfig.logos;
  return (
    <section aria-label={label} className="relative pb-6">
      <div className="mx-auto w-[var(--content)]">
        <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-low">{label}</p>
        <ul className="grid grid-cols-2 border-y border-line sm:grid-cols-3 lg:grid-cols-6">
          {names.map((name, i) => (
            <li
              key={name}
              className={cn(
                "flex h-24 items-center justify-center border-line px-4 text-ink/60 transition-colors duration-300 hover:text-ink",
                "border-b sm:border-b-0",
                i % 2 === 0 && "border-r sm:border-r-0",
                "sm:border-r lg:last:border-r-0",
                STYLES[i % STYLES.length],
              )}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
