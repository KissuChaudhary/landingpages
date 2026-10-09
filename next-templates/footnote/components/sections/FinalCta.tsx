"use client";

import { useState, type FormEvent } from "react";

import { TextMorph } from "@/components/hairline/text-morph";
import { SubmitButton } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Title";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

type Phase = "idle" | "sending" | "sent";

/** Replace with your sign-up endpoint or email provider, e.g. `await fetch("/api/trial", { method: "POST", body: email })`. */
async function startTrial(email: string) {
  void email;
  await new Promise((resolve) => setTimeout(resolve, 700));
}

const swap = (on: boolean) =>
  cn(
    "absolute transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
    on ? "opacity-100" : "scale-[0.6] opacity-0 blur-[3px]",
  );

/** Opens beside the label: a spinner while it sends, then a check that draws itself. */
function SubmitIcon({ phase }: { phase: Phase }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-4 shrink-0 place-items-center transition-[width,margin] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        phase === "idle" && "-mr-2 w-0",
      )}
    >
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
 * place and the button's label morphs (Text morph, from Hairline UI). Connect `startTrial` above to
 * your own sign-up endpoint or email provider before you launch.
 */
export function FinalCta() {
  const { cta } = siteConfig;
  const [phase, setPhase] = useState<Phase>("idle");
  const sent = phase === "sent";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase !== "idle") return;
    const value = String(new FormData(event.currentTarget).get("email") ?? "");
    setPhase("sending");
    try {
      await startTrial(value);
      setPhase("sent");
    } catch {
      setPhase("idle");
    }
  };

  return (
    <section id="start" className="scroll-mt-16 px-6 py-20 md:px-12 md:py-28">
      <div className="grid items-end gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <div>
          <h2 className="display text-balance text-[clamp(2.75rem,1.4rem+5vw,5rem)] leading-[1] text-text">
            <Heading title={cta.title} />
          </h2>
          <p className="text-pretty mt-6 max-w-[30rem] text-[1.0625rem] leading-[1.65] text-text-mid">{cta.description}</p>
        </div>

        <div>
          <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="cta-email" className="sr-only">
              {cta.emailLabel}
            </label>
            {/* The field and the confirmation share one place, so nothing jumps. */}
            <div className="grid min-w-0 flex-1 *:[grid-area:1/1]">
              <input
                id="cta-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={cta.emailPlaceholder}
                readOnly={phase !== "idle"}
                inert={sent}
                className={cn(
                  "h-11 min-w-0 rounded-lg border border-line-strong bg-transparent px-4 text-[15px] text-text outline-none transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-text-low focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 motion-reduce:transition-none",
                  sent && "pointer-events-none -translate-y-1 opacity-0 blur-[3px]",
                )}
              />
              <p role="status" className="self-center text-[15px] leading-snug text-text">
                {sent && (
                  <span className="block transition-[opacity,transform,filter] delay-150 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] starting:translate-y-1 starting:opacity-0 starting:blur-[3px] motion-reduce:transition-none">
                    You are on the list. Check your inbox.
                  </span>
                )}
              </p>
            </div>
            <SubmitButton aria-disabled={phase !== "idle" || undefined}>
              <SubmitIcon phase={phase} />
              <TextMorph>{phase === "sending" ? "Starting" : sent ? "Trial started" : cta.button}</TextMorph>
            </SubmitButton>
          </form>
          <p className="mt-4 text-[14px] text-text-low">{cta.note}</p>
        </div>
      </div>
    </section>
  );
}
