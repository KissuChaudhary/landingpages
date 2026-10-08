import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { GridSection } from "@/components/ui/GridSection";
export function FAQ() {
  return (
    <GridSection
      className="faq-section"
      innerClassName="faq-layout"
      id="questions"
      aria-labelledby="faq-title"
    >
      <h2 id="faq-title">{site.faq.title}</h2>
      <div>
        {site.faq.items.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <Plus size={20} />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </GridSection>
  );
}
