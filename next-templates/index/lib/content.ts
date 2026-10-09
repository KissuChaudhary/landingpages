import type { Topic } from "@/data/topics";
import type { Plan } from "@/site.config";
export type Billing = "monthly" | "yearly";
export function planPrice(plan: Plan, billing: Billing) {
  const monthly = plan[billing];
  return {
    monthly,
    total: billing === "yearly" ? monthly * 12 : monthly,
    perSeat: plan.id === "together",
    savings: billing === "yearly" ? (plan.monthly - monthly) * 12 : 0,
  };
}
export function researchBrief(topic: Topic) {
  const numbered = (id: string) =>
    topic.sources.findIndex((source) => source.id === id) + 1;
  return `${topic.title}\n${topic.question}\n\n${topic.findings.map((finding, i) => `${i + 1}. ${finding.text} ${finding.sources.map((id) => `[${numbered(id)}]`).join(" ")}`).join("\n")}\n\n${topic.takeaway}\n\nSources (fictional sample content)\n${topic.sources.map((source, i) => `[${i + 1}] ${source.title}\n${source.publisher}\n${source.passage}`).join("\n\n")}\n`;
}
