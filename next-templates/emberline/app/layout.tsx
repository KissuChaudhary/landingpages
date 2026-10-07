import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";

import "./globals.css";

// Self-hosted at build time by next/font: no render-blocking request to Google, no layout shift.
const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-face",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-serif-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emberline: AI SaaS landing page template",
  description:
    "A dark, grid-framed landing page template for AI products. Built with Next.js, Tailwind CSS v4 and zero image dependencies.",
};

export const viewport: Viewport = {
  themeColor: "#060504",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
