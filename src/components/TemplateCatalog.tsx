import React from 'react';
import TemplateCard from './TemplateCard';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DETAILS, shortKind } from '@/data/template-details';
import { PRICING, formatPrice } from '@/data/pricing';

export default function TemplateCatalog() {
  const price = formatPrice(PRICING.single.price);

  return (
    <section id="catalog" aria-labelledby="catalog-label" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-20 sm:px-6 sm:pb-28">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-black/[0.08] pt-5">
        <h2 id="catalog-label" className="text-sm font-medium text-[#181925]">
          {TEMPLATES.length} templates
        </h2>
        <p className="text-sm text-[#888]">
          <span className="hidden [@media(hover:hover)]:inline">Hover a template to scroll the whole page</span>
          <span className="[@media(hover:hover)]:hidden">Tap a template to see the whole page</span>
        </p>
      </div>

      <ul className="mt-8 grid gap-x-8 gap-y-14 sm:mt-10 md:grid-cols-2">
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
    </section>
  );
}
