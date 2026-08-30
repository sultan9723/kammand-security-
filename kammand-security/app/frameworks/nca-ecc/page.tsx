import type { Metadata } from "next";
import { FrameworkDetailTemplate } from "../../../components/sections/frameworks/framework-detail-template";
import { ncaEccFramework } from "../../../lib/frameworks";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(ncaEccFramework.href);

export const metadata: Metadata = {
  title: "NCA ECC",
  description:
    "High-level NCA Essential Cybersecurity Controls advisory context for accountability, control ownership, evidence and assurance planning.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `NCA ECC | ${siteConfig.name}`,
    description:
      "Advisory context for organizing NCA ECC work without unsupported control or domain claims.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function NcaEccPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Frameworks", path: "/frameworks" },
    { name: "NCA ECC", path: ncaEccFramework.href },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <FrameworkDetailTemplate framework={ncaEccFramework} />
    </>
  );
}
