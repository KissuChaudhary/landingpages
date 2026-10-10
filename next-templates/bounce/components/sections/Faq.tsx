"use client";

import { useId, useState, type CSSProperties } from "react";
import { Plus } from "lucide-react";
import { site, mailto } from "@/site.config";
import { asset } from "@/lib/urls";
import { Title } from "../ui/Primitives";

export function Faq() {
  const { faq, teacher } = site;
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <div className="faq-side">
          <Title lines={faq.heading} />
          <div className="ask" data-reveal="" style={{ "--rd": "120ms" } as CSSProperties}>
            <img src={asset(teacher.photo)} width={56} height={56} alt="" loading="lazy" />
            <div>
              <b>{faq.contact.title}</b>
              <p>{faq.contact.text}</p>
              <a className="text-link" href={mailto(`Question about ${site.brand}`)}>
                {site.links.email}
              </a>
            </div>
          </div>
        </div>
        <div className="faq-list">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`qa${isOpen ? " is-open" : ""}`} data-reveal="" style={{ "--rd": `${i * 50}ms` } as CSSProperties}>
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`${id}-${i}`} id={`${id}-q${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    {item.q}
                    <span className="qa-icon" aria-hidden="true">
                      <Plus size={16} strokeWidth={2.4} />
                    </span>
                  </button>
                </h3>
                <div className="qa-body" id={`${id}-${i}`} role="region" aria-labelledby={`${id}-q${i}`} inert={!isOpen}>
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
