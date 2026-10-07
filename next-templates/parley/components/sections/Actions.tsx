import { Container, SectionTitle } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/** Title on the left, a log of what the agent did on the right. A list, not cards. */
export function Actions() {
  const { actions } = siteConfig;

  return (
    <section id="actions" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle label={actions.label} title={actions.title} description={actions.description} align="left" />
          <div className="mt-10">
            <p className="text-[14px] font-medium text-ink-low">{actions.integrationsLabel}</p>
            <ul className="mt-3 flex max-w-[26rem] flex-wrap gap-x-5 gap-y-1.5 text-[1rem] text-ink">
              {actions.integrations.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="relative">
          {/* The thread the entries hang from. */}
          <span aria-hidden className="absolute bottom-6 left-[5px] top-6 w-px bg-line-strong" />
          {actions.log.map((entry) => (
            <li key={entry.text} className="relative flex items-baseline gap-5 py-5 sm:gap-6">
              <span aria-hidden className="relative z-10 mt-[3px] size-[11px] shrink-0 rounded-full border-2 border-rose bg-paper" />
              <div className="flex min-w-0 flex-1 flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="display text-[1.5rem] leading-[1.25] text-ink sm:text-[1.75rem]">{entry.text}</p>
                <p className="shrink-0 text-[14px] text-ink-mid">
                  {entry.source}
                  <span className="mx-2 text-ink-low">/</span>
                  {entry.time}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
