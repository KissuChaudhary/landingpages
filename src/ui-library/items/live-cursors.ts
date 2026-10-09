import type { UiItem } from '../registry';

export const liveCursors: UiItem = {
  name: 'live-cursors',
  title: 'Live cursors',
  description: 'Other people’s cursors gliding over the same page: names that turn into speech bubbles, click ripples, and selections that follow them around.',
  summary:
    'Multiplayer is the feature people screenshot, and most cursor overlays step from one network update to the next. Here every cursor eases toward its latest position on a spring, so ten updates a second look like a hand moving. Each one carries a pill with the person’s name and colour; near the right or bottom edge the pill swings to the other side so it stays in view. When someone says something the pill grows into a bubble around their words and folds back when they’re done. Clicks send a hairline ring out from the tip, the thing someone is working on gets a 1px outline in their colour that glides to whatever they pick next, and a cursor that hasn’t moved in a while folds its name into the dot and dims until it moves again. Your own side is included: press / and a bubble opens at your pointer.',
  file: 'live-cursors.tsx',
  dependencies: [],
  registryDependencies: [],
  css: [],
  states: [
    { name: 'move', description: 'A spring (stiffness 150, damping 24) per cursor, run in one requestAnimationFrame loop that writes transforms directly and stops once everyone has settled. Someone new appears where they are.' },
    { name: 'say', description: 'The name pill eases its width and height (360ms) to hold the message, which blurs in (300ms); clearing it folds the bubble back to the pill.' },
    { name: 'click', description: 'A 36px hairline ring in their colour scales from 0.3 to 1 and fades (620ms).' },
    { name: 'select', description: 'A 1px outline with a name tag; its box eases to the next selection (420ms) and fades when cleared.' },
    { name: 'idle / leave', description: 'After idleAfter without moving, the name folds into its dot and the cursor dims to 55%. Someone who leaves shrinks and fades (260ms).' },
    { name: 'you', description: 'With onMessage, "/" opens a bubble at your pointer that follows it; Enter sends, Escape or clicking away closes. What you sent stays for 4 seconds.' },
  ],
  usage: `import { LiveCursors } from "@/components/live-cursors";

<LiveCursors
  cursors={[
    { id: "ana", name: "Ana", x: 0.42, y: 0.3, message: "Love this headline" },
    { id: "kofi", name: "Kofi", x: 0.7, y: 0.8, selection: { x: 0.36, y: 0.72, width: 0.28, height: 0.21 } },
  ]}
>
  <Canvas />
</LiveCursors>`,
  recipeTitle: 'With a realtime channel',
  recipeIntro: 'Send your pointer (already in 0–1 units) on every move, and pass everyone else’s straight back in; the springs smooth whatever rate the channel manages.',
  recipe: `"use client";
import { useEffect, useState } from "react";
import { LiveCursors, type LiveCursor } from "@/components/live-cursors";
import { channel, me } from "@/lib/realtime"; // Liveblocks, PartyKit, Supabase Realtime…

export function Room({ children }: { children: React.ReactNode }) {
  const [others, setOthers] = useState<Record<string, LiveCursor>>({});

  useEffect(
    () =>
      channel.subscribe((event) => {
        setOthers((all) => {
          if (event.type === "leave") {
            const { [event.id]: _, ...rest } = all;
            return rest;
          }
          return { ...all, [event.id]: { ...all[event.id], ...event.cursor } };
        });
      }),
    [],
  );

  return (
    <LiveCursors
      cursors={Object.values(others)}
      onCursorMove={(point) => channel.send({ type: point ? "move" : "leave", id: me.id, cursor: { name: me.name, ...point } })}
      onMessage={(message) => channel.send({ type: "move", id: me.id, cursor: { message } })}
    >
      {children}
    </LiveCursors>
  );
}`,
  props: [
    { name: 'cursors', type: '{ id, name, x, y, color?, message?, clicks?, selection? }[]', description: 'Everyone else. x and y run from 0 to 1 across the area; raise clicks by one per click; selection is a box in the same units.' },
    { name: 'children', type: 'ReactNode', description: 'What they’re all looking at; the cursors float over it.' },
    { name: 'idleAfter', type: 'number', default: '8000', description: 'Milliseconds without moving before a name folds into its dot.' },
    { name: 'onCursorMove', type: '(point: { x, y } | null) => void', description: 'Your own mouse over the area in 0–1 units, or null when it leaves.' },
    { name: 'onMessage', type: '(text: string) => void', description: 'Turns on "/" to say something at your pointer (mouse and trackpad only).' },
  ],
  notes: [
    'People take the five chart colours in the order they first appear and keep them; pass color to choose your own.',
    'The cursors are decoration to assistive tech; what people say is announced through a polite status region, once per message.',
    'Positions are fractions, so the same numbers work on a phone and a wide screen as long as what’s underneath scales the same way.',
    '"/" is only taken while your pointer is over the area, so a page’s own "/" shortcut (search, usually) keeps working everywhere else.',
    'The loop sleeps when nobody is moving. With reduced motion cursors jump to where they are and bubbles change size in place.',
  ],
};
