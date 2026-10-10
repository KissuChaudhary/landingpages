export const revenue = {
  quarter: {
    label: "Last quarter",
    total: 86400,
    change: 18.6,
    months: ["Apr", "May", "Jun"],
    values: [23200, 28600, 34600],
    renewals: 12,
    expansion: 8400,
  },
  half: {
    label: "Last 6 months",
    total: 148800,
    change: 24.2,
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [16400, 20800, 25200, 23200, 28600, 34600],
    renewals: 23,
    expansion: 14600,
  },
};
export const accounts = [
  {
    name: "Layers",
    initials: "L",
    person: "Maya Chen",
    health: "Healthy",
    value: "$24,000",
    date: "Aug 12",
    color: "sage",
  },
  {
    name: "Quotient",
    initials: "Q",
    person: "Daniel Reed",
    health: "Healthy",
    value: "$18,000",
    date: "Aug 21",
    color: "peach",
  },
  {
    name: "Circooles",
    initials: "C",
    person: "Sara Ali",
    health: "Check in",
    value: "$12,000",
    date: "Sep 04",
    color: "lilac",
  },
];
export const followups = [
  {
    title: "Share the next-quarter plan",
    account: "Layers",
    owner: "MC",
    date: "Today",
    done: true,
  },
  {
    title: "Check in after the launch",
    account: "Circooles",
    owner: "SA",
    date: "Today",
    done: false,
  },
  {
    title: "Schedule the renewal conversation",
    account: "Quotient",
    owner: "DR",
    date: "Tomorrow",
    done: false,
  },
];
