'use client';

import React, { useEffect, useState } from 'react';
import { Check, RotateCcw, Terminal } from 'lucide-react';
import { UI_DEMOS } from '@/ui-library/demos';

interface ComponentPreviewProps {
  name: string;
  variants?: string[];
  installCommand: string;
}

const ICON_BUTTON =
  'flex size-8 items-center justify-center rounded-lg text-[#777] transition-colors hover:bg-black/[0.05] hover:text-[#181925] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30';

/** The live canvas for one component: the demo, variant tabs, replay and copy-install. */
export default function ComponentPreview({ name, variants, installCommand }: ComponentPreviewProps) {
  const Demo = UI_DEMOS[name];
  const [variant, setVariant] = useState(variants?.[0]);
  const [run, setRun] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
    } catch {
      // Clipboard blocked; the command is also printed on the component page.
    }
  };

  const hasTabs = variants && variants.length > 1;

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-black/[0.07] bg-white">
      <div className="absolute right-3 top-3 z-10 flex items-center gap-0.5">
        <button type="button" aria-label="Replay" onClick={() => setRun((r) => r + 1)} className={ICON_BUTTON}>
          <RotateCcw className="size-4" />
        </button>
        <button type="button" aria-label={copied ? 'Install command copied' : 'Copy install command'} onClick={copy} className={ICON_BUTTON}>
          {copied ? <Check className="size-4 text-emerald-600" /> : <Terminal className="size-4" />}
        </button>
      </div>

      <div className={`flex min-h-[360px] items-center justify-center px-6 pt-16 ${hasTabs ? 'pb-24' : 'pb-14'}`}>
        {Demo ? <Demo key={`${variant ?? ''}-${run}`} variant={variant} /> : null}
      </div>

      {hasTabs && (
        <div
          role="tablist"
          aria-label="Variant"
          className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center rounded-full bg-[#f2f2f4] p-1 text-[12.5px]"
        >
          {variants.map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={v === variant}
              onClick={() => {
                setVariant(v);
                setRun((r) => r + 1);
              }}
              className={`rounded-full px-3.5 py-1 font-medium transition-colors ${
                v === variant ? 'bg-white text-[#181925] shadow-[0_1px_2px_rgba(0,0,0,0.08)]' : 'text-[#888] hover:text-[#181925]'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
