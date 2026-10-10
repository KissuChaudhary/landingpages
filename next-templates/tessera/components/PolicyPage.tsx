import { site } from "@/site.config";
import { Eyebrow, Title } from "./ui";
export function PolicyPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  return (
    <article className="policy-page section light">
      <Eyebrow>LEGAL / STARTER COPY</Eyebrow>
      <Title as="h1" lines={[privacy ? "Privacy notice" : "Terms of use"]} />
      <p className="policy-placeholder">
        This is editable starter copy for the fictional studio. Replace it with
        a policy that describes your actual business, services and integrations
        before launch.
      </p>
      <div className="note-prose">
        <section className="prose-section">
          <h2>
            {privacy ? "Information you choose to share" : "About this website"}
          </h2>
          <p>
            {privacy
              ? "The inquiry form asks for your name, email, company, engagement preference and project message. Without a configured form service, it prepares an email draft on your device; you choose whether to send it. With a form service configured, the form sends those details to that service."
              : "This website introduces the studio’s services. System studies, prices and offers are illustrative and do not form a binding proposal. The scope, fees, delivery and responsibilities of any engagement are agreed separately."}
          </p>
        </section>
        <section className="prose-section">
          <h2>
            {privacy ? "Services and local behavior" : "Intellectual property"}
          </h2>
          <p>
            {privacy
              ? "The starter does not include analytics, advertising scripts, cookies or local-storage tracking. Fonts are served locally. Your email application or a configured form service may process information under its own terms. Describe any services you add, their purpose, retention and data handling here."
              : "The site owner’s content and applicable third-party materials retain their respective rights. The source project’s commercial license and the bundled fonts’ licenses are provided separately. Replace this text with your business’s applicable intellectual property terms."}
          </p>
        </section>
        <section className="prose-section">
          <h2>Questions and contact</h2>
          <p>
            Contact <a href={`mailto:${site.email}`}>{site.email}</a> with
            questions. Add the legal business name, jurisdiction, address and
            any required rights or notices before using this policy.
          </p>
        </section>
      </div>
    </article>
  );
}
