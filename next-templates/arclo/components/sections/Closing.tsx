"use client";
import { Star } from "lucide-react";
import { Section, Button } from "../ui/Primitives";
import { AvatarStack } from "../ui/Portrait";
import { useExperience } from "../Experience";
import { site } from "@/site.config";
export function Closing() {
  const { openWorkspace } = useExperience();
  return (
    <Section className="closing-section">
      <div className="gradient-field closing reveal">
        <h2>
          {site.footer.closing.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p>{site.footer.description}</p>
        <div className="social-proof">
          <AvatarStack />
          <span>Built with controllers</span>
          <span className="proof-stars" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </span>
          <span>Ready for audit</span>
        </div>
        <Button onClick={() => openWorkspace()}>
          Run a sample close
        </Button>
      </div>
    </Section>
  );
}
