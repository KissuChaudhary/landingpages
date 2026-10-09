import type { UiItem } from '../registry';

export const comboChart: UiItem = {
  name: 'combo-chart',
  title: 'Combo chart',
  description: 'Every day as a bar and the trend as a line on one scale: point at a day and the header becomes its readout while the line’s dot pings where it lands.',
  summary:
    'Daily numbers are noisy and a trend line is what people actually read, so this card draws both on one scale: thin bars for every day and a rolling average across them, never two axes that make the line mean something different. The first time it scrolls into view the bars grow out of the baseline in a wave and the average draws itself over them. Point at a day and its bar fills while the others dim, the line’s dot slides along and pings once where it lands, and the header becomes the readout: the title morphs to "Orders on Thursday 2 October", the total rolls to that day’s count and the line below to its average. Beneath, the best day, the daily average and the quietest day roll up as tiles.',
  file: 'combo-chart.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  states: [
    { name: 'arrive', description: 'In view for the first time, each bar grows from the baseline (640ms, 14ms apart) and the average is revealed from left to right after them (1100ms); every figure rolls up from zero.' },
    { name: 'hover', description: 'The bar under the pointer goes to full strength and the rest dim; the line’s dot glides to that day (260ms, slight overshoot) and a ring pings out from it once (640ms). The title morphs to "<title> on <day>", the total and average roll to the day and the change chip folds away until you leave.' },
    { name: 'tiles', description: 'Best day, daily average and quietest day, each with its date or span, roll up on arrival.' },
  ],
  usage: `import { ComboChart } from "@/components/combo-chart";

<ComboChart
  title="Orders"
  days={lastThirtyDays} // [{ key: "2026-10-02", label: "2 Oct", value: 126 }, …]
  previous={3212}
/>`,
  recipeTitle: 'From your database',
  recipeIntro: 'Count by day on the server. Pass your own average if it should include the days before the first bar, so the line starts settled.',
  recipe: `import { ComboChart } from "@/components/combo-chart";
import { db } from "@/lib/db";

export async function DailyOrders() {
  const rows = await db.ordersByDay({ days: 36 }); // six extra days to settle the average
  const average = rows.map((_, i) => rows.slice(Math.max(0, i - 6), i + 1).reduce((s, r) => s + r.count, 0) / Math.min(7, i + 1));
  const days = rows.slice(6).map((r) => ({
    key: r.day,
    label: new Date(r.day).toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    title: new Date(r.day).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
    value: r.count,
  }));
  return <ComboChart title="Orders" days={days} average={average.slice(6)} previous={await db.ordersBetween("-60d", "-30d")} />;
}`,
  props: [
    { name: 'days', type: 'ComboDay[]', description: 'Oldest first, each { key, label, value, title? }.' },
    { name: 'rolling', type: 'number', default: '7', description: 'The line is a rolling average over this many days (fewer at the start).' },
    { name: 'average', type: 'number[]', description: 'Your own line values instead, one per day.' },
    { name: 'previous', type: 'number', description: 'The total of the period before, for the change chip.' },
    { name: 'series', type: '[string, string]', default: '["Orders", "7-day average"]', description: 'The bars’ and the line’s names, in the legend and readout.' },
    { name: 'title', type: 'string', default: '"Orders"', description: 'Above the total, and in the readout.' },
    { name: 'format', type: 'Intl.NumberFormatOptions', description: 'How figures read (whole numbers by default).' },
    { name: 'locales', type: 'string | string[]', description: 'For number formatting.' },
  ],
  notes: [
    'One scale for both marks, by design: a second axis would make the line’s height mean something different from the bars’.',
    'The plot is one tab stop: arrow keys, Home and End move between days and the day’s count and average are announced.',
    'The legend draws a bar and a line key, so the two marks are told apart by shape as well as colour; every day is in a visually hidden table.',
    'Bars use --chart-1 and the line --chart-2 from your theme.',
    'Installs Number roll and Text morph. With reduced motion nothing grows or pings.',
  ],
};
