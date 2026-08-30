import type { Metadata } from "next";
import { ServiceDetailTemplate } from "../../../components/sections/services/service-detail-template";
import { virtualCisoService } from "../../../lib/services";
import {
  getAbsoluteUrl,
  getBreadcrumbJsonLd,
  getServiceJsonLd,
  siteConfig,
} from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(virtualCisoService.href);

export const metadata: Metadata = {
  title: "Virtual CISO",
  description:
    "Strategic cybersecurity leadership and governance support for regulated organizations that need direction, accountability and executive-level oversight.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Virtual CISO | ${siteConfig.name}`,
    description:
      "Senior security leadership support for strategy, governance, risk prioritization and oversight.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function VirtualCisoPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Virtual CISO", path: virtualCisoService.href },
  ]);
  const serviceJsonLd = getServiceJsonLd({
    name: virtualCisoService.title,
    description: virtualCisoService.description,
    path: virtualCisoService.href,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, serviceJsonLd]),
        }}
      />
      <ServiceDetailTemplate service={virtualCisoService} />
    </>
  );
}
