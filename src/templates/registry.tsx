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
  'cutroom': dynamic(() => import('@/templates/cutroom'), { ssr: false, loading: Loading }),
  'emberline': dynamic(() => import('@/templates/emberline'), { ssr: false, loading: Loading }),
  'halftone': dynamic(() => import('@/templates/halftone'), { ssr: false, loading: Loading }),
  'influence-hero': dynamic(() => import('@/templates/influence-hero'), { ssr: false, loading: Loading }),
  'marlow': dynamic(() => import('@/templates/marlow'), { ssr: false, loading: Loading }),
  'parley': dynamic(() => import('@/templates/parley'), { ssr: false, loading: Loading }),
  'quick-14-studio': dynamic(() => import('@/templates/quick-14-studio'), { ssr: false, loading: Loading }),
  'kept': dynamic(() => import('@/templates/kept'), { ssr: false, loading: Loading }),
  'unreal-shot': dynamic(() => import('@/templates/unreal-shot'), { ssr: false, loading: Loading }),
  'stillform': dynamic(() => import('@/templates/stillform'), { ssr: false, loading: Loading }),
};

export function getTemplateComponent(slug: string): React.ComponentType<any> | undefined {
  return TEMPLATE_COMPONENTS[slug];
}
