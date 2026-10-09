"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { type Project } from "@/site.config";
import { asset } from "@/lib/assets";

// The chosen study opens above the grid it came from. Closing it returns
// focus to the card, so keyboard users keep their place.
export function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.focus({ preventScroll: true });
    const bounds = element.getBoundingClientRect();
    if (bounds.top < 80 || bounds.bottom > window.innerHeight)
      element.scrollIntoView({
        block: "start",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  }, [project]);
  return (
    <section
      ref={ref}
      id="project-detail"
      className="project-detail"
      tabIndex={-1}
      aria-labelledby="project-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <div className="detail-top">
        <p className="eyebrow">
          {project.name} / {project.medium}
        </p>
        <button
          type="button"
          className="icon-button"
          aria-label="Close project"
          onClick={onClose}
        >
          <X size={22} />
        </button>
      </div>
      <img
        src={asset(project.image)}
        alt={project.alt}
        width="1536"
        height="1024"
      />
      <div className="project-detail-copy">
        <div>
          <p className="eyebrow">A Stillform study / {project.year}</p>
          <h3 id="project-title">{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div>
          <p className="eyebrow">The making</p>
          <ul>
            {project.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a href="#contact" className="text-link">
            Something like this? ↗
          </a>
        </div>
      </div>
    </section>
  );
}
