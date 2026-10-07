import { Check, Minus, X } from "lucide-react";

import { Section, SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { siteConfig, type Support } from "@/site.config";

/**
 * A real <table>, so screen readers announce it properly. The highlighted column is a decorative overlay
 * positioned from the right edge, using the same two column widths as the cells, so it can never drift.
 */

const LABEL: Record<Support, string> = { yes: "Included", partial: "Partly", no: "Not included" };

function Mark({ value }: { value: Support }) {
  return (
    <span className="inline-flex items-center justify-center">
      {value === "yes" ? (
        <span aria-hidden className="grid size-6 place-items-center rounded-full bg-ember-300 text-on-ember">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
      ) : value === "partial" ? (
        <span aria-hidden className="grid size-6 place-items-center rounded-full bg-white/[0.08] text-ink-mid">
          <Minus className="size-3.5" strokeWidth={2.5} />
        </span>
      ) : (
        <span aria-hidden className="grid size-6 place-items-center rounded-full border border-white/10 text-ink-low">
          <X className="size-3.5" strokeWidth={2.5} />
        </span>
      )}
      <span className="sr-only">{LABEL[value]}</span>
    </span>
  );
}

const COL = "w-[76px] sm:w-[132px]";

export function Comparison() {
  const { eyebrow, title, description, rows, otherLabel } = siteConfig.comparison;

  return (
    <Section id="compare">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />

      <div className="relative mx-auto max-w-[56rem] overflow-hidden rounded-2xl border border-line bg-bg-raised">
        {/* Highlighted column behind the brand's cells. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-[76px] w-[76px] border-x border-ember-300/20 bg-gradient-to-b from-ember-300/[0.12] to-ember-300/[0.03] sm:right-[132px] sm:w-[132px]"
        />
        <div aria-hidden className="pointer-events-none absolute right-[76px] top-0 h-px w-[76px] bg-ember-200/70 sm:right-[132px] sm:w-[132px]" />

        <table className="relative w-full table-fixed border-collapse text-left">
          <caption className="sr-only">
            {siteConfig.name} compared with {otherLabel}
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="px-5 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-ink-low sm:px-7">
                Feature
              </th>
              <th scope="col" className={cn("px-2 py-4 text-center text-[13px] font-semibold text-ember-100 sm:text-[14px]", COL)}>
                {siteConfig.name}
              </th>
              <th scope="col" className={cn("px-2 py-4 text-center text-[13px] font-medium text-ink-low sm:text-[14px]", COL)}>
                {otherLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={cn(i < rows.length - 1 && "border-b border-line")}>
                <th scope="row" className="px-5 py-4 text-[14px] font-normal leading-snug text-ink sm:px-7 sm:text-[15px]">
                  {row.label}
                </th>
                <td className={cn("px-2 py-4 text-center", COL)}>
                  <Mark value={row.us} />
                </td>
                <td className={cn("px-2 py-4 text-center", COL)}>
                  <Mark value={row.them} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
