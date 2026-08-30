import { describe, expect, it } from "vitest";
import { thirdPartyServices } from "./third-party";

describe("third-party service inventory", () => {
  it("distinguishes active-when-configured providers from planned providers", () => {
    expect(
      thirdPartyServices.find((service) => service.provider === "Calendly")?.status,
    ).toBe("active-when-configured");
    expect(
      thirdPartyServices.find((service) => service.provider === "Analytics provider")
        ?.status,
    ).toBe("planned");
  });

  it("does not list hypothetical analytics CSP origins as active", () => {
    const analytics = thirdPartyServices.find(
      (service) => service.provider === "Analytics provider",
    );

    expect(analytics?.cspOrigins).toEqual([]);
    expect(analytics?.consentCategory).toBe("analytics");
  });
});
