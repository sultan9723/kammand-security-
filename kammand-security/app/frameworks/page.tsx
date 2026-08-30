import type { Metadata } from "next";
import { FrameworksOverviewPage } from "../../components/sections/frameworks/frameworks-overview";
import { getAbsoluteUrl, siteConfig } from "../../lib/site";

const canonicalUrl = getAbsoluteUrl("/frameworks");

export const metadata: Metadata = {
  title: "Frameworks",
  description:
    "Framework advisory context for organizations navigating cybersecurity, governance, privacy, compliance and assurance obligations.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: `Frameworks | ${siteConfig.name}`,
    description:
      "Understand framework relationships, evidence expectations and practical compliance work.",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function FrameworksPage() {
  return <FrameworksOverviewPage />;
}
