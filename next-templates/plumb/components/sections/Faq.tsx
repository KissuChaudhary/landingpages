import { site } from "@/site.config";
import { mailto } from "@/lib/links";
import { FaqAccordion } from "@/components/hairline/faq-accordion";
import { Tag } from "@/components/ui/Primitives";

/*
 * QUESTIONS: a sticky intro beside the Hairline UI FAQ accordion. Answers open to their
 * real height, one at a time; arrow keys move between questions.
 */

export function Faq() {
  const { faq } = site;
  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-head">
          <Tag>{faq.tag}</Tag>
          <h2 id="faq-title" className="h2" data-reveal>
            {faq.title}
          </h2>
          <p className="faq-ask" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {faq.body}{" "}
            <a className="text-link" href={mailto(`A question about ${site.brand.name}`)}>
              {faq.action}
            </a>
          </p>
        </div>
        <div className="faq-list" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <FaqAccordion items={faq.items} defaultOpen={[0]} />
        </div>
      </div>
    </section>
  );
}
