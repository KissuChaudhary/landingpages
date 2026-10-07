import { SceneHead } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

/**
 * The same video cut two ways, as a retention curve. Two lines on a dark panel: the raw cut falls away, the
 * edit holds. Numbered markers sit on the edited line and each one is explained in the list underneath, so
 * the explanations never have to fit on the chart itself and can never collide at any width.
 */
export function Results() {
  const { chart, stats, ...intro } = siteConfig.results;
  const width = 640;
  const height = 300;
  const top = 16;
  const bottom = 24;
  const x = (i: number, n: number) => (i / (n - 1)) * width;
  const y = (v: number) => top + (1 - v / 100) * (height - top - bottom);
  const line = (points: number[]) => points.map((v, i) => `${i ? "L" : "M"}${x(i, points.length).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const edited = line(chart.edited);
  const area = `${edited} L${width} ${height - bottom} L0 ${height - bottom} Z`;

  return (
    <section id="results" className="relative scroll-mt-20 bg-ink py-16 md:py-24">
      <div className="mx-auto w-[var(--content)]">
        <SceneHead tone="ink" {...intro} />

        <div className="rounded-3xl border border-ink-line bg-ink-raised p-4 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="timecode flex items-center gap-2 text-on-ink-mid">
              <span aria-hidden className="h-0.5 w-6 bg-white/40" />
              {chart.rawLabel}
            </p>
            <p className="timecode flex items-center gap-2 text-on-ink">
              <span aria-hidden className="h-0.5 w-6 bg-flame" />
              {chart.editedLabel}
            </p>
            <p className="timecode ml-auto text-on-ink-mid max-sm:hidden">Viewers still watching</p>
          </div>

          <div className="relative">
            <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label={`Retention: ${chart.rawLabel} ends at ${chart.raw[chart.raw.length - 1]}%, ${chart.editedLabel} ends at ${chart.edited[chart.edited.length - 1]}%`} className="h-64 w-full overflow-visible sm:h-80">
              {[0, 25, 50, 75, 100].map((g) => (
                <line key={g} x1="0" x2={width} y1={y(g)} y2={y(g)} stroke="rgb(255 255 255 / 0.1)" vectorEffect="non-scaling-stroke" />
              ))}
              <path d={area} fill="var(--color-flame)" fillOpacity="0.14" />
              <path d={line(chart.raw)} fill="none" stroke="rgb(255 255 255 / 0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              <path d={edited} fill="none" stroke="var(--color-flame)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>

            {chart.notes.map((note, i) => (
              <span
                key={note.at}
                aria-hidden
                className="absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-flame text-[12px] font-bold text-ink"
                style={{
                  left: `${(note.at / (chart.edited.length - 1)) * 100}%`,
                  top: `${(y(chart.edited[note.at]) / height) * 100}%`,
                }}
              >
                {i + 1}
              </span>
            ))}
          </div>

          <div className="timecode mt-2 flex justify-between text-on-ink-mid">
            <span>0:00</span>
            <span className="max-sm:hidden">3:00</span>
            <span className="max-sm:hidden">6:00</span>
            <span className="max-sm:hidden">9:00</span>
            <span>12:00</span>
          </div>

          <ol className="mt-8 grid gap-6 border-t border-ink-line pt-6 md:grid-cols-3 md:gap-8">
            {chart.notes.map((note, i) => (
              <li key={note.at} className="flex gap-3.5">
                <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-flame text-[12px] font-bold text-ink">
                  {i + 1}
                </span>
                <p className="text-pretty text-[15px] leading-[1.6] text-on-ink-mid">{note.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end border-t border-ink-line pt-5">
              <dt className="mt-3 text-[15px] text-on-ink-mid">{stat.label}</dt>
              <dd className="display text-[clamp(2.75rem,1.6rem+4vw,5rem)] leading-none text-on-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
