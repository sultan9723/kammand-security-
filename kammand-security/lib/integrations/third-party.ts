export type ThirdPartyService = {
  provider: string;
  status: "active-when-configured" | "planned";
  purpose: string;
  dataInvolved: string;
  boundary: "client" | "server" | "client-and-server";
  consentCategory: "necessary" | "functional" | "analytics" | "marketing" | "not-applicable";
  environmentVariables: string[];
  cspOrigins: string[];
  privacyPolicyRelevance: string;
};

export const thirdPartyServices: ThirdPartyService[] = [
  {
    provider: "Calendly",
    status: "active-when-configured",
    purpose: "Consultation scheduling on the booking page.",
    dataInvolved:
      "Scheduling information entered directly into Calendly after functional scheduling content is enabled.",
    boundary: "client",
    consentCategory: "functional",
    environmentVariables: ["NEXT_PUBLIC_CALENDLY_URL"],
    cspOrigins: ["frame-src https://calendly.com"],
    privacyPolicyRelevance:
      "Must be described as a third-party scheduling provider; cookie/storage behavior requires provider verification.",
  },
  {
    provider: "Resend-compatible email API",
    status: "active-when-configured",
    purpose: "Server-side contact inquiry delivery.",
    dataInvolved:
      "Submitted contact fields required to route and understand an inquiry.",
    boundary: "server",
    consentCategory: "not-applicable",
    environmentVariables: [
      "CONTACT_DELIVERY_PROVIDER",
      "CONTACT_RECIPIENT",
      "CONTACT_FROM",
      "RESEND_API_KEY",
    ],
    cspOrigins: [],
    privacyPolicyRelevance:
      "Must be described as an inquiry-delivery service when production delivery is configured.",
  },
  {
    provider: "Analytics provider",
    status: "planned",
    purpose: "Privacy-conscious measurement of coarse website and conversion events.",
    dataInvolved:
      "Coarse event names and non-PII properties only after analytics consent.",
    boundary: "client",
    consentCategory: "analytics",
    environmentVariables: ["NEXT_PUBLIC_ANALYTICS_PROVIDER"],
    cspOrigins: [],
    privacyPolicyRelevance:
      "Provider details and cookie/storage behavior must be added before activation.",
  },
  {
    provider: "Monitoring/error reporting provider",
    status: "planned",
    purpose: "Production error reporting and performance regression detection.",
    dataInvolved:
      "Sanitized error metadata only; no form contents, cookies, or secrets.",
    boundary: "client-and-server",
    consentCategory: "necessary",
    environmentVariables: ["MONITORING_PROVIDER", "MONITORING_DSN"],
    cspOrigins: [],
    privacyPolicyRelevance:
      "Provider and data handling details must be reviewed before activation.",
  },
  {
    provider: "Persistent rate-limit provider",
    status: "planned",
    purpose: "Distributed production rate limiting for contact submissions.",
    dataInvolved: "Rate-limit keys and counters, not contact messages.",
    boundary: "server",
    consentCategory: "necessary",
    environmentVariables: ["CONTACT_RATE_LIMIT_PROVIDER"],
    cspOrigins: [],
    privacyPolicyRelevance:
      "Provider details must be documented once production infrastructure is selected.",
  },
  {
    provider: "CRM provider",
    status: "planned",
    purpose: "Future lead routing or pipeline management.",
    dataInvolved:
      "Contact inquiry information only if a CRM integration is intentionally implemented.",
    boundary: "server",
    consentCategory: "not-applicable",
    environmentVariables: ["CRM_PROVIDER"],
    cspOrigins: [],
    privacyPolicyRelevance:
      "CRM processing must be documented before activation.",
  },
];
