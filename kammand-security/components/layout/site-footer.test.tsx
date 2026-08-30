// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SiteFooter } from "./site-footer";

afterEach(() => {
  cleanup();
});

describe("SiteFooter", () => {
  it("renders footer navigation groups with planned routes and no placeholder links", () => {
    render(<SiteFooter />);

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByText("KAMMAND")).toBeTruthy();
    expect(
      within(footer).getByText(
        "GRC and cybersecurity advisory for regulated organizations.",
      ),
    ).toBeTruthy();

    [
      ["/services/grc-advisory", "GRC Advisory"],
      ["/services/virtual-ciso", "Virtual CISO"],
      ["/services/risk-management", "Risk Management"],
      ["/services/third-party-risk", "Third-Party Risk"],
      ["/services/audit-readiness", "Audit Readiness"],
      ["/services/security-assurance", "Security Assurance"],
      ["/frameworks/sama-csf", "SAMA CSF"],
      ["/frameworks/nca-ecc", "NCA ECC"],
      ["/frameworks/pdpl", "Saudi PDPL"],
      ["/frameworks/iso-27001", "ISO 27001"],
      ["/company", "About"],
      ["/industries", "Industries"],
      ["/insights", "Insights"],
      ["/contact", "Contact"],
      ["/book", "Book a Consultation"],
      ["/privacy", "Privacy"],
      ["/cookies", "Cookie Policy"],
      ["/terms", "Terms"],
      ["/accessibility", "Accessibility"],
      ["/security", "Security"],
    ].forEach(([href, label]) => {
      expect(within(footer).getByRole("link", { name: label }).getAttribute("href")).toBe(
        href,
      );
    });

    expect(
      within(footer).getByRole("button", { name: "Cookie Preferences" }),
    ).toBeTruthy();

    within(footer)
      .getAllByRole("link")
      .forEach((link) => {
        expect(link.getAttribute("href")).not.toBe("#");
      });
  });

  it("keeps only one mobile navigation group expanded", () => {
    render(<SiteFooter />);

    const services = screen.getByRole("button", { name: "Services" });
    const frameworks = screen.getByRole("button", { name: "Frameworks" });

    fireEvent.click(services);
    expect(services.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(frameworks);
    expect(services.getAttribute("aria-expanded")).toBe("false");
    expect(frameworks.getAttribute("aria-expanded")).toBe("true");
  });

  it("renders actionable contact details and an accessible updates form", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: "hello@kammand.com" }).getAttribute("href"))
      .toBe("mailto:hello@kammand.com");
    expect(screen.getByRole("link", { name: "+966 50 123 4567" }).getAttribute("href"))
      .toBe("tel:+966501234567");
    expect(screen.getByLabelText("Email address for KAMMAND updates")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Request KAMMAND updates" })).toBeTruthy();
  });
});
