/**
 * Practitioners.
 *
 * AGENTS.md forbids fabricated certifications and credentials. Every entry
 * here describes a real person, and every credential listed must be one they
 * actually hold and could evidence on request.
 *
 * The homepage Team section renders nothing while this list is empty, so
 * shipping with no entries is correct and safe.
 */

export type TeamMember = {
  name: string;
  role: string;
  /** One or two sentences on the work they actually do. */
  focus: string;
  /** Certifications genuinely held, e.g. "CISSP", "ISO 27001 Lead Auditor". */
  credentials: readonly string[];
};

export const teamMembers: readonly TeamMember[] = [];
