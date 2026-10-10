import type { Metadata } from "next";
import { site } from "@/site.config";
export const metadata: Metadata = { title: "Terms" };
export default function TermsPage() {
  return (
    <article className="article policy">
      <p className="eyebrow">A clear starting point</p>
      <h1>Website terms.</h1>
      <p>
        This website introduces {site.brand} and its approach to growth,
        creative and customer retention.
      </p>
      <h2>Campaign concepts</h2>
      <p>
        Projects labelled as campaign concepts illustrate a creative approach.
        They are fictional examples, rather than claims of client engagements or
        commercial outcomes.
      </p>
      <h2>Working together</h2>
      <p>
        Website descriptions and indicative fees are an introduction to possible
        engagements. Scope, deliverables, fees, responsibilities and timing are
        agreed in a separate proposal before work begins. An enquiry does not
        create a service agreement.
      </p>
      <h2>Content and enquiries</h2>
      <p>
        Website content is provided for general information. To discuss a
        project, permissions or the use of studio material, contact{" "}
        <a href={"mailto:" + site.email}>{site.email}</a>.
      </p>
    </article>
  );
}
