'use client';

import React, { use } from 'react';
import { getTemplateComponent } from '@/templates/registry';
import { getTemplateBySlug } from '@/data/templates';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

interface PreviewPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const Component = getTemplateComponent(slug);
  const template = getTemplateBySlug(slug);

  if (!Component) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center text-[#181925]">
        <AlertCircle className="size-8 text-primary mb-2" />
        <h2 className="text-lg font-medium">Preview Unavailable</h2>
        <p className="mt-1 text-xs text-[#777] max-w-sm">
          The preview for template "{slug}" could not be loaded.
        </p>
        <Link
          href="/"
          className="mt-4 rounded-full bg-[#181925] px-4 py-1.5 text-xs font-medium text-white hover:bg-black transition-colors"
        >
          Back to Directory
        </Link>
      </div>
    );
  }

  const isDark = template?.defaultTheme === 'dark';

  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? 'dark bg-[#09090b] text-[#f4f4f5]' : 'bg-transparent text-slate-900'
      }`}
    >
      <Component />
    </div>
  );
}
