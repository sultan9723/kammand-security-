import type { Metadata } from "next";
import { ServicesOverviewPage } from "../../components/sections/services/services-overview";
import { getAbsoluteUrl, getServiceJsonLd, siteConfig } from "../../lib/site";

const canonicalUrl = getAbsoluteUrl("/services");

export const metadata: Metadata = {
  title: "Services",
  description:
    "GRC and cybersecurity services that help regulated organizations structure programs, controls, evidence and action.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Services | ${siteConfig.name}`,
    description:
      "GRC and cybersecurity services for regulated organizations across the GCC.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function ServicesPage() {
  const servicesJsonLd = getServiceJsonLd({
    name: "GRC and cybersecurity services",
    description:
      "GRC and cybersecurity advisory services for regulated organizations.",
    path: "/services",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <ServicesOverviewPage />
    </>
  );
}
