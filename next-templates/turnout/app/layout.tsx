import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { MotionProvider, motionBootScript } from "@/components/Motion";
import { HashLinks } from "@/components/HashLinks";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import "./globals.css";

// Bricolage Grotesque for headings (its optical-size axis keeps big type tight), Geist for reading.
const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz"], display: "swap", variable: "--font-bricolage" });
const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-geist" });

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: { default: site.title, template: `%s · ${site.brand}` },
  description: site.description,
  icons: { icon: asset("/icon.svg") },
  // Social previews need absolute image URLs, so the image is added once site.url is set.
  openGraph: { title: site.title, description: site.description, siteName: site.brand, type: "website", ...(site.url ? { images: ["/images/cta-crowd.webp"] } : {}) },
};

export const viewport: Viewport = { themeColor: "#f1f1ee" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Every hidden starting state waits for data-motion="on", which only this script sets,
            so without JavaScript (or with reduced motion) the page is complete and still. */}
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body>
        <MotionProvider>
          <HashLinks />
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navigation />
          <div className="page">
            <main id="main">{children}</main>
          </div>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
