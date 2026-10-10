import { Button, Star } from "@/components/ui";
import { home } from "@/lib/links";
export default function NotFound() {
  return (
    <main className="not-found wrap">
      <Star />
      <p className="eyebrow">404 / A little too far out of the ordinary.</p>
      <h1>
        Let’s get you
        <br />
        back to the good stuff.
      </h1>
      <Button href={home()}>Back to Oddline</Button>
    </main>
  );
}
