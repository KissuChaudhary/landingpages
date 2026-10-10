import type { UiItem } from '../registry';

export const pricingCalculator: UiItem = {
  name: 'pricing-calculator',
  title: 'Pricing calculator',
  description: 'Drag to your size and watch the price roll, the plan morph and, at the top, “Let’s talk”.',
  summary:
    'Usage-based pricing is hard to read from a table. Here people drag to their size and the answer comes to them. The thumb follows the finger with the fill and a value bubble riding along, and the price rolls digit by digit as it goes. Click the track or a mark and the thumb is thrown there with a little give. Crossing a tier morphs the plan’s name, lights the mark and changes the button’s words; past the last tier the price folds away and the line becomes "Let’s talk". With a yearly discount, a Monthly/Yearly switch rolls every figure to its yearly price. The formula is yours: pass price(value) and plan(value), on a linear or logarithmic scale.',
  file: 'pricing-calculator.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph', 'pricing-toggle'],
  css: [],
  states: [
    { name: 'drag', description: 'The thumb, fill and value bubble track the pointer exactly; the price and the value roll (300ms while dragging).' },
    { name: 'jump', description: 'A press on the track, a mark’s label, Page Up/Down, Home or End throws the thumb to the new value over 520ms with a slight overshoot.' },
    { name: 'tier', description: 'Crossing a mark morphs the plan name and the button’s words and turns the mark white on the fill.' },
    { name: 'contact', description: 'At contactFrom the price folds to nothing through a 6px blur as "Let’s talk" opens in its place and the button turns to an outline "Contact sales".' },
    { name: 'yearly', description: 'The switch is thrown to Yearly; the monthly figure rolls down by the discount and the line under it morphs to "$2,995 billed yearly".' },
  ],
  usage: `import { PricingCalculator } from "@/components/pricing-calculator";

<PricingCalculator
  min={1_000}
  max={1_000_000}
  scale="log"
  unit="monthly active users"
  valueFormat={{ notation: "compact" }}
  price={(users) => 29 + users * 0.003}
  plan={(users) => (users < 10_000 ? "Starter" : "Growth")}
  marks={[{ value: 10_000, label: "10K" }]}
  contactFrom={500_000}
  yearlyDiscount={0.2}
/>`,
  recipeTitle: 'In a pricing section',
  recipeIntro: 'Above your plan cards, it answers "what would I pay?" before anyone reads a table.',
  recipe: `import { PricingCalculator } from "@/components/pricing-calculator";
import { price, plan, MARKS } from "@/lib/pricing";

export function Pricing() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="text-4xl font-medium tracking-[-0.03em]">Pay for what you use</h2>
      <div className="mt-10 rounded-[22px] border border-border p-8">
        <PricingCalculator
          min={1_000}
          max={1_000_000}
          scale="log"
          unit="monthly active users"
          valueFormat={{ notation: "compact" }}
          price={price}
          plan={plan}
          marks={MARKS}
          contactFrom={500_000}
          yearlyDiscount={0.2}
          cta={{ label: (p) => \`Start with \${p}\`, onClick: (users, p, billing) => checkout({ users, plan: p, billing }) }}
        />
      </div>
    </section>
  );
}`,
  props: [
    { name: 'min / max / step', type: 'number', default: '— / — / 1', description: 'The range. On a log scale the step grows with the value (thousands near 10K, ten-thousands near 100K).' },
    { name: 'value / defaultValue / onValueChange', type: 'number', description: 'Control it, or let it keep its own.' },
    { name: 'price / plan', type: '(value) => number / (value) => string', description: 'Your monthly price and plan name for a value.' },
    { name: 'marks', type: '{ value; label }[]', description: 'Ticks and labels along the track, e.g. where tiers change; clicking a label throws the thumb there.' },
    { name: 'scale', type: '"linear" | "log"', default: '"linear"', description: 'Log spaces orders of magnitude evenly, so 1K, 10K and 100K get the same room.' },
    { name: 'unit / valueFormat / currency', type: 'string / Intl.NumberFormatOptions / string', default: '— / — / "USD"', description: 'How the value and price read.' },
    { name: 'locales', type: 'string | string[]', default: 'the browser’s', description: 'Locale for every figure. Set it when the page renders on a server, so the server and the browser format prices alike.' },
    { name: 'contactFrom', type: 'number', description: 'From this value, "Let’s talk" replaces the price.' },
    { name: 'yearlyDiscount', type: 'number', description: 'e.g. 0.2 adds a Monthly/Yearly switch with "Save 20%".' },
    { name: 'cta', type: '{ label(plan); contactLabel?; onClick?(value, plan, billing) }', description: 'The button under the price; its words follow the plan.' },
  ],
  notes: [
    'The thumb is a real slider: Arrow keys nudge, Page Up/Down move a tenth, Home and End jump to the ends. Its value text reads the size and the price ("25K monthly active users, $96 a month").',
    'The plan is announced politely as you cross a tier; the rolling digits are hidden from screen readers.',
    'Pointer events with capture, so dragging works with mouse, pen and touch and keeps working outside the track.',
    'Installs Number roll, Text morph and Pricing toggle. With reduced motion the thumb and figures move in place.',
  ],
};
