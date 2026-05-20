import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/takk", "/bekreft", "/avmeld"],
      },
    ],
    sitemap: `${process.env.APP_URL ?? "https://klarlinje.no"}/sitemap.xml`,
  };
}
