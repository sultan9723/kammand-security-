import type { Metadata } from "next";
import { InsightsIndex } from "../../components/sections/insights/insights-index";
import { insightEntries } from "../../lib/insights";
import { getAbsoluteUrl, siteConfig } from "../../lib/site";

const canonicalUrl = getAbsoluteUrl("/insights");

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical perspectives on governance, cybersecurity, regulation, risk, compliance, and assurance.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Insights | ${siteConfig.name}`,
    description:
      "Practical KAMMAND perspectives on GRC, cybersecurity governance, risk and assurance.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function InsightsPage() {
  return <InsightsIndex insights={insightEntries} />;
}
