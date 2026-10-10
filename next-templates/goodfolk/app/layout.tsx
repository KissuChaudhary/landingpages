import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import "./globals.css";
const font = localFont({
  src: "../public/fonts/manrope-latin.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-sans",
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
            { url: asset("/images/creator.webp"), width: 1024, height: 1536 },
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
    <html lang="en" className={font.variable}>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
