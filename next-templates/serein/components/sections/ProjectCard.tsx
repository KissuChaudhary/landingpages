"use client";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { asset, href } from "@/lib/urls";
import { useMotion } from "../Motion";
import { Arrow } from "../ui/Arrow";

export function ProjectCard({
  project,
  stack = false,
}: {
  project: Project;
  stack?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { paused } = useMotion();
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !stack ||
      paused ||
      window.matchMedia("(max-width: 760px)").matches
    )
      return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = el.nextElementSibling;
      const nextTop =
        next?.getBoundingClientRect().top ?? window.innerHeight + 500;
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight - nextTop) / window.innerHeight),
      );
      el.style.setProperty("--stack-scale", `${1 - progress * 0.045}`);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
      el.style.removeProperty("--stack-scale");
    };
  }, [paused, stack]);
  return (
    <a
      ref={ref}
      className={`project-card ${stack ? "stack-card" : ""} ${project.light ? "project-light" : ""}`}
      href={href(`/work/${project.slug}`)}
      style={{ "--project-color": project.color } as React.CSSProperties}
      aria-label={`View ${project.name}: ${project.summary}`}
    >
      <img
        src={asset(project.image)}
        alt={project.alt}
        width="1536"
        height="1024"
        loading="lazy"
      />
      <div className="project-top">
        <span className="project-number">{project.number}</span>
        <span className="project-tag">{project.category}</span>
        <span className="project-year">{project.year}</span>
      </div>
      <div className="project-caption">
        <div>
          <span className="project-name">{project.name}</span>
          <h3>{project.headline}</h3>
        </div>
        <span className="project-view">
          View project{" "}
          <span>
            <Arrow />
          </span>
        </span>
      </div>
    </a>
  );
}
