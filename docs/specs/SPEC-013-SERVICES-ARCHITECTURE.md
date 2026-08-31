# SPEC-013 - Services Architecture and Service Detail Template

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

## 1. Purpose

Begin Phase 2 by creating the services information architecture.

This spec creates:

- `/services` overview page
- a reusable service-detail page template architecture
- one populated service detail page: `/services/grc-advisory`

Do not create the other five service detail pages during this spec.

## 2. Services Overview Page

Route:

`/services`

Hero H1:

`GRC and cybersecurity services for regulated organizations.`

Supporting copy:

`KAMMAND helps organizations turn regulatory obligations, cybersecurity risk, and assurance requirements into practical programs, controls, evidence, and action.`

The page must include:

- six service summaries
- framework relationship section referencing SAMA CSF, NCA ECC, Saudi PDPL, and ISO 27001
- How engagements work using Discover, Design, Deliver, Assure
- final consultation CTA

The five unbuilt service detail routes may appear as planned routes in links, but those pages must not be created yet.

## 3. Service Detail Template

Future service detail pages should support:

- breadcrumbs
- eyebrow/category
- one H1
- clear value proposition
- primary CTA
- service problem/context
- what KAMMAND does
- core activities/deliverables
- who this is for
- relevant frameworks
- engagement approach
- expected practical outcomes
- related services
- final CTA

Do not fabricate results, client claims, certifications, guarantees, or regulatory endorsements.

## 4. GRC Advisory Page

Route:

`/services/grc-advisory`

H1:

`Governance, risk and compliance that works in practice.`

The page should cover:

- governance structure
- policy and control architecture
- risk management
- regulatory alignment
- accountability
- control ownership
- evidence
- reporting
- remediation planning

Relevant frameworks may naturally include SAMA CSF, NCA ECC, Saudi PDPL, and ISO 27001.

Do not claim exact framework mappings unless supported.

## 5. SEO

Implement:

- unique title
- unique description
- canonical handling through the existing site metadata architecture
- BreadcrumbList structured data for the detail page
- Service structured data only with supportable facts
- internal links to related services and frameworks
- exactly one H1 per page
- logical H2/H3 hierarchy

Do not keyword-stuff.

## 6. Responsive Behavior

Audit:

- 320
- 375
- 768
- 1024
- 1440

Internal service pages should feel part of Direction A but more content-focused and editorial than the homepage.

## 7. Performance

Use server-rendered content.

Do not add client JavaScript or large dependencies.

## 8. Testing

Add tests for:

- `/services`
- `/services/grc-advisory`
- one H1 per page
- expected internal links
- metadata and structured data where practical

## 9. Definition of Done

SPEC-013 is complete only when:

- this spec exists
- `/services` is implemented
- `/services/grc-advisory` is implemented through a reusable service-detail template
- no other service detail pages are created
- SEO metadata and structured data are supportable
- responsive QA passes
- release check passes
- lint passes
- typecheck passes
- tests pass
- production build passes
