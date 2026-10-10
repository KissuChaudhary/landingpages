"use client";
import { useState } from "react";
import { projects } from "@/data/projects";
import { asset } from "@/lib/links";
import { Arrow } from "./ui";

const frames = [projects[1], projects[2], projects[0]];
export function ContactSheet() {
  const [active, setActive] = useState(0);
  return (
    <div className="contact-sheet">
      <div className="sheet-topline">
        <span>A few ways we see the world.</span>
        <span>OFFSCRIPT / CREATIVE STUDIES</span>
      </div>
      <div className="sheet-frames">
        {frames.map((project, index) => (
          <button
            key={project.slug}
            className={`sheet-frame sheet-${project.color}`}
            data-active={index === active}
            aria-pressed={index === active}
            aria-label={`Explore ${project.name}: ${project.descriptor}`}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <img
              src={asset(project.image)}
              alt={project.alt}
              fetchPriority={index === 0 ? "high" : "auto"}
              width={index === 2 ? 1536 : 1024}
              height={index === 2 ? 1024 : 1536}
            />
            <span className="sheet-frame-top">
              <span>0{index + 1}</span>
              <span>CONCEPT / {project.name}</span>
            </span>
            <span className="sheet-frame-title">
              {project.name.toLowerCase()}
              <Arrow diagonal size={24} />
            </span>
            <span className="crop-corner crop-tl" />
            <span className="crop-corner crop-br" />
          </button>
        ))}
      </div>
      <div className="sheet-caption">
        <span key={active}>{frames[active].descriptor}</span>
        <a href="#work">
          Explore the creative worlds <Arrow diagonal size={15} />
        </a>
      </div>
    </div>
  );
}
