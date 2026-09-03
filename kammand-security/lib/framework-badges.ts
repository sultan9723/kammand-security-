/**
 * Framework badges shown in the homepage strip.
 *
 * These are framework marks, displayed to state which standards KAMMAND
 * advises on. They are not partnership, endorsement, accreditation, or
 * certification claims, and no copy around them may imply one — see the
 * no-fabrication rules in AGENTS.md.
 *
 * Each badge links to the framework page that explains the actual scope of
 * work, so the claim behind the mark is always one click away.
 */

export type FrameworkBadge = {
  label: string;
  href: string;
  src: string;
  /** Intrinsic dimensions, needed by next/image to reserve space. */
  width: number;
  height: number;
};

export const frameworkBadges: readonly FrameworkBadge[] = [
  {
    label: "SAMA CSF",
    href: "/frameworks/sama-csf",
    src: "/images/frameworks/sama-csf.webp",
    width: 608,
    height: 504,
  },
  {
    label: "NCA ECC",
    href: "/frameworks/nca-ecc",
    src: "/images/frameworks/nca-ecc.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "ISO 27001",
    href: "/frameworks/iso-27001",
    src: "/images/frameworks/iso-27001.webp",
    width: 625,
    height: 625,
  },
] as const;
