'use client';

import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import TemplateCard from './TemplateCard';
import { SectionHeader } from './theirs/section-header';
import { TEMPLATES, CATEGORIES, type CategoryType } from '@/data/templates';

export default function TemplateCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    TEMPLATES.forEach((t) => t.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort().slice(0, 8);
  }, []);

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((template) => {
      if (selectedCategory !== 'All' && template.category !== selectedCategory) {
        return false;
      }
      if (selectedTag && !template.tags.includes(selectedTag)) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = template.title.toLowerCase().includes(query);
        const matchesDesc = template.description.toLowerCase().includes(query);
        const matchesTag = template.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesBadge = template.badge.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesTag || matchesBadge;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, selectedTag]);

  return (
    <section id="catalog" className="relative py-16 sm:py-24 px-4 bg-white border-t border-black/[0.04]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <SectionHeader
          badge="The Library"
          title="Curated templates, dashboards and UI components."
          description={
            <>
              Every kit is ready to deploy with Next.js, React 19, and Tailwind CSS.{' '}
              <span className="rounded-md bg-primary/10 box-decoration-clone px-1 py-0.5 text-primary font-medium">
                Preview any template in the interactive viewer
              </span>
              .
            </>
          }
        />

        {/* Search & Filter Bar */}
        <div className="mt-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
          {/* Category Tabs: Rounded Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((category) => {
              const count =
                category === 'All'
                  ? TEMPLATES.length
                  : TEMPLATES.filter((t) => t.category === category).length;
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedTag(null);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#181925] text-white shadow-xs'
                      : 'border border-black/[0.08] bg-[#f7f7f8] text-[#666] hover:text-[#181925]'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-black/[0.05] text-[#777]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#999]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword..."
              className="w-full rounded-full border border-black/[0.08] bg-[#f7f7f8] py-1.5 pl-8 pr-8 text-xs text-[#181925] placeholder-[#999] outline-none focus:border-primary/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#555]"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Tags Bar */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-[#777]">
          <span className="font-mono text-[11px] text-[#999]">Tags:</span>
          {allTags.map((tag) => {
            const isTagActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isTagActive ? null : tag)}
                className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors ${
                  isTagActive
                    ? 'bg-primary text-white'
                    : 'bg-[#f0f0f2] text-[#666] hover:text-[#181925]'
                }`}
              >
                #{tag}
              </button>
            );
          })}
          {(selectedTag || searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSelectedTag(null);
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-[11px] text-primary hover:underline ml-2"
            >
              Reset filters
            </button>
          )}
          <span className="ml-auto text-[11px] font-mono text-[#888]">
            {filteredTemplates.length} of {TEMPLATES.length} kits
          </span>
        </div>

        {/* Templates Grid */}
        <div className="mt-8">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.slug} template={template} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-black/[0.1] p-12 text-center">
              <h3 className="text-sm font-semibold text-[#181925]">No templates found</h3>
              <p className="mt-1 text-xs text-[#777]">
                We couldn't find any templates matching "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedTag(null);
                }}
                className="mt-4 rounded-full bg-[#181925] px-4 py-1.5 text-xs font-medium text-white hover:bg-black"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
