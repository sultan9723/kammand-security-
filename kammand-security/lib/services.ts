export const frameworks = [
  { label: "SAMA CSF", href: "/frameworks/sama-csf" },
  { label: "NCA ECC", href: "/frameworks/nca-ecc" },
  { label: "Saudi PDPL", href: "/frameworks/pdpl" },
  { label: "ISO 27001", href: "/frameworks/iso-27001" },
] as const;

export const serviceSummaries = [
  {
    title: "GRC Advisory",
    href: "/services/grc-advisory",
    description:
      "Translate regulatory and business requirements into practical governance, risk, and compliance programs.",
  },
  {
    title: "Virtual CISO",
    href: "/services/virtual-ciso",
    description:
      "Strategic cybersecurity leadership for organizations that need experienced security direction without a full-time CISO.",
  },
  {
    title: "Risk Management",
    href: "/services/risk-management",
    description:
      "Identify, assess, prioritize, and manage cybersecurity risk through structured and decision-focused programs.",
  },
  {
    title: "Third-Party Risk",
    href: "/services/third-party-risk",
    description:
      "Evaluate supplier and partner risk with structured due diligence, control reviews, and ongoing oversight.",
  },
  {
    title: "Audit Readiness",
    href: "/services/audit-readiness",
    description:
      "Prepare controls, evidence, ownership, and remediation activities before regulatory or certification assessments.",
  },
  {
    title: "Security Assurance",
    href: "/services/security-assurance",
    description:
      "Assess whether cybersecurity controls are designed appropriately, operating effectively, and supported by reliable evidence.",
  },
] as const;

export const engagementSteps = [
  {
    title: "Discover",
    description:
      "Understand obligations, current controls, risk exposure, stakeholders, and business priorities.",
  },
  {
    title: "Design",
    description:
      "Translate requirements and gaps into a practical roadmap with ownership, sequencing, and evidence expectations.",
  },
  {
    title: "Deliver",
    description:
      "Support implementation of controls, documentation, remediation activities, and reporting routines.",
  },
  {
    title: "Assure",
    description:
      "Review control effectiveness, evidence quality, and readiness so confidence extends beyond a single assessment.",
  },
] as const;

export type ServiceDetail = {
  title: string;
  href: string;
  eyebrow: string;
  h1: string;
  description: string;
  valueProposition: string;
  problem: string;
  approach: string;
  activities: readonly string[];
  audience: readonly string[];
  outcomes: readonly string[];
  relatedServices: readonly {
    title: string;
    href: string;
  }[];
  frameworks: readonly {
    label: string;
    href: string;
  }[];
};

const frameworkByLabel = Object.fromEntries(
  frameworks.map((framework) => [framework.label, framework]),
) as Record<(typeof frameworks)[number]["label"], (typeof frameworks)[number]>;

export const grcAdvisoryService = {
  title: "GRC Advisory",
  href: "/services/grc-advisory",
  eyebrow: "GRC ADVISORY",
  h1: "Governance, risk and compliance that works in practice.",
  description:
    "Advisory support for organizations that need practical governance, risk, compliance, and control structures aligned to their regulatory environment.",
  valueProposition:
    "KAMMAND helps regulated organizations structure GRC programs that connect requirements, control ownership, evidence, reporting, and remediation planning.",
  problem:
    "GRC efforts often become fragmented when policies, risks, control ownership, evidence, and remediation plans are managed separately. Regulated organizations need a model that helps teams understand obligations, assign accountability, and maintain practical control visibility.",
  approach:
    "KAMMAND works with leadership, risk, compliance, security, and control owners to understand the current environment, design a practical governance and control architecture, and support implementation through evidence and remediation routines.",
  activities: [
    "Governance structure and accountability model review",
    "Policy and control architecture design",
    "Risk management process alignment",
    "Regulatory obligation and control expectation review",
    "Control ownership and evidence responsibility definition",
    "Reporting, issue tracking, and remediation planning support",
  ],
  audience: [
    "Regulated organizations formalizing or improving a GRC program",
    "Security and risk leaders preparing for audit or regulatory review",
    "Teams that need clearer control ownership and evidence expectations",
    "Organizations aligning cybersecurity, compliance, and business risk priorities",
  ],
  outcomes: [
    "Clearer governance and control ownership",
    "More practical policy, risk, compliance, and evidence routines",
    "Better visibility into remediation priorities",
    "A stronger foundation for audit readiness and ongoing assurance",
  ],
  relatedServices: [
    { title: "Risk Management", href: "/services/risk-management" },
    { title: "Audit Readiness", href: "/services/audit-readiness" },
    { title: "Security Assurance", href: "/services/security-assurance" },
  ],
  frameworks,
} as const satisfies ServiceDetail;

export const virtualCisoService = {
  title: "Virtual CISO",
  href: "/services/virtual-ciso",
  eyebrow: "VIRTUAL CISO",
  h1: "Strategic security leadership without unnecessary overhead.",
  description:
    "Senior cybersecurity leadership and governance support for organizations that need direction, structure, accountability, and executive-level security oversight.",
  valueProposition:
    "KAMMAND helps leadership teams set security direction, prioritize risk, strengthen governance, and maintain practical oversight without assuming a full-time internal CISO is always required.",
  problem:
    "Scaling regulated organizations often need senior security judgment before they have a mature internal leadership function. Strategy, reporting, risk decisions, policies, incident governance, and third-party oversight can become fragmented without a clear security leadership model.",
  approach:
    "KAMMAND supports executive, risk, compliance, and technology stakeholders with cybersecurity strategy, governance structure, roadmap planning, metrics, and oversight routines that help security decisions remain connected to business and regulatory priorities.",
  activities: [
    "Cybersecurity strategy and security roadmap development",
    "Governance structure and security leadership cadence design",
    "Executive and board-level security reporting support",
    "Risk prioritization and remediation oversight",
    "Policy, control ownership, and accountability review",
    "Incident governance, third-party oversight, and security metrics support",
  ],
  audience: [
    "Scaling regulated companies that need senior security direction",
    "Organizations without a full-time internal CISO function",
    "Companies preparing for increased regulatory or operational security expectations",
    "Teams that need independent strategic security leadership and accountability",
  ],
  outcomes: [
    "Clearer cybersecurity direction and leadership visibility",
    "A more practical security roadmap tied to business priorities",
    "Stronger governance routines for risk, controls, reporting, and oversight",
    "Better executive understanding of security priorities and open decisions",
  ],
  relatedServices: [
    { title: "GRC Advisory", href: "/services/grc-advisory" },
    { title: "Risk Management", href: "/services/risk-management" },
    { title: "Security Assurance", href: "/services/security-assurance" },
  ],
  frameworks: [
    frameworkByLabel["SAMA CSF"],
    frameworkByLabel["NCA ECC"],
    frameworkByLabel["ISO 27001"],
  ],
} as const satisfies ServiceDetail;

export const riskManagementService = {
  title: "Risk Management",
  href: "/services/risk-management",
  eyebrow: "RISK MANAGEMENT",
  h1: "Turn cybersecurity risk into decisions your business can act on.",
  description:
    "Cybersecurity risk management advisory that helps organizations identify, assess, own, prioritize, and manage risk through practical governance routines.",
  valueProposition:
    "KAMMAND helps teams make cybersecurity risk visible, owned, and actionable so leadership can make better decisions about controls, remediation, and acceptance.",
  problem:
    "Risk work often loses value when assessments, registers, controls, remediation, and leadership reporting are disconnected. The goal is not to eliminate all risk, but to help the organization understand what risk exists, who owns it, how it is treated, and when leadership action is needed.",
  approach:
    "KAMMAND helps organizations structure risk identification, assessment, ownership, treatment, acceptance, escalation, and reporting so cybersecurity risk can be considered in practical business decisions.",
  activities: [
    "Cybersecurity risk taxonomy and assessment method design",
    "Risk identification workshops and risk register development",
    "Inherent and residual risk assessment support",
    "Risk ownership, treatment planning, and acceptance workflow design",
    "Control effectiveness input and remediation prioritization",
    "Leadership risk reporting and governance escalation support",
  ],
  audience: [
    "Organizations that need a clearer cybersecurity risk management process",
    "Risk, compliance, and security leaders seeking better risk visibility",
    "Teams prioritizing remediation across competing technical and regulatory demands",
    "Regulated organizations preparing risk evidence for audit or governance review",
  ],
  outcomes: [
    "Clearer ownership of cybersecurity risks and treatment decisions",
    "More consistent risk assessment and reporting routines",
    "Better prioritization of remediation activity",
    "Decision records that support governance, accountability, and assurance",
  ],
  relatedServices: [
    { title: "GRC Advisory", href: "/services/grc-advisory" },
    { title: "Third-Party Risk", href: "/services/third-party-risk" },
    { title: "Security Assurance", href: "/services/security-assurance" },
  ],
  frameworks: [
    frameworkByLabel["SAMA CSF"],
    frameworkByLabel["NCA ECC"],
    frameworkByLabel["ISO 27001"],
  ],
} as const satisfies ServiceDetail;

export const thirdPartyRiskService = {
  title: "Third-Party Risk",
  href: "/services/third-party-risk",
  eyebrow: "THIRD-PARTY RISK",
  h1: "Know where supplier risk enters your control environment.",
  description:
    "Third-party risk advisory for supplier classification, due diligence, evidence review, onboarding controls, and ongoing oversight routines.",
  valueProposition:
    "KAMMAND helps organizations understand vendor exposure, assign supplier risk ownership, and build practical due diligence and oversight processes.",
  problem:
    "Supplier and partner risk can enter through outsourced services, technology platforms, data handling, operational dependencies, and critical support arrangements. Point-in-time questionnaires alone rarely give leadership enough context to understand exposure, ownership, and remediation needs.",
  approach:
    "KAMMAND helps teams classify vendors, assess inherent risk, review security evidence, define contractual expectations, structure onboarding and offboarding controls, and maintain periodic oversight routines without overstating automated monitoring capability.",
  activities: [
    "Vendor classification and inherent risk criteria design",
    "Supplier due diligence questionnaire review and improvement",
    "Security evidence review for higher-risk third parties",
    "Contractual security expectation and onboarding control support",
    "Vendor ownership, remediation, and periodic review workflow design",
    "Concentration, dependency, and offboarding consideration review",
  ],
  audience: [
    "Organizations with critical suppliers or outsourced technology services",
    "Teams that need stronger third-party due diligence and evidence review",
    "Regulated organizations preparing supplier oversight for audit or governance review",
    "Risk owners concerned about vendor concentration, dependency, or data exposure",
  ],
  outcomes: [
    "Clearer visibility into supplier risk and ownership",
    "More consistent due diligence and evidence expectations",
    "Better tracking of vendor remediation and review activity",
    "A stronger supplier oversight model for governance and assurance conversations",
  ],
  relatedServices: [
    { title: "Risk Management", href: "/services/risk-management" },
    { title: "GRC Advisory", href: "/services/grc-advisory" },
    { title: "Audit Readiness", href: "/services/audit-readiness" },
  ],
  frameworks: [
    frameworkByLabel["SAMA CSF"],
    frameworkByLabel["NCA ECC"],
    frameworkByLabel["Saudi PDPL"],
    frameworkByLabel["ISO 27001"],
  ],
} as const satisfies ServiceDetail;

export const auditReadinessService = {
  title: "Audit Readiness",
  href: "/services/audit-readiness",
  eyebrow: "AUDIT READINESS",
  h1: "Prepare before the auditor starts asking for evidence.",
  description:
    "Audit readiness support that helps teams organize controls, ownership, documentation, evidence, and remediation before assessment activity begins.",
  valueProposition:
    "KAMMAND helps organizations improve readiness by identifying gaps, organizing evidence, and preparing control owners for practical assessment conversations.",
  problem:
    "Audit pressure often exposes unclear ownership, outdated documentation, incomplete evidence, and remediation activity that has not been prioritized. Readiness work helps teams prepare before evidence requests and walkthroughs begin.",
  approach:
    "KAMMAND supports readiness through control review, evidence organization, ownership clarification, gap identification, remediation planning, policy and document review, walkthrough preparation, and management reporting.",
  activities: [
    "Control readiness and evidence inventory review",
    "Control ownership and accountability matrix support",
    "Policy, procedure, and document review",
    "Gap identification and remediation planning",
    "Walkthrough preparation for control owners",
    "Management reporting and audit coordination support",
  ],
  audience: [
    "Organizations preparing for regulatory or certification assessments",
    "Control owners who need clearer evidence expectations",
    "Security, risk, and compliance teams organizing readiness activity",
    "Leadership teams that need visibility into gaps before assessment work begins",
  ],
  outcomes: [
    "Improved readiness through clearer evidence and ownership",
    "Earlier visibility into control and documentation gaps",
    "More practical remediation planning before assessment pressure increases",
    "Better prepared control owners and management reporting",
  ],
  relatedServices: [
    { title: "GRC Advisory", href: "/services/grc-advisory" },
    { title: "Security Assurance", href: "/services/security-assurance" },
    { title: "Risk Management", href: "/services/risk-management" },
  ],
  frameworks: [
    frameworkByLabel["SAMA CSF"],
    frameworkByLabel["NCA ECC"],
    frameworkByLabel["ISO 27001"],
  ],
} as const satisfies ServiceDetail;

export const securityAssuranceService = {
  title: "Security Assurance",
  href: "/services/security-assurance",
  eyebrow: "SECURITY ASSURANCE",
  h1: "Confidence that controls exist, operate, and can be evidenced.",
  description:
    "Security assurance advisory that reviews control design, operating effectiveness, evidence quality, and remediation tracking without overstating formal audit authority.",
  valueProposition:
    "KAMMAND helps organizations review whether cybersecurity controls are designed appropriately, operating as intended, and supported by evidence leadership can rely on.",
  problem:
    "Controls may exist in policy or tooling but still lack clear ownership, operating evidence, testing discipline, or management visibility. Assurance work helps leadership understand where confidence is supported and where gaps need attention.",
  approach:
    "KAMMAND supports assurance planning, control design review, operating effectiveness review, evidence quality review, findings reporting, and remediation tracking through an independent advisory lens.",
  activities: [
    "Assurance scope and testing approach planning",
    "Control design review against stated objectives",
    "Control operating effectiveness and evidence review",
    "Control ownership and responsibility validation",
    "Gap identification and management reporting",
    "Remediation tracking and follow-up support",
  ],
  audience: [
    "Security and risk leaders seeking independent control review",
    "Regulated organizations checking whether controls are operating as intended",
    "Teams validating remediation progress after risk or audit findings",
    "Leadership groups preparing assurance reporting for governance forums",
  ],
  outcomes: [
    "Clearer confidence in control design, operation, and evidence",
    "Better visibility into assurance gaps and remediation priorities",
    "More reliable management reporting on control effectiveness",
    "A stronger basis for readiness, governance, and risk decisions",
  ],
  relatedServices: [
    { title: "Audit Readiness", href: "/services/audit-readiness" },
    { title: "Risk Management", href: "/services/risk-management" },
    { title: "Virtual CISO", href: "/services/virtual-ciso" },
  ],
  frameworks: [
    frameworkByLabel["SAMA CSF"],
    frameworkByLabel["NCA ECC"],
    frameworkByLabel["ISO 27001"],
  ],
} as const satisfies ServiceDetail;

export const serviceDetails = [
  grcAdvisoryService,
  virtualCisoService,
  riskManagementService,
  thirdPartyRiskService,
  auditReadinessService,
  securityAssuranceService,
] as const;
