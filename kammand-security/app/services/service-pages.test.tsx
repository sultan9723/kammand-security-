// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import AuditReadinessPage, {
  metadata as auditReadinessMetadata,
} from "./audit-readiness/page";
import RiskManagementPage, {
  metadata as riskManagementMetadata,
} from "./risk-management/page";
import SecurityAssurancePage, {
  metadata as securityAssuranceMetadata,
} from "./security-assurance/page";
import ThirdPartyRiskPage, {
  metadata as thirdPartyRiskMetadata,
} from "./third-party-risk/page";
import VirtualCisoPage, { metadata as virtualCisoMetadata } from "./virtual-ciso/page";

const servicePages = [
  {
    title: "Virtual CISO",
    href: "/services/virtual-ciso",
    h1: "Strategic security leadership without unnecessary overhead.",
    Page: VirtualCisoPage,
    metadata: virtualCisoMetadata,
    related: [
      "/services/grc-advisory",
      "/services/risk-management",
      "/services/security-assurance",
    ],
  },
  {
    title: "Risk Management",
    href: "/services/risk-management",
    h1: "Turn cybersecurity risk into decisions your business can act on.",
    Page: RiskManagementPage,
    metadata: riskManagementMetadata,
    related: [
      "/services/grc-advisory",
      "/services/third-party-risk",
      "/services/security-assurance",
    ],
  },
  {
    title: "Third-Party Risk",
    href: "/services/third-party-risk",
    h1: "Know where supplier risk enters your control environment.",
    Page: ThirdPartyRiskPage,
    metadata: thirdPartyRiskMetadata,
    related: [
      "/services/risk-management",
      "/services/grc-advisory",
      "/services/audit-readiness",
    ],
  },
  {
    title: "Audit Readiness",
    href: "/services/audit-readiness",
    h1: "Prepare before the auditor starts asking for evidence.",
    Page: AuditReadinessPage,
    metadata: auditReadinessMetadata,
    related: [
      "/services/grc-advisory",
      "/services/security-assurance",
      "/services/risk-management",
    ],
  },
  {
    title: "Security Assurance",
    href: "/services/security-assurance",
    h1: "Confidence that controls exist, operate, and can be evidenced.",
    Page: SecurityAssurancePage,
    metadata: securityAssuranceMetadata,
    related: [
      "/services/audit-readiness",
      "/services/risk-management",
      "/services/virtual-ciso",
    ],
  },
] as const;

afterEach(() => {
  cleanup();
});

describe("remaining service pages", () => {
  it.each(servicePages)("renders $title with one H1 and breadcrumbs", ({ Page, h1 }) => {
    render(<Page />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: h1 })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/");
    expect(screen.getByRole("link", { name: "Services" }).getAttribute("href")).toBe(
      "/services",
    );
  });

  it.each(servicePages)(
    "renders $title related service links and structured data",
    ({ Page, related, title }) => {
      render(<Page />);

      related.forEach((href) => {
        expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === href)).toBe(
          true,
        );
      });

      const jsonLd = document.querySelector('script[type="application/ld+json"]');
      const data = JSON.parse(jsonLd?.textContent ?? "[]") as Array<{
        "@type": string;
        name?: string;
      }>;

      expect(data.some((entry) => entry["@type"] === "BreadcrumbList")).toBe(true);
      expect(data.some((entry) => entry["@type"] === "Service" && entry.name === title)).toBe(
        true,
      );
    },
  );

  it("defines unique metadata for every remaining service page", () => {
    const titles = servicePages.map(({ metadata }) => metadata.title);
    const descriptions = servicePages.map(({ metadata }) => metadata.description);

    expect(new Set(titles).size).toBe(servicePages.length);
    expect(new Set(descriptions).size).toBe(servicePages.length);
    descriptions.forEach((description) => {
      expect(typeof description).toBe("string");
      expect(description).not.toContain("guarantee");
    });
  });
});
