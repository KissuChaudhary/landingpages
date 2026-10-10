import { ButtonLink, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <main id="main" className="not-found wrapper">
      <Eyebrow>A little off track</Eyebrow>
      <span>404</span>
      <h1>This page took a detour.</h1>
      <p>Let’s take you back to something good.</p>
      <ButtonLink href="/">Back to the studio</ButtonLink>
    </main>
  );
}
