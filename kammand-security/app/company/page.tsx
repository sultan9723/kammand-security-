import type { Metadata } from "next";
import { CompanyPage } from "../../components/sections/company/company-page";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../lib/site";

const canonicalUrl = getAbsoluteUrl("/company");

export const metadata: Metadata = {
  title: "Company",
  description:
    "KAMMAND's approach to practical GRC, cybersecurity risk, control ownership, evidence and assurance.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Company | ${siteConfig.name}`,
    description:
      "How KAMMAND approaches governance, cybersecurity risk, regulatory requirements and assurance.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function CompanyRoute() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Company", path: "/company" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CompanyPage />
    </>
  );
}
