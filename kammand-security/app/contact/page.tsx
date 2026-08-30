import type { Metadata } from "next";
import { ContactPage } from "../../components/sections/contact/contact-page";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../lib/site";

const canonicalUrl = getAbsoluteUrl("/contact");

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send KAMMAND a written inquiry about GRC, cybersecurity, risk, compliance, framework, or assurance priorities.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description:
      "Send KAMMAND a focused written inquiry about governance, cybersecurity risk, compliance or assurance.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function ContactRoute() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactPage />
    </>
  );
}
