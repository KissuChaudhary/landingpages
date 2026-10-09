import type { UiItem } from '../registry';

export const revenueChart: UiItem = {
  name: 'revenue-chart',
  title: 'Revenue chart',
  description: 'This year as an area, last year behind it; point at a month and the header becomes the readout, switch the measure and the lines reshape.',
  summary:
    'A year against the year before is the chart every business dashboard wants, and most bolt a tooltip box onto it. Here the header is the readout: point at a month and a hairline follows you with a dot on each line while the title morphs to "Revenue in August", the total rolls to that month’s figure, the change chip follows and the last-year line beneath it says what August was a year ago; move away and everything rolls back to the year. Switch from Revenue to Orders or Average order and both lines morph into their new shapes while the scale and the figures roll. The first time the card scrolls into view the chart draws itself from left to right, and a year still under way ends its line with a dot. Hand-drawn SVG with a monotone curve, no chart library.',
  file: 'revenue-chart.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  states: [
    { name: 'arrive', description: 'In view for the first time, everything drawn is revealed from left to right (1200ms) and the total rolls up from zero.' },
    { name: 'hover', description: 'A hairline glides to the nearest month (260ms, slight overshoot) with a dot on each line. The title morphs to "<measure> in <month>", the total rolls to the month, the chip shows its change on last year and the line below morphs to last year’s figure for it. Leaving rolls it all back.' },
    { name: 'measure', description: 'With more than one measure, the pill is thrown to the choice (460ms); both lines and the area tween to their new values (640ms) while the scale labels and figures roll.' },
    { name: 'partial', description: 'When this year has fewer values than labels, its line ends with a dot at the latest month and the comparison uses last year’s same months.' },
  ],
  usage: `import { RevenueChart } from "@/components/revenue-chart";

<RevenueChart
  labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
  metrics={[{ id: "revenue", label: "Revenue", current: thisYear, previous: lastYear, format: { style: "currency", currency: "USD" } }]}
/>`,
  recipeTitle: 'From Stripe',
  recipeIntro: 'Sum paid invoices by month for this year and last on the server, then pass both series; add orders or average order as extra measures.',
  recipe: `import { RevenueChart } from "@/components/revenue-chart";
import { stripe } from "@/lib/stripe";

async function monthly(year: number) {
  const totals = Array(12).fill(0);
  for await (const invoice of stripe.invoices.list({ status: "paid", created: { gte: Date.UTC(year, 0) / 1000, lt: Date.UTC(year + 1, 0) / 1000 } })) {
    totals[new Date(invoice.created * 1000).getUTCMonth()] += invoice.amount_paid / 100;
  }
  return totals;
}

export async function RevenueCard() {
  const year = new Date().getUTCFullYear();
  const [current, previous] = await Promise.all([monthly(year), monthly(year - 1)]);
  return (
    <RevenueChart
      labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
      series={[String(year), String(year - 1)]}
      metrics={[{ id: "revenue", label: "Revenue", current: current.slice(0, new Date().getUTCMonth() + 1), previous, format: { style: "currency", currency: "USD", maximumFractionDigits: 0 } }]}
    />
  );
}`,
  props: [
    { name: 'labels', type: 'string[]', description: 'Along the bottom, one per point; they thin out on narrow screens.' },
    { name: 'titles', type: 'string[]', description: 'Longer names for the readout, e.g. "August".' },
    { name: 'metrics', type: 'RevenueMetric[]', description: '{ id, label, current, previous?, format?, total? ("sum" or "average") }. More than one shows a switch.' },
    { name: 'value / defaultValue', type: 'string', default: 'the first measure', description: 'The measure on show, by id; controlled or not.' },
    { name: 'onValueChange', type: '(id: string) => void', description: 'Called when the measure changes.' },
    { name: 'series', type: '[string, string]', default: '["This year", "Last year"]', description: 'The two lines’ names, in the legend and the readout.' },
    { name: 'locales', type: 'string | string[]', description: 'For number formatting.' },
  ],
  notes: [
    'The plot is one tab stop: arrow keys, Home and End move between months, the header follows, and the month with both figures is announced politely; Escape returns to the year.',
    'The two lines differ by more than colour: this year is solid with a wash beneath, last year is a dashed grey line, and the legend draws both keys.',
    'Every month is in a visually hidden table with both years, and the totals in its caption.',
    'The line uses --chart-1 (your primary if the theme has no chart colours); gridlines are solid hairlines.',
    'Installs Number roll and Text morph. With reduced motion the chart is simply there and changes happen in place.',
  ],
};
