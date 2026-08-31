// @vitest-environment jsdom

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Home from "./page";

afterEach(() => {
  cleanup();
});

describe("Home", () => {
  it("renders the approved hero with exactly one H1", () => {
    render(<Home />);

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toBe(
      "Navigate regulation. Control risk. Stay audit-ready.",
    );
    expect(
      screen.getByText(
        "Strategic GRC and cybersecurity advisory for regulated organizations across the GCC.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Where Precision Meets Protection")).toBeTruthy();
  });

  it("renders supportable homepage structured data", () => {
    render(<Home />);

    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    expect(jsonLd?.textContent).toBeTruthy();

    const data = JSON.parse(jsonLd?.textContent ?? "{}") as {
      "@type": string;
      name: string;
      description: string;
      serviceType: string[];
    };

    expect(data["@type"]).toBe("ProfessionalService");
    expect(data.name).toBe("KAMMAND Security");
    expect(data.description).toBe(
      "Strategic GRC and cybersecurity advisory for regulated organizations across the GCC.",
    );
    expect(data.serviceType).toContain("GRC advisory");
    expect(data).not.toHaveProperty("aggregateRating");
    expect(data).not.toHaveProperty("review");
  });

  it("renders crawlable hero CTAs", () => {
    render(<Home />);

    expect(
      screen.getAllByRole("link", { name: "Book a Consultation" }).some(
        (link) => link.getAttribute("href") === "/book",
      ),
    ).toBe(true);
    expect(
      screen.getAllByRole("link", { name: "Explore Services" }).every(
        (link) => link.getAttribute("href") === "/services",
      ),
    ).toBe(true);
  });

  it("keeps the visualization out of the heading hierarchy", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("img", {
        name: "KAMMAND governance, risk, and compliance orbit",
      }),
    ).toBeTruthy();
    [
      "GOVERN",
      "IDENTIFY",
      "PROTECT",
      "DETECT",
      "RESPOND",
      "RECOVER",
      "COMPLY",
      "ASSURE",
    ].forEach((label) => {
      expect(screen.getByText(label, { selector: ".grc-orbit__label" })).toBeTruthy();
    });
  });

  it("supports reduced motion for the orbit animation", () => {
    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain(".grc-orbit__ring");
    expect(css).toContain(".grc-orbit__connector");
    expect(css).toContain("stroke-dashoffset: 0");
    expect(css).toContain(".grc-orbit__core");
    expect(css).toContain(".grc-orbit__node");
    expect(css).toContain("transform: none");
  });

  it("renders the framework intelligence section without adding another H1", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Multiple Frameworks. One control environment.",
      }),
    ).toBeTruthy();
    expect(screen.getByText("FRAMEWORK INTELLIGENCE")).toBeTruthy();
    expect(
      screen.getByText(
        "One coordinated approach to governance, cybersecurity, privacy and assurance.",
      ),
    ).toBeTruthy();
  });

  it("renders framework links and capability domains", () => {
    render(<Home />);

    expect(
      screen
        .getByRole("link", {
          name: "SAMA CSF: Financial-sector cybersecurity governance.",
        })
        .getAttribute("href"),
    ).toBe("/frameworks/sama-csf");
    expect(
      screen
        .getByRole("link", {
          name: "NCA ECC: Essential cybersecurity control requirements.",
        })
        .getAttribute("href"),
    ).toBe("/frameworks/nca-ecc");
    expect(
      screen
        .getByRole("link", {
          name: "Saudi PDPL: Personal data and privacy governance.",
        })
        .getAttribute("href"),
    ).toBe("/frameworks/pdpl");
    expect(
      screen
        .getByRole("link", {
          name: "ISO 27001: Information security management.",
        })
        .getAttribute("href"),
    ).toBe("/frameworks/iso-27001");

    [
      "Governance",
      "Risk Management",
      "Compliance",
      "Data Protection",
      "Incident Response",
      "Assurance",
    ].forEach((capability) => {
      expect(screen.getAllByText(capability).length).toBeGreaterThan(0);
    });
  });

  it("exposes the framework control model and capability descriptions as text", () => {
    render(<Home />);

    expect(
      screen.getByLabelText("KAMMAND framework intelligence control model"),
    ).toBeTruthy();

    expect(screen.getByText("CONTROL MODEL")).toBeTruthy();

    [
      "Establish direction and accountability.",
      "Identify, assess and treat organizational risk.",
      "Meet regulatory and contractual obligations.",
      "Protect personal data and ensure privacy.",
      "Detect, respond and recover effectively.",
      "Validate effectiveness and build confidence.",
    ].forEach((description) => {
      expect(screen.getByText(description)).toBeTruthy();
    });
  });

  it("renders the capabilities section with a logical heading hierarchy", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "End-to-end GRC and cybersecurity advisory.",
      }),
    ).toBeTruthy();
    expect(screen.getByText("CAPABILITIES")).toBeTruthy();

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

  it("renders service descriptions and crawlable service links", () => {
    render(<Home />);

    const services = [
      {
        name: "GRC Advisory",
        href: "/services/grc-advisory",
        description:
          "Translate regulatory and business requirements into practical governance, risk, and compliance programs.",
      },
      {
        name: "Virtual CISO",
        href: "/services/virtual-ciso",
        description:
          "Strategic cybersecurity leadership for organizations that need experienced security direction without a full-time CISO.",
      },
      {
        name: "Risk Management",
        href: "/services/risk-management",
        description:
          "Identify, assess, prioritize, and manage cybersecurity risk through structured and decision-focused programs.",
      },
      {
        name: "Third-Party Risk",
        href: "/services/third-party-risk",
        description:
          "Evaluate supplier and partner risk with structured due diligence, control reviews, and ongoing oversight.",
      },
      {
        name: "Audit Readiness",
        href: "/services/audit-readiness",
        description:
          "Prepare controls, evidence, ownership, and remediation activities before regulatory or certification assessments.",
      },
      {
        name: "Security Assurance",
        href: "/services/security-assurance",
        description:
          "Assess whether cybersecurity controls are designed appropriately, operating effectively, and supported by reliable evidence.",
      },
    ];

    services.forEach(({ name, href, description }) => {
      expect(screen.getByText(description)).toBeTruthy();
      expect(
        screen
          .getAllByRole("link", { name: new RegExp(name) })
          .some((link) => link.getAttribute("href") === href),
      ).toBe(true);
    });
  });

  it("renders the process section as an ordered sequence without adding another H1", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "From uncertainty to assurance.",
      }),
    ).toBeTruthy();
    expect(screen.getByText("HOW WE WORK")).toBeTruthy();
    expect(
      screen.getByRole("list", { name: "KAMMAND advisory process" }),
    ).toBeTruthy();

    ["Discover", "Design", "Deliver", "Assure"].forEach((stage) => {
      expect(screen.getByRole("heading", { level: 3, name: stage })).toBeTruthy();
    });
  });

  it("keeps the process stages in the approved order with server-rendered descriptions", () => {
    render(<Home />);

    const processList = screen.getByRole("list", { name: "KAMMAND advisory process" });
    const stages = Array.from(processList.querySelectorAll("h3")).map(
      (heading) => heading.textContent,
    );

    expect(stages).toEqual(["Discover", "Design", "Deliver", "Assure"]);
    expect(
      screen.getByText(
        "Understand the organization, regulatory obligations, current controls, risk exposure, and business priorities.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Translate requirements and identified gaps into a practical governance, risk, compliance, and security roadmap.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Support implementation of controls, documentation, remediation activities, ownership, and evidence.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Review control effectiveness, evidence, and readiness to help maintain confidence beyond a single assessment.",
      ),
    ).toBeTruthy();
  });

  it("supports reduced motion for the process timeline", () => {
    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

    expect(css).toContain(".process-steps::before");
    expect(css).toContain(".process-step");
    expect(css).toContain("animation: none");
    expect(css).toContain("transform: none");
  });

  it("renders the insights section without exposing draft article fixtures", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Perspective for a changing risk landscape.",
      }),
    ).toBeTruthy();
    expect(screen.getByText("INSIGHTS")).toBeTruthy();
    expect(screen.getByText("EDITORIAL REVIEW IN PROGRESS")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /View Insights/ }).getAttribute("href"),
    ).toBe("/insights");

    expect(
      screen.queryByText("Understanding overlapping cybersecurity frameworks"),
    ).toBeNull();
    expect(screen.queryByText("Building evidence before the audit begins")).toBeNull();
    expect(
      screen.queryByText("Why third-party risk needs continuous oversight"),
    ).toBeNull();
  });

  it("renders the final CTA with the canonical consultation and services links", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Ready to bring clarity to your GRC program?",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Book a focused consultation about an active or near-term advisory need, or explore KAMMAND's service paths first.",
      ),
    ).toBeTruthy();
    expect(
      screen.getAllByRole("link", { name: "Book a Consultation" }).some(
        (link) => link.getAttribute("href") === "/book",
      ),
    ).toBe(true);
    expect(
      screen.getAllByRole("link", { name: "Explore Services" }).some(
        (link) => link.getAttribute("href") === "/services",
      ),
    ).toBe(true);
  });
});
