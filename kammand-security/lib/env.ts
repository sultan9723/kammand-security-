export type EnvVariable = {
  name: string;
  visibility: "public" | "server-only";
  requirement: "required-production" | "optional" | "development-only";
  purpose: string;
};

export const envRegistry: EnvVariable[] = [
  {
    name: "NEXT_PUBLIC_SITE_URL",
    visibility: "public",
    requirement: "required-production",
    purpose: "Canonical URL, metadataBase, sitemap and robots host.",
  },
  {
    name: "NEXT_PUBLIC_CALENDLY_URL",
    visibility: "public",
    requirement: "optional",
    purpose: "Calendly booking URL for the consent-gated booking iframe.",
  },
  {
    name: "NEXT_PUBLIC_ANALYTICS_PROVIDER",
    visibility: "public",
    requirement: "optional",
    purpose: "Analytics provider selector. Defaults to disabled.",
  },
  {
    name: "CONTACT_DELIVERY_PROVIDER",
    visibility: "server-only",
    requirement: "required-production",
    purpose: "Contact delivery provider selector.",
  },
  {
    name: "CONTACT_RECIPIENT",
    visibility: "server-only",
    requirement: "required-production",
    purpose: "Internal recipient for contact inquiries.",
  },
  {
    name: "CONTACT_FROM",
    visibility: "server-only",
    requirement: "required-production",
    purpose: "Verified sender identity for contact inquiry email delivery.",
  },
  {
    name: "RESEND_API_KEY",
    visibility: "server-only",
    requirement: "required-production",
    purpose: "Server-only credential for Resend-compatible delivery.",
  },
  {
    name: "CONTACT_RATE_LIMIT_PROVIDER",
    visibility: "server-only",
    requirement: "required-production",
    purpose: "Persistent production rate-limit provider selector.",
  },
];

export function getProductionEnvironmentIssues(env = process.env) {
  const issues: string[] = [];

  if (env.VERCEL_ENV !== "production" && env.NODE_ENV !== "production") {
    return issues;
  }

  if (!env.NEXT_PUBLIC_SITE_URL) {
    issues.push("NEXT_PUBLIC_SITE_URL must be set to the verified production origin.");
  }

  if (env.CONTACT_DELIVERY_PROVIDER !== "resend") {
    issues.push("CONTACT_DELIVERY_PROVIDER must be configured for production delivery.");
  }

  ["CONTACT_RECIPIENT", "CONTACT_FROM", "RESEND_API_KEY"].forEach((name) => {
    if (!env[name]) {
      issues.push(`${name} must be configured for production contact delivery.`);
    }
  });

  if (!env.CONTACT_RATE_LIMIT_PROVIDER || env.CONTACT_RATE_LIMIT_PROVIDER === "development") {
    issues.push("CONTACT_RATE_LIMIT_PROVIDER must use a persistent production provider.");
  }

  return issues;
}
