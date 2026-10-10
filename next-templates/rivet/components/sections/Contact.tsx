import { site } from "@/site.config";
import { Label, Action } from "../ui/Action";
import { InquiryForm } from "../InquiryForm";
export function Contact({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      className={`contact section-wrap ${standalone ? "contact-standalone" : ""}`}
      id="inquiry"
    >
      <div className="contact-intro">
        <Label>New beginnings</Label>
        {standalone ? (
          <h1>
            Tell us what
            <br />
            comes next.
          </h1>
        ) : (
          <h2 data-reveal>
            Every good thing
            <br />
            starts somewhere.
          </h2>
        )}
        <p>
          You don’t need a perfect brief. Just a little context, an open
          question, and a sense of what you’d like to make.
        </p>
        <span className="contact-availability label-type">
          <span />
          {site.availability}
        </span>
        {site.links.booking && (
          <Action href={site.links.booking} quiet>
            Prefer a conversation?
          </Action>
        )}
        <span className="label-type contact-location">{site.location}</span>
      </div>
      <InquiryForm />
    </section>
  );
}
