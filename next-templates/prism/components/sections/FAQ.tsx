import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ() {
  return (
    <section
      className="section faq-section container"
      id="faq"
      aria-labelledby="faq-title"
    >
      <SectionHeading {...site.faq} id="faq-title" />
      <div className="faq-list">
        {site.faq.items.map((item) => (
          <details className="faq-item" key={item.question}>
            <summary>
              {item.question}
              <Plus size={18} aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
