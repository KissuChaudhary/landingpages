import type { Example } from "@/data/types";
import { SignupOutput } from "./SignupOutput";
import { PricingOutput } from "./PricingOutput";
import { CommandOutput } from "./CommandOutput";
export function OutputPreview({
  example,
  applied,
  className = "",
}: {
  example: Example;
  applied: boolean;
  className?: string;
}) {
  return (
    <div
      className={`output-preview ${className}`}
      key={`${example.id}-${applied}`}
      data-applied={applied}
    >
      {example.id === "signup" ? (
        <SignupOutput example={example} applied={applied} />
      ) : example.id === "pricing" ? (
        <PricingOutput example={example} applied={applied} />
      ) : (
        <CommandOutput example={example} applied={applied} />
      )}
    </div>
  );
}
