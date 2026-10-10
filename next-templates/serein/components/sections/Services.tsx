"use client";
import { useState } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";

export function Services() {
  const [active, setActive] = useState<string | null>(site.services[0].id);
  return (
    <section className="services dark-section section-space" id="services">
      <div className="container">
        <SectionHeading
          label="What we do"
          title={"A clear idea.\nBeautifully brought to life."}
          centered
        />
        <div className="services-list">
          {site.services.map((service, i) => (
            <article
              className={`service ${active === service.id ? "is-open" : ""}`}
              key={service.id}
            >
              <button
                className="service-toggle"
                type="button"
                aria-expanded={active === service.id}
                aria-controls={`service-${service.id}`}
                onClick={() =>
                  setActive(active === service.id ? null : service.id)
                }
              >
                <span className="service-number">0{i + 1}.</span>
                <span className="service-name">
                  <span>{service.name}</span>
                  <span className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                </span>
                <span className="plus" aria-hidden="true" />
              </button>
              <div
                id={`service-${service.id}`}
                className="service-expansion"
                inert={active !== service.id}
              >
                <div className="service-overflow">
                  <div className="service-content">
                    <img
                      src={asset(`/images/${service.image}.webp`)}
                      alt=""
                      width="360"
                      height="240"
                      loading="lazy"
                    />
                    <div>
                      <p>{service.description}</p>
                      <span className="service-deliverables">
                        {service.deliverables}
                      </span>
                      <Button
                        to={`/contact?service=${encodeURIComponent(service.name)}`}
                        light
                      >
                        Let's build together
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="service-note">
          <span className="status-dot" /> From a single touchpoint to an entire
          world.
        </p>
      </div>
    </section>
  );
}
