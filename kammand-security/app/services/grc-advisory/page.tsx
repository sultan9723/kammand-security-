import type { Metadata } from "next";
import { ServiceDetailTemplate } from "../../../components/sections/services/service-detail-template";
import { grcAdvisoryService } from "../../../lib/services";
import {
  getAbsoluteUrl,
  getBreadcrumbJsonLd,
  getServiceJsonLd,
  siteConfig,
} from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(grcAdvisoryService.href);

export const metadata: Metadata = {
  title: "GRC Advisory",
  description:
    "Practical governance, risk and compliance advisory for regulated organizations that need clearer control ownership, evidence and remediation routines.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `GRC Advisory | ${siteConfig.name}`,
    description:
      "Practical GRC advisory focused on governance, control ownership, evidence and remediation.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function GrcAdvisoryPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "GRC Advisory", path: grcAdvisoryService.href },
  ]);
  const serviceJsonLd = getServiceJsonLd({
    name: grcAdvisoryService.title,
    description: grcAdvisoryService.description,
    path: grcAdvisoryService.href,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, serviceJsonLd]),
        }}
      />
      <ServiceDetailTemplate service={grcAdvisoryService} />
    </>
  );
}
