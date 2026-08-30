import { frameworkSummaries } from "./frameworks";
import { engagementSteps, serviceSummaries } from "./services";

export const crossIndustryChallenges = [
  "Unclear ownership",
  "Fragmented controls",
  "Regulatory overlap",
  "Weak evidence",
  "Third-party exposure",
  "Reactive remediation",
  "Limited risk visibility",
  "Audit pressure",
] as const;

type LinkItem = {
  title: string;
  href: string;
};

export type IndustryDetail = {
  title: string;
  href: string;
  eyebrow: string;
  h1: string;
  description: string;
  positioning: string;
  context: string;
  challenges: readonly string[];
  support: string;
  engagementAreas: readonly string[];
  relatedServices: readonly LinkItem[];
  frameworks: readonly LinkItem[];
  frameworkContext: string;
  relatedIndustries: readonly LinkItem[];
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

export const industrySummaries = [
  {
    title: "Financial Services",
    href: "/industries/financial-services",
    description:
      "Governance, cyber risk, third-party oversight, evidence, and assurance for high-accountability financial environments.",
  },
  {
    title: "Fintech & Payments",
    href: "/industries/fintech-payments",
    description:
      "Security governance, control ownership, resilience, and readiness for fast-moving fintech and payment organizations.",
  },
  {
    title: "Insurance",
    href: "/industries/insurance",
    description:
      "Cyber risk visibility, accountability, evidence, and assurance for organizations managing sensitive information and dependencies.",
  },
  {
    title: "Technology",
    href: "/industries/technology",
    description:
      "Security governance and control maturity for technology organizations scaling platforms, teams, suppliers, and customer assurance.",
  },
  {
    title: "Healthcare",
    href: "/industries/healthcare",
    description:
      "Cybersecurity and privacy-governance support for organizations handling sensitive information and continuity concerns.",
  },
  {
    title: "Critical & Regulated Enterprises",
    href: "/industries/regulated-enterprises",
    description:
      "Governance, resilience, supplier risk, control ownership, and assurance for organizations with high operational accountability.",
  },
] as const;

const industryByTitle = Object.fromEntries(
  industrySummaries.map((industry) => [industry.title, industry]),
) as Record<(typeof industrySummaries)[number]["title"], (typeof industrySummaries)[number]>;

export const financialServicesIndustry = {
  title: "Financial Services",
  href: "/industries/financial-services",
  eyebrow: "INDUSTRY / FINANCIAL SERVICES",
  h1: "Strengthen governance and cyber resilience in financial services.",
  description:
    "GRC and cybersecurity advisory context for financial services organizations managing governance, cyber risk, evidence, third-party exposure, and assurance.",
  positioning:
    "KAMMAND can support financial services organizations by helping connect cybersecurity governance, risk ownership, control evidence, and executive oversight.",
  context:
    "Financial services environments often require clear accountability, resilient operations, third-party oversight, and evidence that demonstrates how cybersecurity and GRC practices operate in reality. Applicability of specific frameworks depends on jurisdiction, entity type, and scope.",
  challenges: [
    "Cybersecurity governance that is not clearly connected to executive oversight",
    "Risk decisions, control ownership, and remediation activity that are tracked separately",
    "Third-party dependencies that affect operational resilience and control accountability",
    "Evidence that is difficult to assemble before audit, regulatory, or assurance review",
    "Framework overlap that requires careful scoping rather than broad assumptions",
  ],
  support:
    "KAMMAND's approach can help financial services teams structure ownership, evidence, risk treatment, supplier oversight, and assurance routines around the organization's actual operating model.",
  engagementAreas: [
    "Governance model and control ownership review",
    "Cybersecurity risk and remediation planning",
    "Third-party risk and resilience oversight",
    "Evidence organization and readiness support",
    "Executive reporting and assurance preparation",
  ],
  relatedServices: [
    serviceByTitle["GRC Advisory"],
    serviceByTitle["Virtual CISO"],
    serviceByTitle["Risk Management"],
    serviceByTitle["Third-Party Risk"],
    serviceByTitle["Audit Readiness"],
    serviceByTitle["Security Assurance"],
  ],
  frameworks: [
    frameworkByTitle["SAMA CSF"],
    frameworkByTitle["NCA ECC"],
    frameworkByTitle["Saudi PDPL"],
    frameworkByTitle["ISO 27001"],
  ],
  frameworkContext:
    "Financial services organizations may encounter cybersecurity, privacy, and assurance expectations depending on jurisdiction, regulator, activities, and data handling scope.",
  relatedIndustries: [
    industryByTitle["Fintech & Payments"],
    industryByTitle["Insurance"],
  ],
} as const satisfies IndustryDetail;

export const fintechPaymentsIndustry = {
  title: "Fintech & Payments",
  href: "/industries/fintech-payments",
  eyebrow: "INDUSTRY / FINTECH & PAYMENTS",
  h1: "Build security governance that can keep pace with growth.",
  description:
    "GRC and cybersecurity advisory context for fintech and payment organizations scaling governance, control ownership, third-party dependencies, and readiness.",
  positioning:
    "KAMMAND can support fintech and payment organizations by helping security governance mature as products, teams, suppliers, and oversight expectations grow.",
  context:
    "Fintech and payment organizations can move quickly, which makes practical governance, ownership, evidence, and risk prioritization especially important. Obligations differ by product, licensing, jurisdiction, infrastructure, and partner model.",
  challenges: [
    "Governance maturity lagging behind product, team, or market growth",
    "Control ownership that is unclear across engineering, operations, risk, and leadership",
    "Cloud, vendor, and payment-ecosystem dependencies that require practical oversight",
    "Evidence and documentation that are created late instead of maintained continuously",
    "Regulatory readiness expectations that differ by scope and operating model",
  ],
  support:
    "KAMMAND's approach can help fast-moving teams establish risk visibility, security leadership routines, supplier oversight, evidence discipline, and readiness practices without assuming every fintech has identical obligations.",
  engagementAreas: [
    "Security governance maturity planning",
    "Cloud and supplier oversight routines",
    "Risk ownership and remediation prioritization",
    "Evidence and control accountability model",
    "Readiness support for changing regulatory expectations",
  ],
  relatedServices: [
    serviceByTitle["Virtual CISO"],
    serviceByTitle["Risk Management"],
    serviceByTitle["Third-Party Risk"],
    serviceByTitle["GRC Advisory"],
    serviceByTitle["Audit Readiness"],
  ],
  frameworks: [
    frameworkByTitle["SAMA CSF"],
    frameworkByTitle["NCA ECC"],
    frameworkByTitle["Saudi PDPL"],
    frameworkByTitle["ISO 27001"],
  ],
  frameworkContext:
    "Relevant requirements can include cybersecurity, privacy, and information security expectations depending on licensing, jurisdiction, data handling, supplier model, and infrastructure scope.",
  relatedIndustries: [
    industryByTitle["Financial Services"],
    industryByTitle["Technology"],
  ],
} as const satisfies IndustryDetail;

export const insuranceIndustry = {
  title: "Insurance",
  href: "/industries/insurance",
  eyebrow: "INDUSTRY / INSURANCE",
  h1: "Make cyber risk visible, owned, and governable.",
  description:
    "GRC and cybersecurity advisory context for insurance organizations managing cyber risk, sensitive information, third-party dependencies, resilience, evidence, and assurance.",
  positioning:
    "KAMMAND can support insurance organizations by helping make cybersecurity risk visible, accountable, and connected to governance and assurance routines.",
  context:
    "Insurance organizations often manage sensitive information, complex workflows, external service providers, and enterprise risk discussions. Specific regulatory obligations depend on jurisdiction, license, products, and data scope.",
  challenges: [
    "Cyber risk that is not consistently translated into ownership and treatment decisions",
    "Sensitive information and operational processes that depend on multiple systems and suppliers",
    "Evidence and assurance activity that is difficult to connect to enterprise risk reporting",
    "Accountability gaps across business, risk, technology, and compliance stakeholders",
    "Resilience concerns that need practical governance rather than isolated technical activity",
  ],
  support:
    "KAMMAND's approach can help insurance teams structure cyber risk visibility, supplier oversight, control ownership, evidence, and assurance without inventing insurance-specific regulatory claims.",
  engagementAreas: [
    "Enterprise cyber risk visibility and ownership",
    "Supplier dependency and evidence review",
    "Governance and accountability model support",
    "Control readiness and assurance preparation",
    "Security reporting for management oversight",
  ],
  relatedServices: [
    serviceByTitle["Risk Management"],
    serviceByTitle["GRC Advisory"],
    serviceByTitle["Third-Party Risk"],
    serviceByTitle["Security Assurance"],
    serviceByTitle["Audit Readiness"],
  ],
  frameworks: [
    frameworkByTitle["Saudi PDPL"],
    frameworkByTitle["NCA ECC"],
    frameworkByTitle["ISO 27001"],
  ],
  frameworkContext:
    "Organizations may encounter privacy, cybersecurity, and information security expectations depending on jurisdiction, business model, data handling, and supplier scope.",
  relatedIndustries: [
    industryByTitle["Financial Services"],
    industryByTitle["Healthcare"],
  ],
} as const satisfies IndustryDetail;

export const technologyIndustry = {
  title: "Technology",
  href: "/industries/technology",
  eyebrow: "INDUSTRY / TECHNOLOGY",
  h1: "Scale technology without losing control of security risk.",
  description:
    "GRC and cybersecurity advisory context for technology organizations scaling security governance, controls, vendor dependencies, evidence, customer assurance, and risk management.",
  positioning:
    "KAMMAND can support technology organizations by helping security governance and control maturity keep pace with platforms, external assurance expectations, suppliers, and teams.",
  context:
    "Technology organizations often scale faster than governance routines. Control ownership, cloud oversight, vendor dependencies, evidence, customer assurance, and policy maturity need to grow with the operating environment.",
  challenges: [
    "Security ownership split across product, engineering, infrastructure, and leadership",
    "Cloud and vendor dependencies that outpace governance and evidence routines",
    "Policies and controls that do not reflect the actual platform operating model",
    "Customer assurance requests that require evidence before the organization is ready",
    "Risk decisions that are hard to prioritize during rapid delivery cycles",
  ],
  support:
    "KAMMAND's approach can help technology teams establish practical governance, control ownership, risk prioritization, supplier oversight, and evidence discipline without assuming a fixed assurance or certification path.",
  engagementAreas: [
    "Security governance and ownership model design",
    "Cloud and vendor dependency oversight",
    "Policy and control maturity planning",
    "Customer assurance evidence preparation",
    "Risk and remediation prioritization",
  ],
  relatedServices: [
    serviceByTitle["Virtual CISO"],
    serviceByTitle["Risk Management"],
    serviceByTitle["Third-Party Risk"],
    serviceByTitle["Security Assurance"],
    serviceByTitle["GRC Advisory"],
  ],
  frameworks: [
    frameworkByTitle["ISO 27001"],
    frameworkByTitle["NCA ECC"],
    frameworkByTitle["Saudi PDPL"],
  ],
  frameworkContext:
    "Relevant requirements may include information security, cybersecurity, and privacy expectations depending on stakeholder commitments, jurisdictions, infrastructure, and data handling scope.",
  relatedIndustries: [
    industryByTitle["Fintech & Payments"],
    industryByTitle["Critical & Regulated Enterprises"],
  ],
} as const satisfies IndustryDetail;

export const healthcareIndustry = {
  title: "Healthcare",
  href: "/industries/healthcare",
  eyebrow: "INDUSTRY / HEALTHCARE",
  h1: "Protect sensitive information through stronger governance.",
  description:
    "Cybersecurity and GRC advisory context for healthcare organizations managing sensitive information, privacy governance, continuity, third-party risk, accountability, and assurance.",
  positioning:
    "KAMMAND can support healthcare organizations by helping connect sensitive-information protection, cybersecurity governance, third-party oversight, and assurance routines.",
  context:
    "Healthcare environments can involve sensitive information, operational continuity needs, supplier dependencies, and complex accountability across clinical, administrative, technology, and governance stakeholders. This content does not assume US jurisdiction or provide medical or legal advice.",
  challenges: [
    "Sensitive information handled across multiple systems, workflows, and third parties",
    "Cybersecurity governance that needs to support continuity and accountability",
    "Privacy and security coordination that requires clear ownership and evidence",
    "Supplier dependencies that affect data handling and operational resilience",
    "Assurance activity that requires practical documentation without disrupting operations",
  ],
  support:
    "KAMMAND's approach can help healthcare organizations strengthen cybersecurity governance, risk visibility, supplier oversight, evidence, and assurance while coordinating with legal or privacy counsel where needed.",
  engagementAreas: [
    "Sensitive-information governance support",
    "Privacy and cybersecurity coordination",
    "Third-party risk and evidence review",
    "Operational continuity and control ownership",
    "Assurance and readiness preparation",
  ],
  relatedServices: [
    serviceByTitle["GRC Advisory"],
    serviceByTitle["Risk Management"],
    serviceByTitle["Third-Party Risk"],
    serviceByTitle["Security Assurance"],
    serviceByTitle["Audit Readiness"],
  ],
  frameworks: [
    frameworkByTitle["Saudi PDPL"],
    frameworkByTitle["ISO 27001"],
    frameworkByTitle["NCA ECC"],
  ],
  frameworkContext:
    "Organizations may encounter privacy, cybersecurity, and information security expectations depending on jurisdiction, services, systems, data handling, and supplier scope.",
  relatedIndustries: [
    industryByTitle["Critical & Regulated Enterprises"],
    industryByTitle["Technology"],
  ],
} as const satisfies IndustryDetail;

export const regulatedEnterprisesIndustry = {
  title: "Critical & Regulated Enterprises",
  href: "/industries/regulated-enterprises",
  eyebrow: "INDUSTRY / REGULATED ENTERPRISES",
  h1: "Build assurance where operational accountability matters most.",
  description:
    "GRC and cybersecurity advisory context for organizations with high operational accountability, supplier dependencies, resilience needs, control ownership, evidence, and assurance pressure.",
  positioning:
    "KAMMAND can support high-accountability organizations by helping governance, control ownership, cyber risk, evidence, and resilience practices become more structured and reviewable.",
  context:
    "Some organizations operate in environments where cyber risk, resilience, suppliers, and accountability have heightened business consequences. This category is broad and does not imply any formal sector designation.",
  challenges: [
    "Operational accountability that depends on clear control ownership and escalation",
    "Cyber risk and resilience activity that are not consistently connected to governance",
    "Supplier dependencies that affect service continuity, evidence, and oversight",
    "Regulatory expectations that require careful scoping rather than broad assumptions",
    "Assurance pressure that exposes fragmented evidence and reactive remediation",
  ],
  support:
    "KAMMAND's approach can help regulated enterprises organize governance, risk visibility, supplier oversight, evidence, remediation, and assurance routines around the realities of their operating environment.",
  engagementAreas: [
    "Governance and accountability model review",
    "Cyber risk and resilience planning",
    "Supplier dependency and oversight routines",
    "Evidence and remediation tracking",
    "Assurance readiness and management reporting",
  ],
  relatedServices: [
    serviceByTitle["GRC Advisory"],
    serviceByTitle["Risk Management"],
    serviceByTitle["Third-Party Risk"],
    serviceByTitle["Audit Readiness"],
    serviceByTitle["Security Assurance"],
    serviceByTitle["Virtual CISO"],
  ],
  frameworks: [
    frameworkByTitle["NCA ECC"],
    frameworkByTitle["ISO 27001"],
    frameworkByTitle["Saudi PDPL"],
  ],
  frameworkContext:
    "Relevant requirements may include cybersecurity, information security, privacy, and assurance expectations depending on sector, jurisdiction, operations, and data scope.",
  relatedIndustries: [
    industryByTitle["Technology"],
    industryByTitle["Financial Services"],
  ],
} as const satisfies IndustryDetail;

export const industryDetails = [
  financialServicesIndustry,
  fintechPaymentsIndustry,
  insuranceIndustry,
  technologyIndustry,
  healthcareIndustry,
  regulatedEnterprisesIndustry,
] as const;

export { engagementSteps };
