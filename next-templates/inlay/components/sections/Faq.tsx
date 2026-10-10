"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { TileWords } from "@/components/ui/TileWords";
import { Plus } from "@/components/ui/Icons";

// Questions in two columns. One answer is open at a time; it opens by growing its row,
// and the plus turns into a minus.

export function Faq() {
  const { faq } = site;
  const [open, setOpen] = useState(0);
  const half = Math.ceil(faq.items.length / 2);
  const columns = [faq.items.slice(0, half), faq.items.slice(half)];

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className="head start">
          <TileWords id="faq-title" text={faq.title} className="h2" />
        </div>
        <div className="faq-cols">
          {columns.map((items, c) => (
            <div key={c} className="faq-col">
              {items.map((item, j) => {
                const i = c * half + j;
                const isOpen = open === i;
                return (
                  <div key={item.q} className="faq-item" data-open={isOpen} data-reveal style={{ "--d": `${j * 50}ms` } as CSSProperties}>
                    <h3>
                      <button type="button" id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                        <span>{item.q}</span>
                        <span className="faq-icon" aria-hidden="true">
                          <Plus size={16} />
                        </span>
                      </button>
                    </h3>
                    <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                      <div>
                        <p>{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
