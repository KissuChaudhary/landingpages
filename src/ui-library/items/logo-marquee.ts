import type { UiItem } from '../registry';

export const logoMarquee: UiItem = {
  name: 'logo-marquee',
  title: 'Logo marquee',
  description: 'A quiet strip of logos that notices you: it eases to a stop on hover and the logo you point at stays bright.',
  summary:
    'The customer logo strip is on every landing page, and it usually either sits still or scrolls like a ticker that never notices you. This one drifts past at a steady speed and fades out softly at both edges. Point at it and it eases to a stop instead of halting, with the logo under your pointer staying bright while the rest dim; move away and it eases back up to speed. The speed is in pixels per second, so a longer strip never moves faster.',
  file: 'logo-marquee.tsx',
  dependencies: [],
  css: [],
  states: [
    { name: 'moving', description: 'Two copies of the set loop seamlessly at speed px/s, masked to fade over the outer 12% on each side.' },
    { name: 'hover', description: 'The playback rate eases from 1 to 0 over 650ms; the hovered logo goes to full ink, the others to 35%.' },
    { name: 'leave', description: 'The rate eases back to 1 from wherever it was.' },
  ],
  usage: `import { LogoMarquee } from "@/components/logo-marquee";

<LogoMarquee logos={[<img key="a" src="/logos/acme.svg" alt="Acme" className="h-6" />, …]} />`,
  recipeTitle: 'In a proof strip',
  recipeIntro: 'Use monochrome SVGs with currentColor, so they take the muted tone and light up on hover.',
  recipe: `import { LogoMarquee } from "@/components/logo-marquee";
import { Acme, Globex, Initech, Umbrella } from "@/components/logos"; // your SVGs, using fill="currentColor"

export function Customers() {
  return (
    <section className="py-16 text-center">
      <p className="text-sm text-muted-foreground">Trusted by teams who ship weekly</p>
      <LogoMarquee
        className="mt-6"
        speed={32}
        logos={[
          <Acme key="acme" aria-label="Acme" className="h-6" />,
          <Globex key="globex" aria-label="Globex" className="h-6" />,
          <Initech key="initech" aria-label="Initech" className="h-6" />,
          <Umbrella key="umbrella" aria-label="Umbrella" className="h-6" />,
        ]}
      />
    </section>
  );
}`,
  props: [
    { name: 'logos', type: 'ReactNode[]', description: 'Images or inline SVGs, each with an accessible name.' },
    { name: 'speed', type: 'number', default: '36', description: 'Pixels per second, whatever the strip’s length.' },
    { name: 'gap', type: 'number', default: '56', description: 'Space between logos (px).' },
    { name: 'direction', type: '"left" | "right"', default: '"left"', description: 'Which way the strip drifts.' },
    { name: 'pauseOnHover', type: 'boolean', default: 'true', description: 'Ease to a stop while pointed at.' },
  ],
  notes: [
    'Screen readers get one list of logos; the copy that makes the loop seamless is hidden.',
    'Runs on the Web Animations API with a single transform, so it costs nothing per frame; the stop is a tween of playbackRate, not a jump.',
    'With reduced motion the logos sit still in a centred, wrapping row.',
  ],
};
