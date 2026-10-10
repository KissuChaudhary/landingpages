import { Button } from "@/components/ui/Button";
import { site } from "@/site.config";
export default function NotFound() {
  return (
    <section className="empty-page wrap">
      <p className="eyebrow">
        <span />
        404 / A different direction
      </p>
      <h1>
        Let's find
        <br />
        your way back.
      </h1>
      <p>This page is not here. There is more to explore from the studio.</p>
      <Button to="/">Back to {site.brand}</Button>
    </section>
  );
}
