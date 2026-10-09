"use client";
import { Play, ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/urls";
import { useExperience } from "../Experience";
import { Frame } from "../ui/Primitives";
import { Dashboard } from "../product/Dashboard";
export function Workspace() {
  const { open } = useExperience();
  return (
    <Frame className="workspace-section" id="demo">
      <div className="workspace-caption">
        <p className="eyebrow">The whole picture, together</p>
        <button className="text-button" onClick={() => open({ type: "tour" })}>
          Explore the workspace
          <ArrowUpRight size={16} />
        </button>
      </div>
      <div className="workspace-landscape">
        <img
          src={asset("/images/landscape.webp")}
          alt="A painted coastal valley at sunrise"
          width="1536"
          height="1024"
          loading="lazy"
        />
        <div className="workspace-preview">
          <Dashboard interactive={false} />
        </div>
        <button
          className="tour-play"
          aria-label="Open interactive workspace tour"
          onClick={() => open({ type: "tour" })}
        >
          <Play size={24} fill="currentColor" />
        </button>
      </div>
    </Frame>
  );
}
