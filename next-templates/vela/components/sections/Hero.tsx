import { ArrowDown, Sparkles } from "lucide-react";
import { site } from "@/site.config";
import { appHref, bookingHref } from "@/lib/urls";
import { Button } from "@/components/ui/Primitives";
import { Dashboard } from "@/components/product/Dashboard";
export function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <span className="announcement">
          <span>
            <Sparkles size={10} />
            {site.hero.announcementLabel}
          </span>
          {site.hero.announcement}
        </span>
        <h1>
          {site.hero.heading.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p>{site.hero.text}</p>
        <div className="hero-actions">
          <Button href={appHref()}>{site.hero.primary}</Button>
          <Button href={bookingHref()} tone="light">
            {site.hero.secondary}
          </Button>
        </div>
        <span className="hero-note">{site.hero.note}</span>
      </div>
      <div className="hero-dashboard">
        <Dashboard />
      </div>
      <div className="hero-base">
        <span>Made for the people behind the business</span>
        <a href="#signals" aria-label="Explore Vela features">
          <ArrowDown size={16} />
        </a>
        <span>A clearer view of what’s ahead</span>
      </div>
    </section>
  );
}
