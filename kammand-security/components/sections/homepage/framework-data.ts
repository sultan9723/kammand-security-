export const frameworks = [
  {
    key: "sama",
    number: "01",
    label: "SAMA CSF",
    href: "/frameworks/sama-csf",
    descriptor: "Financial-sector cybersecurity governance.",
    icon: "institution",
  },
  {
    key: "nca",
    number: "02",
    label: "NCA ECC",
    href: "/frameworks/nca-ecc",
    descriptor: "Essential cybersecurity control requirements.",
    icon: "boundary",
  },
  {
    key: "pdpl",
    number: "03",
    label: "SAUDI PDPL",
    href: "/frameworks/pdpl",
    descriptor: "Personal data and privacy governance.",
    icon: "privacy",
  },
  {
    key: "iso",
    number: "04",
    label: "ISO 27001",
    href: "/frameworks/iso-27001",
    descriptor: "Information security management.",
    icon: "system",
  },
] as const;

export type FrameworkKey = (typeof frameworks)[number]["key"];
export type FrameworkIconName = (typeof frameworks)[number]["icon"];

export const capabilities = [
  {
    label: "Governance",
    description: "Establish direction and accountability.",
    icon: "governance",
  },
  {
    label: "Risk Management",
    description: "Identify, assess and treat organizational risk.",
    icon: "risk",
  },
  {
    label: "Compliance",
    description: "Meet regulatory and contractual obligations.",
    icon: "compliance",
  },
  {
    label: "Data Protection",
    description: "Protect personal data and ensure privacy.",
    icon: "data",
  },
  {
    label: "Incident Response",
    description: "Detect, respond and recover effectively.",
    icon: "response",
  },
  {
    label: "Assurance",
    description: "Validate effectiveness and build confidence.",
    icon: "assurance",
  },
] as const;

export type CapabilityIconName = (typeof capabilities)[number]["icon"];
