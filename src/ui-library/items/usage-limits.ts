import type { UiItem } from '../registry';

export const usageLimits: UiItem = {
  name: 'usage-limits',
  title: 'Usage limits',
  description: 'What an agent has left: the context window split by what fills it, and each plan limit with its share and a live reset countdown.',
  summary:
    'People running agents keep asking two things: how full is the context, and how long until my limit resets. This card answers both in a small space. The context window is one bar split by what fills it (system prompt, tools, files, conversation), with a 2px gap between parts; the chevron folds the breakdown open underneath, and pointing at a part steps the others back. Below a hairline, each plan limit is a bar with its share and when it resets: under a day away it counts down, the minutes rolling down like a clock, and further out it gives the day and time. A bar turns amber past 80% and red at its limit, where "Limit reached" folds open beside the share. The first time it’s seen the bars grow from the left and every figure rolls up.',
  file: 'usage-limits.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll'],
  css: [],
  tabs: ['Normal', 'Near the limit', 'Reached'],
  states: [
    { name: 'arrive', description: 'In view for the first time, every bar grows from the left (900ms, staggered) and every figure rolls up from zero.' },
    { name: 'breakdown', description: 'The context heading is a disclosure: the chevron turns and the list of parts folds open (420ms) with each part’s tokens and share. Pointing at a part or its row dims the others.' },
    { name: 'countdown', description: 'A reset under a day away reads "Resets in 2 h 46 min"; the clock ticks on each whole minute and the minutes roll down. Further away it reads "Resets Tue 3:00 pm".' },
    { name: 'status', description: 'At 80% a bar and its share turn amber; at 100% they turn red and "Limit reached" folds open beside the share.' },
  ],
  usage: `import { UsageLimits } from "@/components/usage-limits";

<UsageLimits
  plan="Max"
  context={{ limit: 1000000, parts: [{ id: "system", label: "System prompt", tokens: 14000 }, { id: "chat", label: "Conversation", tokens: 548000 }] }}
  limits={[{ id: "five-hour", label: "5-hour window", used: 38, limit: 100, resetsAt: resetTime }]}
/>`,
  recipeTitle: 'From your usage API',
  recipeIntro: 'Read the session’s token counts and the account’s limits on the server and pass them straight in; the countdown runs on its own.',
  recipe: `import { UsageLimits } from "@/components/usage-limits";
import { getUsage } from "@/lib/usage";

export async function LimitsPanel({ sessionId }: { sessionId: string }) {
  const usage = await getUsage(sessionId);
  return (
    <UsageLimits
      plan={usage.plan.name}
      context={{
        limit: usage.context.window,
        parts: [
          { id: "system", label: "System prompt", tokens: usage.context.system },
          { id: "tools", label: "Tools", tokens: usage.context.tools },
          { id: "files", label: "Files read", tokens: usage.context.files },
          { id: "chat", label: "Conversation", tokens: usage.context.messages },
        ],
      }}
      limits={usage.limits.map((l) => ({ id: l.id, label: l.name, used: l.used, limit: l.max, resetsAt: l.resetsAt }))}
    />
  );
}`,
  props: [
    { name: 'limits', type: 'PlanLimit[]', description: '{ id, label, used, limit, resetsAt? } for each plan limit.' },
    { name: 'context', type: '{ limit; parts: ContextPart[] }', description: 'The context window and what fills it, each part { id, label, tokens }; up to five colours.' },
    { name: 'plan', type: 'string', description: 'The plan’s name after "Plan limits".' },
    { name: 'onPlanClick', type: '() => void', description: 'Makes the plan heading a button with an arrow, e.g. to billing.' },
    { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Start with the context breakdown open.' },
    { name: 'locales', type: 'string | string[]', description: 'For numbers and the reset day.' },
  ],
  notes: [
    'Every figure is real text: tokens, shares, reset times; the bars are hidden from assistive tech.',
    'The context heading is a button with aria-expanded controlling the breakdown, which is inert while folded.',
    'Amber and red always come with a figure, and "Limit reached" is spelled out.',
    'The countdown re-renders once a minute on the whole minute, and only after mounting, so a server render never shows a wrong time.',
    'Installs Number roll. It sizes to its own width; with reduced motion bars and figures change in place.',
  ],
};
