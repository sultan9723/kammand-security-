import type { Metadata } from "next";
import { ServiceDetailTemplate } from "../../../components/sections/services/service-detail-template";
import { securityAssuranceService } from "../../../lib/services";
import {
  getAbsoluteUrl,
  getBreadcrumbJsonLd,
  getServiceJsonLd,
  siteConfig,
} from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(securityAssuranceService.href);

export const metadata: Metadata = {
  title: "Security Assurance",
  description:
    "Security assurance advisory for control design review, operating effectiveness, evidence quality and remediation tracking.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Security Assurance | ${siteConfig.name}`,
    description:
      "Review whether cybersecurity controls exist, operate as intended and are supported by reliable evidence.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function SecurityAssurancePage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Security Assurance", path: securityAssuranceService.href },
  ]);
  const serviceJsonLd = getServiceJsonLd({
    name: securityAssuranceService.title,
    description: securityAssuranceService.description,
    path: securityAssuranceService.href,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, serviceJsonLd]),
        }}
      />
      <ServiceDetailTemplate service={securityAssuranceService} />
    </>
  );
}
