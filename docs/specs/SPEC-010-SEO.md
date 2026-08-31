# SPEC-010 - SEO, Metadata, Structured Data and Internal Links

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
- SPEC-008 - Homepage Insights
- SPEC-009 - Final CTA and Global Footer

## 1. Purpose

Implement a site-foundation SEO architecture without keyword stuffing or fabricated content.

Critical business copy must remain server-rendered and indexable.

## 2. Metadata Architecture

Use the Next.js App Router metadata system.

Title pattern:

- Homepage: `KAMMAND Security | GRC & Cybersecurity Advisory`
- Internal pages: `{Page Title} | KAMMAND Security`

Homepage description:

`Strategic GRC and cybersecurity advisory for regulated organizations across the GCC.`

## 3. Canonical URL Strategy

Do not hard-code an unverified production domain.

Canonical URLs, Open Graph URLs, robots host, and sitemap host derive from `NEXT_PUBLIC_SITE_URL`.

If `NEXT_PUBLIC_SITE_URL` is not configured, the implementation must avoid publishing an invented canonical production URL.

Production deployments must set `NEXT_PUBLIC_SITE_URL` to the verified canonical origin.

## 4. Open Graph and Social Metadata

Provide a restrained Open Graph and Twitter metadata foundation.

Do not reference unavailable social profiles or unapproved image assets.

## 5. Structured Data

Use only factually supportable JSON-LD.

Allowed:

- `ProfessionalService` or `Organization`
- name
- description
- URL only when canonical site URL is configured
- area served from approved project positioning
- service types from approved master spec

Do not add ratings, reviews, founding date, employee counts, clients, awards, certifications, addresses, phone numbers, or social profiles unless verified source data exists.

Do not add Article structured data for planned insights.

## 6. Breadcrumbs

Define BreadcrumbList architecture for internal pages in a future page-template phase.

Do not add meaningless breadcrumbs to the homepage.

## 7. Robots and Sitemap

Implement robots and sitemap foundations through Next.js mechanisms.

Production should be crawlable.

Preview/staging environments should not accidentally present themselves as canonical production content.

Only include valid currently implemented public routes in the sitemap.

## 8. Internal Link Audit

Homepage links must:

- avoid `#`
- avoid JavaScript pseudo-links
- use descriptive anchors
- use consistent planned routes

Missing destination pages are planned routes and must be reported separately.

Do not create missing destination pages during this spec.

## 9. Image SEO

Informative images require meaningful alt text.

Decorative visuals must be hidden from assistive technology where appropriate.

Do not keyword-stuff alt text.

## 10. Definition of Done

SPEC-010 is complete only when:

- this spec exists
- homepage metadata is implemented
- canonical-domain strategy is environment-driven
- supportable JSON-LD is emitted
- robots and sitemap foundations exist
- homepage heading hierarchy is audited
- internal links are audited
- no fake structured data is added
- tests pass
- production build passes
