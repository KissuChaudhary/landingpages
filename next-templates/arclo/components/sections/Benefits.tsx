import { Blocks, Cog, MousePointer2, BriefcaseBusiness } from "lucide-react";
import { Section, SectionHead, IconTile } from "../ui/Primitives";
const benefits = [
  {
    icon: Cog,
    title: "Build once. Breathe easier.",
    text: "Give repetitive tasks a reliable home. Your agents take it from there, every time.",
  },
  {
    icon: Blocks,
    title: "Your tools, working together.",
    text: "Keep the stack you love. Connect the dots between your people, data and apps.",
  },
  {
    icon: MousePointer2,
    title: "Big ideas. Zero code.",
    text: "Turn a spark into a working flow with clear instructions and a visual canvas.",
  },
];
export function Logos() {
  return (
    <Section className="logos">
      <p>Made for teams that move things forward</p>
      <div className="logo-row" aria-label="Illustrative customer brands">
        <span className="logo-field">▰ fieldwork</span>
        <span className="logo-oslo">offstage.</span>
        <span className="logo-vision">◉ Meridian</span>
        <span className="logo-monaco">▦ loomhouse</span>
        <span className="logo-delaware">◖ OFFSET</span>
        <span className="logo-california">DAYLIGHT</span>
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
        title="Let AI handle the everyday."
        description="A little more breathing room. A lot more room to grow."
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
