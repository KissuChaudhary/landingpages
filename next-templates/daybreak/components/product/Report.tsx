import { site } from "@/site.config";
import { campaignRows, type Period, type Channel } from "@/data/campaigns";
import { csvCell, downloadText } from "@/lib/download";
export function reportCSV(period: Period, channel: Channel = "All channels") {
  return [
    "Campaign,Channel,Spend USD,Revenue USD,Conversions,Return on spend",
    ...campaignRows(period, channel).map((c) =>
      [
        c.name,
        c.channel,
        c.spend,
        c.revenue,
        c.conversions,
        (c.revenue / c.spend).toFixed(2),
      ]
        .map(csvCell)
        .join(","),
    ),
  ].join("\n");
}
export function exportReport(
  period: Period,
  channel: Channel = "All channels",
) {
  downloadText(
    `${site.brand.toLowerCase()}-${period}-report.csv`,
    reportCSV(period, channel),
    "text/csv;charset=utf-8",
  );
}
