import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const font = localFont({
  src: "../public/fonts/Manrope-latin.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-studio",
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
    <html lang="en" className={font.variable}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
