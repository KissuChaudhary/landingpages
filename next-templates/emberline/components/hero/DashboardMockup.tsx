import { BarChart3, FileText, Layers, LayoutGrid, MessageSquareText, Quote, Users } from "lucide-react";

import { siteConfig } from "@/site.config";

/**
 * A product screenshot drawn in markup, so the template ships with no images to host, license or break.
 * Replace the numbers, names and prompts below with your own, or swap this component for a real <Image>.
 */

const NAV = [
  { label: "Overview", icon: LayoutGrid, active: true },
  { label: "Prompts", icon: MessageSquareText },
  { label: "Citations", icon: Quote },
  { label: "Competitors", icon: Users },
  { label: "Reports", icon: FileText },
] as const;

const METRICS = [
  { label: "Visibility score", value: "68", unit: "/100", delta: "+12.4%" },
  { label: "Citations", value: "1,284", unit: "", delta: "+8.1%" },
  { label: "Share of voice", value: "31", unit: "%", delta: "+3.2%" },
] as const;

const PROMPTS = [
  { text: "best CRM for early-stage startups", model: "ChatGPT", rank: "#1" },
  { text: "alternatives to spreadsheets for ops", model: "Claude", rank: "#2" },
  { text: "how do teams track brand mentions", model: "Perplexity", rank: "#1" },
  { text: "top project tools for remote teams", model: "ChatGPT", rank: "#4" },
  { text: "is {brand} worth it", model: "Claude", rank: "#1" },
] as const;

/** 12 weekly points, rising, on a 0-100 scale. */
const POINTS = [34, 38, 36, 44, 49, 47, 55, 58, 57, 64, 66, 72];

function chart() {
  const w = 520;
  const h = 150;
  const step = w / (POINTS.length - 1);
  const y = (v: number) => h - (v / 100) * h;
  const line = POINTS.map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  return { w, h, line, area: `${line} L${w} ${h} L0 ${h} Z`, last: { x: w, y: y(POINTS[POINTS.length - 1]) } };
}

export function DashboardMockup() {
  const c = chart();
  const brand = siteConfig.name;

  return (
    <div
      role="img"
      aria-label={`${brand} dashboard preview showing AI visibility score, citations and top prompts`}
      className="relative overflow-hidden rounded-2xl border border-ember-200/25 bg-bg-raised shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-ember-200)_5%,transparent),0_40px_140px_-30px_color-mix(in_srgb,var(--color-ember-500)_40%,transparent)] [mask-image:linear-gradient(to_bottom,#000_68%,transparent)]"
    >
      {/* Lit top edge */}
      <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-ember-200/70 to-transparent" />

      {/* Window bar */}
      <div className="flex h-11 items-center gap-3 border-b border-line px-4">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </div>
        <div className="mx-auto hidden h-6 w-64 items-center justify-center rounded-md bg-white/[0.04] text-[11px] text-ink-low sm:flex">
          app.{brand.toLowerCase()}.com / visibility
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-52 shrink-0 border-r border-line p-4 md:block">
          <div className="mb-5 flex items-center gap-2 px-2 text-[13px] font-semibold text-ink">
            <span className="grid size-6 place-items-center rounded-md bg-gradient-to-b from-ember-200 to-ember-500">
              <span className="size-2 rounded-full bg-on-ember" />
            </span>
            {brand}
          </div>
          <ul className="space-y-1">
            {NAV.map(({ label, icon: Icon, ...rest }) => (
              <li
                key={label}
                className={
                  "active" in rest
                    ? "flex items-center gap-2.5 rounded-lg bg-ember-300/10 px-2.5 py-2 text-[13px] text-ember-100 ring-1 ring-ember-300/20"
                    : "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-ink-low"
                }
              >
                <Icon className="size-4" strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-line bg-white/[0.02] p-3 text-[11px] leading-snug text-ink-low">
            <Layers className="mb-2 size-4 text-ember-300" strokeWidth={1.75} />
            Weekly report ready. 3 new fixes to publish.
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[15px] font-medium text-ink sm:text-base">AI visibility</p>
              <p className="text-[11px] text-ink-low">Last 12 weeks, all models</p>
            </div>
            <div className="flex gap-1 rounded-lg border border-line p-0.5 text-[11px]">
              <span className="rounded-md px-2 py-1 text-ink-low">7d</span>
              <span className="rounded-md bg-white/[0.07] px-2 py-1 text-ink">30d</span>
              <span className="rounded-md px-2 py-1 text-ink-low">90d</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {METRICS.map((m) => (
              <div key={m.label} className="rounded-xl border border-line bg-white/[0.02] p-3 sm:p-4">
                <p className="truncate text-[10px] text-ink-low sm:text-[11px]">{m.label}</p>
                <p className="mt-1.5 flex items-baseline gap-0.5 text-xl font-medium tracking-tight text-ink sm:text-[26px]">
                  {m.value}
                  <span className="text-[11px] font-normal text-ink-low">{m.unit}</span>
                </p>
                <p className="mt-1 text-[10px] font-medium text-ember-300 sm:text-[11px]">{m.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 grid gap-2.5 sm:mt-3 sm:gap-3 md:grid-cols-[1.6fr_1fr]">
            {/* Chart */}
            <div className="rounded-xl border border-line bg-white/[0.02] p-4">
              <div className="mb-3 flex items-center gap-2 text-[11px] text-ink-low">
                <BarChart3 className="size-3.5 text-ember-300" strokeWidth={1.75} />
                Visibility score
              </div>
              <svg viewBox={`0 0 ${c.w} ${c.h}`} className="h-32 w-full overflow-visible sm:h-36" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" style={{ stopColor: "var(--color-ember-400)", stopOpacity: 0.38 }} />
                    <stop offset="1" style={{ stopColor: "var(--color-ember-400)", stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((f) => (
                  <line key={f} x1="0" x2={c.w} y1={c.h * f} y2={c.h * f} style={{ stroke: "color-mix(in srgb, var(--color-ember-200) 8%, transparent)" }} vectorEffect="non-scaling-stroke" />
                ))}
                <path d={c.area} fill="url(#chart-fill)" />
                <path d={c.line} fill="none" style={{ stroke: "var(--color-ember-300)" }} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>

            {/* Prompts */}
            <div className="hidden rounded-xl border border-line bg-white/[0.02] p-4 md:block">
              <p className="mb-3 text-[11px] text-ink-low">Top prompts</p>
              <ul className="space-y-2.5">
                {PROMPTS.map((p) => (
                  <li key={p.text} className="flex items-center justify-between gap-3 text-[12px]">
                    <span className="min-w-0 truncate text-ink-mid">{p.text.replace("{brand}", brand)}</span>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="rounded-md bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-ink-low">{p.model}</span>
                      <span className="w-6 text-right font-medium text-ember-200">{p.rank}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="h-16 md:h-20" />
        </div>
      </div>
    </div>
  );
}
