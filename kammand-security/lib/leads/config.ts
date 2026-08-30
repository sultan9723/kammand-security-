export const contactInterestOptions = [
  "GRC Advisory",
  "Virtual CISO",
  "Risk Management",
  "Third-Party Risk",
  "Audit Readiness",
  "Security Assurance",
  "Framework / Regulatory Support",
  "Other",
] as const;

export type ContactInterest = (typeof contactInterestOptions)[number];

export type ContactLead = {
  fullName: string;
  workEmail: string;
  organization: string;
  message: string;
  jobTitle?: string;
  phone?: string;
  country?: string;
  areaOfInterest?: ContactInterest;
};

export const contactLimits = {
  maxPayloadBytes: 16_384,
  minSubmissionMs: 1500,
  maxSubmissionMs: 1000 * 60 * 60 * 2,
  rateLimitWindowMs: 1000 * 60 * 10,
  rateLimitMax: 5,
} as const;
