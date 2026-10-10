import type { Metadata } from "next";
import { terms } from "@/data/legal";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata: Metadata = { title: terms.title };

export default function Terms() {
  return <LegalPage page={terms} />;
}
