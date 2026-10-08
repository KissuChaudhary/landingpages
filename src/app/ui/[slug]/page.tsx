import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Row from '@/components/Row';
import CopyCommand from '@/components/template/CopyCommand';
import ComponentPreview from '@/components/ui-site/ComponentPreview';
import { UI_ITEMS, UI_NAME, UI_REQUIREMENTS, getUiItem } from '@/ui-library/registry';
import { SITE_NAME, absoluteUrl } from '@/data/site';

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

export default async function UiComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getUiItem(slug);
  if (!item) notFound();

  const source = readFileSync(path.join(process.cwd(), 'src', 'ui-library', 'registry', item.file), 'utf8');
  const registryUrl = absoluteUrl(`/r/${item.name}.json`);
  const install = `npx shadcn@latest add ${registryUrl}`;
  const others = UI_ITEMS.filter((i) => i.name !== item.name);

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
    <div className="min-h-screen bg-white text-[#666666] selection:bg-primary/10 selection:text-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Navbar />
      <main>
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-6 sm:pt-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-[#999]">
              <li>
                <Link href="/ui" className="transition-colors hover:text-[#181925]">
                  Components
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#181925]">
                {item.title}
              </li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[44px] font-medium leading-[0.95] tracking-[-0.05em] text-[#181925] sm:text-[64px]">{item.title}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-[#666]">{item.summary}</p>
          <div className="mt-8 max-w-3xl">
            <p className="mb-2.5 text-sm text-[#888]">Install with the shadcn CLI</p>
            <CopyCommand commands={[install]} />
          </div>

          <div className="mt-12">
            <ComponentPreview name={item.name} tabs={item.tabs} tabsLabel={item.tabsLabel} installCommand={install} />
          </div>
        </section>

        <div className="mt-16 sm:mt-24" />

        <Row id="states" label="States">
          <dl>
            {item.states.map((st) => (
              <div key={st.name} className="grid gap-1 border-b border-black/[0.06] py-3 first:pt-0 sm:grid-cols-[240px_1fr] sm:gap-6">
                <dt className="font-mono text-[12.5px] text-[#181925]">{st.name}</dt>
                <dd className="text-[15px] leading-relaxed text-[#444]">{st.description}</dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row id="usage" label="Usage">
          <pre className={CODE}>
            <code>{item.usage}</code>
          </pre>
          {item.dependencies.length > 0 && (
            <p className="mt-4 text-sm text-[#888]">
              Depends on {item.dependencies.join(', ')}, installed for you by the CLI along with the keyframes it needs.
            </p>
          )}
          {item.registryDependencies?.length ? (
            <p className="mt-2 text-sm text-[#888]">
              Also installs{' '}
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
        </Row>

        {item.recipe && (
          <Row id="example" label={item.recipeTitle ?? 'With the AI SDK'}>
            <p className="mb-4 max-w-2xl text-[15px] leading-relaxed text-[#444]">
              {item.recipeIntro ?? 'Map the Vercel AI SDK’s message parts and chat status onto the component’s props.'}
            </p>
            <pre className={CODE}>
              <code>{item.recipe}</code>
            </pre>
          </Row>
        )}

        <Row id="props" label="Props">
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
        </Row>

        <Row id="notes" label="Accessibility and motion">
          <ul className="max-w-2xl space-y-3 text-[15px] leading-relaxed text-[#333]">
            {item.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </Row>

        <Row id="requirements" label="Requirements">
          <p className="max-w-2xl text-[15px] leading-relaxed text-[#444]">{UI_REQUIREMENTS}</p>
        </Row>

        <Row id="source" label="Source">
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
        </Row>

        {others.length > 0 && (
          <Row id="more" label="More components">
            <ul className="divide-y divide-black/[0.06] border-y border-black/[0.06]">
              {others.map((o) => (
                <li key={o.name}>
                  <Link href={`/ui/${o.name}`} className="group flex items-center justify-between gap-6 py-4">
                    <span>
                      <span className="block text-[15px] font-medium text-[#181925] transition-colors group-hover:text-primary">{o.title}</span>
                      <span className="mt-0.5 block text-sm text-[#888]">{o.description}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-[#bbb] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Row>
        )}

        <div className="mb-24" />
      </main>
      <Footer />
    </div>
  );
}
