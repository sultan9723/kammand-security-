export const siteConfig = {
  name: "KAMMAND Security",
  title: "KAMMAND Security | GRC & Cybersecurity Advisory",
  description:
    "Strategic GRC and cybersecurity advisory for regulated organizations across the GCC.",
  shortDescription:
    "GRC and cybersecurity advisory for regulated organizations.",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  serviceTypes: [
    "GRC advisory",
    "Virtual CISO services",
    "Cybersecurity risk management",
    "Third-party risk advisory",
    "Audit readiness",
    "Security assurance",
  ],
} as const;

export function getSiteUrl() {
  if (!siteConfig.url) {
    return undefined;
  }

  try {
    return new URL(siteConfig.url);
  } catch {
    return undefined;
  }
}

export function getAbsoluteUrl(path = "/") {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return undefined;
  }

  return new URL(path, siteUrl).toString();
}

export function getOrganizationJsonLd() {
  const url = getAbsoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    ...(url ? { url } : {}),
    description: siteConfig.description,
    areaServed: "GCC",
    serviceType: [...siteConfig.serviceTypes],
  };
}

export function getBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(getAbsoluteUrl(item.path) ? { item: getAbsoluteUrl(item.path) } : {}),
    })),
  };
}

export function getServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      ...(getAbsoluteUrl("/") ? { url: getAbsoluteUrl("/") } : {}),
    },
    ...(getAbsoluteUrl(path) ? { url: getAbsoluteUrl(path) } : {}),
    areaServed: "GCC",
  };
}
