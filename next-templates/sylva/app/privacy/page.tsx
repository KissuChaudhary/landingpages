import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/PageIntro";
import { site } from "@/site.config";
export const metadata: Metadata = { title: "Privacy" };
export default function PrivacyPage() {
  return (
    <main id="main" className="secondary-page">
      <PageIntro
        eyebrow="Your space. Your information."
        title="A little"
        accent="privacy."
        description="How this template handles your project brief and motion preference."
      />
      <article className="policy-copy wrap">
        <h2>Your project brief</h2>
        <p>
          {site.links.contactEndpoint
            ? "When you choose Send enquiry, the contact form sends your name, email, space details, plant interest, message and contact permission to the studio's configured enquiry service."
            : "Your form details stay in this page until you download your brief or choose to open your email app. The default template does not send enquiries, create accounts or store project details on a server."}
        </p>
        <h2>Your preferences</h2>
        <p>
          Motion follows your device's reduced-motion setting without storing
          a separate preference. The template includes no analytics or advertising trackers.
        </p>
        <h2>Before a studio publishes this page</h2>
        <p>
          The website owner should replace this notice with their own privacy
          information, including their identity, contact details, enquiry
          service, retention practices and any analytics they add.
        </p>
      </article>
    </main>
  );
}
