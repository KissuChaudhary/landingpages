import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { Frame, SectionHead } from "../ui/Primitives";
export function FAQ() {
  return (
    <Frame className="faq-section">
      <div className="section-inner faq-layout">
        <SectionHead
          label="A little more context"
          title="Before your first day."
          text="A few useful things to know."
          align="left"
        />
        <div>
          {site.faq.map((f) => (
            <details key={f.question}>
              <summary>
                {f.question}
                <Plus size={17} />
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Frame>
  );
}
