import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Servido em /manifest.webmanifest. Ícones gerados por `npm run build:icons`. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    lang: site.locale,
    start_url: "/",
    scope: "/",
    display: "standalone",
    theme_color: site.themeColor,
    background_color: site.themeColor,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
