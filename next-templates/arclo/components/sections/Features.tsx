import { Zap, ScrollText, Building2, History, Users } from "lucide-react";
import { Section, SectionHead, IconTile } from "../ui/Primitives";
import {
  AnalyticsScene,
  BuilderScene,
  FrameworkScene,
  IntegrationScene,
  ModuleScene,
  PromptScene,
} from "../product/FeatureScenes";
const features = [
  {
    title: "Reconciliation that keeps up.",
    text: "Bank, card and payout lines meet their ledger entries as they arrive, with rules you can read.",
    scene: BuilderScene,
  },
  {
    title: "Your ledger stays the ledger.",
    text: "Arclo sits beside your accounting system, banks, cards and payroll. Nothing to migrate.",
    scene: IntegrationScene,
  },
  {
    title: "A checklist that rolls forward.",
    text: "Recurring tasks, owners and due days carry into next month on their own.",
    scene: ModuleScene,
  },
  {
    title: "Know where the close stands.",
    text: "What’s reconciled, who’s holding what and how many days are left, on one page.",
    scene: AnalyticsScene,
  },
  {
    title: "Variance notes, drafted.",
    text: "Movements over your threshold arrive with a first draft of the explanation, ready for your edit.",
    scene: PromptScene,
  },
];
export function Features() {
  return (
    <Section id="features">
      <SectionHead
        label="The platform"
        icon={Zap}
        title="The whole close, in one place."
        description="Five tools that turn a month-end checklist into a finished, defensible close."
      />
      <div className="feature-grid">
        {features.map(({ scene: Scene, title, text }) => (
          <article key={title} className="surface feature-card reveal">
            <Scene />
            <div className="feature-copy">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
const differences = [
  {
    icon: ScrollText,
    title: "Rules you can read.",
    text: "Matching and routing written as plain sentences, not buried formulas.",
  },
  {
    icon: Building2,
    title: "Your chart, your entities.",
    text: "Mapped to the accounts you already use, across every entity you close.",
  },
  {
    icon: History,
    title: "A trail behind every entry.",
    text: "Who prepared it, who approved it and what changed, kept for the auditors.",
  },
  {
    icon: Users,
    title: "Close as a team.",
    text: "Assign tasks, leave review notes and hand off without a status meeting.",
  },
];
export function Difference() {
  return (
    <Section id="why-arclo">
      <SectionHead
        label="Why Arclo"
        title="Built the way a controller thinks."
        description="Calm defaults for work that has to be right the first time."
      />
      <div className="difference-grid">
        <div>
          {differences.slice(0, 2).map((item) => (
            <article
              className="surface difference-card reveal"
              key={item.title}
            >
              <IconTile icon={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <FrameworkScene />
        <div>
          {differences.slice(2).map((item) => (
            <article
              className="surface difference-card reveal"
              key={item.title}
            >
              <IconTile icon={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
