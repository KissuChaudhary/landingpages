import { site } from "@/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
export const metadata = { title: "Working together" };
export default function TermsPage() {
  return (
    <main id="main" className="container policy-page">
      <SectionHeading
        as="h1"
        label="Clear from the beginning"
        title="Working together."
      />
      <div className="policy-copy">
        <h2>A starting point</h2>
        <p>
          Service descriptions and prices provide a starting point for a
          conversation. Each engagement is scoped separately, with deliverables,
          timing, fees, payment terms and ownership agreed in writing before
          work begins.
        </p>
        <h2>Project enquiries</h2>
        <p>
          Sending an enquiry does not reserve a project slot or create an
          engagement. We'll discuss your needs and confirm availability before
          recommending a proposal.
        </p>
        <h2>Get in touch</h2>
        <p>
          For questions about a collaboration, contact{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </main>
  );
}
