export const CONSENT_VERSION = "2026-08-16";

export const consentStorageKey = "kammand_consent_preferences";

export const consentCategories = {
  necessary: {
    id: "necessary",
    label: "Strictly necessary",
    description:
      "Required for core site operation, security, accessibility preferences and consent-state storage.",
    required: true,
    active: true,
  },
  functional: {
    id: "functional",
    label: "Functional scheduling content",
    description:
      "Allows optional third-party scheduling content, including the Calendly booking embed on the booking page.",
    required: false,
    active: true,
  },
  analytics: {
    id: "analytics",
    label: "Analytics",
    description:
      "Reserved for future site analytics. No analytics provider is currently implemented.",
    required: false,
    active: true,
  },
  marketing: {
    id: "marketing",
    label: "Marketing",
    description:
      "Reserved for future marketing pixels or advertising integrations. None are currently implemented.",
    required: false,
    active: false,
  },
} as const;

export type ConsentCategory = keyof typeof consentCategories;

export const configurableConsentCategories = ["functional", "analytics"] as const;

export const cookieRegistry = [
  {
    name: consentStorageKey,
    provider: "KAMMAND Security",
    purpose: "Stores the visitor's consent preferences for optional site technologies.",
    category: "Strictly necessary",
    storageType: "localStorage",
    duration: "Until the visitor changes preferences or clears browser storage.",
    required: true,
  },
  {
    name: "Provider cookies or storage requiring verification",
    provider: "Calendly",
    purpose:
      "Supports scheduling content on the booking page when the visitor enables functional scheduling content.",
    category: "Functional",
    storageType: "Third-party iframe cookies/storage",
    duration: "Requires verification against the configured Calendly account and current provider documentation.",
    required: false,
  },
  {
    name: "Not currently active",
    provider: "Analytics provider",
    purpose: "No analytics provider is currently implemented. SPEC-022 must use the consent API before loading analytics.",
    category: "Analytics",
    storageType: "Not active",
    duration: "Not active",
    required: false,
  },
  {
    name: "Not currently active",
    provider: "Marketing provider",
    purpose: "No marketing pixels or advertising tags are currently implemented.",
    category: "Marketing",
    storageType: "Not active",
    duration: "Not active",
    required: false,
  },
] as const;
