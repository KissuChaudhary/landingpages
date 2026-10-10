import { Button } from "@/components/ui/Primitives";
export default function NotFound() {
  return (
    <main id="main" className="not-found frame">
      <span className="eyebrow">404 / A small detour</span>
      <h1>
        Let’s get you
        <br />
        back in the flow.
      </h1>
      <p>This page has moved or hasn’t been created yet.</p>
      <Button href="/">Back to Vela</Button>
    </main>
  );
}
