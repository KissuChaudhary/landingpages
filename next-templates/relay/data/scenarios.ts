import type { ScenarioId, SourceId } from "@/site.config";
export type Scenario = {
  id: ScenarioId;
  title: string;
  request: string;
  file: string;
  defaults: SourceId[];
  summary: string;
};
export type Result = {
  title: string;
  introduction: string;
  items: { title: string; text: string }[];
  conclusion: string;
};
export const scenarios: Scenario[] = [
  {
    id: "week",
    title: "A little room this week",
    request: "Help me make room for my side project this week.",
    file: "a-little-room.txt",
    defaults: ["notes", "calendar"],
    summary: "A lighter plan for the thing you want to make.",
  },
  {
    id: "research",
    title: "A clearer way to keep notes",
    request: "Help me compare a few ways to keep my ideas together.",
    file: "a-clearer-way.txt",
    defaults: ["notes", "reading"],
    summary: "Three approaches. Enough clarity to choose.",
  },
  {
    id: "draft",
    title: "A thoughtful little update",
    request: "Turn my scattered notes into a short project update.",
    file: "a-thoughtful-update.txt",
    defaults: ["notes"],
    summary: "A rough thought, made ready to share.",
  },
];
export function getScenario(id: ScenarioId) {
  return scenarios.find((s) => s.id === id) || scenarios[0];
}
export function prepareResult(id: ScenarioId, sources: SourceId[]): Result {
  const notes = sources.includes("notes"),
    calendar = sources.includes("calendar"),
    reading = sources.includes("reading");
  if (id === "week")
    return {
      title: "A little room this week",
      introduction:
        "Progress can fit around the rest of your life. Start with one small thing you can finish.",
      items: [
        {
          title: calendar
            ? "Tuesday · 30 quiet minutes"
            : "Find a quiet half hour",
          text: notes
            ? "Sketch the first screen for your reading journal. Keep it to the one interaction that matters."
            : "Choose one small piece of your project and give it a clear finish line.",
        },
        {
          title: calendar
            ? "Thursday · One protected hour"
            : "Leave room for a second session",
          text: "Build the smallest version. Stop when it works, even if there’s more you could add.",
        },
        {
          title: "Before the weekend",
          text: reading
            ? "Compare your first version with the ideas in your reading list. Keep one useful improvement."
            : "Try what you made. Write down the next small step so it’s easy to return.",
        },
      ],
      conclusion: calendar
        ? "Your other plans stay where they are. These are suggested blocks, not calendar events."
        : "No calendar context included. Pick the times that suit your actual week.",
    };
  if (id === "research")
    return {
      title: "A clearer way to keep notes",
      introduction: notes
        ? "You want a place for unfinished ideas, rather than another system to maintain."
        : "Start with how you’ll return to an idea, then choose a format.",
      items: [
        {
          title: "A running document",
          text: "Low setup. One place to search. Useful when getting the thought down matters most.",
        },
        {
          title: "A small collection of notes",
          text: "One idea per note. Easier to connect related thoughts, with a little more organizing.",
        },
        {
          title: "A paper notebook",
          text: reading
            ? "Your saved reading highlights the value of fewer distractions. Paper makes that boundary simple."
            : "A deliberate place away from the screen. Add a small index so good ideas are easy to find.",
        },
      ],
      conclusion: calendar
        ? "Try one approach during a free block this week before reorganizing everything."
        : "A prepared comparison of three approaches; no live web search was performed.",
    };
  return {
    title: "A thoughtful little update",
    introduction: notes
      ? "A small update from the reading journal project:"
      : "A simple update to adapt to your own project:",
    items: [
      {
        title: "What’s taking shape",
        text: notes
          ? "I’ve been working on a quieter place to keep the thoughts a book leaves behind. The first screen is beginning to feel right."
          : "The first version is taking shape. I’m keeping the scope small enough to finish and try.",
      },
      {
        title: "What comes next",
        text: calendar
          ? "I have a little time set aside on Thursday to make the first interaction work. After that, I’d love to hear what feels useful."
          : "Next, I’m making one interaction work from start to finish. Then I’ll share something small you can try.",
      },
      ...(reading
        ? [
            {
              title: "An idea I’m keeping",
              text: "The most useful thing I’ve been reading: make it easy to come back. That’s guiding this first version.",
            },
          ]
        : []),
    ],
    conclusion: "A prepared draft. Nothing is published or sent.",
  };
}
export function resultText(result: Result) {
  return [
    result.title,
    result.introduction,
    ...result.items.map((item) => `${item.title}\n${item.text}`),
    result.conclusion,
  ].join("\n\n");
}
