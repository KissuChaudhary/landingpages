import type { Metadata } from "next";
import { site } from "@/site.config";
import { Label, Action } from "@/components/ui/Action";
export const metadata: Metadata = { title: "Privacy information" };
/** Replace this holding page with your business's reviewed privacy notice. */
export default function PrivacyPage() {
  return (
    <main id="main">
      <section className="page-header section-wrap">
        <Label>{site.brand} / Information</Label>
        <h1>
          Privacy
          <br />
          <span>information.</span>
        </h1>
      </section>
      <div className="article-body">
        <h2>Your information matters.</h2>
        <p>
          This space is reserved for the studio’s privacy notice. For
          information about an inquiry, or questions about your personal data,
          please contact the studio.
        </p>
        <p>
          A project brief prepared without submitting an inquiry stays on your
          device. The motion control remembers your display preference in this
          browser.
        </p>
        <Action href="/contact" quiet>
          Contact the studio
        </Action>
      </div>
    </main>
  );
}
