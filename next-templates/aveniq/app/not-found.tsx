import { Brand, Button } from "@/components/ui";
import { home } from "@/lib/links";
export default function NotFound() {
  return (
    <main className="not-found">
      <Brand />
      <span className="eyebrow">404 / A different direction</span>
      <h1>
        This page wandered
        <br />
        off the path.
      </h1>
      <p>Let’s take you back to a clearer view.</p>
      <Button href={home()}>Back to the beginning</Button>
    </main>
  );
}
