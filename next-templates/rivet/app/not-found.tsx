import { Label, Action } from "@/components/ui/Action";
export default function NotFound() {
  return (
    <main id="main">
      <section className="page-header not-found section-wrap">
        <Label>A small detour / 404</Label>
        <h1>
          This one hasn’t
          <br />
          <span>been made yet.</span>
        </h1>
        <p>Let’s get you back to something worth exploring.</p>
        <Action href="/">Back to the studio</Action>
      </section>
    </main>
  );
}
