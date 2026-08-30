import { describe, expect, it } from "vitest";
import { getOrganizationJsonLd, siteConfig } from "./site";

describe("siteConfig", () => {
  it("defines the homepage SEO title and description without a hard-coded domain", () => {
    expect(siteConfig.title).toBe(
      "KAMMAND Security | GRC & Cybersecurity Advisory",
    );
    expect(siteConfig.description).toBe(
      "Strategic GRC and cybersecurity advisory for regulated organizations across the GCC.",
    );
    expect(siteConfig.url).toBe(process.env.NEXT_PUBLIC_SITE_URL);
  });

  it("emits structured data without unsupported trust claims", () => {
    const data = getOrganizationJsonLd();

    expect(data.name).toBe("KAMMAND Security");
    expect(data).not.toHaveProperty("foundingDate");
    expect(data).not.toHaveProperty("award");
    expect(data).not.toHaveProperty("aggregateRating");
    expect(data).not.toHaveProperty("sameAs");
  });
});
