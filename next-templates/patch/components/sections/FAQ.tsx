import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { GridIntersections } from "@/components/ui/Grid";
export function FAQ() {
  const content = site.faq;
  return (
    <section
      id="questions"
      className="grid-section faq-section"
      aria-label="Before you begin"
    >
      <GridIntersections />
      <div className="faq-heading">
        <SectionBadge label={content.badge} />
        <h2>
          {content.title}
          <br />
          <span className="subtle-heading">{content.emphasis}</span>
        </h2>
        <a className="text-link" href={`mailto:${site.links.email}`}>
          {site.footer.contact} ↗
        </a>
      </div>
      <div className="faq-list">
        {content.items.map((item) => (
          <details key={item.question}>
            <summary>
              <span>{item.question}</span>
              <Plus size={17} />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
