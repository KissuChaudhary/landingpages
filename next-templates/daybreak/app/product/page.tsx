import { Product } from "@/components/sections/Product";
import { Workspace } from "@/components/sections/Workspace";
import { Solutions } from "@/components/sections/Solutions";
import { Closing } from "@/components/sections/Closing";
import { Frame, SectionHead } from "@/components/ui/Primitives";
export const metadata = { title: "The workspace" };
export default function ProductPage() {
  return (
    <main id="main">
      <Frame className="page-heading">
        <SectionHead
          level={1}
          label="A workspace with a little perspective"
          title={"See clearly.\nMove thoughtfully."}
          text="From the first question to the next campaign. Keep your data, context and decisions close."
        />
      </Frame>
      <Product standalone />
      <Workspace />
      <Solutions />
      <Closing />
    </main>
  );
}
