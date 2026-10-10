import type { Metadata, Viewport } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/site.config";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";
const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
export const metadata: Metadata = {
  title: { default: site.meta.title, template: `%s — ${site.brand}` },
  description: site.meta.description,
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg` },
};
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
