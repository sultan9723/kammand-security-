// @vitest-environment jsdom

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Home from "./page";
import { homepageFaqs } from "../lib/faq";
import { engagementOutcomes } from "../lib/proof";
import { teamMembers } from "../lib/team";
import { frameworkBadges } from "../lib/framework-badges";
import { industrySummaries } from "../lib/industries";

afterEach(() => {
  cleanup();
});

describe("Home", () => {
  it("renders the approved hero with exactly one H1", () => {
    render(<Home />);

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toBe(
      "SAMA, NCA, PDPL and ISO 27001 assurance for regulated organizations across the GCC.",
    );
    expect(
      screen.getByText(
        "Controls, evidence, and assurance that hold up under regulatory scrutiny.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Where Precision Meets Protection")).toBeTruthy();

    // Both lines below are factual claims — a held credential, and a statement
    // of who the practice is built for rather than who it has served. Pinned
    // so neither drifts into a fabricated certification or customer claim
    // unnoticed. See AGENTS.md.
    expect(
      screen.getByText(
        "Led by an ISO 27001 Lead Auditor · SAMA CSF & CRFR specialist advisory",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Built for organizations under SAMA, NCA, and PDPL supervision.",
      ),
    ).toBeTruthy();
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
      document
        .querySelector(".homepage-hero__actions")
        ?.querySelector('a[href="/book"]')?.textContent,
    ).toContain("Book a Consultation");
    expect(
      screen.getAllByRole("link", { name: "Book a Consultation" }).some(
        (link) => link.getAttribute("href") === "/book",
      ),
    ).toBe(true);
    expect(
      document
        .querySelector(".homepage-hero__actions")
        ?.querySelector('a[href="/services"]')?.textContent,
    ).toContain("Explore Services");
  });

  it("places the services overview before the homepage capabilities section", () => {
    render(<Home />);

    const serviceOverviewTitle = screen.getByRole("heading", {
      level: 2,
      name: "GRC and cybersecurity services for regulated organizations.",
    });
    const capabilitiesTitle = screen.getByRole("heading", {
      level: 2,
      name: "GRC and cybersecurity, built around your risk.",
    });

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen
        .getAllByRole("link", { name: "Explore Services" })
        .some((link) => link.getAttribute("href") === "#homepage-capabilities"),
    ).toBe(true);
    expect(
      serviceOverviewTitle.compareDocumentPosition(capabilitiesTitle) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
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
      "ASSESS",
      "CONTROL",
      "REMEDIATE",
      "EVIDENCE",
      "COMPLY",
      "ASSURE",
      "REPORT",
    ].forEach((label) => {
      expect(screen.getByText(label, { selector: ".grc-orbit__label" })).toBeTruthy();
    });
  });

  it("supports reduced motion for the orbit animation", () => {
    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain(".grc-orbit__core");
    expect(css).toContain("animation: none");
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
    expect(screen.getByText("Framework Intelligence")).toBeTruthy();
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
        name: "GRC and cybersecurity, built around your risk.",
      }),
    ).toBeTruthy();
    expect(screen.getByText("Capabilities")).toBeTruthy();

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
    expect(screen.getByText("How We Work")).toBeTruthy();
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

  it("renders the industries section linking every industry page", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Built for regulated sectors.",
      }),
    ).toBeTruthy();
    expect(screen.getByText("Industries")).toBeTruthy();

    [
      { name: "Financial Services", href: "/industries/financial-services" },
      { name: "Fintech & Payments", href: "/industries/fintech-payments" },
      { name: "Insurance", href: "/industries/insurance" },
      { name: "Technology", href: "/industries/technology" },
      { name: "Healthcare", href: "/industries/healthcare" },
      {
        name: "Critical & Regulated Enterprises",
        href: "/industries/regulated-enterprises",
      },
    ].forEach((industry) => {
      expect(
        screen.getByRole("heading", { level: 3, name: industry.name }),
      ).toBeTruthy();
      expect(
        screen
          .getAllByRole("link")
          .some((link) => link.getAttribute("href") === industry.href),
      ).toBe(true);
    });
  });

  it("keeps unpublished placeholder content off the homepage", () => {
    render(<Home />);

    // Insights left the homepage while every entry was still unpublished.
    // A regulated buyer reads "in review" as a firm that is not yet operating.
    [
      "EDITORIAL REVIEW IN PROGRESS",
      "PUBLICATION PENDING",
      "IN REVIEW",
      "Editorial topic under review.",
    ].forEach((placeholder) => {
      expect(screen.queryByText(placeholder)).toBeNull();
    });
  });

  it("renders the framework badge strip without sectors", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Frameworks KAMMAND advises on" }),
    ).toBeTruthy();

    // Three badges, each linked to the framework page that explains the scope.
    frameworkBadges.forEach((badge) => {
      const image = screen.getByAltText(
        `${badge.label} — see how KAMMAND advises on this framework`,
      );
      expect(image).toBeTruthy();
      expect(image.closest("a")?.getAttribute("href")).toBe(badge.href);
    });

    // The marquee duplicates the set for a seamless loop. The copy must be
    // hidden from assistive technology so each framework is announced once.
    const strip = screen
      .getByRole("heading", { name: "Frameworks KAMMAND advises on" })
      .closest("section");
    expect(strip).toBeTruthy();
    expect(strip?.querySelectorAll('ul[aria-hidden="true"]').length).toBe(1);
    expect(strip?.querySelectorAll("ul").length).toBe(2);

    // Sectors were removed from the strip.
    industrySummaries.forEach((industry) => {
      expect(strip?.textContent).not.toContain(industry.title);
    });
  });

  it("compares traditional work against the KAMMAND model row for row", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "A clearer model for regulated work.",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { level: 3, name: "Traditional Work" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { level: 3, name: "The KAMMAND Model" }),
    ).toBeTruthy();

    // The comparison only reads if row N on the left is answered by row N on
    // the right, so both lists must stay the same length and in the same order.
    const [traditional, kammand] = screen
      .getAllByRole("list")
      .filter((list) => list.querySelectorAll("li").length === 6)
      .slice(0, 2);

    expect(traditional?.querySelectorAll("li")).toHaveLength(6);
    expect(kammand?.querySelectorAll("li")).toHaveLength(6);

    [
      "Manual reviews and fragmented inputs",
      "Repeated effort across audits and cycles",
    ].forEach((item) => {
      expect(screen.getByText(item)).toBeTruthy();
    });

    [
      "Structured governance tied to real operations",
      "Ongoing assurance that improves decision-making",
    ].forEach((item) => {
      expect(screen.getByText(item)).toBeTruthy();
    });
  });

  it("states what each engagement phase delivers without repeating phase headings", () => {
    render(<Home />);

    // Deliverables live inside the process section so the four phase titles
    // appear exactly once on the page.
    ["Discover", "Design", "Deliver", "Assure"].forEach((phase) => {
      expect(screen.getAllByRole("heading", { name: phase })).toHaveLength(1);
    });

    expect(screen.getByText("A sequenced remediation roadmap")).toBeTruthy();
    expect(screen.getByText("Control effectiveness review")).toBeTruthy();
  });

  it("renders every FAQ answer in the DOM so it stays crawlable", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Before you reach out." }),
    ).toBeTruthy();

    homepageFaqs.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeTruthy();
      expect(screen.getByText(faq.answer)).toBeTruthy();
    });
  });

  it("omits proof and team entirely while they have no real entries", () => {
    render(<Home />);

    // AGENTS.md forbids fabricated case studies and credentials. These
    // sections must stay absent rather than ship a placeholder.
    expect(engagementOutcomes.length === 0 || teamMembers.length > 0).toBe(true);

    if (engagementOutcomes.length === 0) {
      expect(
        screen.queryByRole("heading", { name: "Work in regulated environments." }),
      ).toBeNull();
    }

    if (teamMembers.length === 0) {
      expect(
        screen.queryByRole("heading", { name: "Who you will actually work with." }),
      ).toBeNull();
    }
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
    expect(screen.getByText("Focused advisory discussion")).toBeTruthy();
    expect(screen.getByText("Practical next steps")).toBeTruthy();
    expect(screen.getByText("Evidence-led direction")).toBeTruthy();
    expect(screen.getByText("Confidential handling")).toBeTruthy();
  });
});
