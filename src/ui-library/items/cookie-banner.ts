import type { UiItem } from '../registry';

export const cookieBanner: UiItem = {
  name: 'cookie-banner',
  title: 'Cookie banner',
  description: 'Asks once, plainly, then folds into a small cookie button in the corner that grows back into the preferences.',
  summary:
    'Most cookie banners are a wall of text with a bright Accept and a hidden Reject. This one is a single hairline card in the corner: one sentence, Customise, and Reject all beside Accept all, equally easy. Customise grows the same card into the preferences, each kind of cookie with a switch whose thumb is thrown to its side. Whichever button you press confirms itself: a spinner while your server records the choice, a drawn check and a label that morphs to "Accepted", "Rejected" or "Saved". Then the card shrinks into a small cookie button in the corner, which grows back into the preferences with your choices as they were. A "Cookie settings" link anywhere can open it too.',
  file: 'cookie-banner.tsx',
  dependencies: [],
  registryDependencies: ['text-morph'],
  css: [],
  states: [
    { name: 'ask', description: 'The card rises 20px out of the corner 400ms after the page (640ms). Reject all and Accept all are the same size, side by side.' },
    { name: 'customise', description: 'The card’s width and height grow to the preferences (480ms) while the banner blurs out and the preferences blur in. Switch thumbs are thrown with a slight overshoot (400ms). Esc or the close button returns.' },
    { name: 'saving', description: 'When onConsentChange returns a promise, the pressed button opens a spinner beside its label until it settles.' },
    { name: 'saved', description: 'A check draws itself on the button and the label morphs ("Accepted", "Rejected", "Saved"); after a beat the card shrinks to a 44px circle and the cookie spins in with a small overshoot.' },
    { name: 'revisit', description: 'The cookie button, or openCookiePreferences() from a footer link, grows the card back into the preferences. Closing without saving puts the saved choices back.' },
  ],
  usage: `import { CookieBanner } from "@/components/cookie-banner";

<CookieBanner
  policyHref="/cookies"
  onConsentChange={(consent) => {
    if (consent.analytics) loadAnalytics();
    if (consent.marketing) loadAdPixels();
  }}
/>`,
  recipeTitle: 'In your layout, with a footer link',
  recipeIntro: 'Mount it once in the root layout, record each choice on your server, and let people change their mind from the footer.',
  recipe: `// app/layout.tsx
import { CookieBanner } from "@/components/cookie-banner";
import { startTracking } from "@/lib/tracking";

<CookieBanner
  policyHref="/cookies"
  categories={[
    { id: "necessary", label: "Necessary", description: "Keeps you signed in and your basket full.", required: true },
    { id: "analytics", label: "Analytics", description: "Counts visits and what gets used. Never sold." },
    { id: "marketing", label: "Marketing", description: "Shows you our ads on other sites.", tracking: true },
  ]}
  onConsentChange={async (consent, reason) => {
    startTracking(consent);
    if (reason === "save") await fetch("/api/consent", { method: "POST", body: JSON.stringify(consent) });
  }}
/>

// components/footer.tsx
import { openCookiePreferences } from "@/components/cookie-banner";

<button onClick={openCookiePreferences}>Cookie settings</button>`,
  props: [
    { name: 'categories', type: 'CookieCategory[]', default: 'Necessary, Analytics, Marketing', description: 'Each kind of cookie: id, label, description, and required (always on) or tracking (kept off by Global Privacy Control).' },
    { name: 'onConsentChange', type: '(consent, reason) => void | Promise', description: 'Called with the remembered choice on load and with each new one; return a promise and the button waits for it.' },
    { name: 'message', type: 'ReactNode', description: 'The one sentence on the banner.' },
    { name: 'policyHref', type: 'string', description: 'Adds a "Cookie policy" link after the sentence.' },
    { name: 'position', type: '"bottom-left" | "bottom-right" | "bottom-center"', default: '"bottom-left"', description: 'Which corner it sits in and folds into.' },
    { name: 'showReopen', type: 'boolean', default: 'true', description: 'Keep the cookie button after a choice. Without it, use openCookiePreferences() from a link.' },
    { name: 'expiresAfter', type: 'number', default: '365', description: 'Days before asking again. Adding a new kind of cookie asks again too.' },
    { name: 'storageKey', type: 'string', default: '"cookie-consent"', description: 'Where the choice is kept in localStorage. getCookieConsent(storageKey) reads it anywhere.' },
    { name: 'strategy', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Absolute keeps it inside a positioned parent, as in this preview.' },
  ],
  notes: [
    'Nothing optional is on until people say so, and Reject all is as easy and as visible as Accept all, as European regulators expect.',
    'Browsers that send Global Privacy Control get tracking categories off even on Accept all, with a line saying why.',
    'A labelled region, not a modal: the page stays usable. Switches are real switches with their descriptions attached; Esc closes the preferences.',
    'Focus moves with the surface: into the preferences when they open, to the cookie button when it folds.',
    'The choice is announced when it’s saved. Installs Text morph. With reduced motion the card changes size at once and nothing slides.',
  ],
};
