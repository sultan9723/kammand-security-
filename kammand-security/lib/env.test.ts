import { describe, expect, it } from "vitest";
import {
  envRegistry,
  getProductionEnvironmentChecks,
  getProductionEnvironmentIssues,
} from "./env";

describe("environment registry", () => {
  it("classifies public and server-only production configuration", () => {
    expect(envRegistry.some((item) => item.name === "NEXT_PUBLIC_SITE_URL")).toBe(true);
    expect(
      envRegistry.find((item) => item.name === "RESEND_API_KEY")?.visibility,
    ).toBe("server-only");
  });

  it("does not require production secrets outside production", () => {
    expect(getProductionEnvironmentIssues({ NODE_ENV: "development" })).toEqual([]);
  });

  it("reports missing production contact and rate-limit configuration", () => {
    const issues = getProductionEnvironmentIssues({
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "https://www.example.com",
      CONTACT_DELIVERY_PROVIDER: "development",
      CONTACT_RATE_LIMIT_PROVIDER: "development",
    });

    expect(issues).toContain("CONTACT_DELIVERY_PROVIDER must be configured for production delivery.");
    expect(issues).toContain("RESEND_API_KEY must be configured for production contact delivery.");
    expect(issues).toContain("CONTACT_RATE_LIMIT_PROVIDER must use a persistent production provider.");
  });

  it("does not block a first production deploy when the site URL is unknown, but warns", () => {
    const { issues, warnings } = getProductionEnvironmentChecks({
      NODE_ENV: "production",
      CONTACT_DELIVERY_PROVIDER: "resend",
      CONTACT_RECIPIENT: "inbox@example.com",
      CONTACT_FROM: "KAMMAND <no-reply@example.com>",
      RESEND_API_KEY: "re_placeholder",
      CONTACT_RATE_LIMIT_PROVIDER: "upstash",
    });

    expect(issues).toEqual([]);
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings.some((w) => w.includes("NEXT_PUBLIC_SITE_URL"))).toBe(true);
  });

  it("does not add a NEXT_PUBLIC prefix to server-only secrets in the registry", () => {
    const serverOnly = envRegistry.filter((item) => item.visibility === "server-only");
    for (const secret of serverOnly) {
      expect(secret.name.startsWith("NEXT_PUBLIC_")).toBe(false);
      expect(getProductionEnvironmentIssues({ NODE_ENV: "production" })).toBeDefined();
    }
  });
});
