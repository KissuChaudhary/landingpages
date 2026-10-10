"use client";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { asset, href } from "@/lib/urls";
import { useMotion } from "../Motion";
import { Arrow } from "../ui/Arrow";

export function HeroReel() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const { paused } = useMotion();
  useEffect(() => {
    if (paused || hovered) return;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((value) => (value + 1) % projects.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [paused, hovered, index]);
  const current = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <div
      className="hero-reel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setHovered(false);
      }}
    >
      <div className="reel-images" aria-live="off">
        {[current, next].map((project) => (
          <a
            href={href(`/work/${project.slug}`)}
            key={project.slug}
            className="reel-image"
            aria-label={`View ${project.name} project`}
          >
            <img
              src={asset(project.image)}
              alt={project.alt}
              width="300"
              height="200"
            />
            <span>
              {project.name}
              <Arrow />
            </span>
          </a>
        ))}
      </div>
      <div className="reel-track">
        <span>0{index + 1}</span>
        <span className="reel-progress">
          <i
            key={index}
            style={{
              animationPlayState: paused || hovered ? "paused" : "running",
            }}
          />
        </span>
        <span>0{projects.length}</span>
        <button
          type="button"
          aria-label="Previous featured project"
          onClick={() =>
            setIndex((index + projects.length - 1) % projects.length)
          }
        >
          <Arrow className="arrow-back" diagonal={false} />
        </button>
        <button
          type="button"
          aria-label="Next featured project"
          onClick={() => setIndex((index + 1) % projects.length)}
        >
          <Arrow diagonal={false} />
        </button>
      </div>
    </div>
  );
}
