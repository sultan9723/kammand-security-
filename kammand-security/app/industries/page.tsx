import type { Metadata } from "next";
import { IndustriesOverviewPage } from "../../components/sections/industries/industries-overview";
import { getAbsoluteUrl, siteConfig } from "../../lib/site";

const canonicalUrl = getAbsoluteUrl("/industries");

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Industry context for GRC and cybersecurity advisory across financial services, fintech, insurance, technology, healthcare and regulated enterprises.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Industries | ${siteConfig.name}`,
    description:
      "GRC and cybersecurity advisory context for high-accountability environments.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function IndustriesPage() {
  return <IndustriesOverviewPage />;
}
