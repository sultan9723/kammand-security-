import { describe, expect, it } from "vitest";
import nextConfig from "./next.config";

describe("nextConfig security headers", () => {
  it("sets conservative security headers without wildcard or unsafe-eval CSP", async () => {
    expect(nextConfig.headers).toBeTypeOf("function");

    const headerRoutes = await nextConfig.headers?.();
    const headers = headerRoutes?.[0]?.headers ?? [];
    const headerMap = new Map(headers.map((header) => [header.key, header.value]));
    const csp = headerMap.get("Content-Security-Policy") ?? "";

    expect(headerMap.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headerMap.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(headerMap.get("X-Frame-Options")).toBe("DENY");
    expect(headerMap.get("Strict-Transport-Security")).toContain("max-age=");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("frame-src 'self' https://calendly.com");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).not.toContain("*");
  });
});
