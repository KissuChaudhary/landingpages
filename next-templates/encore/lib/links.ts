import { site } from "@/site.config";

/** Where booking buttons go: an explicit href, or your scheduling link. */
export const bookingHref = (href?: string) => href || site.links.booking;

/** Where "Claim a free audit" goes: links.audit, or the booking link. */
export const auditHref = () => site.links.audit || site.links.booking;
