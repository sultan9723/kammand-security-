import type { Metadata } from "next";
import { ServiceDetailTemplate } from "../../../components/sections/services/service-detail-template";
import { auditReadinessService } from "../../../lib/services";
import {
  getAbsoluteUrl,
  getBreadcrumbJsonLd,
  getServiceJsonLd,
  siteConfig,
} from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(auditReadinessService.href);

export const metadata: Metadata = {
  title: "Audit Readiness",
  description:
    "Audit readiness support for control readiness, evidence organization, ownership, gap identification and remediation planning.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Audit Readiness | ${siteConfig.name}`,
    description:
      "Prepare controls, documentation, evidence and control owners before assessment activity begins.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function AuditReadinessPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Audit Readiness", path: auditReadinessService.href },
  ]);
  const serviceJsonLd = getServiceJsonLd({
    name: auditReadinessService.title,
    description: auditReadinessService.description,
    path: auditReadinessService.href,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, serviceJsonLd]),
        }}
      />
      <ServiceDetailTemplate service={auditReadinessService} />
    </>
  );
}
