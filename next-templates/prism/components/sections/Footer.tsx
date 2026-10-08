"use client";
import { SlidersHorizontal } from "lucide-react";
import { site } from "@/site.config";
import { Brand } from "@/components/ui/Brand";
import { usePrism } from "@/components/PrismProvider";

export function Footer() {
  const { setDialog } = usePrism();
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
        <div className="footer-bottom">
          <p>{site.footer.copyright}</p>
          {site.appearance.showControls && (
            <button
              className="appearance-button"
              onClick={() => setDialog({ kind: "settings" })}
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
          className="appearance-float"
          aria-label="Customize appearance"
          onClick={() => setDialog({ kind: "settings" })}
        >
          <SlidersHorizontal size={16} />
          <span>Preview settings</span>
        </button>
      )}
    </>
  );
}
