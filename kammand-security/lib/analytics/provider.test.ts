import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createAnalyticsProvider,
  getConfiguredAnalyticsProviderName,
} from "./provider";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("analytics provider", () => {
  it("defaults to disabled when no provider is approved", () => {
    const provider = createAnalyticsProvider();

    expect(provider.name).toBe("disabled");
    expect(provider.enabled).toBe(false);
    expect(() => provider.track({ name: "contact_form_success" })).not.toThrow();
  });

  it("does not activate arbitrary provider names", () => {
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS_PROVIDER", "google-analytics");

    expect(getConfiguredAnalyticsProviderName()).toBe("disabled");
  });
});
