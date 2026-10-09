import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/site.config";
import { SiteShell } from "@/components/SiteShell";
import { asset } from "@/lib/urls";
import "./globals.css";
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
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
    <html lang="en">
      <body className={manrope.variable}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
