import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { SectionHead } from "../ui/Primitives";
export function FAQ() {
  return (
    <section className="faq section container" id="faq">
      <SectionHead label={site.faq.label} lines={site.faq.heading} center />
      <div className="faq-list">
        {site.faq.items.map((item) => (
          <details key={item.q}>
            <summary>
              {item.q}
              <Plus size={20} />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
