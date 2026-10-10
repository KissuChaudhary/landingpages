import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, Geist_Mono } from "next/font/google";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { MotionProvider, motionBootScript } from "@/components/Motion";
import { HashLinks } from "@/components/HashLinks";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap", variable: "--font-display", axes: ["opsz"] });
const body = Figtree({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: site.title, template: `%s · ${site.brand}` },
  description: site.description,
  icons: { icon: asset("/icon.svg") },
  openGraph: { title: site.title, description: site.description, type: "website" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
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
