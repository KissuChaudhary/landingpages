import { Zap, LayoutGrid, Terminal, Code2, Users } from "lucide-react";
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
    title: "See the whole flow.",
    text: "A visual canvas for your triggers, logic and actions. Make the complex feel wonderfully simple.",
    scene: BuilderScene,
  },
  {
    title: "Bring your favorite tools.",
    text: "Email, documents, calendars and team channels. Keep everything moving in the same direction.",
    scene: IntegrationScene,
  },
  {
    title: "Skip the blank canvas.",
    text: "Start with thoughtful building blocks. A useful first workflow is closer than you think.",
    scene: ModuleScene,
  },
  {
    title: "Every step, in the open.",
    text: "Know what ran, what worked and what needs your attention. Clear signals, less guesswork.",
    scene: AnalyticsScene,
  },
  {
    title: "Just say what you need.",
    text: "Good instructions start with plain language. Give your agents an idea, then make it your own.",
    scene: PromptScene,
  },
];
export function Features() {
  return (
    <Section id="features">
      <SectionHead
        label="The platform"
        icon={Zap}
        title="Built for the way you work."
        description="Everything you need to turn a repeatable task into a little everyday magic."
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
    icon: LayoutGrid,
    title: "A framework that fits.",
    text: "Give every agent a role, the right context and a clear next step.",
  },
  {
    icon: Code2,
    title: "Room to make it yours.",
    text: "Extend the flow with your own instructions, logic and APIs.",
  },
  {
    icon: Terminal,
    title: "Clarity at every step.",
    text: "Follow each action from its source to the final prepared result.",
  },
  {
    icon: Users,
    title: "Better, together.",
    text: "Build with your team. Keep good ideas and shared context connected.",
  },
];
export function Difference() {
  return (
    <Section id="why-arclo">
      <SectionHead
        label="Why Arclo"
        title="More power. Less friction."
        description="A thoughtful foundation for the workflows you haven’t imagined yet."
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
