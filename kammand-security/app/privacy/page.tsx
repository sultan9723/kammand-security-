import type { Metadata } from "next";
import { LegalPage } from "../../components/sections/legal/legal-page";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../lib/site";

const canonicalUrl = getAbsoluteUrl("/privacy");

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "Privacy information for KAMMAND website inquiries, booking, consent preferences and current third-party service architecture.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Privacy Notice | ${siteConfig.name}`,
    description:
      "How KAMMAND describes the personal-information flows currently implemented on this website.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function PrivacyRoute() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy", path: "/privacy" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPage kind="privacy" />
    </>
  );
}
