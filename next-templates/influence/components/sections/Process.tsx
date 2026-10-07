import { Check } from "lucide-react";

import { Container, SectionTitle } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/**
 * The one dark band. Four steps hang from a single line: a node, when it happens, what it is. Under it,
 * what every video includes, as a row of small tags.
 */
export function Process() {
  const { process } = siteConfig;

  return (
    <section id="process" className="scroll-mt-20 bg-night py-20 text-on-night sm:py-28">
      <Container>
        <SectionTitle label={process.label} title={process.title} description={process.description} dark />

        <ol className="relative mt-16 ml-1 border-l border-white/15 lg:ml-0 lg:grid lg:grid-cols-4 lg:gap-8 lg:border-l-0">
          {process.steps.map((step, index) => (
            <li key={step.title} className="relative pb-12 pl-9 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-12">
              {index < process.steps.length - 1 ? (
                <span aria-hidden className="absolute left-0 right-[-2rem] top-[7px] hidden h-px bg-white/15 lg:block" />
              ) : null}
              <span
                aria-hidden
                className="absolute -left-[7px] top-[5px] size-[15px] rounded-full border-[3px] border-night bg-orange outline outline-1 outline-orange/50 lg:left-0 lg:top-0"
              />
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-orange">{step.when}</p>
              <h3 className="display mt-3 text-[1.625rem] leading-[1.1] text-on-night">{step.title}</h3>
              <p className="text-pretty mt-3 max-w-[20rem] text-[15px] leading-[1.65] text-on-night-mid">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 flex flex-col items-center gap-5 border-t border-white/10 pt-10">
          <p className="text-[14px] font-medium text-on-night-mid">{process.includedLabel}</p>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {process.included.map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-full border border-white/15 py-2 pl-3 pr-4 text-[14px] font-medium text-on-night">
                <Check className="size-4 text-orange" strokeWidth={2.75} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
