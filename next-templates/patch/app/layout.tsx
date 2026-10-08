import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/site.config";
import "./globals.css";
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg` },
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    type: "website",
    siteName: site.brand.name,
  },
};
export const viewport: Viewport = {
  themeColor: "#fafaf7",
  colorScheme: "light dark",
};
const appearanceScript = `try{var t=localStorage.getItem(${JSON.stringify(site.appearance.storageKey)});document.documentElement.dataset.theme=t==='dark'||t==='light'?t:${JSON.stringify(site.appearance.defaultTheme)}}catch{document.documentElement.dataset.theme=${JSON.stringify(site.appearance.defaultTheme)}}`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      data-theme={site.appearance.defaultTheme}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
