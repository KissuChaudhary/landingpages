import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/site.config";
import { asset } from "@/lib/links";
import { Motion, motionBoot } from "@/components/motion/Motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import "./globals.css";
const sans = localFont({
  src: "../public/fonts/geist-latin.woff2",
  weight: "400 600",
  display: "swap",
  variable: "--font-sans",
});
const mono = localFont({
  src: "../public/fonts/geist-mono-latin.woff2",
  weight: "400 500",
  display: "swap",
  variable: "--font-mono",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.brand}` },
  description: site.description,
  icons: { icon: asset("/icon.svg") },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
  },
};
export const viewport: Viewport = { themeColor: "#101b2a" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.wipe-line::after{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <Motion />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
