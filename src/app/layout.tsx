import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "./globals.css";

/** Display condensada para nomes, handles e títulos gigantes. */
const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
/** Fonte real do site Lipe Ensina (lp.lipeensina.com.br), usada só na dobra Ensina. */
const scritture = localFont({
  src: [
    { path: "./fonts/scritture-grotesk-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/scritture-grotesk-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-scritture",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: site.ogImage, width: 1060, height: 1562, alt: site.hero.recorte.alt }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: [site.ogImage] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0b0c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.locale} className={`${display.variable} ${inter.variable} ${scritture.variable}`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
