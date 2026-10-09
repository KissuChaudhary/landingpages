import type { UiItem } from '../registry';

export const areaChart: UiItem = {
  name: 'area-chart',
  title: 'Area chart',
  description: 'Several series stacked, overlapping or as shares: every band morphs between layouts, and the tiles are the legend, the switches and the readout.',
  summary:
    'A multi-series area chart is usually three charts behind a dropdown. Here it is one surface that changes shape: switch from Stacked to Overlap or 100% and every band morphs to its new place while the scale rolls between counts and percentages. The tiles under the chart are the legend, and they’re buttons: press one and its band shrinks away while the others settle into the room, press it again and it grows back, and every colour stays with its series. Point at the chart and a hairline follows you with a dot on each band while the tiles turn into the readout, the period morphing to that week and every figure and share rolling to it. The first time the card scrolls into view the chart draws itself from left to right.',
  file: 'area-chart.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  states: [
    { name: 'arrive', description: 'In view for the first time, the bands are revealed from left to right (1200ms) and every figure rolls up from zero.' },
    { name: 'layout', description: 'The pill is thrown to Stacked, Overlap or 100% (460ms); every band’s top and bottom tween to the new layout (620ms) and the scale rolls to counts or percentages.' },
    { name: 'toggle', description: 'A tile is a toggle button: its band fades and collapses to nothing while the others restack, its swatch empties and its figures roll to zero; pressing again reverses it. The last series showing can’t be hidden.' },
    { name: 'hover', description: 'A hairline glides to the nearest point (260ms, slight overshoot) with a dot on each band; the caption morphs to that point’s name and the total, the tiles’ figures and shares roll to it.' },
  ],
  usage: `import { AreaChart } from "@/components/area-chart";

<AreaChart
  title="Orders"
  caption="in the last 12 weeks"
  labels={weeks}
  series={[
    { id: "counter", label: "Counter", values: counter },
    { id: "app", label: "App", values: app },
    { id: "delivery", label: "Delivery", values: delivery },
  ]}
/>`,
  recipeTitle: 'From your analytics',
  recipeIntro: 'Group events by week and channel on the server. Keep the series in a fixed order so each keeps its colour.',
  recipe: `import { AreaChart } from "@/components/area-chart";
import { db } from "@/lib/db";

const CHANNELS = [
  { id: "counter", label: "Counter" },
  { id: "app", label: "App" },
  { id: "delivery", label: "Delivery" },
];

export async function OrdersByChannel() {
  const rows = await db.ordersByWeekAndChannel({ weeks: 12 }); // [{ week: "2026-10-05", channel: "app", count: 478 }, …]
  const weeks = [...new Set(rows.map((r) => r.week))];
  return (
    <AreaChart
      title="Orders"
      caption="in the last 12 weeks"
      labels={weeks.map((w) => new Date(w).toLocaleDateString("en-GB", { day: "numeric", month: "short" }))}
      series={CHANNELS.map((c) => ({ ...c, values: weeks.map((w) => rows.find((r) => r.week === w && r.channel === c.id)?.count ?? 0) }))}
    />
  );
}`,
  props: [
    { name: 'series', type: 'AreaSeries[]', description: 'Up to five, each { id, label, values }, coloured --chart-1 to --chart-5 in this order.' },
    { name: 'labels', type: 'string[]', description: 'Along the bottom, one per point; they thin out on narrow screens.' },
    { name: 'titles', type: 'string[]', description: 'Longer names for the readout, e.g. "Week of 28 September".' },
    { name: 'layout / defaultLayout', type: '"stacked" | "overlap" | "percent"', default: '"stacked"', description: 'Controlled or not.' },
    { name: 'onLayoutChange', type: '(layout) => void', description: 'Called when the layout changes.' },
    { name: 'title', type: 'string', default: '"Orders"', description: 'Above the total.' },
    { name: 'caption', type: 'string', description: 'Under the total, e.g. "in the last 12 weeks".' },
    { name: 'format', type: 'Intl.NumberFormatOptions', description: 'How the figures read.' },
    { name: 'locales', type: 'string | string[]', description: 'For number formatting.' },
  ],
  notes: [
    'The layout switch is a radio group; the tiles are toggle buttons (aria-pressed) and the last visible series can’t be hidden.',
    'The plot is one tab stop: arrow keys, Home and End move between points and every visible series is announced.',
    'Identity never rests on colour alone: each tile pairs its swatch with the series name, and every value is in a visually hidden table.',
    'Colours come from the theme’s --chart-1 to --chart-5 and follow the series, not its rank, so hiding one never repaints the others.',
    'Installs Number roll and Text morph. With reduced motion every change happens in place.',
  ],
};
