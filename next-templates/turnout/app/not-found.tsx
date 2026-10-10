import { site } from "@/site.config";
import { Action } from "@/components/ui/Action";
import { Filmstrip } from "@/components/ui/Filmstrip";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container not-found-copy">
        <span className="tag">404</span>
        <h1 className="h1">This room's empty.</h1>
        <p className="lead">The page you're looking for has moved or never existed. The party's this way.</p>
        <Action to="/" label={`Back to ${site.brand}`} size="lg" />
      </div>
      <div className="not-found-reel" aria-hidden="true">
        <Filmstrip frames={site.hero.reel} />
      </div>
    </section>
  );
}
