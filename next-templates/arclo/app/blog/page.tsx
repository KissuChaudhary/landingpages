import { Journal } from "@/components/sections/Journal";
import { Closing } from "@/components/sections/Closing";
export const metadata = { title: "The journal" };
export default function BlogPage() {
  return (
    <main id="main">
      <Journal full />
      <Closing />
    </main>
  );
}
