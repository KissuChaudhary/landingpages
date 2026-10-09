import { Mail, MessagesSquare, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Primitives";
import { BriefForm } from "@/components/BriefForm";
import { AvatarStack } from "@/components/ui/Portrait";
import { site } from "@/site.config";
export const metadata = { title: "Book a walkthrough" };
export default function ContactPage() {
  return (
    <main id="main">
      <Section className="contact-section">
        <div className="contact-grid">
          <div className="contact-intro">
            <span className="eyebrow">
              <MessagesSquare size={14} />
              Book a walkthrough
            </span>
            <h1>
              Show us your close.
              <br />
              We’ll show you ours.
            </h1>
            <p>
              Thirty minutes with someone who has run a month end, built around
              your entities, your ledger and the step that takes longest.
            </p>
            <AvatarStack />
            <a className="contact-email" href={`mailto:${site.email}`}>
              <Mail size={17} />
              {site.email}
              <ArrowUpRight size={15} />
            </a>
            <span className="contact-footnote">
              No slides. Your numbers, your questions.
            </span>
          </div>
          <BriefForm />
        </div>
      </Section>
    </main>
  );
}
