// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import SecurityRoute, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("SecurityRoute", () => {
  it("renders the security page with one H1 and breadcrumbs", () => {
    render(<SecurityRoute />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Trust should be supported by how you operate.",
      }),
    ).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
  });

  it("distinguishes current website implementation from future integrations", () => {
    render(<SecurityRoute />);

    expect(screen.getAllByText("Current Website Implementation").length).toBeGreaterThan(0);
    expect(
      screen.getByText("Conservative security headers are configured in the Next.js application."),
    ).toBeTruthy();
    expect(screen.getAllByText("Future Trust Documentation").length).toBeGreaterThan(0);
    expect(screen.getByText(/not presented as active on this page/i)).toBeTruthy();
  });

  it("links to appropriate trust, privacy and contact routes", () => {
    render(<SecurityRoute />);

    ["/privacy", "/cookies", "/contact", "/book"].forEach((href) => {
      expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === href)).toBe(
        true,
      );
    });
  });

  it("defines unique metadata and only breadcrumb structured data", () => {
    render(<SecurityRoute />);

    expect(metadata.title).toBe("Security");
    expect(metadata.description).toContain("security");

    const scripts = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]'),
    ).map((script) => JSON.parse(script.textContent ?? "{}") as { "@type"?: string });

    expect(scripts.some((script) => script["@type"] === "BreadcrumbList")).toBe(true);
    expect(scripts.some((script) => script["@type"] === "Review")).toBe(false);
  });

  it("does not fabricate trust proof or security contact details", () => {
    render(<SecurityRoute />);

    const pageText = document.body.textContent?.toLowerCase() ?? "";

    expect(pageText).toContain("not a bug bounty program");
    expect(pageText).toContain("does not promise monetary rewards");

    [
      "iso certified",
      "soc 2",
      "99.9%",
      "security audit result",
      "breach-free",
      "security@",
      "certified by",
      "approved by",
    ].forEach((claim) => {
      expect(pageText).not.toContain(claim);
    });
  });
});
