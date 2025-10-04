// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hi-vision.io";

  // Các trang tĩnh chính
  const staticPages = ["/", "/about-us", "/services", "/blog"];

  return [
    ...staticPages.map((p) => ({
      url: `${base}${p}`,
      lastModified: new Date(),
    })),
  ];
}
