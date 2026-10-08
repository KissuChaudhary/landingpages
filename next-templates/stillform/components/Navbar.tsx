"use client";

import { useRef, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/site.config";
import { BrandMark } from "./ui/Brand";

export function Navbar() {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const restore = () => {
      document.body.style.overflow = "";
    };
    element.addEventListener("close", restore);
    return () => {
      element.removeEventListener("close", restore);
      restore();
    };
  }, []);

  const openMenu = () => {
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => dialog.current?.close();

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label={`${site.brand.name} home`}>
          <BrandMark />
          <span>
            {site.brand.name}
            <span className="brand-period">.</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.nav.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">
          Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          className="menu-toggle icon-button"
          aria-label="Open navigation"
          aria-haspopup="dialog"
          onClick={openMenu}
        >
          <Menu size={22} />
        </button>
      </div>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-labelledby="menu-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-menu-inner">
          <div className="dialog-top">
            <p className="eyebrow" id="menu-title">
              Explore Stillform
            </p>
            <button
              className="icon-button"
              onClick={closeMenu}
              aria-label="Close navigation"
            >
              <X size={24} />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {site.nav.map((link, index) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                <span className="eyebrow">0{index + 1}</span>
                {link.label}
                <ArrowUpRight size={23} />
              </a>
            ))}
          </nav>
          <a className="button" href="#contact" onClick={closeMenu}>
            Let’s make something <ArrowUpRight size={17} />
          </a>
          <p className="mobile-menu-note">{site.brand.location}</p>
        </div>
      </dialog>
    </header>
  );
}
