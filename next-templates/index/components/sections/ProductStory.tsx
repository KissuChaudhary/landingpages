"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { StoryStage } from "@/components/product/StoryStage";
import { useMotion } from "@/components/motion/MotionProvider";
const chapters = [
  {
    label: "Collect",
    heading: "Keep the part that matters.",
    body: "An article you’ll come back to. A line you don’t want to lose. A thought in the middle of the day. Give the useful pieces one place to live.",
    detail: "Articles, notes and documents, side by side.",
  },
  {
    label: "Connect",
    heading: "Find the thread between them.",
    body: "See the ideas that keep returning. Follow a connection across your collection and discover what one source adds to another.",
    detail: "A clearer view of what belongs together.",
  },
  {
    label: "Understand",
    heading: "Leave with a point of view.",
    body: "Turn your sources into a brief you can use. Every finding stays linked to the original passage, ready to revisit, copy or take with you.",
    detail: "Your answer, with its sources still attached.",
  },
];
export function ProductStory() {
  const [step, setStep] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const { enabled } = useMotion();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!matchMedia("(min-width: 768px)").matches) return;
        for (const entry of entries)
          if (entry.isIntersecting)
            setStep(Number((entry.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);
  const select = (index: number) => {
    setStep(index);
    if (matchMedia("(min-width: 768px)").matches)
      refs.current[index]?.scrollIntoView({
        block: "center",
        behavior: enabled ? "smooth" : "instant",
      });
  };
  return (
    <section
      id="how-it-works"
      className="product-story section"
      aria-labelledby="story-heading"
    >
      <div className="container">
        <div className="section-heading">
          <SectionBadge>{site.story.badge}</SectionBadge>
          <h2 id="story-heading">
            {site.story.heading.split("\n").map((line, i) => (
              <span className="heading-line" key={i}>
                {line}
              </span>
            ))}
          </h2>
          <p>{site.story.description}</p>
        </div>
        <div className="story-layout">
          <div className="story-sticky">
            <div
              className="story-controls"
              role="group"
              aria-label="Product stages"
            >
              {chapters.map((chapter, i) => (
                <button
                  key={chapter.label}
                  aria-pressed={i === step}
                  onClick={() => select(i)}
                >
                  <span>0{i + 1}</span>
                  {chapter.label}
                </button>
              ))}
            </div>
            <StoryStage step={step} />
          </div>
          <div className="story-chapters">
            {chapters.map((chapter, i) => (
              <div
                key={chapter.label}
                data-step={i}
                ref={(element) => {
                  refs.current[i] = element;
                }}
                className={`story-chapter ${i === step ? "is-active" : ""}`}
              >
                <span className="chapter-number">
                  0{i + 1} / {chapter.label}
                </span>
                <h3>{chapter.heading}</h3>
                <p>{chapter.body}</p>
                <p className="chapter-detail">{chapter.detail}</p>
                <div className="story-mobile-stage">
                  <StoryStage step={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
