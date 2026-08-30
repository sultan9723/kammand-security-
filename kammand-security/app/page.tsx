import type { Metadata } from "next";
import { HomepageHero } from "../components/sections/homepage/hero";
import { FinalCtaSection } from "../components/sections/homepage/final-cta";
import { FrameworkIntelligence } from "../components/sections/homepage/framework-intelligence";
import { InsightsSection } from "../components/sections/homepage/insights";
import { ProcessSection } from "../components/sections/homepage/process";
import { ServicesSection } from "../components/sections/homepage/services";
import { getAbsoluteUrl, getOrganizationJsonLd, siteConfig } from "../lib/site";

const canonicalUrl = getAbsoluteUrl("/");

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
  twitter: {
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function Home() {
  const organizationJsonLd = getOrganizationJsonLd();

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomepageHero />
      <FrameworkIntelligence />
      <ServicesSection />
      <ProcessSection />
      <InsightsSection />
      <FinalCtaSection />
    </main>
  );
}
