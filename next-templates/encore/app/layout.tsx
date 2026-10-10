import type { Metadata, Viewport } from "next";
import { Hubot_Sans, Azeret_Mono } from "next/font/google";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import "./globals.css";

// Hubot Sans ships its width axis: the condensed display type and the reveals
// that narrow into place both come from it.
const sans = Hubot_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-hubot", display: "swap" });
const mono = Azeret_Mono({ subsets: ["latin"], variable: "--font-azeret", display: "swap" });

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  icons: { icon: asset("/icon.svg") },
  openGraph: { title: site.meta.title, description: site.meta.description, siteName: site.brand.name, type: "website" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

// Marks JavaScript as running (reveals hide until then) and restores a
// visitor's "pause motion" choice before the first paint.
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
