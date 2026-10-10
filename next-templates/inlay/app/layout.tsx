import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { MotionProvider, motionBootScript } from "@/components/Motion";
import { HashLinks } from "@/components/HashLinks";
import { Navigation } from "@/components/Navigation";
import { Dock } from "@/components/Dock";
import { Footer } from "@/components/sections/Footer";
import "./globals.css";

// Mona Sans is variable in weight and width: headings run wide, body text at normal width.
const mona = Mona_Sans({ subsets: ["latin"], axes: ["wdth"], display: "swap", variable: "--font-mona" });

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: { default: site.title, template: `%s · ${site.brand}` },
  description: site.description,
  icons: { icon: asset("/icon.svg") },
  // Social previews need absolute image URLs, so the image is added once site.url is set.
  openGraph: { title: site.title, description: site.description, siteName: site.brand, type: "website", ...(site.url ? { images: ["/images/og.jpg"] } : {}) },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mona.variable} suppressHydrationWarning>
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
          <main id="main">{children}</main>
          <Footer />
          <Dock />
        </MotionProvider>
      </body>
    </html>
  );
}
