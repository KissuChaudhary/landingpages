import type { UiItem } from '../registry';

export const themeToggle: UiItem = {
  name: 'theme-toggle',
  title: 'Theme toggle',
  description: 'The sun sets into a moon, and the new theme spreads from the button in a circle.',
  summary:
    'Most theme toggles swap a sun icon for a moon icon and flash the page. Here the sun and moon are one drawing: its rays fold in and turn away while a shadow slides across the disc and carves the crescent, and the disc swells into the moon with a little give. The page follows in the same breath: the new theme spreads out from the button in a circle, using View Transitions where the browser has them, and switches without a flicker of half-animated colours where it doesn’t. It comes as a round button, a pill whose label morphs from "Light" to "Dark", or a Light, System, Dark switch with a thumb thrown to the choice. On its own it remembers the choice and follows the system; or drive it from next-themes.',
  file: 'theme-toggle.tsx',
  dependencies: [],
  registryDependencies: ['text-morph'],
  css: [],
  states: [
    { name: 'light → dark', description: 'Rays turn −90° and fold to 40% as they fade (520ms); the shadow slides onto the disc (560ms) and the disc grows from 55% to full size with a slight overshoot.' },
    { name: 'reveal', description: 'A circle grows from the button’s centre to the far corner of the screen over 620ms, showing the new theme inside it. Skipped when the colours don’t actually change (System on a light system to Light).' },
    { name: 'pill', description: 'The same icon, and "Light" morphs into "Dark", keeping no letters but easing the pill’s width.' },
    { name: 'segmented', description: 'Light, System and Dark; the thumb is thrown to the choice (460ms, slight overshoot) while its width eases. Arrow keys, Home and End move between them.' },
  ],
  usage: `import { ThemeToggle } from "@/components/theme-toggle";

// Manages itself: remembers the choice, follows the system, sets the dark class on <html>.
<ThemeToggle />
<ThemeToggle variant="segmented" />`,
  recipeTitle: 'With next-themes',
  recipeIntro: 'Already using next-themes? Hand it the theme and the setter; the toggle keeps the motion and the reveal.',
  recipe: `"use client";
import { useTheme } from "next-themes";
import { ThemeToggle, type Theme } from "@/components/theme-toggle";

export function NavThemeToggle() {
  const { theme, setTheme } = useTheme();
  return <ThemeToggle value={(theme as Theme) ?? "system"} onValueChange={setTheme} />;
}`,
  props: [
    { name: 'variant', type: '"icon" | "pill" | "segmented"', default: '"icon"', description: 'A round button, a button with a label, or a three-way switch with System.' },
    { name: 'value / defaultValue / onValueChange', type: '"light" | "dark" | "system"', default: '— / "system"', description: 'Control it (e.g. from next-themes), or let it keep its own choice.' },
    { name: 'storageKey', type: 'string', default: '"theme"', description: 'Where an uncontrolled toggle remembers the choice in localStorage.' },
    { name: 'attribute', type: '"class" | "data-theme"', default: '"class"', description: 'How an uncontrolled toggle marks dark mode on <html>; it also sets color-scheme.' },
    { name: 'reveal', type: 'boolean', default: 'true', description: 'Spread the new theme from the button in a circle where View Transitions are available.' },
  ],
  notes: [
    'The button says what it will do ("Switch to dark theme") and is aria-pressed while dark; the switch is a radio group with roving focus.',
    'The first paint never animates: a remembered or system theme is placed, not played.',
    'Without View Transitions, colour transitions across the page are held for one frame during the switch, so nothing flickers.',
    'Reduced motion: the icon changes in place and there is no reveal.',
    'To avoid a flash of the wrong theme on load, set the class on <html> before your app renders (next-themes does this for you).',
  ],
};
