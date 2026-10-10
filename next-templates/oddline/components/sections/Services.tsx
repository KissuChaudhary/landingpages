"use client";
import { useRef, useState } from "react";
import { site } from "@/site.config";
import { Arrow, Label, Title } from "../ui";
import { ServiceArt } from "../ServiceArt";
export function Services() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = site.services.items[active];
  function move(event: React.KeyboardEvent, index: number) {
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? (index + 1) % 3
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? (index + 2) % 3
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? 2
              : -1;
    if (next < 0) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <section
      id="services"
      className="services wrap section-pad"
      aria-labelledby="services-title"
    >
      <Label>{site.services.eyebrow}</Label>
      <div id="services-title">
        <Title lines={site.services.title} />
      </div>
      <div className="services-layout" data-reveal>
        <div
          className="service-tabs"
          role="tablist"
          aria-label="Studio capabilities"
          aria-orientation="vertical"
        >
          {site.services.items.map((service, index) => (
            <button
              key={service.title}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              role="tab"
              id={`service-tab-${index}`}
              aria-controls="service-panel"
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => move(event, index)}
            >
              <span className="service-number">0{index + 1}</span>
              <span>
                <strong>{service.title}</strong>
                <small>{service.short}</small>
              </span>
              <Arrow diagonal />
            </button>
          ))}
        </div>
        <div
          className="service-panel"
          role="tabpanel"
          id="service-panel"
          aria-labelledby={`service-tab-${active}`}
          tabIndex={0}
        >
          <div key={active} className="service-content">
            <div className="service-art">
              <span>{item.word}</span>
              <ServiceArt type={item.graphic} />
              <span className="art-coordinate">OL / 0{active + 1}</span>
            </div>
            <p>{item.description}</p>
            <div className="service-tags">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
