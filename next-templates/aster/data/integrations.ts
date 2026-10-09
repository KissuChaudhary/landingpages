export const integrations=[
  {
    id: "design",name: "Design files",category: "Creative work",icon: "bag",text: "Keep a design reference and its version beside the review.",fields: ["Selected file reference","Version and preview URL","Project association"],scope: "Let the project owner choose which files can be read. Your production connector must respect file permissions and distinguish a preview from the editable original."
  },
  {
    id: "storage",name: "Cloud storage",category: "Creative work",icon: "book",text: "Bring approved project assets into a considered handover.",fields: ["Selected folder reference","Asset names and links","File revision dates"],scope: "Request access to the selected project folder. Keep private drafts outside the shared review and apply your service’s access controls to every asset."
  },
  {
    id: "email",name: "Email",category: "Communication",icon: "mail",text: "Invite a client to the right review, with a clear next action.",fields: ["Recipient and project reference","Review destination","Notification preference"],scope: "A live integration needs your own invitation and notification flow. Explain who receives a message and avoid including private project content in previews."
  },
  {
    id: "team",name: "Team chat",category: "Communication",icon: "people",text: "Give an agreed revision a place in the studio’s daily workflow.",fields: ["Selected team destination","Revision owner","Review link and summary"],scope: "Choose the destination deliberately. Connect your own approval and notification service before sharing project feedback outside the workspace."
  },
  {
    id: "calendar",name: "Calendar",category: "Planning",icon: "chat",text: "Set aside time for the next review round.",fields: ["Review session title","Participants and time","Project reference"],scope: "Use the calendar provider’s consent flow and make availability permissions explicit. Check participants before creating or updating a live session."
  },
  {
    id: "webhooks",name: "Webhooks",category: "Planning",icon: "workflow",text: "Pass an approval or revision request into your project system.",fields: ["Review decision and version","Event timestamp","Project and workspace reference"],scope: "Validate event signatures and identity in your backend. Deduplicate events and keep credentials on the server when connecting production workflows."
  }
];
