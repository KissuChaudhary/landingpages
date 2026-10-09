import type { UiItem } from '../registry';

export const newsletterFooter: UiItem = {
  name: 'newsletter-footer',
  title: 'Newsletter footer',
  description: 'A footer that’s still alive: a signup that becomes its own confirmation, drawn link underlines and your name in outline.',
  summary:
    'The footer is where people who read the whole page end up, and most footers are a grey list of links. This one leads with the signup: the email field has its button inside, catches a likely typo like "gmial.com" as you type and fixes it in one click. Subscribing opens a spinner; then the field blurs into "Check your inbox" with a check drawing itself, and the button becomes "Resend in 0:30" with the seconds rolling down. "Wrong address?" morphs it back with the email selected. Link underlines draw in from the left and leave to the right, a status link breathes beside your socials, and your name runs the full width in a 1px outline, sitting on the bottom edge: its letters rise out of it, and fill wherever the pointer passes.',
  file: 'newsletter-footer.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: ['@keyframes ui-breathe'],
  states: [
    { name: 'typo', description: 'A domain one or two letters off a common provider shows "Did you mean ana@gmail.com?" under the field; the address is a button that fixes it.' },
    { name: 'invalid', description: 'The box shakes (380ms), its hairline turns red and the helper morphs to say why.' },
    { name: 'subscribing', description: 'A spinner opens in the button and its label morphs to "Subscribing" while onSubscribe runs.' },
    { name: 'sent', description: 'The field blurs out and "Check your inbox" blurs in with a check drawing itself; the button turns to a hairline "Resend in 0:30" and the seconds roll down. At zero it becomes "Resend".' },
    { name: 'failed', description: 'If onSubscribe throws, the field stays and its error message shows under it in red.' },
    { name: 'wordmark', description: 'Sized to span the footer exactly and cropped just below the baseline, so descenders sink into the edge. Letters rise out of that edge, 60ms apart (1000ms), the first time it’s in view. Hovered letters fill at once and fade back over 1.6s, so the pointer leaves a trail.' },
  ],
  usage: `import { NewsletterFooter } from "@/components/newsletter-footer";

<NewsletterFooter
  brand={{ name: "Kept", tagline: "The till that knows your Saturdays." }}
  newsletter={{ onSubscribe: (email) => subscribe(email) }}
  columns={[
    { title: "Product", links: [{ label: "Point of sale", href: "/pos" }, { label: "Changelog", href: "/changelog", badge: "New" }] },
    { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Careers", href: "/careers", badge: "Hiring" }] },
  ]}
  legal={[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }]}
  status={{ state: "operational", href: "https://status.kept.shop" }}
/>`,
  recipeTitle: 'Subscribe with a server action',
  recipeIntro: 'Send the address to your email provider from the server, and turn its errors into messages people can act on.',
  recipe: `// app/actions.ts
"use server";

export async function subscribe(email: string) {
  const res = await fetch("https://api.your-provider.com/subscribers", {
    method: "POST",
    headers: { Authorization: \`Bearer \${process.env.NEWSLETTER_KEY}\`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, double_opt_in: true }),
  });
  if (!res.ok) return { error: "We couldn’t add that address. Try another?" };
  return { error: null };
}

// components/footer.tsx
"use client";
import { NewsletterFooter } from "@/components/newsletter-footer";
import { openCookiePreferences } from "@/components/cookie-banner";
import { subscribe } from "@/app/actions";

<NewsletterFooter
  brand={{ name: "Kept" }}
  newsletter={{
    onSubscribe: async (email) => {
      const { error } = await subscribe(email);
      if (error) throw new Error(error);
    },
  }}
  legal={[{ label: "Privacy", href: "/privacy" }, { label: "Cookie settings", onClick: openCookiePreferences }]}
/>`,
  props: [
    { name: 'brand', type: '{ name; logo?; href?; tagline? }', description: 'Your name, mark and one line about you.' },
    { name: 'newsletter', type: 'FooterNewsletter', description: 'onSubscribe(email) plus optional title, description, placeholder, buttonLabel and resendAfter (seconds, 30). Throw an Error to show its message.' },
    { name: 'columns', type: '{ title; links }[]', description: 'Link columns; a link takes href or onClick, and an optional badge.' },
    { name: 'legal', type: 'FooterLink[]', description: 'Small links in the bottom row, beside the copyright.' },
    { name: 'status', type: '{ state; label?; href? }', description: 'operational, degraded or outage, with an emerald, amber or red dot. The label morphs when the state changes.' },
    { name: 'socials', type: '{ label; href; icon }[]', description: 'Icon links; the label is their accessible name.' },
    { name: 'copyright', type: 'ReactNode', default: '"© <year> <name>"', description: 'The copyright line.' },
    { name: 'wordmark', type: 'boolean | string', default: 'true', description: 'Your name in outline across the full width; a string to use other words, false for none.' },
  ],
  notes: [
    'A real form: Enter submits, the field has a label, autocomplete="email", and its helper and errors are attached and announced.',
    'Focus moves to the button once the confirmation replaces the field, and back into the field, selected, on "Wrong address?".',
    'The typo check is a small edit-distance match against common providers; it suggests, it never blocks.',
    'The wordmark is decoration: hidden from assistive tech and sized to fit with a ResizeObserver, in any font.',
    'Installs Number roll and Text morph. With reduced motion nothing slides or rises; states simply change.',
  ],
};
