import type { Metadata } from "next";
import { LegalPage } from "../../components/sections/legal/legal-page";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../lib/site";

const canonicalUrl = getAbsoluteUrl("/terms");

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Website terms for using KAMMAND Security informational content, contact paths, booking paths and third-party links.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Terms of Use | ${siteConfig.name}`,
    description:
      "Terms for informational use of the KAMMAND Security website.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function TermsRoute() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Terms", path: "/terms" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPage kind="terms" />
    </>
  );
}
