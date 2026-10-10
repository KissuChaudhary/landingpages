import { Button, Eyebrow, Title } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="missing-page section light">
      <Eyebrow>404 / A MISSING PIECE</Eyebrow>
      <Title as="h1" lines={["This piece isn’t here."]} />
      <p>Let’s get you back to the rest of the system.</p>
      <Button to="/">Back to the studio</Button>
    </section>
  );
}
