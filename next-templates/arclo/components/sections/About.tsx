import { Sparkles, Scale, ShieldCheck, Clock3, Users } from "lucide-react";
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
            have closed the books.
          </h2>
          <p>
            We’ve sat through the late nights at month end, the tie-outs that
            wouldn’t tie and the audit requests that arrived on a Friday. Arclo
            is the tool we wanted then.
          </p>
          <p>
            It keeps the routine work moving on its own, so finance teams can
            spend the close on the decisions that actually need them.
          </p>
          <Button secondary href={route("/contact")}>
            Talk to the team
          </Button>
        </div>
        <div className="surface team-photo reveal">
          <img
            src={asset("/images/team.webp")}
            alt="An illustrative finance team talking through the month around a table"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <span>The best closes start with a short conversation.</span>
        </div>
      </div>
      <div className="about-values">
        {[
          { icon: Scale, number: "Balanced", label: "to the cent" },
          { icon: ShieldCheck, number: "Traceable", label: "line by line" },
          { icon: Clock3, number: "On time", label: "every month" },
          { icon: Users, number: "Shared", label: "across the team" },
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
