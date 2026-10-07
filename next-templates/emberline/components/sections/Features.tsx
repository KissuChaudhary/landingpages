import { Bell, Check, FileText, Radar, Swords, TrendingUp, Wrench } from "lucide-react";
import type { ReactNode } from "react";

import { Card, IconChip, Panel } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/**
 * Layout. Phones: one column, every card in normal flow (nothing is absolutely positioned, so cards can
 * never overlap). Tablet: 6 columns. Desktop: 12 columns, two wide cards (7 + 5) then three narrow (4 + 4 + 4).
 *
 * Each card is a heading, a sentence, and a small illustration drawn in markup. The illustrations below are
 * demo content: swap the numbers and names for your own product's.
 */

/* ----------------------------- illustrations ----------------------------- */

const MODELS = [
  { name: "ChatGPT", value: 82 },
  { name: "Claude", value: 71 },
  { name: "Perplexity", value: 64 },
  { name: "Gemini", value: 48 },
];

function MentionsVisual() {
  return (
    <Panel>
      <p className="mb-3.5 text-[11px] uppercase tracking-[0.12em] text-ink-low">Mention rate</p>
      <ul className="space-y-3.5">
        {MODELS.map((m) => (
          <li key={m.name} className="grid grid-cols-[76px_1fr_36px] items-center gap-3 text-[12px] sm:grid-cols-[88px_1fr_40px]">
            <span className="text-ink-mid">{m.name}</span>
            <span className="h-2 overflow-hidden rounded-full bg-white/[0.06]" role="presentation">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-ember-500 to-ember-200"
                style={{ width: `${m.value}%` }}
              />
            </span>
            <span className="text-right font-medium tabular-nums text-ink">{m.value}%</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

const ALERTS = [
  { icon: TrendingUp, text: "Perplexity now cites you for", strong: "“best AEO tools”", time: "2m" },
  { icon: Bell, text: "Claude stopped recommending you for", strong: "“brand tracking”", time: "1h" },
  { icon: Radar, text: "A new source mentions you in", strong: "ChatGPT answers", time: "3h" },
];

function AlertsVisual() {
  return (
    <ul className="space-y-2.5 [mask-image:linear-gradient(to_bottom,#000_62%,transparent)]">
      {ALERTS.map(({ icon: Icon, text, strong, time }) => (
        <li key={strong} className="flex items-start gap-3 rounded-xl border border-line bg-bg-sunken p-3">
          <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg bg-ember-300/12 text-ember-200">
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
          <p className="min-w-0 flex-1 text-[13px] leading-snug text-ink-mid">
            {text} <span className="font-medium text-ink">{strong}</span>
          </p>
          <span className="shrink-0 pt-0.5 text-[11px] text-ink-low">{time}</span>
        </li>
      ))}
    </ul>
  );
}

const SHARE = [
  { name: "You", value: 31, bar: "bg-ember-300" },
  { name: "Northwind", value: 27, bar: "bg-white/30" },
  { name: "Parallel", value: 19, bar: "bg-white/18" },
  { name: "Others", value: 23, bar: "bg-white/8" },
];

function RivalsVisual() {
  return (
    <Panel>
      <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-ink-low">Share of voice</p>
      <div className="flex h-3 gap-1 overflow-hidden rounded-full" role="presentation">
        {SHARE.map((s) => (
          <span key={s.name} className={cn("h-full rounded-full", s.bar)} style={{ width: `${s.value}%` }} />
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[12px]">
        {SHARE.map((s) => (
          <li key={s.name} className="flex items-center gap-2">
            <span aria-hidden className={cn("size-2 rounded-full", s.bar)} />
            <span className={s.name === "You" ? "font-medium text-ink" : "text-ink-mid"}>{s.name}</span>
            <span className="ml-auto tabular-nums text-ink-low">{s.value}%</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

const FIXES = [
  { text: "Add a comparison table to /pricing", impact: "High", done: true },
  { text: "Cite the 2026 benchmark on /blog/aeo", impact: "High", done: false },
  { text: "Rewrite the FAQ answers as short facts", impact: "Med", done: false },
];

function FixesVisual() {
  return (
    <Panel className="space-y-3">
      {FIXES.map((f) => (
        <div key={f.text} className="flex items-start gap-3">
          <span
            aria-hidden
            className={cn(
              "mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-md border",
              f.done ? "border-ember-300 bg-ember-300 text-on-ember" : "border-white/20",
            )}
          >
            {f.done ? <Check className="size-3" strokeWidth={3} /> : null}
          </span>
          <p className={cn("min-w-0 flex-1 text-[13px] leading-snug", f.done ? "text-ink-low line-through" : "text-ink-mid")}>
            {f.text}
          </p>
          <span className="shrink-0 rounded-md bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-ink-low">{f.impact}</span>
        </div>
      ))}
    </Panel>
  );
}

function ReportVisual() {
  const points = [30, 36, 34, 42, 47, 45, 54, 58, 64, 70];
  const w = 240;
  const h = 56;
  const step = w / (points.length - 1);
  const line = points.map((v, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)} ${(h - (v / 100) * h).toFixed(1)}`).join(" ");
  return (
    <Panel>
      <div className="flex items-center justify-between text-[11px] text-ink-low">
        <span>Weekly brief</span>
        <span>Oct 6</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-14 w-full overflow-visible" preserveAspectRatio="none" aria-hidden>
        <path d={line} fill="none" style={{ stroke: "var(--color-ember-300)" }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
        <span className="rounded-md bg-ember-300/12 px-2 py-1 font-medium text-ember-200">+12.4% visibility</span>
        <span className="rounded-md bg-white/[0.05] px-2 py-1 text-ink-mid">3 fixes to ship</span>
      </div>
    </Panel>
  );
}

/* --------------------------------- layout --------------------------------- */

const VISUALS: { icon: typeof Radar; visual: () => ReactNode; span: string }[] = [
  { icon: Radar, visual: MentionsVisual, span: "md:col-span-6 lg:col-span-7" },
  { icon: Bell, visual: AlertsVisual, span: "md:col-span-6 lg:col-span-5" },
  { icon: Swords, visual: RivalsVisual, span: "md:col-span-3 lg:col-span-4" },
  { icon: Wrench, visual: FixesVisual, span: "md:col-span-3 lg:col-span-4" },
  { icon: FileText, visual: ReportVisual, span: "md:col-span-6 lg:col-span-4" },
];

export function Features() {
  const { eyebrow, title, description, items } = siteConfig.features;

  return (
    <Section id="features">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-5">
        {items.slice(0, VISUALS.length).map((item, i) => {
          const { icon: Icon, visual: Visual, span } = VISUALS[i];
          return (
            <Card key={item.title} className={cn("flex flex-col gap-6", span)}>
              <div>
                <IconChip>
                  <Icon className="size-5" strokeWidth={1.75} />
                </IconChip>
                <h3 className="mt-5 text-[1.25rem] font-medium leading-snug tracking-[-0.015em] text-ink">{item.title}</h3>
                <p className="mt-2 max-w-[30rem] text-[15px] leading-[1.6] text-ink-mid">{item.description}</p>
              </div>
              <div className="mt-auto">
                <Visual />
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
