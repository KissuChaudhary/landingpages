import type { UiItem } from '../registry';

export const usageMeter: UiItem = {
  name: 'usage-meter',
  title: 'Usage meter',
  description: 'Credits, messages or context left: quiet when there’s plenty, clear before it runs out.',
  summary:
    'Running out mid-task is the worst way to learn about a limit. The meter stays quiet while there’s plenty, with numbers that roll as they’re spent; it turns amber and opens the way to upgrade once a fifth is left; and when you’re out the numbers fold away as the words glide into "No credits left" and "Resets Oct 12" morphs into "You’re out until Oct 12." Use the bar in settings and menus, or the ring, small enough for a composer toolbar, for how full the context window is.',
  file: 'usage-meter.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  tabs: ['Normal', 'Low', 'Out', 'Ring'],
  states: [
    { name: 'normal', description: '"1,240 of 2,000 credits left" over a neutral bar, and when it resets. Spending rolls the numbers (700ms) and eases the bar.' },
    { name: 'low', description: 'The bar turns amber once a fifth (lowAt) is left and the Upgrade link opens in beside the reset date.' },
    { name: 'out', description: 'Red. The numbers fold away while "credits left" morphs into "No credits left"; the footer morphs to "You’re out until Oct 12."' },
    { name: 'ring', description: 'A ring that fills and a percent that rolls; amber when low, red when full.' },
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
    'Numbers are mono and tabular, so they don’t jitter as they roll. The rolling text is decorative; the meter’s aria-valuetext carries the real figures.',
    'Installs Number roll and Text morph. With reduced motion the bar, ring and numbers change in place.',
  ],
};
