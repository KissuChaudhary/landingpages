"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectDetail } from "./ProjectDetail";

export function SelectedWork() {
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState<string | null>(null);
  const projects = site.work.projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );
  const open = projects.find((project) => project.id === selected);
  return (
    <section className="section container" id="work">
      <Reveal>
        <SectionHeading {...site.work} />
      </Reveal>
      <div className="work-toolbar">
        <div
          className="filter-group"
          role="group"
          aria-label="Filter selected work"
        >
          {site.work.filters.map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              onClick={() => {
                setFilter(item);
                setSelected(null);
              }}
            >
              {item}
              {filter === item && <span aria-hidden="true">↗</span>}
            </button>
          ))}
        </div>
        <span className="eyebrow" aria-live="polite">
          {String(projects.length).padStart(2, "0")} selected studies
        </span>
      </div>
      {open && (
        <ProjectDetail
          project={open}
          onClose={() => {
            setSelected(null);
            document.getElementById(`project-card-${open.id}`)?.focus();
          }}
        />
      )}
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal
            key={project.id}
            className={project.id === "tempo" ? "project-wide" : ""}
          >
            <button
              className="project-card"
              id={`project-card-${project.id}`}
              onClick={() => setSelected(project.id)}
              aria-expanded={open?.id === project.id}
              aria-controls="project-detail"
              aria-label={`${site.work.openLabel}: ${project.name}, ${project.title}`}
            >
              <div className="project-image">
                <img
                  src={asset(project.image)}
                  alt={project.alt}
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
                <span className="project-index eyebrow">SF—0{index + 1}</span>
                <span className="project-open">
                  <ArrowUpRight size={24} aria-hidden="true" />
                </span>
                <span className="project-image-title">
                  {project.name}
                  <span> {project.category}</span>
                </span>
              </div>
              <div className="project-caption">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.medium}</p>
                </div>
                <span className="eyebrow">{project.year}</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
