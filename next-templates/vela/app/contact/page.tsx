import type { Metadata } from "next";
import { Check } from "lucide-react";
import { site } from "@/site.config";
import { ContactForm } from "@/components/ContactForm";
export const metadata: Metadata = { title: "Find your flow" };
export default function Contact() {
  return (
    <main id="main" className="contact-page frame">
      <div className="contact-intro">
        <span className="eyebrow">
          <i />A good conversation starts here
        </span>
        <h1>{site.contact.title}</h1>
        <p>{site.contact.text}</p>
        <div className="contact-expect">
          <h2>A little context. A clearer next step.</h2>
          <ul>
            <li>
              <Check size={14} />
              Talk about the way your team works
            </li>
            <li>
              <Check size={14} />
              Explore accounts, next steps and renewals
            </li>
            <li>
              <Check size={14} />
              Find a starting point that fits
            </li>
          </ul>
        </div>
        <div className="contact-note">
          <span className="status-dot" />
          {site.links.contactEndpoint || site.links.email
            ? "Your request stays with the right people."
            : "A working request builder for this preview."}
        </div>
      </div>
      <ContactForm />
    </main>
  );
}
