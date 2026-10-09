import type { UiItem } from '../registry';

export const earningsChart: UiItem = {
  name: 'earnings-chart',
  title: 'Earnings chart',
  description: 'A bar chart that changes instead of redrawing: bars glide between periods, the scale and the total roll, a readout follows the pointer.',
  summary:
    'Most chart cards throw the whole chart away when you switch from six months to a year and draw a new one. Here the bars keep who they are: the months both periods share glide to their new place and height, the ones that leave fold away on their side and the new ones grow in beside them, while the scale’s labels and the total roll to their new figures and the change chip turns emerald or red with its arrow. The first time it scrolls into view the bars grow out of the baseline one after another. Point at the chart and a hairline column follows you from bar to bar, with a readout riding its top whose month morphs and whose amount rolls. No chart library: one file of plain elements that takes on your theme.',
  file: 'earnings-chart.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  states: [
    { name: 'arrive', description: 'In view for the first time, each bar grows from the baseline (640ms, 28ms apart) and the total rolls up from zero (1000ms).' },
    { name: 'period', description: 'The pill is thrown to the choice (460ms). Bars with the same key in both periods glide to their new place and width (560ms) and ease to their new height; bars that leave fold to nothing on the side they were on; new bars grow in. The scale labels, total and change roll.' },
    { name: 'hover', description: 'A hairline column glides to the bar under the pointer (380ms, slight overshoot), the other bars dim, and the readout at its top slides along with the month morphing and the amount rolling. On touch, tap or drag across the bars.' },
    { name: 'change', description: 'The change against the period before is a chip, emerald with an up arrow or red with the arrow turned down. A period with nothing to compare folds the chip away.' },
  ],
  usage: `import { EarningsChart } from "@/components/earnings-chart";

<EarningsChart
  title="Earned so far"
  periods={[
    { id: "6m", label: "6M", bars: lastSixMonths, previous: 46120, comparison: "vs May to Oct last year" },
    { id: "1y", label: "1Y", bars: lastTwelveMonths, previous: 61940, comparison: "vs the year before" },
  ]}
  defaultValue="1y"
/>`,
  recipeTitle: 'From your database',
  recipeIntro: 'Group revenue by month on the server and give every month the same key in every period, so the months two periods share glide between them.',
  recipe: `import { EarningsChart, type EarningsPeriod } from "@/components/earnings-chart";
import { db } from "@/lib/db";

export async function EarningsCard() {
  const months = await db.revenueByMonth({ months: 12 }); // [{ month: "2026-08", total: 11210 }, …]
  const bars = months.map((m) => ({
    key: m.month,
    label: new Date(m.month).toLocaleDateString("en-GB", { month: "short" }),
    title: new Date(m.month).toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    value: m.total,
  }));
  const periods: EarningsPeriod[] = [
    { id: "6m", label: "6M", bars: bars.slice(-6), previous: await db.revenueBetween("-18m", "-12m") },
    { id: "1y", label: "1Y", bars, previous: await db.revenueBetween("-24m", "-12m") },
  ];
  return <EarningsChart title="Earned so far" periods={periods} defaultValue="1y" />;
}`,
  props: [
    { name: 'periods', type: 'EarningsPeriod[]', description: 'Each with id, label (for the switch), bars ({ key, label, value, title? }) and optionally previous (the total before, for the chip) and comparison.' },
    { name: 'value / defaultValue', type: 'string', default: 'the last period', description: 'The period on show, by id; controlled or not.' },
    { name: 'onValueChange', type: '(id: string) => void', description: 'Called when the period changes.' },
    { name: 'title', type: 'string', default: '"Earnings"', description: 'Above the total.' },
    { name: 'format', type: 'Intl.NumberFormatOptions', default: 'USD, no decimals', description: 'How amounts read; the scale uses the same with compact notation.' },
    { name: 'highlight', type: 'string', default: 'the last bar', description: 'The bar drawn in your primary colour, by key.' },
    { name: 'locales', type: 'string | string[]', description: 'For number formatting.' },
  ],
  notes: [
    'The period switch is a radio group (arrow keys move). The plot is one tab stop: arrow keys, Home and End move the readout between bars and it is announced politely; Escape hides it.',
    'Every bar’s figure is in a visually hidden table, with the total in its caption.',
    'Green and red are only used for the change, and always with an arrow that points the same way.',
    'Bars, lane and readout are divs moved by left, width and height on a dozen elements; nothing animates while it’s off screen.',
    'Installs Number roll and Text morph. With reduced motion every change happens in place.',
  ],
};
