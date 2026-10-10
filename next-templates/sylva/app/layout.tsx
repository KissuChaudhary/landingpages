import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import "./globals.css";
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});
const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: { default: site.title, template: `%s — ${site.brand}` },
  description: site.description,
  icons: { icon: asset("/icon.svg") },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
