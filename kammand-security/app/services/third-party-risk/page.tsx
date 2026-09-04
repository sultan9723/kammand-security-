import type { Metadata } from "next";
import { ThirdPartyRiskActivities } from "../../../components/sections/services/third-party-risk-activities";
import { ServiceDetailTemplate } from "../../../components/sections/services/service-detail-template";
import { thirdPartyRiskService } from "../../../lib/services";
import {
  getAbsoluteUrl,
  getBreadcrumbJsonLd,
  getServiceJsonLd,
  siteConfig,
} from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(thirdPartyRiskService.href);

export const metadata: Metadata = {
  title: "Third-Party Risk",
  description:
    "Third-party risk advisory for supplier classification, due diligence, evidence review, onboarding controls and oversight routines.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Third-Party Risk | ${siteConfig.name}`,
    description:
      "Supplier and partner risk support across classification, due diligence, evidence and remediation.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function ThirdPartyRiskPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Third-Party Risk", path: thirdPartyRiskService.href },
  ]);
  const serviceJsonLd = getServiceJsonLd({
    name: thirdPartyRiskService.title,
    description: thirdPartyRiskService.description,
    path: thirdPartyRiskService.href,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, serviceJsonLd]),
        }}
      />
      <ServiceDetailTemplate
        service={thirdPartyRiskService}
        activitiesContent={<ThirdPartyRiskActivities service={thirdPartyRiskService} />}
      />
    </>
  );
}
