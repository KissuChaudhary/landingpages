import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans, Geist_Mono } from "next/font/google";
import { site } from "@/site.config";
import { asset } from "@/lib/links";
import { MotionProvider, motionBootScript } from "@/components/motion/Motion";
import { HashLinks } from "@/components/motion/HashLinks";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import "./globals.css";

// Funnel Display for headlines and figures, Funnel Sans for reading, Geist Mono for code.
const display = Funnel_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap", variable: "--font-funnel-display" });
const sans = Funnel_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-funnel-sans" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-geist-mono" });

export const metadata: Metadata = {
  ...(site.meta.url ? { metadataBase: new URL(site.meta.url) } : {}),
  title: { default: site.meta.title, template: `%s · ${site.brand.name}` },
  description: site.meta.description,
  icons: { icon: asset("/icon.svg") },
  // Social previews need absolute image URLs, so the image is added once meta.url is set.
  openGraph: { title: site.meta.title, description: site.meta.description, siteName: site.brand.name, type: "website", ...(site.meta.url ? { images: ["/images/dashboard.webp"] } : {}) },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Hidden starting states wait for data-motion="on", which only this script sets, so
            without JavaScript (or with reduced motion) the page is complete and still. */}
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
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
