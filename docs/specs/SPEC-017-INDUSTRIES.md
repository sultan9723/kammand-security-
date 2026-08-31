# SPEC-017 - Industries Architecture

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 - KAMMAND Design System
- SPEC-002 - Global Header and Navigation
- SPEC-009 - Final CTA and Global Footer
- SPEC-010 - SEO, Metadata, Structured Data and Internal Links
- SPEC-013 - Services Architecture and Service Detail Template
- SPEC-015 - Frameworks Architecture and SAMA CSF Detail Template
- SPEC-016 - Remaining Framework Detail Pages

## 1. Purpose

Create KAMMAND's industry content system:

- `/industries`
- `/industries/financial-services`
- `/industries/fintech-payments`
- `/industries/insurance`
- `/industries/technology`
- `/industries/healthcare`
- `/industries/regulated-enterprises`

The purpose is to explain how KAMMAND's GRC and cybersecurity capabilities can apply to organizations operating in different regulated and risk-sensitive environments.

Do not claim that KAMMAND has clients, case studies, or proven work in every industry unless verified evidence is present.

## 2. Content Rules

Use careful advisory wording:

- `How KAMMAND can support...`
- `Organizations in this sector often...`
- `KAMMAND's approach can help...`

Avoid fabricated claims such as:

- `Our banking clients...`
- `We have helped hundreds...`
- `Leading healthcare organizations trust...`
- `Industry-leading expertise...`

Do not fabricate industry experience, customers, regulatory expertise, or verified outcomes.

## 3. Industries Overview

Route:

`/industries`

H1:

`GRC and cybersecurity for high-accountability environments.`

Supporting copy:

`Different industries face different risks, obligations, and operating realities. KAMMAND helps organizations build governance, risk, compliance, and cybersecurity programs around the environment in which they actually operate.`

Present:

- Financial Services
- Fintech & Payments
- Insurance
- Technology
- Healthcare
- Critical & Regulated Enterprises

The page must include breadcrumbs, an industry introduction, six industry categories, cross-industry challenges, relevant capabilities, framework/regulatory context, Discover to Design to Deliver to Assure, and a final consultation CTA.

## 4. Industry Detail Template

Every industry page must use one reusable architecture:

- breadcrumb
- industry eyebrow
- one H1
- positioning statement
- primary CTA
- industry context
- key GRC/cybersecurity challenges
- how KAMMAND can help
- relevant services
- regulatory/framework context
- practical engagement areas
- related industries
- final CTA

Do not create six different layouts.

## 5. Industry Pages

### Financial Services

Route: `/industries/financial-services`

H1: `Strengthen governance and cyber resilience in financial services.`

Themes include cybersecurity governance, risk management, regulatory alignment, third-party risk, control ownership, operational resilience, evidence, assurance, and executive oversight.

Framework references may include SAMA CSF, NCA ECC, Saudi PDPL, and ISO 27001 where appropriate. Do not imply every financial organization is subject to every framework.

### Fintech and Payments

Route: `/industries/fintech-payments`

H1: `Build security governance that can keep pace with growth.`

Themes include rapid growth, governance maturity, cyber risk, third-party dependencies, cloud/security oversight, control ownership, evidence, regulatory readiness, and resilience.

Do not introduce PCI DSS requirements unless verified and intentionally scoped.

### Insurance

Route: `/industries/insurance`

H1: `Make cyber risk visible, owned, and governable.`

Themes include governance, enterprise cyber risk, third-party dependencies, sensitive information, resilience, assurance, evidence, and accountability.

Do not invent insurance-specific regulations.

### Technology

Route: `/industries/technology`

H1: `Scale technology without losing control of security risk.`

Themes include security governance, scaling controls, cloud/vendor dependencies, ownership, risk management, evidence, customer assurance, and policy/control maturity.

Do not automatically claim SOC 2, ISO certification, NIST, or PCI requirements.

### Healthcare

Route: `/industries/healthcare`

H1: `Protect sensitive information through stronger governance.`

Themes include sensitive information, privacy, cybersecurity governance, operational continuity, third-party risk, accountability, risk, and assurance.

Do not introduce HIPAA, assume US jurisdiction, or provide medical/legal advice.

### Critical and Regulated Enterprises

Route: `/industries/regulated-enterprises`

H1: `Build assurance where operational accountability matters most.`

Themes include governance, critical operations, cyber risk, resilience, supplier dependencies, control ownership, evidence, assurance, and regulatory expectations.

Do not imply formal critical-infrastructure designation.

## 6. Cross-Industry Challenges

The overview may identify recurring advisory themes:

- unclear ownership
- fragmented controls
- regulatory overlap
- weak evidence
- third-party exposure
- reactive remediation
- limited risk visibility
- audit pressure

Do not present these as universal facts.

## 7. Services and Framework Context

Reuse existing service and framework routes.

Industry pages must link to relevant services contextually rather than mechanically listing every service on every page.

Industry does not equal framework applicability. Prefer wording such as:

- `Organizations may encounter...`
- `Depending on jurisdiction and scope...`
- `Relevant requirements can include...`

Never state that an entire industry must comply with a framework unless verified and scoped.

## 8. Design

Preserve Direction A:

- arctic/light canvas
- deep navy technical sections
- controlled cobalt accent
- Fraunces headings
- Inter body
- IBM Plex Mono technical labels
- editorial layouts
- structured typography
- thin technical lines
- whitespace

Avoid stock photography, generic industry imagery, floating SaaS cards, purple, glassmorphism, neon, and giant shields.

## 9. SEO and Accessibility

Every page requires unique title, unique meta description, one H1, logical H2/H3 hierarchy, canonical architecture, breadcrumbs, contextual internal links, and server-rendered content.

The six detail pages must contain differentiated content. Do not create doorway pages that only swap the industry name.

Use existing structured-data architecture only when factually supportable. Do not fabricate reviews, ratings, clients, addresses, awards, or industry certifications.

Maintain semantic landmarks, accessible breadcrumbs, keyboard navigation, visible focus, contrast, reduced motion, and appropriate decorative handling.

## 10. Responsive Behavior

Audit:

- 320
- 375
- 390
- 430
- 768
- 1024
- 1280
- 1440

Check hero wrapping, breadcrumbs, content widths, industry grids, technical sections, related services, framework links, CTA, and related industries.

## 11. Testing

Tests must verify all seven routes render, one H1 per page, expected H1 text, breadcrumbs, relevant service links, framework links where appropriate, related industry links, unique metadata where testable, and no fabricated client claims.

## 12. Definition of Done

SPEC-017 is complete only when:

- this spec exists
- `/industries` is implemented
- all six industry detail pages are implemented
- the shared industry template is reused
- content is differentiated by industry
- no fabricated industry proof claims are introduced
- responsive QA passes
- release check passes
- lint passes
- typecheck passes
- tests pass
- production build passes
