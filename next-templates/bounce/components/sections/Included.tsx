"use client";

import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { useInView } from "../Motion";
import { NumberRoll, Title } from "../ui/Primitives";

const colors = ["pink", "violet", "blue", "lime", "cyan", "amber"];

function Row({ item, i }: { item: (typeof site.included.items)[number]; i: number }) {
  const [ref, inView] = useInView<HTMLLIElement>({ threshold: 0.6 });
  return (
    <li ref={ref} className={`spec c-${colors[i % colors.length]}`} data-reveal="" style={{ "--rd": `${i * 50}ms` } as CSSProperties}>
      <span className="spec-value">
        <NumberRoll value={item.value} play={inView} />
      </span>
      <span className="spec-text">
        <b>{item.unit}</b>
        <span>{item.text}</span>
      </span>
    </li>
  );
}

export function Included() {
  const { included } = site;
  return (
    <section className="section included">
      <div className="container included-grid">
        <div className="included-head">
          <Title lines={included.heading} />
          <p className="included-note" data-reveal="">
            {included.note}
          </p>
        </div>
        <ul className="specs">
          {included.items.map((item, i) => (
            <Row item={item} i={i} key={item.unit} />
          ))}
        </ul>
      </div>
    </section>
  );
}
