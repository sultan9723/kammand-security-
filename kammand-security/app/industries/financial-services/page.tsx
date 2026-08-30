import type { Metadata } from "next";
import { IndustryDetailTemplate } from "../../../components/sections/industries/industry-detail-template";
import { financialServicesIndustry } from "../../../lib/industries";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(financialServicesIndustry.href);

export const metadata: Metadata = {
  title: "Financial Services",
  description:
    "GRC and cybersecurity advisory context for financial services governance, cyber resilience, risk ownership, evidence and assurance.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Financial Services | ${siteConfig.name}`,
    description:
      "Governance, cyber risk, evidence and assurance support for financial services environments.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function FinancialServicesPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: "Financial Services", path: financialServicesIndustry.href },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <IndustryDetailTemplate industry={financialServicesIndustry} />
    </>
  );
}
