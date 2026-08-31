# SPEC-018 - Insights Content System

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 - KAMMAND Design System
- SPEC-002 - Global Header and Navigation
- SPEC-008 - Homepage Insights
- SPEC-010 - SEO, Metadata, Structured Data and Internal Links
- SPEC-011 - Accessibility and Responsive QA
- SPEC-012 - Security, Performance, CI/CD and Production Readiness
- SPEC-013 through SPEC-017 - Phase 2 page architecture

## 1. Purpose

Create KAMMAND's thought-leadership and content architecture for GRC, cybersecurity governance, risk management, regulatory developments, compliance, assurance, privacy governance, and third-party risk.

The system must feel like professional research and editorial content. It must not become an SEO content farm, generic corporate blog, AI-generated article grid, news portal, or marketing-card wall.

## 2. Content Architecture

Use a lightweight local content model for V1.

The V1 implementation may use structured TypeScript content instead of MDX until full editorial content and controlled MDX component requirements are approved.

Each insight entry should support:

- title
- description
- slug
- href
- category
- publishedAt when genuinely published
- updatedAt only when genuinely applicable
- author only when verified
- featured
- draft
- seoTitle
- seoDescription
- related insights
- related services
- related frameworks
- references where appropriate
- safe structured body blocks

Do not add unused fields.

## 3. Draft Handling

Draft content must never accidentally appear publicly.

Production and public route rendering must exclude any entry where `draft` is true or `publishedAt` is absent.

The public homepage Insights section, `/insights` index, sitemap, article routes, and Article structured data must consume only published insight entries.

Development fixtures may exist for editorial planning, but they must be filtered before public rendering.

## 4. Insights Index

Route:

`/insights`

H1:

`Insights for a changing risk landscape.`

Supporting copy:

`Practical perspectives on governance, cybersecurity, regulation, risk, compliance, and assurance.`

If no reviewed and published insights exist, the index should show a restrained editorial empty state rather than exposing planned titles as public articles.

## 5. Index Design

Use the editorial treatment established on the homepage:

- category
- article title
- short description
- publication date or reviewed status
- restrained read affordance

Do not use a conventional grid of giant blog cards.

Use Direction A: arctic/light canvas, strong typography, whitespace, subtle separators, restrained metadata, and no arbitrary colors.

## 6. Featured Content

The architecture may support one featured article.

Do not create a giant marketing banner.

If no published article qualifies as featured, do not fabricate one.

## 7. Categories

Use a restrained initial taxonomy:

- GRC
- Cybersecurity
- Risk
- Regulation
- Assurance
- Privacy

Do not create category pages during this spec.

## 8. Article Template

Article pages should support:

- breadcrumb
- category
- one H1
- description or deck
- publication date
- updated date only when real
- author only when verified
- article body
- source/reference section where appropriate
- related insights
- related KAMMAND services and frameworks where contextually relevant
- final consultation CTA

Article content must be server-rendered and crawlable.

## 9. Article Typography

Article pages must optimize for reading and use SPEC-001 reading width rules.

Control paragraph width, line-height, heading spacing, lists, blockquotes, tables, code or technical text, links, and references.

Do not allow article content to invent arbitrary visual styles.

## 10. Article Components

Only controlled article components are allowed.

V1 supports safe structured body blocks. Future MDX may support approved components such as Callout, KeyPoint, ReferenceList, and ComparisonTable.

Do not allow arbitrary client-side widgets inside articles by default.

Do not render unsafe arbitrary HTML.

## 11. Initial Content

Create up to three initial editorial fixtures corresponding to the homepage concepts:

- Understanding overlapping cybersecurity frameworks
- Building evidence before the audit begins
- Why third-party risk needs continuous oversight

Because full editorial content is not yet approved, these entries remain draft fixtures excluded from public rendering.

Do not fabricate long authoritative articles, publication dates, authors, or Article structured data.

## 12. Homepage Integration

The homepage Insights section must consume the central insight content source.

The homepage must display only appropriate published insights. If no published insights exist, show a restrained editorial empty state without exposing draft article titles or planned article links.

Do not redesign the homepage Insights section.

## 13. SEO

The Insights index requires:

- unique title
- unique description
- one H1
- canonical handling through the existing site metadata architecture

Article pages require:

- unique title
- unique description
- one H1
- canonical handling
- publication metadata when real
- updated metadata only when real
- breadcrumbs

Use Article or BlogPosting structured data only for genuinely published articles. Do not output published Article schema for drafts or placeholders.

## 14. Authorship and E-E-A-T

Do not fabricate author names, author qualifications, reviewers, credentials, publication dates, or review boards.

The architecture may support verified author profiles later.

## 15. Regulatory Content

Regulatory and framework article content must distinguish official requirements from KAMMAND advisory interpretation.

Use authoritative sources where claims require them. Do not make unsupported legal conclusions.

## 16. Sources

Article references should prefer regulators, standards bodies, official government sources, and authoritative primary material.

Do not use competing consultancy blogs as regulatory authority.

## 17. Internal Linking

Articles may link contextually to services, frameworks, industries, or other insights.

Do not stuff articles with commercial links. Links must help the reader.

## 18. Related Insights

Implement a simple related-content mechanism based on explicitly configured relationships first, then category matching.

Limit the number shown.

Do not build a recommendation engine.

## 19. Search, Pagination and RSS

Do not implement article search or pagination during this spec.

The architecture should not prevent future search, pagination, or RSS.

RSS may be documented later when published content volume justifies it.

## 20. Sitemap

The sitemap must include `/insights`.

Only genuinely published article routes may be included.

Drafts must not appear.

## 21. Responsive and Accessibility

Audit:

- 320
- 375
- 390
- 430
- 768
- 1024
- 1440

Maintain semantic article markup, one H1 per page, logical H2/H3 hierarchy, accessible breadcrumbs, descriptive links, visible focus, table semantics where used, accessible blockquotes, adequate contrast, and no horizontal overflow.

## 22. Performance and Security

Content pages should remain server-rendered and highly performant.

Do not introduce an external CMS, large CMS SDK, or heavy syntax-highlighting package.

Do not render unsafe arbitrary HTML or create an arbitrary-script execution path from content.

## 23. Testing

Tests must verify:

- `/insights` renders
- article routing architecture exists
- draft content is excluded from public output
- homepage Insights consumes the central content source
- one H1 per page
- metadata behaves correctly where practical
- sitemap excludes drafts
- Article schema is not emitted for unpublished placeholders

## 24. Definition of Done

SPEC-018 is complete only when:

- this spec exists
- local content architecture exists
- `/insights` is implemented
- reusable article template architecture exists
- the three initial entries are draft fixtures excluded from public rendering
- homepage Insights consumes the central content source
- sitemap excludes drafts
- no fake authors, publication dates, long articles, or Article schema are added
- no approved global tokens are changed
- responsive QA is performed
- release check passes
- lint passes
- typecheck passes
- tests pass
- production build passes
