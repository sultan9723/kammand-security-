import type { Metadata } from "next";
import { IndustryDetailTemplate } from "../../../components/sections/industries/industry-detail-template";
import { fintechPaymentsIndustry } from "../../../lib/industries";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(fintechPaymentsIndustry.href);

export const metadata: Metadata = {
  title: "Fintech & Payments",
  description:
    "GRC and cybersecurity advisory context for fintech and payment organizations scaling governance, controls, third-party oversight and readiness.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Fintech & Payments | ${siteConfig.name}`,
    description:
      "Security governance and readiness support for fast-moving fintech and payment environments.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function FintechPaymentsPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: "Fintech & Payments", path: fintechPaymentsIndustry.href },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <IndustryDetailTemplate industry={fintechPaymentsIndustry} />
    </>
  );
}
