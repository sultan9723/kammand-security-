import type { InsightEntry } from "../../lib/insights";

export const insightEntries: readonly InsightEntry[] = [
  {
    title: "Understanding overlapping cybersecurity frameworks",
    slug: "overlapping-cybersecurity-frameworks",
    href: "/insights/overlapping-cybersecurity-frameworks",
    description:
      "A planned editorial perspective on how organizations can think about overlapping cybersecurity and compliance frameworks without assuming formal equivalence.",
    category: "Regulation",
    featured: true,
    draft: true,
    relatedServices: [
      { title: "GRC Advisory", href: "/services/grc-advisory" },
      { title: "Audit Readiness", href: "/services/audit-readiness" },
    ],
    relatedFrameworks: [
      { title: "SAMA CSF", href: "/frameworks/sama-csf" },
      { title: "NCA ECC", href: "/frameworks/nca-ecc" },
      { title: "ISO 27001", href: "/frameworks/iso-27001" },
    ],
    body: [],
  },
  {
    title: "Building evidence before the audit begins",
    slug: "audit-evidence-readiness",
    href: "/insights/audit-evidence-readiness",
    description:
      "A planned editorial perspective on control ownership, evidence quality, and readiness work before assessment pressure increases.",
    category: "Assurance",
    draft: true,
    relatedServices: [
      { title: "Audit Readiness", href: "/services/audit-readiness" },
      { title: "Security Assurance", href: "/services/security-assurance" },
    ],
    relatedFrameworks: [
      { title: "SAMA CSF", href: "/frameworks/sama-csf" },
      { title: "ISO 27001", href: "/frameworks/iso-27001" },
    ],
    body: [],
  },
  {
    title: "Why third-party risk needs continuous oversight",
    slug: "continuous-third-party-risk",
    href: "/insights/continuous-third-party-risk",
    description:
      "A planned editorial perspective on supplier risk ownership, evidence review, and periodic oversight routines.",
    category: "Risk",
    draft: true,
    relatedServices: [
      { title: "Third-Party Risk", href: "/services/third-party-risk" },
      { title: "Risk Management", href: "/services/risk-management" },
    ],
    relatedFrameworks: [
      { title: "Saudi PDPL", href: "/frameworks/pdpl" },
      { title: "ISO 27001", href: "/frameworks/iso-27001" },
    ],
    body: [],
  },
];
