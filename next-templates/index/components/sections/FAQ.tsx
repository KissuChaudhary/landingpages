import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { SectionBadge } from "@/components/ui/SectionBadge";
export function FAQ() {
  return (
    <section
      id="questions"
      className="faq container section"
      aria-labelledby="faq-heading"
    >
      <div>
        <SectionBadge>{site.faq.badge}</SectionBadge>
        <h2 id="faq-heading">{site.faq.heading}</h2>
        {site.links.email && (
          <a
            className="text-link faq-contact"
            href={`mailto:${site.links.email}`}
          >
            Ask us a question ↗
          </a>
        )}
      </div>
      <div className="faq__list">
        {site.faq.items.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <Plus size={20} aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
