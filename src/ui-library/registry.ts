/**
 * The component library: one entry per installable component.
 *
 * The source of each component lives in src/ui-library/registry/<file>; its docs live in
 * src/ui-library/items/<name>.ts. The registry endpoint (/r/<name>.json) and the docs pages (/ui/<name>)
 * are both generated from these, so the code people install is always the code shown on the site.
 */

import { SITE_NAME } from '@/data/site';
import { items } from './items';

/** The library is the Components section of the one brand. */
export const UI_NAME = SITE_NAME;
export const UI_REGISTRY_NAME = 'hairline';

export const UI_REQUIREMENTS = 'React 19, Tailwind CSS v4 and shadcn/ui theme variables (any style). Icons from lucide-react.';

export type UiGroup = 'before' | 'working' | 'answer' | 'chat';

export const UI_GROUPS: { id: UiGroup; title: string; description: string }[] = [
  { id: 'before', title: 'Before the answer', description: 'Asking: the composer, attachments, modes and voice.' },
  { id: 'working', title: 'While it works', description: 'The agent at work: thinking, tool calls, approvals, plans and progress.' },
  { id: 'answer', title: 'The answer and after', description: 'Reading, checking and acting on what came back.' },
  { id: 'chat', title: 'Around the chat', description: 'The conversation itself: scrolling, editing and finding past chats.' },
];

export interface UiProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface UiState {
  name: string;
  description: string;
}

/** Keyframes and rules the components use. Mirrored in src/app/globals.css for this site. */
export const UI_CSS = {
  '@keyframes ui-shimmer': {
    '0%': { 'background-position': '150% 0' },
    '100%': { 'background-position': '-50% 0' },
  },
  '@keyframes ui-fade-up': {
    from: { opacity: '0', transform: 'translateY(4px)' },
    to: { opacity: '1', transform: 'none' },
  },
  '@keyframes ui-fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  '@keyframes ui-blink': {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0' },
  },
  '@keyframes ui-draw': {
    from: { 'stroke-dashoffset': '24' },
    to: { 'stroke-dashoffset': '0' },
  },
  '@keyframes ui-wave': {
    '0%, 100%': { transform: 'scaleY(0.35)' },
    '50%': { transform: 'scaleY(1)' },
  },
  '@keyframes ui-bounce': {
    '0%, 80%, 100%': { transform: 'translateY(0)', opacity: '0.35' },
    '40%': { transform: 'translateY(-3px)', opacity: '1' },
  },
  '@keyframes ui-breathe': {
    '0%, 100%': { transform: 'scale(0.82)', opacity: '0.55' },
    '50%': { transform: 'scale(1)', opacity: '1' },
  },
  '@keyframes ui-scan': {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(250%)' },
  },
  '@keyframes ui-slide-from-right': {
    from: { opacity: '0', transform: 'translateX(8px)' },
    to: { opacity: '1', transform: 'none' },
  },
  '@keyframes ui-slide-from-left': {
    from: { opacity: '0', transform: 'translateX(-8px)' },
    to: { opacity: '1', transform: 'none' },
  },
  '@keyframes ui-pop-in': {
    from: { opacity: '0', transform: 'translateY(-4px) scale(0.96)' },
    to: { opacity: '1', transform: 'none' },
  },
  '@keyframes ui-chip-in': {
    from: { opacity: '0.35', transform: 'scale(0.9)' },
    to: { opacity: '1', transform: 'none' },
  },
  '@keyframes ui-ping': {
    from: { transform: 'scale(1)', opacity: '0.55' },
    to: { transform: 'scale(2.6)', opacity: '0' },
  },
  '@keyframes ui-drop-in': {
    from: { opacity: '0', transform: 'translateY(-8px) scale(0.6)' },
    to: { opacity: '1', transform: 'none' },
  },
  '@layer base': {
    '::highlight(ui-selection)': {
      'background-color': 'color-mix(in oklab, var(--primary) 18%, transparent)',
    },
  },
};

export type UiCssKey = keyof typeof UI_CSS;

export interface UiItem {
  /** Registry name and URL slug. */
  name: string;
  title: string;
  /** One line, under the title. */
  description: string;
  /** A paragraph for the component page. */
  summary: string;
  group: UiGroup;
  /** File in src/ui-library/registry. */
  file: string;
  dependencies: string[];
  /** The keyframes and rules from UI_CSS it needs; the CLI adds them to the user's stylesheet. */
  css: UiCssKey[];
  /** Tabs in the live preview, usually its states. */
  tabs?: string[];
  tabsLabel?: string;
  usage: string;
  /** How to drive it from the Vercel AI SDK. */
  recipe?: string;
  states: UiState[];
  props: UiProp[];
  notes: string[];
}

export const UI_ITEMS: UiItem[] = items;

export const getUiItem = (name: string) => UI_ITEMS.find((item) => item.name === name);

export const cssFor = (item: UiItem) => Object.fromEntries(item.css.map((key) => [key, UI_CSS[key]]));
