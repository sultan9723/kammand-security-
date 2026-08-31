# SPEC-019 - Company, Trust and Security

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 - KAMMAND Design System
- SPEC-002 - Global Header and Navigation
- SPEC-009 - Final CTA and Global Footer
- SPEC-010 - SEO, Metadata, Structured Data and Internal Links
- SPEC-012 - Security, Performance, CI/CD and Production Readiness
- SPEC-013 through SPEC-018 - Phase 2 content architecture

## 1. Purpose

Create two distinct credibility pages:

- `/company`
- `/security`

The Company page explains who KAMMAND is, what it believes, how it approaches GRC and cybersecurity, and what differentiates its working philosophy.

The Security page explains KAMMAND's approach to security, privacy, responsible handling of client information, website security, and trust.

These pages must not become generic marketing filler.

## 2. Factual Integrity

Do not invent:

- founding year
- founder biographies
- employee count
- office locations
- client count
- customer logos
- testimonials
- certifications
- ISO certification
- SOC 2 status
- regulatory approvals
- regulator relationships
- partnerships
- awards
- revenue
- countries served beyond approved GCC positioning
- breach history
- uptime percentages
- insurance coverage
- security audit results

If verified company information is not available, design the page so factual details can be inserted later.

## 3. Company Page

Route:

`/company`

H1:

`Clarity, accountability, and security by design.`

Supporting copy:

`KAMMAND is focused on helping organizations turn governance, cybersecurity risk, regulatory requirements, and assurance expectations into practical action.`

The page includes:

- breadcrumb
- company hero
- what KAMMAND does
- point of view
- operating principles
- how KAMMAND works
- areas of expertise
- framework perspective
- who KAMMAND is designed to support
- final consultation CTA

Do not add a fake team section.

## 4. Company Point of View

Use established KAMMAND positioning:

- GRC should create operational clarity rather than documentation for its own sake.
- Cybersecurity risk should be visible, owned, and actionable.
- Controls should have clear ownership.
- Evidence should be built continuously rather than assembled only when an audit begins.
- Regulatory requirements should be translated into practical operating structures.
- Assurance should help management understand whether controls are actually working.

Present these as KAMMAND working principles.

## 5. Operating Principles

Use concise principles:

- Clarity
- Accountability
- Practicality
- Evidence
- Assurance
- Continuity

Do not create six giant cards.

## 6. Expertise and Internal Links

The Company page should link contextually to:

- `/services`
- `/frameworks`
- `/industries`
- `/insights`
- `/book`
- `/contact`

It may also link to service and framework detail pages where contextually useful.

Do not imply certifications, regulator endorsement, or client proof.

## 7. Security and Trust Page

Route:

`/security`

H1:

`Trust should be supported by how you operate.`

This page establishes a foundation for a future formal Trust Center. Do not pretend that a full automated Trust Center exists.

The page includes:

- breadcrumb
- trust/security hero
- security principles
- client information handling
- website/application security
- responsible disclosure
- third-party services
- privacy relationship
- security contact architecture
- future assurance/documentation area
- final contact CTA

## 8. Security Content Rules

Differentiate current implementation from principles or intended future practices.

Current website implementation may reference verified codebase practices such as:

- conservative security headers in Next.js configuration
- minimal client-side exposure
- no contact form or Calendly script currently implemented
- structured server-rendered content
- environment-driven canonical URL strategy
- dependency validation through existing project scripts

Do not claim production TLS, monitoring, encryption standards, specific retention periods, incident history, or assurance reports unless verified.

## 9. Client Information

Explain at a high level that client information should be handled according to business need, appropriate access, confidentiality, agreed engagement requirements, and applicable privacy/security obligations.

Do not invent retention periods, encryption standards, or absolute security promises.

## 10. Third-Party Services

Create transparent architecture for future third-party services such as Calendly, analytics, email provider, monitoring, and CRM.

Do not state that a service is active unless it is implemented.

## 11. Responsible Disclosure

Create a restrained responsible-disclosure section.

Do not create a fake bug bounty or monetary reward promise.

If no verified security email exists, direct visitors to the existing contact architecture and mark dedicated security contact configuration as future work.

## 12. Privacy Connection

Link to `/privacy`.

Do not implement the Privacy Policy during SPEC-019.

## 13. SEO and Structured Data

Both pages require:

- unique title
- unique description
- one H1
- canonical handling
- breadcrumbs

Use only existing verified Organization/ProfessionalService architecture. Do not add fake Person, Founder, review, certification, address, or award schema.

Breadcrumb JSON-LD is permitted.

## 14. Accessibility and Responsive Behavior

Maintain semantic landmarks, one H1 per page, logical H2/H3 hierarchy, accessible breadcrumbs, descriptive links, visible focus, sufficient contrast, reduced motion, and readable line lengths.

Audit:

- 320
- 375
- 390
- 430
- 768
- 1024
- 1280
- 1440

## 15. Performance

Pages must remain server-rendered.

Do not add client JavaScript, stock imagery, or new dependencies.

## 16. Testing

Tests must verify:

- `/company` renders
- `/security` renders
- each page has exactly one H1
- expected H1 text
- breadcrumbs
- unique metadata
- appropriate internal links
- no fabricated certifications
- no fabricated testimonials
- no fabricated client counts
- no fabricated team data

## 17. Definition of Done

SPEC-019 is complete only when:

- this spec exists
- `/company` is implemented
- `/security` is implemented
- both pages use Direction A without changing global tokens
- no fabricated company or trust claims are introduced
- sitemap includes implemented public routes
- responsive QA passes
- release check passes
- lint passes
- typecheck passes
- tests pass
- production build passes
