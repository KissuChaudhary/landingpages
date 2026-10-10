import { site } from "@/site.config";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { FaqAccordion } from "@/components/hairline/faq-accordion";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "lucide-react";

export function Faq() {
  return (
    <section
      id="faq"
      className="faq section container"
      aria-labelledby="faq-title"
    >
      <div className="faq-intro">
        <SectionIntro
          id="faq-title"
          eyebrow="GOOD QUESTIONS"
          title={site.faq.title}
        />
        <a className="text-link" href={`mailto:${site.contact}`}>
          Let's have a conversation
          <ArrowUpRight size={16} />
        </a>
      </div>
      <Reveal>
        <FaqAccordion
          items={site.faq.items}
          defaultOpen={[0]}
          className="[&_button]:text-[16px] [&_button]:py-6"
        />
      </Reveal>
    </section>
  );
}
