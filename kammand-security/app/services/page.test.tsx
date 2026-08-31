// @vitest-environment jsdom

import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ServicesPage, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("ServicesPage", () => {
  it("renders the services overview with one H1 and all service summaries", () => {
    render(<ServicesPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "GRC and cybersecurity services for regulated organizations.",
      }),
    ).toBeTruthy();

    [
      "GRC Advisory",
      "Virtual CISO",
      "Risk Management",
      "Third-Party Risk",
      "Audit Readiness",
      "Security Assurance",
    ].forEach((service) => {
      expect(screen.getByRole("heading", { level: 3, name: service })).toBeTruthy();
    });
  });

  it("renders service and framework links with planned destinations", () => {
    render(<ServicesPage />);

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
    ].forEach(([href, label]) => {
      expect(
        screen
          .getAllByRole("link", { name: new RegExp(label) })
          .some((link) => link.getAttribute("href") === href),
      ).toBe(true);
    });
  });

  it("renders the framework matrix, engagement flow, and consultation actions", () => {
    render(<ServicesPage />);

    [
      "Choose the advisory path that fits the problem.",
      "Frameworks shape how the work is organized.",
      "Structured advisory from discovery to assurance.",
      "Ready to bring clarity to your GRC program?",
    ].forEach((heading) => {
      expect(screen.getByRole("heading", { level: 2, name: heading })).toBeTruthy();
    });

    expect(
      screen.getByRole("region", {
        name: "Indicative service and framework relationship matrix",
      }),
    ).toBeTruthy();
    expect(screen.getByRole("table")).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /Book a Consultation/ }).every(
      (link) => link.getAttribute("href") === "/book",
    )).toBe(true);
    expect(screen.getAllByRole("link", { name: /Explore Services/ }).some(
      (link) => link.getAttribute("href") === "#service-capabilities",
    )).toBe(true);
    const principles = screen.getByRole("list", { name: "KAMMAND service principles" });
    ["Tailored", "Integrated", "Practical", "Trusted"].forEach((principle) => {
      expect(within(principles).getByText(principle)).toBeTruthy();
    });
  });

  it("defines unique metadata and supportable service structured data", () => {
    render(<ServicesPage />);

    expect(metadata.title).toBe("Services");
    expect(metadata.description).toBe(
      "GRC and cybersecurity services that help regulated organizations structure programs, controls, evidence and action.",
    );

    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(jsonLd?.textContent ?? "{}") as { "@type": string };

    expect(data["@type"]).toBe("Service");
    expect(data).not.toHaveProperty("aggregateRating");
    expect(data).not.toHaveProperty("review");
  });
});
