"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Brand } from "./ui/Brand";
import { Button } from "./ui/Primitives";
import { href, route } from "@/lib/urls";
import { useExperience } from "./Experience";
const links = [
  ["Pricing", "/pricing"],
  ["Journal", "/blog"],
  ["Waitlist", "/waitlist"],
  ["Contact", "/contact"],
];
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { openWorkspace } = useExperience();
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 60);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!mobile) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobile(false);
        document.getElementById("mobile-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [mobile]);
  return (
    <header className="nav-space frame">
      <nav
        className={`navigation ${scrolled ? "navigation-scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <a aria-label="Arclo home" href={route("/")}>
          <Brand />
        </a>
        <div className="nav-desktop">
          {links.map(([name, link]) => (
            <a key={link} href={route(link)}>
              {name}
            </a>
          ))}
          <details
            className="pages-menu"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.currentTarget.open = false;
                event.currentTarget.querySelector("summary")?.focus();
              }
            }}
          >
            <summary>
              All pages <ChevronDown size={14} />
            </summary>
            <div>
              {[
                ["Home", "/"],
                ...links,
                ["About", "/#about"],
                ["Privacy", "/privacy"],
                ["Terms", "/terms"],
              ].map(([name, link]) => (
                <a key={link} href={href(link)}>
                  {name}
                </a>
              ))}
            </div>
          </details>
        </div>
        <div className="nav-actions">
          <Button onClick={() => openWorkspace()}>Try Arclo</Button>
          <button
            id="mobile-toggle"
            className="icon-button mobile-toggle"
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            aria-expanded={mobile}
            aria-controls="mobile-navigation"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {mobile && (
          <div id="mobile-navigation" className="mobile-navigation">
            {links.map(([name, link]) => (
              <a key={link} href={route(link)} onClick={() => setMobile(false)}>
                {name}
              </a>
            ))}
            <a href={href("/#features")} onClick={() => setMobile(false)}>
              The platform
            </a>
            <Button
              onClick={() => {
                setMobile(false);
                openWorkspace();
              }}
            >
              Try a workflow
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
