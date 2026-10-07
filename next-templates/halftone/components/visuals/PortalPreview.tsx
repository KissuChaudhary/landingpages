"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Lock, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { EASE, usePlayback, useSequence } from "@/components/motion/hooks";
import { BrandGlyph } from "@/components/ui/BrandMark";

const COPY = {
  title: "Webhooks",
  subtitle: "Send events from your account to your own systems.",
  field: "Endpoint URL",
  events: "Events to send",
  button: "Send test event",
  toast: "Test event delivered · 200 OK · 36 ms",
  poweredBy: "Powered by",
};
/* 0 empty · 1 typing the URL · 2–3 picking events · 4 pressing the button · 5 delivered */
const BEATS = [700, 1500, 450, 450, 500, 3000] as const;

/** Your customer's view: the embeddable portal, styled as their own settings page. */
export function PortalPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { playing, reduced } = usePlayback(ref, 0.4);
  const [sequence] = useSequence(BEATS, playing);
  const step = reduced ? BEATS.length - 1 : sequence;
  const { portal, eventTypes } = site.samples;
  const host = new URL(portal.url).hostname.replace(/^hooks\./, "");

  return (
    <div ref={ref} aria-hidden="true" className="flex h-full flex-col">
      {/* Browser bar */}
      <div className="flex items-center gap-3 border-b border-black/[0.05] px-4 py-2.5">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-2.5 rounded-full bg-black/[0.08]" />
          ))}
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3 py-1 font-mono text-[11px] text-neutral-500">
          <Lock className="size-3" />
          {host}/settings/webhooks
        </span>
        <span className="w-[42px]" />
      </div>

      <div className="relative flex-1 p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[17px] font-semibold tracking-tight text-ink">{COPY.title}</p>
            <p className="mt-0.5 text-[12.5px] text-neutral-500">{COPY.subtitle}</p>
          </div>
          <span className="hidden shrink-0 items-center gap-1 text-[10.5px] font-medium text-neutral-400 sm:flex">
            {COPY.poweredBy}
            <BrandGlyph className="size-3 text-neutral-500" />
            {site.brand.name}
          </span>
        </div>

        <p className="mb-1.5 text-[11.5px] font-semibold text-neutral-500">{COPY.field}</p>
        <div className={cn("flex h-10 items-center rounded-xl px-3 ring-1 transition-shadow duration-300", step === 1 ? "ring-2 ring-accent/50" : "ring-black/10")}>
          <motion.span
            initial={false}
            animate={{ clipPath: step >= 1 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
            transition={step >= 1 ? { duration: 1.2, ease: "linear" } : { duration: 0 }}
            className="truncate font-mono text-[12.5px] text-ink"
          >
            {portal.url}
          </motion.span>
        </div>

        <p className="mb-1.5 mt-4 text-[11.5px] font-semibold text-neutral-500">{COPY.events}</p>
        <div className="flex flex-wrap gap-1.5">
          {eventTypes.map((type, index) => {
            const on = index < 2 && step >= 2 + index;
            return (
              <span
                key={type}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11.5px] transition-colors duration-300",
                  on ? "bg-accent text-white" : "bg-black/[0.04] text-neutral-500",
                )}
              >
                {on ? <Check className="size-3" strokeWidth={3} /> : null}
                {type}
              </span>
            );
          })}
        </div>

        <motion.span
          animate={{ scale: step === 4 ? 0.96 : 1 }}
          transition={{ duration: 0.2 }}
          className="mt-5 inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-[13px] font-semibold text-white"
        >
          <Send className="size-3.5" />
          {COPY.button}
        </motion.span>

        <AnimatePresence>
          {step >= 5 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-x-5 bottom-5 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_18px_40px_-16px_rgba(15,23,42,0.4)] ring-1 ring-black/[0.06] sm:inset-x-6"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              <span className="truncate text-[12.5px] font-semibold text-ink">{COPY.toast}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
