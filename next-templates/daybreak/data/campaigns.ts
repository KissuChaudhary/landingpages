export type Period = "month" | "quarter";
export type Channel = "All channels" | "Search" | "Social" | "Email";
export const channels: Channel[] = [
  "All channels",
  "Search",
  "Social",
  "Email",
];
export const campaigns = [
  {
    name: "A brighter beginning",
    channel: "Search",
    spend: 4200,
    revenue: 18480,
    conversions: 168,
    trend: 14.2,
  },
  {
    name: "The studio collection",
    channel: "Social",
    spend: 3600,
    revenue: 11880,
    conversions: 132,
    trend: 8.5,
  },
  {
    name: "A familiar hello",
    channel: "Email",
    spend: 850,
    revenue: 7650,
    conversions: 85,
    trend: 21.4,
  },
  {
    name: "Find your next favorite",
    channel: "Search",
    spend: 2400,
    revenue: 8160,
    conversions: 96,
    trend: 6.3,
  },
  {
    name: "New season, new ideas",
    channel: "Social",
    spend: 1900,
    revenue: 4560,
    conversions: 57,
    trend: -3.1,
  },
] as const;
export const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
export function campaignRows(
  period: Period,
  channel: Channel = "All channels",
) {
  return campaigns
    .map((c, i) => ({
      ...c,
      spend: period === "quarter" ? c.spend * 3 : c.spend,
      revenue:
        period === "quarter"
          ? Math.round(c.revenue * (2.6 + i * 0.1))
          : c.revenue,
      conversions:
        period === "quarter"
          ? Math.round(c.conversions * (2.7 + i * 0.1))
          : c.conversions,
    }))
    .filter((c) => channel === "All channels" || c.channel === channel);
}
export function totals(period: Period, channel: Channel = "All channels") {
  const rows = campaignRows(period, channel);
  const spend = rows.reduce((sum, c) => sum + c.spend, 0);
  const revenue = rows.reduce((sum, c) => sum + c.revenue, 0);
  return {
    spend,
    revenue,
    conversions: rows.reduce((sum, c) => sum + c.conversions, 0),
    roas: revenue / spend,
  };
}
export function answerFor(question: string, period: Period = "month") {
  const rows = campaignRows(period);
  const strongest = [...rows].sort(
    (a, b) => b.revenue / b.spend - a.revenue / a.spend,
  )[0];
  const weakest = [...rows].sort(
    (a, b) => a.revenue / a.spend - b.revenue / b.spend,
  )[0];
  const total = totals(period);
  if (/best|strong|winning|top/.test(question.toLowerCase()))
    return `${strongest.name} leads with ${(strongest.revenue / strongest.spend).toFixed(1)}× return on spend. It generated ${money(strongest.revenue)} from ${money(strongest.spend)}. Use it as a starting point for your next test.`;
  if (/report|summary|week/.test(question.toLowerCase()))
    return `Your ${period === "quarter" ? "quarter" : "month"} in focus: ${money(total.revenue)} in attributed revenue, ${money(total.spend)} in spend and ${total.conversions} conversions. The blended return is ${total.roas.toFixed(1)}×. Review attribution before making a budget change.`;
  return `${strongest.channel} is your most efficient example channel. ${strongest.name} returns ${(strongest.revenue / strongest.spend).toFixed(1)}×, while ${weakest.name} returns ${(weakest.revenue / weakest.spend).toFixed(1)}×. Review the weaker creative before moving budget. This recommendation comes from the sample campaign table.`;
}
