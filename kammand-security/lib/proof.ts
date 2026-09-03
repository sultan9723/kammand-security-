/**
 * Engagement proof.
 *
 * AGENTS.md forbids fabricated customers, case studies, statistics, and
 * testimonials. Nothing may be added here that did not happen.
 *
 * An entry requires:
 *   - a real engagement
 *   - client consent to describe it, even anonymised
 *   - outcome wording the client would recognise as accurate
 *
 * The homepage Proof section renders nothing while this list is empty, so
 * shipping with no entries is correct and safe. Add entries as engagements
 * and consent allow.
 */

export type EngagementOutcome = {
  /** Anonymised shape, e.g. "GCC payments provider". Never a client name unless consent is explicit. */
  organization: string;
  /** Sector label matching an industry page where possible. */
  sector: string;
  /** The regulatory or assurance driver, e.g. "SAMA CSF readiness". */
  mandate: string;
  /** What changed. Observable, not promotional. */
  outcome: string;
  /** Frameworks genuinely in scope for the engagement. */
  frameworks: readonly string[];
};

export const engagementOutcomes: readonly EngagementOutcome[] = [];
