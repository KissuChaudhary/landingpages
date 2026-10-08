import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { site } from "@/site.config";
import "./globals.css";
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-relay",
  display: "swap",
});
export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg` },
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    siteName: "Relay",
    type: "website",
  },
};
const bootstrap = `try{var t=localStorage.getItem(${JSON.stringify(site.appearance.storageKey)});document.documentElement.dataset.theme=t==='light'||t==='dark'?t:${JSON.stringify(site.appearance.defaultTheme)}}catch{document.documentElement.dataset.theme=${JSON.stringify(site.appearance.defaultTheme)}}`;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={sans.variable}
      data-theme={site.appearance.defaultTheme}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
