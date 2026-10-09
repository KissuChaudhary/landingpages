"use client";
import { Pause, Play, ArrowUp } from "lucide-react";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { Brand } from "../ui/Brand";
import { useMotion } from "../Motion";
export function Footer() {
  const { paused, system, toggle } = useMotion();
  const groups = [
    {
      name: "Workspace",
      links: [
        ["Product", "/product"],
        ["Integrations", "/integrations"],
        ["Pricing", "/pricing"],
        ["Demo", "/#demo"],
      ],
    },
    {
      name: "A little context",
      links: [
        ["Journal", "/journal"],
        ["Our approach", "/about"],
        ["Contact", "/contact"],
      ],
    },
    {
      name: "The details",
      links: [
        ["Privacy", "/privacy"],
        ["Terms", "/terms"],
        ["Accessibility", "/accessibility"],
      ],
    },
  ];
  return (
    <footer className="footer frame">
      <div className="section-inner footer-main">
        <div className="footer-brand">
          <Brand />
          <h3>{site.footer.tagline}</h3>
          <p>{site.footer.note}</p>
        </div>
        {groups.map((group) => (
          <nav key={group.name} aria-label={group.name}>
            <h4>{group.name}</h4>
            {group.links.map(([text, url]) => (
              <a href={href(url)} key={url}>
                {text}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="section-inner footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.brand}
        </p>
        <button
          className="text-button"
          onClick={toggle}
          aria-pressed={paused}
          disabled={system}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}{" "}
          {system
            ? "Reduced motion enabled"
            : paused
              ? "Resume motion"
              : "Pause motion"}
        </button>
        <a href="#top" className="text-button">
          Back to top
          <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  );
}
