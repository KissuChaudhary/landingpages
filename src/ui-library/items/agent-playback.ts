import type { UiItem } from '../registry';

export const agentPlayback: UiItem = {
  name: 'agent-playback',
  title: 'Agent playback',
  description: 'Your AI product working, hands-off and on a loop: the hero demo built from the real components.',
  summary:
    'A screen recording of your product goes stale the day you ship, and a static mock looks like one. This plays a scripted conversation through the real components instead. The prompt types itself into the composer with a person’s uneven rhythm, then lifts out and glides into the message bubble. The agent’s work arrives block by block, each opening its own room so everything above glides up: a thinking trace ticking off steps, web research stacking its sources, a tool call filling in its arguments. The answer streams in with its citations, holds a beat, then the conversation dissolves and the next prompt starts. It pauses off-screen and in a background tab, has its own pause button, and with reduced motion shows the finished conversation, still.',
  file: 'agent-playback.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['prompt-composer', 'thinking-trace', 'web-research', 'tool-call', 'streaming-answer'],
  css: [],
  states: [
    { name: 'typing', description: 'The prompt types in at 26–60ms a character, pausing after words and punctuation.' },
    { name: 'sent', description: 'The text glides from the composer into its bubble (620ms) as Send becomes a spinner.' },
    { name: 'working', description: 'Each step’s block opens its own height (520ms) and blurs in: thinking, search, tool call, in your script’s order.' },
    { name: 'answering', description: 'The answer streams a few words at a time; its actions fold in once it’s done.' },
    { name: 'next', description: 'After hold ms the conversation lifts and dissolves (480ms) and the next turn begins; it loops unless loop is false.' },
    { name: 'paused', description: 'Off-screen, in a hidden tab, with the pause button or the paused prop. Waits resume exactly where they stopped.' },
  ],
  usage: `import { AgentPlayback, type PlaybackTurn } from "@/components/agent-playback";

const turns: PlaybackTurn[] = [
  {
    prompt: "Summarise this week's churn",
    steps: [
      { type: "thinking", steps: ["Reading the events", "Grouping by plan"] },
      { type: "tool", name: "run_query", input: { table: "events", since: "7d" }, output: { rows: 1284 } },
      { type: "answer", content: "Churn fell to 2.1% this week, mostly on the Starter plan." },
    ],
  },
];

<AgentPlayback turns={turns} header="Acme" />`,
  recipeTitle: 'In a hero section',
  recipeIntro: 'Beside your headline it shows the product doing the job, so the page explains itself.',
  recipe: `import { AgentPlayback } from "@/components/agent-playback";
import { turns } from "./demo-script";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
      <div>
        <h1 className="text-5xl font-medium tracking-[-0.04em]">Answers your ops team can act on</h1>
        <p className="mt-4 text-lg text-muted-foreground">Ask in plain words. Relay reads, checks and does the work.</p>
      </div>
      <AgentPlayback turns={turns} header="Relay" height={560} />
    </section>
  );
}`,
  props: [
    { name: 'turns', type: 'PlaybackTurn[]', description: 'Each a prompt and its steps: thinking, search, tool and answer, in any order and number.' },
    { name: 'speed', type: 'number', default: '1', description: 'Pace; 2 plays twice as fast.' },
    { name: 'hold', type: 'number', default: '4200', description: 'How long a finished answer stays before the next prompt (ms).' },
    { name: 'loop', type: 'boolean', default: 'true', description: 'Start again after the last turn.' },
    { name: 'paused', type: 'boolean', default: 'false', description: 'Pause from outside, e.g. while a dialog is open.' },
    { name: 'header / placeholder', type: 'ReactNode / string', description: 'A title bar (your product’s name) and the composer’s placeholder.' },
    { name: 'height', type: 'number', default: '540', description: 'Fixed, so the page around it never moves; the conversation grows up from the composer and fades at the top.' },
  ],
  notes: [
    'The moving copy is inert and hidden from screen readers; a sentence describes what the demo shows instead. The pause button meets the rule that anything moving for more than five seconds can be paused.',
    'It pauses when less than 15% is on screen or the tab is hidden, and resumes from the exact moment it stopped; live timers skip the paused time.',
    'The script restarts only when its prompts change, so an inline array in a component that re-renders is fine.',
    'With reduced motion it shows the first conversation finished and holds still.',
    'Installs the composer, thinking trace, web research, tool call and streaming answer it plays.',
  ],
};
