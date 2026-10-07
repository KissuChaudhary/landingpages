import { Section, SectionHead } from "@/components/ui/Section";
import { TINT } from "@/lib/tint";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/**
 * An engagement drawn as a Gantt chart, in markup. Desktop: phase names on the left, a six-week track on the
 * right. Phones: the same rows stack (name above, track below), so the bars always line up with the week
 * labels. The week count and every phase's start and end come from site.config.ts.
 */
export function Process() {
  const { phases, weeks, footnote, ...intro } = siteConfig.process;
  const columns = { gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` };
  // A hairline at each week boundary, drawn as a background so it needs no extra elements.
  const grid = {
    backgroundImage: `repeating-linear-gradient(to right, transparent 0, transparent calc(100% / ${weeks} - 1px), var(--color-line) calc(100% / ${weeks} - 1px), var(--color-line) calc(100% / ${weeks}))`,
  };
  const label = "font-mono text-[11px] uppercase tracking-[0.12em] text-ink-low";

  return (
    <Section id="process">
      <SectionHead index="04" {...intro} />

      <div className="rounded-[2rem] border border-line bg-paper-raised p-5 shadow-soft sm:p-8 md:p-10">
        {/* Week labels */}
        <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10">
          <div className="hidden md:block" />
          <div className={cn("grid pb-4", label)} style={columns} aria-hidden>
            {Array.from({ length: weeks }, (_, i) => (
              <span key={i} className="pl-1">
                W{i + 1}
              </span>
            ))}
          </div>
        </div>

        <ol>
          {phases.map((phase) => (
            <li
              key={phase.title}
              className="grid gap-4 border-t border-line py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center md:gap-10"
            >
              <div>
                <h3 className="display text-[2rem] leading-none text-ink md:text-[2.5rem]">{phase.title}</h3>
                <p className="text-pretty mt-2 max-w-[24rem] text-[15px] leading-[1.55] text-ink-mid">{phase.description}</p>
              </div>
              <div className="grid h-12 items-center rounded-full bg-sand/45" style={{ ...columns, ...grid }}>
                <div
                  className={cn("flex h-10 items-center rounded-full px-2.5 text-ink sm:px-4", TINT[phase.tint].solid)}
                  style={{ gridColumn: `${phase.start} / ${phase.end + 1}` }}
                >
                  <span className="truncate font-mono text-[11px] uppercase tracking-[0.1em]">
                    {/* Short wherever a one-week bar is under ~80px: phones, and the narrow two-column chart on tablets. */}
                    <span className="sm:hidden md:inline lg:hidden">{phase.start === phase.end ? `W${phase.start}` : `W${phase.start}-${phase.end}`}</span>
                    <span className="hidden sm:inline md:hidden lg:inline">
                      {phase.start === phase.end ? `Week ${phase.start}` : `Weeks ${phase.start} to ${phase.end}`}
                    </span>
                  </span>
                </div>
              </div>
            </li>
          ))}

          {/* A review every Friday */}
          <li className="grid gap-3 border-t border-line pt-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center md:gap-10">
            <p className={label}>Friday review</p>
            <div className="grid" style={columns} aria-hidden>
              {Array.from({ length: weeks }, (_, i) => (
                <span key={i} className="flex justify-end pr-3">
                  <span className="size-2.5 rotate-45 bg-clay" />
                </span>
              ))}
            </div>
          </li>
        </ol>
      </div>

      <p className="mt-5 text-[13px] text-ink-low">{footnote}</p>
    </Section>
  );
}
