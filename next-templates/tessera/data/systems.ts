export const systems = [
  {
    slug: "a-clearer-first-response",
    title: "A clearer first response.",
    category: "CUSTOMER OPERATIONS",
    color: "mint",
    number: "01",
    summary:
      "A support request becomes a source-backed draft, with the right context already attached.",
    nodes: ["New request", "Find context", "Draft response", "Human review"],
    before: "An agent searches three tools before they can begin writing.",
    after:
      "Relevant history and a draft arrive together. The agent checks, edits and sends.",
    scope: [
      "Ticket intake",
      "Knowledge retrieval",
      "Drafting assistance",
      "Approval queue",
    ],
    sections: [
      {
        title: "Begin with the agent’s working day",
        body: "The starting point is the moment a request arrives. Which details matter? Where are they stored? What does the person need to verify before they reply? Mapping these questions keeps the system grounded in the actual work.",
      },
      {
        title: "Keep the evidence close",
        body: "A suggested response should travel with its sources. The concept brings relevant account context, help articles and prior interactions into one reviewable view, so the agent can follow the reasoning and correct it.",
      },
      {
        title: "Design the exception path",
        body: "Missing information, conflicting sources and sensitive requests need a different route. Those cases remain visible in a human review queue. No customer message is sent without the agreed approval.",
      },
    ],
  },
  {
    slug: "knowledge-with-a-way-back",
    title: "Knowledge with a way back.",
    category: "INTERNAL KNOWLEDGE",
    color: "lilac",
    number: "02",
    summary:
      "A question finds a useful answer, the document behind it and the person who owns it.",
    nodes: [
      "Team question",
      "Retrieve sources",
      "Check access",
      "Cited answer",
    ],
    before:
      "The answer exists somewhere, but finding it interrupts several people.",
    after:
      "The team can ask a question and follow the answer back to a maintained source.",
    scope: [
      "Document preparation",
      "Search & retrieval",
      "Source citations",
      "Access checks",
    ],
    sections: [
      {
        title: "A useful index starts with useful sources",
        body: "Duplicated documents and outdated guidance do not become clearer when a model reads them. This concept starts with source ownership, a sensible document structure and a process for keeping knowledge current.",
      },
      {
        title: "Give the answer a way back",
        body: "Each answer points to the material it uses. Where a source is incomplete or inconsistent, the system says so. The aim is to shorten the search while keeping the original context within reach.",
      },
      {
        title: "Respect the existing boundaries",
        body: "People should only retrieve information they are permitted to see. Access rules and document changes belong in the operating design, alongside the question-and-answer experience.",
      },
    ],
  },
  {
    slug: "a-brief-worth-reading",
    title: "A brief worth reading.",
    category: "DECISION SUPPORT",
    color: "blue",
    number: "03",
    summary:
      "The weekly update becomes a concise brief of changes, sources and questions worth discussing.",
    nodes: [
      "Source updates",
      "Compare changes",
      "Build brief",
      "Team discussion",
    ],
    before: "A meeting begins with a long search for what changed.",
    after:
      "A reviewed brief puts the changes and their sources on the table first.",
    scope: [
      "Source connections",
      "Change detection",
      "Brief generation",
      "Review workflow",
    ],
    sections: [
      {
        title: "Choose the questions before the dashboard",
        body: "The most useful operational brief answers the questions a team already asks. This concept connects a small set of agreed sources and organizes updates around those decisions.",
      },
      {
        title: "Show what changed and why it matters",
        body: "The brief separates observed changes from interpretation. Each item links to its source, includes the relevant period and makes assumptions explicit, giving a reviewer something concrete to check.",
      },
      {
        title: "A starting point for judgment",
        body: "A summary cannot replace the context of the people doing the work. The reviewed brief is an input to discussion, with uncertain items turned into questions rather than confident conclusions.",
      },
    ],
  },
];
