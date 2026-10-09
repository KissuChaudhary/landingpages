import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/site.config";
import { SiteShell } from "@/components/SiteShell";
import { asset } from "@/lib/urls";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
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
      <body className={inter.variable}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
