import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";
  const sitemap = getAbsoluteUrl("/sitemap.xml");

  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : undefined,
      disallow: isProduction ? undefined : "/",
    },
    ...(sitemap ? { sitemap } : {}),
  };
}
