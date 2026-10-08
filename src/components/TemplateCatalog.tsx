import React from 'react';
import TemplateCard from './TemplateCard';
import { SectionHeader } from './theirs/section-header';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DETAILS, shortKind } from '@/data/template-details';
import { PRICING, formatPrice } from '@/data/pricing';

export default function TemplateCatalog() {
  const price = formatPrice(PRICING.single.price);

  return (
    <section id="catalog" className="relative scroll-mt-20 bg-white px-4 pb-16 pt-10 sm:pb-24 sm:pt-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="The Library"
          title="Pick a template. Ship it this week."
          description={
            <>
              Every template is a complete Next.js project.{' '}
              <span className="box-decoration-clone rounded-md bg-primary/10 px-1 py-0.5 font-medium text-primary">
                <span className="hidden [@media(hover:hover)]:inline">Hover one to scroll the whole page</span>
                <span className="[@media(hover:hover)]:hidden">Tap one to see the whole page</span>
              </span>
              .
            </>
          }
        />

        <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {TEMPLATES.map((t, i) => {
            const d = TEMPLATE_DETAILS[t.slug];
            if (!d) return null;
            return (
              <li key={t.slug}>
                <TemplateCard slug={t.slug} name={d.name} kind={shortKind(d)} price={price} href={t.detailUrl} priority={i < 2} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
