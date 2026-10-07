import { Plus } from "lucide-react";

import { Section, SceneHead } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

/**
 * Native <details> elements: keyboard accessible, no JavaScript, and they work with the browser's find-in-page.
 * Each question carries a mono number (Q01), like a numbered take. The first one is open so the section never
 * looks empty.
 */
export function Faq() {
  const { items, ...intro } = siteConfig.faq;

  return (
    <Section id="faq">
      <SceneHead {...intro} />

      <div className="border-t border-text">
        {items.map((item, i) => (
          <details key={item.question} open={i === 0} className="group border-b border-line-strong">
            <summary className="flex cursor-pointer list-none items-center gap-5 py-6 outline-none focus-visible:ring-2 focus-visible:ring-text md:gap-8 md:py-7 [&::-webkit-details-marker]:hidden">
              <span className="timecode w-9 shrink-0 text-text-low">Q{String(i + 1).padStart(2, "0")}</span>
              <span className="display min-w-0 flex-1 text-[1.25rem] leading-[1.2] text-text md:text-[1.75rem]">{item.question}</span>
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-text transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:border-flame group-open:bg-flame group-open:text-ink"
              >
                <Plus className="size-5" strokeWidth={2} />
              </span>
            </summary>
            <p className="text-pretty max-w-[44rem] pb-8 pl-14 text-[1.0625rem] leading-[1.65] text-text-mid md:pl-[4.25rem]">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
