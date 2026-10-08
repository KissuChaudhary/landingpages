"use client";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { useRelay } from "@/components/RelayProvider";
import { Mark } from "@/components/ui/Brand";
import { HeroScene } from "@/components/product/HeroScene";
export function Hero() {
  const { start } = useRelay();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy grid-inner">
        <p className="hero-eyebrow"><Mark />{site.hero.eyebrow}</p>
        <h1 id="hero-title"><span>{site.hero.first}</span><span>{site.hero.second}</span></h1>
        <p className="hero-description">{site.hero.description}</p>
        <div className="hero-actions">
          <button className="button button-blue" onClick={start}>{site.hero.action}<ArrowUpRight size={17}/></button>
          <a className="button button-outline" href="#details">{site.hero.secondary}<ArrowDown size={17}/></a>
        </div>
      </div>
      <HeroScene />
    </section>
  );
}
