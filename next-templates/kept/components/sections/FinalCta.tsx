"use client";

import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";

import { LimeButton } from "@/components/ui/Button";
import { Container, Heading } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/**
 * The closing call to action, on the one pine band of the page. The form only shows a confirmation:
 * connect `onSubmit` to your own sign-up flow before you launch.
 */
export function FinalCta() {
  const { cta } = siteConfig;
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
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
          {sent ? (
            <p role="status" className="flex items-center gap-3 text-[1.0625rem] font-medium text-on-pine">
              <Check className="size-5 text-lime" strokeWidth={2.5} />
              Thank you. Check your inbox to start your first invoice.
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
                className="h-12 min-w-0 flex-1 rounded-[10px] border border-white/25 bg-transparent px-4 text-[15px] text-on-pine outline-none placeholder:text-on-pine-mid focus:border-lime focus-visible:ring-2 focus-visible:ring-lime/40"
              />
              <LimeButton>{cta.button}</LimeButton>
            </form>
          )}
          <p className="mt-4 text-[14px] text-on-pine-mid">{cta.note}</p>
        </div>
      </Container>
    </section>
  );
}
