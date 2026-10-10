import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";
const sans = localFont({
  src: "../public/fonts/geist-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-sans",
});
const mono = localFont({
  src: "../public/fonts/geist-mono-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-mono",
});
export const metadata: Metadata = {
  title: { default: site.title, template: `%s — ${site.brand}` },
  description: site.description,
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  icons: { icon: asset("/icon.svg") },
  openGraph: {
    title: site.title,
    description: site.description,
    ...(site.url
      ? {
          images: [
            { url: asset("/images/hero.webp"), width: 1672, height: 941 },
          ],
        }
      : {}),
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
