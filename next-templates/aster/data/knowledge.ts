export const knowledge = [
  {
    id: "delivery",
    title: "Delivery and order updates",
    category: "Orders",
    updated: "October 5, 2026",
    summary:
      "Find an order, explain its dispatch window and help a customer follow the delivery.",
    body: "Orders normally leave the studio within two working days. The dispatch email contains the tracking link. If the delivery estimate has passed, ask a teammate to review the order before promising a replacement.",
    tags: ["order", "shipping", "tracking", "delivery"],
  },
  {
    id: "returns",
    title: "Returns and refunds",
    category: "Policies",
    updated: "October 4, 2026",
    summary:
      "Give a customer the next step for a return, with a person involved where needed.",
    body: "Unused items can be returned within 30 days of delivery. Start with the order reference and a short reason. Billing disputes, duplicate charges and exceptions need a teammate to review the account. Do not promise that a refund has been paid without confirmation.",
    tags: ["return", "refund", "billing", "charge"],
  },
  {
    id: "access",
    title: "Getting back into your account",
    category: "Accounts",
    updated: "October 3, 2026",
    summary:
      "Help a customer find the usual recovery path without asking for a password.",
    body: "Use the reset link on the sign-in page to request a recovery email. Check spam and confirm the email address is the one used for the account. Never ask a customer to share a password or one-time code. If recovery is unsuccessful, hand the conversation to the account team.",
    tags: ["login", "password", "account", "email"],
  },
  {
    id: "care",
    title: "Looking after your purchase",
    category: "Product",
    updated: "October 2, 2026",
    summary:
      "A few useful care notes for everyday questions about the sample product.",
    body: "Clean with a soft damp cloth and allow the item to dry naturally. Keep it away from prolonged direct heat. If something arrives damaged or does not work as expected, collect the order reference and a description, then ask the product team to review it.",
    tags: ["care", "product", "damaged", "clean"],
  },
];
export const findKnowledge = (id: string) =>
  knowledge.find((article) => article.id === id);
export const searchKnowledge = (query: string) => {
  const q = query.trim().toLowerCase();
  return knowledge.filter((article) =>
    `${article.title} ${article.summary} ${article.body} ${article.tags.join(" ")}`
      .toLowerCase()
      .includes(q),
  );
};
