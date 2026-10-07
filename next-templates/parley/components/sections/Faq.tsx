import { Bubble } from "@/components/ui/Chat";
import { Container, SectionTitle } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/** The FAQ is a conversation: each question is a customer message, each answer is Parley's reply. */
export function Faq() {
  const { faq } = siteConfig;

  return (
    <section id="faq" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <SectionTitle label={faq.label} title={faq.title} description={faq.description} />

        <ul className="mx-auto mt-14 max-w-[44rem] space-y-9">
          {faq.items.map((item) => (
            <li key={item.question} className="space-y-3">
              <Bubble message={{ from: "customer", text: item.question }} />
              <Bubble message={{ from: "agent", text: item.answer }} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
