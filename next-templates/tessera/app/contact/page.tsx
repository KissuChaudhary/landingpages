import type { Metadata } from "next";
import { site } from "@/site.config";
import { Eyebrow, Title } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
export const metadata: Metadata = { title: "Start a conversation" };
export default function Contact() {
  return (
    <section className="contact-page section light">
      <div className="contact-intro">
        <Eyebrow>{site.contact.eyebrow}</Eyebrow>
        <Title as="h1" lines={site.contact.title} />
        <p>{site.contact.body}</p>
        <a className="contact-email" href={`mailto:${site.email}`}>
          {site.email} ↗
        </a>
        <span className="mono">{site.location}</span>
      </div>
      <div>
        <ContactForm />
        {!site.links.contactEndpoint && (
          <p className="contact-mode-note">{site.contact.note}</p>
        )}
      </div>
    </section>
  );
}
