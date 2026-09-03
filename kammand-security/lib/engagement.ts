/**
 * What a client receives from each engagement phase.
 *
 * Rendered inside the Process section, beneath each phase description, so
 * one section answers both "what do you do" and "what do I get" without
 * repeating the four phase headings on the page.
 *
 * Every deliverable below restates an artifact `engagementSteps` already
 * names for that phase — nothing new is claimed.
 *
 * Deliberately absent: durations, pricing, team size, and commercial terms.
 * Those are real commitments that must come from the business, not be
 * inferred here.
 */

export const deliverablesByPhase: Record<string, readonly string[]> = {
  Discover: [
    "A baseline of applicable obligations",
    "Current control and ownership position",
    "Risk exposure and priority view",
  ],
  Design: [
    "A sequenced remediation roadmap",
    "Control ownership assignments",
    "Documented evidence expectations",
  ],
  Deliver: [
    "Control and policy documentation",
    "Remediation activity tracking",
    "Reporting and issue routines",
  ],
  Assure: [
    "Control effectiveness review",
    "Evidence quality assessment",
    "Readiness position ahead of assessment",
  ],
};
