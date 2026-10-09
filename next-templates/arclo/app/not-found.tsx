import { Button, Section } from "@/components/ui/Primitives";
import { route } from "@/lib/urls";
export default function NotFound() {
  return (
    <main id="main">
      <Section className="not-found">
        <span className="eyebrow">A small detour · 404</span>
        <h1>
          This flow goes
          <br />
          somewhere else.
        </h1>
        <p>Let’s get you back to a useful starting point.</p>
        <Button href={route("/")}>Find your way home</Button>
      </Section>
    </main>
  );
}
