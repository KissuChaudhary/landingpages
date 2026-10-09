"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import { GridIntersections } from "@/components/ui/Grid";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { site } from "@/site.config";
import { usePatch } from "@/components/PatchProvider";
export function Navigation() {
  const { start } = usePatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    function close(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="navigation grid-section">
      <GridIntersections />
      <a
        href="#top"
        aria-label={`${site.brand.name} home`}
        className="nav-brand"
      >
        <Brand />
      </a>
      <nav
        className={`nav-links ${open ? "is-open" : ""}`}
        id="navigation"
        aria-label="Main navigation"
      >
        {site.navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <ThemeSwitch />
        <button className="button button-dark nav-cta" onClick={start}>
          {site.actions.start}
          <ArrowUpRight size={16} />
        </button>
        <button
          className="icon-button menu-toggle"
          id="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  );
}
