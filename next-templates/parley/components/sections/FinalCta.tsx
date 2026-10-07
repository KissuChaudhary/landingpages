"use client";

import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";

import { SubmitButton } from "@/components/ui/Button";
import { Container, Heading } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/**
 * The closing call to action. The form only shows a confirmation: connect `onSubmit` to your own
 * sign-up flow before you launch.
 */
export function FinalCta() {
  const { cta } = siteConfig;
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
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
            {sent ? (
              <p role="status" className="flex items-center justify-center gap-3 text-[1.0625rem] font-medium text-ink">
                <Check className="size-5 text-good" strokeWidth={2.5} />
                Parley is reading your help centre. We will email you when it is ready.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="cta-url" className="sr-only">
                  {cta.inputLabel}
                </label>
                <input
                  id="cta-url"
                  type="text"
                  required
                  autoComplete="url"
                  placeholder={cta.inputPlaceholder}
                  className="h-12 min-w-0 flex-1 rounded-full border border-line-strong bg-paper px-6 text-[15px] text-ink outline-none placeholder:text-ink-low focus:border-rose focus-visible:ring-2 focus-visible:ring-rose/40"
                />
                <SubmitButton>{cta.button}</SubmitButton>
              </form>
            )}
            <p className="mt-4 text-[14px] text-ink-mid">{cta.note}</p>
          </div>
        </Container>
      </div>
    </section>
  );
}
