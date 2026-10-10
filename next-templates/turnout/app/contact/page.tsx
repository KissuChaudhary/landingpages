import type { Metadata } from "next";
import { site } from "@/site.config";
import { ContactForm } from "@/components/pages/ContactForm";
import { Action } from "@/components/ui/Action";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you're launching and where. We reply within two working days with a first idea and a rough budget.",
};

export default function ContactPage() {
  const { links, closing } = site;
  return (
    <section className="container contact">
      <div className="contact-intro">
        <span className="tag" data-reveal>
          Contact
        </span>
        <h1 className="h1" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          {closing.title}
        </h1>
        <p className="lead" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          {closing.body}
        </p>
        <dl className="contact-details" data-reveal style={{ "--d": "220ms" } as React.CSSProperties}>
          <div>
            <dt className="label">Email</dt>
            <dd>
              <a className="text-link" href={`mailto:${links.email}`}>
                {links.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="label">Phone</dt>
            <dd>
              <a className="text-link" href={`tel:${links.phone.replace(/[^\d+]/g, "")}`}>
                {links.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="label">Studio</dt>
            <dd>
              {links.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </dd>
          </div>
        </dl>
        {links.booking ? <Action to={links.booking} label="Book a call instead" tone="lime" /> : null}
      </div>
      <div className="contact-card" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
        <ContactForm />
      </div>
    </section>
  );
}
