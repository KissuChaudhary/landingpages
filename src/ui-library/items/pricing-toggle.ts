import type { UiItem } from '../registry';

export const pricingToggle: UiItem = {
  name: 'pricing-toggle',
  title: 'Pricing toggle',
  description: 'Monthly or yearly: the thumb slides with a little give, and every price on the page rolls to its new amount.',
  summary:
    'The billing switch is the one control every pricing page has, and usually the dullest. Here the thumb slides and resizes to the chosen option with a little give at the end, and the labels trade colour. "Save 20%" sits inside Yearly and lights up in your brand colour when it’s chosen. Every Price on the page rolls digit by digit to its new amount, and the billing line underneath slides in from the direction you switched.',
  file: 'pricing-toggle.tsx',
  dependencies: [],
  registryDependencies: ['number-roll'],
  css: ['@keyframes ui-note-in', '@keyframes ui-col-in', '@keyframes ui-col-out'],
  states: [
    { name: 'monthly', description: 'The thumb sits on Monthly; Yearly shows its badge in a soft tint as an incentive.' },
    { name: 'yearly', description: 'The thumb slides and widens over Yearly and its badge, and the badge fills with your brand colour.' },
    { name: 'prices', description: 'Each Price rolls to the new amount; the note ("$276 billed yearly") slides in from the toggle’s direction.' },
  ],
  usage: `import { Price, PricingToggle } from "@/components/pricing-toggle";

const [billing, setBilling] = useState("monthly");

<PricingToggle value={billing} onValueChange={setBilling} />
<Price amount={billing === "yearly" ? 23 : 29} note={billing === "yearly" ? "$276 billed yearly" : "Billed monthly"} />`,
  recipeTitle: 'In a pricing section',
  recipeIntro: 'One toggle drives every plan column; each Price rolls on its own.',
  recipe: `"use client";
import { useState } from "react";
import { Price, PricingToggle } from "@/components/pricing-toggle";

const plans = [
  { name: "Starter", monthly: 12, yearly: 9 },
  { name: "Pro", monthly: 29, yearly: 23 },
  { name: "Team", monthly: 79, yearly: 63 },
];

export function Pricing() {
  const [billing, setBilling] = useState("monthly");
  const yearly = billing === "yearly";

  return (
    <section className="flex flex-col items-center gap-8">
      <PricingToggle value={billing} onValueChange={setBilling} />
      <div className="grid w-full gap-px overflow-hidden rounded-3xl border sm:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-background p-6">
            <h3 className="text-sm font-medium">{plan.name}</h3>
            <Price
              amount={yearly ? plan.yearly : plan.monthly}
              direction={yearly ? 1 : -1}
              note={yearly ? \`$\${plan.yearly * 12} billed yearly\` : "Billed monthly"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}`,
  props: [
    { name: 'value / onValueChange', type: 'string / (value) => void', description: 'The chosen billing period.' },
    { name: 'options', type: '{ value; label; badge? }[]', default: 'Monthly, Yearly “Save 20%”', description: 'Any number of periods, e.g. add Lifetime.' },
    { name: 'Price: amount / currency / period', type: 'number / string / string', default: '— / "USD" / "/mo"', description: 'The figure that rolls, its currency, and the period after it (hidden at 0).' },
    { name: 'Price: note / direction', type: 'string / 1 | -1', description: 'The line under the price, sliding in from the way the toggle moved.' },
    { name: 'Price: numberClassName', type: 'string', description: 'Size and weight of the figure.' },
  ],
  notes: [
    'The toggle is a real radio group: arrow keys move between periods, and only the chosen one is in the tab order.',
    'Prices are real text for screen readers; the rolling digits are decoration on top.',
    'Installs Number roll alongside it.',
    'With reduced motion, the thumb jumps and prices change in place.',
  ],
};
