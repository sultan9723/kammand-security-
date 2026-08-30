export const navigationItems = [
  { href: "/services", label: "Services" },
  { href: "/frameworks", label: "Frameworks" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/company", label: "Company" },
] as const;

export const navigationDropdowns = [
  {
    key: "services",
    label: "Services",
    viewAllLabel: "View All Services",
    viewAllHref: "/services",
    items: [
      { href: "/services/grc-advisory", label: "GRC Advisory" },
      { href: "/services/virtual-ciso", label: "Virtual CISO" },
      { href: "/services/risk-management", label: "Risk Management" },
      { href: "/services/third-party-risk", label: "Third-Party Risk" },
      { href: "/services/audit-readiness", label: "Audit Readiness" },
      { href: "/services/security-assurance", label: "Security Assurance" },
    ],
  },
  {
    key: "frameworks",
    label: "Frameworks",
    viewAllLabel: "View All Frameworks",
    viewAllHref: "/frameworks",
    items: [
      { href: "/frameworks/sama-csf", label: "SAMA CSF" },
      { href: "/frameworks/nca-ecc", label: "NCA ECC" },
      { href: "/frameworks/pdpl", label: "Saudi PDPL" },
      { href: "/frameworks/iso-27001", label: "ISO 27001" },
    ],
  },
  {
    key: "industries",
    label: "Industries",
    viewAllLabel: "View All Industries",
    viewAllHref: "/industries",
    items: [
      { href: "/industries/financial-services", label: "Financial Services" },
      { href: "/industries/fintech-payments", label: "Fintech & Payments" },
      { href: "/industries/insurance", label: "Insurance" },
      { href: "/industries/technology", label: "Technology" },
      { href: "/industries/healthcare", label: "Healthcare" },
      { href: "/industries/regulated-enterprises", label: "Regulated Enterprises" },
    ],
  },
] as const;

export const directNavigationItems = [
  { href: "/insights", label: "Insights" },
  { href: "/company", label: "Company" },
] as const;

export const consultationLink = {
  href: "/book",
  label: "Book a Consultation",
} as const;
