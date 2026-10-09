import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';
import CopyCommand from '@/components/template/CopyCommand';
import ComponentPreview from '@/components/ui-site/ComponentPreview';
import OnThisPage from '@/components/ui-site/OnThisPage';
import { NEW_COMPONENTS } from '@/components/site/nav-data';
import { UI_ITEMS, UI_NAME, UI_REQUIREMENTS, getUiItem, type UiItem } from '@/ui-library/registry';
import { USED_IN } from '@/ui-library/used-in';
import { SITE_NAME, absoluteUrl } from '@/data/site';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DETAILS, shortKind } from '@/data/template-details';

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return UI_ITEMS.map((item) => ({ slug: item.name }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getUiItem(slug);
  if (!item) return {};
  const title = `${item.title}: a free React component`;
  const description = `${item.description} Free, built for shadcn/ui and installed with one command.`;
  return {
    title: { absolute: `${title} | ${UI_NAME}` },
    description,
    alternates: { canonical: `/ui/${slug}` },
    openGraph: { type: 'article', siteName: SITE_NAME, url: `/ui/${slug}`, title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

const CODE = 'overflow-x-auto rounded-xl border border-black/[0.07] bg-[#fafafa] p-4 font-mono text-[12.5px] leading-6 text-[#181925]';
const BODY = 'text-[15px] leading-relaxed text-[#444]';

/** One part of the page: a heading you can link to, then its content. */
function DocSection({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="mt-14 scroll-mt-32 border-t border-black/[0.06] pt-10 sm:mt-16">
      <h2 id={`${id}-label`} className="text-[20px] font-medium tracking-[-0.02em] text-[#181925]">
        <a href={`#${id}`} className="decoration-black/20 underline-offset-4 hover:underline">
          {label}
        </a>
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** A component you can go to from here: its name and what it does. */
function ComponentCard({ item }: { item: UiItem }) {
  return (
    <li>
      <Link href={`/ui/${item.name}`} className="group flex h-full flex-col rounded-2xl border border-black/[0.07] p-4 transition-colors hover:border-black/[0.14] hover:bg-black/[0.015]">
        <span className="flex items-center justify-between gap-3 text-[14.5px] font-medium text-[#181925]">
          {item.title}
          <ArrowRight className="size-3.5 shrink-0 text-[#bbb] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#181925]" aria-hidden="true" />
        </span>
        <span className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-[#888]">{item.description}</span>
      </Link>
    </li>
  );
}

export default async function UiComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getUiItem(slug);
  if (!item) notFound();

  const source = readFileSync(path.join(process.cwd(), 'src', 'ui-library', 'registry', item.file), 'utf8');
  const registryUrl = absoluteUrl(`/r/${item.name}.json`);
  const install = `npx shadcn@latest add ${registryUrl}`;
  const index = UI_ITEMS.findIndex((i) => i.name === item.name);
  const prev = UI_ITEMS[index - 1];
  const next = UI_ITEMS[index + 1];

  // How this component connects to the rest: what it installs, what builds on it, its siblings and the templates using it.
  const installs = (item.registryDependencies ?? []).flatMap((n) => getUiItem(n) ?? []);
  const usedBy = UI_ITEMS.filter((i) => i.registryDependencies?.includes(item.name));
  const family = item.name.split('-')[0];
  const siblings = UI_ITEMS.filter((i) => i.name !== item.name && i.name.split('-')[0] === family && !usedBy.includes(i) && !installs.includes(i));
  const templates = TEMPLATES.flatMap((t) => {
    const use = USED_IN[item.name]?.find((u) => u.template === t.slug);
    const details = TEMPLATE_DETAILS[t.slug];
    return use && details ? [{ slug: t.slug, href: t.detailUrl, name: details.name, kind: shortKind(details), where: use.where }] : [];
  });
  const connected = installs.length + usedBy.length + siblings.length + templates.length > 0;

  const toc = [
    { id: 'preview', label: 'Preview' },
    { id: 'overview', label: 'Overview' },
    { id: 'states', label: 'States' },
    { id: 'usage', label: 'Usage' },
    ...(connected ? [{ id: 'works-with', label: 'Works with' }] : []),
    ...(item.recipe ? [{ id: 'example', label: item.recipeTitle ?? 'With the AI SDK' }] : []),
    { id: 'props', label: 'Props' },
    { id: 'notes', label: 'Accessibility and motion' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'source', label: 'Source' },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: item.title,
      description: item.description,
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'React',
      url: absoluteUrl(`/ui/${item.name}`),
      isAccessibleForFree: true,
      publisher: { '@type': 'Organization', name: SITE_NAME },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Components', item: absoluteUrl('/ui') },
        { '@type': 'ListItem', position: 2, name: item.title, item: absoluteUrl(`/ui/${item.name}`) },
      ],
    },
  ];

  return (
    <div className="grid px-5 sm:px-8 lg:px-12 xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <main className="min-w-0 max-w-[880px] pb-20 pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="hidden items-center gap-1.5 text-[13px] text-[#999] lg:flex">
          <Link href="/ui" className="transition-colors hover:text-[#181925]">
            Components
          </Link>
          <ChevronRight className="size-3.5 text-[#ccc]" aria-hidden="true" />
          <span aria-current="page" className="text-[#181925]">
            {item.title}
          </span>
          <span className="ml-auto tabular-nums">
            {index + 1} / {UI_ITEMS.length}
          </span>
        </nav>

        <h1 className="flex lg:mt-6 flex-wrap items-center gap-x-3 gap-y-2 text-[36px] font-medium leading-[1.02] tracking-[-0.04em] text-[#181925] sm:text-[46px]">
          {item.title}
          {NEW_COMPONENTS.includes(item.name) && (
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[13px] font-medium tracking-normal text-primary">New</span>
          )}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-[17px] leading-relaxed text-[#181925]/80">{item.description}</p>

        {/* The component first, then how to get it. */}
        <section id="preview" aria-label="Preview" className="mt-8 scroll-mt-32">
          <ComponentPreview name={item.name} tabs={item.tabs} tabsLabel={item.tabsLabel} installCommand={install} />
        </section>

        <div className="mt-6">
          <p className="mb-2.5 text-sm text-[#888]">Install with the shadcn CLI</p>
          <CopyCommand commands={[install]} />
        </div>

        <DocSection id="overview" label="Overview">
          <p className={`max-w-3xl text-pretty ${BODY}`}>{item.summary}</p>
        </DocSection>

        <DocSection id="states" label="States">
          <dl>
            {item.states.map((st) => (
              <div key={st.name} className="grid gap-1 border-b border-black/[0.06] py-3 first:pt-0 last:border-0 sm:grid-cols-[170px_1fr] sm:gap-6">
                <dt className="font-mono text-[12.5px] text-[#181925]">{st.name}</dt>
                <dd className={BODY}>{st.description}</dd>
              </div>
            ))}
          </dl>
        </DocSection>

        <DocSection id="usage" label="Usage">
          <pre className={CODE}>
            <code>{item.usage}</code>
          </pre>
          {item.dependencies.length > 0 && (
            <p className="mt-4 text-sm text-[#888]">Depends on {item.dependencies.join(', ')}, installed for you by the CLI along with the keyframes it needs.</p>
          )}
        </DocSection>

        {connected && (
          <DocSection id="works-with" label="Works with">
            <div className="space-y-8">
              {installs.length > 0 && (
                <div>
                  <h3 className="mb-3 text-[13px] text-[#888]">Installs with it</h3>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {installs.map((i) => (
                      <ComponentCard key={i.name} item={i} />
                    ))}
                  </ul>
                </div>
              )}
              {usedBy.length > 0 && (
                <div>
                  <h3 className="mb-3 text-[13px] text-[#888]">Built on it</h3>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {usedBy.map((i) => (
                      <ComponentCard key={i.name} item={i} />
                    ))}
                  </ul>
                </div>
              )}
              {siblings.length > 0 && (
                <div>
                  <h3 className="mb-3 text-[13px] text-[#888]">Related</h3>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {siblings.map((i) => (
                      <ComponentCard key={i.name} item={i} />
                    ))}
                  </ul>
                </div>
              )}
              {templates.length > 0 && (
                <div>
                  <h3 className="mb-1 text-[13px] text-[#888]">In the templates</h3>
                  <p className="mb-3 max-w-2xl text-[13.5px] leading-relaxed text-[#888]">
                    See it at work in a whole page. The templates ship it in <code className="font-mono text-[12.5px] text-[#181925]">components/hairline/</code>.
                  </p>
                  <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                    {templates.map((t) => (
                      <li key={t.slug} className="min-w-0 border-t border-black/[0.06]">
                        <Link href={t.href} className="group flex items-center gap-4 py-3.5">
                          <img
                            src={`/previews/card/${t.slug}.webp`}
                            alt=""
                            width={80}
                            height={52}
                            loading="lazy"
                            className="h-[52px] w-20 shrink-0 rounded-lg border border-black/[0.07] object-cover object-top"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[14.5px] font-medium text-[#181925] transition-colors group-hover:text-primary">{t.name}</span>
                            <span className="mt-0.5 block truncate text-[13px] text-[#888]">
                              {t.where} · {t.kind}
                            </span>
                          </span>
                          <ArrowRight className="size-4 shrink-0 text-[#bbb] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </DocSection>
        )}

        {item.recipe && (
          <DocSection id="example" label={item.recipeTitle ?? 'With the AI SDK'}>
            <p className={`mb-4 max-w-2xl ${BODY}`}>{item.recipeIntro ?? 'Map the Vercel AI SDK’s message parts and chat status onto the component’s props.'}</p>
            <pre className={CODE}>
              <code>{item.recipe}</code>
            </pre>
          </DocSection>
        )}

        <DocSection id="props" label="Props">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-[14px]">
              <thead>
                <tr className="text-sm text-[#888]">
                  <th scope="col" className="pb-3 pr-6 font-normal">Prop</th>
                  <th scope="col" className="pb-3 pr-6 font-normal">Type</th>
                  <th scope="col" className="pb-3 font-normal">Description</th>
                </tr>
              </thead>
              <tbody>
                {item.props.map((p) => (
                  <tr key={p.name} className="border-t border-black/[0.06] align-top">
                    <td className="py-3 pr-6 font-mono text-[12.5px] text-[#181925]">{p.name}</td>
                    <td className="py-3 pr-6 font-mono text-[12px] text-[#666]">
                      {p.type}
                      {p.default && <span className="block text-[#999]">default {p.default}</span>}
                    </td>
                    <td className="py-3 text-[#444]">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocSection id="notes" label="Accessibility and motion">
          <ul className={`max-w-2xl list-disc space-y-3 pl-5 marker:text-[#ccc] ${BODY}`}>
            {item.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </DocSection>

        <DocSection id="requirements" label="Requirements">
          <p className={`max-w-2xl ${BODY}`}>{UI_REQUIREMENTS}</p>
          {item.registryDependencies?.length ? (
            <p className="mt-3 text-sm text-[#888]">
              The CLI also installs{' '}
              {item.registryDependencies.map((n, i) => (
                <React.Fragment key={n}>
                  {i > 0 && ', '}
                  <Link href={`/ui/${n}`} className="text-[#181925] underline decoration-black/20 underline-offset-4 hover:decoration-black/60">
                    {getUiItem(n)?.title ?? n}
                  </Link>
                </React.Fragment>
              ))}
              .
            </p>
          ) : null}
        </DocSection>

        <DocSection id="source" label="Source">
          <details className="group">
            <summary className="flex w-fit cursor-pointer list-none items-center gap-2 text-[15px] text-[#181925] [&::-webkit-details-marker]:hidden">
              <span className="text-[#999] transition-transform group-open:rotate-90">›</span>
              Show the full source of {item.file} ({source.split('\n').length} lines)
            </summary>
            <pre className={`${CODE} mt-4 max-h-[640px]`}>
              <code>{source}</code>
            </pre>
          </details>
          <p className="mt-4 text-sm text-[#888]">
            Registry item:{' '}
            <a href={`/r/${item.name}.json`} className="text-[#666] underline decoration-black/20 underline-offset-4 hover:text-[#181925]">
              /r/{item.name}.json
            </a>
          </p>
        </DocSection>

        {/* Next and previous, in the order of the sidebar. */}
        <nav aria-label="More components" className="mt-16 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link href={`/ui/${prev.name}`} className="group flex flex-col rounded-2xl border border-black/[0.07] p-4 transition-colors hover:border-black/[0.14]">
              <span className="flex items-center gap-1.5 text-[12.5px] text-[#999]">
                <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
                Previous
              </span>
              <span className="mt-1.5 text-[15px] font-medium text-[#181925]">{prev.title}</span>
              <span className="mt-0.5 line-clamp-1 text-[13px] text-[#888]">{prev.description}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link href={`/ui/${next.name}`} className="group flex flex-col rounded-2xl border border-black/[0.07] p-4 text-right transition-colors hover:border-black/[0.14]">
              <span className="flex items-center justify-end gap-1.5 text-[12.5px] text-[#999]">
                Next
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span className="mt-1.5 text-[15px] font-medium text-[#181925]">{next.title}</span>
              <span className="mt-0.5 line-clamp-1 text-[13px] text-[#888]">{next.description}</span>
            </Link>
          )}
        </nav>
      </main>

      <aside className="hidden xl:block">
        <div className="sticky top-14 max-h-[calc(100dvh-3.5rem)] overflow-y-auto pb-10 pt-10">
          <OnThisPage sections={toc} />
          <div className="mt-8 space-y-2 border-t border-black/[0.06] pt-5 text-[13px]">
            <a href={`/r/${item.name}.json`} className="flex items-center gap-1 text-[#888] transition-colors hover:text-[#181925]">
              Registry item
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
            {templates.length > 0 && (
              <a href="#works-with" className="block text-[#888] transition-colors hover:text-[#181925]">
                In {templates.length} {templates.length === 1 ? 'template' : 'templates'}
              </a>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
