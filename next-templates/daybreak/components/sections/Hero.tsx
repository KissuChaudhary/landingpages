"use client";
import { useState } from "react";
import { ArrowRight, MousePointer2 } from "lucide-react";
import { site } from "@/site.config";
import { teams } from "@/data/teams";
import { asset, href } from "@/lib/urls";
import { StartButton, useExperience } from "../Experience";
import { Frame } from "../ui/Primitives";
export function Hero() {
  const [question, setQuestion] = useState<string>(site.hero.prompt);
  const { open } = useExperience();
  return (
    <Frame className="hero" id="home">
      <div className="hero-composition">
        <div className="hero-grid" aria-hidden="true" />
        <img
          className="hero-landscape"
          src={asset("/images/hero.webp")}
          alt="Sunlit coastal hillside, wildflowers and artist studios"
          width="1536"
          height="1024"
          fetchPriority="high"
        />
        <div className="hero-copy">
          <p className="eyebrow">{site.hero.label}</p>
          <h1>
            {site.hero.heading.map((line, i) => (
              <span
                key={line}
                className="hero-line"
                style={{ "--line": i } as React.CSSProperties}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-description">{site.hero.text}</p>
          <div className="hero-actions">
            <StartButton />
            <a className="button button-light" href={href("/contact")}>
              {site.hero.secondary}
            </a>
          </div>
        </div>
        <span className="collaborator collaborator-one" aria-hidden="true">
          <MousePointer2 size={22} fill="currentColor" />
          <i>{teams[0].person.split(" ")[0]}</i>
        </span>
        <span className="collaborator collaborator-two" aria-hidden="true">
          <MousePointer2 size={22} fill="currentColor" />
          <i>{teams[1].person.split(" ")[0]}</i>
        </span>
        <form
          className="hero-prompt"
          onSubmit={(e) => {
            e.preventDefault();
            if (question.trim())
              open({ type: "report", question: question.trim() });
          }}
        >
          <label htmlFor="hero-question">
            A good question is a good beginning.
          </label>
          <textarea
            id="hero-question"
            required
            maxLength={300}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
          />
          <div>
            <span>Try the example workspace</span>
            <button
              className="icon-button dark"
              type="submit"
              aria-label="Review your campaign question"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </Frame>
  );
}
