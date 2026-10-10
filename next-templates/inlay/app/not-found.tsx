import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { Button } from "@/components/ui/Action";

// An empty page waiting for its tiles: four slots, one tile still tilted.

export default function NotFound() {
  return (
    <section className="nf container">
      <div className="nf-board" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i === 1 ? "nf-tile" : "nf-slot"} style={{ "--i": i } as CSSProperties}>
            {i === 1 ? "404" : null}
          </span>
        ))}
      </div>
      <h1 className="h1">Nothing on this page yet.</h1>
      <p className="lead">The address you followed doesn&apos;t lead anywhere. Maybe it&apos;s waiting for someone to claim it.</p>
      <Button to="/" label={`Back to ${site.brand}`} size="lg" />
    </section>
  );
}
