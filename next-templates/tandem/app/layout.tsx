import type { Metadata, Viewport } from "next";
import { Mona_Sans, Fragment_Mono } from "next/font/google";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import "./globals.css";

const sans = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});
const mono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  icons: { icon: asset("/icon.svg") },
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    siteName: site.brand.name,
    type: "website",
  },
};
export const viewport: Viewport = { themeColor: "#f8f9fc" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js")',
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
