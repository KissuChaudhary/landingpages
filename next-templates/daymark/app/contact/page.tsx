import type { Metadata } from "next";
import { site } from "@/site.config";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Brand";
export const metadata: Metadata = { title: "Let's talk" };
export default function ContactPage() {
  return (
    <section className="contact-page wrap">
      <div className="contact-intro">
        <p className="eyebrow">
          <span />
          Good things start here
        </p>
        <h1>
          Your ambition.
          <br />
          Our next
          <br />
          conversation.
        </h1>
        <p>
          Tell us what you are building and what you want to change. We will
          find a considered place to start.
        </p>
        <div className="contact-method">
          <span>Prefer a simple hello?</span>
          <a href={"mailto:" + site.email}>{site.email}</a>
          {site.links.booking && (
            <div>
              <Button to={site.links.booking}>Book a conversation</Button>
            </div>
          )}
        </div>
        <div className="contact-note">
          <Mark />
          <span>
            {site.location}
            <br />
            {site.availability}
          </span>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
