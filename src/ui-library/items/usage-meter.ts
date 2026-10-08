import type { UiItem } from '../registry';

export const usageMeter: UiItem = {
  name: 'usage-meter',
  title: 'Usage meter',
  description: 'Credits, messages or context left: quiet when there’s plenty, clear before it runs out.',
  summary:
    'Running out mid-task is the worst way to learn about a limit. The meter stays quiet while there’s plenty, turns amber with the way to upgrade once a fifth is left, and says plainly when you’re out and when it resets. Use the bar in settings and menus, or the ring, small enough for a composer toolbar, for how full the context window is.',
  group: 'answer',
  file: 'usage-meter.tsx',
  dependencies: [],
  css: [],
  tabs: ['Normal', 'Low', 'Out', 'Ring'],
  states: [
    { name: 'normal', description: '"1,240 of 2,000 credits left" over a neutral bar, and when it resets.' },
    { name: 'low', description: 'Amber once a fifth (lowAt) is left, with the Upgrade link.' },
    { name: 'out', description: 'Red, "No credits left", and "You’re out until Oct 12".' },
  ],
  usage: `import { UsageMeter } from "@/components/usage-meter";

<UsageMeter used={760} limit={2000} unit="credits" resetAt={resetAt} onUpgrade={openPricing} />
<UsageMeter variant="ring" label="Context" unit="tokens" used={54_000} limit={128_000} />`,
  recipe: `// app/api/chat/route.ts: attach token usage to each answer
return result.toUIMessageStreamResponse({
  messageMetadata: ({ part }) =>
    part.type === "finish" ? { totalTokens: part.totalUsage.totalTokens } : undefined,
});

// The composer toolbar: how full the context window is
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { UsageMeter } from "@/components/usage-meter";

type Message = UIMessage<{ totalTokens?: number }>;

function ContextMeter() {
  const { messages } = useChat<Message>();
  // The last answer's total covers everything sent with it plus what it wrote.
  const used = messages.findLast((m) => m.role === "assistant")?.metadata?.totalTokens ?? 0;
  return <UsageMeter variant="ring" label="Context" unit="tokens" used={used} limit={128_000} />;
}`,
  props: [
    { name: 'used / limit', type: 'number', description: 'How much is used, out of how much.' },
    { name: 'unit / label', type: 'string', default: '"credits" / "Usage"', description: 'What’s counted, and the meter’s name.' },
    { name: 'resetAt', type: 'number | Date', description: 'When it resets; shown under the bar and in the out state.' },
    { name: 'variant', type: '"bar" | "ring"', default: '"bar"', description: 'A full-width bar, or a 16px ring with a percentage.' },
    { name: 'lowAt', type: 'number', default: '0.2', description: 'Share left at which it turns amber.' },
    { name: 'onUpgrade / upgradeLabel', type: '() => void / string', default: '"Upgrade"', description: 'Shown when low or out.' },
  ],
  notes: [
    'role="meter" with aria-valuetext like "1,240 of 2,000 credits left", so the number is read, not a percentage.',
    'Colour is never the only signal: the text changes too, and the ring has a title with the full summary.',
    'Numbers are mono and tabular, so they don’t jitter as they change.',
  ],
};
