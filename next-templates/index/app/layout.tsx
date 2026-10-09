import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Geist_Mono } from "next/font/google";
import { site } from "@/site.config";
import "./globals.css";
const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg` },
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    type: "website",
    siteName: site.brand,
  },
};
export const viewport: Viewport = {
  themeColor: "#f7f6f2",
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
      data-motion="off"
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
