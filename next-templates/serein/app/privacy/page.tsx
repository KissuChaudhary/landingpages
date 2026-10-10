import { site } from "@/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
export const metadata = { title: "Privacy" };
export default function PrivacyPage() {
  return (
    <main id="main" className="container policy-page">
      <SectionHeading
        as="h1"
        label="A little transparency"
        title="Privacy details."
      />
      <div className="policy-copy">
        <h2>Your enquiry</h2>
        <p>
          The contact form uses the information you enter to prepare a project
          enquiry. If you open an email draft, your email app handles sending
          it. If a submission service is configured, the form sends your details
          to that service.
        </p>
        <h2>Local preferences</h2>
        <p>
          Motion follows your device's reduced-motion setting. No separate
          motion preference is stored in your browser or sent to a server.
        </p>
        <h2>Questions</h2>
        <p>
          Contact <a href={`mailto:${site.email}`}>{site.email}</a> with any
          questions about your enquiry or information.
        </p>
      </div>
    </main>
  );
}
