# SPEC-016 - Remaining Framework Detail Pages

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 - KAMMAND Design System
- SPEC-002 - Global Header and Navigation
- SPEC-004 - Framework Intelligence and Comparison
- SPEC-009 - Final CTA and Global Footer
- SPEC-010 - SEO, Metadata, Structured Data and Internal Links
- SPEC-011 - Accessibility and Responsive QA
- SPEC-012 - Security, Performance, CI/CD and Production Readiness
- SPEC-015 - Frameworks Architecture and SAMA CSF Detail Template

## 1. Purpose

Populate the remaining framework detail pages through the reusable SPEC-015 framework-detail architecture:

- `/frameworks/nca-ecc`
- `/frameworks/pdpl`
- `/frameworks/iso-27001`

Do not redesign the framework template. Do not begin Industries.

## 2. Core Rule

These are high-trust regulatory and standards pages.

Separate:

- factual framework information
- KAMMAND implementation and advisory guidance

Never present KAMMAND guidance as official framework requirements.

Do not fabricate controls, domains, clauses, applicability, penalties, deadlines, certifications, regulator interpretations, framework equivalencies, or legal conclusions.

If authoritative source material is not available in the repository, keep factual descriptions conservative and flag verification requirements before production publication.

## 3. NCA ECC

Route:

`/frameworks/nca-ecc`

H1:

`Build cybersecurity controls around clear accountability.`

Identify the framework as NCA Essential Cybersecurity Controls where supported by existing project content.

The page should cover:

- what NCA ECC is
- organizational relevance
- implementation considerations
- governance and accountability
- risk and control environment
- evidence and documentation
- common implementation challenges
- how KAMMAND can help
- related frameworks
- related services
- source/reference area
- disclaimer
- final CTA

Implementation themes may include governance, risk, control ownership, security operations, third-party considerations, resilience, evidence, and assurance.

Do not label these themes as official NCA domains unless verified.

## 4. Saudi PDPL

Route:

`/frameworks/pdpl`

H1:

`Turn privacy obligations into practical governance.`

PDPL must be treated differently from a cybersecurity control framework.

Focus on privacy-governance implementation themes such as governance, accountability, personal-data handling, policies and procedures, risk considerations, organizational responsibilities, third-party considerations, evidence/documentation, and security/privacy coordination.

Do not invent consent requirements, transfer requirements, breach-notification periods, fines, retention periods, legal bases, or controller/processor obligations unless supported by authoritative source material.

Make clear where legal or privacy counsel may be necessary.

KAMMAND's role is cybersecurity and GRC implementation and governance support, not legal advice.

## 5. ISO 27001

Route:

`/frameworks/iso-27001`

H1:

`Build an information security management system that works in practice.`

Use the official standard name or version only if verified in project content.

Do not invent ISO clauses or Annex A control details.

High-level content may discuss information security governance, risk-based management, policies, control ownership, evidence, continual improvement, assurance, and management oversight.

Explain the distinction between KAMMAND advisory/readiness support and accredited certification. KAMMAND must not appear to issue ISO certification unless verified.

Use wording such as prepare for certification, improve readiness, and strengthen the ISMS. Do not use `Get ISO certified by KAMMAND.`

## 6. Template Consistency

All three pages must reuse the SPEC-015 architecture:

- breadcrumb
- eyebrow
- H1
- framework context
- CTA
- what it is
- who it may be relevant to
- major focus areas
- implementation challenges
- how KAMMAND helps
- framework relationships
- related services
- sources
- disclaimer
- final CTA

Do not create different page designs.

## 7. Framework Relationships

Create contextual internal links between SAMA CSF, NCA ECC, Saudi PDPL, and ISO 27001.

Only communicate that organizations can face overlapping or complementary obligations.

Do not claim that one framework satisfies another or that the frameworks are equivalent.

## 8. Sources

Reuse the source/reference architecture from SPEC-015.

Use authoritative sources already established by the project when available. Do not use blogs, consultancy articles, or marketing sites as authoritative regulatory sources.

If authoritative sources are absent, keep statements conservative and flag verification requirements.

## 9. SEO

Each page requires:

- unique title
- unique description
- exactly one H1
- canonical
- breadcrumbs
- logical H2/H3 structure
- contextual internal links
- server-rendered core content

Avoid framework-name repetition purely for SEO.

Do not generate unsupported FAQ content.

## 10. Structured Data

Reuse SPEC-010 and SPEC-015 architecture.

Only output schema supported by actual page content and verified business information.

Do not add fake reviews, ratings, certifications, regulator relationships, or awards.

## 11. Design

Preserve Direction A:

- light editorial areas
- dark technical sections
- controlled cobalt emphasis

Do not introduce purple, glassmorphism, new gradients, generic cyber shields, regulator logo walls, or fake dashboards.

## 12. Responsive and Accessibility

Audit:

- 320
- 375
- 390
- 430
- 768
- 1024
- 1440

Pay attention to breadcrumbs, long framework names, H1 wrapping, relationships, sources, related services, and technical content.

Maintain semantic landmarks, one H1, logical heading hierarchy, accessible breadcrumbs, descriptive links, visible focus, sufficient contrast, reduced motion, list semantics, and non-color indicators.

## 13. Testing

Tests must verify:

- all three pages render
- one H1 each
- expected H1 text
- breadcrumbs
- source/reference section
- disclaimer
- related frameworks
- related services
- unique metadata where testable
- no certification or endorsement claims

## 14. Definition of Done

SPEC-016 is complete only when:

- this spec exists
- all three remaining framework detail pages are implemented
- the shared framework template is reused
- no new framework template design is introduced
- content remains high-level and source-aware
- sitemap includes implemented framework routes
- responsive QA passes
- release check passes
- lint passes
- typecheck passes
- tests pass
- production build passes
