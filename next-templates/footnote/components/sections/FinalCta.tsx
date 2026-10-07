"use client";

import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";

import { SubmitButton } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/**
 * The closing call to action. The form only shows a confirmation: connect `onSubmit` to your own
 * sign-up endpoint or email provider before you launch.
 */
export function FinalCta() {
  const { cta } = siteConfig;
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
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
          {sent ? (
            <p role="status" className="flex items-center gap-3 text-[1.0625rem] text-text">
              <Check className="size-5 text-good" strokeWidth={2.25} />
              You are on the list. Check your inbox.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="cta-email" className="sr-only">
                {cta.emailLabel}
              </label>
              <input
                id="cta-email"
                type="email"
                required
                autoComplete="email"
                placeholder={cta.emailPlaceholder}
                className="h-11 min-w-0 flex-1 rounded-lg border border-line-strong bg-transparent px-4 text-[15px] text-text outline-none placeholder:text-text-low focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
              />
              <SubmitButton>{cta.button}</SubmitButton>
            </form>
          )}
          <p className="mt-4 text-[14px] text-text-low">{cta.note}</p>
        </div>
      </div>
    </section>
  );
}
