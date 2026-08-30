import type { Metadata } from "next";
import { BookPage } from "../../components/sections/contact/book-page";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../lib/site";

const canonicalUrl = getAbsoluteUrl("/book");

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book a consultation with KAMMAND when you are ready to discuss an active or near-term GRC or cybersecurity need.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Book a Consultation | ${siteConfig.name}`,
    description:
      "Schedule a KAMMAND consultation for an active or near-term governance, cybersecurity, risk, compliance, or assurance need.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function BookRoute() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Book", path: "/book" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BookPage />
    </>
  );
}
