'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, RotateCcw, Terminal } from 'lucide-react';
import { UI_DEMOS } from '@/ui-library/demos';

interface ComponentPreviewProps {
  name: string;
  tabs?: string[];
  tabsLabel?: string;
  installCommand: string;
}

const ICON_BUTTON =
  'flex size-8 items-center justify-center rounded-lg text-[#777] transition-colors hover:bg-black/[0.05] hover:text-[#181925] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30';

/** The live canvas for one component: the demo, its state tabs, replay and copy-install. */
export default function ComponentPreview({ name, tabs, tabsLabel = 'States', installCommand }: ComponentPreviewProps) {
  const Demo = UI_DEMOS[name];
  const [tab, setTab] = useState(tabs?.[0]);
  const [run, setRun] = useState(0);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  // Demos run timers and animations: start each one only when it scrolls into view.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '120px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  const hasTabs = tabs && tabs.length > 1;

  return (
    <div ref={frameRef} className="relative overflow-hidden rounded-[22px] border border-black/[0.07] bg-white">
      <div className="absolute right-3 top-3 z-10 flex items-center gap-0.5">
        <button type="button" aria-label="Replay" onClick={() => setRun((r) => r + 1)} className={ICON_BUTTON}>
          <RotateCcw className="size-4" />
        </button>
        <button type="button" aria-label={copied ? 'Install command copied' : 'Copy install command'} onClick={copy} className={ICON_BUTTON}>
          {copied ? <Check className="size-4 text-emerald-600" /> : <Terminal className="size-4" />}
        </button>
      </div>

      <div className={`flex min-h-[380px] items-center justify-center px-5 pt-16 sm:px-8 ${hasTabs ? 'pb-24' : 'pb-14'}`}>
        {Demo && visible ? <Demo key={`${tab ?? ''}-${run}`} tab={tab} /> : null}
      </div>

      {hasTabs && (
        <div className="absolute inset-x-0 bottom-5 flex justify-center px-4">
          <div
            role="tablist"
            aria-label={tabsLabel}
            className="flex max-w-full items-center overflow-x-auto rounded-full bg-[#f2f2f4] p-1 text-[12.5px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={t === tab}
                onClick={() => {
                  setTab(t);
                  setRun((r) => r + 1);
                }}
                className={`shrink-0 rounded-full px-3.5 py-1 font-medium transition-colors ${
                  t === tab ? 'bg-white text-[#181925] shadow-[0_1px_2px_rgba(0,0,0,0.08)]' : 'text-[#888] hover:text-[#181925]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
