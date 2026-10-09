"use client";
import { ArrowRight, Star } from "lucide-react";
import { Section, Button } from "../ui/Primitives";
import { AvatarStack } from "../ui/Portrait";
import { Workbench } from "../product/Workbench";
import { useExperience } from "../Experience";
import { site } from "@/site.config";
export function Hero() {
  const { openWorkspace } = useExperience();
  return (
    <Section className="hero-section">
      <div className="gradient-field hero">
        <div className="hero-copy">
          <a href="#features" className="announcement">
            <span>New</span>
            {site.hero.announcement}
            <ArrowRight size={14} />
          </a>
          <h1>
            {site.hero.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p>{site.hero.description}</p>
          <div className="hero-actions">
            <Button onClick={() => openWorkspace()}>{site.hero.primary}</Button>
            <Button secondary href="#features">
              {site.hero.secondary}
            </Button>
          </div>
          <div className="social-proof">
            <AvatarStack />
            <span>Built with controllers</span>
            <span className="proof-divider" />
            <span className="proof-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </span>
            <span>Ready for audit</span>
          </div>
        </div>
        <div className="hero-workspace">
          <Workbench />
        </div>
      </div>
    </Section>
  );
}
