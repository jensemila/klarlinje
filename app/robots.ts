import type { MetadataRoute } from "next";

const base = process.env.APP_URL ?? "https://klarlinje.no";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/takk", "/bekreft", "/avmeld"],
      },
      // AI crawlers — eksplisitt tillatt
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Googlebot-Extended", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
