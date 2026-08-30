import { afterEach, describe, expect, it, vi } from "vitest";
import { checkContactRateLimit, resetContactRateLimit } from "./rate-limit";

describe("checkContactRateLimit", () => {
  afterEach(() => {
    resetContactRateLimit();
    vi.unstubAllEnvs();
  });

  it("flags the development fallback in production when explicitly configured", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("CONTACT_RATE_LIMIT_PROVIDER", "development");

    expect(checkContactRateLimit("release-test").productionFallback).toBe(true);
  });
});
