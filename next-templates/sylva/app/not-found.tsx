import { Button } from "@/components/ui/Primitives";
export default function NotFound() {
  return (
    <main id="main" className="secondary-page not-found wrap">
      <p className="eyebrow">404 / A path less travelled</p>
      <h1>
        A little
        <br />
        <em>lost in the leaves?</em>
      </h1>
      <p>This page is not here. Let's find a greener way back.</p>
      <Button to="/">Back to Sylva</Button>
    </main>
  );
}
