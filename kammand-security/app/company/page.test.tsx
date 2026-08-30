// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import CompanyRoute, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("CompanyRoute", () => {
  it("renders the company page with one H1 and breadcrumbs", () => {
    render(<CompanyRoute />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Clarity, accountability, and security by design.",
      }),
    ).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
  });

  it("links to relevant company routes without placeholder links", () => {
    render(<CompanyRoute />);

    [
      "/services",
      "/frameworks/sama-csf",
      "/frameworks/nca-ecc",
      "/frameworks/pdpl",
      "/frameworks/iso-27001",
      "/industries",
      "/insights",
      "/book",
      "/contact",
    ].forEach((href) => {
      expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === href)).toBe(
        true,
      );
    });
  });

  it("defines unique metadata without fabricated company schema", () => {
    render(<CompanyRoute />);

    expect(metadata.title).toBe("Company");
    expect(metadata.description).toContain("KAMMAND's approach");

    const scripts = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]'),
    ).map((script) => JSON.parse(script.textContent ?? "{}") as { "@type"?: string });

    expect(scripts.some((script) => script["@type"] === "BreadcrumbList")).toBe(true);
    expect(scripts.some((script) => script["@type"] === "Person")).toBe(false);
  });

  it("does not introduce fabricated company proof claims", () => {
    render(<CompanyRoute />);

    const pageText = document.body.textContent?.toLowerCase() ?? "";

    [
      "founded in",
      "our clients",
      "trusted by",
      "testimonial",
      "customer logos",
      "employee count",
      "iso certified",
      "soc 2",
      "award-winning",
    ].forEach((claim) => {
      expect(pageText).not.toContain(claim);
    });
  });
});
