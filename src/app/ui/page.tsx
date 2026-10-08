import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComponentPreview from '@/components/ui-site/ComponentPreview';
import { UI_GROUPS, UI_ITEMS, UI_NAME } from '@/ui-library/registry';
import { SITE_NAME, absoluteUrl } from '@/data/site';

const title = `${UI_NAME}: React components for AI interfaces`;
const description =
  'Free, hand-built React components for the moments between prompt and answer: thinking traces, streaming answers and more. Install with the shadcn CLI; they take on your theme.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/ui' },
  openGraph: { type: 'website', siteName: SITE_NAME, url: '/ui', title, description },
  twitter: { card: 'summary_large_image', title, description },
};

export default function UiIndexPage() {
  return (
    <div className="min-h-screen bg-white text-[#666666] selection:bg-primary/10 selection:text-primary">
      <Navbar />
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-20">
          <span className="flex h-[24px] w-fit select-none items-center whitespace-nowrap rounded-md bg-neutral-100 px-2.5 text-xs font-medium text-[#666]">
            Free components · shadcn/ui registry
          </span>
          <h1 className="mt-6 text-[44px] font-medium leading-[0.95] tracking-[-0.05em] text-[#181925] sm:text-[72px] lg:text-[88px]">
            The moments between <br className="hidden sm:block" />
            <span className="text-primary">prompt and answer.</span>
          </h1>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-[#666] sm:text-xl">
            Hand-built React components for AI products. Install one with the shadcn CLI and it takes on your theme. Free for
            personal and commercial projects.
          </p>
        </section>

        <section aria-labelledby="components-label" className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-28">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-black/[0.08] pt-5">
            <h2 id="components-label" className="text-sm font-medium text-[#181925]">
              {UI_ITEMS.length} components
            </h2>
            <a
              href="/r/registry.json"
              className="inline-flex items-center gap-1 text-sm text-[#888] transition-colors hover:text-[#181925]"
            >
              Registry index
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          {UI_GROUPS.map((group) => {
            const groupItems = UI_ITEMS.filter((item) => item.group === group.id);
            if (groupItems.length === 0) return null;
            return (
              <div key={group.id} className="mt-14 first:mt-10">
                <div className="mb-10 max-w-xl">
                  <h3 className="text-2xl font-medium tracking-[-0.03em] text-[#181925]">{group.title}</h3>
                  <p className="mt-1.5 text-[15px] text-[#888]">{group.description}</p>
                </div>
                <div className="flex flex-col gap-16 sm:gap-20">
                  {groupItems.map((item) => (
                    <article key={item.name} aria-labelledby={`${item.name}-title`}>
                      <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                        <div>
                          <h4 id={`${item.name}-title`} className="flex items-baseline gap-2.5 text-[17px] font-medium tracking-[-0.01em] text-[#181925]">
                            <span className="text-sm tabular-nums text-[#aaa]">{String(UI_ITEMS.indexOf(item) + 1).padStart(2, '0')}</span>
                            <Link href={`/ui/${item.name}`} className="transition-colors hover:text-primary">
                              {item.title}
                            </Link>
                          </h4>
                          <p className="mt-1 text-sm text-[#888]">{item.description}</p>
                        </div>
                        <Link
                          href={`/ui/${item.name}`}
                          className="inline-flex items-center gap-1 text-sm text-[#666] transition-colors hover:text-[#181925]"
                        >
                          Docs and code
                          <ArrowRight className="size-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                      <ComponentPreview
                        name={item.name}
                        tabs={item.tabs}
                        tabsLabel={item.tabsLabel}
                        installCommand={`npx shadcn@latest add ${absoluteUrl(`/r/${item.name}.json`)}`}
                      />
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6">
          <div className="flex flex-col gap-6 border-t border-black/[0.08] pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-[#181925]">
              Building an AI product? <span className="text-[#666]">Our landing page templates are made the same way.</span>
            </p>
            <Link
              href="/#catalog"
              className="group inline-flex h-11 w-fit select-none items-center gap-1.5 whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--primary)_80%,#12245e)] bg-[color-mix(in_srgb,var(--primary)_90%,#12245e)] px-6 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(18,36,94,0.4)] transition-all hover:bg-primary active:scale-[0.98]"
            >
              Browse templates
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
