import type { Metadata, Viewport } from "next";
import { Merriweather, Inter } from "next/font/google";
import { site } from "@/site.config";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";
const serif = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
export const metadata: Metadata = {
  title: { default: site.meta.title, template: `%s — ${site.brand}` },
  description: site.meta.description,
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg` },
};
export const viewport: Viewport = {
  themeColor: "#ffffff",
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
      className={`${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
