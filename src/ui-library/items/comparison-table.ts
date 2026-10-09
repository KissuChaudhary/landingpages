import type { UiItem } from '../registry';

export const comparisonTable: UiItem = {
  name: 'comparison-table',
  title: 'Comparison table',
  description: 'Plans side by side, with a column that glides to the plan under your pointer and prices that roll.',
  summary:
    'Comparison tables are where people decide, and most are a wall of ticks. Here the recommended plan sits in a hairline column that runs the height of the table. Move across the table and the column glides to the plan under the pointer with a little give, then settles back when you leave, so the eye always has one plan to read down. Monthly/Yearly is thrown to the choice and every price rolls. Each section folds open and shut to its height, and the plan headers stay in view while the features scroll by. On a phone it shows one plan at a time: a switch is thrown to the plan and its column slides in from the side you went.',
  file: 'comparison-table.tsx',
  dependencies: [],
  registryDependencies: ['pricing-toggle'],
  css: ['@keyframes ui-slide-from-right', '@keyframes ui-slide-from-left'],
  states: [
    { name: 'rest', description: 'The featured plan’s column is outlined and tinted from its header to the foot of the table.' },
    { name: 'point', description: 'The column glides to the plan under the pointer (520ms, slight overshoot) and back to the featured plan when the pointer leaves. Touch doesn’t move it.' },
    { name: 'billing', description: 'Prices roll to the new period; plans without a yearly price stay put.' },
    { name: 'groups', description: 'A section’s rows fold to nothing over 460ms as their contents fade; the chevron turns.' },
    { name: 'phone', description: 'Below 640px, a plan switch replaces the columns: its thumb is thrown to the plan and the column slides in 8px from the side you went.' },
  ],
  usage: `import { ComparisonTable } from "@/components/comparison-table";

<ComparisonTable
  yearlyBadge="Save 20%"
  plans={[
    { id: "free", name: "Free", price: 0, cta: { label: "Start free", href: "/signup" } },
    { id: "pro", name: "Pro", price: { monthly: 24, yearly: 19 }, featured: true, badge: "Popular", cta: { label: "Start a trial", href: "/signup?plan=pro" } },
  ]}
  groups={[
    { title: "Usage", rows: [{ label: "Projects", values: { free: "3", pro: "Unlimited" } }] },
    { title: "Security", rows: [{ label: "Single sign-on", values: { free: false, pro: true } }] },
  ]}
/>`,
  recipeTitle: 'Under a fixed navbar',
  recipeIntro: 'Pass the navbar’s height so the plan headers stick just below it.',
  recipe: `import { ComparisonTable } from "@/components/comparison-table";
import { plans, groups } from "@/lib/plans";

export function Compare() {
  return (
    <section id="compare" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="mb-10 text-4xl font-medium tracking-[-0.03em]">Compare plans</h2>
      <ComparisonTable plans={plans} groups={groups} yearlyBadge="Save 20%" stickyTop={64} />
    </section>
  );
}`,
  props: [
    { name: 'plans', type: 'ComparisonPlan[]', description: 'id, name, price (a number, { monthly, yearly }, or null for Custom), and any of description, featured, badge, cta { label, href, onClick }.' },
    { name: 'groups', type: 'ComparisonGroup[]', description: 'Sections of rows: { title, rows: [{ label, hint?, values: { [planId]: true | false | text } }], collapsed? }.' },
    { name: 'yearlyBadge', type: 'string', description: 'Shows the Monthly/Yearly switch with this badge, e.g. "Save 20%".' },
    { name: 'currency', type: 'string', default: '"USD"', description: 'For the prices.' },
    { name: 'stickyTop', type: 'number', default: '0', description: 'How far from the top the plan headers stick.' },
  ],
  notes: [
    'A real table to assistive tech: column headers for plans, row headers for features, and ticks read as "Included" or "Not included".',
    'Section headers are buttons with aria-expanded; folded rows are inert.',
    'The gliding column is decoration only and follows a mouse or pen, not touch.',
    'Installs Pricing toggle (and with it Number roll). With reduced motion the column jumps and nothing slides.',
  ],
};
