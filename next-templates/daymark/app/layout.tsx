import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/site.config";
import { SiteShell } from "@/components/SiteShell";
import "@/styles/base.css";
import "@/styles/home.css";
import "@/styles/approach.css";
import "@/styles/chapters.css";
import "@/styles/pages.css";
import "@/styles/contact.css";
const figtree = localFont({
  src: "../public/fonts/Figtree-variable.ttf",
  variable: "--font-daymark",
  weight: "300 900",
  display: "swap",
});
export const metadata: Metadata = {
  title: { default: site.title, template: "%s — " + site.brand },
  description: site.description,
  applicationName: site.brand,
  icons: { icon: (process.env.NEXT_PUBLIC_BASE_PATH || "") + "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figtree.variable}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
