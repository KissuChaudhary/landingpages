"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { site } from "@/site.config";
import { useRelay } from "@/components/RelayProvider";
import { Brand } from "@/components/ui/Brand";
export function Navigation() {
  const { theme, changeTheme, start } = useRelay();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      if (window.scrollY < 300) setActive("#top");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      if (window.scrollY < 300) return; for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
    }, { rootMargin: "-15% 0px -65% 0px" });
    for (const item of site.navigation) {
      const element = document.querySelector(item.href);
      if (element) observer.observe(element);
    }
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);
  return (
    <header
      className={`navigation ${scrolled ? "is-scrolled" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          document.getElementById("relay-menu")?.focus();
        }
      }}
    >
      <Brand />
      <nav
        id="relay-navigation"
        className={open ? "is-open" : ""}
        aria-label="Main navigation"
      >
        <a aria-current={active === "#top" ? "location" : undefined} href="#top" onClick={() => setOpen(false)}>
          Home
        </a>
        {site.navigation.map((item) => (
          <a key={item.href} href={item.href} aria-current={active === item.href ? "location" : undefined} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <button
          className="icon-button"
          onClick={changeTheme}
          aria-label={`Switch to ${theme === "light" ? "ink" : "light"} appearance`}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button className="button button-blue nav-start" onClick={start}>
          Try Relay
          <ArrowUpRight size={18} />
        </button>
        <button
          id="relay-menu"
          className="icon-button menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="relay-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
