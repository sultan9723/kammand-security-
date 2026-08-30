// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import { consentStorageKey } from "./categories";
import { createAcceptedOptionalConsent } from "./consent-state";
import {
  consentChangeEventName,
  hasStoredConsent,
  readStoredConsentPreferences,
  writeConsentPreferences,
} from "./consent-storage";

afterEach(() => {
  window.localStorage.clear();
});

describe("consent storage", () => {
  it("persists versioned consent preferences locally", () => {
    const preferences = createAcceptedOptionalConsent("2026-08-16T00:00:00.000Z");

    writeConsentPreferences(preferences);

    expect(window.localStorage.getItem(consentStorageKey)).toContain('"functional":true');
    expect(readStoredConsentPreferences()?.analytics).toBe(true);
    expect(hasStoredConsent("functional")).toBe(true);
  });

  it("ignores stale consent versions", () => {
    window.localStorage.setItem(
      consentStorageKey,
      JSON.stringify({
        version: "old",
        necessary: true,
        functional: true,
        analytics: true,
        marketing: true,
        updatedAt: "2026-08-16T00:00:00.000Z",
      }),
    );

    expect(readStoredConsentPreferences()).toBeUndefined();
    expect(hasStoredConsent("analytics")).toBe(false);
  });

  it("emits a consent change event after writing preferences", () => {
    const listener = vi.fn();
    window.addEventListener(consentChangeEventName, listener);

    writeConsentPreferences(createAcceptedOptionalConsent());

    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener(consentChangeEventName, listener);
  });
});
