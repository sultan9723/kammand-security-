import { describe, expect, it } from "vitest";
import { envRegistry, getProductionEnvironmentIssues } from "./env";

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
});
