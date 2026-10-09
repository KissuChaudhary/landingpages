export const blueprints = {
  report: {
    name: "Weekly digest agent",
    prompt: "Turn project updates into a useful weekly digest.",
    tools: ["Project board", "Team notes", "Draft workspace"],
    steps: [
      "Collect the supplied updates",
      "Group work by project",
      "Surface decisions and blockers",
      "Prepare a draft for review",
    ],
    result:
      "This week: the onboarding flow is ready for review, the support guide has been updated, and the next release is waiting on one design decision.",
    rule: "The digest is prepared as a draft. Nothing is published.",
  },
  support: {
    name: "Customer care agent",
    prompt: "Help customers with order updates and returns.",
    tools: ["Order database", "Knowledge base", "Help desk"],
    steps: [
      "Read the customer request",
      "Look up the order and policy",
      "Prepare a helpful response",
      "Ask for approval on refunds",
    ],
    result:
      "Your order is on its way. The latest delivery estimate is Thursday. I have also prepared the return options, should you need them.",
    rule: "Refunds always require a human decision.",
  },
  leads: {
    name: "Lead routing agent",
    prompt: "Enrich new leads and send the right context to sales.",
    tools: ["Intake form", "Company directory", "CRM"],
    steps: [
      "Receive the new lead",
      "Gather company context",
      "Evaluate the fit",
      "Prepare the handoff",
    ],
    result:
      "Aster Studio is ready for a discovery call. Team size: 24. Interest: customer operations. The brief is ready for the sales queue.",
    rule: "No outreach is sent automatically.",
  },
  review: {
    name: "Document review agent",
    prompt: "Check a new document and prepare a review summary.",
    tools: ["Document library", "Review checklist", "Approval queue"],
    steps: [
      "Read the supplied document",
      "Check against the review criteria",
      "Flag missing information",
      "Request human approval",
    ],
    result:
      "The sample document covers scope, dates and responsibilities. One item needs attention: the approval owner has not been specified.",
    rule: "Final approval stays with your team.",
  },
} as const;
export type BlueprintKey = keyof typeof blueprints;
export const workflowSteps = [
  "Receive new lead",
  "Gather company context",
  "Evaluate the fit",
  "Prepare sales handoff",
] as const;
export const workflowReceipt = {
  example: true,
  name: "Lead routing",
  lead: "Aster Studio",
  teamSize: 24,
  fit: "Strong",
  status: "Ready for review",
  actions: [...workflowSteps],
  externalActions: "None. Local demonstration only.",
};
