export type ReviewStatus="pending"|"approved"|"changes";
export type Review={
  id: string;
  reviewer: string;
  initials: string;
  project: string;
  version: string;
  subject: string;
  message: string;
  format: "Digital"|"Print";
  discipline: "Identity"|"Web"|"Campaign"|"Editorial";
  priority: "Normal"|"High";
  status: ReviewStatus;
  briefId: string;
  draft: string;
  hours: number;
  owner: string;
  revisionReason?: string;
};
export const reviews: Review[]=[
  {
    id: "AR-2042",reviewer: "Alex Morgan",initials: "AM",project: "Willow identity",version: "02",subject: "Wordmark · second direction",
    message: "The softer lettering feels right. Could we give the space between the two words a little more room before we sign this off?",
    format: "Digital",discipline: "Identity",priority: "Normal",status: "pending",briefId: "willow",
    draft: "We’ll open the spacing slightly and check the wordmark at small sizes. The letterforms and sage palette stay as agreed in the identity brief.",hours: 12,owner: "Nina Shah"
  },
  {
    id: "AR-2041",reviewer: "Jamie Ellis",initials: "JE",project: "Kindred website",version: "03",subject: "Homepage · a quieter opening",
    message: "The opening image is competing with the headline. Let’s try the still life we selected in the brief and keep one primary action.",
    format: "Digital",discipline: "Web",priority: "High",status: "changes",briefId: "kindred",
    draft: "The next pass will use the selected still life, with a single booking action below the introduction. We’ll keep the existing page structure.",hours: 24,owner: "Owen Reed",revisionReason: "Replace the opening image and reduce the competing actions."
  },
  {
    id: "AR-2040",reviewer: "Robin Chen",initials: "RC",project: "Tandem launch",version: "02",subject: "Launch poster · final composition",
    message: "The headline has enough room now and the date reads clearly. This version is ready for the print handover.",
    format: "Print",discipline: "Campaign",priority: "Normal",status: "approved",briefId: "tandem",
    draft: "Composition approved. The production handover will include the print-ready poster with the agreed bleed and color profile.",hours: 8,owner: "Mei Tan"
  },
  {
    id: "AR-2039",reviewer: "Sam Rivera",initials: "SR",project: "Common journal",version: "01",subject: "Opening spread · image sequence",
    message: "The wider landscape gives the story a good beginning. We’re happy with the sequence and the caption treatment.",
    format: "Print",discipline: "Editorial",priority: "Normal",status: "approved",briefId: "common",
    draft: "Opening spread approved. We’ll carry this caption treatment through the remaining pages and keep the original image order.",hours: 16,owner: "Ari James"
  },
  {
    id: "AR-2038",reviewer: "Taylor Brooks",initials: "TB",project: "Kindred website",version: "02",subject: "Booking page · mobile flow",
    message: "Can we move the date selection before the contact fields? It would be helpful to know availability before filling everything in.",
    format: "Digital",discipline: "Web",priority: "Normal",status: "pending",briefId: "kindred",
    draft: "We can lead with availability, then ask for the booking details. We’ll check the sequence on a narrow screen before the next review.",hours: 20,owner: "Owen Reed"
  },
  {
    id: "AR-2037",reviewer: "Casey Green",initials: "CG",project: "Tandem launch",version: "01",subject: "Social series · cropped headline",
    message: "On the square format, the bottom line is too close to the crop. Please move it inside the safe area before scheduling.",
    format: "Digital",discipline: "Campaign",priority: "High",status: "pending",briefId: "tandem",
    draft: "We’ll reset the headline within the square safe area and check the portrait version too. The visual direction remains unchanged.",hours: 30,owner: "Mei Tan"
  },
  {
    id: "AR-2036",reviewer: "Drew Patel",initials: "DP",project: "Willow identity",version: "02",subject: "Business card · paper and ink",
    message: "The cream stock and dark green ink are a lovely combination. Happy to proceed with this specification.",
    format: "Print",discipline: "Identity",priority: "Normal",status: "approved",briefId: "willow",
    draft: "Print specification approved. The final artwork will use the selected cream stock and one dark green spot color.",hours: 12,owner: "Nina Shah"
  },
  {
    id: "AR-2035",reviewer: "Lee Wilson",initials: "LW",project: "Common journal",version: "02",subject: "Contents page · reading order",
    message: "The chapter numbers are useful, but the descriptions need more space. Could we simplify the rules and open the leading?",
    format: "Print",discipline: "Editorial",priority: "High",status: "changes",briefId: "common",
    draft: "We’ll remove every other divider and open the description leading. The chapter numbering will remain in the same position.",hours: 36,owner: "Ari James",revisionReason: "Improve the reading order with fewer rules and more leading."
  },
  {
    id: "AR-2034",reviewer: "Jordan Hayes",initials: "JH",project: "Willow identity",version: "01",subject: "Palette · approved direction",
    message: "The sage and warm cream feel like Willow. Let’s make this the palette for the first identity release.",
    format: "Digital",discipline: "Identity",priority: "Normal",status: "approved",briefId: "willow",
    draft: "Palette approved for the first release. We’ll include accessible digital pairings and print references in the identity guide.",hours: 6,owner: "Nina Shah"
  },
  {
    id: "AR-2033",reviewer: "Jess Miller",initials: "JM",project: "Common journal",version: "01",subject: "Cover · title placement",
    message: "The title sits well against the photograph now. The quieter spine treatment works too.",
    format: "Print",discipline: "Editorial",priority: "Normal",status: "approved",briefId: "common",
    draft: "Cover and spine approved. We’ll retain this title position in the production artwork and confirm the spine width with the printer.",hours: 18,owner: "Ari James"
  },
  {
    id: "AR-2032",reviewer: "Chris Park",initials: "CP",project: "Kindred website",version: "02",subject: "About page · final copy",
    message: "The introduction sounds like us now. Please use this version for the about page.",
    format: "Digital",discipline: "Web",priority: "Normal",status: "approved",briefId: "kindred",
    draft: "About copy approved. We’ll use the reviewed introduction and keep the studio contact details below the team section.",hours: 10,owner: "Owen Reed"
  },
  {
    id: "AR-2031",reviewer: "Sky Anderson",initials: "SA",project: "Tandem launch",version: "02",subject: "Invitation · event details",
    message: "The venue and time are correct. We’ve checked the RSVP link and this invitation is ready.",
    format: "Print",discipline: "Campaign",priority: "Normal",status: "approved",briefId: "tandem",
    draft: "Invitation approved. The final handover will include the reviewed event details and the confirmed RSVP destination.",hours: 22,owner: "Mei Tan"
  }
];
export type ReviewFilters={
  query?: string;
  status?: ReviewStatus|"all";
  format?: string;
  discipline?: string;
};
export const filterReviews=(rows: Review[],filters: ReviewFilters) => rows.filter((r) => (!filters.status||filters.status==="all"||r.status===filters.status)&&
  (!filters.format||filters.format==="all"||r.format===filters.format)&&
  (!filters.discipline||filters.discipline==="all"||r.discipline===filters.discipline)&&
  `${r.id} ${r.reviewer} ${r.project} ${r.subject} ${r.message}`.toLowerCase().includes((filters.query||"").trim().toLowerCase()));
export function reviewMetrics(rows: Review[]) {
  const approved=rows.filter((r) => r.status==="approved").length;
  const sorted=rows.map((r) => r.hours).sort((a,b) => a-b);
  const middle=Math.floor(sorted.length/2);
  return {
    total: rows.length,projects: new Set(rows.map((r) => r.project)).size,approved,
    pending: rows.filter((r) => r.status==="pending").length,
    changes: rows.filter((r) => r.status==="changes").length,
    rate: rows.length? Math.round((approved/rows.length)*100):0,
    median: sorted.length? (sorted.length%2? sorted[middle]:(sorted[middle-1]+sorted[middle])/2):0
  };
}
export type ReviewEvent={
  action: "approved"|"changes";
  reviewId: string;
  detail: string;
  time: string;
};
export function updateReview(rows: Review[],id: string,action: "approved"|"changes",draft: string,owner: string,reason=""): Review[] {
  if(!draft.trim()||!owner.trim()||(action==="changes"&&reason.trim().length<5))
    return rows;
  return rows.map((review) => review.id!==id? review:{
    ...review,status: action,draft: draft.trim(),owner: owner.trim(),revisionReason: action==="changes"? reason.trim():undefined
  });
}
const quoteCell=(value: string|number) => `"${String(value).replaceAll('"','""')}"`;
export const reviewCSV=(rows: Review[]) => [
  "Review,Project,Version,Reviewer,Subject,Format,Discipline,Priority,Decision,Owner,Review hours,Response,Revision request",
  ...rows.map((r) => [r.id,r.project,r.version,r.reviewer,r.subject,r.format,r.discipline,r.priority,r.status,r.owner,r.hours,r.draft,r.revisionReason||""].map(quoteCell).join(",")),
].join("\r\n");
