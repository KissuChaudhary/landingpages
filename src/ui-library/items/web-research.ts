import type { UiItem } from '../registry';

export const webResearch: UiItem = {
  name: 'web-research',
  title: 'Web research',
  description: 'Watch the agent search: the query types in, page icons stack up as it reads, then it folds into a source list.',
  summary:
    'A spinner during web search hides the most reassuring part: what the agent is actually reading. "Searching" carries a sweep of light next to the live query as it types in, then morphs to "Reading" as the page count rolls up. Each page drops its icon into an overlapping stack, pushing the oldest to fold away, and its title rises in underneath while the last one lifts off. When the work is done, the same line rearranges itself into "3 searches · 9 sources": counts roll, words morph, the title row folds shut and a chevron opens in. It opens into the queries and every page, each a link.',
  file: 'web-research.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll', 'text-morph'],
  css: ['@keyframes ui-sheen', '@keyframes ui-breathe', '@keyframes ui-drop-in'],
  tabs: ['Live', 'Done', 'Failed'],
  states: [
    { name: 'searching', description: 'A 1.4s sweep of light crosses "Searching" and the newest query opens in after it, typing as it goes.' },
    { name: 'reading', description: 'The label morphs to "Reading" and "7 sites" rolls. Each page’s icon drops into the stack (four shown; the oldest folds away over 420ms and +N rolls) and its title rises out of a 4px blur as the last one lifts off.' },
    { name: 'done', description: 'The same line rearranges into "3 searches · 9 sources": pieces open and fold over 460ms, counts roll, "sites" morphs to "sources", the title row folds shut and a chevron opens in. It opens into the queries and the page list.' },
    { name: 'error', description: 'The label morphs to "Search failed" in red, still counting and listing anything found before it failed.' },
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
    'A polite status region beside the row reads "Searching for …", "Read 6 sites", then the finished summary. The counts and words are real text for screen readers; the rolling digits are hidden from them.',
    'The row is one button from start to finish, disabled while the agent works, so nothing remounts and every piece can morph. Once done it has aria-expanded; the list is hidden from assistive tech and the tab order while folded.',
    'The sweep of light is a moving mask, so it also covers letters that are mid-morph. Installs Number roll and Text morph alongside it.',
    'Every source is a real link that opens in a new tab, so people can check the agent’s reading.',
    'With reduced motion the query appears whole, there is no sweep, nothing rolls or slides, and the list opens instantly.',
  ],
};
