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

export type ProductionEnvironmentCheck = {
  issues: string[];
  warnings: string[];
};

export function getProductionEnvironmentChecks(env = process.env): ProductionEnvironmentCheck {
  const issues: string[] = [];
  const warnings: string[] = [];

  if (env.VERCEL_ENV !== "production" && env.NODE_ENV !== "production") {
    return { issues, warnings };
  }

  // The site URL is not known until the first production deployment exists, so its
  // absence must not block a first deploy. It is surfaced as a warning and can be
  // supplied later (or via the auto-assigned VERCEL_URL) before a custom domain is set.
  if (!env.NEXT_PUBLIC_SITE_URL) {
    warnings.push(
      "NEXT_PUBLIC_SITE_URL is not set. Canonical metadata, sitemap and robots will omit the absolute origin until a production URL is configured.",
    );
  } else {
    try {
      const parsed = new URL(env.NEXT_PUBLIC_SITE_URL);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        warnings.push("NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL.");
      }
    } catch {
      warnings.push("NEXT_PUBLIC_SITE_URL is not a valid absolute URL.");
    }
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

  return { issues, warnings };
}

export function getProductionEnvironmentIssues(env = process.env) {
  return getProductionEnvironmentChecks(env).issues;
}
