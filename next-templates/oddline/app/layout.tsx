import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/site.config";
import { asset } from "@/lib/links";
import "./globals.css";
const display = localFont({
  src: "../public/fonts/space-grotesk-latin.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-display",
});
const sans = localFont({
  src: "../public/fonts/inter-latin.woff2",
  weight: "400 600",
  display: "swap",
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  icons: { icon: asset("/icon.svg") },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
