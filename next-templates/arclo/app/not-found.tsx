import { Button, Section } from "@/components/ui/Primitives";
import { route } from "@/lib/urls";
export default function NotFound() {
  return (
    <main id="main">
      <Section className="not-found">
        <span className="eyebrow">A small detour · 404</span>
        <h1>
          This page didn’t
          <br />
          reconcile.
        </h1>
        <p>It isn’t here, but the rest of the books are in order.</p>
        <Button href={route("/")}>Back to the overview</Button>
      </Section>
    </main>
  );
}
