'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { NumberRoll } from '@/ui-library/registry/number-roll';
import type { NavComponent } from '@/components/site/nav-data';

/* Every component, one click away. The filter narrows the list as you type ("/" jumps to it, Enter opens the first
 * match), the count rolls, and the highlight glides to whichever page you're on, so moving between components feels
 * like staying in one place. */

const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const GLIDE = 'cubic-bezier(0.34,1.36,0.64,1)';
const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30';
const LABEL = 'px-3 pb-1.5 pt-5 text-[11.5px] font-medium uppercase tracking-[0.06em] text-[#9a9a9a]';

const GUIDES = [
  { href: '/ui', label: 'Introduction' },
  { href: '/ui#installation', label: 'Installation' },
];
const MORE = [
  { href: '/#catalog', label: 'Templates' },
  { href: '/#pricing', label: 'Pricing' },
];

export default function DocsSidebar({ components, onNavigate }: { components: NavComponent[]; onNavigate?: () => void }) {
  const pathname = usePathname() ?? '/ui';
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [pill, setPill] = React.useState({ top: 0, height: 0, on: false, glide: false });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const linkRefs = React.useRef(new Map<string, HTMLAnchorElement>());
  const placed = React.useRef(false);

  const q = query.trim().toLowerCase();
  const shown = q
    ? components.filter((c) => c.title.toLowerCase().includes(q) || c.name.includes(q.replace(/\s+/g, '-')) || c.description.toLowerCase().includes(q))
    : components;
  const activeHref = pathname === '/ui' ? '/ui' : pathname;

  // The highlight sits behind the page you're on; it glides when you move, and the list scrolls to keep it in view.
  React.useLayoutEffect(() => {
    const el = linkRefs.current.get(activeHref);
    if (!el) {
      setPill((p) => (p.on ? { ...p, on: false } : p));
      return;
    }
    const next = { top: el.offsetTop, height: el.offsetHeight };
    const first = !placed.current;
    placed.current = true;
    setPill((p) => (p.on && p.top === next.top && p.height === next.height ? p : { ...next, on: true, glide: !first && p.on }));
    const box = scrollRef.current;
    if (box && (next.top < box.scrollTop + 48 || next.top > box.scrollTop + box.clientHeight - 80)) {
      box.scrollTo({ top: next.top - box.clientHeight / 2, behavior: first ? 'auto' : 'smooth' });
    }
  }, [activeHref, q]);

  // "/" jumps to the filter from anywhere that isn't already a field.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, [contenteditable="true"]')) return;
      const input = inputRef.current;
      if (!input || !input.offsetParent) return;
      e.preventDefault();
      input.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const item = (href: string, label: React.ReactNode, extra?: React.ReactNode) => {
    const active = href === activeHref;
    return (
      <li key={href}>
        <Link
          href={href}
          ref={(el) => {
            if (el) linkRefs.current.set(href, el);
            else linkRefs.current.delete(href);
          }}
          onClick={onNavigate}
          aria-current={active ? 'page' : undefined}
          className={`relative flex h-8 items-center justify-between gap-2 rounded-lg px-3 text-[13.5px] transition-colors duration-200 ${FOCUS} ${
            active ? 'font-medium text-[#181925]' : 'text-[#666] hover:text-[#181925]'
          }`}
        >
          <span className="truncate">{label}</span>
          {extra}
        </Link>
      </li>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 pb-1 pt-4">
        <label className="flex h-9 items-center gap-2 rounded-full bg-black/[0.035] pl-3 pr-1.5 text-[13px] text-[#666] focus-within:bg-white focus-within:shadow-[inset_0_0_0_1px_rgba(48,93,222,0.45)]">
          <Search className="size-3.5 shrink-0 text-[#999]" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && query) {
                e.stopPropagation();
                setQuery('');
              } else if (e.key === 'Enter' && shown[0]) {
                router.push(`/ui/${shown[0].name}`);
                setQuery('');
                onNavigate?.();
              }
            }}
            placeholder="Filter components"
            aria-label="Filter components"
            className="min-w-0 flex-1 bg-transparent text-[#181925] outline-none placeholder:text-[#999]"
          />
          {query ? (
            <button type="button" aria-label="Clear filter" onClick={() => setQuery('')} className={`flex size-6 items-center justify-center rounded-full text-[#999] hover:text-[#181925] ${FOCUS}`}>
              <X className="size-3.5" aria-hidden="true" />
            </button>
          ) : (
            <kbd className="flex h-5 min-w-5 items-center justify-center rounded-md bg-white px-1 font-mono text-[11px] text-[#999] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] max-lg:hidden">/</kbd>
          )}
        </label>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-8 [scrollbar-color:rgba(0,0,0,0.12)_transparent] [scrollbar-width:thin]">
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 rounded-lg bg-black/[0.045]"
            style={{
              height: pill.height,
              transform: `translateY(${pill.top}px)`,
              opacity: pill.on ? 1 : 0,
              transition: pill.glide ? `transform 420ms ${GLIDE}, height 300ms ${EASE}, opacity 200ms` : 'opacity 200ms',
            }}
          />
          {!q && (
            <>
              <p className={LABEL}>Getting started</p>
              <ul>{GUIDES.map((g) => item(g.href, g.label))}</ul>
            </>
          )}
          <p className={`${LABEL} flex items-baseline justify-between`}>
            <span>Components</span>
            <NumberRoll value={shown.length} duration={500} className="tabular-nums normal-case tracking-normal" />
          </p>
          <ul>
            {shown.map((c) =>
              item(
                `/ui/${c.name}`,
                c.title,
                c.isNew ? <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-px text-[10.5px] font-medium text-primary">New</span> : null
              )
            )}
          </ul>
          {q && !shown.length && (
            <p className="px-3 py-3 text-[13px] leading-relaxed text-[#999]">
              Nothing matches “{query}”.{' '}
              <button type="button" onClick={() => setQuery('')} className="text-[#181925] underline decoration-black/20 underline-offset-4">
                Show all
              </button>
            </p>
          )}
          {!q && (
            <>
              <p className={LABEL}>More</p>
              <ul>{MORE.map((m) => item(m.href, m.label))}</ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
