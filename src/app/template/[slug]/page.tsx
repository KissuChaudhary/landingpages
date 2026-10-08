import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PagePreview from '@/components/template/PagePreview';
import CopyCommand from '@/components/template/CopyCommand';
import BuyButton from '@/components/template/BuyButton';
import StickyBuyBar from '@/components/template/StickyBuyBar';
import Row from '@/components/Row';
import Faq, { type FaqItem } from '@/components/Faq';
import TemplateCard from '@/components/TemplateCard';
import { TEMPLATES, getTemplateBySlug } from '@/data/templates';
import { TEMPLATE_DETAILS, getTemplateDetails, shortKind, type TemplateDetails } from '@/data/template-details';
import { ALL_ACCESS_CHECKOUT, CURRENCY, PRICING, TEMPLATE_CHECKOUT, formatPrice } from '@/data/pricing';
import { SITE_NAME, absoluteUrl } from '@/data/site';

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "an AI writing tool landing page template", "a video editing studio landing page template" */
const kindInSentence = (kind: string) => {
  const lower = /^[A-Z]{2}/.test(kind) ? kind : kind.charAt(0).toLowerCase() + kind.slice(1);
  return `${/^(AI\b|[aeiou])/i.test(lower) ? 'an' : 'a'} ${lower}`;
};

const pageTitle = (d: TemplateDetails) => `${d.name}: ${capitalise(d.kind)} for Next.js`;

const metaDescription = (d: TemplateDetails) =>
  `${d.name} is ${kindInSentence(d.kind)} built with Next.js 15, React 19 and Tailwind CSS v4. ${d.sections.length} sections, one config file and a live demo. ${formatPrice(PRICING.single.price)}, commercial license.`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const d = getTemplateDetails(slug);
  if (!d) return {};
  const title = pageTitle(d);
  const description = metaDescription(d);
  const image = { url: `/og/${slug}.jpg`, width: 1200, height: 630, alt: `The ${d.name} landing page template` };
  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: { canonical: `/template/${slug}` },
    openGraph: { type: 'website', siteName: SITE_NAME, url: `/template/${slug}`, title, description, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** Renders `backtick` spans in data strings as inline code. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/).map((part, i) =>
        part.startsWith('`') && part.endsWith('`') ? (
          <code key={i} className="font-mono text-[0.88em] text-neutral-950">
            {part.slice(1, -1)}
          </code>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  const d = getTemplateDetails(slug);
  if (!template || !d) notFound();

  const single = formatPrice(PRICING.single.price);
  const allAccess = formatPrice(PRICING.allAccess.price);
  const checkout = TEMPLATE_CHECKOUT[slug] ?? '';
  const count = TEMPLATES.length;
  const updated = formatDate(d.updated);
  const index = TEMPLATES.findIndex((t) => t.slug === slug);
  const related = [1, 2, 3].map((n) => TEMPLATES[(index + n) % count]);

  const specs: [string, React.ReactNode][] = [
    ['Framework', 'Next.js 15 (App Router), React 19'],
    ['Language', 'TypeScript'],
    ['Styling', 'Tailwind CSS v4, design tokens in one stylesheet'],
    ['Fonts', `${d.fonts.join(', ')}, self-hosted with next/font`],
    ['Dependencies', <span key="deps" className="font-mono text-[13px]">{d.dependencies.join(', ')}</span>],
    ['Images', d.images],
    ['API keys and environment variables', 'None'],
    ['Node.js', `${d.node} or newer`],
    ['Colour scheme', template.defaultTheme === 'dark' ? 'Dark' : 'Light'],
    ['Responsive', 'Desktop, tablet and phone'],
    ['Accessibility', 'Skip link, visible focus, keyboard navigation, reduced motion'],
    ['Deploys to', 'Vercel, Netlify, Cloudflare Pages or any Node host'],
    ['Codebase', `${d.files} source files, about ${(Math.round(d.lines / 100) * 100).toLocaleString('en-US')} lines`],
    ['Last updated', updated],
  ];

  const faqs: FaqItem[] = [
    {
      q: `What do I get when I buy ${d.name}?`,
      a: `The complete ${d.name} project as a download: the Next.js app, its config file, a README with setup and customisation notes, and the license. The download link arrives right after checkout.`,
    },
    {
      q: `Can I use ${d.name} for client projects?`,
      a: 'Yes. One purchase covers your own products and any number of client projects, and you can change the code however you like. What you can’t do is resell or share the template files themselves as a template or UI kit.',
    },
    {
      q: 'Do I need API keys, a database or a backend?',
      a: (
        <>
          No. It runs with <RichText text="`npm install` and `npm run dev`" /> and deploys to Vercel, Netlify or Cloudflare Pages
          without any environment variables.
        </>
      ),
    },
    { q: 'What should I change before I launch?', a: <RichText text={d.beforeLaunch} /> },
    {
      q: 'Do I need to know Next.js?',
      a: (
        <>
          Basic React helps, but most changes are text edits in <RichText text="`site.config.ts`" />. The README walks through colours,
          fonts and section order.
        </>
      ),
    },
    {
      q: 'How do updates work?',
      a: `Updates to ${d.name} are free. When a new version ships, download it again from the link in your order email.`,
    },
    {
      q: 'Can I get a refund?',
      a: `Yes. If ${d.name} isn’t right for you, reply to your receipt within ${PRICING.refundDays} days and you get your money back.`,
    },
    {
      q: 'Should I buy all-access instead?',
      a: `If you’ll use more than two templates, yes. All-access is ${allAccess} for all ${count} templates, including ${d.name} and every template added later. Three single templates would cost ${formatPrice(
        PRICING.single.price * 3
      )}.`,
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${d.name}: ${d.kind}`,
      description: d.summary,
      image: [absoluteUrl(`/og/${slug}.jpg`), absoluteUrl(`/previews/card/${slug}.webp`)],
      sku: `founderdada-${slug}`,
      category: 'Website templates',
      brand: { '@type': 'Brand', name: SITE_NAME },
      offers: {
        '@type': 'Offer',
        url: absoluteUrl(`/template/${slug}`),
        price: PRICING.single.price.toFixed(2),
        priceCurrency: CURRENCY,
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: SITE_NAME },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: d.name, item: absoluteUrl(`/template/${slug}`) },
      ],
    },
  ];

  const facts = [
    'Next.js 15',
    'Tailwind CSS v4',
    'TypeScript',
    `${d.sections.length} sections`,
    template.defaultTheme === 'dark' ? 'Dark' : 'Light',
    'No API keys',
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white pb-16 text-neutral-600 selection:bg-neutral-900 selection:text-white lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-6 sm:pt-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-neutral-400">
              <li>
                <Link href="/#catalog" className="transition-colors hover:text-neutral-950">
                  Templates
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-neutral-950">
                {d.name}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[1fr_300px] lg:items-end lg:gap-16">
            <h1 className="text-neutral-950">
              <span className="block text-[64px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[104px]">{d.name}</span>
              <span className="sr-only">: </span>
              <span className="mt-6 block max-w-xl text-balance text-xl leading-[1.35] tracking-[-0.02em] text-neutral-500 sm:text-[26px]">
                {capitalise(d.kind)} for Next.js.
              </span>
            </h1>

            <div id="hero-buy">
              <p className="flex items-baseline gap-2.5">
                <span className="text-4xl font-medium tracking-[-0.04em] text-neutral-950">{single}</span>
                <span className="text-sm text-neutral-500">one-time payment</span>
              </p>
              <div className="mt-5 flex gap-2">
                <BuyButton href={checkout} className="flex-1">
                  Buy {d.name}
                </BuyButton>
                <Link
                  href={template.demoUrl}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-neutral-200 px-5 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                >
                  Live demo
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-4 text-sm text-neutral-500">
                {checkout ? (
                  <>
                    Or{' '}
                    <a href="#all-access" className="text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950">
                      get all {count} templates for {allAccess}
                    </a>
                  </>
                ) : (
                  'Checkout opens soon.'
                )}
              </p>
            </div>
          </div>

          <ul className="mt-14 flex flex-wrap gap-x-7 gap-y-2 border-t border-neutral-200 pt-5 text-sm text-neutral-500">
            {facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
            <li className="lg:ml-auto">Updated {updated}</li>
          </ul>
        </section>

        {/* Full-page preview */}
        <section id="preview" aria-label="Full-page preview" className="mx-auto mt-12 max-w-6xl px-5 sm:mt-16 sm:px-6">
          <PagePreview name={d.name} slug={slug} demoUrl={template.demoUrl} />
        </section>

        <div className="mt-20 sm:mt-28" />

        <Row id="overview" label="Overview">
          <p className="max-w-3xl text-xl leading-[1.5] tracking-[-0.015em] text-neutral-950 sm:text-2xl">{d.summary}</p>
          <dl className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-neutral-500">Made for</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-900">{d.bestFor.join(', ')}</dd>
            </div>
            <div>
              <dt className="text-sm text-neutral-500">Highlights</dt>
              <dd className="mt-2">
                <ul className="space-y-1.5 text-[15px] leading-relaxed text-neutral-900">
                  {template.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-neutral-500">The look</dt>
              <dd className="mt-2 max-w-3xl text-[15px] leading-relaxed text-neutral-900">{d.design}</dd>
            </div>
          </dl>
        </Row>

        <Row id="sections" label="Sections">
          <ol>
            {d.sections.map((s, i) => (
              <li
                key={s.name}
                className="grid grid-cols-[32px_1fr] gap-x-4 gap-y-1 border-b border-neutral-100 py-4 first:pt-0 sm:grid-cols-[40px_200px_1fr]"
              >
                <span className="text-sm tabular-nums text-neutral-400">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-[15px] font-medium text-neutral-950">{s.name}</h3>
                <p className="col-start-2 text-[15px] leading-relaxed text-neutral-500 sm:col-start-3">{s.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-neutral-500">
            Remove a section by deleting its line in <RichText text="`app/page.tsx`" />, or move the line to reorder.
          </p>
        </Row>

        <Row id="customize" label="Make it yours">
          <p className="max-w-2xl text-[15px] leading-relaxed text-neutral-900">
            Every word, link and price lives in <RichText text="`site.config.ts`" />. TypeScript flags a missing or misspelled field, so you
            can’t quietly break a section.
          </p>

          <table className="mt-8 w-full text-left text-[15px]">
            <caption className="sr-only">Where to change each part of {d.name}</caption>
            <thead>
              <tr className="text-sm text-neutral-500">
                <th scope="col" className="pb-3 font-normal">
                  To change
                </th>
                <th scope="col" className="pb-3 font-normal">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {d.customize.map((row) => (
                <tr key={row.what} className="border-t border-neutral-100 align-top">
                  <td className="py-3 pr-6 text-neutral-900">{row.what}</td>
                  <td className="py-3 font-mono text-[13px] text-neutral-600">{row.where}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-sm text-neutral-500">Run it</p>
              <div className="mt-3">
                <CopyCommand commands={['npm install', 'npm run dev']} />
              </div>
              <p className="mt-3 text-sm text-neutral-500">Node.js {d.node} or newer. No environment variables.</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Before you go live</p>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-900">
                <RichText text={d.beforeLaunch} />
              </p>
            </div>
          </div>
        </Row>

        <Row id="specs" label="Specifications">
          <dl>
            {specs.map(([label, value]) => (
              <div key={label} className="grid gap-1 border-b border-neutral-100 py-3 first:pt-0 sm:grid-cols-[260px_1fr] sm:gap-6">
                <dt className="text-[15px] text-neutral-500">{label}</dt>
                <dd className="text-[15px] text-neutral-900">{value}</dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row id="license" label="License">
          <p className="max-w-2xl text-[15px] leading-relaxed text-neutral-900">
            One license, no tiers. The full text ships as LICENSE.md in the download.
          </p>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-sm text-neutral-500">You can</p>
              <ul className="mt-3 space-y-2 text-[15px] text-neutral-900">
                <li>Use it for your own products</li>
                <li>Use it for any number of client projects</li>
                <li>Change the code and design however you like</li>
                <li>Deploy the result commercially</li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-neutral-500">You can’t</p>
              <ul className="mt-3 space-y-2 text-[15px] text-neutral-900">
                <li>Resell or share the files as a template, theme or UI kit</li>
                <li>Publish the source as a template in a public repository</li>
              </ul>
            </div>
          </div>
        </Row>

        <Row id="faq" label="Questions">
          <Faq items={faqs} />
        </Row>

        <Row id="all-access" label="All-access">
          <p className="text-3xl font-medium tracking-[-0.035em] text-neutral-950 sm:text-4xl">
            All {count} templates for {allAccess}.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-500">
            Every template in the library, including {d.name}, and every one added later. Same license, free updates. Less than three
            single templates.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <BuyButton href={ALL_ACCESS_CHECKOUT}>Get all-access</BuyButton>
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-950"
            >
              Browse the library
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-5 gap-3" aria-label="Templates included">
            {TEMPLATES.map((t) => (
              <li key={t.slug}>
                <Link href={t.detailUrl} className="group block">
                  <img
                    src={t.thumbnailUrl}
                    alt={TEMPLATE_DETAILS[t.slug]?.name ?? t.title}
                    loading="lazy"
                    className="aspect-[3/2] w-full rounded-md border border-neutral-200 object-cover object-top transition-opacity group-hover:opacity-80"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Row>

        <Row id="related" label="More templates">
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-3">
            {related.map((t) => {
              const r = TEMPLATE_DETAILS[t.slug];
              return r ? (
                <li key={t.slug}>
                  <TemplateCard slug={t.slug} name={r.name} kind={shortKind(r)} price={single} href={t.detailUrl} />
                </li>
              ) : null;
            })}
          </ul>
        </Row>
      </main>

      <Footer />

      <StickyBuyBar name={d.name} price={single} checkout={checkout} watchId="hero-buy" />
    </div>
  );
}
