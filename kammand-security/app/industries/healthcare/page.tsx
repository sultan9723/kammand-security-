import type { Metadata } from "next";
import { IndustryDetailTemplate } from "../../../components/sections/industries/industry-detail-template";
import { healthcareIndustry } from "../../../lib/industries";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(healthcareIndustry.href);

export const metadata: Metadata = {
  title: "Healthcare",
  description:
    "Cybersecurity and GRC advisory context for healthcare sensitive information, privacy governance, third-party risk, continuity and assurance.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Healthcare | ${siteConfig.name}`,
    description:
      "Cybersecurity and privacy-governance support for healthcare operating contexts.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function HealthcarePage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: "Healthcare", path: healthcareIndustry.href },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <IndustryDetailTemplate industry={healthcareIndustry} />
    </>
  );
}
