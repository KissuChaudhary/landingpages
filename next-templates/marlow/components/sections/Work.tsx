import { ArrowUpRight } from "lucide-react";

import { Section, SectionHead } from "@/components/ui/Section";
import { TINT } from "@/lib/tint";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

type Glyph = "line" | "bars" | "steps";

/** Small drawings for the tile corners, in the ink colour at low weight. No images. */
function GlyphArt({ kind }: { kind: Glyph }) {
  const common = "h-16 w-28 text-ink/70 sm:h-20 sm:w-36";
  if (kind === "line") {
    return (
      <svg viewBox="0 0 144 80" className={common} fill="none" aria-hidden>
        <path d="M2 70 C 28 66, 40 58, 56 52 S 92 40, 108 24 S 132 8, 142 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="142" cy="6" r="4" fill="currentColor" />
        <path d="M2 78H142" stroke="currentColor" strokeOpacity="0.25" />
      </svg>
    );
  }
  if (kind === "bars") {
    return (
      <svg viewBox="0 0 144 80" className={common} aria-hidden>
        {[62, 54, 46, 34, 22, 14].map((h, i) => (
          <rect key={i} x={4 + i * 24} y={78 - h} width="14" height={h} rx="7" fill="currentColor" fillOpacity={0.25 + i * 0.13} />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 144 80" className={common} fill="none" aria-hidden>
      <path d="M4 72H40V52H76V32H112V10H140" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M4 78H140" stroke="currentColor" strokeOpacity="0.25" />
    </svg>
  );
}

/**
 * Result tiles in an asymmetric 12-column grid: a wide tile and a narrow one, then the reverse, with the dark
 * "next" tile closing the second row. Each tile is a flex column (label on top, figure at the bottom), so the
 * content can never collide, and on phones they simply stack.
 */
export function Work() {
  const { items, more, ...intro } = siteConfig.work;
  const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

  return (
    <Section id="work">
      <SectionHead index="03" {...intro} />

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        {items.map((item, i) => (
          <article
            key={item.client}
            className={cn(
              "relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:min-h-[26rem]",
              TINT[item.tint].solid,
              spans[i],
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="display text-[1.75rem] leading-none text-ink">{item.client}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-ink/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <GlyphArt kind={item.glyph} />
            </div>

            <div>
              <p className="display text-[clamp(3.75rem,2rem+6.6vw,7.5rem)] leading-[0.9] text-ink">{item.figure}</p>
              <p className="text-pretty mt-4 max-w-[26rem] text-[1.0625rem] leading-[1.5] text-ink/80">{item.caption}</p>
            </div>
          </article>
        ))}

        {/* The closing tile */}
        <a
          href={more.cta.href}
          className={cn(
            "group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-ink p-6 text-on-ink outline-none transition-colors hover:bg-[#2b2620] focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 sm:p-8 lg:min-h-[26rem]",
            spans[3],
          )}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-on-ink-mid">Next</p>
          <div>
            <p className="display text-balance text-[clamp(2.25rem,1.4rem+3vw,4.25rem)] leading-[1.02]">{more.title}</p>
            <span className="mt-8 inline-flex items-center gap-3 text-[15px] font-medium">
              {more.cta.label}
              <span
                aria-hidden
                className="grid size-10 place-items-center rounded-full bg-on-ink text-ink transition-transform duration-300 group-hover:rotate-45"
              >
                <ArrowUpRight className="size-4" strokeWidth={2.25} />
              </span>
            </span>
          </div>
        </a>
      </div>
    </Section>
  );
}
