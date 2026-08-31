# KAMMAND Page Inventory

Date: 2026-08-17

Scope: App Router inventory and diagnosis only. No source, component, route, token, or styling changes were made.

Sources reviewed:

- `AGENTS.md`
- `docs/KAMMAND-MASTER-SPEC.md`
- `docs/specs/SPEC-001-DESIGN-SYSTEM.md`
- `docs/specs/SPEC-002-GLOBAL-NAVIGATION.md` through `docs/specs/SPEC-023-FINAL-PRODUCTION-AUDIT.md` where relevant
- `kammand-security/app`
- `kammand-security/components`
- `kammand-security/content`
- `kammand-security/lib`

Actual Next.js application root:

- `C:\Users\DELL\Desktop\kammand-security-\kammand-security`

Documentation root:

- `C:\Users\DELL\Desktop\kammand-security-\docs`

## Inventory Legend

Status:

- COMPLETE: route is implemented and has no obvious placeholder dependency.
- PARTIAL: route is implemented but depends on missing business/legal/operational verification, production configuration, or content completion.
- PLACEHOLDER: route intentionally exists with empty/draft content.
- BROKEN: route appears unusable from static inspection.

Route presence:

- Nav: global header navigation or primary header CTA.
- Footer: global footer navigation.
- Sitemap: included by `app/sitemap.ts` route architecture. Sitemap output depends on `NEXT_PUBLIC_SITE_URL`; if absent, the sitemap function returns an empty array.

Mobile status is based on code-level inventory and prior completed responsive audits, not a fresh screenshot pass for this document.

## Public Page Routes

| Route | Page name | Type | Current purpose | Major sections | Current H1 | Metadata/title status | Shared template/component used | Status | UI/UX, mobile, content diagnosis | Nav / Footer / Sitemap | Related spec | Recommended action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Homepage | Static | Primary marketing and conversion page for KAMMAND. | Header; hero; framework intelligence; capabilities; process; insights; final CTA; footer. | `Navigate regulation. Control risk. Stay audit-ready.` | Root layout metadata from `lib/site.ts`; homepage-specific JSON-LD support exists. | `HomepageHero`, `FrameworkIntelligence`, `ServicesSection`, `ProcessSection`, `InsightsSection`, `FinalCtaSection`. | PARTIAL | Master spec expected an industries section, why-KAMMAND/proof area, and fuller homepage rhythm; current page is usable but incomplete against master structure. Mobile likely functional, but visual consistency issues remain around section rhythm and dense diagrams. Content is credible and avoids fake claims. | Nav: logo only; Footer: brand link; Sitemap: yes. | SPEC-003 through SPEC-010, master spec | REFINE |
| `/services` | Services overview | Static | Explains KAMMAND service architecture and links to service detail pages. | Hero; six service summaries; framework relationship section; engagement process; final CTA. | `GRC and cybersecurity services for regulated organizations.` | Unique metadata exists: `Services`. | `ServicesOverview`. | COMPLETE | Strong page architecture. Obvious refinement need is visual consistency with other internal overview pages and avoiding a stretched-homepage feel. Mobile should stack acceptably, but long service copy and repeated list density need visual QA. Content is supportable. | Nav: yes; Footer: no direct overview link; Sitemap: yes. | SPEC-013 | KEEP |
| `/services/grc-advisory` | GRC Advisory | Static | Service detail page proving the reusable service template. | Breadcrumbs; hero; problem/context; what KAMMAND does; activities; audience/outcomes; frameworks; engagement approach; related services; final CTA. | `Governance, risk and compliance that works in practice.` | Unique metadata exists: `GRC Advisory`; breadcrumb and service structured-data support exists. | `ServiceDetailTemplate`. | COMPLETE | Template is coherent and crawlable. Risk is visual repetition if cloned too broadly; H1 wrapping and dense list sections require mobile polish. Content is service-specific and avoids guarantees. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-013 | KEEP |
| `/services/virtual-ciso` | Virtual CISO | Static | Service detail page for strategic security leadership. | Same service detail architecture as GRC Advisory. | `Strategic security leadership without unnecessary overhead.` | Unique metadata exists: `Virtual CISO`. | `ServiceDetailTemplate`. | COMPLETE | Content is differentiated and careful about role replacement claims. Mobile likely functional; H1 and related-service areas need visual QA before cloning further patterns. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-014 | KEEP |
| `/services/risk-management` | Risk Management | Static | Service detail page for cybersecurity risk management. | Same service detail architecture as GRC Advisory. | `Turn cybersecurity risk into decisions your business can act on.` | Unique metadata exists: `Risk Management`. | `ServiceDetailTemplate`. | COMPLETE | Content properly avoids eliminating-risk claims. Main concern is long H1 wrapping and repeated editorial blocks across service pages. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-014 | KEEP |
| `/services/third-party-risk` | Third-Party Risk | Static | Service detail page for supplier and partner risk advisory. | Same service detail architecture as GRC Advisory. | `Know where supplier risk enters your control environment.` | Unique metadata exists: `Third-Party Risk`. | `ServiceDetailTemplate`. | COMPLETE | Copy avoids implying automated continuous monitoring. Mobile status should be checked around deliverable lists and related-service rows. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-014 | KEEP |
| `/services/audit-readiness` | Audit Readiness | Static | Service detail page for readiness before regulatory or certification assessments. | Same service detail architecture as GRC Advisory. | `Prepare before the auditor starts asking for evidence.` | Unique metadata exists: `Audit Readiness`. | `ServiceDetailTemplate`. | COMPLETE | Claim discipline is good. Mobile polish needed for long explanatory sections and CTA rhythm. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-014 | KEEP |
| `/services/security-assurance` | Security Assurance | Static | Service detail page for control design, operation, evidence, and assurance support. | Same service detail architecture as GRC Advisory. | `Confidence that controls exist, operate, and can be evidenced.` | Unique metadata exists: `Security Assurance`. | `ServiceDetailTemplate`. | COMPLETE | Copy avoids implying formal certification authority. H1 line breaks and list density need visual review on 320-430px. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-014 | KEEP |
| `/frameworks` | Frameworks overview | Static | Explains framework advisory context and links to framework detail pages. | Hero; framework summaries; capability relationship context; engagement support; final CTA. | `Navigate complex frameworks with greater clarity.` | Unique metadata exists: `Frameworks`. | `FrameworksOverview`. | COMPLETE | Good high-level architecture. Needs review to ensure framework relationship visuals never imply verified equivalence. Mobile likely functional but matrix-like content should be visually checked. | Nav: yes; Footer: no direct overview link; Sitemap: yes. | SPEC-015 | REVIEW |
| `/frameworks/sama-csf` | SAMA CSF | Static | Framework detail page for high-level SAMA CSF advisory context. | Breadcrumbs; hero; what it is; relevance; implementation themes; dark challenges; KAMMAND support; framework relationships; related services; source notes; disclaimer; final CTA. | `Build a practical approach to SAMA cybersecurity requirements.` | Unique metadata exists: `SAMA CSF`; breadcrumb structured data exists. | `FrameworkDetailTemplate`. | PARTIAL | Page explicitly lacks official source URL and authoritative verification notes. UI is implemented, but content needs business/source review before production reliance. Mobile risk: long H1 and source/disclaimer density. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-015 | REVIEW |
| `/frameworks/nca-ecc` | NCA ECC | Static | Framework detail page for high-level NCA ECC advisory context. | Same framework detail architecture. | `Build cybersecurity controls around clear accountability.` | Unique metadata exists: `NCA ECC`. | `FrameworkDetailTemplate`. | PARTIAL | Source verification notes are empty/pending. Relationship language is cautious, but framework authority references should be added. Mobile likely functional with long section headings needing review. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-016 | REVIEW |
| `/frameworks/pdpl` | Saudi PDPL | Static | Framework/legal reference page for privacy and data protection governance context. | Same framework detail architecture. | `Turn privacy obligations into practical governance.` | Unique metadata exists: `Saudi PDPL`. | `FrameworkDetailTemplate`. | PARTIAL | Correctly states no legal advice, but official legal sources and counsel review are pending. Content should be business/legal reviewed. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-016 | REVIEW |
| `/frameworks/iso-27001` | ISO 27001 | Static | Framework detail page for ISO 27001 advisory/readiness context. | Same framework detail architecture. | `Build an information security management system that works in practice.` | Unique metadata exists: `ISO 27001`. | `FrameworkDetailTemplate`. | PARTIAL | Correctly avoids certification-body claims, but official standard/version references remain pending. Mobile risk: long H1 and dense related sections. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-016 | REVIEW |
| `/industries` | Industries overview | Static | Explains target operating environments and links to industry pages. | Hero; industry context; industry categories; recurring challenges; capabilities; framework context; process; final CTA. | `GRC and cybersecurity for high-accountability environments.` | Unique metadata exists: `Industries`. | `IndustriesOverview`. | COMPLETE | Content is broad and appropriately scoped. Visual issue to review: repeated list/grid structures may feel templated. Mobile likely stacks cleanly, but category density needs QA. | Nav: yes; Footer: yes; Sitemap: yes. | SPEC-017 | REFINE |
| `/industries/financial-services` | Financial Services | Static | Industry detail page for financial-services operating context. | Breadcrumbs; hero; context; key challenges; advisory support; relevant services; framework context; engagement areas; related industries; final CTA. | `Strengthen governance and cyber resilience in financial services.` | Unique metadata exists: `Financial Services`. | `IndustryDetailTemplate`. | COMPLETE | Content is cautious about applicability. Needs business review for sector nuance. Mobile risk: long H1 and long related-service grids. | Nav: no; Footer: no; Sitemap: yes. | SPEC-017 | REFINE |
| `/industries/fintech-payments` | Fintech & Payments | Static | Industry detail page for fintech and payment organizations. | Same industry detail architecture. | `Build security governance that can keep pace with growth.` | Unique metadata exists: `Fintech & Payments`. | `IndustryDetailTemplate`. | COMPLETE | Good audience fit. Needs review for payment-sector specificity and route discoverability because footer does not link industry details. | Nav: no; Footer: no; Sitemap: yes. | SPEC-017 | REFINE |
| `/industries/insurance` | Insurance | Static | Industry detail page for insurance organizations. | Same industry detail architecture. | `Make cyber risk visible, owned, and governable.` | Unique metadata exists: `Insurance`. | `IndustryDetailTemplate`. | COMPLETE | Content is credible but broad. Mobile likely okay; review text rhythm and relationship links. | Nav: no; Footer: no; Sitemap: yes. | SPEC-017 | REFINE |
| `/industries/technology` | Technology | Static | Industry detail page for technology organizations. | Same industry detail architecture. | `Scale technology without losing control of security risk.` | Unique metadata exists: `Technology`. | `IndustryDetailTemplate`. | COMPLETE | Useful positioning, but risks generic SaaS/service-provider phrasing unless refined with more specific KAMMAND perspective. | Nav: no; Footer: no; Sitemap: yes. | SPEC-017 | REFINE |
| `/industries/healthcare` | Healthcare | Static | Industry detail page for healthcare organizations. | Same industry detail architecture. | `Protect sensitive information through stronger governance.` | Unique metadata exists: `Healthcare`. | `IndustryDetailTemplate`. | COMPLETE | Correctly avoids US-specific medical/legal assumptions. Needs legal/content review for jurisdictional sensitivity. | Nav: no; Footer: no; Sitemap: yes. | SPEC-017 | REVIEW |
| `/industries/regulated-enterprises` | Critical & Regulated Enterprises | Static | Industry detail page for broad high-accountability organizations. | Same industry detail architecture. | `Build assurance where operational accountability matters most.` | Unique metadata exists: `Critical & Regulated Enterprises`. | `IndustryDetailTemplate`. | COMPLETE | Broad category may need sharper definition. Mobile risk: long labels and breadcrumb wrapping. | Nav: no; Footer: no; Sitemap: yes. | SPEC-017 | REFINE |
| `/insights` | Insights index | Static | Editorial index for insights and planned thought leadership. | Hero; published-insights list or empty state. | `Insights for a changing risk landscape.` | Unique metadata exists: `Insights`. | `InsightsIndex`. | PLACEHOLDER | No published insights currently appear; page is intentionally sparse. Mobile should be simple, but page may feel unfinished until real content exists. | Nav: yes; Footer: yes; Sitemap: yes. | SPEC-018 | REVIEW |
| `/company` | Company/About | Static | Explains KAMMAND positioning, principles, expertise, and approach. | Hero; what KAMMAND does; point of view; operating principles; how work happens; expertise; framework perspective; support categories; final CTA. | `Clarity, accountability, and security by design.` | Unique metadata exists: `Company`; no fabricated company schema. | `CompanyPage`. | PARTIAL | Credible but currently light on verifiable company facts, team credentials, location, or operating proof. Needs business content review. Mobile likely functional; visual risk is dense repeated principle/list sections. | Nav: yes; Footer: yes as `About`; Sitemap: yes. | SPEC-019 | REVIEW |
| `/security` | Security / Trust | Static | Describes visible site security posture and future trust documentation. | Hero; security principles; client information; current website implementation; third-party services; privacy link; responsible disclosure; future trust docs; final CTA. | `Trust should be supported by how you operate.` | Unique metadata exists: `Security`; only breadcrumb structured data. | `TrustSecurityPage`. | PARTIAL | Strong claim discipline, but production operational controls are not externally verified. Needs business/security owner review before being treated as a full trust center. | Nav: no; Footer: yes under Legal; Sitemap: yes. | SPEC-019, SPEC-012 | REVIEW |
| `/contact` | Contact | Static | Inquiry path for visitors not ready to book directly. | Hero; contact form; next steps; booking alternative. | `Let's talk about what your organization needs.` | Unique metadata exists: `Contact`. | `ContactPage`, `ContactForm`. | PARTIAL | UI exists, but production readiness depends on lead-delivery configuration, rate limiting behavior, privacy process, and error handling validation. Mobile form usability should be reviewed. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-020 | REVIEW |
| `/book` | Book a Consultation | Static | Primary conversion path and future Calendly integration surface. | Hero; scheduling area; Calendly consent/fallback; privacy note. | `Book a consultation.` | Unique metadata exists: `Book a Consultation`. | `BookPage`, `CalendlyConsentEmbed`. | PARTIAL | If Calendly env/config is absent, route relies on fallback. Needs final Calendly, consent, CSP, privacy, and accessibility review. Mobile likely functional but embed/fallback behavior needs live QA. | Nav: CTA yes; Footer: yes; Sitemap: yes. | SPEC-020, SPEC-022 | REVIEW |
| `/privacy` | Privacy Notice | Static | Draft privacy notice for website and integrations. | Legal page header; legal content sections. | `Privacy Notice` | Unique metadata exists: `Privacy Notice`. | `LegalPage`. | PARTIAL | Legal content needs counsel/business review. Mobile likely readable; long legal sections need spacing review. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-021 | REVIEW |
| `/cookies` | Cookie Policy | Static | Cookie and storage policy for consent architecture. | Legal page header; cookie categories/table; update notes. | `Cookie Policy` | Unique metadata exists: `Cookie Policy`. | `LegalPage`. | PARTIAL | Legal/content review required. Cookie registry/table may require horizontal scroll or better mobile treatment. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-021 | REVIEW |
| `/terms` | Terms of Use | Static | Website terms draft. | Legal page header; terms content sections. | `Terms of Use` | Unique metadata exists: `Terms of Use`. | `LegalPage`. | PARTIAL | Legal review required. Visual treatment likely acceptable but text-heavy mobile rhythm should be reviewed. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-021 | REVIEW |
| `/accessibility` | Accessibility Statement | Static | Accessibility statement and contact path. | Legal page header; accessibility commitments and known limits. | `Accessibility Statement` | Unique metadata exists: `Accessibility Statement`. | `LegalPage`. | PARTIAL | Needs accessibility policy/business review and alignment with actual audit status before production publication. | Nav: no; Footer: yes; Sitemap: yes. | SPEC-021, SPEC-011 | REVIEW |
| `/insights/[slug]` | Insight article template | Dynamic | Renders published insight articles by slug. | Article hero; body; references; related content; final CTA. | Dynamic insight title when published. | Dynamic metadata; draft/missing slugs return `Insight Not Found` metadata and `notFound()`. | `InsightArticle`, content model in `content/insights/entries.ts`. | PARTIAL | Template is present, but there are no published insight entries. Draft routes intentionally do not render publicly. Mobile article readability should be reviewed once real content exists. | Nav: no; Footer: no; Sitemap: published entries only; currently none. | SPEC-018 | REVIEW |

## API And Special Routes

| Route | Page name | Type | Current purpose | Major sections | Current H1 | Metadata/title status | Shared template/component used | Status | UI/UX, mobile, content diagnosis | Nav / Footer / Sitemap | Related spec | Recommended action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/api/contact` | Contact lead API | Static API route | Accepts contact form submissions through configured lead provider. | Not applicable. | Not applicable. | Not applicable. | Lead validation/provider/rate-limit modules. | PARTIAL | No UI surface. Production completeness depends on real lead delivery, environment config, abuse controls, privacy workflow, and operational monitoring. | Nav: no; Footer: no; Sitemap: no. | SPEC-020, SPEC-022 | REVIEW |
| `/api/health` | Health API | Static API route | Basic health endpoint for production checks. | Not applicable. | Not applicable. | Not applicable. | Standalone route handler. | COMPLETE | No UI surface. Should remain minimal. | Nav: no; Footer: no; Sitemap: no. | SPEC-012, SPEC-022 | KEEP |
| `not-found` | Not found state | Special App Router route | Branded 404 fallback for missing routes. | Not-found content and return-home path. | `Page not found.` | Uses app-level metadata behavior. | `app/not-found.tsx`. | COMPLETE | Minimal and appropriate. Could be visually reviewed with final page polish. | Nav: no; Footer: no; Sitemap: no. | SPEC-012 | KEEP |

## Linked To But Missing

Public navigation, footer, sitemap, service, framework, and industry links were inspected at code level. No active public link to a missing static page route was found.

Intentionally draft/unpublished insight hrefs exist in `content/insights/entries.ts` and are not currently public pages:

- `/insights/overlapping-cybersecurity-frameworks`
- `/insights/audit-evidence-readiness`
- `/insights/continuous-third-party-risk`

These are draft content references, not broken public navigation links. The dynamic route exists, but draft entries are filtered by `getPublishedInsights()` / `getPublishedInsightBySlug()` and should return not found until published.

## Implemented But Not Linked

- `/api/contact`: consumed by the contact form, not linked as a page.
- `/api/health`: operational endpoint, not linked publicly.
- `/insights/[slug]`: dynamic template exists, but no published article instances are currently exposed.
- Industry detail routes are sitemap-indexed and linked from `/industries`, but not directly exposed in header or footer.

## Duplicate Routes

No duplicate route implementations were found in the App Router tree.

## Placeholder Pages

- `/insights`: visible index route with an empty/pending editorial state because all insight entries are drafts.
- `/insights/[slug]`: article template exists, but currently has no published article instances.

## Draft Insight Routes

Draft insight entries:

- `Understanding overlapping cybersecurity frameworks` -> `/insights/overlapping-cybersecurity-frameworks`
- `Building evidence before the audit begins` -> `/insights/audit-evidence-readiness`
- `Why third-party risk needs continuous oversight` -> `/insights/continuous-third-party-risk`

Current behavior: intentionally unpublished/draft, excluded from sitemap, and not exposed as published article pages.

## Dead CTAs

No `#` placeholder links or `javascript:` pseudo-links were identified in the inspected navigation/footer/content route architecture.

Potential CTA dependencies requiring production review:

- `/book` depends on Calendly configuration and consent behavior for the final embedded scheduling experience.
- `/contact` depends on production lead delivery configuration and operational abuse controls.

## Shared Page Templates

- `components/sections/services/services-overview.tsx`
- `components/sections/services/service-detail-template.tsx`
- `components/sections/frameworks/frameworks-overview.tsx`
- `components/sections/frameworks/framework-detail-template.tsx`
- `components/sections/industries/industries-overview.tsx`
- `components/sections/industries/industry-detail-template.tsx`
- `components/sections/insights/insights-index.tsx`
- `components/sections/insights/insight-article.tsx`
- `components/sections/legal/legal-page.tsx`
- `components/sections/company/company-page.tsx`
- `components/sections/company/trust-security-page.tsx`
- `components/sections/contact/contact-page.tsx`
- `components/sections/contact/book-page.tsx`

## Shared Section Components

Homepage:

- `components/sections/homepage/hero.tsx`
- `components/sections/homepage/grc-orbit.tsx`
- `components/sections/homepage/framework-expertise-strip.tsx`
- `components/sections/homepage/framework-intelligence.tsx`
- `components/sections/homepage/framework-control-model.tsx`
- `components/sections/homepage/framework-motion-bar.tsx`
- `components/sections/homepage/services.tsx`
- `components/sections/homepage/process.tsx`
- `components/sections/homepage/insights.tsx`
- `components/sections/homepage/final-cta.tsx`

Layout and UI:

- `components/layout/site-header.tsx`
- `components/layout/desktop-navigation.tsx`
- `components/layout/mobile-navigation.tsx`
- `components/layout/site-footer.tsx`
- `components/layout/navigation-items.ts`
- `components/ui/container.tsx`
- `components/ui/section.tsx`
- `components/ui/section-heading.tsx`
- `components/ui/breadcrumbs.tsx`
- `components/ui/button.tsx`
- `components/ui/framework-label.tsx`

Consent, analytics, and integrations:

- `components/consent/cookie-consent.tsx`
- `components/consent/cookie-preferences-button.tsx`
- `components/consent/calendly-consent-embed.tsx`
- `components/analytics/analytics-provider.tsx`

## Compact Summary

- Total App Router entries: 33
- Public page route patterns: 30
- API routes: 2
- Special routes: 1
- COMPLETE: 16
- PARTIAL: 15
- PLACEHOLDER: 2
- BROKEN: 0
- Missing but linked from active public navigation/footer/sitemap/content: 0
- Draft insight hrefs intentionally unavailable: 3

Status count includes API and special routes. If counting public page routes only, the inventory is:

- Public page route patterns: 30
- COMPLETE: 14
- PARTIAL: 14
- PLACEHOLDER: 2
- BROKEN: 0

## Top Inventory Findings

1. Homepage is implemented but incomplete against the master homepage structure because it lacks the industries homepage section and other later trust/proof-style areas.
2. Framework detail pages are implemented but intentionally lack official source URLs and authoritative framework verification.
3. Insights index exists, but all insight entries are drafts, so the public route currently behaves like a placeholder.
4. The dynamic article template exists, but no published article instance exists yet.
5. Legal pages are implemented drafts and require legal/business review before production reliance.
6. `/book` is structurally implemented but production completion depends on Calendly configuration, consent, CSP, privacy, and accessibility validation.
7. `/contact` is structurally implemented but production completion depends on lead delivery, rate limiting, abuse controls, privacy workflow, and monitoring.
8. Service detail pages are complete, but repeated template usage risks a templated feel without later editorial/visual refinement.
9. Industry pages are complete but broad; several need content review for sector specificity and business accuracy.
10. Industry detail routes are not directly linked from footer, which is acceptable, but their discoverability depends on the `/industries` overview and sitemap.

## Recommended Refinement Order

1. Homepage `/`: finish missing master-spec section coverage and normalize page-level rhythm before refining lower-priority pages.
2. Shared internal page template system: refine service/framework/industry shared layout once, then apply carefully.
3. Services system: `/services` and all `/services/*` pages, because these are core commercial conversion pages.
4. Frameworks system: `/frameworks` and all `/frameworks/*` pages, with source verification before final production approval.
5. Industries system: `/industries` and all `/industries/*` pages, with business review for sector-specific positioning.
6. Contact and booking: `/contact`, `/book`, `/api/contact`, Calendly consent path, lead delivery, and error states.
7. Company and security: `/company`, `/security`, especially verifiable trust/security posture language.
8. Insights system: `/insights` and `/insights/[slug]` once real published content is ready.
9. Legal pages: `/privacy`, `/cookies`, `/terms`, `/accessibility` after production integrations and legal review are settled.
10. Operational routes: `/api/health` and `not-found` final polish and monitoring alignment.

