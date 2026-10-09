'use client';

import React, { useState } from 'react';
import { CookieBanner, openCookiePreferences, type CookieConsent } from '../registry/cookie-banner';
import { TextMorph } from '../registry/text-morph';

const KEY = 'hairline-demo-cookie-consent';
const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const loaded = (consent: CookieConsent | null) => {
  if (!consent) return 'Nothing yet, waiting for an answer';
  const on = ['analytics', 'marketing'].filter((id) => consent[id]);
  return on.length ? `Necessary, ${on.join(' and ')}` : 'Only what’s necessary';
};

export default function CookieBannerDemo() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [run, setRun] = useState(0);

  const forget = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setConsent(null);
    setRun((r) => r + 1);
  };

  return (
    <div className="w-full max-w-[640px]">
      {/* A small page, so the banner sits in its corner rather than the docs’ corner. */}
      <div className="relative h-[500px] overflow-hidden rounded-[22px] border border-border bg-background text-foreground">
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <span className="text-[14px] font-medium tracking-[-0.01em]">Kept</span>
          <span className="text-[12px] text-muted-foreground">Point of sale for small shops</span>
        </div>
        <div className="px-5 pt-10 sm:px-8">
          <p className="max-w-[16ch] text-[26px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[32px]">The till that knows your Saturdays.</p>
          <p className="mt-3 max-w-[40ch] text-[13px] leading-relaxed text-muted-foreground">Orders, stock and rotas in one place, so the queue moves and nothing runs out.</p>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-4 px-5 pb-[26px] text-[12px] text-muted-foreground">
          <button type="button" onClick={openCookiePreferences} className="rounded-sm underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
            Cookie settings
          </button>
        </div>
        <CookieBanner
          key={run}
          strategy="absolute"
          storageKey={KEY}
          policyHref="#cookies"
          onConsentChange={async (next, reason) => {
            setConsent(next);
            if (reason === 'save') await wait(700); // record it on your server
          }}
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1 text-[12.5px]">
        <p className="text-muted-foreground">
          Loaded: <TextMorph className="text-foreground">{loaded(consent)}</TextMorph>
        </p>
        <button type="button" onClick={forget} className="rounded-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
          Forget my choice
        </button>
      </div>
    </div>
  );
}
