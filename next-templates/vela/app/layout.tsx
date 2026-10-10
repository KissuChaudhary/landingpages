import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/site.config";
import { path } from "@/lib/urls";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});
export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: { default: site.title, template: `%s — ${site.brand}` },
  description: site.description,
  icons: { icon: path("/icon.svg") },
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
    <html lang="en" className={manrope.variable}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
