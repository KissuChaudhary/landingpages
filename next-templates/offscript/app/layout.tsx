import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/site.config";
import { asset } from "@/lib/links";
import "./globals.css";

const manrope = localFont({
  src: "../public/fonts/manrope-latin.woff2",
  display: "swap",
  variable: "--font-sans",
  weight: "200 800",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  icons: { icon: asset("/icon.svg") },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    images: [
      {
        url: asset("/images/sidequest.webp"),
        width: 1536,
        height: 1024,
        alt: "Offscript — a world with a point of view",
      },
    ],
  },
};
export const viewport: Viewport = { themeColor: "#f5f4f0" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
