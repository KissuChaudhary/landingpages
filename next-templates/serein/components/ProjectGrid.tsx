"use client";
import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./sections/ProjectCard";
export function ProjectGrid() {
  const [filter, setFilter] = useState("All work");
  const filters = ["All work", "Identity", "Digital"];
  const shown = projects.filter(
    (project) =>
      filter === "All work" ||
      (filter === "Identity"
        ? project.deliverables.includes("Visual identity")
        : project.deliverables.some((item) =>
            /design|development/i.test(item),
          )),
  );
  return (
    <>
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects"
      >
        {filters.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={item === filter}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="project-directory" aria-live="polite">
        {shown.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </div>
    </>
  );
}
