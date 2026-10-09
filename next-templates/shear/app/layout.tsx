import type { Metadata, Viewport } from "next";
import { Mona_Sans, Fragment_Mono } from "next/font/google";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import "./globals.css";

// Mona Sans ships its width axis too: the headline's moving word and the
// section reveals breathe through it.
const sans = Mona_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-mona", display: "swap" });
const mono = Fragment_Mono({ subsets: ["latin"], weight: "400", variable: "--font-fragment", display: "swap" });

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  icons: { icon: asset("/icon.svg") },
  openGraph: { title: site.meta.title, description: site.meta.description, siteName: site.brand.name, type: "website" },
};

export const viewport: Viewport = { themeColor: "#08090b" };

// Restores a visitor's "pause motion" choice before the first paint.
const bootstrap = `document.documentElement.classList.add("js");try{if(localStorage.getItem(${JSON.stringify(site.motion.storageKey)})==="paused")document.documentElement.dataset.motion="paused"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
