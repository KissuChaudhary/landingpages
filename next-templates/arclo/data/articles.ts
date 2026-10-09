export const articles = [
  {
    slug: "a-small-start",
    title: "A small start can change your whole day.",
    excerpt:
      "Three everyday workflows worth automating first — and how to find the one that makes the biggest difference.",
    author: "Maya Chen",
    category: "Getting started",
    read: "5 min read",
    art: "orbit",
    person: 1,
    sections: [
      {
        heading: "Find the work that keeps coming back.",
        text: "Your first automation doesn’t need to transform the business. Look for a task that happens often, follows a familiar pattern and asks you to move information from one place to another. A weekly update, an incoming enquiry or a welcome checklist is usually a better starting point than a complicated strategic decision.",
      },
      {
        heading: "Give the flow a clear beginning and end.",
        text: "Write down the trigger, the information it needs and the outcome you expect. For a lead review, the trigger might be a new form response. The context could be team size and the problem they want to solve. The outcome is a prepared summary of the people who meet your criteria.",
      },
      {
        heading: "Keep a person in the loop.",
        text: "Start by preparing an output for someone to review. A draft is easier to inspect than an automatic message. Use a few representative records, including one that should not match, to check whether your instructions are clear. Refine the criteria when the result surprises you.",
      },
      {
        heading: "Build on what you learn.",
        text: "After the first workflow is useful, notice where the next handoff happens. A qualified lead might need a follow-up brief. A daily summary might become a team update. Add one step at a time, and keep the source and result visible so the flow stays understandable.",
      },
    ],
  },
  {
    slug: "better-instructions",
    title: "Good agents start with good instructions.",
    excerpt:
      "A practical way to turn a vague idea into a clear job, useful context and a result you can actually review.",
    author: "Alex Rivera",
    category: "Agent design",
    read: "6 min read",
    art: "stack",
    person: 0,
    sections: [
      {
        heading: "Describe the job before the personality.",
        text: "A useful instruction names the work to be done. Instead of asking an agent to be helpful, ask it to group three sample messages into priorities, updates and things that can wait. The smaller job is easier to evaluate and gives you a concrete place to improve.",
      },
      {
        heading: "Make the context explicit.",
        text: "Tell the agent which records it can use and what those records represent. Avoid asking it to fill missing information with guesses. If the source doesn’t contain an answer, make room in the output to say so. This keeps the workflow honest and makes a review more straightforward.",
      },
      {
        heading: "Specify what a good result looks like.",
        text: "A numbered checklist, a short digest and a qualified lead list serve different purposes. Define a format that suits the next person or step. For a welcome checklist, each item should describe an action a new teammate can complete. For a digest, each line should help someone decide where to look first.",
      },
      {
        heading: "Test the edges, too.",
        text: "Check a record that clearly matches, one that clearly doesn’t and one near the boundary. In the example lead workflow, changing the minimum team size lets you see the effect immediately. Small, visible tests help you understand the flow before you connect more moving parts.",
      },
    ],
  },
  {
    slug: "connected-work",
    title: "Your tools are better when they work together.",
    excerpt:
      "Make the space between your apps feel smaller, with fewer handoffs and a clearer path from idea to outcome.",
    author: "David Ellis",
    category: "Team workflows",
    read: "4 min read",
    art: "connections",
    person: 3,
    sections: [
      {
        heading: "Pay attention to the handoffs.",
        text: "Many repetitive tasks live between tools. An enquiry arrives in a form, someone copies it into a sheet and another person writes a team update. Before adding another application, map those handoffs. The useful opportunity is often the path between systems you already use.",
      },
      {
        heading: "Start with one source of context.",
        text: "Choose where the workflow reads its information. A smaller context is easier to keep current and easier to explain. When an agent prepares a result, include enough of the original record for a reviewer to understand where the conclusion came from.",
      },
      {
        heading: "Treat an action as a separate decision.",
        text: "Preparing a summary and sending it are different steps. Keep the output visible before connecting a delivery action. In the Arclo examples, runs prepare local results; they never send messages or connect accounts. Your application can add the appropriate authentication and approval flow when you’re ready.",
      },
      {
        heading: "Make ownership obvious.",
        text: "A connected workflow still needs someone to care for it. Decide who reviews failures, updates the instructions and checks whether the output remains useful. Clear ownership is often more valuable than another feature, especially when several teams share a flow.",
      },
    ],
  },
];
