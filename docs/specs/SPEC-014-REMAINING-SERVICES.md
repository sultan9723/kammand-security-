# SPEC-014 - Remaining Service Pages

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 - KAMMAND Design System
- SPEC-002 - Global Header and Navigation
- SPEC-009 - Final CTA and Global Footer
- SPEC-010 - SEO, Metadata, Structured Data and Internal Links
- SPEC-011 - Accessibility and Responsive QA
- SPEC-012 - Security, Performance, CI/CD and Production Readiness
- SPEC-013 - Services Architecture and Service Detail Template

## 1. Purpose

Populate the remaining five service detail pages using the reusable service-detail template created in SPEC-013.

Routes:

- `/services/virtual-ciso`
- `/services/risk-management`
- `/services/third-party-risk`
- `/services/audit-readiness`
- `/services/security-assurance`

Do not redesign the service template. The objective is consistency across service pages while making each page's content specific to its service.

## 2. Required Page Structure

Every service detail page must follow the established SPEC-013 architecture:

- breadcrumbs
- eyebrow/category
- one H1
- supporting value proposition
- primary consultation CTA
- service problem/context
- what KAMMAND does
- core activities and deliverables
- who the service is for
- relevant frameworks
- engagement approach
- practical outcomes
- related services
- final CTA

Pages must remain primarily server-rendered and must not introduce unnecessary client JavaScript.

## 3. Service Pages

### Virtual CISO

Route: `/services/virtual-ciso`

H1: `Strategic security leadership without unnecessary overhead.`

The page explains KAMMAND's Virtual CISO capability as senior cybersecurity leadership and governance support for organizations that need direction, structure, accountability, and executive-level security oversight.

Content may cover cybersecurity strategy, governance structure, executive and board reporting, security roadmap, risk prioritization, policy oversight, control ownership, regulatory alignment, incident governance, third-party oversight, security metrics, and leadership support.

Do not claim KAMMAND replaces statutory or legally required roles where that cannot be guaranteed.

### Risk Management

Route: `/services/risk-management`

H1: `Turn cybersecurity risk into decisions your business can act on.`

The page explains structured cybersecurity risk management that makes risk visible, owned, prioritized, and managed.

Content may cover risk identification, assessment, risk registers, inherent and residual risk, ownership, treatment planning, acceptance, control effectiveness, reporting, escalation, risk appetite where appropriate, and remediation prioritization.

Do not imply that all risk can be eliminated.

### Third-Party Risk

Route: `/services/third-party-risk`

H1: `Know where supplier risk enters your control environment.`

The page explains supplier and partner risk oversight through classification, due diligence, evidence review, onboarding controls, ongoing review routines, remediation, ownership, concentration risk, dependency risk, and offboarding considerations.

Do not imply continuous automated vendor monitoring unless such a system exists.

### Audit Readiness

Route: `/services/audit-readiness`

H1: `Prepare before the auditor starts asking for evidence.`

The page explains audit readiness support for control readiness, evidence organization, ownership, gap identification, remediation planning, policy and document review, walkthrough preparation, evidence quality, management reporting, pre-assessment review, and audit coordination support.

Do not claim guaranteed audit success, guaranteed certification, or that KAMMAND can make an organization pass an audit.

### Security Assurance

Route: `/services/security-assurance`

H1: `Confidence that controls exist, operate, and can be evidenced.`

The page explains assurance support for control design review, operating effectiveness, evidence review, control ownership, assurance planning, testing approach, gap identification, management reporting, remediation tracking, and independent review.

Do not imply formal external audit or certification authority unless verified.

## 4. Framework References

Use framework references only where relevant and supportable.

Potential references:

- SAMA CSF
- NCA ECC
- Saudi PDPL
- ISO 27001

Do not mechanically place every framework on every page. Do not publish detailed control mappings unless verified.

## 5. Related Services

Use intentional internal linking:

- Virtual CISO: GRC Advisory, Risk Management, Security Assurance
- Risk Management: GRC Advisory, Third-Party Risk, Security Assurance
- Third-Party Risk: Risk Management, GRC Advisory, Audit Readiness
- Audit Readiness: GRC Advisory, Security Assurance, Risk Management
- Security Assurance: Audit Readiness, Risk Management, Virtual CISO

Avoid excessive circular link clutter.

## 6. SEO

Every service page requires:

- unique title
- unique meta description
- exactly one H1
- logical H2 and H3 hierarchy
- canonical handling through the existing architecture
- breadcrumb structure
- internal links
- crawlable content
- Service structured data only with supportable facts

Do not keyword-stuff framework names, GCC, Saudi Arabia, or cybersecurity consulting terms.

## 7. Responsive Behavior

Reuse the proven internal-page responsive system. Audit:

- 320
- 375
- 768
- 1024
- 1440

Pay attention to long H1 wrapping, breadcrumbs, deliverable lists, related services, framework references, and CTA layout.

## 8. Accessibility

Maintain semantic landmarks, one H1, correct H2/H3 hierarchy, keyboard navigation, descriptive links, visible focus, decorative visual handling, and adequate contrast.

## 9. Testing

Tests must verify:

- all five routes render
- each page has one H1
- each page has unique expected H1 content
- related-service links are valid
- breadcrumb structure is present
- metadata architecture remains valid where practical

## 10. Definition of Done

SPEC-014 is complete only when:

- this spec exists
- all five remaining service pages are implemented
- the shared SPEC-013 template is reused
- service content is specific and avoids fabricated claims
- framework references are relevant and qualified
- related service links are intentional
- sitemap includes implemented service routes
- responsive QA passes
- release check passes
- lint passes
- typecheck passes
- tests pass
- production build passes
