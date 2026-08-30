import { describe, expect, it, vi } from "vitest";

vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.example.com");

describe("sitemap", () => {
  it("includes the insights index and excludes draft insight routes", async () => {
    const { default: sitemap } = await import("./sitemap");
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain("https://www.example.com/insights");
    expect(urls).toContain("https://www.example.com/company");
    expect(urls).toContain("https://www.example.com/security");
    expect(urls).toContain("https://www.example.com/contact");
    expect(urls).toContain("https://www.example.com/book");
    expect(urls).toContain("https://www.example.com/privacy");
    expect(urls).toContain("https://www.example.com/cookies");
    expect(urls).toContain("https://www.example.com/terms");
    expect(urls).toContain("https://www.example.com/accessibility");
    expect(urls).not.toContain(
      "https://www.example.com/insights/overlapping-cybersecurity-frameworks",
    );
    expect(urls).not.toContain(
      "https://www.example.com/insights/audit-evidence-readiness",
    );
    expect(urls).not.toContain(
      "https://www.example.com/insights/continuous-third-party-risk",
    );
  });
});
