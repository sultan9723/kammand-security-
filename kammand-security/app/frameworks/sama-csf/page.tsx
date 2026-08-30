import type { Metadata } from "next";
import { FrameworkDetailTemplate } from "../../../components/sections/frameworks/framework-detail-template";
import { samaCsfFramework } from "../../../lib/frameworks";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../../lib/site";

const canonicalUrl = getAbsoluteUrl(samaCsfFramework.href);

export const metadata: Metadata = {
  title: "SAMA CSF",
  description:
    "High-level SAMA Cyber Security Framework advisory context for practical governance, control ownership, evidence and assurance planning.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `SAMA CSF | ${siteConfig.name}`,
    description:
      "Advisory context for organizing SAMA cybersecurity work without unsupported control mapping claims.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function SamaCsfPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Frameworks", path: "/frameworks" },
    { name: "SAMA CSF", path: samaCsfFramework.href },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <FrameworkDetailTemplate framework={samaCsfFramework} />
    </>
  );
}
