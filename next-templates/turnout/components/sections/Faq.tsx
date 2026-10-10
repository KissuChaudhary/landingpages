"use client";

import { useId, useState } from "react";
import { site } from "@/site.config";
import { Plus } from "@/components/ui/Icons";

// One answer open at a time. Each row grows to fit its answer (height through grid rows)
// and its plus turns into a cross.

export function Faq() {
  const { faq } = site;
  const [open, setOpen] = useState(0);
  const id = useId();
  return (
    <section className="section faq" aria-labelledby="faq-title">
      <div className="container faq-inner">
        <h2 id="faq-title" className="h2 faq-title" data-reveal>
          {faq.title}
        </h2>
        <div className="faq-list">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq-item ${isOpen ? "is-open" : ""}`} data-reveal style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
                <h3>
                  <button type="button" className="faq-q" aria-expanded={isOpen} aria-controls={`${id}-${i}`} id={`${id}-q-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>
                <div className="faq-a" id={`${id}-${i}`} role="region" aria-labelledby={`${id}-q-${i}`} inert={!isOpen}>
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
