import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dezza Rizqi — Fullstack Mobile",
    short_name: "PDJ",
    description: "Portfolio of Dezza Rizqi, Mobile Engineer",
    start_url: "/",
    display: "standalone",
    background_color: "#09090B",
    theme_color: "#7C3AED",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
