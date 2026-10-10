import type { Metadata } from "next";
import { site } from "@/site.config";
export const metadata: Metadata = { title: "Privacy" };
export default function PrivacyPage() {
  return (
    <article className="article policy">
      <p className="eyebrow">Your information</p>
      <h1>Privacy.</h1>
      <p>
        When you contact {site.brand}, we use the information you share to
        understand your enquiry and discuss the work with you.
      </p>
      <h2>Project enquiries</h2>
      <p>
        The contact form keeps your details in the current page while you
        prepare your brief. An email draft opens in your chosen email
        application; downloading a brief saves a text file on your device. If
        direct submission is configured, your brief is sent to the studio's
        enquiry service.
      </p>
      <h2>Browser preferences</h2>
      <p>
        This website respects your device's reduced-motion setting without
        storing a separate motion preference. No advertising analytics
        or tracking cookies are included in this website.
      </p>
      <h2>Questions and requests</h2>
      <p>
        For questions about information shared with the studio, or to request a
        correction or removal, contact{" "}
        <a href={"mailto:" + site.email}>{site.email}</a>.
      </p>
    </article>
  );
}
