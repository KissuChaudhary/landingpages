export const integrations = [
  {
    id: "email",
    name: "Email",
    category: "Conversations",
    icon: "mail",
    text: "Keep questions from the inbox in the same review queue.",
    fields: [
      "Message body and subject",
      "Customer reference",
      "Thread and reply context",
    ],
    scope:
      "Review the message permissions your provider requires. Only request the fields your support workflow needs.",
  },
  {
    id: "chat",
    name: "Live chat",
    category: "Conversations",
    icon: "chat",
    text: "Bring a live conversation and its recent context into view.",
    fields: ["Conversation reference", "Recent messages", "Source channel"],
    scope:
      "Use your provider's account consent flow. A real connection must explain when messages are read and when replies can be sent.",
  },
  {
    id: "knowledge",
    name: "Help center",
    category: "Knowledge",
    icon: "book",
    text: "Give suggested replies a clear, useful source.",
    fields: ["Published article title", "Article content", "Revision date"],
    scope:
      "Choose approved articles for retrieval. Exclude drafts or internal documents that should not be used in customer answers.",
  },
  {
    id: "commerce",
    name: "Commerce",
    category: "Context",
    icon: "bag",
    text: "Keep an order reference beside an order question.",
    fields: ["Order reference", "Dispatch status", "Relevant product details"],
    scope:
      "Limit access to the order fields needed for support. Confirm the customer's identity using your own product flow.",
  },
  {
    id: "team",
    name: "Team chat",
    category: "Context",
    icon: "people",
    text: "Give an internal handoff a clear owner and reason.",
    fields: ["Team or queue reference", "Handoff summary", "Ticket link"],
    scope:
      "Select the internal destination deliberately. Connect your own approval and notification flow before enabling live messages.",
  },
  {
    id: "webhooks",
    name: "Webhooks",
    category: "Workflow",
    icon: "workflow",
    text: "Give the useful ticket events a place in your workflow.",
    fields: ["Ticket state change", "Event timestamp", "Workspace reference"],
    scope:
      "Validate signatures and event identity in your backend. Keep credentials on the server and explain the event destinations.",
  },
];
