import { Landmark, Stamp, FileSearch, BriefcaseBusiness } from "lucide-react";
import { Section, SectionHead, IconTile } from "../ui/Primitives";
const benefits = [
  {
    icon: Landmark,
    title: "Every line, matched as it lands.",
    text: "Bank and card feeds reconcile against the ledger through the month, not in a rush on day three.",
  },
  {
    icon: Stamp,
    title: "Approvals that chase themselves.",
    text: "Entries go to the right approver by amount and account, and the reminders stop the moment they sign.",
  },
  {
    icon: FileSearch,
    title: "Evidence behind every number.",
    text: "Each adjustment carries its source, its reason and its sign-off. Audit season becomes another week.",
  },
];
export function Logos() {
  return (
    <Section className="logos">
      <p>Closing the books at growing companies</p>
      <div className="logo-row" aria-label="Illustrative customer brands">
        <span className="logo-mark">▰ fieldwork</span>
        <span className="logo-serif">offstage.</span>
        <span className="logo-round">◉ Meridian</span>
        <span className="logo-mono">▦ loomhouse</span>
        <span className="logo-half">◖ OFFSET</span>
        <span className="logo-spaced">DAYLIGHT</span>
      </div>
    </Section>
  );
}
export function Benefits() {
  return (
    <Section id="benefits">
      <SectionHead
        label="Benefits"
        icon={BriefcaseBusiness}
        title="Spend the close on judgment."
        description="Arclo does the matching and the chasing. Your team does the thinking."
      />
      <div className="three-grid">
        {benefits.map((item) => (
          <article key={item.title} className="surface benefit-card reveal">
            <IconTile icon={item.icon} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
