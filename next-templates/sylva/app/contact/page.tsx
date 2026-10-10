import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/PageIntro";
import { EnquiryForm } from "@/components/pages/EnquiryForm";
import { asset } from "@/lib/urls";
import { site } from "@/site.config";
export const metadata: Metadata = { title: "Let's talk plants" };
export default function ContactPage() {
  return (
    <main id="main" className="secondary-page">
      <PageIntro
        eyebrow="A new leaf starts here"
        title="Let's talk"
        accent="about your space."
        description="A single corner or a whole new chapter. Tell us what you have in mind and start with a thoughtful project brief."
      />
      <div className="contact-layout wrap">
        <aside>
          <div className="contact-photo">
            <img
              src={asset("/images/interior.webp")}
              alt="A calm, sunlit room with considered indoor greenery"
            />
          </div>
          <h2>
            Good things
            <br />
            <em>take root.</em>
          </h2>
          <p>
            Considered plants. Natural textures.
            <br />A space that feels like you.
          </p>
          {site.links.email && (
            <a href={`mailto:${site.links.email}`}>{site.links.email} ↗</a>
          )}
        </aside>
        <EnquiryForm />
      </div>
    </main>
  );
}
