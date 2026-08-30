import type { Metadata } from "next";
import { IndustryDetailTemplate } from "../../../components/sections/industries/industry-detail-template";
import { technologyIndustry } from "../../../lib/industries";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(technologyIndustry.href);

export const metadata: Metadata = {
  title: "Technology",
  description:
    "GRC and cybersecurity advisory context for technology organizations scaling security governance, controls, vendors, evidence and risk management.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Technology | ${siteConfig.name}`,
    description:
      "Security governance and control maturity context for scaling technology organizations.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function TechnologyPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: "Technology", path: technologyIndustry.href },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <IndustryDetailTemplate industry={technologyIndustry} />
    </>
  );
}
