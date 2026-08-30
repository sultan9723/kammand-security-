import type { Metadata } from "next";
import { LegalPage } from "../../components/sections/legal/legal-page";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../lib/site";

const canonicalUrl = getAbsoluteUrl("/accessibility");

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "KAMMAND accessibility statement covering semantic structure, keyboard navigation, visible focus, responsive layouts, reduced motion and feedback.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Accessibility Statement | ${siteConfig.name}`,
    description:
      "KAMMAND's current accessibility approach and feedback route.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function AccessibilityRoute() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Accessibility", path: "/accessibility" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPage kind="accessibility" />
    </>
  );
}
