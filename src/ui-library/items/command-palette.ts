import type { UiItem } from '../registry';

export const commandPalette: UiItem = {
  name: 'command-palette',
  title: 'Command palette',
  description: '⌘K that grows out of the search pill: fuzzy search, nested lists, and commands that run in place.',
  summary:
    'Most command palettes appear from nowhere in the middle of the screen. This one grows out of the "Search… ⌘K" pill that was already on the page: its position, size and corners ease from pill to panel while the pill’s words fade into the field, and closing folds it back. Results narrow as you type with the matching letters marked, the panel’s height eases to fit them, and a highlight glides between rows. "Change theme…" opens its own list in place, sliding in from the right as a chip joins the field. A command that returns a promise runs on its row, its shortcut blurring into a spinner and then a check that draws itself, before the palette folds away.',
  file: 'command-palette.tsx',
  dependencies: [],
  registryDependencies: ['text-morph'],
  css: [],
  states: [
    { name: 'closed', description: 'A hairline pill with "Search…" and its shortcut, ⌘K on a Mac and Ctrl K elsewhere.' },
    { name: 'opening', description: 'The pill grows into the panel over 440ms: left, top, width, height and corner radius ease together while a faint veil fades over the page. Opened by the hotkey with the pill off-screen, it rises in from just above.' },
    { name: 'search', description: 'Fuzzy matching ranks whole words first, then word starts, then letters in order; matched letters are set in the full text colour. The list eases to its new height (300ms) and the highlight glides (200ms).' },
    { name: 'nested', description: 'A row with items opens its list in place: the old list slides out to the left, the new one in from the right through a 4px blur, and a chip with its name opens in the field. Backspace on an empty field or Escape goes back the other way.' },
    { name: 'running', description: 'A command that returns a promise keeps the palette open: the shortcut blurs into a spinner, then a check draws itself and the palette folds back into the pill 520ms later. A rejected promise shakes the row.' },
    { name: 'empty', description: '"No results for “xyz”", morphing letter by letter as the query changes.' },
  ],
  usage: `import { CommandPalette, type CommandItem } from "@/components/command-palette";

const items: CommandItem[] = [
  { id: "orders", group: "Go to", label: "Orders", href: "/orders", shortcut: ["G", "O"] },
  { id: "export", group: "Actions", label: "Export sales", onSelect: () => exportCsv() },
  { id: "theme", group: "Actions", label: "Change theme", items: [
    { id: "light", label: "Light", onSelect: () => setTheme("light") },
    { id: "dark", label: "Dark", onSelect: () => setTheme("dark") },
  ] },
];

<CommandPalette items={items} />`,
  recipeTitle: 'In a navbar',
  recipeIntro: 'Put the pill where people already look for search; ⌘K works from anywhere on the page.',
  recipe: `"use client";
import { useRouter } from "next/navigation";
import { CommandPalette, type CommandItem } from "@/components/command-palette";

export function NavSearch({ docs }: { docs: { slug: string; title: string; section: string }[] }) {
  const router = useRouter();
  const items: CommandItem[] = docs.map((d) => ({
    id: d.slug,
    group: d.section,
    label: d.title,
    onSelect: () => router.push(\`/docs/\${d.slug}\`),
  }));

  return <CommandPalette items={items} placeholder="Search the docs…" />;
}`,
  props: [
    { name: 'items', type: 'CommandItem[]', description: 'id, label, and any of group, icon, shortcut, keywords, description, href, onSelect (return a promise to show progress) and items (a nested list).' },
    { name: 'placeholder', type: 'string', default: '"Search or jump to…"', description: 'The field’s placeholder on the first page.' },
    { name: 'hotkey', type: 'string', default: '"k"', description: 'The letter that toggles it with ⌘ or Ctrl; an empty string turns it off.' },
    { name: 'open / defaultOpen / onOpenChange', type: 'boolean / boolean / (open) => void', description: 'Control it, or let it manage itself.' },
    { name: 'showTrigger / triggerLabel', type: 'boolean / string', default: 'true / "Search…"', description: 'The pill it grows from, and its words.' },
  ],
  notes: [
    'A modal dialog: focus moves into the field and back to whatever had it before; the page behind stops scrolling. The field is a combobox with aria-activedescendant on a listbox of options grouped under their headings.',
    'Arrow keys move, Home and End jump (on an empty field), Enter runs, Escape clears the field, then goes back a level, then closes. Tab stays in the field.',
    'The palette is rendered into the body, so a transformed or overflow-hidden ancestor can’t clip it.',
    'Installs Text morph. With reduced motion it opens and closes in place and pages change without sliding.',
  ],
};
