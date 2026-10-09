import { Button, Frame, SectionHead } from "@/components/ui/Primitives";
import { route } from "@/lib/urls";
export default function NotFound() {
  return (
    <Frame className="section content-page">
      <SectionHead
        level={1}
        label="A missing connection"
        title="This path ends here."
      />
      <p className="content-intro">
        The page you are looking for is not available. Let us take you back to a
        clearer starting point.
      </p>
      <Button href={route("/")}>Back to Conduit</Button>
    </Frame>
  );
}
