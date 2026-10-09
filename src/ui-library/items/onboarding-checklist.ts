import type { UiItem } from '../registry';

export const onboardingChecklist: UiItem = {
  name: 'onboarding-checklist',
  title: 'Onboarding checklist',
  description: 'The first five things, ticked off in place: a ring that fills, checks that draw, and a finish worth seeing.',
  summary:
    'A checklist is the first thing a new customer sees, and most are a static list of links. Here the next task is open in place: what it is, why it matters and the one button that does it. That button runs your action with a spinner and a morphing label; when it lands, a check draws itself on the row, a strike draws through the label, the next task opens, the ring fills a step and "2 of 5" rolls. Any row can be opened to revisit it, and the whole card folds to its header. When the last task is done the list folds away, the ring becomes a check with a small burst, and the title morphs to "You’re all set".',
  file: 'onboarding-checklist.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: ['@keyframes ui-fade-in'],
  tabs: ['Fresh', 'Nearly done'],
  states: [
    { name: 'next', description: 'The first open task is expanded with its description and action, on a soft tint.' },
    { name: 'doing', description: 'A spinner opens in the button and its label morphs to pendingLabel while your promise runs.' },
    { name: 'ticked', description: 'The ring blurs into a filled circle and its check draws (380ms); a strike draws through the label (480ms); this task folds and the next opens (420ms). The ring advances and the count rolls.' },
    { name: 'picked', description: 'Clicking any row opens it, done or not; finishing a task returns to the next open one.' },
    { name: 'folded', description: 'The chevron folds the list to the header, which keeps the ring and count.' },
    { name: 'done', description: 'The list folds, the ring fills and a primary disc grows over it with a check drawing itself, ten dots burst outward (700ms), the title morphs to doneTitle and Hide fades in.' },
  ],
  usage: `import { OnboardingChecklist } from "@/components/onboarding-checklist";

<OnboardingChecklist
  tasks={[
    { id: "menu", title: "Add your menu", description: "Flavours, sizes and prices.", action: { label: "Import menu", pendingLabel: "Importing", onClick: importMenu } },
    { id: "payments", title: "Connect payments", action: { label: "Connect", href: "/settings/payments" } },
  ]}
/>`,
  recipeTitle: 'From your data',
  recipeIntro: 'Pass done from your database so progress survives a reload, and mark tasks done as their actions land.',
  recipe: `"use client";
import { OnboardingChecklist } from "@/components/onboarding-checklist";
import { useOnboarding } from "@/lib/onboarding";

export function GetStarted() {
  const { steps, complete, dismiss } = useOnboarding();
  return (
    <OnboardingChecklist
      tasks={steps.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        done: s.done,
        action: { label: s.cta, pendingLabel: s.pending, onClick: () => s.run() },
      }))}
      onTaskComplete={(id) => complete(id)}
      onDismiss={dismiss}
    />
  );
}`,
  props: [
    { name: 'tasks', type: 'OnboardingTask[]', description: 'id, title, and any of description, done (controlled), and action { label, pendingLabel?, onClick? (return a promise to show progress), href? }.' },
    { name: 'title / doneTitle / doneDescription', type: 'string', default: '"Get started" / "You’re all set" / …', description: 'The heading before and after, and the line shown once everything’s done.' },
    { name: 'onTaskComplete', type: '(id) => void', description: 'Called when a task’s action resolves; mark it done here if you control done.' },
    { name: 'onDismiss', type: '() => void', description: 'Shows Hide once everything is done.' },
    { name: 'defaultCollapsed', type: 'boolean', default: 'false', description: 'Start folded to the header.' },
  ],
  notes: [
    'An ordered list of disclosure buttons, each with aria-expanded; done tasks say so to screen readers. Progress is announced politely ("3 of 5 done") and once more when all is done.',
    'The action button stays focusable while it runs and is marked aria-busy; a rejected promise leaves the task open to try again.',
    'Folded parts are inert, so the keyboard never lands inside them.',
    'Installs Number roll and Text morph. With reduced motion, ticks, strikes and the finish change in place without the burst.',
  ],
};
