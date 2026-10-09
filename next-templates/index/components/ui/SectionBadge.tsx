import { LabelDecode } from "@/components/motion/LabelDecode";
export function SectionBadge({ children }: { children: string }) {
  return (
    <p className="section-badge">
      <span className="badge-mark" aria-hidden="true" />
      <LabelDecode>{children}</LabelDecode>
    </p>
  );
}
