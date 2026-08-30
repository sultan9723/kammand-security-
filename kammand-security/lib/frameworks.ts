import { serviceSummaries } from "./services";

export const frameworkSummaries = [
  {
    title: "SAMA CSF",
    fullName: "SAMA Cyber Security Framework",
    href: "/frameworks/sama-csf",
    category: "Financial-sector cybersecurity framework",
    description:
      "A cybersecurity framework reference for organizations that need structured governance, controls, evidence, and assurance around regulated financial-sector environments.",
  },
  {
    title: "NCA ECC",
    fullName: "NCA Essential Cybersecurity Controls",
    href: "/frameworks/nca-ecc",
    category: "National cybersecurity controls",
    description:
      "A cybersecurity controls reference that can influence governance, security operations, risk management, and assurance planning.",
  },
  {
    title: "Saudi PDPL",
    fullName: "Saudi Personal Data Protection Law",
    href: "/frameworks/pdpl",
    category: "Privacy and data protection",
    description:
      "A privacy and data protection reference that can affect governance, personal data handling, evidence, and third-party oversight.",
  },
  {
    title: "ISO 27001",
    fullName: "ISO/IEC 27001",
    href: "/frameworks/iso-27001",
    category: "Information security management standard",
    description:
      "An international information security management standard often considered alongside governance, risk, control, and assurance work.",
  },
] as const;

export const commonCapabilityAreas = [
  "Governance",
  "Risk Management",
  "Cybersecurity Controls",
  "Data Protection",
  "Incident Management",
  "Third-Party Risk",
  "Resilience",
  "Assurance",
] as const;

export type FrameworkReference = {
  label: string;
  href?: string;
  note: string;
};

export type FrameworkDetail = {
  title: string;
  fullName: string;
  href: string;
  eyebrow: string;
  h1: string;
  description: string;
  context: string;
  whatItIs: string;
  relevance: readonly string[];
  focusAreas: readonly string[];
  challenges: readonly string[];
  help: readonly {
    title: string;
    href: string;
    description: string;
  }[];
  relationships: readonly {
    title: string;
    href: string;
    description: string;
  }[];
  relatedServices: readonly {
    title: string;
    href: string;
  }[];
  references: readonly FrameworkReference[];
  verificationNotes: readonly string[];
};

const serviceByTitle = Object.fromEntries(
  serviceSummaries.map((service) => [service.title, service]),
) as Record<(typeof serviceSummaries)[number]["title"], (typeof serviceSummaries)[number]>;

const frameworkByTitle = Object.fromEntries(
  frameworkSummaries.map((framework) => [framework.title, framework]),
) as Record<
  (typeof frameworkSummaries)[number]["title"],
  (typeof frameworkSummaries)[number]
>;

export const samaCsfFramework = {
  title: "SAMA CSF",
  fullName: "SAMA Cyber Security Framework",
  href: "/frameworks/sama-csf",
  eyebrow: "FRAMEWORK / SAMA CSF",
  h1: "Build a practical approach to SAMA cybersecurity requirements.",
  description:
    "High-level advisory context for organizations that need to organize governance, controls, evidence, and assurance around SAMA cybersecurity expectations.",
  context:
    "Organizations operating in regulated financial-sector environments often need to translate cybersecurity requirements into practical governance, ownership, evidence, and remediation routines.",
  whatItIs:
    "The SAMA Cyber Security Framework is treated here as a high-level cybersecurity framework reference. This page does not reproduce official requirements or publish control mappings because authoritative framework source material is not currently present in the repository.",
  relevance: [
    "Organizations that need structured cybersecurity governance and control ownership",
    "Security, risk, compliance, and technology leaders coordinating framework-driven work",
    "Teams preparing evidence, remediation plans, or assurance routines around cybersecurity expectations",
    "Organizations comparing SAMA-related work with other governance, privacy, or security obligations",
  ],
  focusAreas: [
    "Governance and accountability",
    "Cybersecurity risk visibility",
    "Control ownership and operating responsibility",
    "Policy and procedure alignment",
    "Security operations and incident readiness",
    "Third-party oversight and dependency awareness",
    "Resilience, evidence, and assurance routines",
  ],
  challenges: [
    "Unclear ownership across security, risk, compliance, technology, and business teams",
    "Fragmented evidence that does not clearly show control design or operation",
    "Policy and control expectations that are not aligned with daily operating practice",
    "Inconsistent risk treatment, remediation tracking, and management reporting",
    "Third-party oversight that is difficult to connect to the wider control environment",
    "Readiness activity that is treated as a one-time assessment rather than an operating routine",
  ],
  help: [
    {
      title: serviceByTitle["GRC Advisory"].title,
      href: serviceByTitle["GRC Advisory"].href,
      description:
        "Structure governance, policy, control ownership, evidence, and remediation routines.",
    },
    {
      title: serviceByTitle["Risk Management"].title,
      href: serviceByTitle["Risk Management"].href,
      description:
        "Make cybersecurity risk visible, owned, prioritized, and connected to treatment decisions.",
    },
    {
      title: serviceByTitle["Virtual CISO"].title,
      href: serviceByTitle["Virtual CISO"].href,
      description:
        "Provide senior security leadership support for strategy, reporting, and oversight.",
    },
    {
      title: serviceByTitle["Third-Party Risk"].title,
      href: serviceByTitle["Third-Party Risk"].href,
      description:
        "Improve supplier due diligence, evidence review, ownership, and periodic oversight.",
    },
    {
      title: serviceByTitle["Audit Readiness"].title,
      href: serviceByTitle["Audit Readiness"].href,
      description:
        "Prepare control owners, evidence, gap tracking, and remediation before assessment pressure increases.",
    },
    {
      title: serviceByTitle["Security Assurance"].title,
      href: serviceByTitle["Security Assurance"].href,
      description:
        "Review control design, operation, evidence quality, and remediation progress.",
    },
  ],
  relationships: [
    {
      title: frameworkByTitle["NCA ECC"].title,
      href: frameworkByTitle["NCA ECC"].href,
      description:
        "Organizations may need to consider complementary cybersecurity governance and control expectations.",
    },
    {
      title: frameworkByTitle["Saudi PDPL"].title,
      href: frameworkByTitle["Saudi PDPL"].href,
      description:
        "Privacy and personal data obligations may intersect with cybersecurity controls, evidence, and third-party oversight.",
    },
    {
      title: frameworkByTitle["ISO 27001"].title,
      href: frameworkByTitle["ISO 27001"].href,
      description:
        "Information security management practices may support a broader governance and assurance operating model.",
    },
  ],
  relatedServices: [
    serviceByTitle["GRC Advisory"],
    serviceByTitle["Risk Management"],
    serviceByTitle["Audit Readiness"],
    serviceByTitle["Security Assurance"],
  ],
  references: [],
  verificationNotes: [
    "Official framework source URL and issuing-authority reference should be added before production publication.",
    "Any SAMA applicability statements should be verified against current official source material.",
    "Any domain, control, or requirement detail should be verified before being published.",
    "Any mapping between SAMA CSF, NCA ECC, Saudi PDPL, or ISO 27001 should be based on verified source data.",
  ],
} as const satisfies FrameworkDetail;

export const ncaEccFramework = {
  title: "NCA ECC",
  fullName: "NCA Essential Cybersecurity Controls",
  href: "/frameworks/nca-ecc",
  eyebrow: "FRAMEWORK / NCA ECC",
  h1: "Build cybersecurity controls around clear accountability.",
  description:
    "High-level advisory context for organizations organizing cybersecurity controls, ownership, evidence, and assurance around NCA ECC considerations.",
  context:
    "Organizations may need to translate national cybersecurity control expectations into accountable operating practices, documented evidence, and management oversight.",
  whatItIs:
    "NCA Essential Cybersecurity Controls is treated here as a high-level cybersecurity controls reference. This page does not reproduce official controls, domains, or applicability criteria because authoritative source material is not currently present in the repository.",
  relevance: [
    "Organizations that need to structure cybersecurity control ownership",
    "Security, risk, compliance, and technology teams aligning control work with governance expectations",
    "Leaders preparing evidence and documentation for cybersecurity assurance activity",
    "Teams comparing national cybersecurity control work with other privacy, financial-sector, or information security obligations",
  ],
  focusAreas: [
    "Governance and accountability",
    "Cybersecurity risk and control environment",
    "Control ownership and operating responsibility",
    "Security operations and incident readiness",
    "Third-party and dependency considerations",
    "Resilience, evidence, documentation, and assurance routines",
  ],
  challenges: [
    "Control ownership that is unclear across security, technology, compliance, and business teams",
    "Evidence and documentation that are not organized around operating responsibility",
    "Security operations activity that is difficult to connect to governance reporting",
    "Risk treatment and remediation decisions that are not consistently tracked",
    "Third-party considerations that sit outside the wider control environment",
    "Assurance preparation that depends on manual evidence gathering and late-stage remediation",
  ],
  help: [
    {
      title: serviceByTitle["GRC Advisory"].title,
      href: serviceByTitle["GRC Advisory"].href,
      description:
        "Structure governance, control ownership, evidence expectations, and remediation routines.",
    },
    {
      title: serviceByTitle["Virtual CISO"].title,
      href: serviceByTitle["Virtual CISO"].href,
      description:
        "Support security strategy, leadership reporting, governance cadence, and control oversight.",
    },
    {
      title: serviceByTitle["Risk Management"].title,
      href: serviceByTitle["Risk Management"].href,
      description:
        "Connect cybersecurity risks to ownership, treatment plans, and management decisions.",
    },
    {
      title: serviceByTitle["Third-Party Risk"].title,
      href: serviceByTitle["Third-Party Risk"].href,
      description:
        "Coordinate supplier oversight with the broader cybersecurity control environment.",
    },
    {
      title: serviceByTitle["Audit Readiness"].title,
      href: serviceByTitle["Audit Readiness"].href,
      description:
        "Organize evidence, gap tracking, remediation, and control-owner preparation.",
    },
    {
      title: serviceByTitle["Security Assurance"].title,
      href: serviceByTitle["Security Assurance"].href,
      description:
        "Review control design, operation, evidence quality, and assurance readiness.",
    },
  ],
  relationships: [
    {
      title: frameworkByTitle["SAMA CSF"].title,
      href: frameworkByTitle["SAMA CSF"].href,
      description:
        "Financial-sector organizations may need to coordinate cybersecurity governance and control work across both references.",
    },
    {
      title: frameworkByTitle["Saudi PDPL"].title,
      href: frameworkByTitle["Saudi PDPL"].href,
      description:
        "Privacy governance and cybersecurity controls may intersect where personal data, suppliers, and evidence are involved.",
    },
    {
      title: frameworkByTitle["ISO 27001"].title,
      href: frameworkByTitle["ISO 27001"].href,
      description:
        "Information security management practices may support structured control ownership and continual improvement.",
    },
  ],
  relatedServices: [
    serviceByTitle["GRC Advisory"],
    serviceByTitle["Virtual CISO"],
    serviceByTitle["Risk Management"],
    serviceByTitle["Audit Readiness"],
    serviceByTitle["Security Assurance"],
  ],
  references: [],
  verificationNotes: [
    "Official NCA ECC source URL and issuing-authority reference should be added before production publication.",
    "Any NCA applicability statements should be verified against current official source material.",
    "Any official control, domain, or requirement detail should be verified before being published.",
    "Any mapping between NCA ECC, SAMA CSF, Saudi PDPL, or ISO 27001 should be based on verified source data.",
  ],
} as const satisfies FrameworkDetail;

export const pdplFramework = {
  title: "Saudi PDPL",
  fullName: "Saudi Personal Data Protection Law",
  href: "/frameworks/pdpl",
  eyebrow: "FRAMEWORK / SAUDI PDPL",
  h1: "Turn privacy obligations into practical governance.",
  description:
    "High-level advisory context for privacy governance, evidence, organizational responsibility, and security coordination around Saudi PDPL considerations.",
  context:
    "Privacy obligations require governance, accountability, documented practices, and coordination between legal, privacy, security, technology, and business stakeholders.",
  whatItIs:
    "Saudi PDPL is treated here as a privacy and data protection reference, not as a cybersecurity control framework. This page does not provide legal advice or reproduce legal obligations because authoritative source material is not currently present in the repository.",
  relevance: [
    "Organizations handling personal-data governance, policy, and evidence work",
    "Security and GRC teams coordinating with legal or privacy counsel",
    "Teams reviewing third-party handling of personal data and supporting documentation",
    "Organizations aligning privacy governance with cybersecurity risk and assurance practices",
  ],
  focusAreas: [
    "Privacy governance and accountability",
    "Personal-data handling practices",
    "Policy and procedure alignment",
    "Organizational responsibility and evidence",
    "Third-party and supplier considerations",
    "Security and privacy coordination",
    "Risk, documentation, and assurance routines",
  ],
  challenges: [
    "Privacy responsibilities that are split across legal, security, technology, and business teams",
    "Personal-data handling practices that are not consistently documented or evidenced",
    "Policies and operating procedures that do not clearly connect to implementation ownership",
    "Third-party data handling that is difficult to track through supplier oversight routines",
    "Security and privacy risk discussions that happen in separate governance forums",
    "Unclear boundaries between legal interpretation and technical or GRC implementation work",
  ],
  help: [
    {
      title: serviceByTitle["GRC Advisory"].title,
      href: serviceByTitle["GRC Advisory"].href,
      description:
        "Structure governance, accountability, policy alignment, evidence, and remediation routines.",
    },
    {
      title: serviceByTitle["Risk Management"].title,
      href: serviceByTitle["Risk Management"].href,
      description:
        "Connect privacy-related implementation risks to ownership, treatment, and reporting.",
    },
    {
      title: serviceByTitle["Third-Party Risk"].title,
      href: serviceByTitle["Third-Party Risk"].href,
      description:
        "Review supplier oversight where personal-data handling and evidence expectations are relevant.",
    },
    {
      title: serviceByTitle["Audit Readiness"].title,
      href: serviceByTitle["Audit Readiness"].href,
      description:
        "Organize documentation, ownership, evidence, and gap tracking for readiness activity.",
    },
    {
      title: serviceByTitle["Security Assurance"].title,
      href: serviceByTitle["Security Assurance"].href,
      description:
        "Review whether supporting controls and evidence are practical, owned, and reportable.",
    },
  ],
  relationships: [
    {
      title: frameworkByTitle["SAMA CSF"].title,
      href: frameworkByTitle["SAMA CSF"].href,
      description:
        "Financial-sector cybersecurity expectations may overlap with privacy governance where data, evidence, and suppliers are involved.",
    },
    {
      title: frameworkByTitle["NCA ECC"].title,
      href: frameworkByTitle["NCA ECC"].href,
      description:
        "Cybersecurity controls and privacy governance can be complementary when protecting personal data and documenting accountability.",
    },
    {
      title: frameworkByTitle["ISO 27001"].title,
      href: frameworkByTitle["ISO 27001"].href,
      description:
        "Information security management practices may support privacy governance through risk, controls, evidence, and oversight.",
    },
  ],
  relatedServices: [
    serviceByTitle["GRC Advisory"],
    serviceByTitle["Risk Management"],
    serviceByTitle["Third-Party Risk"],
    serviceByTitle["Audit Readiness"],
    serviceByTitle["Security Assurance"],
  ],
  references: [],
  verificationNotes: [
    "Official Saudi PDPL source URL and issuing-authority reference should be added before production publication.",
    "Any legal interpretation, applicability, consent, transfer, breach-notification, fines, retention, legal-basis, controller, or processor statements require verification by authoritative source material and appropriate counsel.",
    "Any PDPL relationship to SAMA CSF, NCA ECC, or ISO 27001 should remain contextual unless verified source mapping exists.",
  ],
} as const satisfies FrameworkDetail;

export const iso27001Framework = {
  title: "ISO 27001",
  fullName: "ISO/IEC 27001",
  href: "/frameworks/iso-27001",
  eyebrow: "FRAMEWORK / ISO 27001",
  h1: "Build an information security management system that works in practice.",
  description:
    "High-level advisory context for strengthening information security governance, risk-based management, evidence, readiness, and assurance practices.",
  context:
    "Organizations often need to turn information security management expectations into practical governance, risk routines, control ownership, evidence, and continual improvement.",
  whatItIs:
    "ISO/IEC 27001 is treated here as an information security management standard reference. KAMMAND provides advisory and readiness support; this page does not imply that KAMMAND is an accredited certification body or that it issues ISO certification.",
  relevance: [
    "Organizations strengthening an information security management system",
    "Security, risk, compliance, and technology teams organizing risk-based controls and evidence",
    "Leadership groups seeking clearer oversight of information security governance",
    "Teams preparing for certification activity with an accredited certification body",
  ],
  focusAreas: [
    "Information security governance",
    "Risk-based management",
    "Policy and control ownership",
    "Evidence and documentation",
    "Management oversight",
    "Continual improvement",
    "Assurance and readiness routines",
  ],
  challenges: [
    "Information security management activity that exists on paper but is not embedded in operations",
    "Risk assessment, control ownership, and evidence routines that are handled separately",
    "Policies that are not aligned with control operation or management reporting",
    "Readiness work that starts too late before external assessment activity",
    "Remediation tracking that does not clearly support continual improvement",
    "Confusion between advisory readiness support and accredited certification activity",
  ],
  help: [
    {
      title: serviceByTitle["GRC Advisory"].title,
      href: serviceByTitle["GRC Advisory"].href,
      description:
        "Structure governance, policy, ownership, evidence, remediation, and reporting routines.",
    },
    {
      title: serviceByTitle["Risk Management"].title,
      href: serviceByTitle["Risk Management"].href,
      description:
        "Support risk assessment, treatment planning, ownership, and management reporting.",
    },
    {
      title: serviceByTitle["Audit Readiness"].title,
      href: serviceByTitle["Audit Readiness"].href,
      description:
        "Prepare evidence, control owners, documentation, and remediation plans before assessment activity.",
    },
    {
      title: serviceByTitle["Security Assurance"].title,
      href: serviceByTitle["Security Assurance"].href,
      description:
        "Review control design, operating effectiveness, evidence quality, and improvement activity.",
    },
    {
      title: serviceByTitle["Virtual CISO"].title,
      href: serviceByTitle["Virtual CISO"].href,
      description:
        "Support senior security leadership, roadmap ownership, reporting, and governance oversight.",
    },
  ],
  relationships: [
    {
      title: frameworkByTitle["SAMA CSF"].title,
      href: frameworkByTitle["SAMA CSF"].href,
      description:
        "Financial-sector cybersecurity work may benefit from a structured information security management operating model.",
    },
    {
      title: frameworkByTitle["NCA ECC"].title,
      href: frameworkByTitle["NCA ECC"].href,
      description:
        "Cybersecurity control work may overlap with information security governance, risk, evidence, and assurance routines.",
    },
    {
      title: frameworkByTitle["Saudi PDPL"].title,
      href: frameworkByTitle["Saudi PDPL"].href,
      description:
        "Privacy governance may connect with information security management where personal-data protection, suppliers, and evidence are involved.",
    },
  ],
  relatedServices: [
    serviceByTitle["GRC Advisory"],
    serviceByTitle["Risk Management"],
    serviceByTitle["Audit Readiness"],
    serviceByTitle["Security Assurance"],
    serviceByTitle["Virtual CISO"],
  ],
  references: [],
  verificationNotes: [
    "Official standard naming and any version reference should be verified before production publication.",
    "Any ISO clause, Annex A, control, certification, accreditation, or audit-process detail should be verified from authoritative standard or accredited-body source material.",
    "Any mapping between ISO 27001, SAMA CSF, NCA ECC, or Saudi PDPL should be based on verified source data.",
  ],
} as const satisfies FrameworkDetail;

export const frameworkDetails = [
  samaCsfFramework,
  ncaEccFramework,
  pdplFramework,
  iso27001Framework,
] as const;
