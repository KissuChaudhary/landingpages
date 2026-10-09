import type { Metadata } from "next";
import { privacy } from "@/data/legal";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata: Metadata = { title: privacy.title };

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
