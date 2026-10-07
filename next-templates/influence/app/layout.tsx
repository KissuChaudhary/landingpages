import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Playfair_Display } from "next/font/google";

import { siteConfig } from "@/site.config";

import "./globals.css";

// Self-hosted at build time by next/font: no render-blocking request to Google, no layout shift.
const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-face",
  display: "swap",
});

// Used only for the one italic word in a headline.
const serif = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-serif-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: "#fcfcfa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
