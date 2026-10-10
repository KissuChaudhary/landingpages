import type { Metadata } from "next";
import { site } from "@/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { Arrow } from "@/components/ui/Arrow";
export const metadata: Metadata = {
  title: "Start a conversation",
  description:
    "Tell us what you have in mind. A first conversation is a good place to start.",
};
export default function ContactPage() {
  return (
    <main id="main" className="container contact-page">
      <div className="contact-intro">
        <SectionHeading
          as="h1"
          label="An open invitation"
          title={"What's on\nyour mind?"}
        />
        <p>
          An idea, a question, a next chapter. Tell us a little about your
          ambition and let's see what we could make together.
        </p>
        <a className="text-link" href={`mailto:${site.email}`}>
          {site.email}
          <Arrow />
        </a>
        <div className="contact-availability">
          <span className="status-dot" />
          {site.availability}
        </div>
        {site.links.booking && (
          <a className="text-link" href={site.links.booking}>
            Book a conversation
            <Arrow />
          </a>
        )}
      </div>
      <ContactForm />
    </main>
  );
}
