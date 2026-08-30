// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import FinancialServicesPage, {
  metadata as financialServicesMetadata,
} from "./financial-services/page";
import FintechPaymentsPage, {
  metadata as fintechPaymentsMetadata,
} from "./fintech-payments/page";
import HealthcarePage, { metadata as healthcareMetadata } from "./healthcare/page";
import InsurancePage, { metadata as insuranceMetadata } from "./insurance/page";
import RegulatedEnterprisesPage, {
  metadata as regulatedEnterprisesMetadata,
} from "./regulated-enterprises/page";
import TechnologyPage, { metadata as technologyMetadata } from "./technology/page";

const industryPages = [
  {
    title: "Financial Services",
    h1: "Strengthen governance and cyber resilience in financial services.",
    Page: FinancialServicesPage,
    metadata: financialServicesMetadata,
    services: [
      "/services/grc-advisory",
      "/services/virtual-ciso",
      "/services/risk-management",
      "/services/third-party-risk",
      "/services/audit-readiness",
      "/services/security-assurance",
    ],
    frameworks: [
      "/frameworks/sama-csf",
      "/frameworks/nca-ecc",
      "/frameworks/pdpl",
      "/frameworks/iso-27001",
    ],
    relatedIndustries: ["/industries/fintech-payments", "/industries/insurance"],
  },
  {
    title: "Fintech & Payments",
    h1: "Build security governance that can keep pace with growth.",
    Page: FintechPaymentsPage,
    metadata: fintechPaymentsMetadata,
    services: [
      "/services/virtual-ciso",
      "/services/risk-management",
      "/services/third-party-risk",
      "/services/grc-advisory",
      "/services/audit-readiness",
    ],
    frameworks: [
      "/frameworks/sama-csf",
      "/frameworks/nca-ecc",
      "/frameworks/pdpl",
      "/frameworks/iso-27001",
    ],
    relatedIndustries: ["/industries/financial-services", "/industries/technology"],
  },
  {
    title: "Insurance",
    h1: "Make cyber risk visible, owned, and governable.",
    Page: InsurancePage,
    metadata: insuranceMetadata,
    services: [
      "/services/risk-management",
      "/services/grc-advisory",
      "/services/third-party-risk",
      "/services/security-assurance",
      "/services/audit-readiness",
    ],
    frameworks: ["/frameworks/pdpl", "/frameworks/nca-ecc", "/frameworks/iso-27001"],
    relatedIndustries: ["/industries/financial-services", "/industries/healthcare"],
  },
  {
    title: "Technology",
    h1: "Scale technology without losing control of security risk.",
    Page: TechnologyPage,
    metadata: technologyMetadata,
    services: [
      "/services/virtual-ciso",
      "/services/risk-management",
      "/services/third-party-risk",
      "/services/security-assurance",
      "/services/grc-advisory",
    ],
    frameworks: ["/frameworks/iso-27001", "/frameworks/nca-ecc", "/frameworks/pdpl"],
    relatedIndustries: ["/industries/fintech-payments", "/industries/regulated-enterprises"],
  },
  {
    title: "Healthcare",
    h1: "Protect sensitive information through stronger governance.",
    Page: HealthcarePage,
    metadata: healthcareMetadata,
    services: [
      "/services/grc-advisory",
      "/services/risk-management",
      "/services/third-party-risk",
      "/services/security-assurance",
      "/services/audit-readiness",
    ],
    frameworks: ["/frameworks/pdpl", "/frameworks/iso-27001", "/frameworks/nca-ecc"],
    relatedIndustries: ["/industries/regulated-enterprises", "/industries/technology"],
  },
  {
    title: "Critical & Regulated Enterprises",
    h1: "Build assurance where operational accountability matters most.",
    Page: RegulatedEnterprisesPage,
    metadata: regulatedEnterprisesMetadata,
    services: [
      "/services/grc-advisory",
      "/services/risk-management",
      "/services/third-party-risk",
      "/services/audit-readiness",
      "/services/security-assurance",
      "/services/virtual-ciso",
    ],
    frameworks: ["/frameworks/nca-ecc", "/frameworks/iso-27001", "/frameworks/pdpl"],
    relatedIndustries: ["/industries/technology", "/industries/financial-services"],
  },
] as const;

afterEach(() => {
  cleanup();
});

describe("industry detail pages", () => {
  it.each(industryPages)("renders $title with one H1 and breadcrumbs", ({ Page, h1 }) => {
    render(<Page />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: h1 })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/");
    expect(screen.getByRole("link", { name: "Industries" }).getAttribute("href")).toBe(
      "/industries",
    );
  });

  it.each(industryPages)(
    "renders $title service, framework and related-industry links",
    ({ Page, services, frameworks, relatedIndustries }) => {
      render(<Page />);

      [...services, ...frameworks, ...relatedIndustries].forEach((href) => {
        expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === href)).toBe(
          true,
        );
      });
    },
  );

  it.each(industryPages)("does not introduce fabricated claims on $title", ({ Page }) => {
    render(<Page />);

    const pageText = (document.body.textContent ?? "").toLowerCase();

    [
      "our banking clients",
      "we have helped hundreds",
      "leading healthcare organizations trust",
      "industry-leading expertise",
      "trusted by",
      "case study",
      "must comply",
      "hipaa",
      "pci dss",
      "soc 2",
    ].forEach((claim) => {
      expect(pageText).not.toContain(claim);
    });
  });

  it("defines unique metadata for every industry detail page", () => {
    const titles = industryPages.map(({ metadata }) => metadata.title);
    const descriptions = industryPages.map(({ metadata }) => metadata.description);

    expect(new Set(titles).size).toBe(industryPages.length);
    expect(new Set(descriptions).size).toBe(industryPages.length);
  });
});
