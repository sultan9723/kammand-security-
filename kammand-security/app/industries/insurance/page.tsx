import type { Metadata } from "next";
import { IndustryDetailTemplate } from "../../../components/sections/industries/industry-detail-template";
import { insuranceIndustry } from "../../../lib/industries";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(insuranceIndustry.href);

export const metadata: Metadata = {
  title: "Insurance",
  description:
    "GRC and cybersecurity advisory context for insurance cyber risk visibility, accountability, third-party dependencies, evidence and assurance.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Insurance | ${siteConfig.name}`,
    description:
      "Cyber risk governance, evidence and assurance context for insurance environments.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function InsurancePage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: "Insurance", path: insuranceIndustry.href },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <IndustryDetailTemplate industry={insuranceIndustry} />
    </>
  );
}
