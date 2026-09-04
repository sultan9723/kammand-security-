import type { Metadata } from "next";
import { HomepageHero } from "../components/sections/homepage/hero";
import { FinalCtaSection } from "../components/sections/homepage/final-cta";
import { FrameworkIntelligence } from "../components/sections/homepage/framework-intelligence";
import { FaqSection } from "../components/sections/homepage/faq";
import { IndustriesSection } from "../components/sections/homepage/industries";
import { ProofSection } from "../components/sections/homepage/proof";
import { TeamSection } from "../components/sections/homepage/team";
import { TrustStrip } from "../components/sections/homepage/trust-strip";
import { WhyKammandSection } from "../components/sections/homepage/why-kammand";
import { ProcessSection } from "../components/sections/homepage/process";
import { ServicesSection } from "../components/sections/homepage/services";
import { ServicesOverviewHeroSection } from "../components/sections/services/services-overview";
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
      <TrustStrip />
      <ServicesOverviewHeroSection
        capabilitiesHref="#homepage-capabilities"
        headingLevel="h2"
        titleId="homepage-services-overview-title"
      />
      <ServicesSection />
      <FrameworkIntelligence />
      <IndustriesSection />
      <ProcessSection />
      <WhyKammandSection />
      <ProofSection />
      <TeamSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
