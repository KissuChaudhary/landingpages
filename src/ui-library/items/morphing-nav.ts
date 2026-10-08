import type { UiItem } from '../registry';

export const morphingNav: UiItem = {
  name: 'morphing-nav',
  title: 'Morphing nav',
  description: 'One dropdown that follows you along the menu, gliding and resizing to each item’s content.',
  summary:
    'Separate dropdowns that blink open and shut make a menu feel like a stack of boxes. Here there is one panel. Point at an item and it drops in underneath, sized to that item’s content; move to the next and the same panel glides across and resizes while the new content slides in from the side you moved toward. A soft highlight slides along under the items as you go. It works fully from the keyboard and closes when you leave.',
  file: 'morphing-nav.tsx',
  dependencies: [],
  css: ['@keyframes ui-pop-in'],
  states: [
    { name: 'hover', description: 'A soft highlight slides and resizes under the item you point at or focus.' },
    { name: 'open', description: 'The panel drops in under the item, sized to its content and kept inside the screen.' },
    { name: 'move', description: 'The panel glides and resizes (380ms) to the next item’s content; old content slides out one way, new content in from the other.' },
    { name: 'close', description: 'Leaving the menu, Escape or a click elsewhere fades the panel away; Escape returns focus to the item.' },
  ],
  usage: `import { MorphingNav } from "@/components/morphing-nav";

<MorphingNav
  items={[
    { id: "product", label: "Product", content: <ProductMenu /> },
    { id: "pricing", label: "Pricing", href: "/pricing" },
  ]}
/>`,
  recipeTitle: 'In a site header',
  recipeIntro: 'Give each panel its own width; the nav does the measuring, placing and morphing.',
  recipe: `import { MorphingNav } from "@/components/morphing-nav";

function ProductMenu() {
  return (
    <div className="grid w-[480px] grid-cols-2 gap-1 p-2">
      <a href="/workflows" className="rounded-xl p-3 hover:bg-accent">
        <span className="block text-sm font-medium">Workflows</span>
        <span className="text-xs text-muted-foreground">Chain steps that run on their own.</span>
      </a>
      {/* …more links */}
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <Logo />
      <MorphingNav
        items={[
          { id: "product", label: "Product", content: <ProductMenu /> },
          { id: "solutions", label: "Solutions", content: <SolutionsMenu /> },
          { id: "pricing", label: "Pricing", href: "/pricing" },
        ]}
      />
      <a href="/signup">Start free</a>
    </header>
  );
}`,
  props: [
    { name: 'items', type: '{ id; label; href?; content? }[]', description: 'Items with content open the panel; items with only an href are links.' },
    { name: 'collisionPadding', type: 'number', default: '16', description: 'Space kept from the screen edges when placing the panel.' },
  ],
  notes: [
    'A labelled navigation landmark. Items that open a panel are buttons with aria-expanded and aria-controls; links stay links.',
    'Left and Right move between items, Enter, Space or Down opens one and moves focus into it, and Escape closes it and returns focus.',
    'On touch screens, items open and close with a tap; with a mouse, a short delay lets you cross the gap to the panel.',
    'With reduced motion the panel switches content in place without gliding.',
  ],
};
