import type { Metadata } from "next";
import { FrameworkDetailTemplate } from "../../../components/sections/frameworks/framework-detail-template";
import { iso27001Framework } from "../../../lib/frameworks";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(iso27001Framework.href);

export const metadata: Metadata = {
  title: "ISO 27001",
  description:
    "High-level ISO 27001 advisory and readiness context for information security governance, risk management, evidence and assurance.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `ISO 27001 | ${siteConfig.name}`,
    description:
      "Advisory and readiness context for strengthening an ISMS without implying certification authority.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function Iso27001Page() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Frameworks", path: "/frameworks" },
    { name: "ISO 27001", path: iso27001Framework.href },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <FrameworkDetailTemplate framework={iso27001Framework} />
    </>
  );
}
