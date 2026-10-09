"use client";
import { useState, useRef } from "react";
import {
  Tags,
  Zap,
  Users,
  BookOpen,
  Route,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { site } from "@/site.config";
import { SectionHead, Art, AppButton } from "../ui/Primitives";
import { Scene } from "../product/Scenes";

const cases = [
  {
    title: "Brand identities", icon: Tags, heading: "Find the direction. Refine the detail.", view: "reviews", scene: "feedback",
    features: [
      { icon: Tags, title: "A version to talk about", text: "Keep the wordmark, palette and format named in the review." },
      { icon: BookOpen, title: "An agreed direction", text: "Check the creative brief before refining the next detail." },
      { icon: CheckCircle2, title: "A clear sign-off", text: "Record the decision with the response you have reviewed." },
    ],
  },
  {
    title: "Website design", icon: Zap, heading: "Review the experience, one decision at a time.", view: "reviews", scene: "web",
    features: [
      { icon: BookOpen, title: "Purpose before preference", text: "Read the audience and page goals beside the client’s note." },
      { icon: Route, title: "A considered next pass", text: "Turn feedback on a flow into a specific design change." },
      { icon: CheckCircle2, title: "The version that matters", text: "Keep the project and version attached to the decision." },
    ],
  },
  {
    title: "Launch campaigns", icon: Users, heading: "One direction. Every format considered.", view: "board", scene: "campaign",
    features: [
      { icon: Tags, title: "Digital and print together", text: "Filter the launch reviews by format or discipline." },
      { icon: Users, title: "A named revision owner", text: "Give the next pass to the person making the change." },
      { icon: ArrowUpRight, title: "A useful production handover", text: "Export the feedback, response and complete project brief." },
    ],
  },
  {
    title: "Editorial work", icon: BookOpen, heading: "Keep the story intact through every round.", view: "briefs", scene: "editorial",
    features: [
      { icon: BookOpen, title: "A shared reference", text: "Keep the image sequence and reading direction in the brief." },
      { icon: Route, title: "Specific changes", text: "Give notes on spacing, captions and reading order a next step." },
      { icon: CheckCircle2, title: "A recorded conclusion", text: "Keep the approved version clear before production begins." },
    ],
  },
];
export function UseCases() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = cases[active];
  return (
    <section className="use-cases section container" id="use-cases">
      <SectionHead label={site.useCases.label} lines={site.useCases.heading} />
      <div className="use-case-shell">
        <div className="use-case-tabs" role="tablist" aria-label="Ways to work">
          {cases.map((c, i) => (
            <button
              key={c.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`case-tab-${i}`}
              role="tab"
              aria-selected={i === active}
              aria-controls="case-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                let next = active;
                if (event.key === "ArrowRight")
                  next = (active + 1) % cases.length;
                else if (event.key === "ArrowLeft")
                  next = (active + cases.length - 1) % cases.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = cases.length - 1;
                else return;
                event.preventDefault();
                setActive(next);
                refs.current[next]?.focus();
              }}
            >
              <c.icon size={18} />
              {c.title}
            </button>
          ))}
        </div>
        <div
          id="case-panel"
          role="tabpanel"
          aria-labelledby={`case-tab-${active}`}
          className="use-case-panel"
        >
          <div className="use-case-copy">
            <h3>{item.heading}</h3>
            <ul>
              {item.features.map((feature) => (
                <li key={feature.title}>
                  <feature.icon size={19} />
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <AppButton view={item.view}>Explore the workspace</AppButton>
          </div>
          <div className="use-case-visual" key={active}>
            <Art name={active === 2 ? "petal" : "grass"} />
            <Scene type={item.scene} />
          </div>
        </div>
      </div>
    </section>
  );
}
