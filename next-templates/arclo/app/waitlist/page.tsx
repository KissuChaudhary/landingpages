import { Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Primitives";
import { BriefForm } from "@/components/BriefForm";
import { Mark } from "@/components/ui/Brand";
export const metadata = { title: "Early access" };
export default function WaitlistPage() {
  return (
    <main id="main">
      <Section className="waitlist-section">
        <div className="waitlist-grid">
          <div className="gradient-field waitlist-visual">
            <div className="waitlist-orbit" />
            <Mark />
            <span className="eyebrow">
              <Sparkles size={14} />
              Early access
            </span>
            <h1>
              Multi-entity close,
              <br />
              a little early.
            </h1>
            <p>Intercompany matching and group reporting, for the first few groups.</p>
          </div>
          <BriefForm waitlist />
        </div>
      </Section>
    </main>
  );
}
