// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import SamaCsfPage, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("SamaCsfPage", () => {
  it("renders the SAMA CSF page with one H1 and breadcrumbs", () => {
    render(<SamaCsfPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Build a practical approach to SAMA cybersecurity requirements.",
      }),
    ).toBeTruthy();

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/");
    expect(screen.getByRole("link", { name: "Frameworks" }).getAttribute("href")).toBe(
      "/frameworks",
    );
  });

  it("renders related frameworks, related services and source architecture", () => {
    render(<SamaCsfPage />);

    [
      ["/frameworks/nca-ecc", "NCA ECC"],
      ["/frameworks/pdpl", "Saudi PDPL"],
      ["/frameworks/iso-27001", "ISO 27001"],
      ["/services/grc-advisory", "GRC Advisory"],
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

    expect(screen.getByText(/No official source URLs are stored/i)).toBeTruthy();
    expect(screen.getByText(/not legal advice/i)).toBeTruthy();
  });

  it("does not introduce unsupported regulatory claims", () => {
    render(<SamaCsfPage />);

    const pageText = document.body.textContent ?? "";

    [
      "certified by",
      "approved by",
      "guaranteed compliance",
      "equivalent controls",
      "regulator endorsement",
    ].forEach((claim) => {
      expect(pageText.toLowerCase()).not.toContain(claim);
    });
  });

  it("defines metadata and breadcrumb structured data", () => {
    render(<SamaCsfPage />);

    expect(metadata.title).toBe("SAMA CSF");
    expect(metadata.description).toContain("SAMA Cyber Security Framework");

    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(jsonLd?.textContent ?? "{}") as {
      "@type": string;
    };

    expect(data["@type"]).toBe("BreadcrumbList");
  });
});
