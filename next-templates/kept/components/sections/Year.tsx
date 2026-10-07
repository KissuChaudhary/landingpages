import { Container, Label, SectionTitle } from "@/components/ui/Title";
import { cn } from "@/lib/utils";
import { money } from "@/lib/money";
import { siteConfig } from "@/site.config";

/**
 * A year of income as twelve stacked bars: the dark part is set aside for tax, the light part is yours.
 * The bars are plain elements sized from `year.months` and `year.rate`, so the chart follows the data.
 * Tax dates sit under the chart as a list with exact amounts, which also reads well on a phone.
 */
export function Year() {
  const { year } = siteConfig;
  const max = Math.max(...year.months.map((m) => m.income));
  const total = year.months.reduce((sum, m) => sum + m.income, 0);
  const setAside = Math.round(total * year.rate);
  const dueAt = new Set(year.due.map((d) => d.at));

  return (
    <section id="year" className="scroll-mt-20 border-b border-line py-20 sm:py-28">
      <Container>
        <SectionTitle label={year.label} title={year.title} description={year.description} />

        <figure className="mt-14 sm:mt-16">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <p className="text-[14px] text-ink-mid">Income by month, split on arrival</p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-ink">
              <li className="flex items-center gap-2">
                <span aria-hidden className="size-3 rounded-[3px] bg-pine" />
                {year.legend.tax}
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="size-3 rounded-[3px] bg-lime" />
                {year.legend.yours}
              </li>
            </ul>
          </div>

          <div
            role="img"
            aria-label={`${year.legend.tax}: ${money(setAside)} of ${money(total)} earned this year.`}
            className="mt-8 grid h-[18rem] grid-cols-12 items-end gap-1.5 border-b border-line-strong sm:h-[22rem] sm:gap-3"
          >
            {year.months.map((m, index) => {
              const height = (m.income / max) * 100;
              return (
                <div key={m.month} className="flex h-full flex-col justify-end">
                  <p className="money mb-2 hidden text-center text-[12px] text-ink-low lg:block">{money(m.income)}</p>
                  <div className="flex flex-col overflow-hidden rounded-t-[6px]" style={{ height: `${height}%` }}>
                    <span className="block flex-1 bg-lime" />
                    <span className="block bg-pine" style={{ height: `${year.rate * 100}%` }} />
                  </div>
                  <span className="sr-only">
                    {m.month}: {money(m.income)}
                    {dueAt.has(index) ? ", a tax payment is due" : ""}
                  </span>
                </div>
              );
            })}
          </div>

          <div aria-hidden className="mt-3 grid grid-cols-12 gap-1.5 sm:gap-3">
            {year.months.map((m, index) => (
              <div key={m.month} className="flex flex-col items-center gap-2">
                <span className="text-[11px] font-medium text-ink-mid sm:text-[13px]">
                  <span className="sm:hidden">{m.month.slice(0, 1)}</span>
                  <span className="hidden sm:inline">{m.month}</span>
                </span>
                <span className={cn("size-1.5 rounded-full", dueAt.has(index) ? "bg-moss" : "bg-transparent")} />
              </div>
            ))}
          </div>
        </figure>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <Label>Tax dates</Label>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {year.due.map((d) => {
                const amount = year.months.slice(d.from, d.to + 1).reduce((sum, m) => sum + m.income, 0) * year.rate;
                return (
                  <li key={d.date} className="flex items-baseline gap-4 py-4">
                    <span className="money w-16 shrink-0 font-mono text-[14px] text-ink">{d.date}</span>
                    <span className="min-w-0 flex-1 text-[15px] text-ink-mid">{d.label}</span>
                    <span className="money font-mono text-[15px] font-medium text-ink">{money(amount)}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <dl className="grid content-start gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dd className="display money text-[3.5rem] leading-none text-ink">{money(setAside)}</dd>
              <dt className="mt-2 text-[15px] text-ink-mid">{year.totals.setAside}</dt>
            </div>
            <div>
              <dd className="display money text-[3.5rem] leading-none text-moss">{year.totals.surpriseValue}</dd>
              <dt className="mt-2 text-[15px] text-ink-mid">{year.totals.surprise}</dt>
            </div>
          </dl>
        </div>

        <p className="mt-12 max-w-[34rem] text-[13px] leading-relaxed text-ink-low">{year.disclaimer}</p>
      </Container>
    </section>
  );
}
