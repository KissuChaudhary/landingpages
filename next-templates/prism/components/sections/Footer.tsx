"use client";
import { useEffect, useRef } from "react";
import { SlidersHorizontal } from "lucide-react";
import { site } from "@/site.config";
import { Brand } from "@/components/ui/Brand";
import { Appearance } from "@/components/product/Appearance";
import { usePrism } from "@/components/PrismProvider";

export function Footer() {
  const { appearanceOpen, setAppearanceOpen } = usePrism();
  const first = useRef(true);
  const drawer = useRef<HTMLDivElement>(null);
  // Opening the drawer grows the footer, so wait for it before bringing the
  // whole panel into view.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!appearanceOpen) return;
    const timer = setTimeout(
      () =>
        drawer.current?.scrollIntoView({
          block: "nearest",
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        }),
      320,
    );
    return () => clearTimeout(timer);
  }, [appearanceOpen]);
  return (
    <>
      <footer className="site-footer container">
        <div className="footer-main">
          <div>
            <Brand />
            <p>{site.brand.descriptor}</p>
          </div>
          <nav aria-label="Footer navigation">
            {site.footer.links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        {site.appearance.showControls && (
          <div
            ref={drawer}
            id="appearance"
            className="appearance-drawer"
            data-open={appearanceOpen}
          >
            <div className="appearance-drawer-inner">
              <Appearance />
            </div>
          </div>
        )}
        <div className="footer-bottom">
          <p>{site.footer.copyright}</p>
          {site.appearance.showControls && (
            <button
              type="button"
              className="appearance-button"
              aria-expanded={appearanceOpen}
              aria-controls="appearance"
              onClick={() => setAppearanceOpen(!appearanceOpen)}
            >
              <span className="appearance-swatches" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              Make it your own
              <SlidersHorizontal size={13} />
            </button>
          )}
        </div>
      </footer>
      {site.appearance.showControls && (
        <button
          type="button"
          className="appearance-float"
          aria-label="Customize appearance"
          aria-expanded={appearanceOpen}
          aria-controls="appearance"
          onClick={() => setAppearanceOpen(!appearanceOpen)}
        >
          <SlidersHorizontal size={16} />
          <span>Preview settings</span>
        </button>
      )}
    </>
  );
}
