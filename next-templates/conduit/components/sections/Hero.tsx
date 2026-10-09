"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { site } from "@/site.config";
import { asset, href, route } from "@/lib/urls";
import { blueprints, type BlueprintKey } from "@/data/blueprints";
import { useSite } from "../SiteShell";
import { Button, Frame, Label } from "../ui/Primitives";
import { SampleLogo } from "../ui/Brand";
const keys: BlueprintKey[] = ["support", "leads", "review", "report"];
export function Hero() {
  const [active, setActive] = useState<BlueprintKey>("support");
  const [touched, setTouched] = useState(false);
  const { motion, open } = useSite();
  useEffect(() => {
    if (!motion || touched) return;
    const timer = setInterval(
      () => setActive((value) => keys[(keys.indexOf(value) + 1) % keys.length]),
      4500,
    );
    return () => clearInterval(timer);
  }, [motion, touched]);
  return (
    <>
      <Frame className="hero">
        <div className="hero-copy">
          <Label>{site.hero.badge}</Label>
          <h1>{site.hero.title}</h1>
          <p>{site.hero.description}</p>
          <div className="button-row">
            <Button variant="outline" href={route("/contact")}>
              {site.hero.secondary}
            </Button>
            <Button href={site.links.app || href("/#solution")}>
              {site.hero.primary}
            </Button>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-system">
            <img
              src={asset("/images/glass.webp")}
              alt="Original cobalt glass architecture, connecting across a luminous open space"
              fetchPriority="high"
              width={1536}
              height={1024}
            />
            <div className="data-grain" aria-hidden="true" />
            <div className="agent-picker">
              <div className="micro">Put an agent to work</div>
              <p className="agent-prompt" key={active}>
                {blueprints[active].prompt}
                <span className="typing-caret" aria-hidden="true" />
              </p>
              <div className="micro picker-label">Choose a starting point</div>
              <div
                className="agent-options"
                role="group"
                aria-label="Agent examples"
              >
                {keys.map((key) => (
                  <button
                    key={key}
                    aria-pressed={active === key}
                    onClick={() => {
                      setActive(key);
                      setTouched(true);
                    }}
                  >
                    <span className="agent-glyph">
                      <Sparkles size={14} />
                    </span>
                    <span>{blueprints[key].name}</span>
                    {active === key ? (
                      <Check size={15} className="selected-check" />
                    ) : (
                      <ArrowUpRight size={15} />
                    )}
                  </button>
                ))}
              </div>
              <button
                className="picker-inspect"
                onClick={() => open({ kind: "blueprint", key: active })}
              >
                Explore this blueprint
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
          <div className="hero-human">
            <img
              src={asset("/images/portrait.webp")}
              alt="An engineer considering the next step in a quiet, blue-lit workspace"
              width={1024}
              height={1536}
              fetchPriority="high"
            />
            <div className="data-grain" aria-hidden="true" />
            <p>
              Built around people.
              <br />
              Powered by possibility.
            </p>
          </div>
        </div>
      </Frame>
      <Frame className="logo-strip">
        <p className="logo-intro">A new connection for every kind of team.</p>
        <div className="logo-track">
          {["Aster", "Forma", "North", "Mono", "Arc"].map((name, i) => (
            <SampleLogo name={name} variant={i} key={name} />
          ))}
        </div>
        <span className="logo-caption">Illustrative team identities</span>
      </Frame>
    </>
  );
}
