"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Heading } from "../ui/Heading";
import { Button, TextLink } from "../ui/Button";
import { Arrow } from "../ui/Arrow";
export function Approach() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const item = site.services[active];
  const key = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % site.services.length;
    else if (event.key === "ArrowLeft")
      next = (index + site.services.length - 1) % site.services.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = site.services.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };
  return (
    <section className="approach section wrap" id="approach">
      <Heading {...site.approach} />
      <div
        className="challenge-tabs"
        role="tablist"
        aria-label="Choose your growth challenge"
      >
        {site.services.map((service, index) => (
          <button
            key={service.id}
            type="button"
            ref={(element) => {
              buttons.current[index] = element;
            }}
            id={"challenge-" + service.id}
            role="tab"
            aria-selected={active === index}
            aria-controls="challenge-panel"
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => key(event, index)}
          >
            <span className="tab-number">0{index + 1}</span>
            <span>{service.question}</span>
            <Arrow diagonal />
          </button>
        ))}
      </div>
      <div
        className={"service-panel tone-" + item.color}
        role="tabpanel"
        id="challenge-panel"
        aria-labelledby={"challenge-" + item.id}
        tabIndex={0}
      >
        <div className="service-copy panel-enter" key={item.id}>
          <p className="eyebrow">{item.name}</p>
          <h3>{item.headline}</h3>
          <p>{item.description}</p>
          <ul>
            {item.outputs.map((output) => (
              <li key={output}>
                <span aria-hidden="true">↗</span>
                {output}
              </li>
            ))}
          </ul>
          <TextLink to={"/contact?service=" + encodeURIComponent(item.name)}>
            Start here
          </TextLink>
        </div>
        <div className="service-visual">
          <img
            key={item.image}
            className="panel-enter"
            src={asset(item.image)}
            alt={"Campaign concept for " + item.name.toLowerCase()}
            width="1400"
            height="1200"
            loading="lazy"
          />
          <div className="service-focus">
            <span>Connected by design</span>
            <strong key={item.focus} className="panel-enter">
              {item.focus}
            </strong>
            <svg viewBox="0 0 180 40" aria-hidden="true" fill="none">
              <path d="M10 20h155m-8-7 8 7-8 7" stroke="currentColor" />
              <circle cx="12" cy="20" r="6" fill="currentColor" />
              <circle cx="83" cy="20" r="6" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
      <div className="approach-foot">
        <p>{site.approach.footer}</p>
        <Button to={"/work/" + item.related} secondary>
          See a connected idea
        </Button>
      </div>
    </section>
  );
}
