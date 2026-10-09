'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, PanelLeft, X } from 'lucide-react';
import { TextMorph } from '@/ui-library/registry/text-morph';
import DocsSidebar from './DocsSidebar';
import type { NavComponent } from '@/components/site/nav-data';

/* Below the header on phones and tablets: where you are (the name morphs as you move), the arrows to the neighbouring
 * components, and the whole list in a drawer that slides in from the left. */

const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30';

const reducedQuery = '(prefers-reduced-motion: reduce)';
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const useReducedMotion = () => React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

export default function DocsMobileBar({ components }: { components: NavComponent[] }) {
  const pathname = usePathname() ?? '/ui';
  const reduced = useReducedMotion();
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const index = components.findIndex((c) => pathname === `/ui/${c.name}`);
  const current = components[index];
  const prev = index > 0 ? components[index - 1] : null;
  const next = index === -1 ? components[0] : components[index + 1] ?? null;

  const open = () => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    d.showModal();
    if (!reduced) d.animate([{ transform: 'translateX(-100%)' }, { transform: 'none' }], { duration: 420, easing: EASE });
  };
  const close = React.useCallback(() => {
    const d = dialogRef.current;
    if (!d?.open) return;
    if (reduced) return d.close();
    d.animate([{ transform: 'none' }, { transform: 'translateX(-100%)' }], { duration: 260, easing: EASE, fill: 'forwards' }).finished.then(() => {
      d.close();
      d.getAnimations().forEach((a) => a.cancel());
    });
  }, [reduced]);

  const arrow = (to: NavComponent | null, dir: 'prev' | 'next') => {
    const Icon = dir === 'prev' ? ChevronLeft : ChevronRight;
    const cls = `flex size-8 items-center justify-center rounded-full transition-colors ${FOCUS}`;
    return to ? (
      <Link href={`/ui/${to.name}`} aria-label={`${dir === 'prev' ? 'Previous' : 'Next'}: ${to.title}`} className={`${cls} text-[#181925] hover:bg-black/[0.04]`}>
        <Icon className="size-4" aria-hidden="true" />
      </Link>
    ) : (
      <span aria-hidden="true" className={`${cls} text-[#ccc]`}>
        <Icon className="size-4" />
      </span>
    );
  };

  return (
    <div className="sticky top-14 z-40 border-b border-black/[0.06] bg-white lg:hidden">
      <div className="mx-auto flex h-12 max-w-[1440px] items-center gap-1 px-2 sm:px-4">
        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          className={`flex min-w-0 flex-1 items-center gap-2 rounded-full px-2 py-1.5 text-left text-[13.5px] ${FOCUS}`}
        >
          <PanelLeft className="size-4 shrink-0 text-[#666]" aria-hidden="true" />
          <span className="shrink-0 text-[#999]">Components</span>
          <ChevronRight className="size-3.5 shrink-0 text-[#ccc]" aria-hidden="true" />
          <span className="min-w-0 overflow-hidden whitespace-nowrap font-medium text-[#181925] [clip-path:inset(-4px_0)]">
            <TextMorph>{current?.title ?? 'Introduction'}</TextMorph>
          </span>
        </button>
        {index !== -1 && arrow(prev, 'prev')}
        {arrow(next, 'next')}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Components"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          // A tap on the backdrop lands on the dialog itself, outside its box.
          const r = e.currentTarget.getBoundingClientRect();
          if (e.target === e.currentTarget && (e.clientX > r.right || e.clientX < r.left || e.clientY < r.top || e.clientY > r.bottom)) close();
        }}
        className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[86vw] max-w-[340px] overflow-hidden border-0 bg-white p-0 text-[#666] shadow-[1px_0_0_rgba(0,0,0,0.08)] backdrop:bg-black/15"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-black/[0.06] pl-6 pr-3">
            <span className="text-[15px] font-medium text-[#181925]">Components</span>
            <button type="button" aria-label="Close" onClick={close} className={`flex size-9 items-center justify-center rounded-full text-[#181925] hover:bg-black/[0.04] ${FOCUS}`}>
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <div className="min-h-0 flex-1">
            <DocsSidebar components={components} onNavigate={close} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
