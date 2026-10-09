import { SectionHead } from "@/components/ui/Primitives";
import { href } from "@/lib/urls";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main" className="container missing-page">
      <SectionHead
        label="A small detour"
        lines={["Let's find", "a better starting point."]}
        text="That page is not here. The workspace is a good place to begin."
        primary
      />
      <a href={href("/")} className="button">
        Back to Aster
        <ArrowUpRight size={15} />
      </a>
    </main>
  );
}
