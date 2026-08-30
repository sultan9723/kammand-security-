import type { Metadata } from "next";
import { FrameworkDetailTemplate } from "../../../components/sections/frameworks/framework-detail-template";
import { pdplFramework } from "../../../lib/frameworks";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(pdplFramework.href);

export const metadata: Metadata = {
  title: "Saudi PDPL",
  description:
    "High-level Saudi PDPL advisory context for privacy governance, accountability, evidence, third-party oversight and security coordination.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Saudi PDPL | ${siteConfig.name}`,
    description:
      "Privacy governance implementation context without unsupported legal interpretation or requirement claims.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function PdplPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Frameworks", path: "/frameworks" },
    { name: "Saudi PDPL", path: pdplFramework.href },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <FrameworkDetailTemplate framework={pdplFramework} />
    </>
  );
}
