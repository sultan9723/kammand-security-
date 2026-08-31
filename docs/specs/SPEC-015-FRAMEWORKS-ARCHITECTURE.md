# SPEC-015 - Frameworks Architecture and SAMA CSF Detail Template

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
- SPEC-013 - Services Architecture and Service Detail Template
- SPEC-014 - Remaining Service Pages

## 1. Purpose

Create the initial framework information architecture:

- `/frameworks` overview page
- reusable framework-detail template architecture
- first populated framework detail page: `/frameworks/sama-csf`

Do not build NCA ECC, Saudi PDPL, or ISO 27001 detail pages during this spec.

## 2. Framework Content Rule

Framework pages are informational and advisory.

KAMMAND must not present itself as:

- the regulator
- an accreditation body
- a certification body
- the owner of third-party frameworks

Do not imply regulator endorsement.

Do not invent control requirements, domain names, applicability requirements, compliance deadlines, penalties, certification requirements, framework equivalencies, or legal interpretations.

If authoritative source material is not present in the repository, descriptions must remain high-level and source verification must be noted before production publication.

## 3. Frameworks Overview

Route:

`/frameworks`

H1:

`Navigate complex frameworks with greater clarity.`

Supporting copy:

`KAMMAND helps organizations interpret requirements, understand control relationships, identify gaps, organize evidence, and build practical compliance and assurance programs.`

The overview presents:

- SAMA CSF -> `/frameworks/sama-csf`
- NCA ECC -> `/frameworks/nca-ecc`
- Saudi PDPL -> `/frameworks/pdpl`
- ISO 27001 -> `/frameworks/iso-27001`

Each item includes a framework name, concise high-level description, type/category, and detail-page link.

Do not use regulator logos unless approved assets and usage rights exist.

## 4. Framework Overview Visual

Reuse the conceptual language of the homepage framework-intelligence section.

The overview may show framework relationships, common capability areas, and high-level relationship views.

Do not publish definitive control-to-control mappings unless verified source data exists.

Avoid the term `Equivalent controls` unless verified mapping exists.

## 5. Common Capability Areas

The overview may discuss KAMMAND organizational categories such as:

- Governance
- Risk Management
- Cybersecurity Controls
- Data Protection
- Incident Management
- Third-Party Risk
- Resilience
- Assurance

Do not imply these are official domain names across every listed framework.

## 6. Framework Detail Template

Framework detail pages must support:

- breadcrumbs
- framework eyebrow/category
- one H1
- concise framework context
- advisory CTA
- what the framework is
- who it may be relevant to
- major focus areas
- common implementation challenges
- how KAMMAND can help
- relationship to other frameworks
- related services
- source/reference area
- disclaimer
- final CTA

Internal framework pages should feel analytical while remaining consistent with Direction A.

## 7. SAMA CSF Detail Page

Route:

`/frameworks/sama-csf`

H1:

`Build a practical approach to SAMA cybersecurity requirements.`

Use `SAMA Cyber Security Framework` without inventing a version number.

Content must remain conservative unless authoritative source material exists in the repository.

The page may discuss implementation themes such as governance, cybersecurity risk, control ownership, policies and procedures, security operations, third-party oversight, resilience, evidence, and assurance.

Do not state that these are the official SAMA domain or control structure unless verified.

## 8. Implementation Challenges

The SAMA page may discuss common implementation challenges such as:

- unclear control ownership
- fragmented evidence
- policy/control misalignment
- inconsistent risk treatment
- remediation tracking
- third-party oversight
- maintaining readiness over time

Frame these as organizational implementation challenges, not as regulator-issued findings.

## 9. How KAMMAND Helps

Connect meaningfully to relevant KAMMAND services:

- GRC Advisory
- Risk Management
- Virtual CISO
- Third-Party Risk
- Audit Readiness
- Security Assurance

Use internal links and avoid claims of guaranteed compliance, certification, audit success, or regulator approval.

## 10. Framework Relationships

The SAMA page may reference:

- NCA ECC
- Saudi PDPL
- ISO 27001

Explain only that organizations may encounter overlapping or complementary governance, security, privacy, and assurance requirements.

Do not state exact equivalencies without verified mapping data.

## 11. Sources and References

Framework pages must include a source/reference area architecture.

If official source URLs are not present in the repository, do not fabricate references. Instead, show that authoritative references are pending source verification.

The architecture must support future entries such as issuing authority, official framework, and official regulatory guidance.

Do not use random blogs as regulatory authority.

## 12. Disclaimer

Include a concise informational disclaimer:

KAMMAND framework content provides general information and advisory context. It is not legal advice or an authoritative substitute for requirements issued by the relevant regulator or standards body.

## 13. Design

Use Direction A:

- light editorial content
- selected dark technical/framework sections
- controlled cobalt emphasis
- strong typography
- structured information
- restrained technical lines
- generous whitespace

Do not use purple, glassmorphism, fake dashboards, giant shield graphics, regulator-logo walls, or cyberpunk visuals.

## 14. SEO

Framework overview and detail pages must each have one H1.

Use logical H2/H3 hierarchy.

Implement:

- unique title
- unique description
- canonical handling
- breadcrumbs on detail pages
- structured data only when factually supportable

Do not keyword-stuff SAMA, Saudi Arabia, cybersecurity, compliance, or GRC.

## 15. Accessibility and Responsive Behavior

Maintain semantic landmarks, accessible breadcrumbs, descriptive links, non-color indicators, visible focus, reduced-motion support, and adequate contrast.

Audit:

- 320
- 375
- 768
- 1024
- 1440

Pay attention to framework names, breadcrumbs, relationship content, source/reference areas, related frameworks, and long headings.

## 16. Performance

Use server-rendered editorial content.

Do not add heavy visualization libraries or new dependencies.

Use HTML, CSS, and lightweight SVG only where necessary.

## 17. Testing

Tests must verify:

- `/frameworks` renders
- `/frameworks/sama-csf` renders
- exactly one H1 on each page
- framework links use expected routes
- breadcrumbs work
- related services use valid routes
- unsupported claim language is not introduced
- metadata is unique where testable

## 18. Definition of Done

SPEC-015 is complete only when:

- this spec exists
- `/frameworks` is implemented
- `/frameworks/sama-csf` is implemented through a reusable detail template
- no other framework detail pages are created
- framework content is high-level and source-aware
- source/reference architecture exists without fabricated references
- sitemap includes implemented framework routes only
- responsive QA passes
- release check passes
- lint passes
- typecheck passes
- tests pass
- production build passes
