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
          Your motion preference is saved in your browser's local storage. It is
          not sent to a server. You can change it using the motion control in
          the footer.
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
