"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { type Project } from "@/site.config";
import { asset } from "@/lib/assets";

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!project || !dialog) return;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
    };
  }, [project]);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) ref.current?.close();
      }}
    >
      {project && (
        <div className="project-dialog-inner">
          <div className="dialog-top">
            <p className="eyebrow">
              {project.name} / {project.medium}
            </p>
            <button
              className="icon-button"
              aria-label="Close project"
              onClick={() => ref.current?.close()}
              autoFocus
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
          <div className="project-dialog-copy">
            <div>
              <p className="eyebrow">A Stillform study / {project.year}</p>
              <h2 id="project-title">{project.title}</h2>
              <p>{project.description}</p>
            </div>
            <div>
              <p className="eyebrow">The making</p>
              <ul>
                {project.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className="text-link"
                onClick={() => ref.current?.close()}
              >
                Something like this? ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
