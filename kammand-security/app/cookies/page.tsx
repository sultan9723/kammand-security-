import type { Metadata } from "next";
import { LegalPage } from "../../components/sections/legal/legal-page";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../lib/site";

const canonicalUrl = getAbsoluteUrl("/cookies");

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie and storage information for KAMMAND first-party consent preferences, optional Calendly scheduling content and future analytics architecture.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Cookie Policy | ${siteConfig.name}`,
    description:
      "Current cookie and storage categories for the KAMMAND website.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function CookiesRoute() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Cookie Policy", path: "/cookies" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPage kind="cookies" />
    </>
  );
}
