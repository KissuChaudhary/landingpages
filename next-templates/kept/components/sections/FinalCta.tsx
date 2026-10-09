"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import { TextMorph } from "@/components/hairline/text-morph";
import { LimeButton } from "@/components/ui/Button";
import { Container, Heading } from "@/components/ui/Title";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

type Phase = "idle" | "sending" | "sent";

/** Replace with your own sign-up request, e.g. `await fetch("/api/signup", { method: "POST", body: email })`. */
async function signUp(email: string) {
  void email;
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
 * The closing call to action, on the one pine band of the page. The form is one surface: the field
 * gives way to the confirmation in place and the button's label morphs (Text morph, from Hairline UI).
 * Connect `signUp` above to your own sign-up flow before you launch.
 */
export function FinalCta() {
  const { cta } = siteConfig;
  const [phase, setPhase] = useState<Phase>("idle");
  const sent = phase === "sent";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase !== "idle") return;
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    setPhase("sending");
    try {
      await signUp(email);
      setPhase("sent");
    } catch {
      setPhase("idle");
    }
  };

  return (
    <section id="start" className="scroll-mt-20 bg-pine py-20 text-on-pine sm:py-28">
      <Container className="grid items-end gap-12 lg:grid-cols-[7fr_5fr] lg:gap-20">
        <div>
          <h2 className="display text-balance text-[clamp(3rem,1.4rem+6vw,6rem)] leading-[0.98] text-on-pine">
            <Heading title={cta.title} accentClassName="text-lime" />
          </h2>
          <p className="text-pretty mt-6 max-w-[30rem] text-[1.0625rem] leading-[1.65] text-on-pine-mid">{cta.description}</p>
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
                  "h-12 min-w-0 rounded-[10px] border border-white/25 bg-transparent px-4 text-[15px] text-on-pine outline-none transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-on-pine-mid focus:border-lime focus-visible:ring-2 focus-visible:ring-lime/40 motion-reduce:transition-none",
                  sent && "pointer-events-none -translate-y-1 opacity-0 blur-[3px]",
                )}
              />
              <p role="status" className="self-center text-[15px] font-medium leading-snug text-on-pine">
                {sent && (
                  <span className="block transition-[opacity,transform,filter] delay-150 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] starting:translate-y-1 starting:opacity-0 starting:blur-[3px] motion-reduce:transition-none">
                    Thank you. Check your inbox to start your first invoice.
                  </span>
                )}
              </p>
            </div>
            <LimeButton icon={<SubmitIcon phase={phase} />} aria-disabled={phase !== "idle" || undefined}>
              <TextMorph>{phase === "sending" ? "Starting" : sent ? "You’re in" : cta.button}</TextMorph>
            </LimeButton>
          </form>
          <p className="mt-4 text-[14px] text-on-pine-mid">{cta.note}</p>
        </div>
      </Container>
    </section>
  );
}
