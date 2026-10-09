import { Frame, SectionHead } from "@/components/ui/Primitives";
import { href } from "@/lib/urls";
import { site } from "@/site.config";
export default function NotFound() {
  return (
    <main id="main">
      <Frame className="missing-page">
        <SectionHead
          level={1}
          label="A little detour"
          title={"Let's find a\nclearer path."}
          text="This page isn't here. The workspace is a good place to begin."
        />
        <a className="button button-dark" href={href("/")}>
          Back to {site.brand}
        </a>
      </Frame>
    </main>
  );
}
