import type { Metadata } from "next";
import { IndustryDetailTemplate } from "../../../components/sections/industries/industry-detail-template";
import { regulatedEnterprisesIndustry } from "../../../lib/industries";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(regulatedEnterprisesIndustry.href);

export const metadata: Metadata = {
  title: "Critical & Regulated Enterprises",
  description:
    "GRC and cybersecurity advisory context for regulated enterprises managing operational accountability, supplier dependencies, resilience, evidence and assurance.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Critical & Regulated Enterprises | ${siteConfig.name}`,
    description:
      "Governance, resilience, supplier risk and assurance context for high-accountability enterprises.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function RegulatedEnterprisesPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: "Critical & Regulated Enterprises", path: regulatedEnterprisesIndustry.href },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <IndustryDetailTemplate industry={regulatedEnterprisesIndustry} />
    </>
  );
}
