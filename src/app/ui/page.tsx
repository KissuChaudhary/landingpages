import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import CopyCommand from '@/components/template/CopyCommand';
import { NEW_COMPONENTS } from '@/components/site/nav-data';
import { UI_ITEMS, UI_NAME, UI_REQUIREMENTS } from '@/ui-library/registry';
import { USED_IN } from '@/ui-library/used-in';
import { SITE_NAME, absoluteUrl } from '@/data/site';

const title = `${UI_NAME}: free React components with interactions that feel expensive`;
const description =
  'Free, hand-built React components where every change of state is a moment: numbers that roll, surfaces that morph, menus that follow. Install with the shadcn CLI; they take on your theme.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/ui' },
  openGraph: { type: 'website', siteName: SITE_NAME, url: '/ui', title, description },
  twitter: { card: 'summary_large_image', title, description },
};

const STEP = 'grid gap-3 border-t border-black/[0.06] py-6 first:border-0 first:pt-0 sm:grid-cols-[32px_1fr]';

export default function UiIndexPage() {
  const first = UI_ITEMS[0];
  const example = UI_ITEMS.find((i) => i.name === 'number-roll') ?? first;

  return (
    <main className="px-5 pb-24 pt-8 sm:px-8 sm:pt-12 lg:px-12">
      <div className="max-w-[1040px]">
        <p className="text-[13px] text-[#999]">Components</p>
        <h1 className="mt-5 text-[40px] font-medium leading-[0.98] tracking-[-0.045em] text-[#181925] sm:text-[60px]">
          Interactions that make it <br className="hidden sm:block" />
          <span className="text-primary">feel expensive.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-[#666]">
          {UI_ITEMS.length} hand-built React components where every change of state is a moment. Install one with the shadcn CLI and it takes on your
          theme. Free for personal and commercial projects.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          <Link
            href={`/ui/${first.name}`}
            className="group inline-flex h-10 items-center gap-1.5 rounded-full bg-[#181925] px-5 text-[13.5px] font-medium text-white transition-colors hover:bg-black"
          >
            Start with {first.title}
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <a href="#installation" className="inline-flex h-10 items-center rounded-full px-4 text-[13.5px] text-[#181925] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] transition-colors hover:bg-black/[0.03]">
            Installation
          </a>
        </div>

        <section id="installation" aria-labelledby="installation-label" className="mt-16 scroll-mt-32 border-t border-black/[0.06] pt-10">
          <h2 id="installation-label" className="text-[20px] font-medium tracking-[-0.02em] text-[#181925]">
            Installation
          </h2>
          <ol className="mt-6 max-w-3xl">
            <li className={STEP}>
              <span className="font-mono text-[12.5px] text-[#999]">01</span>
              <div>
                <p className="text-[15px] font-medium text-[#181925]">Have shadcn/ui set up</p>
                <p className="mt-1 text-[15px] leading-relaxed text-[#666]">
                  Any style. The components read its theme variables (background, foreground, primary, border), so they look like the rest of your app.
                </p>
                <div className="mt-3">
                  <CopyCommand commands={['npx shadcn@latest init']} />
                </div>
              </div>
            </li>
            <li className={STEP}>
              <span className="font-mono text-[12.5px] text-[#999]">02</span>
              <div>
                <p className="text-[15px] font-medium text-[#181925]">Add a component</p>
                <p className="mt-1 text-[15px] leading-relaxed text-[#666]">
                  One file lands in your components folder, with the keyframes it needs added to your CSS and any component it builds on installed too.
                </p>
                <div className="mt-3">
                  <CopyCommand commands={[`npx shadcn@latest add ${absoluteUrl(`/r/${example.name}.json`)}`]} />
                </div>
              </div>
            </li>
            <li className={STEP}>
              <span className="font-mono text-[12.5px] text-[#999]">03</span>
              <div>
                <p className="text-[15px] font-medium text-[#181925]">Use it</p>
                <pre className="mt-3 overflow-x-auto rounded-xl border border-black/[0.07] bg-[#fafafa] p-4 font-mono text-[12.5px] leading-6 text-[#181925]">
                  <code>{example.usage}</code>
                </pre>
                <p className="mt-3 text-sm text-[#888]">{UI_REQUIREMENTS}</p>
              </div>
            </li>
          </ol>
        </section>

        <section id="all" aria-labelledby="all-label" className="mt-16 scroll-mt-32 border-t border-black/[0.06] pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="all-label" className="text-[20px] font-medium tracking-[-0.02em] text-[#181925]">
              All {UI_ITEMS.length} components
            </h2>
            <a href="/r/registry.json" className="inline-flex items-center gap-1 text-[13px] text-[#888] transition-colors hover:text-[#181925]">
              Registry index
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {UI_ITEMS.map((item, i) => {
              const uses = USED_IN[item.name]?.length ?? 0;
              return (
                <li key={item.name}>
                  <Link
                    href={`/ui/${item.name}`}
                    className="group flex h-full flex-col rounded-2xl border border-black/[0.07] p-4 transition-colors hover:border-black/[0.14] hover:bg-black/[0.015]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[11.5px] tabular-nums text-[#bbb]">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[14.5px] font-medium text-[#181925]">{item.title}</span>
                      {NEW_COMPONENTS.includes(item.name) && (
                        <span className="rounded-full bg-primary/10 px-1.5 py-px text-[10.5px] font-medium text-primary">New</span>
                      )}
                      <ArrowRight
                        className="ml-auto size-3.5 shrink-0 text-[#ccc] transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-[#181925]"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-[#888]">{item.description}</span>
                    {uses > 0 && <span className="mt-auto pt-3 text-[12px] text-[#aaa]">In {uses === 1 ? '1 template' : `${uses} templates`}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-16 border-t border-black/[0.06] pt-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-[#181925]">
              Building an AI product? <span className="text-[#666]">Our landing page templates are made the same way, and use these components.</span>
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
      </div>
    </main>
  );
}
