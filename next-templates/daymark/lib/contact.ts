export interface Brief {
  name: string;
  email: string;
  company: string;
  service: string;
  engagement: string;
  budget: string;
  message: string;
}
export function briefText(brief: Brief, brand = "studio") {
  return [
    "A new " + brand + " conversation",
    "",
    "Name: " + brief.name.trim(),
    "Email: " + brief.email.trim(),
    "Company: " + (brief.company.trim() || "Not specified"),
    "Interested in: " + (brief.service || "Let's discuss"),
    "Engagement: " + (brief.engagement || "Let's discuss"),
    "Budget: " + (brief.budget || "Let's discuss"),
    "",
    brief.message.trim(),
  ].join("\n");
}
export function emailDraft(email: string, brief: Brief, brand = "studio") {
  return (
    "mailto:" +
    email +
    "?subject=" +
    encodeURIComponent(
      "A new project — " + (brief.company.trim() || brief.name.trim()),
    ) +
    "&body=" +
    encodeURIComponent(briefText(brief, brand))
  );
}
