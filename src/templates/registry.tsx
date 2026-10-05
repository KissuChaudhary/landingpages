'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center bg-white text-[#666]">
    <div className="flex flex-col items-center gap-2.5">
      <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="text-xs font-mono">Loading template...</span>
    </div>
  </div>
);

export const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'footnote': dynamic(() => import('@/templates/footnote'), { ssr: false, loading: Loading }),
  'agenwrite-growth-engine': dynamic(() => import('@/templates/agenwrite-growth-engine'), { ssr: false, loading: Loading }),
  'ai-imagetools': dynamic(() => import('@/templates/ai-imagetools'), { ssr: false, loading: Loading }),
  'clearnotes-hero': dynamic(() => import('@/templates/clearnotes-hero'), { ssr: false, loading: Loading }),
  'coloring-app': dynamic(() => import('@/templates/coloring-app'), { ssr: false, loading: Loading }),
  'create-studio': dynamic(() => import('@/templates/create-studio'), { ssr: false, loading: Loading }),
  'cutroom': dynamic(() => import('@/templates/cutroom'), { ssr: false, loading: Loading }),
  'cvfolio': dynamic(() => import('@/templates/cvfolio'), { ssr: false, loading: Loading }),
  'dating-pfp': dynamic(() => import('@/templates/dating-pfp'), { ssr: false, loading: Loading }),
  'emberline': dynamic(() => import('@/templates/emberline'), { ssr: false, loading: Loading }),
  'drawgle': dynamic(() => import('@/templates/drawgle'), { ssr: false, loading: Loading }),
  'ecompin': dynamic(() => import('@/templates/ecompin'), { ssr: false, loading: Loading }),
  'founder-pricing': dynamic(() => import('@/templates/founder-pricing'), { ssr: false, loading: Loading }),
  'influence-hero': dynamic(() => import('@/templates/influence-hero'), { ssr: false, loading: Loading }),
  'intelligent-systems': dynamic(() => import('@/templates/intelligent-systems'), { ssr: false, loading: Loading }),
  'marlow': dynamic(() => import('@/templates/marlow'), { ssr: false, loading: Loading }),
  'nousu-saas': dynamic(() => import('@/templates/nousu-saas'), { ssr: false, loading: Loading }),
  'passport-studio': dynamic(() => import('@/templates/passport-studio'), { ssr: false, loading: Loading }),
  'pfp-ai': dynamic(() => import('@/templates/pfp-ai'), { ssr: false, loading: Loading }),
  'quick-14-studio': dynamic(() => import('@/templates/quick-14-studio'), { ssr: false, loading: Loading }),
  'refind-ai': dynamic(() => import('@/templates/refind-ai'), { ssr: false, loading: Loading }),
  'scale-ai-hero': dynamic(() => import('@/templates/scale-ai-hero'), { ssr: false, loading: Loading }),
  'seo-writer': dynamic(() => import('@/templates/seo-writer'), { ssr: false, loading: Loading }),
  'skywrite-ai': dynamic(() => import('@/templates/skywrite-ai'), { ssr: false, loading: Loading }),
  'stripdo': dynamic(() => import('@/templates/stripdo'), { ssr: false, loading: Loading }),
  'theirs-saas': dynamic(() => import('@/templates/theirs-saas'), { ssr: false, loading: Loading }),
  'unreal-shot': dynamic(() => import('@/templates/unreal-shot'), { ssr: false, loading: Loading }),
};

export function getTemplateComponent(slug: string): React.ComponentType<any> | undefined {
  return TEMPLATE_COMPONENTS[slug];
}