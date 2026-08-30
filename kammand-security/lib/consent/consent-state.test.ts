import { describe, expect, it } from "vitest";
import {
  createAcceptedOptionalConsent,
  createDefaultConsentPreferences,
  createRejectedOptionalConsent,
  hasConsent,
  normalizeConsentPreferences,
} from "./consent-state";

describe("consent state", () => {
  it("defaults optional categories off", () => {
    const preferences = createDefaultConsentPreferences("2026-08-16T00:00:00.000Z");

    expect(preferences.necessary).toBe(true);
    expect(preferences.functional).toBe(false);
    expect(preferences.analytics).toBe(false);
    expect(preferences.marketing).toBe(false);
  });

  it("rejects optional categories while keeping necessary active", () => {
    const preferences = createRejectedOptionalConsent("2026-08-16T00:00:00.000Z");

    expect(hasConsent(preferences, "necessary")).toBe(true);
    expect(hasConsent(preferences, "functional")).toBe(false);
    expect(hasConsent(preferences, "analytics")).toBe(false);
    expect(hasConsent(preferences, "marketing")).toBe(false);
  });

  it("accepts active optional categories without enabling inactive marketing", () => {
    const preferences = createAcceptedOptionalConsent("2026-08-16T00:00:00.000Z");

    expect(preferences.functional).toBe(true);
    expect(preferences.analytics).toBe(true);
    expect(preferences.marketing).toBe(false);
  });

  it("does not allow necessary consent to be disabled", () => {
    const preferences = normalizeConsentPreferences({
      necessary: false as unknown as true,
      functional: false,
      analytics: false,
      marketing: true,
    });

    expect(preferences.necessary).toBe(true);
    expect(preferences.marketing).toBe(false);
  });
});
