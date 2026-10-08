import type { Metadata, Viewport } from "next";
import { DM_Sans, Geist_Mono, Lora } from "next/font/google";
import { site } from "@/site.config";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
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
    siteName: "Tempo",
  },
};
export const viewport: Viewport = {
  themeColor: "#f8f7f3",
  colorScheme: "light",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
