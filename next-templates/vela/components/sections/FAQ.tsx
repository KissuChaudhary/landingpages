import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { bookingHref } from "@/lib/urls";
import { Button, SectionHead } from "@/components/ui/Primitives";
export function FAQ() {
  return (
    <section className="faq section frame" id="faq">
      <div className="faq-intro">
        <SectionHead {...site.faq} align="left" />
        <Button href={bookingHref()} tone="outline">
          Let’s talk it through
        </Button>
      </div>
      <div className="faq-list reveal">
        {site.faq.items.map((item, index) => (
          <details key={item.q} name="vela-faq" open={index === 0}>
            <summary>
              {item.q}
              <Plus size={18} aria-hidden="true" />
            </summary>
            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
