"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import { TextMorph } from "@/components/hairline/text-morph";
import { SubmitButton } from "@/components/ui/Button";
import { Container, Heading } from "@/components/ui/Title";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

type Phase = "idle" | "sending" | "sent";

/** Replace with your own sign-up flow, e.g. `await fetch("/api/train", { method: "POST", body: url })`. */
async function startTraining(url: string) {
  void url;
  await new Promise((resolve) => setTimeout(resolve, 700));
}

const swap = (on: boolean) =>
  cn(
    "absolute transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
    on ? "opacity-100" : "scale-[0.6] opacity-0 blur-[3px]",
  );

/** The arrow, then a spinner while it sends, then a check that draws itself. */
function SubmitIcon({ phase }: { phase: Phase }) {
  return (
    <span aria-hidden className="relative grid size-4 shrink-0 place-items-center">
      <ArrowRight className={cn("size-4", swap(phase === "idle"))} strokeWidth={2.25} />
      <span className={cn("size-3.5 animate-spin rounded-full border-2 border-current/30 border-t-current motion-reduce:animate-none", swap(phase === "sending"))} />
      <svg viewBox="0 0 16 16" fill="none" className={cn("size-4", swap(phase === "sent"))}>
        <path
          d="M3.5 8.5 6.5 11.5 12.5 4.5"
          stroke="currentColor"
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          style={{ strokeDashoffset: phase === "sent" ? 0 : 1 }}
          className="transition-[stroke-dashoffset] delay-100 duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        />
      </svg>
    </span>
  );
}

/**
 * The closing call to action. The form is one surface: the field gives way to the confirmation in
 * place and the button's label morphs (Text morph, from Hairline UI). Connect `startTraining` above
 * to your own sign-up flow before you launch.
 */
export function FinalCta() {
  const { cta } = siteConfig;
  const [phase, setPhase] = useState<Phase>("idle");
  const sent = phase === "sent";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase !== "idle") return;
    const value = String(new FormData(event.currentTarget).get("url") ?? "");
    setPhase("sending");
    try {
      await startTraining(value);
      setPhase("sent");
    } catch {
      setPhase("idle");
    }
  };

  return (
    <section id="start" className="scroll-mt-20 px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate mx-auto max-w-[1360px] overflow-hidden rounded-[32px] bg-blush px-5 py-20 text-center sm:rounded-[44px] sm:py-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(50%_80%_at_50%_100%,rgba(255,250,248,0.9),transparent_75%)]"
        />

        <Container>
          <h2 className="display mx-auto max-w-[12em] text-balance text-[clamp(2.75rem,1.4rem+5vw,4.75rem)] leading-[1.02] text-ink">
            <Heading title={cta.title} />
          </h2>
          <p className="text-pretty mx-auto mt-6 max-w-[30rem] text-[1.0625rem] leading-[1.65] text-ink-mid">{cta.description}</p>

          <div className="mx-auto mt-10 max-w-[32rem]">
            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="cta-url" className="sr-only">
                {cta.inputLabel}
              </label>
              {/* The field and the confirmation share one place, so nothing jumps. */}
              <div className="grid min-w-0 flex-1 *:[grid-area:1/1]">
                <input
                  id="cta-url"
                  name="url"
                  type="text"
                  required
                  autoComplete="url"
                  placeholder={cta.inputPlaceholder}
                  readOnly={phase !== "idle"}
                  inert={sent}
                  className={cn(
                    "h-12 min-w-0 rounded-full border border-line-strong bg-paper px-6 text-[15px] text-ink outline-none transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-ink-low focus:border-rose focus-visible:ring-2 focus-visible:ring-rose/40 motion-reduce:transition-none",
                    sent && "pointer-events-none -translate-y-1 opacity-0 blur-[3px]",
                  )}
                />
                <p role="status" className="self-center px-2 text-[15px] font-medium leading-snug text-ink">
                {sent && (
                  <span className="block transition-[opacity,transform,filter] delay-150 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] starting:translate-y-1 starting:opacity-0 starting:blur-[3px] motion-reduce:transition-none">
                    Reading your help centre now. We will email you when Parley is ready.
                  </span>
                )}
              </p>
              </div>
              <SubmitButton icon={<SubmitIcon phase={phase} />} aria-disabled={phase !== "idle" || undefined}>
                <TextMorph>{phase === "sending" ? "Starting" : sent ? "On it" : cta.button}</TextMorph>
              </SubmitButton>
            </form>
            <p className="mt-4 text-[14px] text-ink-mid">{cta.note}</p>
          </div>
        </Container>
      </div>
    </section>
  );
}
