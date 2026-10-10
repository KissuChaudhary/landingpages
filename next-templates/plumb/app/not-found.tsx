import { Button } from "@/components/ui/Primitives";

export default function NotFound() {
  return (
    <section className="missing">
      <div>
        <span className="missing-count" aria-hidden="true">
          <i />0 here
        </span>
        <h1>This page has no visitors.</h1>
        <p>Not even you, technically. The link may be old, or the page may have moved.</p>
        <Button to="/" label="Back to the home page" />
      </div>
    </section>
  );
}
