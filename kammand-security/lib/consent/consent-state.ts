import {
  CONSENT_VERSION,
  consentCategories,
  type ConsentCategory,
} from "./categories";

export type ConsentPreferences = {
  version: string;
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export type OptionalConsentCategory = Exclude<ConsentCategory, "necessary">;

export function createDefaultConsentPreferences(
  updatedAt = new Date().toISOString(),
): ConsentPreferences {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
    updatedAt,
  };
}

export function createRejectedOptionalConsent(
  updatedAt = new Date().toISOString(),
): ConsentPreferences {
  return createDefaultConsentPreferences(updatedAt);
}

export function createAcceptedOptionalConsent(
  updatedAt = new Date().toISOString(),
): ConsentPreferences {
  return normalizeConsentPreferences(
    {
      ...createDefaultConsentPreferences(updatedAt),
      functional: true,
      analytics: true,
    },
    updatedAt,
  );
}

export function normalizeConsentPreferences(
  value: Partial<ConsentPreferences>,
  updatedAt = new Date().toISOString(),
): ConsentPreferences {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    functional: Boolean(value.functional),
    analytics: Boolean(value.analytics),
    marketing: consentCategories.marketing.active ? Boolean(value.marketing) : false,
    updatedAt: value.updatedAt ?? updatedAt,
  };
}

export function hasConsent(
  preferences: ConsentPreferences | undefined,
  category: ConsentCategory,
) {
  if (category === "necessary") {
    return true;
  }

  return Boolean(preferences?.[category]);
}
