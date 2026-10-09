import { Sparkles, Workflow, Blocks, Heart, Users } from "lucide-react";
import { asset, route } from "@/lib/urls";
import { Section, Button } from "../ui/Primitives";
export function About() {
  return (
    <Section id="about" className="about-section">
      <div className="about-grid">
        <div className="about-copy reveal">
          <span className="eyebrow">
            <Sparkles size={14} />
            About us
          </span>
          <h2>
            Built by people who
            <br />
            care about good work.
          </h2>
          <p>
            We’re builders, designers and perpetual problem solvers. We believe
            your best work needs space to happen — and the everyday shouldn’t
            get in the way.
          </p>
          <p>
            Arclo brings the moving pieces together, so teams can spend less
            time keeping up and more time making something that matters.
          </p>
          <Button secondary href={route("/contact")}>
            Meet your next possibility
          </Button>
        </div>
        <div className="surface team-photo reveal">
          <img
            src={asset("/images/team.webp")}
            alt="An illustrative product team sharing ideas around a studio table"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <span>Good ideas start with a conversation.</span>
        </div>
      </div>
      <div className="about-values">
        {[
          { icon: Workflow, number: "Connected", label: "by design" },
          { icon: Blocks, number: "Flexible", label: "by nature" },
          { icon: Heart, number: "Thoughtful", label: "in every detail" },
          { icon: Users, number: "Together", label: "from the start" },
        ].map(({ icon: Icon, number, label }) => (
          <div key={number}>
            <Icon size={25} />
            <strong>{number}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
