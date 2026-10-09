export const workflows = [
  {
    id: "leads",
    label: "Qualify a lead",
    trigger: "New form response",
    agent: "Lead qualification",
    action: "Prepare team update",
    tool: "Team channel",
    prompt:
      "Find incoming leads with a clear automation need and a team that matches your minimum size.",
    source: [
      {
        name: "Avery at Fieldwork",
        team: 24,
        need: "Automate weekly customer reports",
      },
      { name: "Jordan at Loomhouse", team: 3, need: "Explore the platform" },
      {
        name: "Morgan at Offset",
        team: 18,
        need: "Qualify incoming support tickets",
      },
    ],
  },
  {
    id: "inbox",
    label: "Summarize an inbox",
    trigger: "Every weekday at 9",
    agent: "Inbox digest",
    action: "Prepare daily summary",
    tool: "Email draft",
    prompt:
      "Group the sample inbox into urgent tasks, updates and things that can wait.",
    source: [
      {
        name: "Client review",
        team: 0,
        need: "Urgent: review the proposal before 12pm",
      },
      {
        name: "Design team",
        team: 0,
        need: "Update: new homepage concepts ready",
      },
      {
        name: "Weekly newsletter",
        team: 0,
        need: "Read later: industry roundup",
      },
    ],
  },
  {
    id: "onboarding",
    label: "Welcome a teammate",
    trigger: "New teammate added",
    agent: "Onboarding assistant",
    action: "Create welcome checklist",
    tool: "Team document",
    prompt:
      "Create a first-day checklist for a new teammate using the sample tasks.",
    source: [
      { name: "Workspace", team: 0, need: "Set up email and workspace access" },
      {
        name: "People",
        team: 0,
        need: "Meet your buddy and book team introductions",
      },
      {
        name: "Context",
        team: 0,
        need: "Read the product brief and team handbook",
      },
    ],
  },
];
export type Workflow = (typeof workflows)[number];
export function executeWorkflow(workflow: Workflow, minimumTeam = 10) {
  if (workflow.id === "leads") {
    const qualified = workflow.source.filter(
      (item) => item.team >= minimumTeam && /automate|qualify/i.test(item.need),
    );
    return {
      title: `${qualified.length} qualified lead${qualified.length === 1 ? "" : "s"}`,
      items: qualified.map(
        (item) => `${item.name} · ${item.team} people — ${item.need}`,
      ),
      processed: workflow.source.length,
      matched: qualified.length,
    };
  }
  if (workflow.id === "inbox")
    return {
      title: "Your morning, organized",
      items: workflow.source.map(
        (item) =>
          `${item.need.startsWith("Urgent") ? "Priority" : item.need.startsWith("Update") ? "Update" : "Later"}: ${item.name} — ${item.need.split(": ")[1]}`,
      ),
      processed: workflow.source.length,
      matched: workflow.source.length,
    };
  return {
    title: "A thoughtful first day",
    items: workflow.source.map((item, index) => `${index + 1}. ${item.need}`),
    processed: workflow.source.length,
    matched: workflow.source.length,
  };
}
