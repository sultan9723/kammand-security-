import { CONSENT_VERSION, consentStorageKey } from "./categories";
import {
  normalizeConsentPreferences,
  type ConsentPreferences,
  type OptionalConsentCategory,
} from "./consent-state";

export const consentChangeEventName = "kammand:consentchange";
export const openConsentPreferencesEventName = "kammand:open-consent-preferences";

export function readStoredConsentPreferences(): ConsentPreferences | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const stored = window.localStorage.getItem(consentStorageKey);

  if (!stored) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<ConsentPreferences>;

    if (parsed.version !== CONSENT_VERSION) {
      return undefined;
    }

    return normalizeConsentPreferences(parsed);
  } catch {
    return undefined;
  }
}

export function writeConsentPreferences(preferences: ConsentPreferences) {
  if (typeof window === "undefined") {
    return;
  }

  const normalized = normalizeConsentPreferences(preferences);
  window.localStorage.setItem(consentStorageKey, JSON.stringify(normalized));
  window.dispatchEvent(
    new CustomEvent<ConsentPreferences>(consentChangeEventName, {
      detail: normalized,
    }),
  );
}

export function hasStoredConsent(category: OptionalConsentCategory | "necessary") {
  const preferences = readStoredConsentPreferences();

  if (category === "necessary") {
    return true;
  }

  return Boolean(preferences?.[category]);
}

export function openConsentPreferences() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(openConsentPreferencesEventName));
}
