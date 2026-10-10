export type Brief = {
  name: string;
  email: string;
  space: string;
  light: string;
  plant: string;
  message: string;
  consent: boolean;
};
export function briefText(brief: Brief) {
  return [
    "BOTANICAL PROJECT BRIEF",
    "",
    `Name: ${brief.name}`,
    `Email: ${brief.email}`,
    `Space: ${brief.space}`,
    `Light: ${brief.light}`,
    `Plant interest: ${brief.plant || "Open to suggestions"}`,
    "",
    "ABOUT THE SPACE",
    brief.message,
    "",
    `Permission to contact about this enquiry: ${brief.consent ? "Yes" : "No"}`,
  ].join("\n");
}
export function downloadBrief(brief: Brief) {
  const url = URL.createObjectURL(
    new Blob([briefText(brief)], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "botanical-project-brief.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
