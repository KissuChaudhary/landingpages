"use client";
import { ArrowUp, Pause, Play } from "lucide-react";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { Brand } from "../ui/Brand";
import { useMotion } from "../Motion";
export function Footer() {
  const { paused, system, toggle } = useMotion();
  const groups = [
    {
      title: "Workspace",
      links: [
        ["Features", "/#features"],
        ["Ways to work", "/#use-cases"],
        ["Integrations", "/integrations"],
        ["Pricing", "/pricing"],
      ],
    },
    {
      title: "Company",
      links: [
        ["Our approach", "/about"],
        ["Customers", "/customers"],
        ["Journal", "/journal"],
        ["Contact", "/contact"],
      ],
    },
    {
      title: "A little context",
      links: [
        ["Updates", "/updates"],
        ["Questions", "/#faq"],
        ["Privacy", "/privacy"],
        ["Terms", "/terms"],
        ["Accessibility", "/accessibility"],
      ],
    },
  ];
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Brand />
          <p>{site.footer.text}</p>
          <span>{site.footer.note}</span>
        </div>
        {groups.map((group) => (
          <nav aria-label={group.title} key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(([text, path]) => (
              <a key={path} href={href(path)}>
                {text}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="container footer-bottom">
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
        <a className="text-button" href="#top">
          Back to top
          <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
