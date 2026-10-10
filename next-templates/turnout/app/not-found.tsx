import { site } from "@/site.config";
import { Ribbon } from "@/components/ui/Ribbon";
import { Action } from "@/components/ui/Action";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found-ribbon" aria-hidden="true">
        <Ribbon words={["Page not found", "Nobody here", "Wrong room"]} d="M0 470C360 560 700 520 1000 380S1600 160 2200 260" />
      </div>
      <div className="container not-found-copy">
        <span className="tag">404</span>
        <h1 className="h1">This room's empty.</h1>
        <p className="lead">The page you're looking for has moved or never existed. The party's this way.</p>
        <Action to="/" label={`Back to ${site.brand}`} size="lg" />
      </div>
    </section>
  );
}
