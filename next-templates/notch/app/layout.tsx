import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { MotionProvider, motionBootScript } from "@/components/Motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { HashLinks } from "@/components/HashLinks";
import "./globals.css";

const geist = localFont({ src: "../public/fonts/geist-latin.woff2", weight: "400 600", display: "swap", variable: "--font-geist" });
const geistMono = localFont({ src: "../public/fonts/geist-mono-latin.woff2", weight: "400 500", display: "swap", variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: { default: site.title, template: `%s · ${site.brand}` },
  description: site.description,
  icons: { icon: asset("/icon.svg") },
  openGraph: { title: site.title, description: site.description, type: "website" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>
          <HashLinks />
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navigation />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
