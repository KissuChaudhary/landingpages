export const integrations = [
  {
    id: "search",
    name: "Search Ads",
    category: "Advertising",
    mark: "search",
    color: "#72a1ef",
    description:
      "Bring campaign spend, clicks and attributed conversions into a shared view.",
    fields: ["Campaign", "Spend", "Conversions", "Revenue"],
  },
  {
    id: "social",
    name: "Social Ads",
    category: "Advertising",
    mark: "arcs",
    color: "#bd91db",
    description:
      "Compare creative performance and campaign returns across your social activity.",
    fields: ["Creative", "Impressions", "Spend", "Conversions"],
  },
  {
    id: "analytics",
    name: "Web Analytics",
    category: "Analytics",
    mark: "bars",
    color: "#efa943",
    description:
      "Add page activity and conversion events to the campaign conversation.",
    fields: ["Page", "Sessions", "Events", "Conversion rate"],
  },
  {
    id: "mail",
    name: "Email Studio",
    category: "Communication",
    mark: "mail",
    color: "#e77470",
    description:
      "Bring lifecycle campaigns and email performance into your weekly review.",
    fields: ["Campaign", "Delivered", "Clicks", "Revenue"],
  },
  {
    id: "crm",
    name: "Customer CRM",
    category: "Sales",
    mark: "tiles",
    color: "#69b9a0",
    description:
      "Connect campaign activity to the opportunities your team is working on.",
    fields: ["Opportunity", "Stage", "Owner", "Value"],
  },
  {
    id: "sheets",
    name: "Spreadsheets",
    category: "Productivity",
    mark: "sheet",
    color: "#8fac68",
    description:
      "Keep a simple CSV source alongside your connected platform data.",
    fields: ["Date", "Channel", "Spend", "Revenue"],
  },
  {
    id: "chat",
    name: "Team Chat",
    category: "Communication",
    mark: "diamonds",
    color: "#d38daf",
    description:
      "Prepare a concise update for your team to review before sharing.",
    fields: ["Workspace", "Channel", "Message", "Approval"],
  },
] as const;
