import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { route } from "@/lib/urls";
import { Button, Frame, SectionHead } from "../ui/Primitives";
export function FAQ() {
  return (
    <Frame className="section faq" id="faq">
      <div>
        <SectionHead label={site.faq.label} title={site.faq.title} />
        <p className="faq-intro">{site.faq.intro}</p>
        <Button href={route("/contact")} variant="outline">
          Talk to us
        </Button>
      </div>
      <div className="faq-list">
        {site.faq.items.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <Plus size={19} aria-hidden="true" />
            </summary>
            <div>
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </Frame>
  );
}
