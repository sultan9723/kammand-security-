# SPEC-008 - Homepage Insights

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 - KAMMAND Design System
- SPEC-002 - Global Header and Navigation
- SPEC-003 - Homepage Hero and Signature GRC Motion
- SPEC-004 - Framework Intelligence and Comparison
- SPEC-005 - Homepage Services and Capabilities
- SPEC-006 - Homepage Process and How KAMMAND Works

## 1. Purpose

Build a restrained editorial thought-leadership section that establishes KAMMAND as a source of useful GRC, regulatory, risk, compliance, and cybersecurity knowledge.

The section must feel editorial rather than like a generic SaaS blog-card grid.

## 2. Section Content

Eyebrow:

`INSIGHTS`

H2:

`Perspective for a changing risk landscape.`

Supporting copy:

`Practical analysis on cybersecurity governance, regulatory change, risk, compliance, and assurance.`

Initial entries are planned editorial topics unless real published article content exists:

- Understanding overlapping cybersecurity frameworks
- Building evidence before the audit begins
- Why third-party risk needs continuous oversight

Do not fabricate publication history.

## 3. Routes

Use planned routes:

- `/insights/overlapping-cybersecurity-frameworks`
- `/insights/audit-evidence-readiness`
- `/insights/continuous-third-party-risk`

Do not create article pages during this spec.

## 4. Visual Direction

Use the approved Direction A light/arctic canvas.

Use an editorial row/list treatment:

- category
- title
- date or status
- restrained directional affordance

Do not use large boxed blog cards, heavy shadows, gradients, or decorative imagery.

## 5. SEO and Semantics

Use one H2 for the Insights section.

Article titles may use H3 because each planned entry is a meaningful subsection under the section H2.

Do not add Article structured data for unpublished or planned content.

All titles and status labels must be server-rendered HTML text.

## 6. Motion

Use only minimal token-based motion:

- section or entry reveal
- restrained arrow movement on interaction

Respect `prefers-reduced-motion`.

## 7. Responsive Behavior

Desktop:

- use an editorial three-entry layout or structured row treatment

Tablet:

- preserve readable hierarchy

Mobile:

- single-column editorial list
- no carousel
- no horizontal scrolling

## 8. Accessibility

Use descriptive links, visible focus, logical headings, and understandable planned-status labels.

Decorative arrows should be hidden from assistive technology.

## 9. Definition of Done

SPEC-008 is complete only when:

- this spec exists
- homepage includes the Insights section after the process section
- the section uses planned/editorial status without fabricated publication claims
- all three planned entries render with correct routes
- no Article structured data is added
- no approved tokens are changed
- lint passes
- typecheck passes
- tests pass
- production build passes
