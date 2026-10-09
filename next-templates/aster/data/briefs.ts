export const briefs=[
  {
    id: "willow",title: "Willow · identity direction",category: "Identity",updated: "October 5, 2026",
    summary: "A quiet identity for a ceramics studio, with room for the maker’s hand.",
    body: "Create a wordmark, a two-color palette and a simple business card for Willow. The agreed direction uses soft lettering, sage green and warm cream. Keep the wordmark readable at small sizes. Print work uses cream stock and one dark green spot color; digital applications need accessible color pairings. Present a spacing proof before final sign-off. Photography and packaging are outside this project’s scope.",
    tags: ["willow","wordmark","palette","ceramics","identity","print"]
  },
  {
    id: "kindred",title: "Kindred · website brief",category: "Web",updated: "October 4, 2026",
    summary: "A considered home for a small hospitality studio and its booking flow.",
    body: "Design a homepage, about page and booking sequence for Kindred. Use the selected still-life photography and a single primary booking action. The mobile booking flow should show date availability before asking for contact details. Copy should be conversational and specific to the studio. Keep the existing page structure through this round. This review covers design and copy; engineering and the reservation service are separate deliverables.",
    tags: ["kindred","website","homepage","booking","mobile","copy"]
  },
  {
    id: "tandem",title: "Tandem · launch kit",category: "Campaign",updated: "October 3, 2026",
    summary: "One visual direction across a launch poster, invitation and social series.",
    body: "Prepare a print poster, an invitation and digital square and portrait formats for Tandem’s launch. Keep the headline, event date and venue clear in every crop. Social headlines must sit within each format’s safe area. Print files need 3 mm bleed and the printer’s agreed color profile. Confirm event details and the RSVP destination before approving the invitation. Scheduling and distribution happen after the artwork handover.",
    tags: ["tandem","launch","campaign","poster","invitation","social","safe area"]
  },
  {
    id: "common",title: "Common · journal edition",category: "Editorial",updated: "October 2, 2026",
    summary: "An image-led journal with a deliberate sequence and generous reading space.",
    body: "Develop the cover, opening spread and contents page for Common’s first journal edition. Begin the story with the wide landscape photograph and keep captions consistent throughout. The contents page should make chapter numbers and descriptions easy to scan without excess dividers. Preserve the approved image sequence. Confirm the final page count and spine width with the printer before production. The commissioned photography remains the client’s responsibility.",
    tags: ["common","journal","editorial","cover","contents","captions","leading"]
  }
];
export const findBrief=(id: string) => briefs.find((brief) => brief.id===id);
export const searchBriefs=(query: string) => {
  const q=query.trim().toLowerCase();
  return briefs.filter((brief) => `${brief.title} ${brief.summary} ${brief.body} ${brief.tags.join(" ")}`.toLowerCase().includes(q));
};
