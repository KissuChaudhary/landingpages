/**
 * Prices and checkout links. This is the only file to touch when the payment provider is connected.
 *
 * Each checkout value is the hosted checkout link your provider gives you for that product
 * (Lemon Squeezy, Polar, Dodo Payments and similar merchants of record all give one, and they handle
 * tax, receipts and file delivery). While a link is empty, its buy button says checkout is not open yet.
 */

export const CURRENCY = 'USD';

export const PRICING = {
  single: {
    price: 39,
    name: 'Single template',
    includes: [
      'The complete Next.js 15 project, ready to run',
      'Every word, link and price in one config file',
      'README with setup, customisation and copy guide',
      'Commercial license for unlimited projects',
      'Free updates to this template',
    ],
  },
  allAccess: {
    price: 99,
    name: 'All-access',
    includes: [
      'Every template in the library, each a complete project',
      'Every template we release later, at no extra cost',
      'Commercial license for unlimited projects',
      'Free updates to every template',
    ],
  },
  refundDays: 14,
} as const;

/** Hosted checkout link for the all-access pass. */
export const ALL_ACCESS_CHECKOUT = '';

/** Hosted checkout link for each template, by catalog slug. */
export const TEMPLATE_CHECKOUT: Record<string, string> = {
  shear: '',
  arclo: '',
  aster: '',
  daybreak: '',
  conduit: '',
  footnote: '',
  cutroom: '',
  halftone: '',
  emberline: '',
  influence: '',
  marlow: '',
  parley: '',
  fourteen: '',
  kept: '',
  stillform: '',
  prism: '',
  tempo: '',
  patch: '',
  relay: '',
  index: '',
};

export const formatPrice = (amount: number) => `$${amount}`;
