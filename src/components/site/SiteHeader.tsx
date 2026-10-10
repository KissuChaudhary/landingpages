'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowRight, Search } from 'lucide-react';
import { LogoMark } from '@/components/site/Logo';
import { CommandPalette, type CommandItem } from '@/ui-library/registry/command-palette';
import { SITE_NAME } from '@/data/site';
import type { SearchEntry } from './nav-data';

/* The site's bar: full width, links on the left, search and the pass on the right. The hover highlight glides between
 * links; search is the library's own command palette growing out of its pill; on a phone the bar itself opens downward
 * into the menu. */

const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const GLIDE = 'cubic-bezier(0.34,1.36,0.64,1)';
const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30';
const LINKS = [
  { href: '/ui', label: 'Components', active: (p: string) => p.startsWith('/ui') },
  { href: '/#catalog', label: 'Templates', active: (p: string) => p.startsWith('/template') },
  { href: '/#pricing', label: 'Pricing', active: () => false },
  { href: '/#faq', label: 'FAQ', active: () => false },
];
const PASS =
  'select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--primary)_80%,#12245e)] bg-[color-mix(in_srgb,var(--primary)_90%,#12245e)] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(18,36,94,0.4)] transition-[background-color,transform] hover:bg-primary active:scale-[0.98]';

export default function SiteHeader({ search }: { search: SearchEntry[] }) {
  const pathname = usePathname() ?? '/';
  const router = useRouter();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hover, setHover] = React.useState({ left: 0, width: 0, on: false, glide: false });

  // Results open with the router, so moving between pages keeps the header (and the docs sidebar) in place.
  const items: CommandItem[] = React.useMemo(() => search.map((e) => ({ ...e, onSelect: () => router.push(e.href) })), [search, router]);

  // The hairline under the bar shows once the page moves under it.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  // A new page closes the menu.
  const [path, setPath] = React.useState(pathname);
  if (path !== pathname) {
    setPath(pathname);
    setMenu(false);
  }

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white transition-shadow duration-300"
      style={{ boxShadow: scrolled || menu ? '0 1px 0 rgba(0,0,0,0.07)' : '0 1px 0 rgba(0,0,0,0)' }}
    >
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-6 px-4 sm:px-6">
        <Link href="/" className={`flex shrink-0 items-center rounded-md ${FOCUS}`} aria-label={`${SITE_NAME} home`}>
          <LogoMark size={26} className="mr-2" />
          <span className="text-[16px] font-semibold tracking-tight text-[#181925]">
            {SITE_NAME}
            <span className="text-primary">.</span>
          </span>
        </Link>

        <nav aria-label="Main" className="relative hidden items-center md:flex" onPointerLeave={() => setHover((h) => ({ ...h, on: false, glide: false }))}>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 h-8 -translate-y-1/2 rounded-full bg-black/[0.045]"
            style={{
              width: hover.width,
              transform: `translateX(${hover.left}px)`,
              opacity: hover.on ? 1 : 0,
              transition: `opacity 200ms ${EASE}${hover.glide ? `, transform 380ms ${GLIDE}, width 300ms ${EASE}` : ''}`,
            }}
          />
          {LINKS.map((l) => {
            const active = l.active(pathname);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                onPointerEnter={(e) => {
                  const el = e.currentTarget;
                  setHover((h) => ({ left: el.offsetLeft, width: el.offsetWidth, on: true, glide: h.on }));
                }}
                className={`relative flex h-8 items-center rounded-full px-3 text-[13.5px] transition-colors duration-200 ${FOCUS} ${
                  active ? 'font-medium text-[#181925]' : 'text-[#666] hover:text-[#181925]'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block">
            <CommandPalette
              items={items}
              open={searchOpen}
              onOpenChange={setSearchOpen}
              // On the command palette's own page, ⌘K belongs to its demo.
              hotkey={pathname === '/ui/command-palette' ? '' : 'k'}
              triggerLabel="Search"
              placeholder="Search components and templates…"
            />
          </div>
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className={`flex size-9 items-center justify-center rounded-full text-[#181925] transition-colors hover:bg-black/[0.04] md:hidden ${FOCUS}`}
          >
            <Search className="size-[18px]" aria-hidden="true" />
          </button>
          <Link href="/#pricing" className={`${PASS} inline-flex h-[34px] px-4 text-[13px] max-[359px]:hidden ${FOCUS}`}>
            All-Access Pass
          </Link>
          <button
            type="button"
            aria-label={menu ? 'Close menu' : 'Menu'}
            aria-expanded={menu}
            aria-controls="site-menu"
            onClick={() => setMenu((m) => !m)}
            className={`relative flex size-9 items-center justify-center rounded-full text-[#181925] transition-colors hover:bg-black/[0.04] md:hidden ${FOCUS}`}
          >
            {[-1, 1].map((side) => (
              <span
                key={side}
                aria-hidden="true"
                className="absolute h-[1.5px] w-[17px] rounded-full bg-current"
                style={{
                  transform: menu ? `rotate(${side * 45}deg)` : `translateY(${side * 3.5}px)`,
                  transition: `transform 380ms ${EASE}`,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* On a phone, the bar opens downward into the menu. */}
      <div
        id="site-menu"
        inert={!menu}
        className="grid md:hidden"
        style={{ gridTemplateRows: menu ? '1fr' : '0fr', transition: `grid-template-rows 420ms ${EASE}` }}
      >
        <div className="min-h-0 overflow-hidden">
          <nav aria-label="Main" className="px-4 pb-5 pt-1" style={{ opacity: menu ? 1 : 0, transition: `opacity ${menu ? '320ms 80ms' : '140ms'} ${EASE}` }}>
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                aria-current={l.active(pathname) ? 'page' : undefined}
                className={`flex h-[52px] items-center justify-between border-b border-black/[0.06] text-[17px] tracking-[-0.01em] text-[#181925] ${FOCUS}`}
              >
                {l.label}
                <ArrowRight className="size-4 text-[#bbb]" aria-hidden="true" />
              </Link>
            ))}
            <Link href="/#pricing" onClick={() => setMenu(false)} className={`${PASS} mt-5 flex h-11 w-full text-[14px] ${FOCUS}`}>
              All-Access Pass
            </Link>
          </nav>
        </div>
      </div>
      {menu && <div aria-hidden="true" className="fixed inset-x-0 bottom-0 top-14 -z-10 md:hidden" onClick={() => setMenu(false)} />}
    </header>
  );
}
