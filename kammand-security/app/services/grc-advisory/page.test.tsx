// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import GrcAdvisoryPage, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("GrcAdvisoryPage", () => {
  it("renders the GRC Advisory page with one H1 and breadcrumbs", () => {
    render(<GrcAdvisoryPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Governance, risk and compliance that works in practice.",
      }),
    ).toBeTruthy();

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/");
    expect(screen.getByRole("link", { name: "Services" }).getAttribute("href")).toBe(
      "/services",
    );
    expect(screen.getAllByText("GRC Advisory").length).toBeGreaterThan(0);
  });

  it("renders the service-detail template sections and internal links", () => {
    render(<GrcAdvisoryPage />);

    [
      "The problem this service addresses.",
      "Practical advisory across governance, controls and evidence.",
      "Organizations that need a clearer GRC operating model.",
      "What the engagement helps strengthen.",
      "Framework-aware without overstating equivalence.",
      "A structured path from discovery to assurance.",
      "Adjacent support for risk, audit and assurance.",
      "Ready to make GRC more practical?",
    ].forEach((heading) => {
      expect(screen.getByRole("heading", { name: heading })).toBeTruthy();
    });

    [
      ["/book", "Book a Consultation"],
      ["/services", "Explore Services"],
      ["/frameworks/sama-csf", "SAMA CSF"],
      ["/frameworks/nca-ecc", "NCA ECC"],
      ["/frameworks/pdpl", "Saudi PDPL"],
      ["/frameworks/iso-27001", "ISO 27001"],
      ["/services/risk-management", "Risk Management"],
      ["/services/audit-readiness", "Audit Readiness"],
      ["/services/security-assurance", "Security Assurance"],
    ].forEach(([href, label]) => {
      expect(
        screen
          .getAllByRole("link", { name: new RegExp(label) })
          .some((link) => link.getAttribute("href") === href),
      ).toBe(true);
    });
  });

  it("defines service metadata plus breadcrumb and service structured data", () => {
    render(<GrcAdvisoryPage />);

    expect(metadata.title).toBe("GRC Advisory");
    expect(metadata.description).toContain("Practical governance, risk and compliance");

    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(jsonLd?.textContent ?? "[]") as Array<{
      "@type": string;
      name?: string;
    }>;

    expect(data.some((entry) => entry["@type"] === "BreadcrumbList")).toBe(true);
    expect(
      data.some((entry) => entry["@type"] === "Service" && entry.name === "GRC Advisory"),
    ).toBe(true);
  });
});
