import { Section, SceneHead } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/** "06h" or "30h" becomes 6 or 30. */
const hours = (value: string) => Number.parseInt(value, 10) || 0;

const BARS = ["bg-flame text-ink", "bg-blue text-white", "bg-ink text-on-ink", "bg-green text-ink"];

/**
 * The process as an edit decision list, the plain-text table editors use to describe a cut: a number, an IN
 * and an OUT, the scene, and a note. Above it, a single bar shows the same four steps to scale across the 48
 * hours. Hours and copy come from site.config.ts; the bar widths are calculated from the IN and OUT values.
 */
export function Process() {
  const { steps, footnote, ...intro } = siteConfig.process;
  const total = hours(steps[steps.length - 1].to) || 1;

  return (
    <Section id="process">
      <SceneHead {...intro} />

      <div className="rounded-3xl border border-line bg-wash p-4 sm:p-8">
        {/* The 48 hours, to scale */}
        <div aria-hidden className="flex h-12 gap-1 overflow-hidden rounded-xl sm:h-14">
          {steps.map((step, i) => {
            const span = hours(step.to) - hours(step.from);
            return (
              <span
                key={step.tag}
                className={cn("timecode flex min-w-0 items-center justify-center rounded-lg px-1", BARS[i % BARS.length])}
                style={{ flex: span }}
              >
                <span className={cn("truncate", span / total < 0.16 && "max-sm:hidden")}>{span / total >= 0.1 ? step.tag : ""}</span>
              </span>
            );
          })}
        </div>
        <div aria-hidden className="timecode mt-2 flex justify-between text-text-low">
          <span>00h</span>
          <span>{String(total)}h</span>
        </div>

        {/* The list */}
        <div className="timecode mt-8 hidden grid-cols-[3.5rem_4.5rem_4.5rem_minmax(0,1.1fr)_minmax(0,1.6fr)] gap-x-6 border-b border-text pb-3 text-text-low md:grid">
          <span>No.</span>
          <span>In</span>
          <span>Out</span>
          <span>Scene</span>
          <span>Notes</span>
        </div>
        <ol>
          {steps.map((step, i) => (
            <li
              key={step.tag}
              className="grid grid-cols-3 gap-x-6 gap-y-3 border-b border-line-strong py-6 first:border-t first:border-line-strong md:grid-cols-[3.5rem_4.5rem_4.5rem_minmax(0,1.1fr)_minmax(0,1.6fr)] md:items-baseline md:first:border-t-0"
            >
              <span className="timecode text-text-low">{String(i + 1).padStart(3, "0")}</span>
              <span className="timecode text-text md:text-[13px]">
                <span className="mr-2 text-text-low md:hidden">In</span>
                {step.from}
              </span>
              <span className="timecode text-text md:text-[13px]">
                <span className="mr-2 text-text-low md:hidden">Out</span>
                {step.to}
              </span>
              <div className="col-span-3 mt-1 md:col-span-1 md:mt-0">
                <span className="timecode rounded bg-flame-soft px-2 py-1 text-flame-text">{step.tag}</span>
                <h3 className="display mt-3 text-[1.5rem] leading-[1.1] text-text">{step.title}</h3>
              </div>
              <p className="text-pretty col-span-3 text-[1rem] leading-[1.6] text-text-mid md:col-span-1">{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="timecode mt-5 flex flex-wrap justify-between gap-2 text-text-low">
          <span>Total running time {String(total)}h</span>
          <span>{footnote}</span>
        </p>
      </div>
    </Section>
  );
}
