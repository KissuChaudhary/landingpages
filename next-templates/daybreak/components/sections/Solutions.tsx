"use client";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { audiences } from "@/data/teams";
import { AudienceScene } from "../product/AudienceScenes";
import { Frame, SectionHead } from "../ui/Primitives";
export function Solutions() {
  const [active, setActive] = useState("marketing");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(entry.target.id.replace("for-", ""));
      },
      { rootMargin: "-25% 0px -35% 0px", threshold: 0 },
    );
    audiences.forEach((a) => {
      const el = document.getElementById(`for-${a.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <Frame id="solutions" className="solutions-section">
      <div className="section-inner">
        <SectionHead
          label={site.solutions.label}
          title={site.solutions.heading}
          text={site.solutions.text}
        />
        <div className="solutions-layout">
          <nav className="audience-nav" aria-label="Find your team">
            {audiences.map((a) => (
              <a
                href={`#for-${a.id}`}
                key={a.id}
                aria-current={active === a.id ? "location" : undefined}
                onClick={() => setActive(a.id)}
              >
                {a.label}
              </a>
            ))}
          </nav>
          <div className="audience-rows">
            {audiences.map((a) => (
              <article className="audience-row" id={`for-${a.id}`} key={a.id}>
                <div className="audience-copy" data-reveal>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
                <AudienceScene scene={a.scene} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
