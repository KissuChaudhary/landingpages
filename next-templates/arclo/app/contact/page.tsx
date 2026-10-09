import { Mail, MessagesSquare, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Primitives";
import { BriefForm } from "@/components/BriefForm";
import { AvatarStack } from "@/components/ui/Portrait";
import { site } from "@/site.config";
export const metadata = { title: "Let’s talk" };
export default function ContactPage() {
  return (
    <main id="main">
      <Section className="contact-section">
        <div className="contact-grid">
          <div className="contact-intro">
            <span className="eyebrow">
              <MessagesSquare size={14} />
              Let’s talk
            </span>
            <h1>
              Big ideas start
              <br />
              with a little hello.
            </h1>
            <p>
              A question, a possibility, a workflow you can’t stop thinking
              about. We’d love to hear it.
            </p>
            <AvatarStack />
            <a className="contact-email" href={`mailto:${site.email}`}>
              <Mail size={17} />
              {site.email}
              <ArrowUpRight size={15} />
            </a>
            <span className="contact-footnote">
              Thoughtful people. Useful conversations.
            </span>
          </div>
          <BriefForm />
        </div>
      </Section>
    </main>
  );
}
