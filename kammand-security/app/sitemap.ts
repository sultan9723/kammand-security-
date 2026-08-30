import type { MetadataRoute } from "next";
import { frameworkDetails } from "../lib/frameworks";
import { industryDetails } from "../lib/industries";
import { getPublishedInsights } from "../lib/insights";
import { serviceDetails } from "../lib/services";
import { getAbsoluteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/services",
    ...serviceDetails.map((service) => service.href),
    "/frameworks",
    ...frameworkDetails.map((framework) => framework.href),
    "/industries",
    ...industryDetails.map((industry) => industry.href),
    "/insights",
    ...getPublishedInsights().map((insight) => insight.href),
    "/company",
    "/security",
    "/contact",
    "/book",
    "/privacy",
    "/cookies",
    "/terms",
    "/accessibility",
  ];
  const urls = routes
    .map((route) => getAbsoluteUrl(route))
    .filter((url): url is string => Boolean(url));

  if (urls.length === 0) {
    return [];
  }

  return urls.map((url, index) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
