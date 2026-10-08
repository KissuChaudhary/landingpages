import type { UiItem } from '../registry';

export const citation: UiItem = {
  name: 'citation',
  title: 'Citation',
  description: 'An inline numbered source that previews the site, title and snippet on hover or focus.',
  summary:
    'Answers that cite sources earn trust, but a wall of links at the bottom gets ignored. This puts a small numbered marker right in the sentence. Hover or focus it and a card rises out of a light blur to show where the claim comes from, then sinks back when you leave; click and the source opens. The card flips above near the bottom of the screen and shifts to stay on it, and a source that couldn’t be fetched says so instead of failing quietly.',
  file: 'citation.tsx',
  dependencies: ['lucide-react'],
  css: [],
  states: [
    { name: 'closed', description: 'A quiet numbered marker that sits on the text’s baseline.' },
    { name: 'open', description: 'After a short hover delay, or at once on focus: site, title and a snippet. The card rises 4px out of a 2px blur (220ms) and sinks back the same way when it closes (140ms).' },
    { name: 'unavailable', description: 'The marker is struck through and the card says the source couldn’t be loaded.' },
  ],
  usage: `import { Citation } from "@/components/citation";

<p>
  Highlights style text without touching the DOM
  <Citation index={1} source={{ title: "CSS Custom Highlight API", url: "https://developer.mozilla.org/…", snippet: "…" }} />
</p>`,
  recipe: `// app/api/chat/route.ts: send search results to the client as sources
return result.toUIMessageStreamResponse({ sendSources: true });

// The answer: sources arrive as "source-url" parts; swap each [n] the model writes for a Citation
import type { UIMessage } from "ai";
import { Citation } from "@/components/citation";

function Answer({ message }: { message: UIMessage }) {
  const sources = message.parts.filter((part) => part.type === "source-url");
  const text = message.parts.map((part) => (part.type === "text" ? part.text : "")).join("");
  return (
    <p>
      {text.split(/\\[(\\d+)\\]/).map((chunk, i) => {
        if (i % 2 === 0) return chunk;
        const source = sources[Number(chunk) - 1];
        return (
          <Citation
            key={i}
            index={Number(chunk)}
            source={source && { title: source.title ?? source.url, url: source.url }}
          />
        );
      })}
    </p>
  );
}`,
  props: [
    { name: 'index', type: 'number', description: 'The number shown in the marker.' },
    { name: 'source', type: '{ title; url; snippet?; icon? }', description: 'What the card shows. icon takes a favicon element; a globe is shown without one.' },
    { name: 'status', type: '"available" | "unavailable"', default: '"available"', description: 'Unavailable (or no source) strikes the marker and explains in the card.' },
  ],
  notes: [
    'The marker is a real link, so middle-click and Ctrl-click work, and it’s labelled "Source 1: title".',
    'The card is a tooltip linked with aria-describedby; it opens on keyboard focus and closes on Escape.',
    'Short open and close delays stop cards flickering as the pointer crosses a paragraph.',
  ],
};
