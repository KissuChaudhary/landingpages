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
  'agentwrite-growth': dynamic(() => import('@/templates/agentwrite-growth'), { ssr: false, loading: Loading }),
  'agenwrite-enterprise': dynamic(() => import('@/templates/agenwrite-enterprise'), { ssr: false, loading: Loading }),
  'agenwrite-geo': dynamic(() => import('@/templates/agenwrite-geo'), { ssr: false, loading: Loading }),
  'agenwrite-growth-engine': dynamic(() => import('@/templates/agenwrite-growth-engine'), { ssr: false, loading: Loading }),
  'ai-agency': dynamic(() => import('@/templates/ai-agency'), { ssr: false, loading: Loading }),
  'aligno-landing': dynamic(() => import('@/templates/aligno-landing'), { ssr: false, loading: Loading }),
  'apex-dashboard': dynamic(() => import('@/templates/apex-dashboard'), { ssr: false, loading: Loading }),
  'clearnotes-hero': dynamic(() => import('@/templates/clearnotes-hero'), { ssr: false, loading: Loading }),
  'create-studio': dynamic(() => import('@/templates/create-studio'), { ssr: false, loading: Loading }),
  'creatorflow': dynamic(() => import('@/templates/creatorflow'), { ssr: false, loading: Loading }),
  'drawgle': dynamic(() => import('@/templates/drawgle'), { ssr: false, loading: Loading }),
  'ecompin': dynamic(() => import('@/templates/ecompin'), { ssr: false, loading: Loading }),
  'founder-pricing': dynamic(() => import('@/templates/founder-pricing'), { ssr: false, loading: Loading }),
  'fundora-dashboard': dynamic(() => import('@/templates/fundora-dashboard'), { ssr: false, loading: Loading }),
  'influence-hero': dynamic(() => import('@/templates/influence-hero'), { ssr: false, loading: Loading }),
  'intelligent-systems': dynamic(() => import('@/templates/intelligent-systems'), { ssr: false, loading: Loading }),
  'kinetik': dynamic(() => import('@/templates/kinetik'), { ssr: false, loading: Loading }),
  'loomauth': dynamic(() => import('@/templates/loomauth'), { ssr: false, loading: Loading }),
  'lucid-ledger': dynamic(() => import('@/templates/lucid-ledger'), { ssr: false, loading: Loading }),
  'magnetic-grid': dynamic(() => import('@/templates/magnetic-grid'), { ssr: false, loading: Loading }),
  'minto-dashboard': dynamic(() => import('@/templates/minto-dashboard'), { ssr: false, loading: Loading }),
  'motion-bento': dynamic(() => import('@/templates/motion-bento'), { ssr: false, loading: Loading }),
  'nousu-saas': dynamic(() => import('@/templates/nousu-saas'), { ssr: false, loading: Loading }),
  'pfp-ai': dynamic(() => import('@/templates/pfp-ai'), { ssr: false, loading: Loading }),
  'portfolio-hero': dynamic(() => import('@/templates/portfolio-hero'), { ssr: false, loading: Loading }),
  'premium-bento': dynamic(() => import('@/templates/premium-bento'), { ssr: false, loading: Loading }),
  'quick-14-studio': dynamic(() => import('@/templates/quick-14-studio'), { ssr: false, loading: Loading }),
  'refind-ai': dynamic(() => import('@/templates/refind-ai'), { ssr: false, loading: Loading }),
  'retro-camera': dynamic(() => import('@/templates/retro-camera'), { ssr: false, loading: Loading }),
  'scale-ai-hero': dynamic(() => import('@/templates/scale-ai-hero'), { ssr: false, loading: Loading }),
  'sequence-dashboard': dynamic(() => import('@/templates/sequence-dashboard'), { ssr: false, loading: Loading }),
  'skywrite-ai': dynamic(() => import('@/templates/skywrite-ai'), { ssr: false, loading: Loading }),
  'stripdo': dynamic(() => import('@/templates/stripdo'), { ssr: false, loading: Loading }),
  'thinking-orbs': dynamic(() => import('@/templates/thinking-orbs'), { ssr: false, loading: Loading }),
  'vertical-motion': dynamic(() => import('@/templates/vertical-motion'), { ssr: false, loading: Loading }),
};

export function getTemplateComponent(slug: string): React.ComponentType<any> | undefined {
  return TEMPLATE_COMPONENTS[slug];
}