/**
 * Approved company positioning, shared by the company page and the homepage.
 *
 * This is approved business copy. Per AGENTS.md it must not be rewritten
 * without an explicit request.
 */

export const operatingPrinciples = [
  {
    icon: "target",
    title: "Clarity",
    description: "Make complex requirements understandable enough to operate.",
  },
  {
    icon: "person",
    title: "Accountability",
    description: "Connect controls, risks, and remediation activity to ownership.",
  },
  {
    icon: "gear",
    title: "Practicality",
    description: "Design governance routines organizations can actually run.",
  },
  {
    icon: "document",
    title: "Evidence",
    description: "Build confidence through reliable evidence and reviewable records.",
  },
  {
    icon: "shield",
    title: "Assurance",
    description: "Look beyond documentation toward whether controls work.",
  },
  {
    icon: "continuity",
    title: "Continuity",
    description: "Treat GRC as an operating capability, not a one-time project.",
  },
] as const;

export const supportContexts = [
  "Regulated organizations managing cyber risk, evidence, and assurance pressure",
  "Leadership teams that need clearer ownership across governance, risk, compliance, and security",
  "Organizations preparing for audit, regulatory review, certification activity, or management assurance",
  "Teams that need practical structures rather than documentation for its own sake",
] as const;
