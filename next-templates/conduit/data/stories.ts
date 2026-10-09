export const stories = [
  {
    id: "aster",
    name: "Aster",
    category: "Revenue operations",
    title: "From a new lead to a useful first conversation.",
    stat: "4 → 1",
    metric: "tools brought into one flow",
    quote:
      "The most valuable part is the handoff. Context arrives with the request, so the next person starts with understanding instead of another search.",
    role: "A lead-routing example",
    initials: "AS",
    blueprint: "leads",
    details:
      "A sample intake from Aster Studio is enriched with company context, checked for fit and prepared for a sales review. The example makes no external calls and sends no outreach.",
  },
  {
    id: "forma",
    name: "Forma",
    category: "Customer experience",
    title: "A helpful answer, with the right context behind it.",
    stat: "3",
    metric: "sources, one clear response",
    quote:
      "An order record, a policy and a conversation belong together. Connecting them gives the support team a better place to begin.",
    role: "A customer-care example",
    initials: "FO",
    blueprint: "support",
    details:
      "The customer-care blueprint combines a fictional order record, a returns policy and a customer request. A response is prepared locally, while refunds remain subject to approval.",
  },
  {
    id: "north",
    name: "North",
    category: "Internal operations",
    title: "A review process that leaves room for judgment.",
    stat: "1",
    metric: "human approval at the right moment",
    quote:
      "The routine checks happen in a consistent sequence. The final decision stays with the person who knows what matters.",
    role: "A document-review example",
    initials: "NO",
    blueprint: "review",
    details:
      "The document-review blueprint reads a sample document, checks four criteria and highlights a missing approval owner. It prepares the summary and waits for human review.",
  },
  {
    id: "mono",
    name: "Mono",
    category: "Connected teams",
    title: "A clearer path from request to resolution.",
    stat: "4",
    metric: "visible steps, start to finish",
    quote:
      "Knowing what happened is as useful as knowing the result. A readable history turns a black box into a process the team can improve.",
    role: "A workflow-visibility example",
    initials: "MO",
    blueprint: "leads",
    details:
      "The local lead-routing run shows four explicit stages and a final receipt. Every step is visible and the result can be exported as a JSON record.",
  },
] as const;
