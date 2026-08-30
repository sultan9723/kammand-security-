import type { Metadata } from "next";
import { ServiceDetailTemplate } from "../../../components/sections/services/service-detail-template";
import { riskManagementService } from "../../../lib/services";
import {
  getAbsoluteUrl,
  getBreadcrumbJsonLd,
  getServiceJsonLd,
  siteConfig,
} from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(riskManagementService.href);

export const metadata: Metadata = {
  title: "Risk Management",
  description:
    "Cybersecurity risk management advisory that helps organizations make risk visible, owned, prioritized and actionable.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Risk Management | ${siteConfig.name}`,
    description:
      "Practical cybersecurity risk management support for assessment, ownership, treatment and reporting.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function RiskManagementPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Risk Management", path: riskManagementService.href },
  ]);
  const serviceJsonLd = getServiceJsonLd({
    name: riskManagementService.title,
    description: riskManagementService.description,
    path: riskManagementService.href,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, serviceJsonLd]),
        }}
      />
      <ServiceDetailTemplate service={riskManagementService} />
    </>
  );
}
