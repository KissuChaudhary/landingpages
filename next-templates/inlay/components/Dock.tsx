"use client";

import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { useHandle } from "@/lib/handle";
import { signupHref } from "@/lib/links";
import { SmartLink, ThrowArrow } from "@/components/ui/Action";
import { Mark } from "@/components/ui/Brand";
import { TextMorph } from "@/components/ui/TextMorph";

// A small bar at the bottom of the screen once the hero is behind you. It carries the
// handle the visitor typed ("Claim inlay.me/ines") and steps aside wherever the page
// already has a call to action (anything marked data-dock-hide) and at the footer.

export function Dock() {
  const handle = useHandle();
  const [past, setPast] = useState(false);
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.95);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const seen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setCovered(seen.size > 0);
    });
    document.querySelectorAll("[data-dock-hide]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const shown = past && !covered;
  const label = handle ? `Claim ${site.handleDomain}/${handle}` : `${site.hero.claim}, free`;

  return (
    <div className={`dock ${shown ? "is-shown" : ""}`} inert={!shown}>
      <SmartLink to={signupHref(handle)} className="dock-link">
        <span className="dock-mark">
          <Mark size={18} className={handle ? "is-set" : ""} />
        </span>
        <TextMorph className="dock-label">{label}</TextMorph>
        <span className="dock-go">
          <ThrowArrow size={15} />
        </span>
      </SmartLink>
    </div>
  );
}
