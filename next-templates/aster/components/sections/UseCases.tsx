"use client";
import { useState, useRef } from "react";
import {
  Tags,
  Zap,
  Users,
  BarChart3,
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
    title: "Ticket triage",
    icon: Tags,
    heading: "Read the work. Find the right next step.",
    view: "triage",
    scene: "triage",
    features: [
      {
        icon: Tags,
        title: "Context at a glance",
        text: "Keep the topic, channel and current state together.",
      },
      {
        icon: Route,
        title: "A clear priority",
        text: "Find the questions that need a person's attention.",
      },
      {
        icon: CheckCircle2,
        title: "A useful place to begin",
        text: "Open the conversation before choosing the next step.",
      },
    ],
  },
  {
    title: "Suggested answers",
    icon: Zap,
    heading: "A useful draft. A clear source.",
    view: "inbox",
    scene: "answer",
    features: [
      {
        icon: BookOpen,
        title: "Your knowledge, nearby",
        text: "See the relevant article beside the draft.",
      },
      {
        icon: Zap,
        title: "A stronger starting point",
        text: "Begin with a suggested answer you can review and edit.",
      },
      {
        icon: CheckCircle2,
        title: "Keep the decision visible",
        text: "Resolve the local example when it is ready.",
      },
    ],
  },
  {
    title: "Human handoff",
    icon: Users,
    heading: "A person. With the whole picture.",
    view: "triage",
    scene: "handoff",
    features: [
      {
        icon: Users,
        title: "Choose an owner",
        text: "Give a complex question a clear destination.",
      },
      {
        icon: BookOpen,
        title: "Carry the context",
        text: "Keep the customer's question and source together.",
      },
      {
        icon: ArrowUpRight,
        title: "Explain the next step",
        text: "Add a short reason for the teammate picking it up.",
      },
    ],
  },
  {
    title: "Shared reporting",
    icon: BarChart3,
    heading: "The queue, in a clearer light.",
    view: "reporting",
    scene: "reporting",
    features: [
      {
        icon: BarChart3,
        title: "A shared picture",
        text: "Read resolved, waiting and handoff counts together.",
      },
      {
        icon: Tags,
        title: "Follow the useful detail",
        text: "Filter the queue by its channel, state or topic.",
      },
      {
        icon: ArrowUpRight,
        title: "Take the review with you",
        text: "Export the rows that match your current filters.",
      },
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
