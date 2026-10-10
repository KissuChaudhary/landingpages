import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
export default function NotFound() {
  return (
    <main id="main" className="container missing-page">
      <SectionHeading
        as="h1"
        label="404 / A small detour"
        title={"Nothing here.\nPlenty to see elsewhere."}
      />
      <Button to="/">Back to the studio</Button>
    </main>
  );
}
