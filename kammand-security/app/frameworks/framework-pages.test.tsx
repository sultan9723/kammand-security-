// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Iso27001Page, { metadata as iso27001Metadata } from "./iso-27001/page";
import NcaEccPage, { metadata as ncaEccMetadata } from "./nca-ecc/page";
import PdplPage, { metadata as pdplMetadata } from "./pdpl/page";

const frameworkPages = [
  {
    title: "NCA ECC",
    h1: "Build cybersecurity controls around clear accountability.",
    Page: NcaEccPage,
    metadata: ncaEccMetadata,
    relatedFrameworks: ["/frameworks/sama-csf", "/frameworks/pdpl", "/frameworks/iso-27001"],
    relatedServices: [
      "/services/grc-advisory",
      "/services/virtual-ciso",
      "/services/risk-management",
      "/services/audit-readiness",
      "/services/security-assurance",
    ],
  },
  {
    title: "Saudi PDPL",
    h1: "Turn privacy obligations into practical governance.",
    Page: PdplPage,
    metadata: pdplMetadata,
    relatedFrameworks: [
      "/frameworks/sama-csf",
      "/frameworks/nca-ecc",
      "/frameworks/iso-27001",
    ],
    relatedServices: [
      "/services/grc-advisory",
      "/services/risk-management",
      "/services/third-party-risk",
      "/services/audit-readiness",
      "/services/security-assurance",
    ],
  },
  {
    title: "ISO 27001",
    h1: "Build an information security management system that works in practice.",
    Page: Iso27001Page,
    metadata: iso27001Metadata,
    relatedFrameworks: ["/frameworks/sama-csf", "/frameworks/nca-ecc", "/frameworks/pdpl"],
    relatedServices: [
      "/services/grc-advisory",
      "/services/risk-management",
      "/services/audit-readiness",
      "/services/security-assurance",
      "/services/virtual-ciso",
    ],
  },
] as const;

afterEach(() => {
  cleanup();
});

describe("remaining framework detail pages", () => {
  it.each(frameworkPages)("renders $title with one H1 and breadcrumbs", ({ Page, h1 }) => {
    render(<Page />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: h1 })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/");
    expect(screen.getByRole("link", { name: "Frameworks" }).getAttribute("href")).toBe(
      "/frameworks",
    );
  });

  it.each(frameworkPages)(
    "renders $title relationship links, related services, source area and disclaimer",
    ({ Page, relatedFrameworks, relatedServices }) => {
      render(<Page />);

      [...relatedFrameworks, ...relatedServices].forEach((href) => {
        expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === href)).toBe(
          true,
        );
      });

      expect(screen.getByText(/No official source URLs are stored/i)).toBeTruthy();
      expect(screen.getByText(/not legal advice/i)).toBeTruthy();
    },
  );

  it.each(frameworkPages)("does not introduce unsupported claims on $title", ({ Page }) => {
    render(<Page />);

    const pageText = (document.body.textContent ?? "").toLowerCase();

    [
      "certified by",
      "approved by",
      "guaranteed compliance",
      "regulator endorsement",
      "iso compliance satisfies nca",
      "sama automatically satisfies nca",
      "pdpl compliance equals iso compliance",
      "get iso certified by kammand",
    ].forEach((claim) => {
      expect(pageText).not.toContain(claim);
    });
  });

  it("defines unique metadata for every remaining framework page", () => {
    const titles = frameworkPages.map(({ metadata }) => metadata.title);
    const descriptions = frameworkPages.map(({ metadata }) => metadata.description);

    expect(new Set(titles).size).toBe(frameworkPages.length);
    expect(new Set(descriptions).size).toBe(frameworkPages.length);
  });
});
