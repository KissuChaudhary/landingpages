import type { UiItem } from '../registry';

export const announcementPill: UiItem = {
  name: 'announcement-pill',
  title: 'Announcement pill',
  description: '"New: …" above your headline that opens into the news: the pill itself grows into a changelog card.',
  summary:
    'Every launch hero has a little "New" pill, and it’s usually a plain link. This one rewards curiosity. Point at it and the arrow nudges on while a second phrase folds open. Click it and the pill itself grows into a card with the details: its size and corners ease from pill to card while the line cross-fades into the content. Close it and it folds back into the pill. Without card content it’s simply a link.',
  file: 'announcement-pill.tsx',
  dependencies: [],
  css: [],
  states: [
    { name: 'rest', description: 'A tinted badge and one line in a hairline pill.' },
    { name: 'hover', description: 'The arrow slides 2px on and "· Read the changelog" folds open from zero width (500ms); the edge darkens a touch.' },
    { name: 'open', description: 'The pill grows into a 360px card (420ms), centred on where the pill was; the card’s first link takes focus.' },
    { name: 'close', description: 'Escape, the close button or a click outside folds the card back into the pill and returns focus.' },
  ],
  usage: `import { AnnouncementPill } from "@/components/announcement-pill";

<AnnouncementPill more="Read the changelog" card={<Changelog />}>
  Agents can now hand off
</AnnouncementPill>`,
  recipeTitle: 'In a hero',
  recipeIntro: 'Put it above the headline; pass a card for the details, or an href to link out.',
  recipe: `import { AnnouncementPill } from "@/components/announcement-pill";

export function Hero({ latest }: { latest: { title: string; items: { date: string; title: string }[] } }) {
  return (
    <section className="flex flex-col items-center pt-24 text-center">
      <AnnouncementPill
        more="Read the changelog"
        card={
          <div className="p-5">
            <p className="text-xs text-muted-foreground">What’s new</p>
            <ol className="mt-3 space-y-3">
              {latest.items.map((item) => (
                <li key={item.title} className="text-sm">
                  <span className="mr-2 font-mono text-xs text-muted-foreground">{item.date}</span>
                  {item.title}
                </li>
              ))}
            </ol>
            <a href="/changelog" className="mt-4 inline-block text-sm underline underline-offset-4">See all updates</a>
          </div>
        }
      >
        {latest.title}
      </AnnouncementPill>
      <h1 className="mt-6 text-6xl font-medium tracking-tight">Ship the launch page tonight.</h1>
    </section>
  );
}`,
  props: [
    { name: 'children', type: 'ReactNode', description: 'The announcement line.' },
    { name: 'badge', type: 'string', default: '"New"', description: 'The tinted label at the start.' },
    { name: 'more', type: 'string', description: 'A second phrase that folds open on hover or keyboard focus.' },
    { name: 'card / cardWidth', type: 'ReactNode / number', default: '— / 360', description: 'What the pill opens into, and how wide (never wider than the screen).' },
    { name: 'href', type: 'string', description: 'Without a card, the pill links here.' },
  ],
  notes: [
    'With a card, the pill is a button with aria-expanded; the card is a labelled dialog and its first link takes focus when it opens.',
    'Escape, the close button or a click outside closes it, and focus returns to the pill.',
    'The hover phrase also opens on keyboard focus, so nobody misses it.',
    'With reduced motion the card simply appears and disappears.',
  ],
};
