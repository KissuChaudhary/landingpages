"use client";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { Brand } from "./ui/Brand";
import { Arrow } from "./ui/Arrow";
export function Navigation() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    if (open) document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav
          aria-label="Main navigation"
          id="main-navigation"
          className={open ? "navigation open" : "navigation"}
        >
          {site.navigation.map((item) => (
            <a
              key={item.label}
              href={href(item.href)}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="header-contact"
            href={href("/contact")}
            onClick={() => setOpen(false)}
          >
            Let's talk <Arrow diagonal />
          </a>
        </nav>
        <button
          id="menu-toggle"
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>
    </header>
  );
}
