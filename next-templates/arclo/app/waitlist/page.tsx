import { Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Primitives";
import { BriefForm } from "@/components/BriefForm";
import { Mark } from "@/components/ui/Brand";
export const metadata = { title: "A new possibility" };
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
              What’s next
            </span>
            <h1>
              A little ahead
              <br />
              of the everyday.
            </h1>
            <p>Be part of a more thoughtful way to work.</p>
          </div>
          <BriefForm waitlist />
        </div>
      </Section>
    </main>
  );
}
