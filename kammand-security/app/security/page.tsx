import type { Metadata } from "next";
import { TrustSecurityPage } from "../../components/sections/company/trust-security-page";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../lib/site";

const canonicalUrl = getAbsoluteUrl("/security");

export const metadata: Metadata = {
  title: "Security",
  description:
    "KAMMAND's approach to security, privacy-conscious information handling, website security and future trust documentation.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Security | ${siteConfig.name}`,
    description:
      "Security and trust information for KAMMAND website operations and client-information handling principles.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function SecurityRoute() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Security", path: "/security" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TrustSecurityPage />
    </>
  );
}
