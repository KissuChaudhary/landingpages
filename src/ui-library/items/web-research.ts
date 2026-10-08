import type { UiItem } from '../registry';

export const webResearch: UiItem = {
  name: 'web-research',
  title: 'Web research',
  description: 'Watch the agent search: the query types in, page icons stack up as it reads, then it folds into a source list.',
  summary:
    'A spinner during web search hides the most reassuring part: what the agent is actually reading. "Searching" shimmers next to the live query as it types in. Each page read drops its icon into an overlapping stack, and its title crossfades underneath. When the work is done, the whole run settles into one quiet line, "3 searches · 9 sources", that opens into the queries and every page, each a link.',
  file: 'web-research.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-shimmer', '@keyframes ui-fade-in', '@keyframes ui-fade-up', '@keyframes ui-breathe', '@keyframes ui-drop-in'],
  tabs: ['Live', 'Done', 'Failed'],
  states: [
    { name: 'searching', description: '"Searching" shimmers and the newest query types in after it.' },
    { name: 'reading', description: 'Each new page’s icon drops into the stack (four shown, then +N), and its title fades in below.' },
    { name: 'done', description: '"3 searches · 9 sources" with a chevron; it opens into the queries and the page list.' },
    { name: 'error', description: '"Search failed" in red, still listing anything found before it failed.' },
    { name: 'cancelled', description: '"Stopped after 2 searches", with what was found.' },
  ],
  usage: `import { WebResearch } from "@/components/web-research";

<WebResearch status="reading" queries={["pistachio paste suppliers"]} sources={[{ url, title }]} />`,
  recipe: `// Server: a search tool (any provider: Exa, Tavily, your own index)
const searchWeb = tool({
  description: "Search the web",
  inputSchema: z.object({ query: z.string() }),
  execute: async ({ query }) => (await search(query)).map((r) => ({ url: r.url, title: r.title })),
});

// Client: read the run straight from the message parts
import type { UIMessage } from "ai";
import { WebResearch } from "@/components/web-research";

function Research({ message, streaming }: { message: UIMessage; streaming: boolean }) {
  const calls = message.parts.filter((p) => p.type === "tool-searchWeb");
  if (!calls.length) return null;
  const queries = calls.map((p) => p.input?.query).filter(Boolean);
  const sources = calls.flatMap((p) => (p.state === "output-available" ? p.output : []));
  const searching = calls.some((p) => p.state === "input-streaming" || p.state === "input-available");
  const failed = calls.some((p) => p.state === "output-error");
  const answering = message.parts.some((p) => p.type === "text" && p.text);
  const status = failed ? "error" : searching ? "searching" : streaming && !answering ? "reading" : "done";
  return <WebResearch status={status} queries={queries} sources={sources} />;
}`,
  props: [
    { name: 'status', type: '"searching" | "reading" | "done" | "error" | "cancelled"', description: 'Where the run is.' },
    { name: 'queries', type: 'string[]', description: 'Searches so far; the last one types in while searching.' },
    { name: 'sources', type: '{ url; title?; favicon? }[]', description: 'Pages read, in order. Without a favicon, a monogram tinted from the site name.' },
    { name: 'open / defaultOpen / onOpenChange', type: 'boolean / boolean / (open) => void', description: 'Whether the finished run shows its list.' },
  ],
  notes: [
    'While working it is a polite live region: "Searching for …", then "Read 6 sites".',
    'The finished line is a button with aria-expanded; the list is hidden from assistive tech and the tab order while folded.',
    'Every source is a real link that opens in a new tab, so people can check the agent’s reading.',
    'With reduced motion the query appears whole and nothing slides; the list opens instantly.',
  ],
};
