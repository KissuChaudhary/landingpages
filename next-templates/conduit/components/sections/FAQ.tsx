import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { route } from "@/lib/urls";
import { Button, Frame, SectionHead } from "../ui/Primitives";
export function FAQ() {
  const half = Math.ceil(site.faq.items.length / 2);
  const columns = [site.faq.items.slice(0, half), site.faq.items.slice(half)];
  return (
    <Frame className="section faq" id="faq">
      <div className="faq-head">
        <SectionHead label={site.faq.label} title={site.faq.title} />
        <div className="faq-aside">
          <p>{site.faq.intro}</p>
          <Button href={route("/contact")} variant="outline">
            Talk to us
          </Button>
        </div>
      </div>
      <div className="faq-cols">
        {columns.map((items, c) => (
          <div className="faq-list" key={c}>
            {items.map((item, i) => (
              <details key={item.question}>
                <summary>
                  <span className="mono">{String(c * half + i + 1).padStart(2, "0")}</span>
                  {item.question}
                  <Plus size={17} aria-hidden="true" />
                </summary>
                <div>
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}
