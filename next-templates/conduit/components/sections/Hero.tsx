import { site } from "@/site.config";
import { href, route } from "@/lib/urls";
import { Button, Frame, Label } from "../ui/Primitives";
import { SampleLogo } from "../ui/Brand";
import { RouteBoard } from "../product/RouteBoard";
export function Hero() {
  return (
    <Frame className="hero">
      <div className="hero-top">
        <div className="hero-copy">
          <Label>{site.hero.badge}</Label>
          <h1>{site.hero.title}</h1>
        </div>
        <div className="hero-aside">
          <p>{site.hero.description}</p>
          <div className="button-row">
            <Button href={site.links.app || href("/#product")}>
              {site.hero.primary}
            </Button>
            <Button variant="outline" href={route("/contact")}>
              {site.hero.secondary}
            </Button>
          </div>
        </div>
      </div>
      <RouteBoard />
      <div className="logo-strip">
        <p className="mono">Teams putting agents to work</p>
        {["Aster", "Forma", "North", "Mono", "Arc"].map((name, i) => (
          <span className="logo-cell" key={name}>
            <SampleLogo name={name} variant={i} />
          </span>
        ))}
      </div>
    </Frame>
  );
}
